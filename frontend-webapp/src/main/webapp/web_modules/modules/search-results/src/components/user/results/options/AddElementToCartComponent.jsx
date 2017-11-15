/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import AddIcon from 'material-ui/svg-icons/action/add-shopping-cart'
import { i18nContextType } from '@regardsoss/i18n'

/**
 * Option to show description in results table
 * @author Raphaël Mechali
 */
class AddElementToCartComponent extends React.Component {

  static propTypes = {
    onAddToCart: PropTypes.func,
    // other properties are reported to the button
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const { onAddToCart, ...otherProperties } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <IconButton
        title={formatMessage({ id: 'add.to.cart.tooltip' })}
        onTouchTap={onAddToCart}
        {...otherProperties}
      >
        <AddIcon />
      </IconButton>
    )
  }
}
export default AddElementToCartComponent
