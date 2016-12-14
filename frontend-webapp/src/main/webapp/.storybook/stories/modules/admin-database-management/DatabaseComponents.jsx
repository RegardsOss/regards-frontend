import { storiesOf, action } from '@kadira/storybook'
import { withKnobs, object } from '@kadira/storybook-addon-knobs'
import DatabaseConnectionTester from '@regardsoss/admin-database-management/src/components/DatabaseConnectionTester'
import DatabaseConnectionTesterIconButton from '@regardsoss/admin-database-management/src/components/DatabaseConnectionTesterIconButton'
import ProjectConnectionListComponent from '@regardsoss/admin-database-management/src/components/ProjectConnectionListComponent'
import ProjectConnectionEditComponent from '@regardsoss/admin-database-management/src/components/ProjectConnectionEditComponent'
import ProjectConnectionFormComponent from '@regardsoss/admin-database-management/src/components/ProjectConnectionFormComponent'
import GuidedProjectConfiguration from '@regardsoss/admin-database-management/src/components/GuidedProjectConfiguration'
import { StoreDecorator, addLocaleAndThemeSelectors, ThemeAndLocaleDecorator } from '../../utils/decorators'
import { CardActionsComponent } from '@regardsoss/components'
import { FormattedMessage } from 'react-intl'

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
    const projectConnection = object('Project connection', connectionsList[0])
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-database-management/src/i18n">
        <DatabaseConnectionTester projectConnection={projectConnection}/>
      </ThemeAndLocaleDecorator>
    )
  })
  .add('Icon Button connection tester', () => {
    const themeName = addLocaleAndThemeSelectors()
    const projectConnection = object('Project connection', connectionsList[0])
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-database-management/src/i18n">
        <DatabaseConnectionTesterIconButton projectConnection={projectConnection}/>
      </ThemeAndLocaleDecorator>
    )
  })
  .add('List', () => {
    const themeName = addLocaleAndThemeSelectors()
    const list = object('Connections list', connectionsList)
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-database-management/src/i18n">
        <ProjectConnectionListComponent
          list={list}
        />
      </ThemeAndLocaleDecorator>
    )
  })
  .add('Form', () => {
    const themeName = addLocaleAndThemeSelectors()
    const connectionToEdit = object('Form content', connectionsList[0])
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-database-management/src/i18n">
        <ProjectConnectionFormComponent
          currentProjectConnection={connectionToEdit}
          backUrl="/some/url"
          onSubmit={action('onCreate')}
        />
      </ThemeAndLocaleDecorator>
    )
  }).add('Edit', () => {
  const themeName = addLocaleAndThemeSelectors()
  const connectionToEdit = object('Connection to edit', connectionsList[0])
  return (
    <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-database-management/src/i18n">
      <ProjectConnectionEditComponent
        currentProjectConnection={connectionToEdit}
        backUrl="/some/url"
        onSubmit={action('onCreate')}
      />
    </ThemeAndLocaleDecorator>
  )
})
  .add('Guided configuration', () => {
    const themeName = addLocaleAndThemeSelectors()
    const connectionToEdit = object('Connection to edit', connectionsList[0])
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-database-management/src/i18n">
        <GuidedProjectConfiguration />
      </ThemeAndLocaleDecorator>
    )
  })

