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
  'processing-chain.table.name': 'Nom',
  'processing-chain.table.description': 'Description',

  'processinghain.list.title': 'Chaînes de traitements',
  'processinghain.list.subtitle': 'Les chaînes de traitement peremettent de personaliser les traitements réalisés sur les données soumises ou SIP (submission information package).',
  'processinghain.info.message' : 'Une chaîne de traitement est consitutée des étapes configuragles suivantes : ',
  'processinghain.info.message.step1' : '1 - [Optionel] Prétraitement',
  'processinghain.info.message.step2' : '2 - Validation de la données soumise',
  'processinghain.info.message.step3' : '3 - Génération de la donnée archivée ou AIP(archival information package)',
  'processinghain.info.message.step4' : '4 - [Optionel] Tag de la donée générée avec divers mots clés, collections, documents, ...',
  'processing-chain.empty.title': 'Aucune chaîne de traitement définie.',
}, Locales.fr)

export default messages
