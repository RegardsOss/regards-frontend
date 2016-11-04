import Schemas from '@regardsoss/api'
import { normalize } from 'normalizr'

const { CALL_API, getJSON } = require('redux-api-middleware')

export const PROJECT_ACCOUNT_REQUEST = 'PROJECT_ACCOUNT_REQUEST'
export const PROJECT_ACCOUNT_SUCCESS = 'PROJECT_ACCOUNT_SUCCESS'
export const PROJECT_ACCOUNT_FAILURE = 'PROJECT_ACCOUNT_FAILURE'
export const PROJECT_ACCOUNT_DELETE = 'PROJECT_ACCOUNT_DELETE'

/**
 * Asynchrone Action creator to fetch project user list
 * Fetches all project users
 * Normalize the json response
 *
 * @returns {AsyncAction}
 */
const fetchProjectAccounts = urlProjectAccounts => ({
  [CALL_API]: {
    // endpointKey : key,
    // links: dataObject.links,
    types: [
      PROJECT_ACCOUNT_REQUEST,
      {
        type: PROJECT_ACCOUNT_SUCCESS,
        payload: (action, state, res) => getJSON(res).then(json => normalize(json, Schemas.PROJECT_ACCOUNT_ARRAY)),
      },
      PROJECT_ACCOUNT_FAILURE,
    ],
    endpoint: urlProjectAccounts,
    method: 'GET',
  },
})


/**
 * Action creator to delete project administror by id
 *
 * @param {string} link to the backend endpoint to remove an user
 *
 * @returns {AsyncAction}
 */
export function deleteUser(link) {
  return {
    type: PROJECT_ACCOUNT_DELETE,
    link,
  }
}

export default {
  fetchProjectAccounts,
  deleteUser,
}
