/**
* LICENSE_PLACEHOLDER
**/
import compose from 'lodash/fp/compose'
import { connect } from '@regardsoss/redux'
import { withI18n } from '@regardsoss/i18n'
import { withModuleStyle } from '@regardsoss/theme'
import { CatalogShapes, DataManagementShapes } from '@regardsoss/shape'
import { TableColumnConfiguration } from '@regardsoss/components'
import { descriptionLevelActions } from '../../../../models/description/DescriptionLevelModel'
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
    // optional callback: add element to cart (entity) => ()
    onAddToCart: PropTypes.func,
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
    const { entity, attributes, lineHeight, isTableSelected, selectTableEntityCallback,
      tableColumns, onSearchTag, onClick, displayCheckbox, onAddToCart } = this.props

    return (
      <ListViewEntityCellComponent
        entity={entity}
        attributes={attributes}
        lineHeight={lineHeight}
        isTableSelected={isTableSelected}
        selectTableEntityCallback={selectTableEntityCallback}
        tableColumns={tableColumns}
        onSearchTag={onSearchTag}
        displayCheckbox={displayCheckbox}
        onAddToCart={onAddToCart ? this.onAddToCart : null} // set up callback only when parent one is provided
        onEntitySelection={onClick ? this.onEntitySelection : null} // set up callback only when parent one is provided
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
