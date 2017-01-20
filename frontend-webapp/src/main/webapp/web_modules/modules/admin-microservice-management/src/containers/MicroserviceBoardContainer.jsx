/**
 * LICENSE_PLACEHOLDER
 **/
import { I18nProvider, i18nContextType } from '@regardsoss/i18n'
import { applyHateoasDisplayLogic, someMatchHateoasDisplayLogic } from '@regardsoss/display-control'
import MicroserviceBoardComponent from '../components/MicroserviceBoardComponent'

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
        <MicroserviceBoardComponent project={this.props.params.project}/>
      </I18nProvider>
    )
  }
}

const requiredEndpoints = {
  5: {
    id: 5,
    description: 'retrieve the account with his unique email',
    microservice: 'rs-admin',
    resource: '/accounts/account/{account_email}',
    verb: 'GET',
  },
  6: {
    id: 6,
    description: 'update the account account_id according to the body specified.',
    microservice: 'rs-admin',
    resource: '/accounts/{account_id}',
    verb: 'PUT',
  },
  7: {
    id: 7,
    description: 'remove the account account_id',
    microservice: 'rs-admin',
    resource: '/accounts/{account_id}',
    verb: 'DELETE',
  },
}
export default MicroserviceBoardContainer
// export default applyHateoasDisplayLogic(requiredEndpoints, someMatchHateoasDisplayLogic)(MicroserviceBoardContainer)
