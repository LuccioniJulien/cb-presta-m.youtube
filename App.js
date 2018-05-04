import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import ListView from './components/screens/listView'
import { StackNavigator } from 'react-navigation'
import Player from './components/screens/player'
import PickerView from './components/screens/settings'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './store/reducer'
import { getStorage } from './store/AsyncStorage'
import { CONFIG } from './constants/index'

const store = createStore(reducer)
const dispatch = store.dispatch

export default class App extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			isStoreLoading: true,
			store: store
		}
	}

	async componentWillMount() {
		const region = await getStorage(CONFIG.STORAGE.CURRENT_REGION)
		const regions = await getStorage(CONFIG.STORAGE.AVAIBLE_REGION)

		if (region) {
			const lol = { region: JSON.parse(region), regions: JSON.parse(regions) }
			this.setState({ store: createStore(reducer, lol) })
		} else {
			this.setState({ store: store })
		}
		this.setState({ isStoreLoading: false })
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
	}
})

const styles = StyleSheet.create({
	loading:{
		flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
	}
})