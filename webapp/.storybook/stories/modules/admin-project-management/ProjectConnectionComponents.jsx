/*
 * LICENSE_PLACEHOLDER
 */
import { storiesOf, action } from '@kadira/storybook'
import { withKnobs, object } from '@storybook/addon-knobs'
import DatabaseConnectionTester from '@regardsoss/admin-project-management/src/components/projectConnection/DatabaseConnectionTester'
import DatabaseConnectionTesterIconButton from '@regardsoss/admin-project-management/src/components/projectConnection/DatabaseConnectionTesterIconButton'
import ProjectConnectionListComponent from '@regardsoss/admin-project-management/src/components/projectConnection/ProjectConnectionListComponent'
import ProjectConnectionFormComponent from '@regardsoss/admin-project-management/src/components/projectConnection/ProjectConnectionFormComponent'
import GuidedProjectConfigurationComponent from '@regardsoss/admin-project-management/src/components/projectConnection/GuidedProjectConfigurationComponent'
import EnumConnectivity from '@regardsoss/model/src/admin/EnumConnectivity'
import { muiTheme } from 'storybook-addon-material-ui'
import { withStore, withLocale } from '../../decorators/index'

const testProject = {
  id: 0,
  name: 'test',
}

const testProjectConnections = {
  0: {
    content: {
      id: 0,
      project: testProject,
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
      project: testProject,
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
      project: testProject,
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
        project={testProject}
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
        project={testProject}
        projectConnection={projectConnection}
        onSubmit={action('onCreate')}
        onCancel={action('onCancel')}
      />
    )
  })
  .add('Edit', () => {
    const connectionToEdit = object('Connection to edit', testProjectConnections[0])
    return (
      <ProjectConnectionFormComponent
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

