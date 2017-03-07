/**
 * LICENSE_PLACEHOLDER
 **/
const fs = require('fs')
const _ = require('lodash')
const fsExtra = require('fs-extra')
const { JSON_CONTENT_TYPE, logMessage, makePageResult } = require('./mock-front-utils')

/**
 * Account pool used to test all possible authentication states: bind model to temp file
 */
const sourceUsersFile = './mocks/front/resources/account-pool.json'
const runtimeUsersFile = './mocks/front/runtime/account-pool.temp.json'
fsExtra.copy(sourceUsersFile, runtimeUsersFile)

// load users pool (tool for every method in authentication)
const loadUsersPool = () => JSON.parse(fs.readFileSync(runtimeUsersFile, 'utf8') || logMessage('Failed reading file', true) || {})
// write users pool
const writeUsersPool = users => fs.writeFileSync(runtimeUsersFile, JSON.stringify(users), 'utf8')

const sessionTokens = [
  {
    scope: 'cdpp',
    value: 1,
  }, {
    scope: 'ssalto',
    value: 2,
  }, {
    scope: 'instance',
    value: 3,
  },
]
const validationTokensPool = {}
const authenticate = (login, password, scope) => {
  // 1 - check user
  const users = loadUsersPool()
  const loginUser = users[login]
  if (!loginUser || password !== loginUser.password) {
    // unknown account or wrong password
    return { content: { error: 'ACCOUNT_UNKNOWN' }, contentType: JSON_CONTENT_TYPE, code: 403 }
  }
  // no check if there is any  error with account / user state
  switch (loginUser.status) {
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
      switch (loginUser[scope.toLowerCase()].status) {
        case 'WAITING_ACCESS':
          return { content: { error: 'USER_WAITING_ACCESS' }, contentType: JSON_CONTENT_TYPE, code: 403 }
        case 'ACCESS_DENIED':
          return { content: { error: 'USER_ACCESS_DENIED' }, contentType: JSON_CONTENT_TYPE, code: 403 }
        case 'ACCESS_INACTIVE':
          return { content: { error: 'USER_ACCESS_INACTIVE' }, contentType: JSON_CONTENT_TYPE, code: 403 }
        case 'ACCESS_GRANTED':
          {
            const token = _.find(sessionTokens, t => t.scope === scope.toLowerCase())
            return {
              contentType: JSON_CONTENT_TYPE,
              content: {
                id: 1,
                access_token: token.value,
                expires_in: 3600,
                jti: '4de300d8-7880-483c-aba8-fc4560b961b1',
                project: token.scope,
                role: 'INSTANCE_ADMIN',
                token: token.value,
                sub: login,
                token_type: 'bearer',
                name: '',
              },
            }
          }
        default:
          return { code: 500 }
      }
    default:
      return { code: 500 }
  }
}

const validToken = '123456'


const mockSendMail = (logSubheader, email, requestLink, originUrl, token = validToken) => {
  logMessage(`Request acknowledged, back URL:
\x1b[4m${requestLink}&token=${token}&account_email=${email}&origin_url=${encodeURI(originUrl)}\x1b[0m`, false, logSubheader)
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
    logMessage(errorMessage, true, logSubheader)
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
    logMessage(`Cannot finish operation on unknown user "${accountEmail}"`, true, logSubheader)
    return { code: 400 }
  }
  // always check the token
  if (bodyparameters.token !== validToken) {
    logMessage(`Invalid token, you may use the valid token "${validToken}"`, true, logSubheader)
    return { code: 403 }
  }

  const { code, errorMessage } = doOrFail(user, bodyparameters)
  if (errorMessage) {
    logMessage(errorMessage, true, logSubheader)
    return { code }
  }
  // now save the new users pool
  writeUsersPool(users)
  logMessage('Request correctly handled', false, logSubheader)
  return { code }
}

/**
 *  Executes a service  with the token scope (or returns 403 as unauthentified)
 * @callback scope (String) => { code, content, contentType }
 * @return { code, content, contentType } for request response
 */
const doWithTokenScope = (request, callback) => {
  const tokenBearer = request.headers.authorization
  if (!tokenBearer) {
    return { code: 403 }
  }
  const matched = /Bearer ([0-9]+)/.exec(tokenBearer)
  const tokenValue = (matched && matched[1] && parseInt(matched[1], 10)) || 3
  const scope = _.find(sessionTokens, t => t.value === tokenValue).scope
  return callback(scope)
}

const getAccountList = (filterStatus) => {
  const correspondingAccounts = _.pickBy(loadUsersPool(), u => !filterStatus || u.status === filterStatus)
  return makePageResult(correspondingAccounts, ({ id, lastName, firstName, status }, email) => ({
    content: { id, lastName, email, firstName, status },
    links: [],
  }))
}


/**
 * Returns scope users, can filter with status (optional)
 */
const getScopeUsers = (users, scope, status) => _.pickBy(users, u => u[scope] && (!status || u[scope].status === status))


