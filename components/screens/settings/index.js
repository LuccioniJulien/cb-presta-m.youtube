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
				<Picker selectedValue={this.props.region.id} style={styles.pk} onValueChange={itemValue => this._pickRegion(itemValue)}>
					{regions}
				</Picker>
			</View>
		)
	}

	_pickRegion = async itemValue => {
		for (const item of this.props.regions) {
			if (item.id == itemValue) {
				await addStorage(CONFIG.STORAGE.CURRENT_REGION, { id: itemValue, name: item.name })
				this.props.dispatch({ type: SET_REGION, payload: { region: { id: itemValue, name: item.name } } })
				return
			}
		}
	}
}

mapStateToProps = state => {
	return {
		search : state.search ,
		region : state.region ,
		regions: state.regions
	}
}

export default connect(mapStateToProps)(PickerView)
