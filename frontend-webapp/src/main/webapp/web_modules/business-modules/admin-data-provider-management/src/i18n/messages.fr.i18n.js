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
  'generation-chain.empty.title': 'Aucune chaîne définie',
  'generation-chain.list.title': 'Configuration des chaînes de génération',
  'generation-chain.list.subtitle': 'Les chaînes de générations correspondent à l\'enchaînement de traitements réalisés sur les nouvelles données détectée avant leur ajout dans le catalogue de données.',
  'generation-chain.addnew.button': 'Ajouter',
  'generation-chain.back.button': 'Retour',
  'generation-chain.edit.tooltip': 'Editer',

  'generation-chain.delete.confirm.title': 'Etes-vous sûr de vouloir suppriler la chaîne de traitement : {label}',

  'generation-chain.info.message': 'Vous pouvez définir pour chaque étape de la chaîne un traitement spécifique grâce aux plugins suivants.',
  'generation-chain.info.message.step1': '1 - Scan plugin: Comment chercher les nouvelles données à acquérir.',
  'generation-chain.info.message.step2': '2 - Check plugin: Comment vérifier la validité des nouvelles données à acquérir.',
  'generation-chain.info.message.step3': '3 - Generate SIP plugin: Comment générer les métadonnées associées aux nouvelles données à acquérir.',
  'generation-chain.info.message.step4': '4 - Post processing plugin: Traitement à réaliser après la génération des données à acquérir.',

  'generation-chain.form.create.title': 'Créer une nouvelle chaîne de génération',
  'generation-chain.form.informations-1': 'Une chaîne de génération doit pour fonctionner être associée aux éléments ci-dessous. Remarque : Les champs marqués (*) correspondent aux champs obligatoires.',
  'generation-chain.form.informations-2': '1. Un jeu de données. Toutes les données acquises grâce à cette chaîne seront alors associées à ce jeu de données.',
  'generation-chain.form.informations-3': '2. Une chaîne de traitement. La chaîne de traitement sélectionnée sera utilisée pour générer les fichiers tels qu\'ils seront archivés.',
  'generation-chain.form.informations-4': '3. Un ou plusieurs types de fichiers. Un type de fichier permet de configurer où et comment trouver les fichiers à acquérir.',
  'generation-chain.form.edit.title': 'Edition de la chaîne : {name}',
  'generation-chain.form.create.general.section': 'Général',
  'generation-chain.form.create.fileInfos.section': 'Fichiers',
  'generation-chain.form.create.plugins.section': 'Plugins',
  'generation-chain.form.create.fileInfos.list.item.title': 'Fichier',
  'generation-chain.form.create.fileInfos.options.title': 'Actions',
  'generation-chain.form.create.fileInfos.list.add.button': 'Ajouter',
  'generation-chain.form.create.fileInfos.list.delete.button': 'Supprimer',
  'generation-chain.form.create.fileInfos.list.duplicate.button': 'Dupliquer',
  'generation-chain.form.create.input.label': 'Libellé (*)',
  'generation-chain.form.create.input.active': 'Activer la chaîne de génération',
  'generation-chain.form.create.input.periodicity': 'Période d\'activation (secondes)',
  'generation-chain.form.create.input.dataset.select.hint': 'Filter sur les jeux existants ...',
  'generation-chain.form.create.input.dataset.select': 'Jeu de données (*)',
  'generation-chain.form.create.input.session': 'Nom de session d\'ingestion',
  'generation-chain.form.create.mode.hint': 'Mode',
  'generation-chain.form.create.mode.label': 'Mode',
  'generation-chain.form.create.input.ingestChain.select': 'Chaîne de traitement (*)',
  'generation-chain.form.create.input.ingestChain.select.hint': 'Sélectionner une chaîne de traitement ... ',

  'generation-chain.form.create.fileInfo.comment': 'Description',
  'generation-chain.form.create.fileInfo.mandatory': 'Le fichier est-il obligatoire à la construction du produit ?',
  'generation-chain.form.create.fileInfo.mimeType.hint': 'Mime-type',
  'generation-chain.form.create.fileInfo.mimeType.label': 'Mime-type',
  'generation-chain.form.create.fileInfo.dataType.hint': 'Type de donnée à générer',
  'generation-chain.form.create.fileInfo.dataType.label': 'Type de donnée à générer',

  'generation-chain.create.fileInfos.delete.confirm.title': 'Voulez-vous supprimer le fichier {index} ?',
  'generation-chain.form.plugins.select.label': 'Sélectionner un plugin ...',
  'generation-chain.form.plugins.validation.label': 'Méthode de validation des données (*)',
  'generation-chain.form.plugins.scan.label': 'Méthode de détection des données (*)',
  'generation-chain.form.plugins.product.label': 'Construction du produit (*)',
  'generation-chain.form.plugins.gen-sip.label': 'Génération des métadonnées (*)',
  'generation-chain.form.plugins.post-processing.label': 'Post traitement',
  'generation-chain.form.create.action.create': 'Créer',
  'generation-chain.form.edit.action.save': 'Mettre à jour',
  'generation-chain.form.create.action.cancel': 'Annuler',

}, Locales.fr)

export default messages
