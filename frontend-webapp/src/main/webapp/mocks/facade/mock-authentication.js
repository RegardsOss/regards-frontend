/**
 * LICENSE_PLACEHOLDER
 **/
const fs = require('fs')
const fsExtra = require('fs-extra')

const JSON_CONTENT_TYPE = 'application/json; charset=utf-8'

/**
 * Account pool used to test all possible authentication states: bind model to temp file
 */
const sourceUsersFile = './mocks/facade/resources/account-pool.json'
const runtimeUsersFile = './mocks/facade/runtime/account-pool.temp.json'
fsExtra.copy(sourceUsersFile, runtimeUsersFile)

// load users pool (tool for every method in authentication)
const loadUsersPool = () => JSON.parse(fs.readFileSync(runtimeUsersFile, 'utf8') || console.error('Failed reading file') || {})

const validToken = '123456'
const processAccountPOSTRequest = (logSubheader, { accountEmail }, { originUrl, requestLink }) => {
  const failureMail = 'test@fail.com'
  console.info('[Facade mock server]', logSubheader, `use ${failureMail} to test failure case`)
  if (accountEmail === failureMail) {
    console.info('[Facade mock server]', logSubheader, 'Sending unknown mail')
    return { code: 404 }
  }
  console.info('[Facade mock server]', logSubheader, 'Simulate mail callback by clicking the link \n',
    `${requestLink}&token=${validToken}&account_email=${accountEmail}&origin_url=${encodeURI(originUrl)}`)
  return { code: 204 }
}


const authenticate = (login, password, scope) => {
  // 1 - check user
  const users = loadUsersPool()
  const loginUser = users[login]
  if (!loginUser || password !== loginUser.password) {
    // unknown account or wrong password
    return { content: { error: 'ACCOUNT_UNKNOWN' }, contentType: JSON_CONTENT_TYPE, code: 403 }
  }
  // no check if there is any  error with account / user state
  switch (loginUser.state) {
    case 'PENDING':
      return { content: { error: 'ACCOUNT_PENDING' }, contentType: JSON_CONTENT_TYPE, code: 403 }
    case 'ACCEPTED':
      return { content: { error: 'ACCOUNT_ACCEPTED' }, contentType: JSON_CONTENT_TYPE, code: 403 }
    case 'INACTIVE':
      return { content: { error: 'ACCOUNT_INACTIVE' }, contentType: JSON_CONTENT_TYPE, code: 403 }
    case 'LOCKED':
      return { content: { error: 'ACCOUNT_LOCKED' }, contentType: JSON_CONTENT_TYPE, code: 403 }
    case 'ACTIVE':
      // check user state on project
      if (!loginUser[scope.toLowerCase()]) {
        return { content: { error: 'USER_UNKNOWN' }, contentType: JSON_CONTENT_TYPE, code: 403 }
      }
      switch (loginUser[scope.toLowerCase()]) {
        case 'WAITING_ACCESS':
          return { content: { error: 'USER_WAITING_ACCESS' }, contentType: JSON_CONTENT_TYPE, code: 403 }
        case 'ACCESS_DENIED':
          return { content: { error: 'USER_ACCESS_DENIED' }, contentType: JSON_CONTENT_TYPE, code: 403 }
        case 'ACCESS_INACTIVE':
          return { content: { error: 'USER_ACCESS_INACTIVE' }, contentType: JSON_CONTENT_TYPE, code: 403 }
        case 'ACCESS_GRANTED':
          return {
            contentType: JSON_CONTENT_TYPE,
            content: {
              id: 1,
              access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbkBjbmVzLmZyIiwiYXVkIjpbInJzLWdhdGV3YXkiXSwicm9sZSI6IklOU1RBTkNFX0FETUlOIiwidXNlcl9uYW1lIjoiZnIuY25lcy5yZWdhcmRzLmZyYW1ld29yay5zZWN1cml0eS51dGlscy5qd3QuVXNlckRldGFpbHNANTdiZmQ5ZGYiLCJzY29wZSI6WyJjZHBwIl0sInByb2plY3QiOiJjZHBwIiwiZXhwIjoxNDgyNTI3NjI0LCJhdXRob3JpdGllcyI6WyJJTlNUQU5DRV9BRE1JTiJdLCJqdGkiOiI0ZGUzMDBkOC03ODgwLTQ4M2MtYWJhOC1mYzQ1NjBiOTYxYjEiLCJjbGllbnRfaWQiOiJjbGllbnQifQ.GcbFi0J6OUIDqDgCzDYSVel7xI8k_59oP0wn_zvYxqE',
              expires_in: 43199,
              jti: '4de300d8-7880-483c-aba8-fc4560b961b1',
              project: scope,
              role: 'INSTANCE_ADMIN',
              scope,
              sub: login,
              token_type: 'bearer',
              name: '',
            },
          }
        default:
          return { code: 500 }
      }
    default:
      return { code: 500 }
  }
}

module.exports = {
  // ask unlock account
  POST: {
    login: {
      url: 'oauth/token',
      handler: (request, { username, password, scope }) => authenticate(username, password, scope),
    },
    unlock: {
      url: 'accounts/{accountEmail}/unlockAccount',
      handler: (request, query, pathParameters, bodyParameters) => {
        const notLockMail = 'admin@cnes.fr'
        console.info('[Facade mock server]', 'accounts/{accountEmail}/unlockAccount', `use ${notLockMail} to not locked case case`)
        if (pathParameters.accountEmail === notLockMail) {
          return { code: 403 }
        }
        return processAccountPOSTRequest('accounts/{accountEmail}/resetPassword', pathParameters, bodyParameters)
      },
    }, // ask reset password
    reset: {
      url: 'accounts/{accountEmail}/resetPassword',
      handler: (request, query, pathParameters, bodyParameters) => processAccountPOSTRequest('accounts/{accountEmail}/resetPassword', pathParameters, bodyParameters),
    },
  },
  PUT: {
    // complete unlock account
    unlock: {
      url: '/accounts/{accountEmail}/unlockAccount',
      handler: (request, query, { accountEmail }, { token }) => {
        console.info('[Facade mock server]', '[/accounts/{accountEmail}/unlockAccount]', '\n\tEmail', accountEmail, '\n\tToken', token)
        console.info('[Facade mock server]', '[/accounts/{accountEmail}/unlockAccount]', `Only valid token consider is ${validToken}`)
        return { code: token === validToken ? 204 : 403 }
      },
    },
    // complete reset password
    reset: {

      url: '/accounts/{accountEmail}/resetPassword',
      handler: (request, query, { accountEmail }, { token, newPassword }) => {
        console.info('[Facade mock server]', '[/accounts/{accountEmail}/resetPassword]', '\n\tEmail', accountEmail, '\n\tToken', token, '\n\tnewPassword', newPassword)
        console.info('[Facade mock server]', '[/accounts/{accountEmail}/resetPassword]', `Only valid token consider is ${validToken}`)
        return { code: token === validToken ? 204 : 403 }
      },
    },
  },

}
