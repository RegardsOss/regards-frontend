/**
 * Copyright 2013.2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { DataProviderDomain, IngestDomain } from '@regardsoss/domain'
import { Locales } from '@regardsoss/form-utils'

const messages = {
  ...DataProviderDomain.enMessages,
  ...IngestDomain.enMessages,

  // 1 Chain creation/edition form
  // 1.1 Header section
  'acquisition-chain.form.create.title': 'Create a new acquisition chain',
  'acquisition-chain.form.edit.title': 'Edit acquisition chain : {name}',
  'acquisition-chain.form.duplicate.title': 'Duplicate generation chain : {name}',
  'acquisition-chain.form.informations-1': 'To be operational an acquisition chain must be associated to the elements here under. Note : The properties with (*) are mandatory.',
  'acquisition-chain.form.informations-2': '1. General information.',
  'acquisition-chain.form.informations-3': '2. Files to acquire.',
  'acquisition-chain.form.informations-4': '2. Store files.',
  'acquisition-chain.form.informations-5': '3. Products construction from acquired files.',

  // 1.2 General configuration section
  'acquisition-chain.form.general.section.title': 'General',
  'acquisition-chain.form.general.section.label': 'Chain name (*)',
  'acquisition-chain.form.general.section.active': 'Activate chain',
  'acquisition-chain.form.general.section.periodicity': 'Activation cron. (eg: "0 * 0 * *", must start with "0 *")',
  'acquisition-chain.form.general.section.cron.description.title': 'Cron expression format',
  'acquisition-chain.form.general.section.cron.description.tooltip': 'Cron expression format',
  'acquisition-chain.form.general.section.cron.description.close': 'Close',
  'acquisition-chain.form.general.section.version.mode': 'Products versioning mode (*)',
  'acquisition-chain.form.general.section.version.mode.IGNORE': 'Ignore modified products',
  'acquisition-chain.form.general.section.version.mode.INC_VERSION': 'Create new version for modified products (default)',
  'acquisition-chain.form.general.section.version.mode.REPLACE': 'Replace current products by modified products',
  'acquisition-chain.form.general.section.version.mode.MANUAL': 'Chose operation when a modified product is detected',
  'acquisition-chain.form.general.section.starting.mode': 'Starting mode (*)',
  'acquisition-chain.form.general.section.starting.mode.AUTO': 'Automatic (periodic)',
  'acquisition-chain.form.general.section.starting.mode.MANUAL': 'Manual',
  'acquisition-chain.form.general.section.ingestChain.select': 'Ingest chain (*)',
  'acquisition-chain.form.general.section.ingestChain.select.hint': 'Select an existing ingest chain ... ',
  'acquisition-chain.form.general.section.info.category': 'Categories allow you to filter the AIPs for datasources crawling',
  'acquisition-chain.form.general.section.category-hint': 'New category',
  'acquisition-chain.form.general.section.click.category.add.warn': 'Confirm category add',
  'acquisition-chain.form.general.section.click.category.add.exist': 'Category already exist',

  // 1.3 Storage configuration section
  'acquisition-chain.form.storage.section': 'Storage',
  'acquisition-chain.form.general.section.storage.mode.info': 'This section allows to configure how acquired files will be stored during products generation of the current acquisition chain.',
  'acquisition-chain.form.general.section.storage.mode.store.name': 'Store files',
  'acquisition-chain.form.general.section.storage.mode.store': ' : Acquired files will be copied to configured storage locations.',
  'acquisition-chain.form.general.section.storage.mode.ref.name': 'Reference files',
  'acquisition-chain.form.general.section.storage.mode.ref': ' : Acquired files will not be copied or moved but referenced in the configured storage location with their actual location path.',
  'acquisition-chain.form.general.section.path': 'Storage folder (optional)',
  'acquisition-chain.form.general.section.info.storage': 'Select one or more storages for the files. Select the kind of file you want to store for each storage selected.',
  'acquisition-chain.form.general.section.info.storage.no.data': 'Chain cannot be edited as there is no configured storage',
  'acquisition-chain.form.general.section.storage.ref.select': 'Select storage location where files are referenced',

  // 1.3 Files configuration section
  'acquisition-chain.form.fileInfos.section': 'Files',
  'acquisition-chain.form.fileInfos.list.item.title': 'File',
  'acquisition-chain.form.fileInfos.options.title': 'Actions',
  'acquisition-chain.form.fileInfos.list.add.button': 'Add',
  'acquisition-chain.form.fileInfos.list.delete.button': 'Remove',
  'acquisition-chain.form.fileInfos.list.duplicate.button': 'Duplicate',
  'acquisition-chain.form.fileInfo.comment': 'Name',
  'acquisition-chain.form.fileInfo.plugin.scan.label': 'Plugin to detect new data (*)',
  'acquisition-chain.form.fileInfo.mandatory': 'Mandatory to build the product',
  'acquisition-chain.form.fileInfo.mimeType': 'Mime-type (*)',
  'acquisition-chain.form.fileInfo.dataType': 'Data type (*)',
  'acquisition-chain.form.fileInfo.scanDirInfos': 'Scan dirctories (*)',
  'acquisition-chain.form.fileInfo.scanDir.scannedDirectory': 'Directory to scan',
  'acquisition-chain.form.fileInfo.scanDir.lastModificationDate': 'Since',
  // 1.4 Plugins configuration section
  'acquisition-chain.form.plugins.section': 'Product factory',
  'acquisition-chain.form.plugins.select.label': 'Select a plugin ...',
  'acquisition-chain.form.plugins.validation.label': 'Products validation system (*)',
  'acquisition-chain.form.plugins.product.label': 'Files assocation system to generate a single product (*)',
  'acquisition-chain.form.plugins.gen-sip.label': 'Product metadata factory (*)',
  'acquisition-chain.form.plugins.post-processing.label': 'Post treatment',

  // 1.5 Actions
  'acquisition-chain.form.create.button': 'Create',
  'acquisition-chain.form.update.button': 'Update',
  'acquisition-chain.form.cancel.button': 'Cancel',

  // 2 Chain list
  // 2.1 Header
  'acquisition-chain.list.subtitle': 'Data acquisition chains management. This section allows you to configure, run and stop acquisition chains.',
  'acquisition-product.help.deletion.message': 'To delete a chain, you have to desable it first.',
  'acquisition-chain.empty.title': 'No chain configured',
  'acquisition-chain.no.content.message': 'No requests',
  'acquisition-chain.loading.content.title': 'Loading...',
  'acquisition-chain-breadcrumb.label': 'Acquisition chains',

  // 2.2 Table header
  'acquisition-chain.list.label': 'Name',
  'acquisition-chain.list.mode': 'Mode',
  'acquisition-chain.list.mode.AUTO': 'Automatic',
  'acquisition-chain.list.mode.MANUAL': 'Manual',
  'acquisition-chain.list.running': 'Enabled',
  'acquisition-chain.list.state': 'State',
  'acquisition-chain.list.activity.not.running': 'Stopped',
  'acquisition-chain.list.activity.not.running.date': 'Stopped since {date}',
  'acquisition-chain.list.activity.deletion.pending': 'Deletion pending',
  'acquisition-chain.list.activity.dialog.title': 'Activity',
  'acquisition-chain.list.activity.button.title': 'See activity',
  'acquisition-chain.list.total-nb-products': 'Products',
  'acquisition-chain.list.total-products.tooltip': 'Total number of products',
  'acquisition-chain.list.error-nb-products.tooltip': 'Products in error',
  'acquisition-chain.list.inprogress-nb-products.tooltip': 'Products in progress',
  'acquisition-chain.list.total-nb-files': 'Files',
  'acquisition-chain.list.total-files.tooltip': 'Total number of files',
  'acquisition-chain.list.error-nb-files.tooltip': 'Files in error',
  'acquisition-chain.list.inprogress-nb-files.tooltip': 'Files in progress',

  // 2.3 Table actions
  'acquisition-chain.list.toggle.error': 'Error modifying acquisition chain {chainId}',
  'acquisition-chain.list.run.tooltip': 'Run acquisition chain',
  'acquisition-chain.list.run.error': 'Error running acquisition chain {label} ({chainId})',
  'acquisition-chain.list.stop.tooltip': 'Stop acquisition chain',
  'acquisition-chain.list.stop.error': 'Error stopping acquisition chain {label} ({chainId})',
  'acquisition-chain.list.duplicate.tooltip': 'Duplicate acquisition chain',
  'acquisition-chain.list.edit.tooltip': 'Edit acquisition chain',
  'acquisition-chain.list.list.tooltip': 'See session\'s details',
  'acquisition-chain.list.mode.manual': 'Manual',
  'acquisition-chain.list.mode.auto': 'Auto',
  'acquisition-chain.list.enabled.true': 'True',
  'acquisition-chain.list.enabled.false': 'False',
  'acquisition-chain.list.addnew.button': 'Create new chain',
  'acquisition-chain.list.delete.confirm.title': 'Delete chain {label} ?',

  // 2.4 Table filters
  'acquisition-chain.list.filters.label.label': 'Label',
  'acquisition-chain.list.filters.running.label': 'Activation state',
  'acquisition-chain.list.filters.mode.label': 'Activation mode',
  'acquisition-chain.list.filters.mode.AUTO': 'Automatic',
  'acquisition-chain.list.filters.mode.MANUAL': 'Manual',
  'acquisition-chain.list.filters.running.true': 'Actives',
  'acquisition-chain.list.filters.running.false': 'Stopped',
  'acquisition-chain.list.refresh.button': 'Refresh',
  'acquisition-chain.list.filter.button': 'Filter',
  'acquisition-chain.list.enable-selected.button': 'Enable selected chains',
  'acquisition-chain.list.disable-selected.button': 'Disable selected chains',
  'acquisition-chain.list.refresh.auto.label': 'Auto Refresh',
  'acquisition-chain.list.back.button': 'Back',

  //3. Sessions Monitor
  'acquisition-sessions.empty-response': 'No session available',
  'acquisition-sessions.title': 'Sessions',
  'acquisition-sessions.subtitle': 'Monitor all data ingesting and indexation',
  'acquisition-sessions.back.button': 'Back',
  'acquisition-sessions.refresh.button': 'Refresh',

  //3.1 Table headers
  'acquisition-sessions.table.name': 'Session',
  'acquisition-sessions.table.source': 'Source',
  'acquisition-sessions.table.creation-date': 'Creation Date',
  'acquisition-sessions.table.state': 'State',
  'acquisition-sessions.table.sip-generated': 'Processed products',
  'acquisition-sessions.table.version': 'Versioning',
  'acquisition-sessions.table.aip-stored': 'Archived products',
  'acquisition-sessions.table.indexed': 'Indexed products',
  'acquisition-sessions.table.last-modification': 'Last modification',

  //3.2 Table Headers tooltip
  'acquisition-sessions.table.sip-generated.tooltip': 'Prepared products for ingestion (SIP processed)',
  'acquisition-sessions.table.version.tooltip': 'Existing products version management',
  'acquisition-sessions.table.aip-stored.tooltip': 'Products stored (AIP stored)',
  'acquisition-sessions.table.indexed.tooltip': 'Indexed products in catalog',

  //3.3 Products states
  'acquisition-sessions.states.complet': 'Generated',
  'acquisition-sessions.states.incomplete': 'Prod. incompletes',
  'acquisition-sessions.states.invalid': 'Prod. invalids',
  'acquisition-sessions.states.files_acquired': 'Files scanned',
  'acquisition-sessions.states.error': 'Errors',
  'acquisition-sessions.states.pending': 'Pending',
  'acquisition-sessions.states.ignored.label': 'Ignored:',
  'acquisition-sessions.states.ignored.tooltip': 'Detected changes that were ignored',
  'acquisition-sessions.states.replaced.label': 'Replaced:',
  'acquisition-sessions.states.replaced.tooltip': 'Detected changes that gave rise to corresponding products version replacement',
  'acquisition-sessions.states.new.version.label': 'New versions:',
  'acquisition-sessions.states.new.version.tooltip': 'Detected changes that gave rise to new products version',
  'acquisition-sessions.states.waiting.header': 'Waiting action...',
  'acquisition-sessions.states.waiting.label': 'Waiting:',
  'acquisition-sessions.states.waiting.tooltip': 'Detected changes awaiting on an administrator decision',
  'acquisition-sessions.states.storing': 'To store',
  'acquisition-sessions.states.stored': 'Stored',
  'acquisition-sessions.states.running': 'Running',
  'acquisition-sessions.states.indexed': 'Indexed',
  'acquisition-sessions.states.index.errors': 'Errors',
  'acquisition-sessions.states.acknowledge': 'Acknowledge this session error',

  //3.4 Cell's Menus
  'acquisition-sessions.menus.session.delete.button': 'Delete session products',
  'acquisition-sessions.menus.session.delete.force.button': 'Delete session',
  'acquisition-sessions.menus.session.delete.dialog.title': 'Delete session <{source} - {name}> products',
  'acquisition-sessions.menus.session.delete.dialog.message': 'You are going to delete acquired products. If associated storage location is configured to allow deletion, so files will also be deleted.',
  'acquisition-sessions.menus.session.delete.dialog.cancel.button': 'Cancel',
  'acquisition-sessions.menus.session.delete.dialog.delete.button': 'Delete products',
  'acquisition-sessions.menus.session.delete.dialog.force.button': 'Delete session',
  'acquisition-sessions.menus.session.delete.dialog.deletion.error': 'Unknown error occured during deletion. Please retry later.',
  'acquisition-sessions.menus.products.relaunch': 'Relaunch errored products',
  'acquisition-sessions.menus.products.show.errors': 'Display error products',
  'acquisition-sessions.menus.products.show.incomplete': 'Display incomplete products',
  'acquisition-sessions.menus.products.show.invalids': 'Display invalid products',
  'acquisition-sessions.menus.products.delete': 'Delete products',
  'acquisition-sessions.menus.versioning.view.ignored.requests': 'Display ignored changes',
  'acquisition-sessions.menus.versioning.view.waiting.requests': 'Display waiting changes',
  'acquisition-sessions.menus.archives': 'Archive ready products',
  'acquisition-sessions.menus.archives.relaunch': 'Relaunch Processing in error',
  'acquisition-sessions.menus.archives.list': 'List products',
  'acquisition-sessions.menus.archives.list.error': 'List Processing in error',

  'acquisition-sessions.menus.products.list.name': 'Product',
  'acquisition-sessions.menus.products.list.error': 'Error cause',
  'acquisition-sessions.menus.products.list.title.error': 'Error products for session {source}:{session}',
  'acquisition-sessions.menus.products.list.title.incomplete': 'Incomplete products for session {source}:{session}',
  'acquisition-sessions.menus.products.list.help.error': 'After resolving products issues, you can relaunch acquisition of those products.',
  'acquisition-sessions.menus.products.list.help.incomplete': 'An incomplete product, is a product with a missing file from the madatory ones. Maybe files were missing during directory scan. If files are now there, you can relaunch session to acquire those new files and complete products',

  'acquisition-sessions.menus.index.view': 'View data crawlers',

  //3.5 Filters
  'acquisition-sessions.filters.source': 'Source',
  'acquisition-sessions.filters.session': 'Session',
  'acquisition-sessions.filters.from.label': 'From',
  'acquisition-sessions.filters.to.label': 'To',
  'acquisition-sessions.filters.last-session': 'Last session only',
  'acquisition-sessions.filters.errors-only': 'Errors only',
  'acquisition-sessions.filters.reset': 'Clear filters',
  'acquisition-sessions.filters.apply': 'Apply filters',
  'acquisition-sessions.filters.column-selector': 'Select columns to show',
  'acquisition-sessions.filters.sources-hint': 'Sources',
  'acquisition-sessions.filters.sessions-hint': 'Sessions',

  // 3.6 Sessions states
  'acquisition-sessions.state.OK': 'No error',
  'acquisition-sessions.state.DELETED': 'Deleted',
  'acquisition-sessions.state.ACKNOWLEDGED': 'Error acknowledged',
  'acquisition-sessions.state.ERROR': 'Error',

  //4 Run Confirm Dialog
  'acquisition-product.run.dialog.title': 'Would you like to rename this session?',
  'acquisition-product.run.dialog.message': 'You can directly confirm if you don\'t need to rename it.',
  'acquisition-product.run.dialog.confirm.button': 'Confirm',
  'acquisition-product.run.dialog.close.button': 'Close',

  'invalid.cron.expression': 'Invalid cron',
  ...Locales.en,
}

export default messages
