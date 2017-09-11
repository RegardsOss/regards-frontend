/**
* LICENSE_PLACEHOLDER
**/
import compose from 'lodash/fp/compose'
import { connect } from '@regardsoss/redux'
import { withI18n } from '@regardsoss/i18n'
import { withModuleStyle } from '@regardsoss/theme'
import { CatalogShapes } from '@regardsoss/shape'
import { descriptionLevelActions } from '../../../../models/description/DescriptionLevelModel'
import TableViewOptionsCellComponent from '../../../../components/user/results/cells/TableViewOptionsCellComponent'
import messages from '../../../../i18n'
import styles from '../../../../styles'


/**
* Container for list view entity cell
* @author Raphaël Mechali
*/
export class TableViewOptionsCellContainer extends React.Component {

  static mapDispatchToProps(dispatch) {
    return {
      dispatchShowDescription: entity => dispatch(descriptionLevelActions.show(entity)),
    }
  }

  static propTypes = {
    // Parameters set by table component
    entity: CatalogShapes.Entity.isRequired,
    // optional callback: add element to cart (entity) => ()
    onAddToCart: PropTypes.func,
    // from map state to props
    dispatchShowDescription: PropTypes.func.isRequired,
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
    const { onAddToCart } = this.props
    return (
      <TableViewOptionsCellComponent
        onAddToCart={onAddToCart ? this.onAddToCart : null} // set up callback only when parent one is provided
        onShowDescription={this.onShowDescription}
      />
    )
  }
}
export default compose(
  connect(null, TableViewOptionsCellContainer.mapDispatchToProps),
  withI18n(messages),
  withModuleStyle(styles))(TableViewOptionsCellContainer)
