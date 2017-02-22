/**
 * LICENSE_PLACEHOLDER
 **/
import { Locales } from '@regardsoss/form-utils'

/**
 * i18n messages French language
 * @author Sébastien binda
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
  'layout.title': 'Configuration de l\'agencement de l\'interface',
  'layout.subtitle': 'Cette page vous permet de configurer l\'agencement des conteneurs de modules de votre interface. Chaque conteneur déclaré ici peut ensuite être utilisé pour positionner les modules',
  'layout.submit': 'Mettre à jour',
  'layout.cancel': 'Annuler',
  'module.form.title.create': 'Creation d\'un nouveau module',
  'module.form.title.update': 'Mise à jour du module {name}',
  'module.form.title.duplicate': 'Duplication du module {name}',
  'module.form.name': 'Nom du module',
  'module.form.description': 'Description',
  'module.form.container': 'Conteneur du layout',
  'module.form.active': 'Activation du module',
  'module.form.isDefault': 'Utiliser comme module par defaut ?',
  'module.form.submit.button': 'Creer module',
  'module.form.update.button': 'Mettre à jour',
  'module.form.cancel.button': 'Annuler',
  'invalid.json': 'Format json invalid',
  'application.theme.title': 'Configuration du thème',
  'application.theme.save': 'Sauvegarder',
  'application.theme.save.success': 'Le thème a été mis à jour',
  'application.theme.save.error': 'Le thème n\'a pas pu être mis à jour',
  'application.theme.add': 'Nouveau thème',
  'application.theme.remove.tooltip': 'Supprimer',
  'application.theme.remove.confirm': 'Supprimer le thème?',
  'application.theme.remove.confirm.cancel': 'Annuler',
  'application.theme.remove.confirm.remove': 'Supprimer',
  'application.theme.remove.success': 'Le thème a été supprimé',
  'application.theme.remove.error': 'Le thème n\'a pas pu être supprimé',

}, Locales.fr)

export default messages
