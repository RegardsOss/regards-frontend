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
import CancelIcon from 'mdi-material-ui/CloseCircle'
import DeleteCompletelyIcon from 'mdi-material-ui/DeleteForever'
import { i18nContextType } from '@regardsoss/i18n'

/**
 * Delete superficially order table option
 * @author Raphaël Mechali
 */
class DeleteSuperficiallyOrderComponent extends React.Component {
  static propTypes = {
    isCompleteDelete: PropTypes.bool.isRequired,
    canDelete: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const { isCompleteDelete, canDelete, onDelete } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <IconButton
        disabled={!canDelete}
        onClick={onDelete}
        title={formatMessage({
          id: isCompleteDelete
            ? 'order.list.option.cell.delete.completely.order.tooltip'
            : 'order.list.option.cell.delete.superficially.order.tooltip',
        })}
      >
        {
          isCompleteDelete
            ? <DeleteCompletelyIcon />
            : <CancelIcon />
        }
      </IconButton>
    )
  }
}
export default DeleteSuperficiallyOrderComponent
