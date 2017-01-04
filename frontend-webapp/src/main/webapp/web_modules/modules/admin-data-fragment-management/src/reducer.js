import { combineReducers } from 'redux'
import fragmentReducer from './model/FragmentReducers'

const fragmentDataManagementReducer = combineReducers({
  fragment: fragmentReducer,
})

export default fragmentDataManagementReducer
