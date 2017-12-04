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
  'generation-chain.empty.title': 'No generation chain defined',
  'generation-chain.list.title': 'Configure generation chains',
  'generation-chain.list.subtitle': 'Generation chains are used to automaticcly generate and add datas.',
  'generation-chain.addnew.button': 'Add new',
  'generation-chain.back.button': 'Back',
  'generation-chain.edit.tooltip': 'Edit',

  'generation-chain.delete.confirm.title': 'Are you sur you want to delete the chain {label}',

  'generation-chain.info.message': 'You can define specific plugins to handle each generation steps.',
  'generation-chain.info.message.step1': 'Scan plugin: How to define new data to generate.',
  'generation-chain.info.message.step2': 'Check plugin: How to check new data validity.',
  'generation-chain.info.message.step3': 'Generate SIP plugin: How to generate metadata of new datas.',
  'generation-chain.info.message.step4': 'Post processing plugin: Custom processing done after SIP generation.',

  'generation-chain.form.create.title': 'Create a new generation chain',
  'generation-chain.form.informations-1': 'To be operational a generation chain must be associated to : ',
  'generation-chain.form.informations-2': '1. One Dataset. All acquired data will be associated to this Dataset.',
  'generation-chain.form.informations-3': '2. One Processing Chain. This chain will be used to generated archived files.',
  'generation-chain.form.informations-4': '3. One or many MetaFiles. A MetaFile allow to configure where and how retrieve files to acquire.',
  'generation-chain.form.edit.title': 'Edit generation chain : {name}',
  'generation-chain.form.create.input.label': 'Label (*)',
  'generation-chain.form.create.input.comment': 'Description',
  'generation-chain.form.create.input.active': 'Activate generation chain',
  'generation-chain.form.create.input.periodicity': 'Auto activation periodicity (seconds)',
  'generation-chain.form.create.input.dataset.select.hint': 'Filter on existing datasets ...',
  'generation-chain.form.create.input.dataset.select': 'Dataset (*)',
  'generation-chain.form.create.metaproduct.checksum.hint': 'Choose an algorithm ...',
  'generation-chain.form.create.metaproduct.checksum.label': 'Checksum algorithm used to calculate checksum of each file to acquire (*)',
  'generation-chain.form.create.metaproduct.clean.label': 'Delete acquired files',
  'generation-chain.form.create.metaproduct.ingest-chain.select': 'Processing chain (*)',
  'generation-chain.form.create.metaproduct.ingest-chain.hint': 'Choose a processing chain ... ',
  'generation-chain.form.create.metaFile.fileNamePattern': 'File name pattern',
  'generation-chain.form.plugins.select.label': 'Choose a plugin ...',
  'generation-chain.form.plugins.scan.label': 'Scan for new datas',
  'generation-chain.form.plugins.check.label': 'Check datas',
  'generation-chain.form.plugins.gen-sip.label': 'Metadatas generation',
  'generation-chain.form.plugins.post-processing.label': 'Post processing',
  'generation-chain.form.create.action.create': 'Create',
  'generation-chain.form.edit.action.save': 'Update',
  'generation-chain.form.create.action.cancel': 'Cancel',


}, Locales.en)

export default messages
