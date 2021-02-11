/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import DeleteIcon from 'mdi-material-ui/Delete'
import { i18nContextType } from '@regardsoss/i18n'
import { withConfirmDialog } from '@regardsoss/components'

export const IconButtonWithConfirmDialog = withConfirmDialog(IconButton)

/**
* Shows deleted dated items selection in basket
* @author Raphaël Mechali
*/
class DeleteDatedItemSelectionComponent extends React.Component {
  static propTypes = {
    disabled: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const { intl: { formatMessage } } = this.context
    const { disabled, onDelete } = this.props
    return (
      <IconButtonWithConfirmDialog
        disabled={disabled}
        onClick={onDelete}
        title={formatMessage({ id: 'order-cart.module.basket.table.delete.selection.tooltip' })}
        dialogTitle={formatMessage({ id: 'order-cart.module.basket.table.delete.selection.confirm.title' })}
        dialogMessage={formatMessage({ id: 'order-cart.module.basket.table.delete.selection.confirm.message' })}
      >
        <DeleteIcon />
      </IconButtonWithConfirmDialog>
    )
  }
}
export default DeleteDatedItemSelectionComponent
