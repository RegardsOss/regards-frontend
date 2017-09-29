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
  'service.list.title': 'Services IHM',
  'service.list.open.tooltip': 'Configurations',
  'service.list.create.tooltip': 'Créer',

  'service.listconf.title': 'Liste des configurations du service {value}',
  'service.listconf.subtitle': 'Vous pouvez definir plusieurs configurations différentes pour chaque service',
  'service.listconf.action.add': 'Ajouter',
  'service.listconf.action.back': 'Retour',
  'service.listconf.table.label': 'Nom de la configuration',
  'service.listconf.table.status': 'Etat',
  'service.listconf.table.default': 'Activé sur tous les jeux',
  'service.listconf.table.actions': 'Actions',
  'service.listconf.tooltip.edit': 'Editer',
  'service.listconf.tooltip.delete': 'Supprimer',
  'service.listconf.tooltip.duplicate': 'Dupliquer',

  'service.listconf.plugin.title': 'Information du plugin',
  'service.listconf.plugin.description': 'Description: {value}',
  'service.listconf.plugin.version': 'Version: {value}',
  'service.listconf.plugin.author': 'Auteur: {value}',
  'service.listconf.plugin.company': 'Editeur: {value}',
  'service.listconf.plugin.email': 'Contact e-mail: {value}',
  'service.listconf.plugin.license': 'License: {value}',
  'service.listconf.plugin.url': 'Url: {value}',
  'service.listconf.delete.confirm.title': 'Supprimer la configuration ?',

  'service.form.create.title': 'Création d\'une configuration de service',
  'service.form.edit.title': 'Edition de la configuration de service {name}',
  'service.form.duplicate.title': 'Duplication à partir de la configuration de service {name}',
  'service.form.subtitle': 'Les services ont deux types de variable en entrée: celle que vous fixez ici même dans ce formulaire (variables statiques) et les variables fixées par l\'utilisateur final (variables dynamiques). Pour les variables dynamiques, vous pouvez saisir la valeur par défaut',
  'service.form.label': 'Label de la configuration (uniquement pour les administrateurs)',
  'service.form.static.configuration.title': 'Paramètres de configuration',
  'service.form.dynamic.configuration.title': 'Paramètres d\'éxécution (valeurs pré-remplies pour l\'utilisateurs)',
  'service.form.mandatory.field': '{label} (*)',
  'service.form.isActive': 'Activer cette configuration',
  'service.form.linkedToAllEntities': 'Associer automatiquement ce service avec la configuration courante sur TOUS les jeux',
  'service.form.action.save': 'Sauvegarder',
  'service.form.action.back': 'Retour',
}, Locales.fr)

export default messages
