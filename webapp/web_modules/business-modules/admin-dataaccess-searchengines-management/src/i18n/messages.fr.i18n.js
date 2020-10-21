/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
  'dataaccess.searchengines.list.title': 'Définition des protocoles d\'accès à vos données',
  'dataaccess.searchengines.list.subtitle': 'Chaque protocole d\'accès peut être associé à l\'ensemble du catalogue ou bien à un jeu de données précis.',
  'dataaccess.searchengines.list.header.label': 'Libellé',
  'dataaccess.searchengines.list.header.engine': 'Protocole',
  'dataaccess.searchengines.list.header.dataset': 'Jeu de données',
  'dataaccess.searchengines.list.edit.button': 'Éditer le protocole',
  'dataaccess.searchengines.list.info.button': 'Informations d\'accès',
  'dataaccess.searchengines.list.confirm.title': 'Suppression du protocole {name} ?',
  'dataaccess.searchengines.list.back.button': 'Retour',
  'dataaccess.searchengines.list.empty.title': 'Aucun protocole défini',
  'dataaccess.searchengines.list.add.button': 'Définir un nouveau protocole',

  'dataaccess.searchengines.info.title': 'Informations d\'accès à la recherche de données pour le protocole < {name} >',
  'dataaccess.searchengines.info.content.all': 'Ce protocole vous permet de rechercher des données sur tous les jeux du catalogue. Pour ce faire vous devez utiliser le point d\'accès ci-dessous.',
  'dataaccess.searchengines.info.content.dataset': 'Ce protocole vous permet de rechercher des données contenues dans le jeu de données {label}. Pour ce faire vous devez utiliser le point d\'accès ci-dessous.',
  'dataaccess.searchengines.info.test': 'Cliquer ici pour tester une recherche avec ce protocole',
  'dataaccess.searchengines.info.test.descriptor': 'Cliquer ici pour consulter le descripteur du protocole',
  'dataaccess.searchengines.info.close': 'Fermer',

  'dataaccess.searchengines.form.create.title': 'Configurer un protocole',
  'dataaccess.searchengines.form.edit.title': 'Édition du protocole "{name}"',
  'dataaccess.searchengines.form.create.subtitle': 'Un protocole peut être global afin d\'être utilisé pour toute recherche ou bien être spécifique à un jeu de données. Après avoir sélectionné le type de protocole que vous souhaitez, vous pouvez utiliser une configuration existante ou bien en créer une nouvelle.',
  'dataaccess.searchengines.form.edit.subtitle': 'Veuillez renseigner les paramètres de configuration associés.',
  'dataaccess.searchengines.form.type.select.label': 'Sélectionnez un protocole ...',
  'dataaccess.searchengines.form.invalid.id': 'Le protocole sélectionné n\'existe plus',
  'dataaccess.searchengines.form.no.plugin.available': 'Aucun type de protocole de recherche disponible.',
  'dataaccess.searchengines.form.back.button': 'Annuler',

  'search-engines.form.label': 'Libellé',
  'search-engines.form.label.infos': 'Description courte du protocole',
  'search-engines.form.dataset.type.all': 'Utiliser ce protocole pour toute recherche sur le catalogue',
  'search-engines.form.dataset.type.selected': 'Utiliser ce protocole pour toute recherche sur le jeu de données sélectionné',
  'search-engines.form.dataset.section.title': 'Choisir un jeu de données',
  'search-engines.form.dataset': 'Sélectionner le jeu de données auquel ce protocole sera associé.',
  'search-engines.form.dataset.hinttext': 'Ce champ vous permet de filtrer la liste des jeux de données par leur label',
  'search-engines.form.dataset.infos': 'La liste des jeux proposée par défaut n\'est pas exhaustive. Pour faire apparaître un jeu non présent vous pouvez filtrer en tapant les premières lettres de son libellé.',
  'search-engines.form.new.plugin.section.title': 'Créer une nouvelle configuration du protocole {engine}',
  'component.plugin-parameter.action.choose-plugin': 'Choisir le protocole',
  'component.plugin-parameter.action.create-plugin': 'Nouvelle configuration',
  'component.plugin-parameter.action.reset': 'Annuler la sélection',
  'component.plugin-parameter.no-plugin-available': 'Aucun protocole disponible',
  'component.plugin-parameter.new.conf.option': 'Nouvelle configuration',
  'search-engines.form.create.action': 'Créer',
  'search-engines.form.update.action': 'Mettre à jour',
  'search-engines.form.cancel.action': 'Annuler',

  'plugin.configuration.form.description.more': 'Voir la description détaillée du protocole',

  'dataaccess.searchengines.list.confirm.delete.title': 'Supprimer le protocole sélectionné?',

}, Locales.fr)

export default messages
