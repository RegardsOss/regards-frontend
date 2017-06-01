import { combineReducers } from 'redux'
import { fragmentReducer } from './clients/FragmentClient'

const fragmentDataManagementReducer = combineReducers({
  fragment: fragmentReducer,
})

export default fragmentDataManagementReducer
