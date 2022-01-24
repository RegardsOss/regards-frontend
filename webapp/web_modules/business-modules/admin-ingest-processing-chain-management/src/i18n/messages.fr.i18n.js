/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
  'processing-chain.table.name': 'Nom',
  'processing-chain.table.description': 'Description',

  'processing-chain.list.title': 'Chaînes d\'ingestion',
  'processing-chain.list.subtitle': 'Ces chaînes permettent de personnaliser les traitements réalisés sur les SIP(s) (Submission Information Package).',
  'processing-chain.list.name.column': 'Nom',
  'processing-chain.list.description.column': 'Description',
  'processing-chain.info.message': 'Une chaîne est constituée des étapes configurables ci-dessous. Toutes ces étapes sont réalisées avant la soumission des AIP générés (étapes optionnelles entre crochets).',
  'processing-chain.info.message.step1': '1 - [Pré-traitement] Action de pré-traitement quelconque et si le SIP est passé par référence lancement de l\'étape de lecture',
  'processing-chain.info.message.step2': '2 - Validation du SIP',
  'processing-chain.info.message.step3': '3 - Transformation du SIP en AIP(s) (Archival Information Package)',
  'processing-chain.info.message.step4': '4 - [Tagging AIP(s)] Ajout de tags sur les AIP générés',
  'processing-chain.info.message.step5': '5 - [Post-traitement] Action de post-traitement quelconque en fonction du SIP',
  'processing-chain.empty.title': 'Aucune chaîne de traitement définie.',
  'processing-chain.addnew.button': 'Créer une chaîne de traitement',
  'processing-chain.back.button': 'Retour',
  'processing-chain.delete.confirm.title': 'Êtes-vous sûr de vouloir supprimer la chaîne de traitement : {name} ?',

  'processing-chain.edit.tooltip': 'Éditer',
  'processing-chain.export.tooltip': 'Exporter',

  'processing-chain.form.create.title': 'Création d\'une nouvelle chaîne de traitement',
  'processing-chain.form.edit.title': 'Édition de la chaîne de traitement {name}',
  'processing-chain.form.create.input.name': 'Nom',
  'processing-chain.form.create.input.description': 'Description',
  'processing-chain.form.create.action.create': 'Créer',
  'processing-chain.form.edit.action.save': 'Mettre à jour',
  'processing-chain.form.create.action.cancel': 'Annuler',
  'processing-chain.form.plugins.none.selected': 'Aucun',
  'processing-chain.form.plugins.none.selected.mandatory': 'Sélectionner un plugin ...',
  'processing-chain.form.preprocessing.plugin.label': 'Pré traitement',
  'processing-chain.form.validation.plugin.label': 'Vérification des données',
  'processing-chain.form.generation.plugin.label': 'Génération des données',
  'processing-chain.form.tag.plugin.label': 'Tag des données',
  'processing-chain.form.postprocessing.plugin.label': 'Post traitement',
  ...Locales.fr,
}

export default messages
