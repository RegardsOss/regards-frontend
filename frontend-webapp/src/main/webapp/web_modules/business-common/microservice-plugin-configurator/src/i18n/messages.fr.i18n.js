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

const messages = Object.assign({
  'plugin.configuration.form.create.title': 'Ajouter une configuration',
  'plugin.configuration.form.edit.title': 'Editer la configuration {name}',
  'plugin.configuration.form.pluginClassName': 'Classe du plugin (chemin complet)',
  'plugin.configuration.form.label': 'Label *',
  'plugin.configuration.form.version': 'Version *',
  'plugin.configuration.form.priorityOrder': 'Priorité *',
  'plugin.configuration.form.icon': 'Icône (lien http)',
  'plugin.configuration.form.active': 'Activée',
  'plugin.configuration.form.inactive': 'Désactivée',
  'plugin.configuration.form.action.submit.add': 'Ajouter',
  'plugin.configuration.form.action.submit.save': 'Sauvegarder',
  'plugin.configuration.form.action.cancel': 'Annuler',

  'plugin.parameter.description.dialog.title': 'Description du paramètre {parameter}',
  'plugin.parameter.description.dialog.close': 'Fermer',
  'plugin.parameter.static.field': 'Fixer la valeur du paramètre',
  'plugin.parameter.dynamic.field': 'Paramètre dynamique',
  'plugin.parameter.dynamicvalues.title': 'Valeurs possibles du paramètre',
  'plugin.parameter.default.value.label': '(Valeur par défaut : {defaultValue})',

  'plugin.parameter.plugin.choose': 'Choisir un plugin',
  'plugin.parameter.plugin.empty.menu.item': 'Aucun',

  'plugin.parameter.map.new.key.dialog.title': 'Enter a new value for {key}',
  'plugin.parameter.map.new.value.label': 'Value for {value}',

}, Locales.fr)

export default messages
