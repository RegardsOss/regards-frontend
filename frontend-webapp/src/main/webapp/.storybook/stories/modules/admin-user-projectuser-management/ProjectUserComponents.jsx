import { storiesOf, action } from '@kadira/storybook'
import { withKnobs, object } from '@kadira/storybook-addon-knobs'
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
      lastUpdate: {
        date: {
          year: 2017,
          month: 1,
          day: 9,
        },
        time: {
          hour: 15,
          minute: 46,
          second: 12,
          nano: 453000000,
        },
      },
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
  .addDecorator(withLocale('modules/admin-user-projectuser-management/src/i18n'))
  .addDecorator(withKnobs)
  .addDecorator(withStore)
  .addDecorator(muiTheme())
  .add('List', () => {
    const projectUsersList = object('Project users list', defaultProjectUsersList)
    return (
      <ProjectUserListComponent
        backUrl={'back/url'}
        createUrl={'create/url'}
        onDelete={action('called delete')}
        onEdit={action('called edit')}
        projectUserList={projectUsersList}
      />
    )
  })
  .add('Create', () => {
    const rolesList = object('Roles list', defaultRolesList)
    return (
      <ProjectUserCreateComponent
        backUrl={'back/url'}
        handleSubmit={action('called submit')}
        roleList={rolesList}
      />
    )
  })

