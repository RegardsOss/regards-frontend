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
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
    }),
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    return (
      <I18nProvider messageDir="modules/admin-data-management/src/i18n">
        <DataManagementBoardComponent />
      </I18nProvider>
    )
  }
}

export default ModuleContainer
