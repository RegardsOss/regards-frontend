import { PROJECT, PROJECT_ARRAY } from '@regardsoss/api'
import { normalize } from 'normalizr'

const { CALL_API, getJSON } = require('redux-api-middleware')

export const PROJECTS_API = `${GATEWAY_HOSTNAME}/api/v1/projects`

export const PROJECT_LIST_REQUEST = 'PROJECT_LIST_REQUEST'
export const PROJECT_LIST_SUCCESS = 'PROJECT_LIST_SUCCESS'
export const PROJECT_LIST_FAILURE = 'PROJECT_LIST_FAILURE'

export const PROJECT_REQUEST = 'PROJECT_REQUEST'
export const PROJECT_SUCCESS = 'PROJECT_SUCCESS'
export const PROJECT_FAILURE = 'PROJECT_FAILURE'

export const CREATE_PROJECT_REQUEST = 'CREATE_PROJECT_REQUEST'
export const CREATE_PROJECT_SUCCESS = 'CREATE_PROJECT_SUCCESS'
export const CREATE_PROJECT_FAILURE = 'CREATE_PROJECT_FAILURE'

export const UPDATE_PROJECT_REQUEST = 'UPDATE_PROJECT_REQUEST'
export const UPDATE_PROJECT_SUCCESS = 'UPDATE_PROJECT_SUCCESS'
export const UPDATE_PROJECT_FAILURE = 'UPDATE_PROJECT_FAILURE'

export const DELETE_PROJECT_REQUEST = 'DELETE_PROJECT_REQUEST'
export const DELETE_PROJECT_SUCCESS = 'DELETE_PROJECT_SUCCESS'
export const DELETE_PROJECT_FAILURE = 'DELETE_PROJECT_FAILURE'

// Fetches all projects
// Relies on the custom API middleware defined in redux-api-middleware
// Normalize the json response
export const fetchProjectList = () => ({
  [CALL_API]: {
    types: [
      PROJECT_LIST_REQUEST,
      {
        type: PROJECT_LIST_SUCCESS,
        payload: (action, state, res) => getJSON(res).then(json => normalize(json, PROJECT_ARRAY)),
      },
      PROJECT_LIST_FAILURE,
    ],
    endpoint: PROJECTS_API,
    method: 'GET',
  },
})
export const fetchProject = projectName => ({
  [CALL_API]: {
    types: [
      PROJECT_REQUEST,
      {
        type: PROJECT_SUCCESS,
        payload: (action, state, res) => getJSON(res).then(json => normalize(json, PROJECT)),
      },
      PROJECT_FAILURE,
    ],
    endpoint: `${PROJECTS_API}/${projectName}`,
    method: 'GET',
  },
})

export const createProject = values => ({
  [CALL_API]: {
    types: [
      CREATE_PROJECT_REQUEST,
      {
        type: CREATE_PROJECT_SUCCESS,
        payload: (action, state, res) => getJSON(res).then(json => normalize(json, PROJECT)),
      },
      CREATE_PROJECT_FAILURE,
    ],
    endpoint: PROJECTS_API,
    method: 'POST',
    body: JSON.stringify(values),
  },
})

export const updateProject = (projectName, values) => ({
  [CALL_API]: {
    types: [
      UPDATE_PROJECT_REQUEST,
      {
        type: UPDATE_PROJECT_SUCCESS,
        payload: (action, state, res) => getJSON(res).then(json => normalize(json, PROJECT)),
      },
      UPDATE_PROJECT_FAILURE,
    ],
    endpoint: `${PROJECTS_API}/${projectName}`,
    method: 'PUT',
    body: JSON.stringify(values),
  },
})

export const deleteProject = projectName => ({
  [CALL_API]: {
    types: [
      DELETE_PROJECT_REQUEST,
      {
        type: DELETE_PROJECT_SUCCESS,
        payload: { projectName },
      },
      DELETE_PROJECT_FAILURE,
    ],
    endpoint: `${PROJECTS_API}/${projectName}`,
    method: 'DELETE',
  },
})
