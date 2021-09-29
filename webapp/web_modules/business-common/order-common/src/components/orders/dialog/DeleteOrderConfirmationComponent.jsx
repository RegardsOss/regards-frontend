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
import React from 'react'
import { i18nContextType } from '@regardsoss/i18n'
import { ConfirmDialogComponent, ConfirmDialogComponentTypes } from '@regardsoss/components'

/**
* Delete order confirmation component
* @author Raphaël Mechali
*/
class DeleteOrderConfirmationComponent extends React.Component {
  static propTypes = {
    orderLabel: PropTypes.string.isRequired,
    // is complete delete operation?
    isCompleteDelete: PropTypes.bool.isRequired,
    // is curretnly visible?
    visible: PropTypes.bool.isRequired,
    // on close callback like () => ()
    onClose: PropTypes.func.isRequired,
    // on delete callback like () => ()
    onDelete: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /**
   * User callback: on delete confirmed
   */
  onDeleteConfirmed = () => {
    const { onDelete, onClose } = this.props
    // 1 - close dialog
    onClose()
    // 2 - run delete callback
    onDelete()
  }

  render() {
    const { intl: { formatMessage } } = this.context
    const {
      isCompleteDelete, visible, onClose, orderLabel,
    } = this.props

    const displayModeKey = isCompleteDelete ? 'completely' : 'superficially'
    return (
      <ConfirmDialogComponent
        dialogType={ConfirmDialogComponentTypes.DELETE}
        title={formatMessage({ id: `order.list.option.cell.delete.${displayModeKey}.confirmation.title` }, { name: orderLabel })}
        message={formatMessage({ id: `order.list.option.cell.delete.${displayModeKey}.confirmation.message` })}
        onConfirm={this.onDeleteConfirmed}
        confirmMessageKey={`order.list.option.cell.delete.${displayModeKey}.confirmation.button`}
        onClose={onClose}
        open={visible}
      />)
  }
}
export default DeleteOrderConfirmationComponent
