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

/**
* Module message for EN local
* @author Raphaël Mechali
*/
const messages = {
  // orders table
  'no.order.information.title': 'No order found',
  'no.order.information.message': 'You have currently no registered order.',
  'not.logged.information.title': 'User not logged',
  'not.logged.information.message': 'Please log in to access your orders',
  'order.list.download.summary.csv.label': 'Summary',
  'order.list.download.summary.csv.tooltip': 'Download summary file as CSV',
  'order.list.admin.no.command.header.message': 'No order',
  'order.list.admin.commands.header.message': '{count} order(s)',
  'order.list.user.no.command.header.message': 'You have no order',
  'order.list.user.commands.header.message': 'You have {count} order(s)',
  'order.list.column.owner': 'User',
  'order.list.column.label': 'Label',
  'order.list.column.creation.date': 'Creation',
  'order.list.column.expiration.date': 'Expiration',
  'order.list.column.object.count': 'Objects count',
  'order.list.column.files.count': 'Files count',
  'order.list.column.errors.count': 'Errors count',
  'order.list.column.files.size': 'Total size',
  'order.list.column.progress': 'Progress',
  'order.list.column.status': 'Status',
  'order.list.column.options': 'Options',
  'order.list.cell.status.PENDING.text': 'pending',
  'order.list.cell.status.PENDING.tooltip': 'pending',
  'order.list.cell.status.RUNNING.text': 'running',
  'order.list.cell.status.RUNNING.tooltip': 'running',
  'order.list.cell.status.PAUSED.text': 'paused',
  'order.list.cell.status.PAUSED.tooltip': 'paused',
  'order.list.cell.status.EXPIRED.text': 'expired',
  'order.list.cell.status.EXPIRED.tooltip': 'Order is too old and expired',
  'order.list.cell.status.FAILED.text': 'failed',
  'order.list.cell.status.FAILED.tooltip': 'Order failed',
  'order.list.cell.status.DONE_WITH_WARNING.text': 'warning',
  'order.list.cell.status.DONE_WITH_WARNING.tooltip': 'Order was handled successfully but has warning',
  'order.list.cell.status.DONE.text': 'done',
  'order.list.cell.status.DONE.tooltip': 'done',
  'order.list.cell.status.DELETED.text': 'deleted',
  'order.list.cell.status.DELETED.tooltip': 'Order was deleted',
  'order.list.cell.status.REMOVED.text': 'removed',
  'order.list.cell.status.REMOVED.tooltip': 'Order was definitively erased',
  'order.list.cell.status.UNKNOWN.text': 'unknown',
  'order.list.cell.status.UNKNOWN.tooltip': 'Order status is unknown',
  'order.list.cell.status.WAITING_USER_DOWNLOAD.text': 'waiting user',
  'order.list.cell.status.WAITING_USER_DOWNLOAD.tooltip': 'Order is waiting. Please download data so that it can continue',
  'order.list.option.cell.download.title': 'Download...',
  'order.list.option.cell.download.zip.tooltip': 'Download available order files as zip',
  'order.list.option.cell.download.metalink.tooltip': 'Download order metalink file',
  'order.list.option.cell.delete.superficially.order.tooltip': 'Cancel order',
  'order.list.option.cell.delete.superficially.confirmation.title': 'Cancel order',
  'order.list.option.cell.delete.superficially.confirmation.message': 'Do you really want to cancel this command ?',
  'order.list.option.cell.delete.superficially.confirmation.button': 'Confirm',
  'order.list.option.cell.delete.completely.order.tooltip': 'Clear completely order and associated data',
  'order.list.option.cell.delete.completely.confirmation.title': 'Delete completely',
  'order.list.option.cell.delete.completely.confirmation.message': 'That order and associated data will be fully deleted. Would you like to continue',
  'order.list.option.cell.delete.completely.confirmation.button': 'Delete',
  'order.list.option.cell.pause.order.tooltip': 'Pause order',
  'order.list.option.cell.resume.order.tooltip': 'Resume order',
  'order.list.option.cell.detail.title': 'Detail',
  'order.list.options.error.title': 'Request failed',
  'order.list.options.error.close.button.label': 'Close',
  'order.list.options.error.ORDER_MUST_BE_PAUSED_BEFORE_BEING_DELETED': 'That order cannot be deleted as it is not paused.',
  'order.list.options.error.ORDER_NOT_COMPLETELY_STOPPED': 'That order is not fully paused. Please try again later.',
  'order.list.options.error.ORDER_NOT_COMPLETELY_PAUSED': 'That order is not fully paused. Please try again later.',
  'order.list.options.error.ORDER_MUST_NOT_BE_RUNNING': 'That order cannot be deleted as it is running.',
  'order.list.options.error.ORDER_MUST_BE_PENDING_OR_RUNNING': 'That order cannot be paused as it is not running',
  'order.list.options.error.ONLY_PAUSED_ORDER_CAN_BE_RESUMED': 'That order cannot be resumed as it is not paused',
  'order.list.options.error.UNKNOWN': 'An unknown error occurred',
  'order.list.options.aynschronous.request.title': 'Processing request...',
  'order.list.options.aynschronous.request.message': 'Your request has been handled and changes in order will be performed as soon as possible.',
  'order.list.options.aynschronous.request.close.button.label': 'Close',

  // order datasets table
  'datasets.list.no.dataset.information.title': 'No dataset',
  'datasets.list.no.dataset.information.message': 'No dataset resolved for that command. You have no longer access to ordered data files.',
  'datasets.list.no.dataset.header.message': 'No dataset',
  'datasets.list.datasets.header.message': '{count} dataset(s)',
  'datasets.list.column.label': 'Name',
  'datasets.list.column.objects.count': 'Objects count',
  'datasets.list.column.files.count': 'Files count',
  'datasets.list.column.files.size': 'Files size',
  'datasets.list.column.processing': 'Processing',
  'datasets.list.column.processing.undefined': 'Undefined',
  'datasets.list.column.options': 'Options',
  'datasets.list.option.cell.detail.title': 'Dataset files',

  // order dataset files table
  'files.list.no.file.information.title': 'No file',
  'files.list.no.file.information.message': 'There is no file within selected dataset',
  'files.list.no.file.header.message': 'No file',
  'files.list.files.header.message': '{count} file(s)',
  'files.list.column.name': 'Name',
  'files.list.column.size': 'Size',
  'files.list.column.type': 'MIME type',
  'files.list.column.status': 'Status',
  'files.list.column.source': 'Source',
  'files.list.column.options': 'Options',
  'files.list.cell.status.PENDING.text': 'pending',
  'files.list.cell.status.PENDING.tooltip': 'That file is not yet available for download',
  'files.list.cell.status.AVAILABLE.text': 'available',
  'files.list.cell.status.AVAILABLE.tooltip': 'That file is available for download',
  'files.list.cell.status.ONLINE.text': 'available',
  'files.list.cell.status.ONLINE.tooltip': 'That file is available for download',
  'files.list.cell.status.DOWNLOADED.text': 'downloaded',
  'files.list.cell.status.DOWNLOADED.tooltip': 'That file has been downloaded',
  'files.list.cell.status.DOWNLOAD_ERROR.text': 'download error',
  'files.list.cell.status.DOWNLOAD_ERROR.tooltip': 'An error occurred at downloading',
  'files.list.cell.status.PROCESSING_ERROR.text': 'processing error',
  'files.list.cell.status.PROCESSING_ERROR.tooltip': 'An error occurred when processing the file',
  'files.list.cell.status.ERROR.text': 'error',
  'files.list.cell.status.ERROR.tooltip': 'An error occurred while downloading',
  'files.list.cell.status.UNKNOWN.text': 'unknown',
  'files.list.cell.status.UNKNOWN.tooltip': 'Unknown file state',
  'files.list.cell.options.download.tooltip': 'Download file',
}

export default messages
