import { StyleSheet, Text, View, Image } from 'react-native'

import React      from 'react'
import ListView   from './components/screens/listView'
import Player     from './components/screens/player'
import PickerView from './components/screens/settings'
import Favorites  from './components/screens/favorites'
import reducer    from './store/reducer'

import { StackNavigator } from 'react-navigation'
import { Provider       } from 'react-redux'
import { createStore    } from 'redux'
import { getStorage     } from './store/AsyncStorage'
import { CONFIG         } from './constants/index'

export default class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isStoreLoading: true,
			store: null
		}
	}

	async componentWillMount() {
		try {
			let region    = await getStorage(CONFIG.STORAGE.CURRENT_REGION)
			let regions   = await getStorage(CONFIG.STORAGE.AVAIBLE_REGION)
			let favorites = await getStorage(CONFIG.STORAGE.FAV           )
	
			favorites = favorites ? JSON.parse(favorites) : []
			regions   = regions   ? JSON.parse(regions  ) : []
			region    = region    ? JSON.parse(region   ) : { id: 'FR', name: 'France' }
	
			const state = { region, regions, favorites }
			this.setState({ store: createStore(reducer, state) })
	
			this.setState({ isStoreLoading: false })
		} catch (error) {
			console.log(error)
		}
	}

	render() {
		if (this.state.isStoreLoading) {
			return (
				<View style={styles.loading}>
					<Image source={require('./assets/load.gif')} />
					<Text>Loading Data</Text>
				</View>
			)
		}
		return (
			<Provider store={this.state.store}>
				<Sn />
			</Provider>
		)
	}
}

const Sn = StackNavigator({
	Home: {
		screen: ListView
	},
	Player: {
		screen: Player
	},
	Setting: {
		screen: PickerView
	},
	Favorites: {
		screen: Favorites
	}
})

const styles = StyleSheet.create({
	loading: {
		flex           : 1,
		backgroundColor: '#fff',
		alignItems     : 'center',
		justifyContent : 'center'
	}
})
