/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
  'admin.app.title': 'Interface d\'administration',
  'admin.app.description': 'Configuration de l\'interface d\'administration',
  'admin.app.modules.tooltip': 'Configuration des modules',
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
  'modules.list.title': 'Modules d\'interface',
  'modules.list.subtitle': 'Pour définir l\'agencement global de l\'interface, configurez les modules de l\'interface',
  'modules.list.table.name': 'Type de module',
  'modules.list.table.description': 'Nom du module',
  'modules.list.table.action.edit.tooltip': 'Éditer',
  'modules.list.table.action.duplicate.tooltip': 'Dupliquer',
  'modules.list.table.action.delete.tooltip': 'Supprimer',
  'modules.list.action.add': 'Ajouter un module',
  'modules.list.delete.message': 'Supprimer le module {name} ?',
  'modules.list.table.active': 'Actif',
  'modules.list.table.actions': 'Actions',
  'layout.title': 'Configuration de l\'agencement de l\'interface',
  'layout.subtitle': 'Pour positionner vos modules, configurez l\'agencement des conteneurs',
  'layout.submit': 'Mettre à jour',
  'layout.cancel': 'Annuler',
  'module.form.title.create': 'Création d\'un module',
  'module.form.title.update': 'Mise à jour du module',
  'module.form.title.duplicate': 'Duplication du module',
  'module.form.name': 'Type de module',
  'module.form.description': 'Description',
  'module.form.container': 'Emplacement du module',
  'module.form.active': 'Activation du module',
  'module.form.page.settings.title': 'Configuration de la page',
  'module.form.page.home': 'Définir comme page d\'accueil du site',
  'module.form.page.custom.icon.url': 'URL de l\'icône personnalisée',
  'module.form.page.title.en': 'Titre de la page en anglais',
  'module.form.page.title.fr': 'Titre de la page en français',
  'module.form.page.icon.field': 'Icône de la page',
  'module.form.page.icon.none': 'Aucune icône',
  'module.form.page.icon.default': 'Icône par défaut du module',
  'module.form.page.icon.custom': 'Icône personnalisée',
  'module.form.module.settings.title': 'Configuration du module',
  'module.form.module.no.setting.message': 'Pas de configuration spécifique au module',
  'module.form.submit.button': 'Créer module',
  'module.form.update.button': 'Mettre à jour',
  'module.form.cancel.button': 'Annuler',
  'module.no.container.available.title': 'Prérequis pour la configuration des modules',
  'module.no.container.available': 'Aucun conteneur de module n\'est encore défini. Veuillez configurer l\'agencement de l\'interface avant d\'ajouter des modules',
  'module.no.container.available.configure.layout': 'Configurer l\'agencement de l\'interface',
  'invalid.json': 'Format json invalide',
  'application.theme.title': 'Configuration du thème',

  'application.theme.create.tooltip': 'Nouveau',
  'application.theme.create.form.title': 'Ajouter un thème',
  'application.theme.create.form.name': 'Nom',
  'application.theme.create.form.active': 'Thème par défaut',
  'application.theme.create.form.cancel': 'Annuler',
  'application.theme.create.form.submit': 'Ajouter',
  'application.theme.create.success': 'Le thème a été ajouté',
  'application.theme.create.error': 'Le thème n\'a pas pu être ajouté',

  'application.theme.default.active': 'Activer le thème par défaut',
  'application.theme.default.create.message': 'Aucun thème défini. Vous pouvez créer un thème en cliquant sur "Nouveau"',

  'application.theme.save': 'Sauvegarder',
  'application.theme.save.success': 'Le thème a été mis à jour',
  'application.theme.save.error': 'Le thème n\'a pas pu être mis à jour',

  'application.theme.remove.tooltip': 'Supprimer',
  'application.theme.remove.confirm': 'Supprimer le thème ?',
  'application.theme.remove.confirm.cancel': 'Annuler',
  'application.theme.remove.confirm.remove': 'Supprimer',
  'application.theme.remove.success': 'Le thème a été supprimé',
  'application.theme.remove.error': 'Le thème n\'a pas pu être supprimé',
  ...Locales.fr,
}

export default messages
