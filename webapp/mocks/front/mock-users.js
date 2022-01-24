/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
const _ = require('lodash')

const { JSON_CONTENT_TYPE, logMessage, makePageResult, copyFile, loadJSONModelFile, writeJSONModelFile } = require('./mock-front-utils')

const getAllLinks = () => [
  {
    rel: 'self',
    href: 'http://localhost:3333/unused',
  },
  {
    rel: 'delete',
    href: 'http://localhost:3333/unused',
  },
  {
    rel: 'update',
    href: 'http://localhost:3333/unused',
  },
  {
    rel: 'create',
    href: 'http://localhost:3333/unused',
  },
  {
    rel: 'list',
    href: 'http://localhost:3333/unused',
  },
]

/**
 * Account pool used to test all possible authentication states: bind model to temp file
 */
const sourceUsersFile = './mocks/front/resources/accounts.json'
const runtimeUsersFile = './mocks/front/runtime/accounts.temp.json'
copyFile(sourceUsersFile, runtimeUsersFile)
// load users pool
const loadUsersPool = () => loadJSONModelFile(runtimeUsersFile)
// write users pool
const writeUsersPool = users => writeJSONModelFile(runtimeUsersFile, users)

const validationTokensPool = {}
// static : last user logged (WARN: only one user can consitently be logged on this mock server)
const usersLogged = []
const authenticate = (login, password, scope) => {
  // 1 - check user
  const users = loadUsersPool()
  const loginUser = users[login]
  if (!loginUser || password !== loginUser.password) {
    // unknown account or wrong password
    return {
      content: { error: 'ACCOUNT_UNKNOWN' },
      contentType: JSON_CONTENT_TYPE,
      code: 403
    }
  }
  // no check if there is any  error with account / user state
  switch (loginUser.status) {
    case 'PENDING':
      return {
        content: { error: 'ACCOUNT_PENDING' },
        contentType: JSON_CONTENT_TYPE,
        code: 403
      }
    case 'ACCEPTED':
      return {
        content: { error: 'ACCOUNT_ACCEPTED' },
        contentType: JSON_CONTENT_TYPE,
        code: 403
      }
    case 'INACTIVE':
      return {
        content: { error: 'ACCOUNT_INACTIVE' },
        contentType: JSON_CONTENT_TYPE,
        code: 403
      }
    case 'LOCKED':
      return {
        content: { error: 'ACCOUNT_LOCKED' },
        contentType: JSON_CONTENT_TYPE,
        code: 403
      }
    case 'ACTIVE':
      // check user state on project
      if (!loginUser[scope.toLowerCase()]) {
        return {
          content: { error: 'USER_UNKNOWN' },
          contentType: JSON_CONTENT_TYPE,
          code: 403
        }
      }
      switch (loginUser[scope.toLowerCase()].status) {
        case 'WAITING_ACCESS':
          return {
            content: { error: 'USER_WAITING_ACCESS' },
            contentType: JSON_CONTENT_TYPE,
            code: 403
          }
        case 'ACCESS_DENIED':
          return {
            content: { error: 'USER_ACCESS_DENIED' },
            contentType: JSON_CONTENT_TYPE,
            code: 403
          }
        case 'ACCESS_INACTIVE':
          return {
            content: { error: 'USER_ACCESS_INACTIVE' },
            contentType: JSON_CONTENT_TYPE,
            code: 403
          }
        case 'ACCESS_GRANTED': {
          const newLoggedUser = {
            project: scope,
            scope,
            sub: login,
            role: loginUser[scope.toLowerCase()].role.name,
            access_token: usersLogged.length.toString(),
            token_type: 'bearer',
            expires_in: 3600,
            jti: '4de300d8-7880-483c-aba8-fc4560b961b1',
          }
          usersLogged.push(newLoggedUser)
          return {
            contentType: JSON_CONTENT_TYPE,
            content: newLoggedUser,
          }
        }
        default:
          return { code: 500 }
      }
    default:
      return { code: 500 }
  }
}

const accountRequestValidToken = '123456'

