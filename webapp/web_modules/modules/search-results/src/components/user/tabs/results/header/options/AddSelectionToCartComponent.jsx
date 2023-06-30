/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import FlatButton from 'material-ui/FlatButton'
import AddIcon from 'mdi-material-ui/CartPlus'
import { i18nContextType } from '@regardsoss/i18n'

/**
 * Option to show description in results table (hides when user cannot access cart)
 * @author Raphaël Mechali
 */
export class AddSelectionToCartComponent extends React.Component {
  static propTypes = {
    onAddSelectionToCart: PropTypes.func,
    // other properties are reported to the button
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const { onAddSelectionToCart } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      onAddSelectionToCart ? (
        <FlatButton
          label={formatMessage({ id: 'add.selection.to.cart.label' })}
          title={formatMessage({ id: 'add.selection.to.cart.tooltip' })}
          icon={<AddIcon />}
          onClick={onAddSelectionToCart}
        />) : null

    )
  }
}
export default AddSelectionToCartComponent
