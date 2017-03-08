import { storiesOf, action } from '@kadira/storybook'
import { withKnobs, boolean, object } from '@kadira/storybook-addon-knobs'
import ProjectUserListComponent from '@regardsoss/admin-user-projectuser-management/src/components/ProjectUserListComponent'
import ProjectUserCreateComponent from '@regardsoss/admin-user-projectuser-management/src/components/ProjectUserCreateComponent'
import { muiTheme } from 'storybook-addon-material-ui'
import { withStore, withLocale } from '../../decorators/index'

const defaultProjectUsersList = {
  0: {
    content: {
      id: 0,
      role: {
        id: 2,
        name: 'ADMIN',
      },
      email: 'email@cnes.com',
      lastUpdate: '2017-02-20T11:55:05.012',
      status: 'ACCESS_GRANTED',
    },
    links: [],
  },
  1: {
    content: {
      id: 1,
      role: {
        id: 3,
        name: 'REGISTERD_USER',
      },
      email: 'email2@cnes.com',
      lastUpdate: '2017-02-20T11:55:05.012',
      status: 'WAITING_ACCESS',
    },
    links: [],
  },
}

const defaultWaitingUsersList = {
  1: {
    content: {
      id: 1,
      role: {
        id: 3,
        name: 'REGISTERD_USER',
      },
      email: 'email2@cnes.com',
      lastUpdate: '2017-02-20T11:55:05.012',
      status: 'WAITING_ACCESS',
    },
    links: [],
  },
}

const defaultRolesList = {
  0: {
    content: {
      id: 0,
      name: 'INSTANCE_ADMIN',
    },
    links: [],
  },
  1: {
    content: {
      id: 1,
      name: 'REGISTERD_USER',
    },
    links: [],
  },
}

const defaultGroupList = {
  1: {
    content: {
      id: 1,
      name: 'AG1',
      users: [{ email: 'test@test.fr' }, { email: 'mon@adresse.em' }],
      accessRights: [],
      isPrivate: true,
    },
    links: [],
  },
  2: {
    content: {
      id: 2,
      name: 'AG2',
      users: [],
      accessRights: [],
      isPrivate: true,
    },
    links: [],
  },
}


storiesOf('Project admin - Project user', module)
  .addDecorator(withLocale('modules/admin-user-projectuser-management/src/i18n'))
  .addDecorator(withKnobs)
  .addDecorator(withStore)
  .addDecorator(muiTheme())
  .add('List', () => (
    <ProjectUserListComponent
      initialFecthing={boolean('Loading initial data?', false)}
      isFetchingActions={boolean('Loading after action?', false)}
      users={object('Users list', defaultProjectUsersList)}
      waitingAccessUsers={object('Users list', defaultWaitingUsersList)}
      onEdit={action('onEdit')}
      onDelete={action('onDelete')}
      onValidate={action('onValidate')}
      onDeny={action('onDeny')}
      onValidateAll={action('onValidateAll')}
      backUrl={'back/url'}
      createUrl={'create/url'}
    />
    ))
  .add('Create', () => {
    const rolesList = object('Roles list', defaultRolesList)
    return (
      <ProjectUserCreateComponent
        change={() => { }}
        currentUser={undefined}
        groupList={object('Group list', defaultGroupList)}
        roleList={rolesList}
        backUrl={'back/url'}
        onSubmit={action('onSubmit')}
        handleSubmit={action('called submit')}
        pristine
        initialize={() => { }}
      />
    )
  })
  .add('Edit', () => {
    const rolesList = object('Roles list', defaultRolesList)
    return (
      <ProjectUserCreateComponent
        change={() => { }}
        currentUser={object('Edited user (none for new)', defaultProjectUsersList[1])}
        groupList={object('Group list', defaultGroupList)}
        roleList={rolesList}
        backUrl={'back/url'}
        onSubmit={action('onSubmit')}
        handleSubmit={action('called submit')}
        pristine
        initialize={() => { }}
      />
    )
  })
