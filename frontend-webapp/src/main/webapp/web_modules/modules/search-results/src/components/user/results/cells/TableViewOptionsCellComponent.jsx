/**
* LICENSE_PLACEHOLDER
**/
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { ShowableAtRender } from '@regardsoss/components'
import EntityDescriptionButton from '../options/EntityDescriptionButton'
import AddElementToCartButton from '../options/AddElementToCartButton'

/**
* Options display cell for table view
* @author Raphaël Mechali
*/
class TableViewOptionsCellComponent extends React.Component {

  static propTypes = {
    // optional callback: add element to cart (entity) => ()
    onAddToCart: PropTypes.func,
    // parent handlers
    onShowDescription: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  render() {
    const { onShowDescription, onAddToCart } = this.props
    const { moduleTheme: { user: { optionsStyles: { rootStyles, buttonStyles, iconStyles } } } } = this.context
    return (
      <div style={rootStyles}>
        <EntityDescriptionButton
          style={buttonStyles}
          iconStyle={iconStyles}
          onShowDescription={onShowDescription}
        />
        {/* show add to cart only when available */}
        <ShowableAtRender show={!!onAddToCart}>
          <AddElementToCartButton
            style={buttonStyles}
            iconStyle={iconStyles}
            onAddToCart={onAddToCart}
          />
        </ShowableAtRender>

      </div>
    )
  }
}
export default TableViewOptionsCellComponent
