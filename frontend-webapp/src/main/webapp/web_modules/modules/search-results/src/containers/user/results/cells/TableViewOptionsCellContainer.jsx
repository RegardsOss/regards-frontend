/**
* LICENSE_PLACEHOLDER
**/
import { connect } from '@regardsoss/redux'
import { AccessShapes } from '@regardsoss/shape'
import { PluginServiceRunModel, target } from '@regardsoss/entities-common'
import { descriptionLevelActions } from '../../../../models/description/DescriptionLevelModel'
import runPluginServiceActions from '../../../../models/services/RunPluginServiceActions'
import TableViewOptionsCellComponent from '../../../../components/user/results/cells/TableViewOptionsCellComponent'


/**
 * Container for list view entity cell
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
    // tooltips, as i18n context isn't available in the table context
    servicesTooltip: PropTypes.string.isRequired,
    descriptionTooltip: PropTypes.string.isRequired,
    styles: PropTypes.shape({   // styles as style context isn't available in the table context
      rootStyles: PropTypes.object.isRequired,
      buttonStyles: PropTypes.object.isRequired,
      iconStyles: PropTypes.object.isRequired,
    }).isRequired,
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

  render() {
    const { styles, entity, enableServices, servicesTooltip, descriptionTooltip } = this.props
    return (
      <TableViewOptionsCellComponent
        services={entity.content.services}
        styles={styles}
        enableServices={enableServices}
        servicesTooltip={servicesTooltip}
        descriptionTooltip={descriptionTooltip}
        onShowDescription={this.onShowDescription}
        onServiceStarted={this.onServiceStarted}
      />
    )
  }
}
export default connect(null, TableViewOptionsCellContainer.mapDispatchToProps)(TableViewOptionsCellContainer)
