import   React       from 'react'
import   TextLimit   from '../../text_limit'
import   styles      from './styles'
import { Icon      } from 'react-native-elements'
import { connect   } from 'react-redux'
import { SET_FAV   } from '../../../constants/action'
import { CONFIG    } from '../../../constants/index'
import { addStorage,removeStorage } from '../../../store/AsyncStorage'
import { TouchableOpacity, Image, Dimensions } from 'react-native'



class Card extends React.Component {
	render() {
		return (
			<TouchableOpacity style={styles.container} onPress={this.props.nav}>
				<Image style={styles.image} source={{ uri: this.props.yobj.url }} />
				<TouchableOpacity style={styles.row} onPress={this.props.nav}>
					<TouchableOpacity style={styles.pad} onPress={() => this._fav()}>
						<Icon size={20} color="#fff" containerStyle={this.props.yobj.isFav ? styles.Fav : styles.notFav} name="favorite" />
					</TouchableOpacity >
					{TextLimit({ str: this.props.yobj.title, style: { width: Dimensions.get('window').width - 100 } })}
				</TouchableOpacity>
			</TouchableOpacity>
		)
	}

	_fav = async () => {
	  // await removeStorage(CONFIG.STORAGE.FAV)
		let video = this.props.yobj
		video.isFav = !video.isFav
		let favs = [...this.props.favorites]
		switch (video.isFav) {
			case true:
			favs.push(video)
				break
			case false:
				for (let index = 0; index < favs.length; index++) {
					if (favs[index].id === video.id) {
						favs.splice(index, 1)
						index = favs.length
					}
				}
				break
		}
		console.log('favdat')
		await addStorage(CONFIG.STORAGE.FAV, favs)
		this.props.dispatch({ type: SET_FAV, payload: { favs } })
	}
}

mapStateToProps = state => {
	return {
		search   : state.search   ,
		region   : state.region   ,
		regions  : state.regions  ,
		favorites: state.favorites
	}
}

export default connect(mapStateToProps)(Card)
