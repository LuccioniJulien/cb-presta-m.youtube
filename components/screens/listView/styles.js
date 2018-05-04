import { StyleSheet, Dimensions } from 'react-native'

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
	},

	loading:{
		flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
	},
	color: {
    backgroundColor: '#d1000a',
    borderRadius: 110,
    height:30,
    width:30
  },
  row: {
    flexDirection: 'row',
    margin:7
  },
  pad:{
    paddingRight:5
  }
})
