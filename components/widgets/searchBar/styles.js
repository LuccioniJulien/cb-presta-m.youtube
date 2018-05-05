import { StyleSheet, Dimensions } from 'react-native'

export default StyleSheet.create({
	bar: {
    width          :Dimensions.get('window').width-40,
    margin         :10                               ,
    backgroundColor:'#fff'                           ,
  },
  contener:{
    width          :Dimensions.get('window').width,
    marginTop      :10                            ,
    backgroundColor:'#ff3300'                     ,
    alignItems     : 'center'                     ,
    justifyContent : 'center'                     ,
  }
})
