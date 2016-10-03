const {CALL_API} = require('redux-api-middleware')

import { DependencyAccessRight } from "@regardsoss/access-rights"

export const ACCESS_RIGHTS_API = 'http://localhost:8080/api/access/rights'
export const REQUEST_ACCESSRIGHTS = 'REQUEST_ACCESSRIGHTS'
export const RECEIVE_ACCESSRIGHTS = 'RECEIVE_ACCESSRIGHTS'
export const FAILED_ACCESSRIGHTS = 'FAILED_ACCESSRIGHTS'

export const fetchAccessRights = (dependencies: Array<DependencyAccessRight>) => ({
  [CALL_API]: {
    types: [
      REQUEST_ACCESSRIGHTS,
      RECEIVE_ACCESSRIGHTS,
      FAILED_ACCESSRIGHTS
    ],
    endpoint: ACCESS_RIGHTS_API,
    method: 'POST',
    body: JSON.stringify(dependencies)
  }
})
