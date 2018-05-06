import {AsyncStorage} from 'react-native'

export async function getStorage(key) {
    try {
        const item = await AsyncStorage.getItem(key)
        return item
    } catch (error) {
        console.error(error)
        alert('Unable to save')
    }
}

export async function addStorage(key, data) {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(data))
    } catch (error) {
        console.error(error)
        alert('Unable to save')
    }
}

export async function removeStorage(key) {
    try {
        await AsyncStorage.removeItem(key)
    } catch (error) {
        console.error(error)
        alert('Unable to save')
    }
}