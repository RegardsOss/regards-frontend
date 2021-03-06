import { storiesOf, action } from '@kadira/storybook'
import { withKnobs, object } from '@storybook/addon-knobs'
import { ResourceAccessFormByMicroserviceContainer } from '@regardsoss/admin-user-role-resource-access-management/src/containers/ResourceAccessFormByMicroserviceContainer'
import { muiTheme } from 'storybook-addon-material-ui'
import { withStore, withLocale } from '../../decorators/index'

const defaultRoleList = {
  1: {
    content: {
      id: 1,
      name: 'PUBLIC',
      permissions: [],
      authorizedAddresses: [],
      isCorsRequestsAuthorized: true,
    },
    links: [],
  },
  2: {
    content: {
      id: 2,
      name: 'REGISTERED_USER',
      permissions: [],
      authorizedAddresses: [],
      isCorsRequestsAuthorized: true,
      parentRole: {
        id: 1,
        name: 'PUBLIC',
        permissions: [],
        authorizedAddresses: [],
        isCorsRequestsAuthorized: true,
      },
    },
    links: [],
  },
}
const defaultResourceList = {
  1: {
    content: {
      id: 1,
      description: 'Retrieves the settings managing the access requests',
      microservice: 'rs-admin',
      resource: '/accesses/settings',
      verb: 'GET',
    },
    links: [{
      rel: 'self',
      href: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/1',
      template: {
        variables: { variables: [] },
        baseUri: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/1',
      },
    }, {
      rel: 'update',
      href: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/1',
      template: {
        variables: { variables: [] },
        baseUri: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/1',
      },
    }],
  },
  2: {
    content: {
      id: 2,
      description: 'Updates the setting managing the access requests',
      microservice: 'rs-admin',
      resource: '/accesses/settings',
      verb: 'PUT',
    },
    links: [{
      rel: 'self',
      href: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/2',
      template: {
        variables: { variables: [] },
        baseUri: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/2',
      },
    }, {
      rel: 'update',
      href: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/2',
      template: {
        variables: { variables: [] },
        baseUri: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/2',
      },
    }],
  },
  3: {
    content: {
      id: 3,
      description: 'create an new account',
      microservice: 'rs-admin',
      resource: '/accounts',
      verb: 'POST',
    },
    links: [{
      rel: 'self',
      href: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/3',
      template: {
        variables: { variables: [] },
        baseUri: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/3',
      },
    }, {
      rel: 'update',
      href: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/3',
      template: {
        variables: { variables: [] },
        baseUri: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/3',
      },
    }],
  },
  4: {
    content: {
      id: 4,
      description: 'retrieve the account account_id',
      microservice: 'rs-admin',
      resource: '/accounts/{account_id}',
      verb: 'GET',
    },
    links: [{
      rel: 'self',
      href: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/4',
      template: {
        variables: { variables: [] },
        baseUri: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/4',
      },
    }, {
      rel: 'update',
      href: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/4',
      template: {
        variables: { variables: [] },
        baseUri: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/4',
      },
    }],
  },
  5: {
    content: {
      id: 5,
      description: 'retrieve the account with his unique email',
      microservice: 'rs-admin',
      resource: '/accounts/account/{account_email}',
      verb: 'GET',
    },
    links: [{
      rel: 'self',
      href: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/5',
      template: {
        variables: { variables: [] },
        baseUri: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/5',
      },
    }, {
      rel: 'update',
      href: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/5',
      template: {
        variables: { variables: [] },
        baseUri: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/5',
      },
    }],
  },
  6: {
    content: {
      id: 6,
      description: 'update the account account_id according to the body specified',
      microservice: 'rs-admin',
      resource: '/accounts/{account_id}',
      verb: 'PUT',
    },
    links: [{
      rel: 'self',
      href: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/6',
      template: {
        variables: { variables: [] },
        baseUri: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/6',
      },
    }, {
      rel: 'update',
      href: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/6',
      template: {
        variables: { variables: [] },
        baseUri: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/6',
      },
    }],
  },
  7: {
    content: {
      id: 7,
      description: 'remove the account account_id',
      microservice: 'rs-admin',
      resource: '/accounts/{account_id}',
      verb: 'DELETE',
    },
    links: [{
      rel: 'self',
      href: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/7',
      template: {
        variables: { variables: [] },
        baseUri: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/7',
      },
    }, {
      rel: 'update',
      href: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/7',
      template: {
        variables: { variables: [] },
        baseUri: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/7',
      },
    }],
  },
  8: {
    content: {
      id: 8,
      description: 'send a code of type type to the email specified',
      microservice: 'rs-admin',
      resource: '/accounts/{account_id}/accountUnlock',
      verb: 'GET',
    },
    links: [{
      rel: 'self',
      href: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/8',
      template: {
        variables: { variables: [] },
        baseUri: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/8',
      },
    }, {
      rel: 'update',
      href: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/8',
      template: {
        variables: { variables: [] },
        baseUri: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/8',
      },
    }],
  },
  9: {
    content: {
      id: 9,
      description: 'unlock the account account_id according to the code unlock_code',
      microservice: 'rs-admin',
      resource: '/accounts/{account_id}/unlock/{unlock_code}',
      verb: 'GET',
    },
    links: [{
      rel: 'self',
      href: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/9',
      template: {
        variables: { variables: [] },
        baseUri: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/9',
      },
    }, {
      rel: 'update',
      href: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/9',
      template: {
        variables: { variables: [] },
        baseUri: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/9',
      },
    }],
  },
  10: {
    content: {
      id: 10,
      description: 'change the passsword of account account_id according to the code reset_code',
      microservice: 'rs-admin',
      resource: '/accounts/{account_id}/password/{reset_code}',
      verb: 'PUT',
    },
    links: [{
      rel: 'self',
      href: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/10',
      template: {
        variables: { variables: [] },
        baseUri: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/10',
      },
    }, {
      rel: 'update',
      href: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/10',
      template: {
        variables: { variables: [] },
        baseUri: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/10',
      },
    }],
  },
  11: {
    content: {
      id: 11,
      description: 'send a code of type type to the email specified',
      microservice: 'rs-admin',
      resource: '/accounts/code',
      verb: 'GET',
    },
    links: [{
      rel: 'self',
      href: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/11',
      template: {
        variables: { variables: [] },
        baseUri: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/11',
      },
    }, {
      rel: 'update',
      href: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/11',
      template: {
        variables: { variables: [] },
        baseUri: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/11',
      },
    }],
  },
  12: {
    content: {
      id: 12,
      description: 'Validate the account password',
      microservice: 'rs-admin',
      resource: '/accounts/{account_email}/validate',
      verb: 'GET',
    },
    links: [{
      rel: 'self',
      href: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/12',
      template: {
        variables: { variables: [] },
        baseUri: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/12',
      },
    }, {
      rel: 'update',
      href: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/12',
      template: {
        variables: { variables: [] },
        baseUri: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/12',
      },
    }],
  },
  13: {
    content: {
      id: 13,
      description: 'retrieve the list of account in the instance',
      microservice: 'rs-admin',
      resource: '/accounts',
      verb: 'GET',
    },
    links: [{
      rel: 'self',
      href: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/13',
      template: {
        variables: { variables: [] },
        baseUri: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/13',
      },
    }, {
      rel: 'update',
      href: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/13',
      template: {
        variables: { variables: [] },
        baseUri: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/13',
      },
    }],
  },
  14: {
    content: {
      id: 14,
      description: 'Retrieve all resource accesses of the REGARDS system',
      microservice: 'rs-admin',
      resource: '/resources/microservices/{microservice}',
      verb: 'GET',
    },
    links: [{
      rel: 'self',
      href: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/14',
      template: {
        variables: { variables: [] },
        baseUri: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/14',
      },
    }, {
      rel: 'update',
      href: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/14',
      template: {
        variables: { variables: [] },
        baseUri: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/14',
      },
    }],
  },
  15: {
    content: {
      id: 15,
      description: 'Retrieve all resource accesses of the REGARDS system',
      microservice: 'rs-admin',
      resource: '/resources',
      verb: 'GET',
    },
    links: [{
      rel: 'self',
      href: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/15',
      template: {
        variables: { variables: [] },
        baseUri: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/15',
      },
    }, {
      rel: 'update',
      href: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/15',
      template: {
        variables: { variables: [] },
        baseUri: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/15',
      },
    }],
  },
  16: {
    content: {
      id: 16,
      description: 'Retrieve all resource accesses of the REGARDS system',
      microservice: 'rs-admin',
      resource: '/resources/{resource_id}',
      verb: 'GET',
    },
    links: [{
      rel: 'self',
      href: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/16',
      template: {
        variables: { variables: [] },
        baseUri: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/16',
      },
    }, {
      rel: 'update',
      href: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/16',
      template: {
        variables: { variables: [] },
        baseUri: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/16',
      },
    }],
  },
  17: {
    content: {
      id: 17,
      description: 'Update access to a given resource',
      microservice: 'rs-admin',
      resource: '/resources/{resource_id}',
      verb: 'PUT',
    },
    links: [{
      rel: 'self',
      href: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/17',
      template: {
        variables: { variables: [] },
        baseUri: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/17',
      },
    }, {
      rel: 'update',
      href: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/17',
      template: {
        variables: { variables: [] },
        baseUri: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/17',
      },
    }],
  },
  18: {
    content: {
      id: 18,
      description: 'retrieve the list of specific access rights and the role of the project user',
      microservice: 'rs-admin',
      resource: '/resources/users/{user_email}',
      verb: 'GET',
    },
    links: [{
      rel: 'self',
      href: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/18',
      template: {
        variables: { variables: [] },
        baseUri: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/18',
      },
    }, {
      rel: 'update',
      href: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/18',
      template: {
        variables: { variables: [] },
        baseUri: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/18',
      },
    }],
  },
  19: {
    content: {
      id: 19,
      description: 'update the list of specific user access rights',
      microservice: 'rs-admin',
      resource: '/resources/users/{user_email}',
      verb: 'PUT',
    },
    links: [{
      rel: 'self',
      href: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/19',
      template: {
        variables: { variables: [] },
        baseUri: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/19',
      },
    }, {
      rel: 'update',
      href: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/19',
      template: {
        variables: { variables: [] },
        baseUri: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/19',
      },
    }],
  },
  20: {
    content: {
      id: 20,
      description: 'remove all the specific access rights',
      microservice: 'rs-admin',
      resource: '/resources/users/{user_email}',
      verb: 'DELETE',
    },
    links: [{
      rel: 'self',
      href: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/20',
      template: {
        variables: { variables: [] },
        baseUri: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/20',
      },
    }, {
      rel: 'update',
      href: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/20',
      template: {
        variables: { variables: [] },
        baseUri: 'http://127.0.0.1:8000/api/v1/rs-admin/resources/20',
      },
    }],
  },
}
const controllerList = ['controller-1', 'controller-2', 'controller-3', 'controller-4']

storiesOf('Project admin - Resource access', module)
  .addDecorator(withLocale('modules/admin-user-role-resource-access-management/src/i18n'))
  .addDecorator(withKnobs)
  .addDecorator(withStore)
  .addDecorator(muiTheme())
  .add('Form', () => {
    const role = object('Role', defaultRoleList[1])
    const resourceList = object('Resource list', defaultResourceList)
    return (
      <ResourceAccessFormByMicroserviceContainer
        microserviceName="microservice-1"
        currentRole={role}
        controllerList={controllerList}
        resourceList={resourceList}
        fetchControllerList={action('fetchControllerList')}
        fetchResourceList={action('fetchResourceList')}
        updateRole={action('updateRole')}
      />
    )
  })

