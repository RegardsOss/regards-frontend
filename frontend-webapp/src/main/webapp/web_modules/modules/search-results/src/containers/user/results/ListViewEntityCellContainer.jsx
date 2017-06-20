/**
* LICENSE_PLACEHOLDER
**/
import { connect } from '@regardsoss/redux'
import {
  CatalogEntity,
  AttributeModel,
} from '@regardsoss/model'
import { TableColumnConfiguration } from '@regardsoss/components'
import { descriptionLevelActions } from '../../../models/description/DescriptionLevelModel'
import ListViewEntityCellComponent from '../../../components/user/results/ListViewEntityCellComponent'

/**
* Container for list view entity cell
*/
class ListViewEntityCellContainer extends React.Component {

  static mapDispatchToProps(dispatch) {
    return {
      dispatchShowDescription: entity => dispatch(descriptionLevelActions.show(entity)),
    }
  }

  static propTypes = {
    // Parameters set by table component
    // Entity to display
    entity: CatalogEntity.isRequired,
    attributes: PropTypes.objectOf(AttributeModel),
    // eslint-disable-next-line react/no-unused-prop-types
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
    // eslint-disable-next-line react/forbid-prop-types
    styles: PropTypes.object,
    // Display checbox for entities selection ?
    displayCheckBoxes: PropTypes.bool,

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
      tableColumns, onSearchTag, onClick, styles, displayCheckBoxes } = this.props
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
        displayCheckBoxes={displayCheckBoxes}
        onEntitySelection={onClick ? this.onEntitySelection : null}
        onShowDescription={this.onShowDescription}
      />
    )
  }
}
export default connect(null, ListViewEntityCellContainer.mapDispatchToProps)(ListViewEntityCellContainer)
