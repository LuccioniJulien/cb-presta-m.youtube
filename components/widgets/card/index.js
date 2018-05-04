import React from 'react'
import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
import styles from './styles'
import { Icon } from 'react-native-elements'

export default class Card extends React.Component {
	render() {
		return (
			<TouchableOpacity style={styles.container} onPress={this.props.nav}>
				<Image style={styles.image} source={{ uri: this.props.url }} />
				<TouchableOpacity style={styles.row}>
					<TouchableOpacity style={styles.pad} onPress={() => console.log('success')}>
						<Icon size={20} color="#fff" containerStyle={this.props.isFav ? styles.Fav : styles.notFav} name="favorite" />
					</TouchableOpacity>
					{this.props.title}
				</TouchableOpacity>
			</TouchableOpacity>
		)
	}
}
