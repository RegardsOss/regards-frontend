import { storiesOf, action } from '@kadira/storybook'
import { withKnobs, object } from '@kadira/storybook-addon-knobs'
import DatabaseConnectionTester from '@regardsoss/admin-database-management/src/components/DatabaseConnectionTester'
import DatabaseConnectionTesterIconButton from '@regardsoss/admin-database-management/src/components/DatabaseConnectionTesterIconButton'
import ProjectConnectionList from '@regardsoss/admin-database-management/src/components/ProjectConnectionList'
import ProjectConnectionFormComponent from '@regardsoss/admin-database-management/src/components/ProjectConnectionFormComponent'
import { StoreDecorator, addLocaleAndThemeSelectors, ThemeAndLocaleDecorator } from '../../utils/decorators'

const connectionsList = {
  0: {
    content: {
      id: 0,
      projectName: 'cdpp',
      microservice: 'rs-admin',
      userName: 'Alice',
      password: 'password',
      driverClassName: 'aDriverClassName',
      url: 'http://google.com',
    },
    links: [],
  },
  1: {
    content: {
      id: 1,
      projectName: 'cdpp',
      microservice: 'rs-cloud',
      userName: 'Bob',
      password: 'azerty',
      driverClassName: 'otherDriverClassName',
      url: 'http://otherUrl',
    },
    links: [],
  },
  2: {
    content: {
      id: 2,
      projectName: 'cdpp',
      microservice: 'rs-dam',
      userName: 'Charlie',
      password: 'qsdfgh',
      driverClassName: 'someDriverClassName',
      url: 'http://someUrl',
    },
    links: [],
  },
}

storiesOf('InstanceAdmin - Database', module)
  .addDecorator(withKnobs)
  .addDecorator(StoreDecorator)
  .add('Connection tester', () => {
    const themeName = addLocaleAndThemeSelectors()
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-database-management/src/i18n">
        <DatabaseConnectionTester />
      </ThemeAndLocaleDecorator>
    )
  })
  .add('Icon Button connection tester', () => {
    const themeName = addLocaleAndThemeSelectors()
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-database-management/src/i18n">
        <DatabaseConnectionTesterIconButton />
      </ThemeAndLocaleDecorator>
    )
  })
  .add('List', () => {
    const themeName = addLocaleAndThemeSelectors()
    const list = object('Connections list', connectionsList)
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-database-management/src/i18n">
        <ProjectConnectionList
          list={list}
        />
      </ThemeAndLocaleDecorator>
    )
  })
  .add('Edit one', () => {
    const themeName = addLocaleAndThemeSelectors()
    const connectionToEdit = object('Connection to edit', connectionsList[0])
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-database-management/src/i18n">
        <ProjectConnectionFormComponent
          currentProjectConnection={connectionToEdit}
          backUrl="/some/url"
          onSubmit={action('onCreate')}
        />
      </ThemeAndLocaleDecorator>
    )
  })
