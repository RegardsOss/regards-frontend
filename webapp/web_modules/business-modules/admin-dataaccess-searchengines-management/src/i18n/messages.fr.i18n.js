/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 * @author Sébastien Binda
 */
const messages = Object.assign({
  'dataaccess.searchengines.list.title': 'Configuration des moteurs de recherche',
  'dataaccess.searchengines.list.subtitle': 'Cette section vous permet de configurer les différents moteurs de recherche du catalogue de données. Chaque moteur de recherche peut être associé à l\'enssemble du catalogue ou bien à un jeu de données précis.',
  'dataaccess.searchengines.list.header.id.label': 'Identifiant',
  'dataaccess.searchengines.list.header.name.label': 'Libellé',
  'dataaccess.searchengines.list.header.type.label': 'Moteur de recherche',
  'dataaccess.searchengines.list.edit.button': 'Editer la configuration',
  'dataaccess.searchengines.list.confirm.title': 'Suppression de la configuration {name} ?',
  'dataaccess.searchengines.list.back.button': 'Retour',
  'dataaccess.searchengines.list.empty.title': 'Aucun moteur de recherche configuré',
  'dataaccess.searchengines.list.add.button': 'Configurer un nouveau moteur de recherche',

  'dataaccess.searchengines.form.create.title': 'Configurer un nouveau moteur de recherche',
  'dataaccess.searchengines.form.edit.title': 'Edition du moteur de recherche "{name}"',
  'dataaccess.searchengines.form.create.subtitle': 'Après avoir sélectionné le moteur de recherche, veuillez renseigner les paramètres de configuration associés.',
  'dataaccess.searchengines.form.edit.subtitle': 'Veuillez renseigner les paramètres de configuration associés.',
  'dataaccess.searchengines.form.type.select.title': 'Moteur de recherche',
  'dataaccess.searchengines.form.type.select.label': 'Sélectionnez un moteur de recherche ...',
  'dataaccess.searchengines.form.invalid.id': 'La configuration sélectionnée n\'existe plus',
  'dataaccess.searchengines.form.back.button': 'Annuler',

}, Locales.fr)

export default messages
