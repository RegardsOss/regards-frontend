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

  'processing-chain.table.name': 'Name',
  'processing-chain.table.description': 'Description',

  'processing-chain.list.title': 'List of processing chains',
  'processing-chain.list.subtitle': 'Processing chains are used to customize the way data are archived into catalog.',
  'processing-chain.info.message' : 'A processing chain consist of executing here under step for data submission : ',
  'processing-chain.info.message.step1' : '1 - [Optional] Pre processing',
  'processing-chain.info.message.step2' : '2 - Submitted data validation',
  'processing-chain.info.message.step3' : '3 - Generation of archived data or AIPs(archival information package)',
  'processing-chain.info.message.step4' : '4 - [Optional] Tag data with keywords, collections, documents, ...',
  'processing-chain.info.message.step5' : '5 - [Optional] Post processing',
  'processing-chain.empty.title': 'No processing chain defined',

  'processing-chain.delete.tooltip' : 'Delete',
  'processing-chain.edit.tooltip' : 'Edit',

  'processing-chain.form.create.title' : 'Create a new processing chain',
  'processing-chain.form.edit.title' : 'Edit {name} processing chain',
  'processing-chain.form.create.input.name' : 'Name',
  'processing-chain.form.create.input.description' : 'Description',
  'processing-chain.form.create.action.create' : 'Create',
  'processing-chain.form.edit.action.save' : 'Update',
  'processing-chain.form.create.action.cancel' : 'Cancel',

}, Locales.en)

export default messages
