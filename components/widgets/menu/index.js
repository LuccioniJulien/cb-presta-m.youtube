import { View, TouchableOpacity } from 'react-native'
import { Icon    } from 'react-native-elements'
import { connect } from 'react-redux'
import { SEARCH  } from '../../../constants/action'
import   styles    from './styles'
import   React     from 'react'



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
				<TouchableOpacity style={styles.pad} onPress={this.props.nFav}>
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
