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

const messages = Object.assign({
  // 1. Chains list
  // 1.1 Headers
  'acquisition-chain.list.title': 'Configure generation chains',
  'acquisition-chain.list.subtitle': 'Generation chains are used to automaticcly generate and add datas.',
  'acquisition-chain.list.info.message': 'You can define specific plugins to handle each generation steps.',
  'acquisition-chain.list.empty.title': 'No generation chain defined',

  // 1.2 table headers
  'acquisition-chain.list.table.label': 'Name',
  'acquisition-chain.list.table.mode': 'Activation mode',

  // 1.3 actions
  'acquisition-chain.list.addnew.button': 'Add new',
  'acquisition-chain.list.back.button': 'Back',
  'acquisition-chain.list.edit.tooltip': 'Edit',
  'acquisition-chain.list.duplicate.tooltip': 'Duplicate',
  'acquisition-chain.list.delete.confirm.title': 'Are you sur you want to delete the chain {label}',

  // 2 Chain creation/edition form
  // 2.1 Header section
  'acquisition-chain.form.create.title': 'Create a new generation chain',
  'acquisition-chain.form.edit.title': 'Edit generation chain : {name}',
  'acquisition-chain.form.informations-1': 'To be operational a generation chain must be associated to the elemnts here under. Note : The properties with (*) are mandatory.',
  'acquisition-chain.form.informations-2': '1. One Dataset. All acquired data will be associated to this Dataset. (*)',
  'acquisition-chain.form.informations-3': '2. One Processing Chain. This chain will be used to generated archived files. (*)',
  'acquisition-chain.form.informations-4': '3. One or many file type(s). A file type allows to configure where and how retrieve files to acquire. (*)',
  'acquisition-chain.form.informations-5': '4. One data validation plugin. (*)',
  'acquisition-chain.form.informations-6': '5. One product generation plugin (*)',
  'acquisition-chain.form.informations-7': '6. One meta-data generation plugin (*).',
  'acquisition-chain.form.informations-8': '7. One optional post treatment plugin.',

  // 2.2 General configuration section
  'acquisition-chain.form.general.section.title': 'General',
  'acquisition-chain.form.general.section.label': 'Label (*)',
  'acquisition-chain.form.general.section.active': 'Activate generation chain',
  'acquisition-chain.form.general.section.periodicity': 'Activation periodicity (seconds). Only for automatic chains. ',
  'acquisition-chain.form.general.section.dataset.select.hint': 'Filter on existing datasets ...',
  'acquisition-chain.form.general.section.dataset.select': 'Dataset (*)',
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
  'acquisition-chain.monitor.list.title': 'Data acquisition chains monitoring',
  'acquisition-chain.monitor.list.subtitle': 'This section allow you to monitor, viex errors and run the data acquisition chains.',
  'acquisition-chain.monitor.empty.title': 'No chain configured',

  // 3.1.2 Table header
  'acquisition-chain.monitor.list.label': 'Label',
  'acquisition-chain.monitor.list.running': 'Status',
  'acquisition-chain.monitor.list.activity.not.running': 'Stopped',
  'acquisition-chain.monitor.list.total-nb-products': 'Products',
  'acquisition-chain.monitor.list.total-products.tooltip': 'Total number of products',
  'acquisition-chain.monitor.list.error-nb-products.tooltip': 'Products in error',
  'acquisition-chain.monitor.list.inprogress-nb-products.tooltip': 'Products in progress',
  'acquisition-chain.monitor.list.total-nb-files': 'Files',
  'acquisition-chain.monitor.list.total-files.tooltip': 'Total numver of files',
  'acquisition-chain.monitor.list.error-nb-files.tooltip': 'Files in error',
  'acquisition-chain.monitor.list.inprogress-nb-files.tooltip': 'Files in progress',

  // 3.1.2.3 Table actions
  'acquisition-chain.monitor.list.run.tooltip': 'Run acquisition chain',
  'acquisition-chain.monitor.list.run.error': 'Error running acquisition chain',

  // 3.1.2.4 Table filters
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


}, Locales.en)

export default messages
