import React from 'react'
import { Text } from 'react-native'
import { stringLimit } from '../mlib/string'

TextLimit = ({ str, limit, endsWith, style={fontSize: 15} }) => {
	return <Text style={style}>{stringLimit(str, limit, endsWith)}</Text>
}

export default TextLimit
