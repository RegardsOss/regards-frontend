/**
* LICENSE_PLACEHOLDER
**/
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { AccessShapes } from '@regardsoss/shape'
import { ShowableAtRender } from '@regardsoss/components'
import EntityDescriptionButton from '../options/EntityDescriptionButton'
import OneElementServicesButton from '../options/OneElementServicesButton'
import AddElementToCartButton from '../options/AddElementToCartButton'


/**
* Options display cell for table view
* @author Raphaël Mechali
*/
class TableViewOptionsCellComponent extends React.Component {

  static propTypes = {
    services: AccessShapes.PluginServiceWithContentArray,
    // optional callback: add element to cart (entity) => ()
    onAddToCart: PropTypes.func,
    // parent handlers
    onShowDescription: PropTypes.func.isRequired,
    onServiceStarted: PropTypes.func.isRequired,
  }

  static contextTypes = { ...i18nContextType, ...themeContextType }

  render() {
    const { onShowDescription, services, onServiceStarted, onAddToCart } = this.props
    const { moduleTheme: { user: { optionsStyles: { rootStyles, buttonStyles, iconStyles } } } } = this.context
    return (
      <div style={rootStyles}>
        <OneElementServicesButton
          style={buttonStyles}
          iconStyle={iconStyles}
          services={services}
          onServiceStarted={onServiceStarted}
        />
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
