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
  'generation-chain.list.title': 'Configure generation chains',
  'generation-chain.list.subtitle': 'Generation chains are used to automaticcly generate and add datas.',
  'generation-chain.list.info.message': 'You can define specific plugins to handle each generation steps.',
  'generation-chain.list.empty.title': 'No generation chain defined',

  // 1.2 table headers
  'generation-chain.list.table.label': 'Name',
  'generation-chain.list.table.mode': 'Activation mode',

  // 1.3 actions
  'generation-chain.list.addnew.button': 'Add new',
  'generation-chain.list.back.button': 'Back',
  'generation-chain.list.edit.tooltip': 'Edit',
  'generation-chain.list.duplicate.tooltip': 'Duplicate',
  'generation-chain.list.delete.confirm.title': 'Are you sur you want to delete the chain {label}',

  // 2 Chain creation/edition form
  // 2.1 Header section
  'generation-chain.form.create.title': 'Create a new generation chain',
  'generation-chain.form.edit.title': 'Edit generation chain : {name}',
  'generation-chain.form.informations-1': 'To be operational a generation chain must be associated to the elemnts here under. Note : The properties with (*) are mandatory.',
  'generation-chain.form.informations-2': '1. One Dataset. All acquired data will be associated to this Dataset. (*)',
  'generation-chain.form.informations-3': '2. One Processing Chain. This chain will be used to generated archived files. (*)',
  'generation-chain.form.informations-4': '3. One or many file type(s). A file type allows to configure where and how retrieve files to acquire. (*)',
  'generation-chain.form.informations-5': '4. One data validation plugin. (*)',
  'generation-chain.form.informations-6': '5. One product generation plugin (*)',
  'generation-chain.form.informations-7': '6. One meta-data generation plugin (*).',
  'generation-chain.form.informations-8': '7. One optional post treatment plugin.',

  // 2.2 General configuration section
  'generation-chain.form.general.section.title': 'General',
  'generation-chain.form.general.section.label': 'Label (*)',
  'generation-chain.form.general.section.active': 'Activate generation chain',
  'generation-chain.form.general.section.periodicity': 'Activation periodicity (seconds). Only for automatic chains. ',
  'generation-chain.form.general.section.dataset.select.hint': 'Filter on existing datasets ...',
  'generation-chain.form.general.section.dataset.select': 'Dataset (*)',
  'generation-chain.form.general.section.session': 'Ingest session name ...',
  'generation-chain.form.general.section.mode': 'Mode',
  'generation-chain.form.general.section.ingestChain.select': 'Ingest chain (*)',
  'generation-chain.form.general.section.ingestChain.select.hint': 'Select one existing ingest chain ... ',

  // 2.3 Files configuration section
  'generation-chain.form.fileInfos.section': 'Files',
  'generation-chain.form.fileInfos.list.item.title': 'File',
  'generation-chain.form.fileInfos.options.title': 'Actions',
  'generation-chain.form.fileInfos.list.add.button': 'Add',
  'generation-chain.form.fileInfos.list.delete.button': 'Remove',
  'generation-chain.form.fileInfos.list.duplicate.button': 'Duplicate',
  'generation-chain.form.fileInfo.comment': 'Description',
  'generation-chain.form.fileInfo.plugin.scan.label': 'How to scan for new datas (*)',
  'generation-chain.form.fileInfo.mandatory': 'File is mandatory for product ?',
  'generation-chain.form.fileInfo.mimeType': 'Mime-type',
  'generation-chain.form.fileInfo.dataType': 'Data type',
  // 2.4 Plugins configuration section
  'generation-chain.form.plugins.section': 'Plugins',
  'generation-chain.form.plugins.select.label': 'Select a plugin ...',
  'generation-chain.form.plugins.validation.label': 'Data validation plugin (*)',
  'generation-chain.form.plugins.product.label': 'Product generation plugin (*)',
  'generation-chain.form.plugins.gen-sip.label': 'Metadata generation plugin (*)',
  'generation-chain.form.plugins.post-processing.label': 'Post treatement plugin',

  // 2.5 Actions
  'generation-chain.form.create.button': 'Create',
  'generation-chain.form.update.button': 'Update',
  'generation-chain.form.cancel.button': 'Cancel',


}, Locales.en)

export default messages
