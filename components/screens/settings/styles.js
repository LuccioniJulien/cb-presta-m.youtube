
import { StyleSheet, Dimensions } from 'react-native'

export default StyleSheet.create({
  pk:{
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height
  },
  container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
  },
  button: {
		width: Dimensions.get('window').width - 20,
    alignItems: 'center',
    justifyContent: 'center',
		margin: 3,
		borderRadius: 3,
		height: 40
	},

	green: {
		backgroundColor:  '#33cc33'
	},
})