/**
 * LICENSE_PLACEHOLDER
 **/
import { Locales } from '@regardsoss/form-utils'

/**
 * i18n messages French language
 * @author Sébastien binda
 */
const messages = Object.assign({

  'portal.layout.title': 'Agencement du portail',
  'project.layout.title': 'Agencement',
  'project.layout.description': 'Configuration de l\'agencement de l\'interface utilisateur. L\'agencement permet de définir les sections dans lesquelles vous pouvez positioner les modules',
  'project.layout.tooltip': 'Agencement',

  'portal.module.title': 'Modules du portail',
  'project.module.title': 'Modules',
  'project.module.description': 'Configuration des modules de l\'interface utilisateur.',

  'project.service.title': 'Services',
  'project.service.description': 'Configuration des services IHM (Plugins de type service). Les services IHM sont des fonctionnalités additionelles sur les entités de votre catalogue de données. ',

  'project.plugin.title': 'Plugins',
  'project.plugin.description': 'Référence les plugins utilisés sur l\'interface projet. Il existe deux types de plugin: les plugins critères, qui sont des champs de formulaire, et les plugins services, pour apporter des fonctionnalités supplémentaires sur les données du catalogue',

  'portal.theme.title': 'Theme du portail',
  'project.theme.title': 'Configuration des themes',
  'project.theme.description': 'Configuration des themes de l\'interface',
  'project.theme.tooltip': 'Editer les themes',

  'action.list.tooltip': 'Liste',
  'action.add.tooltip': 'Ajouter',
}, Locales.fr)

export default messages
