import { storiesOf, action } from '@kadira/storybook'
import { withKnobs, object } from '@kadira/storybook-addon-knobs'
import ProjectAccountReadComponent from '@regardsoss/admin-user-projectuser-management/src/components/ProjectAccountReadComponent'
import ProjectUserListComponent from '@regardsoss/admin-user-projectuser-management/src/components/ProjectUserListComponent'
import ProjectUserCreateComponent from '@regardsoss/admin-user-projectuser-management/src/components/ProjectUserCreateComponent'
import { StoreDecorator, addLocaleAndThemeSelectors, ThemeAndLocaleDecorator } from '../../utils/decorators'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'

const defaultProjectUsersList = {
  0: {
    content: {
      id: 0,
      role_id: 0,
      email: 'email@cnes.com',
      lastupdate: 'yesterday',
      lastconnection: 'a week ago',
      status: 'ACCESS_GRANTED',
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

storiesOf('Project admin - Project user', module)
  .addDecorator(withKnobs)
  .addDecorator(StoreDecorator)
  .add('List', () => {
    const themeName = addLocaleAndThemeSelectors()
    const projectUsersList = object('Project users list', defaultProjectUsersList)
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-user-projectuser-management/src/i18n">
        <ProjectUserListComponent
          backUrl={'back/url'}
          createUrl={'create/url'}
          onDelete={() => alert('called delete')}
          onEdit={() => alert('called edit')}
          projectUserList={projectUsersList}
        />
      </ThemeAndLocaleDecorator>
    )
  })
  .add('Read', () => {
    const themeName = addLocaleAndThemeSelectors()
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-user-projectuser-management/src/i18n">
        <ProjectAccountReadComponent />
      </ThemeAndLocaleDecorator>
    )
  })
  .add('Create', () => {
    const themeName = addLocaleAndThemeSelectors()
    const rolesList = object('Roles list', defaultRolesList)
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-user-projectuser-management/src/i18n">
        <ProjectUserCreateComponent
          backUrl={'back/url'}
          handleSubmit={() => console.log('called submit')}
          roleList={rolesList}
        />
      </ThemeAndLocaleDecorator>
    )
  })

