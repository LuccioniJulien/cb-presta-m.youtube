import React from 'react'
import { StyleSheet, Text, View, ScrollView, Image, Button, Dimensions } from 'react-native'
import styles from './styles'
import Card from '../../widgets/card'
import Menu from '../../widgets/menu'
import SearchBar from '../../widgets/searchBar'
import { connect } from 'react-redux'
import { CONFIG } from '../../../constants/index'
import TextLimit from '../../text_limit'
import { SET_REGIONS, SET_REGION } from '../../../constants/action'
import { addStorage } from '../../../store/AsyncStorage'
class ListView extends React.Component {
	static navigationOptions = ({ navigation }) => {
		const { params = {} } = navigation.state
		return {
			headerStyle: {
				backgroundColor: '#ffff'
			},
			headerLeft: <Image style={{ height: 25, width: 120 }} source={require('../../../assets/logo.png')} />,
			headerRight: <Menu nSet={() => navigation.navigate('Setting')} nSearch={params.search} nRandom={params.random} />
		}
	}

	constructor() {
		super()
		this.state = {
			list: [],
			regionCode: { id: 'FR', name: 'France' },
			isLoading: true,
			isSearchbarVisible: false
		}
	}

	componentDidMount() {
		this.setState({ regionCode: this.props.region })
		this._getVideos()
		this._getRegions()
		this.props.navigation.setParams({
			search: this._search,
			random: this._ramdom
		})
	}

	_search = () => {
		this.setState({ isSearchbarVisible: !this.state.isSearchbarVisible })
	}

	_ramdom = async () => {
		let randomRegion = this.props.regions[Math.floor(Math.random() * Math.floor(this.props.regions.length))]
		await addStorage(CONFIG.STORAGE.CURRENT_REGION, randomRegion)
		this.props.dispatch({
			type: SET_REGION,
			payload: { region: randomRegion }
		})
	}

	static getDerivedStateFromProps(next_props, prev_state) {
		if (next_props.region.id == prev_state.regionCode.id) {
			return null
		} else {
			return { list: [] }
		}
	}

	componentDidUpdate() {
		if (this.props.region.id != this.state.regionCode.id) {
			this._getVideos()
		}
	}

	render() {
		const { navigate } = this.props.navigation
		let componentList = this.state.list.map((item, idx) => {
			return (
				<Card
					key={idx}
					url={item.url}
					title={TextLimit({ str: item.title })}
					nav={() =>
						navigate('Player', {
							Yurl: `https://www.youtube.com/watch?v=${item.Yurl}`,
							title: TextLimit({ limit: 30, str: item.title, style: { fontSize: 13 } })
						})
					}
				/>
			)
		})

		if (this.state.isLoading) {
			return (
				<View style={styles.loading}>
					<Image source={require('../../../assets/load.gif')} />
					<Text>Loading Data</Text>
				</View>
			)
		}

		return (
			<View style={styles.container}>
				{this.state.isSearchbarVisible ? <SearchBar /> : ''}
				<Text>{`Trends of ${this.props.region.name ? this.props.region.name : 'France'}`}</Text>
				<ScrollView style={{ width: Dimensions.get('window').width - 10 }}>{componentList}</ScrollView>
			</View>
		)
	}

	_getRegions = async () => {
		try {
			let { BASE_URL } = CONFIG.YOUTUBE
			let response = await fetch(BASE_URL + '/i18nRegions?part=snippet&key=AIzaSyDq_JV_7kIBn5KcL0obvJGbcyqkHteq9HU')
			let json = await response.json()
			let regions = []

			for (const item of json.items) {
				let id = item.snippet.gl
				let name = item.snippet.name
				regions.push({ id, name })
			}

			await addStorage(CONFIG.STORAGE.AVAILABLE_REGIONS, regions)
			this.props.dispatch({ type: SET_REGIONS, payload: { regions } })

			this.setState({ regions })
		} catch (error) {
			console.log(error)
		}
	}

	_getVideos = async () => {
		let { BASE_URL, API_KEY, DEFAULT_REGION, DEFAULT_NB_RESULT } = CONFIG.YOUTUBE
		let list = []
		// const search = this.props.search == '' ? '&q=donaldduck' : this.props.search
		// '&q=donaldduck'
		try {
			let region = this.props.region
			let response = await fetch(
				BASE_URL +
					'/search?part=snippet&type=video&videoSyndicated=true&order=rating&chart=mostPopular&regionCode=' +
					region.id +
					'&maxResults=' +
					DEFAULT_NB_RESULT +
					API_KEY
			)
			let json = await response.json()
			if (!json.error) {
				for (const item of json.items) {
					let title = item.snippet.title
					let url = item.snippet.thumbnails.high.url
					let Yurl = item.id.videoId
					let isFav = false
					list.push({ title, url, Yurl, isFav })
				}
				this.setState({ list, isLoading: false, regionCode: region })
			}
			console.log('LOG ======> _getVideos done')
		} catch (error) {
			console.log('LOG ======> _getVideos ' + error)
		}
	}
}

mapStateToProps = state => {
	return {
		search: state.search,
		region: state.region,
		regions: state.regions
	}
}

export default connect(mapStateToProps)(ListView)
