/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
  'crawler.list.title': 'Liste des aspirations de données en cours ou terminées',
  'crawler.list.back.button': 'Retour',
  'crawler.list.label.column.header': 'Libellé',
  'crawler.list.lastIngestDate.column.header': 'Date de l\'aspiration',
  'crawler.list.nextPlannedIngestDate.column.header': 'Prochaine aspiration',
  'crawler.list.savedObjectsCount.column.header': 'Entités aspirées',
  'crawler.list.status.column.header': 'Etat',
  'crawler.list.duration.column.header': 'Durée',
  'crawler.list.refresh.button': 'Rafraîchir',
  'crawler.list.show.stacktrace.tooltip': 'Afficher la stacktrace',
  'crawler.list.stacktrace.title': 'Stacktrace',
  'crawler.list.stacktrace.action.close': 'Fermer',
  'crawler.list.delete.action': 'Supprimer',
  'crawler.list.schedule.action': 'Programmer une ingestion',
  'crawler.list.scheduled': 'La date de prochaine ingestion a été mise à jour',
  'crawler.delete.confirm.title': 'Etes vous sûr de vouloir supprimer l\'indexation {crawler} ?',

  'datasource.list.action.add': 'Ajouter',
  'datasource.list.action.cancel': 'Annuler',
  'datasource.list.title': 'Configurer les aspirations de données.',
  'datasource.list.subtitle': 'Une aspiration de données doit être configurée afin de déterminer comment faire correspondre les informations des données aspirées avec les modèles de données définis dans REGARDS. Vous ne pouvez supprimer que les sources de données non associées à un jeu de données.',
  'datasource.list.table.label': 'Libellé',
  'datasource.list.table.associatedDatasets': 'Jeux associés',
  'datasource.list.table.actions': 'Actions',
  'datasource.list.action.edit': 'Editer',
  'datasource.list.action.delete': 'Supprimer',
  'datasource.list.delete.title': 'Supprimer la source de données {name} ?',
  'datasource.list.empty.title': 'Aucune source de données n\'existe',
  'datasource.list.table.active': 'Activer/désactiver',
  'datasource.list.action.desactivate': 'Désactiver la source de données',
  'datasource.list.action.activate': 'Activer la source de données',

  'datasource.form.create.title': 'Création d\'une source de données',
  'datasource.form.create.subtitle': 'Veuillez sélectionner la connexion à partir de laquelle vous souhaitez créer la source de données',
  'datasource.form.create.action.cancel': 'Annuler',
  'datasource.form.create.action.next': 'Suivant',
  'datasource.form.create.action.connection': 'Créer une connexion',
  'datasource.form.create.datasource': 'Liste des connexions actives',

  'datasource.form.action.next': 'Suivant',
  'datasource.form.action.cancel': 'Annuler',
  'datasource.form.model': 'Modèle de données',
  'datasource.form.refreshRate': 'Durée entre deux rafraîchissement (en seconde)',
  'datasource.form.connection': 'Connexion choisie',
  'datasource.form.label': 'Libellé',
  'datasource.form.pluginConfiguration': 'Type de plugin',
  'datasource.form.table.input': 'Valeur de l\'attribut',
  'datasource.form.subtitle': 'Gestion des attributs d\'une source de données',
  'datasource.form.tags': 'Liste des tags ajoutés à toutes les données aspirées',
  'datasource.form.subsettingTags': 'Aspirer uniquement les données contenant l\'un de ces tags (vide = toutes les données sont aspirées)',
  'datasource.form.attributeFileSize': 'Permet de définir dans le modèle quel est l\'atttribut à utiliser pour récuperer la taille des fichiers RAWDATA',

  'datasource.edit.title': 'Edition de la source de données {name}',
  'datasource.create.title': 'Création d\'une source de données',

  'datasource.stepper.attributes': 'Saisie des attributs d\'une source de données',
  'datasource.stepper.connection': 'Choix de la connexion',
  'datasource.stepper.mapping': 'Mapping des données',

  'datasource.form.mapping.title': 'Mise en place de la liaison entre la connexion et le modèle d\'object',
  'datasource.form.mapping.subtitle': 'Associez chaque attribut de votre modèle à un attribut provenant de la connexion. L\'attribut sipId doit être lié à une clé primaire de votre base de données',
  'datasource.form.mapping.emptyDatabase.title': 'Votre base de données est vide',
  'datasource.form.mapping.emptyDatabase.message': 'Associez des attributs du modèle à une datasource qui a au moins 1 table',

  'datasource.form.mapping.table.fragment': 'Fragment',
  'datasource.form.mapping.table.attrName': 'Nom de l\'attribut',
  'datasource.form.mapping.table.attribute': 'Attribut du modèle',
  'datasource.form.mapping.table.attributeStatic': 'Attribut commun',
  'datasource.form.mapping.table.type': 'Type de l\'attribut',
  'datasource.form.mapping.table.dbValue': 'Valeur de l\'attribut',
  'datasource.form.mapping.connectionViewer.title': 'Explorateur de connexion',
  'datasource.form.mapping.connectionViewerFromTable.subtitle': 'Selectionnez la table qui contient les attributs du modèle',
  'datasource.form.mapping.connectionViewerCustom.subtitle': 'Selectionnez une table pour afficher ses attributs',
  'datasource.form.mapping.table.optional.true': 'Optionnel',
  'datasource.form.mapping.table.optional.false': 'Obligatoire',
  'datasource.form.mapping.action.save': 'Sauvegarder',
  'datasource.form.mapping.action.cancel': 'Précédent',

  'datasource.form.mapping.fromTable.title': 'Liaison entre attributs du modèle et la table de la connexion',
  'datasource.form.mapping.fromTable.subtitle': 'Précisez comment la valeur est retrouvée pour chaque attribut du modèle',
  'datasource.form.mapping.fromTable.tableName': 'Nom de la table',
  'datasource.form.mapping.table.input': 'Clause du select (SQL)',
  'datasource.form.mapping.table.select': 'Selectionner l\'attribut de la table',
  'datasource.form.mapping.table.showAdvancedConfiguration': 'Utiliser du SQL',
  'datasource.form.mapping.table.isPK': 'Clé primaire de la table',

  'datasource.form.mapping.custom.title': 'Liaison entre attributs du modèle et la connexion',
  'datasource.form.mapping.custom.subtitle': 'Dans un premier temps, écrivez une clause FROM, WHERE pour récupérer les données en fonction des tables disponibles dans la connexion. Ensuite, présicez la clause SELECT en SQL pour récupérer la valeur de l\'attribut du modèle',
  'datasource.form.mapping.custom.fromClause': 'Clause FROM, WHERE, [GROUP BY et HAVING]',

  'invalid.one_pk_required': 'Choisissez un champ comme clé primaire',
  'invalid.only_one_pk_allowed': 'Utilisez une seule clé primaire',


  'datasource.form.create.pick-interface.title': 'Choisir le mode d\'aspiration',
  'datasource.form.create.pick-interface.subtitle': 'Veuillez sélectionner le type d\'aspiration que vous souhaitez créer, selon où ils sont stockés.',
  'datasource.form.create.pick-interface.description.aip': 'Ce mode permet d\'aspirer des AIPs au format GeoJSON',
  'datasource.form.create.pick-interface.action.aip': 'Aspirer des AIPs',
  'datasource.form.create.pick-interface.description.db': 'Ce mode permet d\'aspirer une source de données externe',
  'datasource.form.create.pick-interface.action.db': 'Aspirer une source de données',
  'datasource.form.create.pick-interface.action.cancel': 'Annuler',
  'aip.datasource.create.title': 'Creation d\'une source de données de AIPs',
  'aip.datasource.form.subtitle': 'Cet écran vous permet de configurer la facon dont les AIPs stockés par le microservice de stockage vont être indexés dans le catalogue. Pour ce faire, vous devez indiquer où dans l\'AIP trouver les informations du modèle de données à indéxer',
  'aip.datasource.edit.title': 'Edition de la source de données {name}',
  'aip.datasource.form.table.fragmentAndLabel': 'Attribut du modèle',
  'aip.datasource.form.table.type': 'Type',
  'aip.datasource.form.table.value': 'Chemin dans l\'AIP',
  'aip.datasource.form.table.staticAttributes': 'Attributs statiques',
  'aip.datasource.form.table.input': 'Valeur',
  'aip.datasource.form.table.lowerBound': 'Borne inférieure',
  'aip.datasource.form.table.upperBound': 'Borne supérieure',
}, Locales.fr)

export default messages
