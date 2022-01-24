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
import React from 'react'
import get from 'lodash/get'
import noop from 'lodash/noop'
import { i18nContextType } from '@regardsoss/i18n'
import { ConfirmDialogComponent, ConfirmDialogComponentTypes } from '@regardsoss/components'

/**
* Delete order confirmation component
* @author Raphaël Mechali
*/
class DeleteOrderConfirmationComponent extends React.Component {
  static propTypes = {
    // on close callback like () => ()
    onClose: PropTypes.func.isRequired,
    // current delete operation, null when none
    deleteConfirmation: PropTypes.shape({
      isCompleteDelete: PropTypes.bool,
      onDelete: PropTypes.func,
      label: PropTypes.string,
    }),
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /**
   * User callback: on delete confirmed
   */
  onDeleteConfirmed = () => {
    const { deleteConfirmation, onClose } = this.props
    // 1 - close dialog
    onClose()
    // 2 - run delete callback
    const onDelete = get(deleteConfirmation, 'onDelete', noop)
    onDelete()
  }

  render() {
    const { intl: { formatMessage } } = this.context
    const {
      deleteConfirmation, onClose,
    } = this.props

    const displayModeKey = get(deleteConfirmation, 'isCompleteDelete', false) ? 'completely' : 'superficially'
    return (
      <ConfirmDialogComponent
        dialogType={ConfirmDialogComponentTypes.DELETE}
        title={formatMessage({ id: `order.list.option.cell.delete.${displayModeKey}.confirmation.title` }, { name: get(deleteConfirmation, 'label', '') })}
        message={formatMessage({ id: `order.list.option.cell.delete.${displayModeKey}.confirmation.message` })}
        onConfirm={this.onDeleteConfirmed}
        confirmMessageKey={`order.list.option.cell.delete.${displayModeKey}.confirmation.button`}
        onClose={onClose}
        open={!!deleteConfirmation}
      />)
  }
}
export default DeleteOrderConfirmationComponent
