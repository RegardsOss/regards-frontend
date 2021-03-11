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
  'user.authentication.plugins.list.subtitle': 'Cette section permet de configurer les systèmes d\'authentification sur REGARDS. Par défaut, si aucun système n\'est défini, REGARDS gère sa propre base d\'utilisateurs et son propre système d\'authentification basé sur des jetons JWT. Toutefois, il est possible d\'externaliser la gestion des utilisateurs avec des IDP et/ou des SP.',
  'user.authentication.plugins.list.subtitle.idp': 'IDP (Identity provider) : ',
  'user.authentication.plugins.list.subtitle.idp.description': 'Système d\'authentification géré par REGARDS dont la base d\'utilisateurs est déportée sur une base externe. Ce fonctionnement permet de connecter une base LDAP par exemple.',
  'user.authentication.plugins.list.subtitle.service': 'SP (Service Provider) : ',
  'user.authentication.plugins.list.subtitle.service.description': 'Système d\'authentification complètement externalisé. Ce fonctionnement permet de se connecter aux travers de SSO externe comme github par exemple.',
  'user.authentication.plugins.list.idp.title': 'Identity Provider',
  'user.authentication.plugins.list.idp.subtitle': 'Permet de determiner une base d\'utilisateur externe de type LDAP',
  'user.authentication.plugins.list.service.title': 'Service Provider',
  'user.authentication.plugins.list.service.subtitle': 'Permet de déléguer l\'authentification à un système externe type SSO',
  'user.authentication.plugins.list.header.id.label': 'Identifiant',
  'user.authentication.plugins.list.header.name.label': 'Libellé',
  'user.authentication.plugins.list.header.name': 'Nom',
  'user.authentication.plugins.list.header.action.delete': 'Delete',
  'user.authentication.plugins.list.edit.button': 'Éditer la configuration',
  'user.authentication.plugins.list.duplicate.button': 'Dupliquer la configuration',
  'user.authentication.plugins.list.active.on.button': 'Activer ce système d\'authentification',
  'user.authentication.plugins.list.active.off.button': 'Désactiver ce système d\'authentification',
  'user.authentication.plugins.list.confirm.title': 'Suppression du système d\'authentification {name} ?',
  'user.authentication.plugins.list.back.button': 'Retour',
  'user.authentication.plugins.list.empty.title': 'Aucun système d\'authentification défini',
  'user.authentication.plugins.list.add.button': 'Ajouter un identity provider',
  'user.authentication.external.plugins.list.add.button': 'Ajouter un service provider',

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
