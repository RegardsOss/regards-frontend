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
import FlatButton from 'material-ui/FlatButton'
import ClearCartIcon from 'mdi-material-ui/Delete'
import { i18nContextType } from '@regardsoss/i18n'
import { withConfirmDialog } from '@regardsoss/components'

export const ButtonWithConfirmDialog = withConfirmDialog(FlatButton)

/**
* Clear cart content component
* @author Raphaël Mechali
*/
class ClearCartComponent extends React.Component {
  static propTypes = {
    onClearCart: PropTypes.func.isRequired,
    empty: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const { intl: { formatMessage } } = this.context
    const { isFetching, empty, onClearCart } = this.props
    return (
      <ButtonWithConfirmDialog
        onClick={onClearCart}
        dialogTitle={formatMessage({ id: 'order-cart.module.clear.confirmation.title' })}
        dialogMessage={formatMessage({ id: 'order-cart.module.clear.confirmation.message' })}
        label={formatMessage({ id: 'order-cart.module.clear.label' })} // button properties
        title={formatMessage({ id: 'order-cart.module.clear.tooltip' })}
        icon={<ClearCartIcon />}
        disabled={isFetching || empty}
      />
    )
  }
}

export default ClearCartComponent
