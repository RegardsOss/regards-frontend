/*
 * LICENSE_PLACEHOLDER
 */
import { storiesOf, action } from '@kadira/storybook'
import { withKnobs, object } from '@kadira/storybook-addon-knobs'
import DatabaseConnectionTester from '@regardsoss/admin-database-management/src/components/DatabaseConnectionTester'
import DatabaseConnectionTesterIconButton from '@regardsoss/admin-database-management/src/components/DatabaseConnectionTesterIconButton'
import ProjectConnectionListComponent from '@regardsoss/admin-database-management/src/components/ProjectConnectionListComponent'
import ProjectConnectionEditComponent from '@regardsoss/admin-database-management/src/components/ProjectConnectionEditComponent'
import ProjectConnectionFormComponent from '@regardsoss/admin-database-management/src/components/ProjectConnectionFormComponent'
import GuidedProjectConfigurationComponent from '@regardsoss/admin-database-management/src/components/GuidedProjectConfigurationComponent'
import EnumConnectivity from '@regardsoss/model/src/admin/EnumConnectivity'
import { StoreDecorator, addLocaleAndThemeSelectors, ThemeAndLocaleDecorator } from '../../utils/decorators'

const testProjectConnections = {
  0: {
    content: {
      id: 0,
      projectName: 'cdpp',
      microservice: 'rs-admin',
      userName: 'Alice',
      password: 'password',
      driverClassName: 'PostgreSQL',
      url: 'http://google.com',
      connectivity: EnumConnectivity.SUCCESS,
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
      driverClassName: 'PostgreSQL',
      url: 'http://google.com',
      connectivity: EnumConnectivity.ERROR,
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
      driverClassName: 'PostgreSQL',
      url: 'http://google.com',
      connectivity: EnumConnectivity.NOT_TESTED,
    },
    links: [],
  },
}

storiesOf('InstanceAdmin - Database', module)
  .addDecorator(withKnobs)
  .addDecorator(StoreDecorator)
  .add('Connection tester', () => {
    const themeName = addLocaleAndThemeSelectors()
    const projectConnection = object('Project connection', testProjectConnections[2])
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-database-management/src/i18n">
        <DatabaseConnectionTester projectConnection={projectConnection} />
      </ThemeAndLocaleDecorator>
    )
  })
  .add('Icon Button connection tester', () => {
    const themeName = addLocaleAndThemeSelectors()
    const projectConnection = object('Project connection', testProjectConnections[2])
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-database-management/src/i18n">
        <DatabaseConnectionTesterIconButton projectConnection={projectConnection} />
      </ThemeAndLocaleDecorator>
    )
  })
  .add('List', () => {
    const themeName = addLocaleAndThemeSelectors()
    const projectConnections = object('Connections list', testProjectConnections)
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-database-management/src/i18n">
        <ProjectConnectionListComponent
          projectConnections={projectConnections}
        />
      </ThemeAndLocaleDecorator>
    )
  })
  .add('Form', () => {
    const themeName = addLocaleAndThemeSelectors()
    const projectConnection = object('Form content', testProjectConnections[0])
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-database-management/src/i18n">
        <ProjectConnectionFormComponent
          projectConnection={projectConnection}
          onSubmit={action('onCreate')}
          onCancel={action('onCancel')}
        />
      </ThemeAndLocaleDecorator>
    )
  })
  .add('Edit', () => {
    const themeName = addLocaleAndThemeSelectors()
    const connectionToEdit = object('Connection to edit', testProjectConnections[0])
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-database-management/src/i18n">
        <ProjectConnectionEditComponent
          projectConnection={connectionToEdit}
          onSubmit={action('onCreate')}
          onCancel={action('onCancel')}
        />
      </ThemeAndLocaleDecorator>
    )
  })
  .add('Guided configuration', () => {
    const themeName = addLocaleAndThemeSelectors()
    const projectConnections = object('Connections list', testProjectConnections)
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-database-management/src/i18n">
        <GuidedProjectConfigurationComponent projectConnections={projectConnections} />
      </ThemeAndLocaleDecorator>
    )
  })

