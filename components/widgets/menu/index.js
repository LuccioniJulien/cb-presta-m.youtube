import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import styles from './styles'
import { connect } from 'react-redux'
import { SEARCH } from '../../../constants/action'


class Menu extends React.Component {
	render() {
		return (
			<View style={styles.row}>
				<TouchableOpacity
					style={styles.pad}
					onPress={() => {
						this.props.nSearch()
					}}
				>
					<Icon size={20} color="#fff" containerStyle={styles.color} name="search" />
				</TouchableOpacity>
				<TouchableOpacity style={styles.pad} onPress={this.props.nRandom}>
					<Icon size={20} color="#fff" containerStyle={styles.color} name="play-arrow" />
				</TouchableOpacity>
				<TouchableOpacity style={styles.pad}>
					<Icon size={20} color="#fff" containerStyle={styles.color} name="favorite" />
				</TouchableOpacity>
				<TouchableOpacity style={styles.pad} onPress={this.props.nSet}>
					<Icon size={20} color="#fff" containerStyle={styles.color} name="settings" />
				</TouchableOpacity>
			</View>
		)
	}
}

mapStateToProps = state => {
	return {
		search: state.search
	}
}

export default connect(mapStateToProps)(Menu)
