const {CALL_API, getJSON} = require('redux-api-middleware')
import { PROJECT_ARRAY } from "@regardsoss/api"
import { normalize } from "normalizr"
import { Action } from "redux"

export const PROJECTS_API = 'http://localhost:8080/api/projects'

export const PROJECTS_REQUEST = 'PROJECTS_REQUEST'
export const PROJECTS_SUCCESS = 'PROJECTS_SUCCESS'
export const PROJECTS_FAILURE = 'PROJECTS_FAILURE'

export const PROJECT_REQUEST = 'PROJECT_REQUEST'
export const PROJECT_SUCCESS = 'PROJECT_SUCCESS'
export const PROJECT_FAILURE = 'PROJECT_FAILURE'

export const CREATE_PROJECT_REQUEST = 'CREATE_PROJECT_REQUEST'
export const CREATE_PROJECT_SUCCESS = 'CREATE_PROJECT_SUCCESS'
export const CREATE_PROJECT_FAILURE = 'CREATE_PROJECT_FAILURE'

export const DELETE_PROJECT_REQUEST = 'DELETE_PROJECT_REQUEST'
export const DELETE_PROJECT_SUCCESS = 'DELETE_PROJECT_SUCCESS'
export const DELETE_PROJECT_FAILURE = 'DELETE_PROJECT_FAILURE'

// Fetches all projects
// Relies on the custom API middleware defined in redux-api-middleware
// Normalize the json response
export const fetchProjects = () => ({
  [CALL_API]: {
    types: [
      PROJECTS_REQUEST,
      {
        type: PROJECTS_SUCCESS,
        payload: (action: any, state: any, res: any) => getJSON(res).then((json: any) => normalize(json, PROJECT_ARRAY))
      },
      PROJECTS_FAILURE
    ],
    endpoint: PROJECTS_API,
    method: 'GET',
    // bailout: (state: any) => !isEmpty(selectors.getProjects(state))
  }
})

// export const fetchProject = (id: string) => ({
//   [CALL_API]: {
//     types: [
//       PROJECT_REQUEST,
//       {
//         type: PROJECT_SUCCESS,
//         payload: (action: any, state: any, res: any) => getJSON(res).then((json: any) => normalize(json, Schemas.PROJECT))
//       },
//       PROJECT_FAILURE
//     ],
//     endpoint: PROJECTS_API + '/' + id,
//     method: 'GET',
//   }
// })

export const createProject = () => ({
  [CALL_API]: {
    types: [
      CREATE_PROJECT_REQUEST,
      {
        type: CREATE_PROJECT_SUCCESS,
        payload: (action: any, state: any, res: any) => getJSON(res).then((json: any) => normalize(json, PROJECT_ARRAY))
      },
      CREATE_PROJECT_FAILURE
    ],
    endpoint: PROJECTS_API,
    method: 'POST'
  }
})

export const deleteProject = (id: string) => ({
  [CALL_API]: {
    types: [
      DELETE_PROJECT_REQUEST,
      {
        type: DELETE_PROJECT_SUCCESS,
        payload: { projectId: id }
      },
      DELETE_PROJECT_FAILURE
    ],
    endpoint: PROJECTS_API + '/' + id,
    method: 'DELETE'
  }
})

export interface ProjectAction extends Action {
  id: string,
  name: string
}

export const DELETE_SELECTED_PROJECT = 'DELETE_SELECTED_PROJECT'
export function deleteSelectedProject (): Object {
  return {
    type: DELETE_SELECTED_PROJECT
  }
}
