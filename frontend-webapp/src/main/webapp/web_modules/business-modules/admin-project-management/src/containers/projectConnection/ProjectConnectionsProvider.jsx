/*
 * LICENSE_PLACEHOLDER
 */
import { I18nProvider } from '@regardsoss/i18n'
import ProjectConnectionsContainer from './ProjectConnectionsContainer'

/**
 * I18n Provider for ProjectConnectionsContainer
 */
export class ProjectConnectionsProvider extends React.Component {

  render() {
    return (
      <I18nProvider messageDir="business-modules/admin-project-management/src/i18n">
        <ProjectConnectionsContainer
          {...this.props}
        />
      </I18nProvider>
    )
  }

}

export default ProjectConnectionsProvider
