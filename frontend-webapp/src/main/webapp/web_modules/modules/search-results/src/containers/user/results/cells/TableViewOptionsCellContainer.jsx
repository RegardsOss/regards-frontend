/**
* LICENSE_PLACEHOLDER
**/
import compose from 'lodash/fp/compose'
import { connect } from '@regardsoss/redux'
import { withI18n } from '@regardsoss/i18n'
import { withModuleStyle } from '@regardsoss/theme'
import { AccessShapes } from '@regardsoss/shape'
import { PluginServiceRunModel, target } from '@regardsoss/entities-common'
import { descriptionLevelActions } from '../../../../models/description/DescriptionLevelModel'
import runPluginServiceActions from '../../../../models/services/RunPluginServiceActions'
import TableViewOptionsCellComponent from '../../../../components/user/results/cells/TableViewOptionsCellComponent'
import messages from '../../../../i18n'
import styles from '../../../../styles'


/**
 * Container for table view entity cell
 * @author Raphaël Mechali
 */
export class TableViewOptionsCellContainer extends React.Component {

  static mapDispatchToProps(dispatch) {
    return {
      dispatchShowDescription: entity => dispatch(descriptionLevelActions.show(entity)),
      dispatchRunService: (service, serviceTarget) => dispatch(runPluginServiceActions.runService(service, serviceTarget)),
    }
  }

  static propTypes = {
    // Parameters set by table component
    entity: AccessShapes.EntityWithServices.isRequired, // Entity to display
    // Show services for entity?
    enableServices: PropTypes.bool.isRequired,
    // optional callback: add element to cart (entity) => ()
    onAddToCart: PropTypes.func,
    // from map state to props
    dispatchShowDescription: PropTypes.func.isRequired,
    dispatchRunService: PropTypes.func.isRequired,
  }

  /**
   * Callback when user asks description
   */
  onShowDescription = () => {
    // dispatch show description event
    const { entity, dispatchShowDescription } = this.props
    dispatchShowDescription(entity)
  }

  /**
   * Callback: on service started by user. Dispatches run service event
   * @param service service wrapped in content
   */
  onServiceStarted = ({ content: service }) => {
    const { entity, dispatchRunService } = this.props
    dispatchRunService(new PluginServiceRunModel(service,
      target.buildOneElementTarget(entity.content.ipId)))
  }

  /**
   * Callback when user adds element to cart
   * pre: never call when property onAddToCart is not provided
   */
  onAddToCart = () => {
    // dispatch add to cart event
    const { entity, onAddToCart } = this.props
    onAddToCart(entity)
  }


  render() {
    const { entity, enableServices, onAddToCart } = this.props
    return (
      <TableViewOptionsCellComponent
        services={entity.content.services}
        enableServices={enableServices}
        onAddToCart={onAddToCart ? this.onAddToCart : null} // set up callback only when parent one is provided
        onShowDescription={this.onShowDescription}
        onServiceStarted={this.onServiceStarted}
      />
    )
  }
}
export default compose(
  connect(null, TableViewOptionsCellContainer.mapDispatchToProps),
  withI18n(messages),
  withModuleStyle(styles))(TableViewOptionsCellContainer)
