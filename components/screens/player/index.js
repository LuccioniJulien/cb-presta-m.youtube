import React from 'react'
import { StyleSheet, Text, View, Image, WebView } from 'react-native'
import styles from './styles'

export default class Player extends React.Component {
	static navigationOptions = ({ navigation }) => ({
			title: navigation.state.params.title
		})
	
	render() {
    const { params } = this.props.navigation.state
    console.log(params.Yurl)
		return (
			<View style={styles.wb}>
				<WebView source={{ uri: params.Yurl }} style={styles.wb} />
			</View>
		)
	}
}
