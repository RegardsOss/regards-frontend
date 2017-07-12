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
 */
import { Locales } from '@regardsoss/form-utils'
/**
 * Module french messages
 * @type {{[modules.list.menu.label]: string, [section.search-form]: string}}
 * @author Sébastien Binda
 */
const messages = Object.assign({
  'container.form.id': 'Nom',
  'container.form.type': 'Type',
  'container.form.classes': 'Classes CSS',
  'container.form.styles': 'Styles HTML',
  'container.form.dynamicContent': 'Ce module contient-il les modules dynamiques ?',
  'container.form.update.button': 'Mise à jour',
  'container.form.submit.button': 'Créer',
  'container.form.cancel.button': 'Annuler',
  'container.form.advanced.mode': 'Afficher/Cacher les options avancées',
  'container.configuration.delete.section': 'Supprimer',
  'container.configuration.add.subsection': 'Ajouter une sous-section',
  'container.configuration.edit.section': 'Editer',
  'container.configuration.edit.dialog.title': 'Editer le conteneur',
}, Locales.fr)

export default messages
