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
 * @author Sébastien Binda
 */
const messages = {
  'model.attribute.calculation.plugins.list.title': 'Configuration des plugins de calculs des attributs du modèle',
  'model.attribute.calculation.plugins.list.subtitle': 'Cette section vous permet de configurer les différents plugins de calculs des attributs utilisés par le système lors de l\'ajout de données.',
  'model.attribute.calculation.plugins.list.header.id.label': 'Identifiant',
  'model.attribute.calculation.plugins.list.header.name.label': 'Libellé',
  'model.attribute.calculation.plugins.list.header.type.label': 'Type de calcul',
  'model.attribute.calculation.plugins.list.header.active.label': 'Activer',
  'model.attribute.calculation.plugins.list.edit.button': 'Éditer la configuration',
  'model.attribute.calculation.plugins.list.duplicate.button': 'Dupliquer la configuration',
  'model.attribute.calculation.plugins.list.active.on.button': 'Activer ce type de calcul',
  'model.attribute.calculation.plugins.list.active.off.button': 'Désactiver ce plugin',
  'model.attribute.calculation.plugins.list.confirm.title': 'Suppression du plugin {name} ?',
  'model.attribute.calculation.plugins.list.back.button': 'Retour',
  'model.attribute.calculation.plugins.list.empty.title': 'Aucun plugin défini',
  'model.attribute.calculation.plugins.list.add.button': 'Créer un plugin de calcul',

  'model.attribute.calculation.plugins.form.create.title': 'Ajout d\'un nouveau plugin de calcul',
  'model.attribute.calculation.plugins.form.edit.title': 'Édition du plugin de calcul "{name}"',
  'model.attribute.calculation.plugins.form.create.subtitle': 'Après avoir sélectionné le type de calcul, veuillez renseigner les paramètres de configuration associés.',
  'model.attribute.calculation.plugins.form.edit.subtitle': 'Veuillez renseigner les paramètres de configuration associés.',
  'model.attribute.calculation.plugins.form.type.select.title': 'Type de calcul',
  'model.attribute.calculation.plugins.form.type.select.label': 'Sélectionnez un type ...',
  'model.attribute.calculation.plugins.form.invalid.id': 'La configuration sélectionnée n\'existe plus',
  'model.attribute.calculation.plugins.form.back.button': 'Annuler',
  ...Locales.fr,
}

export default messages
