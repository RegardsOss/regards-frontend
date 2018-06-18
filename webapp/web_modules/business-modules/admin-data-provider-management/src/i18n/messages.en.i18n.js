/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

const messages = Object.assign({
  // 1. Chains list
  // 1.1 Headers
  'acquisition-chain.list.title': 'Configure generation chains',
  'acquisition-chain.list.subtitle': 'Generation chains are used to automatically generate and add datas.',
  'acquisition-chain.list.info.message': 'You can define specific plugins to handle each generation steps.',
  'acquisition-chain.list.empty.title': 'No generation chain defined',
  'acquisition-chain.list.delete.conditions': 'To delete a generation chain you have to desactivate it before.',

  // 1.2 table headers
  'acquisition-chain.list.table.label': 'Name',
  'acquisition-chain.list.table.mode': 'Activation mode',

  // 1.3 actions
  'acquisition-chain.list.addnew.button': 'Add new',
  'acquisition-chain.list.back.button': 'Back',
  'acquisition-chain.list.edit.tooltip': 'Edit',
  'acquisition-chain.list.duplicate.tooltip': 'Duplicate',
  'acquisition-chain.list.delete.confirm.title': 'Are you sure you want to delete the chain {label}',

  // 2 Chain creation/edition form
  // 2.1 Header section
  'acquisition-chain.form.create.title': 'Create a new generation chain',
  'acquisition-chain.form.edit.title': 'Edit generation chain : {name}',
  'acquisition-chain.form.duplicate.title': 'Duplicate generation chain : {name}',
  'acquisition-chain.form.informations-1': 'To be operational a generation chain must be associated to the elemnts here under. Note : The properties with (*) are mandatory.',
  'acquisition-chain.form.informations-2': '1. One Processing Chain. This chain will be used to generated archived files. (*)',
  'acquisition-chain.form.informations-3': '2. One or many file type(s). A file type allows to configure where and how retrieve files to acquire. (*)',
  'acquisition-chain.form.informations-4': '3. One data validation plugin. (*)',
  'acquisition-chain.form.informations-5': '4. One product generation plugin (*)',
  'acquisition-chain.form.informations-6': '5. One meta-data generation plugin (*).',
  'acquisition-chain.form.informations-7': '6. One optional post treatment plugin.',

  // 2.2 General configuration section
  'acquisition-chain.form.general.section.title': 'General',
  'acquisition-chain.form.general.section.label': 'Label (*)',
  'acquisition-chain.form.general.section.active': 'Activate generation chain',
  'acquisition-chain.form.general.section.periodicity': 'Activation periodicity (seconds). Only for automatic chains. ',
  'acquisition-chain.form.general.section.session': 'Ingest session name ...',
  'acquisition-chain.form.general.section.mode': 'Mode',
  'acquisition-chain.form.general.section.mode.AUTO': 'Automatic',
  'acquisition-chain.form.general.section.mode.MANUAL': 'Manual',
  'acquisition-chain.form.general.section.ingestChain.select': 'Ingest chain (*)',
  'acquisition-chain.form.general.section.ingestChain.select.hint': 'Select one existing ingest chain ... ',

  // 2.3 Files configuration section
  'acquisition-chain.form.fileInfos.section': 'Files',
  'acquisition-chain.form.fileInfos.list.item.title': 'File',
  'acquisition-chain.form.fileInfos.options.title': 'Actions',
  'acquisition-chain.form.fileInfos.list.add.button': 'Add',
  'acquisition-chain.form.fileInfos.list.delete.button': 'Remove',
  'acquisition-chain.form.fileInfos.list.duplicate.button': 'Duplicate',
  'acquisition-chain.form.fileInfo.comment': 'Description',
  'acquisition-chain.form.fileInfo.plugin.scan.label': 'How to scan for new datas (*)',
  'acquisition-chain.form.fileInfo.mandatory': 'File is mandatory for product ?',
  'acquisition-chain.form.fileInfo.mimeType': 'Mime-type',
  'acquisition-chain.form.fileInfo.dataType': 'Data type',
  // 2.4 Plugins configuration section
  'acquisition-chain.form.plugins.section': 'Plugins',
  'acquisition-chain.form.plugins.select.label': 'Select a plugin ...',
  'acquisition-chain.form.plugins.validation.label': 'Data validation plugin (*)',
  'acquisition-chain.form.plugins.product.label': 'Product generation plugin (*)',
  'acquisition-chain.form.plugins.gen-sip.label': 'Metadata generation plugin (*)',
  'acquisition-chain.form.plugins.post-processing.label': 'Post treatement plugin',

  // 2.5 Actions
  'acquisition-chain.form.create.button': 'Create',
  'acquisition-chain.form.update.button': 'Update',
  'acquisition-chain.form.cancel.button': 'Cancel',

  // 3. Monitoring
  // 3.1 Chain list
  // 3.1.1 Header
  'acquisition-chain.monitor.list.subtitle': 'This section allows you to monitor, view errors and run data acquisition chains.',
  'acquisition-chain.monitor.empty.title': 'No chain configured',
  'acquisition-chain-monitor.breadcrumb.label': 'Acquisition chains',

  // 3.1.2 Table header
  'acquisition-chain.monitor.list.label': 'Label',
  'acquisition-chain.monitor.list.mode': 'Mode',
  'acquisition-chain.monitor.list.mode.AUTO': 'Automatic',
  'acquisition-chain.monitor.list.mode.MANUAL': 'Manual',
  'acquisition-chain.monitor.list.running': 'Status',
  'acquisition-chain.monitor.list.activity.not.running': 'Stopped',
  'acquisition-chain.monitor.list.activity.not.running.date': 'Stopped since {date}',
  'acquisition-chain.monitor.list.total-nb-products': 'Products',
  'acquisition-chain.monitor.list.total-products.tooltip': 'Total number of products',
  'acquisition-chain.monitor.list.error-nb-products.tooltip': 'Products in error',
  'acquisition-chain.monitor.list.inprogress-nb-products.tooltip': 'Products in progress',
  'acquisition-chain.monitor.list.total-nb-files': 'Files',
  'acquisition-chain.monitor.list.total-files.tooltip': 'Total numver of files',
  'acquisition-chain.monitor.list.error-nb-files.tooltip': 'Files in error',
  'acquisition-chain.monitor.list.inprogress-nb-files.tooltip': 'Files in progress',

  // 3.1.3 Table actions
  'acquisition-chain.monitor.list.run.tooltip': 'Run acquisition chain',
  'acquisition-chain.monitor.list.run.error': 'Error running acquisition chain {label} ({chainId})',
  'acquisition-chain.monitor.list.stop.tooltip': 'Stop acquisition chain',
  'acquisition-chain.monitor.list.stop.error': 'Error stopping acquisition chain {label} ({chainId})',

  // 3.1.4 Table filters
  'acquisition-chain.monitor.list.filters.label': 'Label',
  'acquisition-chain.monitor.list.filters.running': 'Status',
  'acquisition-chain.monitor.list.filters.mode': 'Activation mode',
  'acquisition-chain.monitor.list.filters.mode.all': 'All',
  'acquisition-chain.monitor.list.filters.mode.auto': 'Automatic',
  'acquisition-chain.monitor.list.filters.mode.manual': 'Manual',
  'acquisition-chain.monitor.list.filters.running.all': 'All',
  'acquisition-chain.monitor.list.filters.running.running': 'Actives',
  'acquisition-chain.monitor.list.filters.running.stopped': 'Stopped',
  'acquisition-chain.monitor.list.filters.apply.button': 'Apply filters',
  'acquisition-chain.monitor.list.filters.clear.button': 'Clear',
  'acquisition-chain.monitor.list.refresh.button': 'Refresh',
  'acquisition-chain.monitor.list.back.button': 'Cancel',

  // 3.2 Chain jobs
  'acquisition-chain.jobs.monitor.view.button.label': 'Details',
  'acquisition-chain.jobs.monitor.dialog.title': 'Jobs activity for acquisition chain {label}',
  'acquisition-chain.jobs.monitor.dialog.information.message': 'Here under you can see the number of jobs running for the current acquisition chain.',
  'acquisition-chain.jobs.monitor.product-acquisition.job.label': '{count} running product acquisition jobs.',
  'acquisition-chain.jobs.monitor.product-acquisition.job.empty.label': 'All product acquisition jobs are terminated.',
  'acquisition-chain.jobs.monitor.generation.job.label': '{count} running generation jobs.',
  'acquisition-chain.jobs.monitor.generation.job.empty.label': 'All generation jobs are terminated',
  'acquisition-chain.jobs.monitor.submission.job.label': '{count} running submission jobs.',
  'acquisition-chain.jobs.monitor.submission.job.empty.label': 'All submission jobs are terminated',

  // 4. Products list
  // 4.1 Headers
  'acquisition-product.breadcrumb.label': 'Products',
  'acquisition-product.selected-chain.title': 'Products of the chain {chain}',
  'acquisition-product.empty.title': 'No products found',
  'acquisition-product.list.productName': 'Product',
  'acquisition-product.list.lastUpdate': 'Update date',
  'acquisition-product.list.state': 'State',
  'acquisition-product.list.sipState': 'SIP State',
  'acquisition-product.list.session': 'Session',

  //4.2 Filters
  'acquisition.product.list.filters.state': 'Products state',
  'acquisition.product.list.filters.sipState': 'SIPs state',
  'acquisition.product.list.filters.state.ACQUIRING': 'Acquiring ...',
  'acquisition.product.list.filters.state.COMPLETED': 'Acquiring ... (Completed)',
  'acquisition.product.list.filters.state.FINISHED': 'Finished',
  'acquisition.product.list.filters.state.ERROR': 'Error',
  'acquisition.product.list.filters.sipState.NOT_SCHEDULED': 'Acquiring ... (not scheduled)',
  'acquisition.product.list.filters.sipState.SCHEDULED': 'Acquiring ... (scheduled)',
  'acquisition.product.list.filters.sipState.GENERATED': 'Acquiring ... (generated)',
  'acquisition.product.list.filters.sipState.SUBMISSION_SCHEDULED': 'Acquiring ... (submitting)',
  'acquisition.product.list.filters.sipState.SUBMISSION_ERROR': 'Submission error',
  'acquisition.product.list.filters.sipState.GENERATION_ERROR': 'Generation error',
  'acquisition.product.list.filters.sipState.CREATED': 'Acquiring ... (Created)',
  'acquisition.product.list.filters.sipState.REJECTED': 'Rejected',
  'acquisition.product.list.filters.sipState.QUEUED': 'Queued',
  'acquisition.product.list.filters.sipState.VALID': 'Acquiring ... (Valid)',
  'acquisition.product.list.filters.sipState.INVALID': 'Invalid',
  'acquisition.product.list.filters.sipState.AIP_GEN_ERROR': 'AIP generation error',
  'acquisition.product.list.filters.sipState.AIP_CREATED': 'Acquiring ... (AIP generated)',
  'acquisition.product.list.filters.sipState.STORED': 'Stored',
  'acquisition.product.list.filters.sipState.STORE_ERROR': 'Storage error',
  'acquisition.product.list.filters.sipState.INDEXED': 'Indexed',
  'acquisition.product.list.filters.sipState.INCOMPLETE': 'Incomplete',
  'acquisition.product.list.filters.sipState.DELETED': 'Deleted',
  'acquisition-product.list.filters.productName': 'Product name',
  'acquisition.product.list.filters.session': 'Ingest session',
  'acquisition-chain.monitor.list.filters.no.session': 'Only without session',
  'acquisition.product.list.filters.from': 'Since ...',

  // 4.3 actions
  'acquisition-product.list.view.files.tooltip': 'See linked files',
  'acquisition-product.list.product.info.tooltip': 'Product acquisition informations',
  'acquisition-product.list.back.button': 'Back',
  'acquisition.product.list.filters.clear.button': 'Clear',
  'acquisition.product.list.filters.apply.button': 'Apply filters',
  'acquisition.product.list.refresh.button': 'Refresh',
  'acquisition.product.list.sip.session.link.title': 'View session monitoring',

  // 5. Acquisition file list
  // 5.1 Headers
  'acquisition-file.breadcrumb.label': 'Fichiers',
  'acquisition.file.list.subtitle': 'Acquisition chain {chain} files list',
  'acquisition.file.list.product.selected.subtitle': 'Product {product} files list',
  'acquisition.file.empty.title': 'No files found',
  'acquisition.file.list.back.button': 'Back',
  'acquisition.file.list.filePath': 'Files',
  'acquisition.file.list.acqDate': 'Acquisition date',
  'acquisition.file.list.state': 'State',

  //5.2 Filters
  'acquisition.file.list.filters.state': 'Sstate',
  'acquisition.file.list.filters.state.IN_PROGRESS': 'Acquiring ...',
  'acquisition.file.list.filters.state.VALID': 'Acquiring ... (Valid)',
  'acquisition.file.list.filters.state.ACQUIRED': 'Acquired',
  'acquisition.file.list.filters.state.SUPERSEDED': 'Replaced',
  'acquisition.file.list.filters.state.INVALID': 'Invalid',
  'acquisition.file.list.filters.state.ERROR': 'Error',
  'acquisition.file.list.filters.filePath': 'File',
  'acquisition.file.list.filters.from': 'Since ...',

  //5.3 actions
  'acquisition.file.list.filters.clear.button': 'Clear',
  'acquisition.file.list.filters.apply.button': 'Apply filters',
  'acquisition.file.list.refresh.button': 'Refresh',

  //6. Product information dialog
  'acquisition-product.informaton.dialog.title': 'Acquisition information about product {label}',
  'acquisition-product.informaton.dialog.close.button': 'Close',
  'acquisition-product.informaton.global.error': 'Acquisition process error : ',
  'acquisition-product.informaton.generation.job.title': 'Product generation process information',
  'acquisition-product.informaton.submition.job.title': 'SIP Submition process information',
  'acquisition-product.informaton.dialog.job.info.percentCompleted': 'Prgoress : ',
  'acquisition-product.informaton.dialog.job.info.queuedDate': 'Creation date : ',
  'acquisition-product.informaton.dialog.job.info.startDate': 'Start date : ',
  'acquisition-product.informaton.dialog.job.info.stopDate': 'Stop date : ',
  'acquisition-product.informaton.dialog.job.info.status': 'Status : ',

}, Locales.en)

export default messages
