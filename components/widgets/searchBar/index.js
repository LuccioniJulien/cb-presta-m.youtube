import React from 'react'
import { TextInput, View } from 'react-native'
import { Icon } from 'react-native-elements'
import styles from './styles'
import { connect } from 'react-redux'

class Searchbar extends React.Component {
	render() {
		return (
			<View style={styles.contener}>
				<TextInput onSubmitEditing={event => this.props.submit(event.nativeEvent.text)} style={styles.bar} />
			</View>
		)
	}
}

mapStateToProps = state => {
	return {
		search: state.search
	}
}

export default connect(mapStateToProps)(Searchbar)
