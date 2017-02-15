/**
 * LICENSE_PLACEHOLDER
 **/

const unlockAccountURL = 'accounts/{accountEmail}/unlockAccount'

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


module.exports = {
  // ask unlock account
  POST: {
    unlock: {
      url: unlockAccountURL,
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
