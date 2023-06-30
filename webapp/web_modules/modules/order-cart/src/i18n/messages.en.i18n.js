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
import { Locales } from '@regardsoss/form-utils'
import { storage } from '@regardsoss/units'

/**
 * Module messages for english language (reports common form messages too)
 * @author Raphaël Mechali
 */
const messages = {
  ...Locales.en,
  'order.cart.configuration.presentation.title': 'Display settings',
  'order.cart.configuration.show.datasets': 'Display datasets',
  'order-cart.module.title': 'My cart',
  'order-cart.module.not.logged.title': 'User not authenticated',
  'order-cart.module.not.logged.message': 'The cart is not available while you are not logged in application. Please log in using connection button.',
  'order-cart.module.empty.basket.title': 'Empty cart',
  'order-cart.module.empty.basket.message': 'Your cart does not contain any dataobject to order. You can add some using search results, graph and form pages available in navigation menu',
  'order-cart.module.order.label': 'Order',
  'order-cart.module.order.tooltip': 'Order cart content',
  'order-cart.module.order.confirmation.title': 'Order',
  'order-cart.module.order.confirmation.message': 'Start cart data order?',
  'order-cart.module.order.confirmation.label.field': 'Label',
  'order-cart.module.order.confirmation.label.hint': 'optional label designating the command to start',
  'order-cart.module.order.confirmation.server.error.TOO_MANY_CHARACTERS_IN_LABEL': 'Label is too long (maximum characters count: 50)',
  'order-cart.module.order.confirmation.server.error.LABEL_NOT_UNIQUE_FOR_OWNER': 'You already have a command with that label',
  'order-cart.module.order.confirmation.server.error.UNKNOWN_SERVER_ERROR': 'Unknown server error occurred when starting command',
  'order-cart.module.order.confirmation.cancel': 'Cancel',
  'order-cart.module.order.confirmation.confirm': 'Order',
  'order-cart.module.clear.label': 'Clear',
  'order-cart.module.clear.tooltip': 'Clear cart content',
  'order-cart.module.clear.confirmation.title': 'Clear cart',
  'order-cart.module.clear.confirmation.message': 'This action will clear all current cart content',
  'order-cart.module.objects.count.header.message': `Cart currently contains {effectiveObjectsCount, plural, 
    one {one data object}
    other {{effectiveObjectsCount} data objects}
  } to order`,
  'order-cart.module.objects.count.size.message': 'The resulting total size of files to order is {totalSize}',
  'order-cart.module.duplicate.objects.message.title': 'Duplicated objects found',
  'order-cart.module.duplicate.objects.message': 'During your successive selections, some identical data objects ({duplicatedObjectsCount}) have been added. Only unique data objects will be ordered ({effectiveObjectsCount}).',
  'order-cart.module.duplicate.objects.message.close': 'Close',
  'order-cart.module.basket.table.column.selection': 'Selection',
  'order-cart.module.basket.table.column.objects.count': 'Objects count',
  'order-cart.module.basket.table.column.files.size': 'Total files size',
  'order-cart.module.basket.table.column.quota.summary': 'Consumed downloads',
  'order-cart.module.basket.table.column.processing.summary': 'Processing',
  'order-cart.module.basket.table.column.filters.summary': 'Active filters',
  'order-cart.module.basket.table.row.total.label': 'Total',
  'order-cart.module.basket.table.cell.total.quota.label': '{totalQuota} ({allowedQuota} allowed)',
  'order-cart.module.basket.table.cell.total.quota.tooltip': `{totalQuota} download{totalQuota, plural, 
    =0 {} 
    one {}
    other {s}
  } / {allowedQuota} allowed ({afterOrderQuota} remaining).{warningMessage}`,
  'order-cart.module.basket.table.cell.total.quota.warning.message': ' Your remaining download count, after order download, will be low.',
  'order-cart.module.basket.table.cell.total.quota.consumed.message': ' Your order will probably be partially downloaded.',
  'order-cart.module.basket.table.delete.dataset.tooltip': 'Remove this dataset selections dataobjects',
  'order-cart.module.basket.table.delete.dataset.confirm.message': 'That operation will remove all selections in this dataset and their dataobjects from cart. It cannot be undone',
  'order-cart.module.basket.table.delete.dataset.confirm.title': 'Remove dataset selections',
  'order-cart.module.basket.table.delete.selection.tooltip': 'Remove selection dataobjects',
  'order-cart.module.basket.table.delete.selection.confirm.message': 'That operation will remove all dataobjects in this selection from cart. It cannot be undone',
  'order-cart.module.basket.table.delete.selection.confirm.title': 'Remove selection',
  'order-cart.module.basket.table.show.selection.detail.tooltip': 'Shows added object list',
  'order-cart.module.basket.table.processing.link.error': 'Failed loading service',
  'order-cart.module.basket.table.processing.configuration.error': 'Failed loading service',
  'order-cart.module.basket.table.processing.metadata.error': 'Failed loading service',
  'order-cart.module.basket.table.filters.button.label': 'Add',
  'order-cart.module.basket.table.filters.button.add.title': 'Select filters',
  'order-cart.module.basket.table.filters.button.edit.title': 'Edit filters',
  'order-cart.module.basket.table.filters.button.filters.fileTypes.label': 'File types',
  'order-cart.module.basket.table.filters.button.filters.fileNamePattern.label': 'File name',
  'order-cart.module.basket.table.filters.dialog.title': 'File filters',
  'order-cart.module.basket.table.filters.dialog.cancel.button': 'Close',
  'order-cart.module.basket.table.filters.dialog.confirm.button': 'Confirm',
  'order-cart.module.basket.table.filters.dialog.warning.message': 'Warning: setting filters for this item will remove the selected processing',
  'order-cart.module.basket.table.filters.dialog.message': 'You can define the selection criteria of the files of your order.',
  'order-cart.module.basket.table.filters.dialog.selectfield.hint': 'Select file types',
  'order-cart.module.basket.table.filters.dialog.selectfield.fileTypes.RAWDATA': 'Rawdata',
  'order-cart.module.basket.table.filters.dialog.selectfield.fileTypes.QUICKLOOK': 'Quicklook',
  'order-cart.module.basket.table.filters.dialog.textfield.hint': 'Enter file name pattern',
  'order-cart.module.basket.table.filters.dialog.remove': 'Remove',
  'order-cart.module.basket.table.filters.dialog.remove.tooltip': 'Remove filters',
  'order-cart.module.basket.table.filters.dialog.remove.confirmation.message': 'This action will remove filters from the dataset',
  'order-cart.module.basket.table.filters.dialog.remove.confirmation.title': 'Remove filters',

  'order-cart.module.basket.items.group.selection.detail.title.with.dataset': '{dataset}: Items selected on {date}',
  'order-cart.module.basket.items.group.selection.detail.title.without.dataset': 'Items selected on {date}',
  'order-cart.module.basket.items.group.selection.detail.close': 'Close',
  'order-cart.module.basket.items.group.selection.detail.no.data.title': 'No item',
  'order-cart.module.basket.items.group.selection.detail.no.data.message': 'There is no longer item in this selection group. They may have been deleted or their access rights could have changed',
  // adds capicity formatting messages
  ...storage.messages.en,

}

export default messages
