/**
 * LICENSE_PLACEHOLDER
 **/
export default {
  ProjectSidebarComponent: {
    users: [
      '/accesses/settings@GET',
      '/accesses/settings@PUT',
    ],
    datamanagement: [
      '/accounts@POST',
      '/accounts/{account_id}@GET',
    ],
    dataaccessrights: {
      5: {
        id: 5,
        description: 'retrieve the account with his unique email',
        microservice: 'rs-admin',
        resource: '/accounts/account/{account_email}',
        verb: 'GET',
      },
      6: {
        id: 6,
        description: 'update the account account_id according to the body specified',
        microservice: 'rs-admin',
        resource: '/accounts/{account_id}',
        verb: 'PUT',
      },
    },
    plugins: {
      7: {
        id: 7,
        description: 'remove the account account_id',
        microservice: 'rs-admin',
        resource: '/accounts/{account_id}',
        verb: 'DELETE',
      },
      8: {
        id: 8,
        description: 'send a code of type type to the email specified',
        microservice: 'rs-admin',
        resource: '/accounts/{account_id}/accountUnlock',
        verb: 'GET',
      },
    },
    microservices: {
      14: {
        id: 14,
        description: 'Retrieve all resource accesses of the REGARDS system',
        microservice: 'rs-admin',
        resource: '/resources/microservices/{microservice}',
        verb: 'GET',
      },
    },
    'ui.configuration': {
      14: {
        id: 14,
        description: 'Retrieve all resource accesses of the REGARDS system',
        microservice: 'rs-admin',
        resource: '/resources/microservices/{microservice}',
        verb: 'GET',
      },
    },
    news: {
      20: {
        id: 20,
        description: 'remove all the specific access rights',
        microservice: 'rs-admin',
        resource: '/resources/users/{user_email}',
        verb: 'DELETE',
      },
    },
  },
}

