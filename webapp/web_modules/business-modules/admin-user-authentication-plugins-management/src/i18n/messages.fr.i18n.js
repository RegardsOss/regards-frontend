/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

/**
 * @author Sébastien Binda
 */
const messages = {
  'user.authentication.plugins.list.title': 'Configuration des systèmes d\'authentification',
  'user.authentication.plugins.list.subtitle': 'Cette section vous permet de configurer les méthodes d\'authentification au système REGARDS pour le projet courant. Par défaut, le système d\'authentification est un système interne utilisant les informations de connexion fournies par les utilisateurs lors de la création de leur compte.',
  'user.authentication.plugins.list.header.id.label': 'Identifiant',
  'user.authentication.plugins.list.header.name.label': 'Libellé',
  'user.authentication.plugins.list.header.name': 'Nom',
  'user.authentication.plugins.list.header.pluginId': 'PluginId',
  'user.authentication.plugins.list.header.action.delete': 'Delete',
  'user.authentication.plugins.list.header.type.label': 'Type d\'authentification',
  'user.authentication.plugins.list.header.active.label': 'Activer',
  'user.authentication.plugins.list.edit.button': 'Éditer la configuration',
  'user.authentication.plugins.list.duplicate.button': 'Dupliquer la configuration',
  'user.authentication.plugins.list.active.on.button': 'Activer ce système d\'authentification',
  'user.authentication.plugins.list.active.off.button': 'Désactiver ce système d\'authentification',
  'user.authentication.plugins.list.confirm.title': 'Suppression du système d\'authentification {name} ?',
  'user.authentication.plugins.list.back.button': 'Retour',
  'user.authentication.plugins.list.empty.title': 'Aucun système d\'authentification défini',
  'user.authentication.plugins.list.add.button': 'Ajouter un système d\'authentification',
  'user.authentication.external.plugins.list.add.button': 'Ajouter un système d\'authentification externe',

  'user.authentication.external.plugins.form.create.invalid.id': 'ID Invalide',
  'user.authentication.external.plugins.form.create.field.name': 'Nom',
  'user.authentication.external.plugins.form.create.field.url': 'URL',
  'user.authentication.external.plugins.form.create.field.pluginConfiguration': 'Plugin',
  'user.authentication.external.plugins.form.submit.edit.button': 'Modifier',
  'user.authentication.external.plugins.form.submit.create.button': 'Créer',
  'user.authentication.external.plugins.form.submit.create.title': 'Ajouter un nouveau fournisseur de service',
  'user.authentication.external.plugins.form.submit.edit.title': 'Editer le fournisseur de service {name}',
  'user.authentication.external.plugins.form.subtitle': 'Vous pouvez configurer votre fournisseur de service',
  'user.authentication.external.plugins.form.back.button': 'Retour',
  'user.authentication.plugins.form.create.title': 'Ajout d\'un nouveau système d\'authentification',
  'user.authentication.plugins.form.edit.title': 'Édition du système d\'authentification "{name}"',
  'user.authentication.plugins.form.create.subtitle': 'Après avoir sélectionné le type de système d\'authentification, veuillez renseigner les paramètres de configuration associés.',
  'user.authentication.plugins.form.edit.subtitle': 'Veuillez renseigner les paramètres de configuration associés.',
  'user.authentication.plugins.form.type.select.title': 'Type de système d\'authentification',
  'user.authentication.plugins.form.type.select.label': 'Sélectionnez un type ...',
  'user.authentication.plugins.form.invalid.id': 'La configuration sélectionnée n\'existe plus',
  'user.authentication.plugins.form.back.button': 'Annuler',

  'user.authentication.plugins.list.confirm.delete.title': 'Supprimer le système d\'authentification sélectionné?',
  ...Locales.fr,
}

export default messages
