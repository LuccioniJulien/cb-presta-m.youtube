import   React        from 'react'
import   styles       from './styles'
import   Card         from '../../widgets/card'
import   Menu         from '../../widgets/menu'
import   SearchBar    from '../../widgets/searchBar'
import   TextLimit    from '../../text_limit'
import { connect    } from 'react-redux'
import { CONFIG     } from '../../../constants/index'
import { addStorage } from '../../../store/AsyncStorage'
import { StyleSheet, Text, View, ScrollView, Image, Button, Dimensions } from 'react-native'
import { SET_REGIONS, SET_REGION } from '../../../constants/action'

const { BASE_URL, API_KEY, DEFAULT_REGION, DEFAULT_NB_RESULT } = CONFIG.YOUTUBE

class ListView extends React.Component {
	static navigationOptions = ({ navigation }) => {
		const { params = {} } = navigation.state
		return {
			headerStyle: {
				backgroundColor: '#ffff'
			},
			headerLeft: <Image style={{ height: 25, width: 120 }} source={require('../../../assets/logo.png')} />,
			headerRight: (
				<Menu
					nSet={() => navigation.navigate('Setting')}
					nSearch={params.search}
					nRandom={params.random}
					nFav={() => navigation.navigate('Favorites')}
				/>
			)
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
		if (!this.props.regions) {
			return
		}
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
					yobj={item}
					key={idx}
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
				{this.state.isSearchbarVisible ? <SearchBar submit={this._submit} /> : ''}
				<Text>{`Trends of ${this.props.region.name ? this.props.region.name : 'France'}`}</Text>
				<ScrollView style={{ width: Dimensions.get('window').width - 10 }}>{componentList}</ScrollView>
			</View>
		)
	}

	_submit = value => {
		//onSubmitEditing
		console.log('submit' + value)
		this._getVideos(value)
		this.setState({ isSearchbarVisible: !this.state.isSearchbarVisible })
	}

	_getRegions = async () => {
		try {
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

	_getVideos = async (value = '') => {
		let list = []
		let url = ''
		const search = value == '' ? '' : '&q=' + value
		console.log('search' + search)
		//this.setState({isLoading:true})
		try {
			let region = this.props.region
			// on change l'url si c'est une recherche ou bien les tendances d'un pays
			url =
				BASE_URL +
				'/search?part=snippet&type=video&videoSyndicated=true&order=rating&chart=mostPopular&regionCode=' +
				region.id +
				search +
				'&maxResults=' +
				DEFAULT_NB_RESULT +
				API_KEY
			url = search == '' ? url : BASE_URL + '/search?part=snippet' + search + '&maxResults=' + DEFAULT_NB_RESULT + API_KEY
			let response = await fetch(url)
			let json = await response.json()
			if (!json.error) {
				for (const item of json.items) {
					let title = item.snippet.title
					let url = item.snippet.thumbnails.high.url
					let Yurl = item.id.videoId
					let isFav = false
					let favs = [...this.props.favorites]

					// on regarde si la video est dans les favoris pour changer le style de l'icon
					for (let index = 0; index < favs.length; index++) {
						if (favs[index].Yurl === Yurl) {
							isFav = true
							index = favs.length
						}
					}

					list.push({ title, url, Yurl, isFav })
				}
				this.setState({ list, isLoading: false, regionCode: region })
			}
			console.log('LOG ======> _getVideos done')
		} catch (error) {
			this.setState({ list, isLoading: true })
			console.log('LOG ======> _getVideos ' + error)
		}
	}
}

mapStateToProps = state => {
	return {
		region: state.region,
		regions: state.regions,
		favorites: state.favorites
	}
}

export default connect(mapStateToProps)(ListView)
