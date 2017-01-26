/**
 * LICENSE_PLACEHOLDER
 **/
import { I18nProvider, i18nContextType } from '@regardsoss/i18n'
import { applyHateoasDisplayLogic, someMatchHateoasDisplayLogic } from '@regardsoss/display-control'
import MicroserviceBoardComponent from '../components/MicroserviceBoardComponent'
import requiredEndpoints from '../requiredEndpoints'

/**
 * Module container connecting {@link MicroserviceBoardComponent} to redux in order to display the list of microservices.
 *
 * @author Xavier-Alexandre Brochard
 */
export class MicroserviceBoardContainer extends React.Component {

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
        <MicroserviceBoardComponent project={this.props.params.project} />
      </I18nProvider>
    )
  }
}

// Decorate with hateoas display logic
export default applyHateoasDisplayLogic(requiredEndpoints.MicroserviceBoardContainer, someMatchHateoasDisplayLogic)(MicroserviceBoardContainer)
