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

/**
 * i18n messages French language
 * @author Sébastien Binda
 */
const messages = Object.assign({
  'plugin.form.title.create': 'Ajouter un plugin',
  'plugin.form.title.update': 'Mise à jour du plugin {name}',
  'plugin.form.subtitle': 'Entrez le chemin d\'accès vers votre plugin et lancez la recherche pour le valider avant ajout',
  'plugin.form.name': 'Nom',
  'plugin.form.type': 'Type',
  'plugin.form.sourcesPath': 'Chemin d\'accès au fichier javascript du plugin',
  'plugin.form.icon': 'Icône de représentation du plugin (Lien https)',
  'plugin.form.submit.button': 'Ajouter',
  'plugin.form.update.button': 'Mettre à jour',
  'plugin.form.cancel.button': 'Annuler',
  'plugin.form.submit.error.invalid.plugin': ' Le plugin ne correspond pas à un plugin valide',
  'plugin.form.submit.error': 'Erreur durant la sauvegarde du plugin',
  'plugin.form.delete': 'Supprimer',
  'plugin.form.edit': 'Editer',
  'plugins.list.delete.message': 'Supprimer le plugin {name} ?',
  'plugins.list.title': 'Plugins',
  'plugins.list.subtitle': 'Définissez des critères de recherche ou des services avec ces plugins',
  'plugins.list.table.name': 'Nom',
  'plugins.list.table.actions': 'Actions',
  'plugins.list.action.add': 'Ajouter un plugin',
  'plugins.list.action.cancel': 'Retour',
  'plugin.description.url': 'Visualiser la description du plugin',
}, Locales.fr)

export default messages
