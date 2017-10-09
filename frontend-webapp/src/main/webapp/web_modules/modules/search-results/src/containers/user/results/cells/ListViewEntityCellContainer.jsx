/**
* LICENSE_PLACEHOLDER
**/
import { connect } from '@regardsoss/redux'
import { AccessShapes, DataManagementShapes } from '@regardsoss/shape'
import { TableColumnConfiguration } from '@regardsoss/components'
import { PluginServiceRunModel, target } from '@regardsoss/entities-common'
import { descriptionLevelActions } from '../../../../models/description/DescriptionLevelModel'
import runPluginServiceActions from '../../../../models/services/RunPluginServiceActions'
import ListViewEntityCellComponent from '../../../../components/user/results/cells/ListViewEntityCellComponent'

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
    // eslint-disable-next-line react/forbid-prop-types
    // Display checbox for entities selection ?
    displayCheckbox: PropTypes.bool,
    // tooltips, as i18n context isn't available in the table context
    downloadTooltip: PropTypes.string.isRequired,
    servicesTooltip: PropTypes.string.isRequired,
    descriptionTooltip: PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    styles: PropTypes.object,  // styles as style context isn't available in the table context

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
      tableColumns, onSearchEntity, styles, displayCheckbox,
      downloadTooltip, servicesTooltip, descriptionTooltip } = this.props
    return (
      <ListViewEntityCellComponent
        entity={entity}
        attributes={attributes}
        lineHeight={lineHeight}
        isTableSelected={isTableSelected}
        selectTableEntityCallback={selectTableEntityCallback}
        tableColumns={tableColumns}
        styles={styles}
        displayCheckbox={displayCheckbox}
        downloadTooltip={downloadTooltip}
        servicesTooltip={servicesTooltip}
        descriptionTooltip={descriptionTooltip}
        onEntitySelection={onSearchEntity ? this.onEntitySelection : null}
        onShowDescription={this.onShowDescription}
        onServiceStarted={this.onServiceStarted}
      />
    )
  }
}
export default connect(null, ListViewEntityCellContainer.mapDispatchToProps)(ListViewEntityCellContainer)
