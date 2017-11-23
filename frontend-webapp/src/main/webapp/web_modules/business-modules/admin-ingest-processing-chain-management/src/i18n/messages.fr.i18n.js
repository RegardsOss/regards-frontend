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

  'processing-chain.list.title': 'Chaînes de traitements',
  'processing-chain.list.subtitle': 'Les chaînes de traitement peremettent de personaliser les traitements réalisés sur les données soumises ou SIP (submission information package).',
  'processing-chain.info.message': 'Une chaîne de traitement est consitutée des étapes configurables ci-dessous. Toutes ces étapes sont réalisées avant de réaliser le stockage des AIP générés. ',
  'processing-chain.info.message.step1': '1 - [Optionel] Prétraitement',
  'processing-chain.info.message.step2': '2 - Validation de la données soumise',
  'processing-chain.info.message.step3': '3 - Génération de la donnée archivée ou AIP(archival information package)',
  'processing-chain.info.message.step4': '4 - [Optionel] Tag de la donée générée avec divers mots clés, collections, documents, ...',
  'processing-chain.info.message.step5': '5 - [Optional] Post traitement. Dernière étape avant stockage du fichier',
  'processing-chain.empty.title': 'Aucune chaîne de traitement définie.',
  'processing-chain.addnew.button': 'Créer une chaîne de traitement',
  'processing-chain.back.button': 'Retour',
  'processing-chain.delete.confirm.title': 'Etes vous sûr de vouloir supprimer la châine de traitement : {name} ?',

  'processing-chain.edit.tooltip': 'Editer',

  'processing-chain.form.create.title': 'Création d\'une nouvelle chaîne de traitement',
  'processing-chain.form.edit.title': 'Edition de la chaîne de traitement {name}',
  'processing-chain.form.create.input.name': 'Nom',
  'processing-chain.form.create.input.description': 'Description',
  'processing-chain.form.create.action.create': 'Créer',
  'processing-chain.form.edit.action.save': 'Mettre à jour',
  'processing-chain.form.create.action.cancel': 'Annuler',

}, Locales.fr)

export default messages