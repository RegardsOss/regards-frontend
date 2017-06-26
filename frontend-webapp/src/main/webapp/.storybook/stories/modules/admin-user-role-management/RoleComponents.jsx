import { storiesOf, action } from '@kadira/storybook'
import { withKnobs, object } from '@storybook/addon-knobs'
import RoleListComponent from '@regardsoss/admin-user-role-management/src/components/RoleListComponent'
import RoleFormComponent from '@regardsoss/admin-user-role-management/src/components/RoleFormComponent'
import { muiTheme } from 'storybook-addon-material-ui'
import { withStore, withLocale } from '../../decorators/index'

const defaultRoleList = {
  1: {
    content: {
      id: 1,
      name: 'PUBLIC',
      permissions: [],
      authorizedAddresses: ['1.2.3.4'],
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

storiesOf('Project admin - Role', module)
  .addDecorator(withLocale('modules/admin-user-role-management/src/i18n'))
  .addDecorator(withKnobs)
  .addDecorator(withStore)
  .addDecorator(muiTheme())
  .add('List', () => {
    const roleList = object('Role list', defaultRoleList)
    return (
      <RoleListComponent
        backUrl={'back/url'}
        createUrl={'create/url'}
        handleDelete={action('handleDelete')}
        handleEdit={action('handleEdit')}
        handleEditResourceAccess={action('handleEditResourceAccess')}
        roleList={roleList}
      />
    )
  })
  .add('Create', () => {
    const roleList = object('Role list', defaultRoleList)
    return (
      <RoleFormComponent
        backUrl={'back/url'}
        onSubmit={action('save role')}
        roleList={roleList}
      />
    )
  })
  .add('Edit', () => {
    const role = object('Role list', defaultRoleList[1])
    return (
      <RoleFormComponent
        backUrl={'back/url'}
        onSubmit={action('save role')}
        roleList={defaultRoleList}
        currentRole={role}
      />
    )
  })

