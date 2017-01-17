import { storiesOf, action } from '@kadira/storybook'
import { withKnobs, object } from '@kadira/storybook-addon-knobs'
import RoleListComponent from '@regardsoss/admin-user-role-management/src/components/RoleListComponent'
import RoleFormComponent from '@regardsoss/admin-user-role-management/src/components/RoleFormComponent'
import { StoreDecorator, addLocaleAndThemeSelectors, ThemeAndLocaleDecorator } from '../../utils/decorators'

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
  .addDecorator(withKnobs)
  .addDecorator(StoreDecorator)
  .add('List', () => {
    const themeName = addLocaleAndThemeSelectors()
    const roleList = object('Role list', defaultRoleList)
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-user-role-management/src/i18n">
        <RoleListComponent
          backUrl={'back/url'}
          createUrl={'create/url'}
          handleDelete={action('handleDelete')}
          handleEdit={action('handleEdit')}
          handleEditResourceAccess={action('handleEditResourceAccess')}
          roleList={roleList}
        />
      </ThemeAndLocaleDecorator>
    )
  })
  .add('Create', () => {
    const themeName = addLocaleAndThemeSelectors()
    const roleList = object('Role list', defaultRoleList)
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-user-role-management/src/i18n">
        <RoleFormComponent
          backUrl={'back/url'}
          onSubmit={action('save role')}
          roleList={roleList}
        />
      </ThemeAndLocaleDecorator>
    )
  })
  .add('Edit', () => {
    const themeName = addLocaleAndThemeSelectors()
    const role = object('Role list', defaultRoleList[1])
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-user-role-management/src/i18n">
        <RoleFormComponent
          backUrl={'back/url'}
          onSubmit={action('save role')}
          roleList={defaultRoleList}
          currentRole={role}
        />
      </ThemeAndLocaleDecorator>
    )
  })

