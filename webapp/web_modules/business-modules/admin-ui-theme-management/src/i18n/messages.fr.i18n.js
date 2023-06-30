/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 * @author Léo Mieulet
 */
const messages = {
  'theme.list.delete.title': 'Supprimer le thème {name}',
  'theme.list.title': 'Liste des thèmes',
  'theme.list.subtitle': 'Liste des personnalisations des thèmes REGARDS',
  'theme.list.table.label': 'Nom du thème',
  'theme.list.table.actions': 'Actions',
  'theme.list.tooltip.edit': 'Éditer',
  'theme.list.tooltip.duplicate': 'Dupliquer',
  'theme.list.tooltip.delete': 'Supprimer',
  'theme.list.tooltip.visible': 'Visible pour les utilisateurs. Permet de cacher les thèmes en cours de conception',
  'theme.list.tooltip.invisible': 'Invisible pour les utilisateurs. Permet de cacher les thèmes en cours de conception',
  'theme.list.action.cancel': 'Annuler',
  'theme.list.action.add': 'Ajouter un thème',

  'theme.create.title': 'Créer un nouveau thème',
  'theme.edit.title': 'Éditer le thème {name}',
  'theme.duplicate.title': 'Dupliquer le thème {name}',
  'theme.form.baseTheme': 'Basé sur le thème Material UI',
  'theme.form.mui.light.theme': 'Thème clair',
  'theme.form.mui.dark.theme': 'Thème sombre',
  'theme.form.name': 'Nom du thème',
  'theme.form.name.not.unique.error': 'Il existe déjà un thème portant ce nom',
  'theme.form.active': 'Actif par défaut',
  'theme.form.visible': 'Visible pour les utilisateurs',
  'theme.form.action.submit': 'Sauvegarder',
  'theme.form.action.cancel': 'Annuler',
  ...Locales.fr,
}

export default messages
