import { SET_REGION,SET_REGIONS, SET_FAV } from '../constants/action'
const initial_state = {
	region: { id: 'FR', name: 'France' },
	regions: [],
	favorites: []
}

export default function reducer(prev_state = initial_state, action) {
	switch (action.type) {
		case SET_REGION:
			//console.log('SET REGIOONN ========> ' + JSON.stringify(action.payload.region))
			return Object.assign({}, prev_state, {
				region: action.payload.region
			})
			break
		case SET_REGIONS:
			//console.log('SET REGIOONNSSSS ========> ' + JSON.stringify(action.payload.regions))
			return Object.assign({}, prev_state, {
				regions: action.payload.regions
			})
			break
		case SET_FAV:
			console.log('SET FAVS ========> ' + JSON.stringify(action.payload.favs))
			return Object.assign({}, prev_state, {
				favorites: action.payload.favs
			})
			break
		default:
			return prev_state
			break
	}
}
