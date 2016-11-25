import { omitBy } from 'lodash'
import {
  PROJECT_LIST_REQUEST,
  PROJECT_LIST_SUCCESS,
  PROJECT_LIST_FAILURE,
  DELETE_PROJECT_REQUEST,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAILURE,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_REQUEST,
  CREATE_PROJECT_FAILURE,
} from './ProjectActions'

const createProjectSuccess = function (state, action) {
  const newState = Object.assign({}, state, { isFetching: false })
  const project = action.payload.entities.projects[action.payload.result[0]]
  newState.items[action.payload.result[0]] = project
  return newState
}

const deleteProjectSuccess = function (state, action) {
  const newState = Object.assign({}, state, { isFetching: false })
  newState.items = omitBy(newState.items, proj => proj.content.id === action.payload.id)
  return newState
}

export default (state = {
  isFetching: false,
  items: {},
  lastUpdate: '',
}, action) => {
  switch (action.type) {
    case PROJECT_LIST_REQUEST:
    case CREATE_PROJECT_REQUEST:
    case DELETE_PROJECT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case PROJECT_LIST_FAILURE:
    case CREATE_PROJECT_FAILURE:
    case DELETE_PROJECT_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
      })
    case PROJECT_LIST_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.payload.entities.projects,
      })
    case CREATE_PROJECT_SUCCESS:

      return createProjectSuccess(state, action)
    case DELETE_PROJECT_SUCCESS:
      return deleteProjectSuccess(state, action)
    default:
      return state
  }
}
