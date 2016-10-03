const {CALL_API, getJSON} = require('redux-api-middleware')
import { PROJECT_ACCOUNT_ARRAY } from "@regardsoss/api"
import { normalize } from "normalizr"
export const PROJECT_ACCOUNT_REQUEST = 'PROJECT_ACCOUNT_REQUEST'
export const PROJECT_ACCOUNT_SUCCESS = 'PROJECT_ACCOUNT_SUCCESS'
export const PROJECT_ACCOUNT_FAILURE = 'PROJECT_ACCOUNT_FAILURE'

export const PROJECT_ACCOUNT_DELETE = 'PROJECT_ACCOUNT_DELETE'

/**
 * Asynchrone Action creator to fetch project user list
 * Fetches all project users
 * Normalize the json response
 *
 * @return {AsyncAction}
 */
const fetchProjectAccounts = (urlProjectAccounts: String) => ({
  [CALL_API]: {
    // endpointKey : key,
    // links: dataObject.links,
    types: [
      PROJECT_ACCOUNT_REQUEST,
      {
        type: PROJECT_ACCOUNT_SUCCESS,
        payload: (action: any, state: any, res: any) => getJSON(res).then((json: any) => normalize(json, PROJECT_ACCOUNT_ARRAY))
      },
      PROJECT_ACCOUNT_FAILURE
    ],
    endpoint: urlProjectAccounts,
    method: 'GET'
  }
})


/**
 * Action creator to delete project administror by id
 *
 * @param {String} link to the backend endpoint to remove an user
 *
 * @return {AsyncAction}
 */
export function deleteUser (link: string): any {
  return {
    type: PROJECT_ACCOUNT_DELETE,
    link
  }
}

export default {
  fetchProjectAccounts,
  deleteUser
}
