/**
 * LICENSE_PLACEHOLDER
 **/
import { Locales } from '@regardsoss/form-utils'

/**
 * i18n messages French language
 * @type {*}
 */
const messages = Object.assign({
  'admin.app.title': 'Interface d\'administration',
  'admin.app.description': 'Configuration de l\'interface d\'administration',
  'admin.app.modules.tooltip': 'Configuration des mdoules',
  'admin.app.layout.tooltip': 'Configuration de l\'agencement',
  'admin.app.themes.tooltip': 'Gestion des thèmes',
  'project.app.title': 'Interface utilisateur projet',
  'project.app.description': 'Configuration de l\'interface projet',
  'project.app.modules.tooltip': 'Configuration des modules',
  'project.app.layout.tooltip': 'Configuration de l\'agencement',
  'project.app.themes.tooltip': 'Gestion des thèmes',
  'portal.app.title': 'Portail d\'accès',
  'portal.app.description': 'Configuration de l\'interface portail',
  'portal.app.modules.tooltip': 'Configuration des modules',
  'portal.app.layout.tooltip': 'Configuration de l\'agencement',
  'portal.app.themes.tooltip': 'Gestion des thèmes',
  'modules.list.title': 'Configuration des modules de l\'interface',
  'modules.list.subtitle': 'Ci dessous vous pouvez configurer les modules de l\'interface. Une fois configurés, vous pouvez les utiliser pour définir l\'agencement globale de l\'interface',
  'modules.list.table.name': 'Nom du module',
  'modules.list.table.description': 'Description',
  'modules.list.action.add': 'Ajouter un nouveau module',
  'modules.list.delete.message': 'Confirmer la suppression du module {name} ?',
  'modules.list.table.active': 'Etat',
  'modules.list.table.actions': 'Actions',
  'layout.title': 'Configuration de l\'arrangement de l\'interface',
  'layout.subtitle': 'Cette page vous permet de configurer l\'agencement des conteneurs de modules de votre interface. Chaque conteneur déclaré ici peut ensuite être utilisé pour positionner les modules',
  'layout.submit': 'Mettre à jour',
  'module.form.title.create': 'Creation d\'un nouveau module',
  'module.form.title.update': 'Mise à jour du module {name}',
  'module.form.name': 'Nom du module',
  'module.form.description': 'Description',
  'module.form.container': 'Conteneur du layout',
  'module.form.active': 'Activation du module',
  'module.form.special.parameters.title': 'Paramètres du module {name}',
  'module.form.submit.button': 'Creer module',
  'module.form.update.button': 'Mettre à jour',
  'module.form.cancel.button': 'Annuler',
  'invalid.json': 'Format json invalid',
}, Locales.fr)

export default messages
