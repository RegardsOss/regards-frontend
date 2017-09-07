/**
* LICENSE_PLACEHOLDER
**/
import { connect } from '@regardsoss/redux'
import { CatalogShapes, DataManagementShapes } from '@regardsoss/shape'
import { TableColumnConfiguration } from '@regardsoss/components'
import { descriptionLevelActions } from '../../../../models/description/DescriptionLevelModel'
import ListViewEntityCellComponent from '../../../../components/user/results/cells/ListViewEntityCellComponent'

/**
* Container for list view entity cell
*/
export class ListViewEntityCellContainer extends React.Component {

  static mapDispatchToProps(dispatch) {
    return {
      dispatchShowDescription: entity => dispatch(descriptionLevelActions.show(entity)),
    }
  }

  static propTypes = {
    // Parameters set by table component
    // Entity to display
    entity: CatalogShapes.Entity.isRequired,
    attributes: PropTypes.objectOf(DataManagementShapes.AttributeModel),
    lineHeight: PropTypes.number.isRequired,
    // Parameters to handle row selection
    isTableSelected: PropTypes.bool,
    selectTableEntityCallback: PropTypes.func,

    // Parameters set by columnConfiguration
    // Columns configuration to display
    tableColumns: PropTypes.arrayOf(TableColumnConfiguration),
    // Callback to run a new search with the given tag
    onSearchTag: PropTypes.func,
    // Callback when click on entity label
    onClick: PropTypes.func,
    // Display checbox for entities selection ?
    displayCheckbox: PropTypes.bool,
    // tooltips, as i18n context isn't available in the table context
    downloadTooltip: PropTypes.string.isRequired,
    descriptionTooltip: PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    styles: PropTypes.object,  // styles as style context isn't available in the table context

    // from map dispatch to props
    dispatchShowDescription: PropTypes.func.isRequired,
  }

  /**
 * Callback when a dataset is selected. Click on his label
 */
  onEntitySelection = () => {
    const { onClick, entity } = this.props
    onClick(entity)
  }

  /**
  * Callback when user asks description
  */
  onShowDescription = () => {
    // dispatch show description event
    const { entity, dispatchShowDescription } = this.props
    dispatchShowDescription(entity)
  }

  render() {
    const { entity, attributes, lineHeight, isTableSelected, selectTableEntityCallback,
      tableColumns, onSearchTag, onClick, styles, displayCheckbox,
      downloadTooltip, descriptionTooltip } = this.props
    return (
      <ListViewEntityCellComponent
        entity={entity}
        attributes={attributes}
        lineHeight={lineHeight}
        isTableSelected={isTableSelected}
        selectTableEntityCallback={selectTableEntityCallback}
        tableColumns={tableColumns}
        onSearchTag={onSearchTag}
        styles={styles}
        displayCheckbox={displayCheckbox}
        downloadTooltip={downloadTooltip}
        descriptionTooltip={descriptionTooltip}
        onEntitySelection={onClick ? this.onEntitySelection : null}
        onShowDescription={this.onShowDescription}
        onServiceStarted={this.onServiceStarted}
      />
    )
  }
}

export default connect(null, ListViewEntityCellContainer.mapDispatchToProps)(ListViewEntityCellContainer)
