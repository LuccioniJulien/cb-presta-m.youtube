import { SEARCH, SET_REGION,SET_REGIONS } from '../constants/action'
const initial_state = {
  region: { id: 'FR', name: 'France' },
  regions:[] 
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
		default:
			return prev_state
			break
	}
}
