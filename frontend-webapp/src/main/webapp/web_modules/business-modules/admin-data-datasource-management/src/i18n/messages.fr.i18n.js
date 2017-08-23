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
 * */
import { Locales } from '@regardsoss/form-utils'

const messages = Object.assign({
  'datasource.list.action.add': 'Ajouter',
  'datasource.list.action.cancel': 'Annuler',
  'datasource.list.title': 'Sources de données',
  'datasource.list.subtitle': 'Les datasources retournent les données que vous souhaitez apporter à vos jeux de données',
  'datasource.list.table.label': 'Label',
  'datasource.list.table.actions': 'Actions',
  'datasource.list.table.model': 'Modèle',
  'datasource.list.action.edit': 'Editer',
  'datasource.list.action.delete': 'Supprimer',
  'datasource.list.delete.title': 'Supprimer la source de données {name} ?',

  'datasource.form.create.title': 'Création d\'une source de données',
  'datasource.form.create.subtitle': 'Veuillez sélectionner la connexion à partir de laquelle vous souhaitez créer la source de données',
  'datasource.form.create.action.cancel': 'Annuler',
  'datasource.form.create.action.next': 'Suite',
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
}, Locales.fr)

export default messages

