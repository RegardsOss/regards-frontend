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
  'generation-chain.form.informations-3': '2. Une chaîne de traitement. La chaine de traitement sélectionnée sera utilisée pour générer les fichiers tels qu\'ils seront archivés.',
  'generation-chain.form.informations-4': '3. Un ou plusieurs types de fichiers. Un type de fichier permet de configurer où et comment trouver les fichiers à acquérir.',
  'generation-chain.form.edit.title': 'Edition de la chaine : {name}',
  'generation-chain.form.create.general.section': 'Général',
  'generation-chain.form.create.metafiles.section': 'Types de fichier',
  'generation-chain.form.create.plugins.section': 'Plugins',
  'generation-chain.form.create.metaFile.list.item.title': 'Type',
  'generation-chain.form.create.metaFile.options.title': 'Actions',
  'generation-chain.form.create.metaFile.list.add.button': 'Ajouter',
  'generation-chain.form.create.metaFile.list.delete.button': 'Supprimer',
  'generation-chain.form.create.metaFile.list.duplicate.button': 'Dupliquer',
  'generation-chain.form.create.input.label': 'Libellé (*)',
  'generation-chain.form.create.input.comment': 'Description',
  'generation-chain.form.create.input.active': 'Activer la chaîne de génération',
  'generation-chain.form.create.input.periodicity': 'Période d\'activation (secondes)',
  'generation-chain.form.create.input.dataset.select.hint': 'Filter sur les jeux existants ...',
  'generation-chain.form.create.input.dataset.select': 'Jeu de données (*)',
  'generation-chain.form.create.metaproduct.checksum.hint': 'Sélectionner un algorithme ...',
  'generation-chain.form.create.metaproduct.checksum.label': 'Algorithme de calcul de la somme de contrôle (checksum) de chaque fichier à acquérir (*)',
  'generation-chain.form.create.metaproduct.clean.label': 'Suppression des fichiers acquis',
  'generation-chain.form.create.metaproduct.ingest-chain.select': 'Chaîne de traitement (*)',
  'generation-chain.form.create.metaproduct.ingest-chain.hint': 'Sélectionner une chaîne de traitement ... ',
  'generation-chain.form.create.metaFile.mandatory': 'Le type de fichier est-il obligtoire pour l\'acquisition du produit ?',
  'generation-chain.form.create.metaFile.fileNamePattern': 'Pattern des fichiers (*)',
  'generation-chain.form.create.metaFile.scanDirectories': 'Liste des répertoires de recherche (*)',
  'generation-chain.form.create.metaFile.scanDirectory.list.item': 'Répertoire',
  'generation-chain.form.create.metaFile.scanDirectory': 'Répertoire de recherche',
  'generation-chain.form.create.metaFile.invalidFolder': 'Répertoire où déposer les fichiers en erreur (*)',
  'generation-chain.form.create.metaFile.mimeType.label': 'Type de fichiers (*)',
  'generation-chain.form.create.metaFile.mimeType.hint': 'Type de fichiers',
  'generation-chain.form.create.metaFile.comment': 'Description',
  'generation-chain.create.metaFile.delete.confirm.title': 'Voulez vous supprimer le type de fichier {index} ?',
  'generation-chain.form.plugins.select.label': 'Sélectionner un plugin ...',
  'generation-chain.form.plugins.scan.label': 'Détection des données (*)',
  'generation-chain.form.plugins.check.label': 'Vérification des données (*)',
  'generation-chain.form.plugins.gen-sip.label': 'Génération des métadonnées (*)',
  'generation-chain.form.plugins.post-processing.label': 'Post traitement (*)',
  'generation-chain.form.create.action.create': 'Créer',
  'generation-chain.form.edit.action.save': 'Mettre à jour',
  'generation-chain.form.create.action.cancel': 'Annuler',

}, Locales.fr)

export default messages