const mockSendMail = (logSubheader, email, requestLink, originUrl, token = accountRequestValidToken) => {
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
  if (bodyparameters.token !== accountRequestValidToken) {
    logMessage(`Invalid token, you may use the valid token "${accountRequestValidToken}"`, true, logSubheader)
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
 *  Executes a service  with the authentication data (or returns 403 as unauthentified)
 * @callback scope (String) => { code, content, contentType }
 * @return { code, content, contentType } for request response
 */
const doWithAuthData = (request, callback) => {
  const tokenBearer = request.headers.authorization
  if (!tokenBearer) {
    return { code: 403 }
  }
  const matched = /Bearer ([0-9]+)/.exec(tokenBearer)
  const tokenValue = (matched && matched[1] && parseInt(matched[1], 10))
  if (usersLogged.length <= tokenValue) {
    // unconsitent
    return { code: 403 }
  }
  return callback(usersLogged[tokenValue])
}

const getAccountList = (filterStatus) => {
  const correspondingAccounts = _.pickBy(loadUsersPool(), u => !filterStatus || u.status === filterStatus)
  return makePageResult(correspondingAccounts, ({ id, lastName, firstName, status }, email) => ({
    content: {
      id,
      lastName,
      email,
      firstName,
      status
    },
    links: getAllLinks(),
  }))
}

/**
 * Returns scope users, can filter with status (optional)
 */
const getScopeUsers = (users, scope, status) => _.pickBy(users, u => u[scope] && (!status || u[scope].status === status))

const getUsersList = (request, { status }, pathParameters) => {
  // convert account / users in scope
  const withAuthDataCallback = ({ scope }) => {
    const correspondingUsers = getScopeUsers(loadUsersPool(), scope, status)
    return makePageResult(correspondingUsers, (user, userMail) => {
      const { id, role, status: userStatus, metadata } = user[scope]
      return {
        content: {
          id,
          email: userMail,
          lastUpdate: user.lastUpdate,
          lastConnection: user.lastConnection,
          role,
          status: userStatus,
          permissions: [],
          metadata,
        },
        links: getAllLinks(),
      }
    })
  }
  // do users list conversion, in token scope
  return doWithAuthData(request, withAuthDataCallback)
}

/**
 * Changes a user status in current scope.
 */
const changeUserStatus = (request, pathParameters, toStatus) => doWithAuthData(request, ({ scope }) => {
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

const allRoles = loadJSONModelFile('./mocks/front/resources/borrowableRoles.json')

module.exports = {
  GET: {
    accounts: {
      url: 'rs-admin/accounts',
      handler: (request, { status }) => getAccountList(status),
    },
    accountPasswordRules: {
      url: 'rs-admin/accounts/password',
      handler: (request, { status }) => ({
        content: { rules: 'Le mot de passe doit être composé d\'au moins 8 caractères et contenir un chiffre.' },
        contentType: JSON_CONTENT_TYPE
      }),
    },
    // Perform email verification
    verifyEmail: {
      url: 'rs-admin/accesses/verifyEmail/{token}',
      handler: (request, query, { token }) => {
        const userLogin = validationTokensPool[token]
        if (userLogin) {
          delete validationTokensPool[token]
          const users = loadUsersPool()
          logMessage('Email verification OK ', false, '>Email verification')
          users[userLogin].status = 'ACTIVE'
          writeUsersPool(users)
          return { code: 201 }
        }
        logMessage('Email verification: token NOK ', true, '>Email verification')
        return { code: 403 }
      },
    },
    getUsers: {
      url: 'users',
      handler: getUsersList,
    },
    getBorrowableRoles: {
      url: 'rs-admin/roles/borrowable',
      handler: request => doWithAuthData(request, (authData) => {
        const users = loadUsersPool()
        const localScope = authData.scope ? authData.scope.toLowerCase() : 'instance'
        const role = users[authData.sub][localScope].role.name
        const findRole = roleName => (_.find(allRoles, ({ content: { name } }) => name === roleName))
        const currentRoleData = findRole(role)
        // make role list using successive parents of the logged user
        const makeAllRoles = (parentRole) => {
          if (!parentRole) {
            return []
          }
          return [findRole(parentRole.name)].concat(makeAllRoles(parentRole.parentRole))
        }
        const borrowableRoles = [currentRoleData].concat(makeAllRoles(currentRoleData.content.parentRole))
        return {
          content: borrowableRoles,
          contentType: JSON_CONTENT_TYPE
        }
      })
      ,
    },
    changeRole: {
      url: 'borrowRole/{roleName}',
      handler: (request, query, { roleName }) => doWithAuthData(request, (authData) => {
        const newAuthData = usersLogged[authData.access_token]
        newAuthData.role = roleName
        newAuthData.access_token = usersLogged.length
        usersLogged.push(newAuthData)
        return {
          content: newAuthData,
          contentType: JSON_CONTENT_TYPE,
        }
      }),
    },
    // user metadata 
    getMyUser: {
      url: 'rs-admin/users/myuser',
      handler: (request) => doWithAuthData(request, authData => {
        const users = loadUsersPool()
        if (!authData.scope) {
          return { code: 403 }
        }
        const user = users[authData.sub]
        const scopedUser = user[authData.scope]
        if (!scopedUser) {
          return { code: 404 }
        }

        return {
          content: {
            content: {
              id: user.id,
              email: authData.sub,
              metadata: scopedUser.metadata,
            },
            links: [],
          },
          contentType: JSON_CONTENT_TYPE,
        }
      })
    }
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
            return {
              code: 404,
              errorMessage: 'Unknown user'
            }
          }
          if (user.status !== 'LOCKED') {
            return {
              code: 403,
              errorMessage: 'User not locked'
            }
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
            return {
              code: 404,
              errorMessage: 'Unknown user'
            }
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
    accountPasswordValidation: {
      url: 'rs-admin/accounts/password',
      handler: (request, query, pathParameters, { password }) => {
        return {
          content: {
            validity: password.length >= 8 && /[1-9]+/.test(password)
          },
          contentType: JSON_CONTENT_TYPE,
        }
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
    updateMyUser: {
      url: 'rs-admin/users/myuser',
      handler: (request, query, pathParameters, body) => doWithAuthData(request, authData => {
        const users = loadUsersPool()
        if (!authData.scope) {
          return { code: 403 }
        }
        const user = users[authData.sub]
        const scopedUser = user[authData.scope]
        if (!scopedUser) {
          return { code: 404 }
        }
        if (scopedUser.id !== body.id || authData.sub !== body.email) {
          logMessage('Failed updating project user: Invalid data send', true)
          return { code: 500 }
        }
        // update user and return updated instance
        scopedUser.metadata = body.metadata
        writeUsersPool(users)
        return {
          content: {
            content: {
              id: user.id,
              email: authData.sub,
              metadata: scopedUser.metadata,
            },
            links: [],
          },
          contentType: JSON_CONTENT_TYPE,
        }
      })
    }
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
