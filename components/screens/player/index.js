import { StyleSheet, Text, View, Image, WebView } from 'react-native'
import styles from './styles'
import React  from 'react'


export default class Player extends React.Component {
	static navigationOptions = ({ navigation }) => ({
			title: navigation.state.params.title
		})
	
	render() {
    const { params } = this.props.navigation.state
		return (
			<View style={styles.wb}>
				<WebView source={{ uri: params.key }} style={styles.wb} />
			</View>
		)
	}
}
