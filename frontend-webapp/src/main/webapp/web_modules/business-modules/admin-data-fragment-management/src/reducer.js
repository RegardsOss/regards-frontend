import { combineReducers } from 'redux'
import { fragmentReducer } from './client/FragmentClient'

const fragmentDataManagementReducer = combineReducers({
  fragment: fragmentReducer,
})

export default fragmentDataManagementReducer
