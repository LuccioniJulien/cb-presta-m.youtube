import { TextInput, View, Dimensions, Text, ScrollView, FlatList } from 'react-native'
import { Icon      } from 'react-native-elements'
import { connect   } from 'react-redux'
import   Card        from '../../widgets/card'
import   TextLimit   from '../../text_limit'
import   styles      from './styles'
import   React       from 'react'

class FavoritesView extends React.Component {
	static navigationOptions = {
		title: 'Favorites'
	}

	render() {
		const { navigate } = this.props.navigation
		return (
			<View style={styles.container}>
				{/* <ScrollView onMomentumScrollEnd={ this._scrollEnd } style={{ width: Dimensions.get('window').width - 10 }}>{componentList}</ScrollView> */}
				<FlatList
				 	style={{ width: Dimensions.get('window').width  }}
					data={this.props.favorites}
					renderItem={({ item}) => {
						return (
						<Card
							yobj={item}
							nav={() =>
								navigate('Player', {
									key: `https://www.youtube.com/watch?v=${item.key}`,
									title: TextLimit({ limit: 30, str: item.title, style: { fontSize: 13 } })
								})
							}
						/>)
					}}
				/> 
			</View>
		)
	}
}

mapStateToProps = state => {
	return {
		favorites: state.favorites
	}
}

export default connect(mapStateToProps)(FavoritesView)
