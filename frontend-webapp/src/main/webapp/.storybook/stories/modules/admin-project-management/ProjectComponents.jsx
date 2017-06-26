import { storiesOf, action } from '@kadira/storybook'
import { withKnobs, object } from '@storybook/addon-knobs'
import { ProjectListComponent } from '@regardsoss/admin-project-management/src/components/project/ProjectListComponent'
import ProjectFormComponent from '@regardsoss/admin-project-management/src/components/project/ProjectFormComponent'
import { muiTheme } from 'storybook-addon-material-ui'
import { withStore, withLocale } from '../../decorators/index'

const defaultProjectList = {
  project1: {
    content: {
      id: 1,
      name: 'project1',
      description: '',
      icon: '',
      isPublic: true,
      isDeleted: false,
    },
    links: [],
  },
}

storiesOf('InstanceAdmin - Project', module)
  .addDecorator(withLocale('modules/admin-project-management/src/i18n'))
  .addDecorator(withKnobs)
  .addDecorator(withStore)
  .addDecorator(muiTheme())
  .add('List', () => {
    const projectList = object('Project list', defaultProjectList)
    return (
      <ProjectListComponent
        projectList={projectList}
        createUrl="dfjgisjdf"
        handleView={action('open project')}
        handleDelete={action('delete project')}
        handleEdit={action('edit project')}
        handleUpdateLicense={action('license update')}
      />
    )
  })
  .add('Create', () => (
    <ProjectFormComponent
      backUrl="/some/url"
      onSubmit={action('onCreate')}
    />
  ))
  .add('Edit', () => {
    const projectList = object('Project list', defaultProjectList)
    return (
      <ProjectFormComponent
        currentProject={projectList.project1}
        backUrl="/some/url"
        onSubmit={action('onEdit')}
      />
    )
  })
