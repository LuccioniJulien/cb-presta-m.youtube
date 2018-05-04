import { StyleSheet, Dimensions } from 'react-native'


export default StyleSheet.create({
	container: {
		margin:15
	},
	image:{
		height: 200
	},
	notFav: {
    backgroundColor: '#D8D8D8',
    borderRadius: 110,
    height:25,
    width:25
	},
	Fav: {
    backgroundColor: '#d1000a',
    borderRadius: 110,
    height:25,
    width:25
  },
  row: {
		flexDirection: 'row',
		margin:7
  },
  pad:{
    paddingRight:5
  }
})
