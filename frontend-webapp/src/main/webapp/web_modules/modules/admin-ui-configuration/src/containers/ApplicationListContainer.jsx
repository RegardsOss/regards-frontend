/**
 * LICENSE_PLACEHOLDER
 **/
import { I18nProvider, i18nContextType } from '@regardsoss/i18n'
import ApplicationListComponent from '../components/ApplicationsListComponent'

/**
 * Module container to display the list of applications.
 */
class ApplicationListContainer extends React.Component {

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
      <I18nProvider messageDir="modules/admin-ui-configuration/src/i18n">
        <ApplicationListComponent project={this.props.params.project} />
      </I18nProvider>
    )
  }
}

const UnconnectedApplicationListContainer = ApplicationListContainer
export {
  UnconnectedApplicationListContainer,
}

export default ApplicationListContainer
