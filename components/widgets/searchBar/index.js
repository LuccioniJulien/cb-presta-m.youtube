import { TextInput, View } from 'react-native'
import { Icon    } from 'react-native-elements'
import { connect } from 'react-redux'
import   styles    from './styles'
import   React     from 'react'

export default class Searchbar extends React.Component {
	render() {
		return (
			<View style={styles.contener}>
				<TextInput onSubmitEditing={event => this.props.submit(event.nativeEvent.text)} style={styles.bar} />
			</View>
		)
	}
}
