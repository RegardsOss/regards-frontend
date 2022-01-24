/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import IconButton from 'material-ui/IconButton'
import Chip from 'material-ui/Chip'
import Cart from 'mdi-material-ui/Cart'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { ShowableAtRender } from '@regardsoss/components'

/**
* Cart selector component
* @author Raphaël Mechali
*/
class CartSelectorComponent extends React.Component {
  static propTypes = {
    // number of nofications
    objectsCount: PropTypes.number.isRequired,
    // callback: on cart button clicked
    onCartClicked: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static MAX_ELEMENTS_COUNT = 9999

  UNSAFE_componentWillMount() {
    // transient: create icon
    this.icon = <Cart />
  }

  render() {
    const { objectsCount, onCartClicked } = this.props
    const { intl: { formatMessage }, moduleTheme: { cart, overlay } } = this.context

    // compute label for current count
    const elementsCountLabel = objectsCount < CartSelectorComponent.MAX_ELEMENTS_COUNT ? objectsCount
      : formatMessage({ id: 'user.menu.cart.max.count' }, { maxCount: CartSelectorComponent.MAX_ELEMENTS_COUNT })

    // compute tooltip for current count
    const elementsCountTooltip = objectsCount
      ? formatMessage({ id: 'user.menu.displaycart.elements.count.tooltip' }, { elementsCount: objectsCount })
      : formatMessage({ id: 'user.menu.displaycart.empty.tooltip' })

    // render
    return (
      <IconButton
        title={formatMessage({ id: 'user.menu.displaycart.tooltip' }, { elementsCountTooltip })}
        style={cart.iconButton.style}
        iconStyle={cart.iconButton.iconStyle}
        onClick={onCartClicked}
      >
        { /*Create a free position chip over the icon */}
        <div>
          <ShowableAtRender show={!!objectsCount}>
            <div style={overlay.style}>
              <Chip
                labelStyle={overlay.chip.labelStyle}
                style={overlay.chip.style}
              >
                {elementsCountLabel}
              </Chip>
            </div>
          </ShowableAtRender>
          { /* Show the icon */}
          <Cart style={cart.icon.style} />
        </div>
      </IconButton>
    )
  }
}
export default CartSelectorComponent
