import { TextInput, View, Dimensions, Text, ScrollView } from 'react-native'
import { Icon      } from 'react-native-elements'
import { connect   } from 'react-redux'
import   Card        from '../../widgets/card'
import   TextLimit   from '../../text_limit'
import   styles      from './styles'
import   React       from 'react'

class FavoritesView extends React.Component {
	render() {
		const { navigate } = this.props.navigation
		let fav = this.props.favorites
		let componentList = fav.map((item, idx) => {
			return (
				<Card
					yobj={item}
					key={idx}
					nav={() =>
						navigate('Player', {
							Yurl: `https://www.youtube.com/watch?v=${item.Yurl}`,
							title: TextLimit({ limit: 30, str: item.title, style: { fontSize: 13 } })
						})
					}
				/>
			)
		})
		return (
			<View style={styles.container}>
				<ScrollView style={{ width: Dimensions.get('window').width - 10 }}>{componentList}</ScrollView>
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
