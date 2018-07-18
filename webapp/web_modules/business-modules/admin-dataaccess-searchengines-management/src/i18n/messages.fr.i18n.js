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
  'dataaccess.searchengines.list.header.label': 'Libellé',
  'dataaccess.searchengines.list.header.engine': 'Moteur de recherche',
  'dataaccess.searchengines.list.header.dataset': 'Jeu de données',
  'dataaccess.searchengines.list.edit.button': 'Editer la configuration',
  'dataaccess.searchengines.list.confirm.title': 'Suppression de la configuration {name} ?',
  'dataaccess.searchengines.list.back.button': 'Retour',
  'dataaccess.searchengines.list.empty.title': 'Aucun moteur de recherche configuré',
  'dataaccess.searchengines.list.add.button': 'Configurer un nouveau moteur de recherche',

  'dataaccess.searchengines.form.create.title': 'Configurer un nouveau moteur de recherche',
  'dataaccess.searchengines.form.edit.title': 'Edition du moteur de recherche "{name}"',
  'dataaccess.searchengines.form.create.subtitle': 'Ce formulaire vous permet de configurer un moteur de recherche. Un moteur de recherche peut être global afin d\'être utilisé pour toute recherches ou bien être spécifique à un jeu de données. Après avoir sélectionner le type de moteur de recherche que vous souhaitez, vous pouvez utiliser une configration existante ou bien en créer une nouvelle.',
  'dataaccess.searchengines.form.edit.subtitle': 'Veuillez renseigner les paramètres de configuration associés.',
  'dataaccess.searchengines.form.type.select.title': 'Moteur de recherche',
  'dataaccess.searchengines.form.type.select.label': 'Sélectionnez un moteur de recherche ...',
  'dataaccess.searchengines.form.invalid.id': 'La configuration sélectionnée n\'existe plus',
  'dataaccess.searchengines.form.back.button': 'Annuler',

  'search-engines.form.label': 'Libellé',
  'search-engines.form.label.infos': 'Description courte du moteur de recherche',
  'search-engines.form.dataset.type.all': 'Utiliser ce moteur de recherche pour toute recherche sur le catalogue',
  'search-engines.form.dataset.type.selected': 'Utiliser ce moteur de recherche pour toute recherche sur le jeu de données sélectionné',
  'search-engines.form.dataset.section.title': 'Choisir un jeu de données',
  'search-engines.form.dataset': 'Selectionner le jeu de données auquel ce moteur de recherche sera associé.',
  'search-engines.form.dataset.hinttext': 'Ce champ vous permet de filtrer la liste des jeux de données par leur label',
  'search-engines.form.dataset.infos': 'La liste des jeux proposée par défaut n\'est pas exhaustive. Pour faire apparaître un jeu non présent vous pouvez filtrer en tapant les premières lettres de sont libelé.',
  'search-engines.form.new.plugin.section.title': 'Créer une nouvelle configuration du moteur {engine}',
  'component.plugin-parameter.action.choose-plugin': 'Choisir le moteur de recherche',
  'component.plugin-parameter.action.create-plugin': 'Nouvelle configuration',
  'component.plugin-parameter.action.reset': 'Dissocier le moteur de recherche',
  'component.plugin-parameter.no-plugin-available': 'Aucun moteur de recherche disponible',
  'component.plugin-parameter.new.conf.option': 'Nouvelle configuration',
  'search-engines.form.action.save': 'Créer',
  'search-engines.form.action.cancel': 'Annuler',

}, Locales.fr)

export default messages
