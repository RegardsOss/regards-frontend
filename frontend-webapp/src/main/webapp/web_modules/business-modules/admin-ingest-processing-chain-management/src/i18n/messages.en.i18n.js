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

  'processinghain.list.title': 'List of processing chains',
  'processinghain.list.subtitle': 'Processing chains are used to customize the way data are archived into catalog.',
  'processinghain.info.message' : 'A processing chain consist of executing here under step for data submission : ',
  'processinghain.info.message.step1' : '1 - [Optional] Preprocessing',
  'processinghain.info.message.step2' : '2 - Submitted data validation',
  'processinghain.info.message.step3' : '3 - Generation of archived data or AIPs(archival information package)',
  'processinghain.info.message.step4' : '4 - [Optional] Tag data with keywords, collections, documents, ...',
  'processing-chain.empty.title': 'No processing chain defined',

}, Locales.en)

export default messages