const getUsersList = (request, { status }, pathParameters) => {
  // convert account / users in scope
  const doInScope = (scope) => {
    const correspondingUsers = getScopeUsers(loadUsersPool(), scope, status)
    return makePageResult(correspondingUsers, (user, userMail) => {
      const { id, role, status: userStatus } = user[scope]
      return {
        content: {
          id,
          email: userMail,
          lastUpdate: user.lastUpdate,
          lastConnection: user.lastConnection,
          role,
          status: userStatus,
          permissions: [],
        },
        links: [],
      }
    })
  }
  // do users list conversion, in token scope
  return doWithTokenScope(request, doInScope)
}

/**
 * Changes a user status in current scope.
 */
const changeUserStatus = (request, pathParameters, toStatus) => doWithTokenScope(request, (scope) => {
  const users = loadUsersPool()
  const waitingScopeUsers = getScopeUsers(users, scope)
  const userId = parseInt(pathParameters.userId, 10)
  const userToValidate = _.find(waitingScopeUsers, user => user[scope].id === userId)
  if (_.isEmpty(userToValidate)) {
    return { code: 404 }
  }
  userToValidate[scope].status = toStatus
  writeUsersPool(users)
  return { code: 204 }
})

module.exports = {
  GET: {
    accounts: {
      url: 'rs-admin/accounts',
      handler: (request, { status }) => getAccountList(status),
    },
    // complete create account (validate)
    validateAccount: {
      url: 'rs-admin/accesses/validateAccount/{token}',
      handler: (request, query, { token }) => {
        const userLogin = validationTokensPool[token]
        if (userLogin) {
          delete validationTokensPool[token]
          const users = loadUsersPool()
          logMessage('Account validation OK ', false, '>Validate account')
          users[userLogin].status = 'ACTIVE'
          writeUsersPool(users)
          return { code: 201 }
        }
        logMessage('Account validation: token NOK ', true, '>Validate account')
        return { code: 403 }
      },
    },
    getUsers: {
      url: 'users',
      handler: getUsersList,
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
          if (user.status !== 'LOCKED') {
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
            logMessage(`User already exist for mail "${email}"`, true, 'Ask new account')
            return { code: 409 }
          }
          const prevAccountId = _.reduce(users, (acc, user, value) => Math.max(acc, user.id), 0)
          const prevUserId = _.reduce(users, (acc, user, value) => user.cdpp ? Math.max(acc, user.cdpp.id) : acc, 0)
          const token = prevAccountId + 1000
          validationTokensPool[token.toString()] = email

          users[email] = {
            id: prevAccountId + 1,
            firstName,
            lastName,
            password,
            lastUpdate: '2017-02-20T11:55:05.012',
            lastConnection: '2023-04-30T18:20:02.012',
            status: 'PENDING',
            cdpp: {
              id: prevUserId + 1,
              status: 'WAITING_ACCESS',
              role: {
                id: 2,
                name: 'REGISTERED_USER',
              },
            },
          }
          writeUsersPool(users)
          logMessage(`New account created for ${email} (auto accepted).`, false, 'Ask new account')
          mockSendMail('Ask new account', email, requestLink, originUrl, token)
        } else {
          // creating project user (for CDPP, mock mode)
          const user = users[email]
          if (!user) {
            logMessage(`No existing account for mail "${email}"`, true, 'Ask new user')
            return { code: 404 }
          } else if (user.cdpp) {
            logMessage(`Account for "${email}" has already CDPP user`, true, 'Ask new user')
            return { code: 409 }
          }
          user.cdpp = 'ACCESS_GRANTED'
          logMessage(`User for account "${email}" created for CDPP`, false, 'Ask new user')
        }
        writeUsersPool(users)
        return { code: 201 }
      },
    },
  },
  PUT: {
    acceptAccount: {
      url: '/accounts/acceptAccount/{accountId}',
      handler: (request, query, { accountId }) => {
        const id = parseInt(accountId, 10)
        const users = loadUsersPool()
        const acceptedUser = _.find(users, user => user.id === id)
        if (!acceptedUser) {
          return { code: 404 }
        }
        acceptedUser.status = 'ACCEPTED'
        writeUsersPool(users)
        return { code: 204 }
      },
    },
    // complete unlock account
    unlock: {
      url: '/accounts/{accountEmail}/unlockAccount',
      handler: (request, query, pathParameters, bodyParameters) => doPerformOnAccount('> Finish unlock account', pathParameters, bodyParameters,
        (user) => {
          // update user state
          user.status = 'ACTIVE' // eslint-disable-line
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
    acceptProjectAccess: {
      url: '/rs-admin/accesses/accept/{userId}',
      handler: (request, query, pathParameters) => changeUserStatus(request, pathParameters, 'ACCESS_GRANTED'),
    },
    denyProjectAccess: {
      url: '/rs-admin/accesses/deny/{userId}',
      handler: (request, query, pathParameters) => changeUserStatus(request, pathParameters, 'ACCESS_DENIED'),
    },
  },
  DELETE: {
    deleteAccount: {
      url: 'rs-admin/accounts/{accountId}',
      handler: (request, query, { accountId }) => {
        const users = loadUsersPool()
        const id = parseInt(accountId, 10)
        const filtered = _.pickBy(users, u => u.id !== id)
        writeUsersPool(filtered)
        return { code: 204 }
      },
    },
  },
}
