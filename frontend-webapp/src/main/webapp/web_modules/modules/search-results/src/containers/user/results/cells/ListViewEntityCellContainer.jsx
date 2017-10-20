/**
* LICENSE_PLACEHOLDER
**/
import compose from 'lodash/fp/compose'
import { connect } from '@regardsoss/redux'
import { withI18n } from '@regardsoss/i18n'
import { withModuleStyle } from '@regardsoss/theme'
import { AccessShapes, DataManagementShapes } from '@regardsoss/shape'
import { TableColumnConfiguration } from '@regardsoss/components'
import { PluginServiceRunModel, target } from '@regardsoss/entities-common'
import { descriptionLevelActions } from '../../../../models/description/DescriptionLevelModel'
import runPluginServiceActions from '../../../../models/services/RunPluginServiceActions'
import ListViewEntityCellComponent from '../../../../components/user/results/cells/ListViewEntityCellComponent'
import messages from '../../../../i18n'
import styles from '../../../../styles'

/**
* Container for list view entity cell
*/
export class ListViewEntityCellContainer extends React.Component {

  static mapDispatchToProps(dispatch) {
    return {
      dispatchShowDescription: entity => dispatch(descriptionLevelActions.show(entity)),
      dispatchRunService: (service, serviceTarget) => dispatch(runPluginServiceActions.runService(service, serviceTarget)),
    }
  }

  static propTypes = {
    // Parameters set by table component
    // Entity to display
    entity: AccessShapes.EntityWithServices.isRequired, // Entity to display
    attributes: PropTypes.objectOf(DataManagementShapes.AttributeModel),
    lineHeight: PropTypes.number.isRequired,
    // Parameters to handle row selection
    isTableSelected: PropTypes.bool,
    selectTableEntityCallback: PropTypes.func,

    // Parameters set by columnConfiguration
    // Columns configuration to display
    tableColumns: PropTypes.arrayOf(TableColumnConfiguration),
    // Callback when click on entity label
    onSearchEntity: PropTypes.func,
    // Display checbox for entities selection ?
    displayCheckbox: PropTypes.bool,
    // Show services for entity?
    enableServices: PropTypes.bool.isRequired,
    // optional callback: add element to cart (entity) => ()
    onAddToCart: PropTypes.func,
    // from map dispatch to props
    dispatchShowDescription: PropTypes.func.isRequired,
    dispatchRunService: PropTypes.func.isRequired,
  }

  /**
   * Callback when a dataset label is selected
   */
  onEntitySelection = () => {
    const { onSearchEntity, entity } = this.props
    onSearchEntity(entity)
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
   * Callback when user adds element to cart
   * pre: never call when property onAddToCart is not provided
   */
  onAddToCart = () => {
    // dispatch add to cart event
    const { entity, onAddToCart } = this.props
    onAddToCart(entity)
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
    const { entity, attributes, lineHeight, isTableSelected, selectTableEntityCallback,
      enableServices, tableColumns, onSearchEntity, displayCheckbox, onAddToCart } = this.props

    return (
      <ListViewEntityCellComponent
        entity={entity}
        attributes={attributes}
        lineHeight={lineHeight}
        isTableSelected={isTableSelected}
        selectTableEntityCallback={selectTableEntityCallback}
        tableColumns={tableColumns}
        displayCheckbox={displayCheckbox}
        enableServices={enableServices}
        onAddToCart={onAddToCart ? this.onAddToCart : null} // set up callback only when parent one is provided
        onEntitySelection={onSearchEntity ? this.onEntitySelection : null}
        onShowDescription={this.onShowDescription}
        onServiceStarted={this.onServiceStarted}
      />
    )
  }
}

export default compose(
  connect(null, ListViewEntityCellContainer.mapDispatchToProps),
  withI18n(messages),
  withModuleStyle(styles))(ListViewEntityCellContainer)
