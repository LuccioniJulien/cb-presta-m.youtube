import   React        from 'react'
import   styles       from './styles'
import { connect    } from 'react-redux'
import { SET_REGION } from '../../../constants/action'
import { CONFIG     } from '../../../constants/index'
import { addStorage } from '../../../store/AsyncStorage'
import { Picker, View, TouchableOpacity, Text } from 'react-native'

class PickerView extends React.Component {
	static navigationOptions = {
		title: 'Settings'
	}

	render() {
		let regions = this.props.regions.map((region, idx) => {
			return <Picker.Item key={idx} label={region.name} value={region.id} />
		})

		return (
			<View style={[styles.container]}>
				<Text style={{ fontSize: 20 }}>Select a region</Text>
				<Picker selectedValue={this.props.region.id} style={styles.pk} onValueChange={(itemValue, itemPosition) => this._pickRegion(itemPosition)}>
					{regions}
				</Picker>
			</View>
		)
	}

	_pickRegion = async i => {
		await addStorage(CONFIG.STORAGE.CURRENT_REGION, { id: this.props.regions[i].id, name: this.props.regions[i].name })
		this.props.dispatch({ type: SET_REGION, payload: { region: { id: this.props.regions[i].id, name: this.props.regions[i].name } } })
	}
}

mapStateToProps = state => {
	return {
		region: state.region,
		regions: state.regions
	}
}

export default connect(mapStateToProps)(PickerView)
