import { omitBy } from 'lodash'
import {
  PROJECT_LIST_REQUEST,
  PROJECT_LIST_SUCCESS,
  PROJECT_LIST_FAILURE,
  PROJECT_REQUEST,
  PROJECT_SUCCESS,
  PROJECT_FAILURE,
  DELETE_PROJECT_REQUEST,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAILURE,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_REQUEST,
  CREATE_PROJECT_FAILURE,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_REQUEST,
  UPDATE_PROJECT_FAILURE,
} from './ProjectActions'

const updateProject = function (state, action) {
  const newState = Object.assign({}, state, { isFetching: false })
  const projectId = action.payload.result
  newState.items[projectId] = action.payload.entities.projects[projectId]
  return newState
}

const deleteProjectFromState = function (state, action) {
  const newState = Object.assign({}, state, { isFetching: false })
  newState.items = omitBy(newState.items, proj => proj.content.name === action.payload.projectName)
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
    case UPDATE_PROJECT_REQUEST:
    case PROJECT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case PROJECT_LIST_FAILURE:
    case CREATE_PROJECT_FAILURE:
    case DELETE_PROJECT_FAILURE:
    case UPDATE_PROJECT_FAILURE:
    case PROJECT_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
      })
    case PROJECT_LIST_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.payload.entities.projects,
      })
    case CREATE_PROJECT_SUCCESS:
    case PROJECT_SUCCESS:
    case UPDATE_PROJECT_SUCCESS:
      return updateProject(state, action)
    case DELETE_PROJECT_SUCCESS:
      return deleteProjectFromState(state, action)
    default:
      return state
  }
}
