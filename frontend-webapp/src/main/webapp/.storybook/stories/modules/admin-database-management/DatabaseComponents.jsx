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
import { muiTheme } from 'storybook-addon-material-ui'
import { withStore, withLocale } from '../../decorators/index'

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
  .addDecorator(withLocale('modules/admin-database-management/src/i18n'))
  .addDecorator(withKnobs)
  .addDecorator(withStore)
  .addDecorator(muiTheme())
  .add('Connection tester', () => {
    const projectConnection = object('Project connection', testProjectConnections[2])
    return (
      <DatabaseConnectionTester projectConnection={projectConnection} />
    )
  })
  .add('Icon Button connection tester', () => {
    const projectConnection = object('Project connection', testProjectConnections[2])
    return (
      <DatabaseConnectionTesterIconButton
        projectConnection={projectConnection}
      />
    )
  })
  .add('List', () => {
    const projectConnections = object('Connections list', testProjectConnections)
    return (
      <ProjectConnectionListComponent
        projectConnections={projectConnections}
        onClose={action('onClose')}
        onEdit={action('onEdit')}
        onGuidedConfiguration={action('onGuidedConfiguration')}
      />
    )
  })
  .add('Form', () => {
    const projectConnection = object('Form content', testProjectConnections[0])
    return (
      <ProjectConnectionFormComponent
        projectConnection={projectConnection}
        onSubmit={action('onCreate')}
        onCancel={action('onCancel')}
      />
    )
  })
  .add('Edit', () => {
    const connectionToEdit = object('Connection to edit', testProjectConnections[0])
    return (
      <ProjectConnectionEditComponent
        projectConnection={connectionToEdit}
        onSubmit={action('onCreate')}
        onCancel={action('onCancel')}
        onBack={action('onBack')}
      />
    )
  })
  .add('Guided configuration', () => {
    const projectConnections = object('Connections list', testProjectConnections)
    return (
      <GuidedProjectConfigurationComponent
        projectConnections={projectConnections}
        onStepSave={action('onStepSave')}
      />
    )
  })

