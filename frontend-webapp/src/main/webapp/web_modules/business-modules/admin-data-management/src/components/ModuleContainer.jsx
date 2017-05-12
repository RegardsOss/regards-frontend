/**
 * LICENSE_PLACEHOLDER
 **/
import { I18nProvider, i18nContextType } from '@regardsoss/i18n'
import DataManagementBoardComponent from './DataManagementBoardComponent'

/**
 * Main container to render for the Datamanagement module
 */
class ModuleContainer extends React.Component {

  static propTypes = {
    params: PropTypes.shape({
      project: PropTypes.string,
    }),
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const { project } = this.props.params
    return (
      <I18nProvider messageDir="business-modules/admin-data-management/src/i18n">
        <DataManagementBoardComponent project={project} />
      </I18nProvider>
    )
  }
}

export default ModuleContainer
