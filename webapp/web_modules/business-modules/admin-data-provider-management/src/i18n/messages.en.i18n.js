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

const messages = Object.assign({
  ...DataProviderDomain.enMessages,
  ...IngestDomain.enMessages,

  // 1 Chain creation/edition form
  // 1.1 Header section
  'acquisition-chain.form.create.title': 'Create a new acquisition chain',
  'acquisition-chain.form.edit.title': 'Edit acquisition chain : {name}',
  'acquisition-chain.form.duplicate.title': 'Duplicate generation chain : {name}',
  'acquisition-chain.form.informations-1': 'To be operational an acquisition chain must be associated to the elements here under. Note : The properties with (*) are mandatory.',
  'acquisition-chain.form.informations-2': '1. General information about the chain.',
  'acquisition-chain.form.informations-3': '2. File composing the data.',
  'acquisition-chain.form.informations-4': '3. Chain plugins to produce the SIP(s).',

  // 1.2 General configuration section
  'acquisition-chain.form.general.section.title': 'General',
  'acquisition-chain.form.general.section.label': 'Chain name (*)',
  'acquisition-chain.form.general.section.active': 'Activate chain',
  'acquisition-chain.form.general.generationRetryEnabled': 'Enable SIP re-generation for products in error state.',
  'acquisition-chain.form.general.section.periodicity': 'Activation cron. (eg: "0 * 0 * *", must start with "0 *")',
  'acquisition-chain.form.general.section.session': 'Session name (*)',
  'acquisition-chain.form.general.section.mode': 'Mode (*)',
  'acquisition-chain.form.general.section.mode.AUTO': 'Automatic',
  'acquisition-chain.form.general.section.mode.MANUAL': 'Manual',
  'acquisition-chain.form.general.section.ingestChain.select': 'Ingest chain (*)',
  'acquisition-chain.form.general.section.ingestChain.select.hint': 'Select an existing ingest chain ... ',
  'acquisition-chain.form.general.section.path': 'Storage folder (optional)',
  'acquisition-chain.form.general.section.info.storage': 'Select one or more storages for the files. Select the kind of file you want to store for each storage selected.',
  'acquisition-chain.form.general.section.info.category': 'Categories allow you to filter the AIPs for datasources crawling',
  'acquisition-chain.form.general.section.category-hint': 'Add one on more categories (Hit Enter to validate)',

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
  // 1.4 Plugins configuration section
  'acquisition-chain.form.plugins.section': 'Plugins',
  'acquisition-chain.form.plugins.select.label': 'Select a plugin ...',
  'acquisition-chain.form.plugins.validation.label': 'Data validation plugin (*)',
  'acquisition-chain.form.plugins.product.label': 'Product generation plugin (*)',
  'acquisition-chain.form.plugins.gen-sip.label': 'Metadata generation plugin (*)',
  'acquisition-chain.form.plugins.post-processing.label': 'Post treatment plugin',

  // 1.5 Actions
  'acquisition-chain.form.create.button': 'Create',
  'acquisition-chain.form.update.button': 'Update',
  'acquisition-chain.form.cancel.button': 'Cancel',

  // 2 Chain list
  // 2.1 Header
  'acquisition-chain.list.subtitle': 'Data acquisition chains management. This section allows you to configure, run and stop acquisition chains.',
  'acquisition-chain.empty.title': 'No chain configured',
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

  // 2.4 Table filters
  'acquisition-chain.list.filters.label': 'Label',
  'acquisition-chain.list.filters.running': 'Status',
  'acquisition-chain.list.filters.mode': 'Activation mode',
  'acquisition-chain.list.filters.mode.all': 'All',
  'acquisition-chain.list.filters.mode.auto': 'Automatic',
  'acquisition-chain.list.filters.mode.manual': 'Manual',
  'acquisition-chain.list.filters.running.all': 'All',
  'acquisition-chain.list.filters.running.running': 'Actives',
  'acquisition-chain.list.filters.running.stopped': 'Stopped',
  'acquisition-chain.list.filters.apply.button': 'Apply filters',
  'acquisition-chain.list.filters.clear.button': 'Clear',
  'acquisition-chain.list.refresh.button': 'Refresh',
  'acquisition-chain.list.enable-selected.button': 'Enable selected chains',
  'acquisition-chain.list.disable-selected.button': 'Disable selected chains',
  'acquisition-chain.list.back.button': 'Cancel',

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
  'acquisition-sessions.table.sip-treated': 'Ingested products',
  'acquisition-sessions.table.aip-generated': 'Archive ready products',
  'acquisition-sessions.table.aip-stored': 'Archived products',
  'acquisition-sessions.table.indexed': 'Indexed products',
  'acquisition-sessions.table.last-modification': 'Last modification',

  //3.2 Table Headers tooltip
  'acquisition-sessions.table.sip-generated.tooltip': 'Prepared products for ingestion (SIP processed)',
  'acquisition-sessions.table.sip-treated.tooltip': 'Treated products for ingestion (SIP ingested)',
  'acquisition-sessions.table.aip-generated.tooltip': 'Products ready for storage (AIP generated)',
  'acquisition-sessions.table.aip-stored.tooltip': 'Products stored (AIP stored)',
  'acquisition-sessions.table.indexed.tooltip': 'Indexed products in catalog',

  //3.3 Products states
  'acquisition-sessions.states.completed': 'Complet',
  'acquisition-sessions.states.incomplete': 'Incomplete',
  'acquisition-sessions.states.error': 'Error',
  'acquisition-sessions.states.processed': 'Processed',
  'acquisition-sessions.states.pending': 'Pending',
  'acquisition-sessions.states.stored': 'Stored',
  'acquisition-sessions.states.invalid': 'Invalid',
  'acquisition-sessions.states.refused': 'Refused',
  'acquisition-sessions.states.running': 'Running',
  'acquisition-sessions.states.acknowledge': 'Acknowledge this session error',

  //3.4 Cell's Menus
  'acquisition-sessions.menus.session.delete': 'Delete session',
  'acquisition-sessions.menus.session.delete.definitely': 'Delete the session definitely',
  'acquisition-sessions.menus.products.relaunch': 'Relaunch errored products',
  'acquisition-sessions.menus.products.delete': 'Delete products',
  'acquisition-sessions.menus.ingested.relaunch': 'Relaunch processing of errored SIPs',
  'acquisition-sessions.menus.ingested.list': 'List all SIPs',
  'acquisition-sessions.menus.ingested.list.error': 'List all errored SIPs',
  'acquisition-sessions.menus.archives.relaunch': 'Relaunch storing of errored AIPs',
  'acquisition-sessions.menus.archives.list': 'List all AIPs',
  'acquisition-sessions.menus.archives.list.error': 'List all errored AIPs',
  'acquisition-sessions.menus.indexed.list': 'List all indexed AIPs',

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

  //4 Run Confirm Dialog
  'acquisition-product.run.dialog.title': 'Would you like to rename this session?',
  'acquisition-product.run.dialog.message': 'You can directly confirm if you don\'t need to rename it.',
  'acquisition-product.run.dialog.confirm.button': 'Confirm',
  'acquisition-product.run.dialog.close.button': 'Close',

  'invalid.cron.expression': 'Invalid cron',

}, Locales.en)

export default messages
