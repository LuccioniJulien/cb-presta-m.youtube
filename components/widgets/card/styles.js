import { StyleSheet, Dimensions } from 'react-native'


export default StyleSheet.create({
	container: {
    margin:15,
    backgroundColor: '#000000',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
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
