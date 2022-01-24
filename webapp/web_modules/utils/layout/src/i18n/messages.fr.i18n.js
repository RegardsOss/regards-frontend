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
 */
import { Locales } from '@regardsoss/form-utils'
/**
 * Module french messages
 * @author Sébastien Binda
 */
const messages = {
  'container.form.id': 'Nom',
  'container.form.type': 'Type',
  'container.form.classes': 'Classes CSS',
  'container.form.styles': 'Styles "inline" du conteneur (JSON)',
  'container.form.dynamicContent': 'Conteneur principal',
  'container.form.dynamicContent.info': 'Le menu de l\'application sera composé des modules de ce conteneur',
  'container.form.dynamicContent.modal.title': 'En faire le conteneur principal ?',
  'container.form.dynamicContent.modal.content': 'Le menu de l\'application sera composé des modules de ce conteneur. Si vous aviez un autre conteneur principal, il sera converti en conteneur statique',
  'container.form.dynamicContent.modal.cancel': 'Annuler',
  'container.form.dynamicContent.modal.ok': 'OK',
  'container.form.update.button': 'Mise à jour',
  'container.form.submit.button': 'Créer',
  'container.form.cancel.button': 'Annuler',
  'container.form.advanced.mode.hide': 'Cacher les options avancées',
  'container.form.advanced.mode.show': 'Afficher les options avancées',
  'container.configuration.delete.section': 'Supprimer',
  'container.configuration.add.subsection': 'Ajouter une sous-section',
  'container.configuration.edit.section': 'Éditer',
  'container.configuration.edit.dialog.title': 'Éditer le conteneur',

  'container.type.row.container': 'Ligne',
  'container.type.content.row.container': 'Ligne expansive',
  'container.type.content.column.100.percent.container': 'Colonne de largeur 100%',
  'container.type.content.column.75.percent.container': 'Colonne de largeur 75%',
  'container.type.content.column.50.percent.container': 'Colonne de largeur 50%',
  'container.type.content.column.25.percent.container': 'Colonne de largeur 25%',
  'container.configuration.edit.styles.error.json.format': ' - Format JSON invalide',
  ...Locales.fr,
}

export default messages
