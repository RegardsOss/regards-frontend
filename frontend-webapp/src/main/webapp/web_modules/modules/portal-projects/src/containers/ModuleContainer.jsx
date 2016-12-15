/**
 * LICENSE_PLACEHOLDER
 **/
import { I18nProvider } from '@regardsoss/i18n'
import ProjectListComponent from '../components/ProjectListComponent'
/**
 * Display news and project list on the homepage
 */
export class ModuleContainer extends React.Component {
  /**
   * @returns {React.Component}
   */
  render() {
    return (
      <I18nProvider messageDir="modules/portal-projects/src/i18n">
        <div>
          <ProjectListComponent />
        </div>
      </I18nProvider>
    )
  }
}

export default ModuleContainer
