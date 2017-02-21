/**
 * LICENSE_PLACEHOLDER
 **/
const fs = require('fs')
const fsExtra = require('fs-extra')
const logTools = require('./log-tools')

const JSON_CONTENT_TYPE = 'application/json; charset=utf-8'

/**
 * Account pool used to test all possible authentication states: bind model to temp file
 */
const sourceUsersFile = './mocks/facade/resources/account-pool.json'
const runtimeUsersFile = './mocks/facade/runtime/account-pool.temp.json'
fsExtra.copy(sourceUsersFile, runtimeUsersFile)

// load users pool (tool for every method in authentication)
const loadUsersPool = () => JSON.parse(fs.readFileSync(runtimeUsersFile, 'utf8') || logTools.logMessage('Failed reading file', true) || {})
// write users pool
const writeUsersPool = users => fs.writeFileSync(runtimeUsersFile, JSON.stringify(users), 'utf8')

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

const validToken = '123456'


const mockSendMail = (logSubheader, email, requestLink, originUrl) => {
  logTools.logMessage(`Request acknowledged, back URL:
\x1b[4m${requestLink}&token=${validToken}&account_email=${email}&origin_url=${encodeURI(originUrl)}\x1b[0m`, false, logSubheader)
}

/**
 * Do ask an account operation
 */
const doAskOnAccount = (logSubheader, { accountEmail }, { originUrl, requestLink }, doOrFail) => {
  const users = loadUsersPool()
  const user = users[accountEmail]
  const { code, errorMessage } = doOrFail(user, users)
  if (errorMessage) {
    // KO
    logTools.logMessage(errorMessage, true, logSubheader)
    return { code }
  }
  // OK
  mockSendMail(logSubheader, accountEmail, requestLink, originUrl)
  return { code }
}

/**
 * Do perform an account operation (generally finishes an operation asked previously through 'doAskOnAccount')
 */
const doPerformOnAccount = (logSubheader, { accountEmail }, bodyparameters, doOrFail) => {
  const users = loadUsersPool()
  const user = users[accountEmail]
  // here we can check user is already known (no way to perform the operation otherwise)
  if (!user) {
    logTools.logMessage(`Cannot finish operation on unknown user "${accountEmail}"`, true, logSubheader)
    return { code: 400 }
  }
  // always check the token
  if (bodyparameters.token !== validToken) {
    logTools.logMessage(`Invalid token, you may use the valid token "${validToken}"`, true, logSubheader)
    return { code: 403 }
  }

  const { code, errorMessage } = doOrFail(user, bodyparameters)
  if (errorMessage) {
    logTools.logMessage(errorMessage, true, logSubheader)
    return { code }
  }
  // now save the new users pool
  writeUsersPool(users)
  logTools.logMessage('Request correctly handled', false, logSubheader)
  return { code }
}

module.exports = {
  GET: {
    // complete create account (validate)
    validateAccount: {
      url: 'rs-admin/accesses/validateAccount/{token}',
      handler: (request, query, { token }) => {
        if (token === validToken) {
          logTools.logMessage('Account validation OK (mock, no user update) ', false, '>Validate account')
          return { code: 201 }
        }
        logTools.logMessage('Account validation: token NOK ', true, '>Validate account')
        return { code: 403 }
      },
    },
  },
  POST: {
    // login
    login: {
      url: 'oauth/token',
      handler: (request, { username, password, scope }) => authenticate(username, password, scope),
    },
    // ask unlock account
    unlock: {
      url: 'accounts/{accountEmail}/unlockAccount',
      handler: (request, query, pathParameters, bodyParameters) => doAskOnAccount('>Ask unlock account', pathParameters, bodyParameters,
        (user) => {
          if (!user) {
            return { code: 404, errorMessage: 'Unknown user' }
          }
          if (user.state !== 'LOCKED') {
            return { code: 403, errorMessage: 'User not locked' }
          }
          // nothing to do
          return { code: 204 }
        }),
    },
    // ask reset password
    reset: {
      url: 'accounts/{accountEmail}/resetPassword',
      handler: (request, query, pathParameters, bodyParameters) => doAskOnAccount('>Ask reset password', pathParameters, bodyParameters,
        (user) => {
          if (!user) {
            return { code: 404, errorMessage: 'Unknown user' }
          }
          // nothing to do
          return { code: 204 }
        }),
    },
    // ask create account / user
    createAccount: {
      url: '/rs-admin/accesses/',
      handler: (request, query, pathParameters, { email, firstName, lastName, password, requestLink, originUrl }) => {
        const users = loadUsersPool()
        if (firstName && lastName && password) {
          // creating project account (autovalidated so far)
          if (users[email]) {
            logTools.logMessage(`User already exist for mail "${email}"`, true, 'Ask new account')
            return { code: 409 }
          }
          users[email] = {
            firstName,
            lastName,
            password,
            state: 'ACCEPTED',
          }
          logTools.logMessage(`New account created for ${email} (auto accepted).`, false, 'Ask new account')
          mockSendMail('Ask new account', email, requestLink, originUrl)
        } else {
          // creating project user (for CDPP, mock mode)
          const user = users[email]
          if (!user) {
            logTools.logMessage(`No existing account for mail "${email}"`, true, 'Ask new user')
            return { code: 404 }
          } else if (user.cdpp) {
            logTools.logMessage(`Account for "${email}" has already CDPP user`, true, 'Ask new user')
            return { code: 409 }
          }
          user.cdpp = 'ACCESS_GRANTED'
          logTools.logMessage(`User for account "${email}" created for CDPP`, false, 'Ask new user')
        }
        writeUsersPool(users)
        return { code: 201 }
      },
    },
  },
  PUT: {
    // complete unlock account
    unlock: {
      url: '/accounts/{accountEmail}/unlockAccount',
      handler: (request, query, pathParameters, bodyParameters) => doPerformOnAccount('> Finish unlock account', pathParameters, bodyParameters,
        (user) => {
          // update user state
          user.state = 'ACTIVE' // eslint-disable-line
          return { code: 204 }
        }),
    },
    // complete reset password
    reset: {
      url: '/accounts/{accountEmail}/resetPassword',
      handler: (request, query, pathParameters, bodyParameters) => doPerformOnAccount('> Finish unlock account', pathParameters, bodyParameters,
        (user, { newPassword }) => {
          // update user state
          user.password = newPassword // eslint-disable-line
          return { code: 204 }
        }),
    },
  },

}
