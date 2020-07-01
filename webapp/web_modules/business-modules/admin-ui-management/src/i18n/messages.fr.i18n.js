/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 * i18n messages French language
 * @author Sébastien binda
 */
const messages = {
  'ui.settings.title': 'Paramètres IHM',
  'ui.settings.description': 'Configuration des paramètres principaux de l\'IHM utilisateur',
  'ui.settings.edit.tooltip': 'Editer les paramètres IHM',

  'portal.layout.title': 'Agencement du portail',
  'project.layout.title': 'Agencement',
  'project.layout.description': 'L\'agencement permet de définir les sections dans lesquelles vous pouvez positionner les modules',
  'project.layout.tooltip': 'Agencement',

  'portal.module.title': 'Modules du portail',
  'project.module.title': 'Modules',
  'project.module.description': 'Configuration des modules de l\'interface utilisateur.',

  'project.service.title': 'Services',
  'project.service.description': 'Les services IHM (plugins de type service) sont des fonctionnalités additionnelles sur les entités de votre catalogue de données. ',

  'project.plugin.title': 'Plugins',
  'project.plugin.description': 'Les plugins utilisés sur l\'interface projet. Il existe deux types de plugin: les plugins critères, qui sont des champs de formulaire, et les plugins services, pour apporter des fonctionnalités supplémentaires sur les données du catalogue',

  'portal.theme.title': 'Thèmes du portail',
  'project.theme.title': 'Thèmes',
  'project.theme.description': 'Personnaliser l\'apparence de REGARDS',

  'action.list.tooltip': 'Liste',
  'action.add.tooltip': 'Ajouter',

  'action.service.list.tooltip': 'Services IHM',
  ...Locales.fr,
}

export default messages
