import { storiesOf, action } from '@kadira/storybook'
import { withKnobs, select, object, text } from '@kadira/storybook-addon-knobs'
import { ProjectListComponent } from '@regardsoss/admin-project-management/src/components/ProjectListComponent'
import { ProjectCreateContainer } from '@regardsoss/admin-project-management/src/containers/ProjectCreateContainer'
import { ProjectEditContainer } from '@regardsoss/admin-project-management/src/containers/ProjectEditContainer'
import { StoreDecorator, addLocaleAndThemeSelectors, ThemeAndLocaleDecorator } from '../../utils/decorators'

const defaultProjectList = {
  1: {
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
  .addDecorator(withKnobs)
  .addDecorator(StoreDecorator)
  .add('List', () => {
    const themeName = addLocaleAndThemeSelectors()
    const projectList = object('Project list', defaultProjectList)
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-project-management/src/i18n">
        <ProjectListComponent
          projectList={projectList}
          theme=""
          createUrl="dfjgisjdf"
          handleView={action('open project')}
          handleDelete={action('delete project')}
          handleEdit={action('edit project')}
        />
      </ThemeAndLocaleDecorator>
    )
  })
  .add('Create', () => {
    const themeName = addLocaleAndThemeSelectors()
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-project-management/src/i18n">
        <ProjectCreateContainer
          project=""
          theme=""
          createProject={action('createProject')}
        />
      </ThemeAndLocaleDecorator>
    )
  })
  .add('Edit', () => {
    const themeName = addLocaleAndThemeSelectors()
    const projectId = text('Show project with id', 1)
    const projectList = object('Project list', defaultProjectList)
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-project-management/src/i18n">
        <ProjectEditContainer
          params={{ projectId }}
          projects={projectList}
          theme=""
        />
      </ThemeAndLocaleDecorator>
    )
  })
