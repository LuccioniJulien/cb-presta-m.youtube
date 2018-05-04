import { StyleSheet, Dimensions } from 'react-native'

export default StyleSheet.create({
	bar: {
    width:Dimensions.get('window').width-45,
    margin:10,
    backgroundColor:'#fff',
    borderRadius: 5,
  },
  contener:{
    width:Dimensions.get('window').width - 30,
    marginTop:10,
    backgroundColor:'#ff3300',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  }
})
