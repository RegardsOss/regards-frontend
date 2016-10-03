import { omitBy } from "lodash"
import * as Immutable from "immutable"
import {
  PROJECTS_REQUEST,
  PROJECTS_SUCCESS,
  PROJECTS_FAILURE,
  DELETE_PROJECT_REQUEST,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAILURE,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_REQUEST,
  CREATE_PROJECT_FAILURE
} from "./actions"
import { Project } from "@regardsoss/models"


export default (state: any = {
  isFetching: false,
  items: {},
  lastUpdate: ''
}, action: any) => {
  let newState = Immutable.fromJS(state).toJS()
  switch (action.type) {
    case PROJECTS_REQUEST:
    case CREATE_PROJECT_REQUEST:
    case DELETE_PROJECT_REQUEST:
      newState.isFetching = true
      return newState
    case PROJECTS_FAILURE:
    case CREATE_PROJECT_FAILURE:
    case DELETE_PROJECT_FAILURE:
      newState.isFetching = false
      return newState
    case PROJECTS_SUCCESS:
      newState.isFetching = false
      newState.items = action.payload.entities.projects
      return newState
    case CREATE_PROJECT_SUCCESS:
      const project = action.payload.entities.projects[action.payload.result[0]]
      newState.items[action.payload.result[0]] = project
      newState.isFetching = false
      return newState
    case DELETE_PROJECT_SUCCESS:
      newState.items = omitBy(newState.items, (project: Project) => project.projectId === action.payload.projectId)
      newState.isFetching = false
      return newState
    default:
      return state
  }
}
