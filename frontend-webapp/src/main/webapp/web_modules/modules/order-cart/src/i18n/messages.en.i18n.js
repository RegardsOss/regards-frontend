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
import { Locales } from '@regardsoss/form-utils'

/**
 * Module messages for english language (reports common form messages too)
 * @author Raphaël Mechali
 */
const messages = {
  ...Locales.en,
  'order-cart.module.admin.message': 'There is no specific options for that module',
  'order-cart.module.title': 'My cart',
  'order-cart.module.subtitle': 'Cart content display and control, sorted by dataset and added elements groups, start command...',
  'order-cart.module.not.logged.title': 'User not authentified',
  'order-cart.module.not.logged.messsage': 'The cart is not available while you are not logged in application. Please log in using connection button.',
  'order-cart.module.empty.basket.title': 'Empty cart',
  'order-cart.module.empty.basket.messsage': 'Your cart does not contain any dataobject to order. You can add some using search results, graph and form pages available in navigation menu',
  'order-cart.module.order.label': 'Order',
  'order-cart.module.order.tooltip': 'Order cart content',
  'order-cart.module.order.confirmation.title': 'Order',
  'order-cart.module.order.confirmation.message': 'This action will start order and clear basket. Would you like to continue?',
  'order-cart.module.clear.label': 'Clear',
  'order-cart.module.clear.tooltip': 'Clear cart content',
  'order-cart.module.clear.confirmation.title': 'Clear basket',
  'order-cart.module.clear.confirmation.message': 'This action will clear all current basket content',
  'order-cart.module.basket.table.column.identifier': 'Dataset label / add date',
  'order-cart.module.basket.table.column.objects.count': 'Objects count',
  'order-cart.module.basket.table.column.files.count': 'Files count',
  'order-cart.module.basket.table.column.files.size': 'Total files size',
  'order-cart.module.basket.table.column.options': 'Options',
  'order-cart.module.basket.table.delete.dataset.tooltip': 'Remove this dataset selections dataobjects',
  'order-cart.module.basket.table.delete.dataset.confirm.message': 'That operation will remove all selections in this dataset and their dataobjects from basket. It cannot be undone',
  'order-cart.module.basket.table.delete.dataset.confirm.title': 'Remove dataset selections',
  'order-cart.module.basket.table.delete.selection.tooltip': 'Remove selection dataobjects',
  'order-cart.module.basket.table.delete.selection.confirm.message': 'That operation will remove all dataobjects in this selection from basket. It cannot be undone',
  'order-cart.module.basket.table.delete.selection.confirm.title': 'Remove selection',
  'order-cart.module.basket.table.show.selection.detail.tooltip': 'Shows added object list',
  'order-cart.module.basket.items.group.selection.detail.title': '{dataset}: Items selected on {date}',
  'order-cart.module.basket.items.group.selection.detail.no.data.title': 'No item',
  'order-cart.module.basket.items.group.selection.detail.no.data.message': 'There is no longer item in this selection group. They may have been deleted or their access rights could have changed',
}

export default messages
