export function stringLimit(str, limit = 42, endsWith = '...') {
  let newStr = ''
	for (let index = 0; index < limit; index++) {
		if (str[index]) {
			if (index === 1) {
				newStr += str[index].toUpperCase()
			} else if (str[index - 1] === ' ') {
				newStr += str[index].toUpperCase()
			} else {
				newStr += str[index]
			}
		}
	}
	newStr += endsWith
	return newStr
}
