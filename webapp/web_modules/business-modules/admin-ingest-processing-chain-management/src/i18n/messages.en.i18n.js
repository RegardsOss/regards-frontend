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

const messages = {
  'processing-chain.table.name': 'Name',
  'processing-chain.table.description': 'Description',

  'processing-chain.list.title': 'Ingestion chains',
  'processing-chain.list.subtitle': 'These chains set up the processing operations on SIP(s) (Submission Information Package).',
  'processing-chain.list.name.column': 'Name',
  'processing-chain.list.description.column': 'Description',
  'processing-chain.info.message': 'An ingestion chain consists of executing here under step for data submission : ',
  'processing-chain.info.message.step1': '1 - [Pre-processing] Any pretreatment action and if SIP is passed as reference, launch the read SIP step',
  'processing-chain.info.message.step2': '2 - SIP validation',
  'processing-chain.info.message.step3': '3 - SIP transformation to AIP(s) (archival information package)',
  'processing-chain.info.message.step4': '4 - [Storage metadata] Update storage locations to use',
  'processing-chain.info.message.step5': '5 - [AIP tagging] Add tags to generated AIP(s)',
  'processing-chain.info.message.step6': '6 - [Post-processing] Any post-treatment action',
  'processing-chain.empty.title': 'No processing chain defined',
  'processing-chain.addnew.button': 'Create new chain',
  'processing-chain.back.button': 'Back',
  'processing-chain.delete.confirm.title': 'Are you sure you want to delete the processing chain : {name} ?',

  'processing-chain.edit.tooltip': 'Edit',
  'processing-chain.export.tooltip': 'Export',

  'processing-chain.form.create.title': 'Create a new processing chain',
  'processing-chain.form.edit.title': 'Edit {name} processing chain',
  'processing-chain.form.create.input.name': 'Name',
  'processing-chain.form.create.input.description': 'Description',
  'processing-chain.form.create.action.create': 'Create',
  'processing-chain.form.edit.action.save': 'Update',
  'processing-chain.form.create.action.cancel': 'Cancel',
  'processing-chain.form.plugins.none.selected': 'None',
  'processing-chain.form.plugins.none.selected.mandatory': 'Choose a plugin ...',
  'processing-chain.form.preprocessing.plugin.label': 'Preprocessing',
  'processing-chain.form.validation.plugin.label': 'Datas validation',
  'processing-chain.form.generation.plugin.label': 'Datas generation',
  'processing-chain.form.storage_metadata_update.plugin.label': 'Storage metadata',
  'processing-chain.form.tag.plugin.label': 'Tag datas',
  'processing-chain.form.postprocessing.plugin.label': 'Post processing',
  ...Locales.en,
}

export default messages
