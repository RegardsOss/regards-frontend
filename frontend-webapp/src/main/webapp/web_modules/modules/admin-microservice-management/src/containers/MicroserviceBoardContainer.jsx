/**
 * LICENSE_PLACEHOLDER
 **/
import { I18nProvider, i18nContextType } from '@regardsoss/i18n'
import MicroserviceBoardComponent from '../components/MicroserviceBoardComponent'
import SexyMicroserviceBoardComponent from '../components/SexyMicroserviceBoardComponent'

/**
 * Module container connecting {@link MicroserviceBoardComponent} to redux in order to display the list of microservices.
 *
 * @author Xavier-Alexandre Brochard
 */
class MicroserviceBoardContainer extends React.Component {

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
      <I18nProvider messageDir="modules/admin-microservice-management/src/i18n">
        <SexyMicroserviceBoardComponent project={this.props.params.project} />
      </I18nProvider>
    )
  }
}

export default MicroserviceBoardContainer
