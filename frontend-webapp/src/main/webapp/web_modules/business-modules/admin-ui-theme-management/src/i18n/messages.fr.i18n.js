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
 *
 * @author Xavier-Alexandre Brochard
 * @author Sébastien Binda
 */
const messages = Object.assign({
  'application.theme.title': 'Configuration du thème',

  'application.theme.create.tooltip': 'Nouveau',
  'application.theme.create.form.title': 'Ajouter un thème',
  'application.theme.create.form.name': 'Nom',
  'application.theme.create.form.active': 'Thème par défaut',
  'application.theme.create.form.cancel': 'Annuler',
  'application.theme.create.form.submit': 'Ajouter',
  'application.theme.create.success': 'Le thème a été ajouté',
  'application.theme.create.error': 'Le thème n\'a pas pu être ajouté',

  'application.theme.default.active': 'Thème par défaut',

  'application.theme.save': 'Sauvegarder',
  'application.theme.save.success': 'Le thème a été mis à jour',
  'application.theme.save.error': 'Le thème n\'a pas pu être mis à jour',

  'application.theme.default.create.message': 'Aucun thème. Cliquez sur "Nouveau" pour ajouter un thème et commencer sa configuration.',

  'application.theme.remove.tooltip': 'Supprimer',
  'application.theme.remove.confirm': 'Supprimer le thème ?',
  'application.theme.remove.confirm.cancel': 'Annuler',
  'application.theme.remove.confirm.remove': 'Supprimer',
  'application.theme.remove.success': 'Le thème a été supprimé',
  'application.theme.remove.error': 'Le thème n\'a pas pu être supprimé',

}, Locales.fr)

export default messages
