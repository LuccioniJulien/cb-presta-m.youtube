import React from 'react'
import styles from './styles'
import Card from '../../widgets/card'
import Menu from '../../widgets/menu'
import SearchBar from '../../widgets/searchBar'
import TextLimit from '../../text_limit'
import { connect } from 'react-redux'
import { CONFIG } from '../../../constants/index'
import { addStorage } from '../../../store/AsyncStorage'
import { StyleSheet, Text, View, ScrollView, Image, Button, Dimensions, FlatList } from 'react-native'
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
			isSearchbarVisible: false,
			search: '',
			nb_result: 0
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
		// methode appelée pour faire apparaitre la barre de recherche
		this.setState({ isSearchbarVisible: !this.state.isSearchbarVisible })
	}

	_ramdom = async () => {
		// methode appelé pour faire choisir une région au hasard
		if (!this.props.regions) {
			return
		}
		let randomRegion = this.props.regions[Math.floor(Math.random() * Math.floor(this.props.regions.length))]
		await addStorage(CONFIG.STORAGE.CURRENT_REGION, randomRegion)
		this.setState({ search: '', nb_result: 0 })
		this.props.dispatch({
			type: SET_REGION,
			payload: { region: randomRegion }
		})
	}

	static getDerivedStateFromProps(next_props, prev_state) {
		if (next_props.region.id == prev_state.regionCode.id) {
			console.log('getDerivedStateFromProps nothing')
			return null
		} else {
			console.log('getDerivedStateFromProps update')
			return { list: [], search: '', nb_result: 0 }
		}
	}

	componentDidUpdate() {
		if (this.props.region.id != this.state.regionCode.id) {
			this._getVideos()
		}
	}

	render() {
		const { navigate } = this.props.navigation

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
				<Text>{this.state.search == '' ? `Trends of ${this.props.region.name}` : `Search for ${this.state.search}`}</Text>
				{/* <ScrollView onMomentumScrollEnd={ this._scrollEnd } style={{ width: Dimensions.get('window').width - 10 }}>{componentList}</ScrollView> */}
				<FlatList
					style={{ width: Dimensions.get('window').width }}
					ref={ref => {
						this.flatListRef = ref
					}}
					data={this.state.list}
					onEndReached={this._scrollEnd}
					renderItem={({ item }) => {
						return (
							<Card
								yobj={item}
								nav={() =>
									navigate('Player', {
										key: `https://www.youtube.com/watch?v=${item.key}`,
										title: TextLimit({ limit: 30, str: item.title, style: { fontSize: 13 } })
									})
								}
							/>
						)
					}}
				/>
			</View>
		)
	}

	_scrollEnd = () => {
		// methode appelée lorsque le scroll de la flatlist atteind presque la fin
		let nb = this.state.nb_result + 5
		this._getVideos(this.state.search, nb)
		this.setState({ nb_result: nb })
	}

	_submit = value => {
		// methode appelée lorsque le bouton enter du clavier virtuel est pressé dans le textinput de la recherche
		console.log('submit' + value)
		this.flatListRef.scrollToIndex({ animated: true, index: 0 })
		this._getVideos(value)
		this.setState({ isSearchbarVisible: !this.state.isSearchbarVisible, search: value, nb_result: 0 })
	}

	_getRegions = async () => {
		// fetch des régions dans la listView et non pas dans les Settings
		// permet l'utilisation du bouton de sélection aléatoire 
		// lors du premier lancement de l'application
		// sans que l'utilisateur ai besoin d'aller dans les settings
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

	_getVideos = async (value = '', nbResult = 0) => {
		// fetch des vidéos
		let list = []
		let url = ''
		const search = value == '' ? '' : '&q=' + value
		console.log('search' + search)
		//this.setState({isLoading:true})
		try {
			let region = this.props.region
			// on change l'url si c'est une recherche ou bien les tendances d'une region
			url =
				BASE_URL +
				'/search?part=snippet&type=video&videoSyndicated=true&order=rating&chart=mostPopular&regionCode=' +
				region.id +
				search +
				'&maxResults=' +
				(DEFAULT_NB_RESULT + nbResult) +
				API_KEY
			url = search == '' ? url : BASE_URL + '/search?part=snippet&type=video' + search + '&maxResults=' + (DEFAULT_NB_RESULT + nbResult) + API_KEY
			let response = await fetch(url)
			let json = await response.json()
			if (!json.error) {
				for (const item of json.items) {
					let title = item.snippet.title
					let url = item.snippet.thumbnails.high.url
					let key = item.id.videoId
					let isFav = false
					let favs = [...this.props.favorites]

					// on regarde si la video est dans les favoris pour changer le style de l'icon
					for (let index = 0; index < favs.length; index++) {
						if (favs[index].key === key) {
							isFav = true
							index = favs.length
						}
					}

					list.push({ title, url, key, isFav })
				}
				this.setState({ list, isLoading: false, regionCode: region })
			}
			console.log('LOG ======> _getVideos done')
		} catch (error) {
			this.setState({ isLoading: true, search: '', nb_result: 0 })
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
