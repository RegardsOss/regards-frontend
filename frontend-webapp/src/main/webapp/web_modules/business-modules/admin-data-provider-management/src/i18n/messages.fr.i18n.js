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
  'generation-chain.list.title': 'Configuration des chaînes de génération',
  'generation-chain.list.subtitle': 'Les chaînes de générations correspondent à l\'enchaînement de traitements réalisés sur les nouvelles données détectée avant leur ajout dans le catalogue de données.',
  'generation-chain.list.info.message': 'Vous pouvez définir pour chaque étape de la chaîne un traitement un fonctionnement spécifique grâce aux plugins suivants.',
  'generation-chain.list.empty.title': 'Aucune chaîne définie',
  // 1.2 table headers
  'generation-chain.list.table.label': 'Nom',
  'generation-chain.list.table.mode': 'Mode de déclanchement',
  // 1.3 actions
  'generation-chain.list.addnew.button': 'Ajouter',
  'generation-chain.list.back.button': 'Retour',
  'generation-chain.list.edit.tooltip': 'Editer',
  'generation-chain.list.duplicate.tooltip': 'Dupliquer',
  'generation-chain.list.delete.confirm.title': 'Etes-vous sûr de vouloir suppriler la chaîne de traitement : {label}',

  // 2 Chain creation/edition form
  // 2.1 Header section
  'generation-chain.form.create.title': 'Créer une nouvelle chaîne de génération',
  'generation-chain.form.edit.title': 'Edition de la chaine : {name}',
  'generation-chain.form.informations-1': 'Une chaîne de génération doit pour fonctionner être associée aux éléments ci-dessous. Remarque : Les champs marqués (*) correspondent aux champs obligatoires.',
  'generation-chain.form.informations-2': '1. Un jeu de données. Toutes les données acquises grâce à cette chaîne seront alors associées à ce jeu de données. (*)',
  'generation-chain.form.informations-3': '2. Une chaîne de traitement. (*)',
  'generation-chain.form.informations-4': '3. Un ou plusieurs types de fichiers. Un type de fichier permet de configurer où et comment trouver les fichiers à acquérir. (*)',
  'generation-chain.form.informations-5': '4. Un plugin de validation des données. (*)',
  'generation-chain.form.informations-6': '5. Un plugin de génération des produits associés aux fichiers détectés. (*)',
  'generation-chain.form.informations-7': '6. Un plugin de génération des méta données à partir des fichiers détectés.',
  'generation-chain.form.informations-8': '7. Un plugin de post-traitement.',
  // 2.2 General configuration section
  'generation-chain.form.general.section.title': 'Général',
  'generation-chain.form.general.section.label': 'Libellé (*)',
  'generation-chain.form.general.section.active': 'Activer la chaîne de génération',
  'generation-chain.form.general.section.periodicity': 'Période d\'activation (secondes)',
  'generation-chain.form.general.section.dataset.select.hint': 'Filter sur les jeux existants ...',
  'generation-chain.form.general.section.dataset.select': 'Jeu de données (*)',
  'generation-chain.form.general.section.session': 'Nom de session d\'ingestion',
  'generation-chain.form.general.section.mode': 'Mode',
  'generation-chain.form.general.section.ingestChain.select': 'Chaîne de traitement (*)',
  'generation-chain.form.general.section.ingestChain.select.hint': 'Sélectionner une chaîne de traitement ... ',
  // 2.3 Files configuration section
  'generation-chain.form.fileInfos.section': 'Fichiers',
  'generation-chain.form.fileInfos.list.item.title': 'Fichier',
  'generation-chain.form.fileInfos.options.title': 'Actions',
  'generation-chain.form.fileInfos.list.add.button': 'Ajouter',
  'generation-chain.form.fileInfos.list.delete.button': 'Supprimer',
  'generation-chain.form.fileInfos.list.duplicate.button': 'Dupliquer',
  'generation-chain.form.fileInfo.comment': 'Description',
  'generation-chain.form.fileInfo.plugin.scan.label': 'Méthode de détection des données (*)',
  'generation-chain.form.fileInfo.mandatory': 'Le fichier est-il obligatoire à la construction du produit ?',
  'generation-chain.form.fileInfo.mimeType': 'Mime-type',
  'generation-chain.form.fileInfo.dataType': 'Type de donnée à générer',
  // 2.4 Plugins configuration section
  'generation-chain.form.plugins.section': 'Plugins',
  'generation-chain.form.plugins.select.label': 'Sélectionner un plugin ...',
  'generation-chain.form.plugins.validation.label': 'Méthode de validation des données (*)',
  'generation-chain.form.plugins.product.label': 'Construction du produit (*)',
  'generation-chain.form.plugins.gen-sip.label': 'Génération des métadonnées (*)',
  'generation-chain.form.plugins.post-processing.label': 'Post traitement',

  // 2.5 Actions
  'generation-chain.form.create.button': 'Créer',
  'generation-chain.form.update.button': 'Mettre à jour',
  'generation-chain.form.cancel.button': 'Annuler',

  // 3. Monitoring
  // 3.1 Chain list
  // 3.1.1 Header
  'generation-chain.monitor.list.title': 'Suivit des chaînes de génération de données.',
  'generation-chain.monitor.list.subtitle': 'Cette écran vous permet de suivre l\'avancement des chaînes de génération de données, de consulter les erreurs de génération et d\'activer les chaînes à déclamenent manuel',
  'generation-chain.monitor.empty.title': 'Aucune chaine configurée',

  // 3.1.2 Table header
  'generation-chain.monitor.list.label': 'Libellé',
  'generation-chain.monitor.list.running': 'Etat',
  'generation-chain.monitor.list.activity.not.running': 'Arrêtée',
  'generation-chain.monitor.list.total-nb-products': 'Produits',
  'generation-chain.monitor.list.total-products.tooltip': 'Produits',
  'generation-chain.monitor.list.error-nb-products.tooltip': 'Produits en erreur',
  'generation-chain.monitor.list.inprogress-nb-products.tooltip': 'Produits en cours',
  'generation-chain.monitor.list.total-nb-files': 'Fichiers',
  'generation-chain.monitor.list.total-files.tooltip': 'Total des Fichiers générés par la chaîne',
  'generation-chain.monitor.list.error-nb-files.tooltip': 'Fichiers en erreur',
  'generation-chain.monitor.list.inprogress-nb-files.tooltip': 'Fichiers en cours',

  // 3.1.2.3 Table actions
  'generation-chain.monitor.list.run.tooltip': 'Lancer la chaîne',
  'generation-chain.monitor.list.run.error': 'Erreur durant le lancement de la chaîne de traitement',

}, Locales.fr)

export default messages
