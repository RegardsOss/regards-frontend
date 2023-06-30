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

const messages = {
  'modelattr.edit.title': 'Gestion des attributs du modèle {name}',
  'modelattr.edit.description': 'Pour ajouter un attribut ou un fragment au modèle, glissez/déposez depuis la colonne de droite vers la colonne de gauche. Réalisez l\'opération inverse pour enlever un attribut ou un fragment au modèle',
  'modelattr.form.action.back': 'Retour',
  'modelattr.edit.remainingAttr': 'Attributs disponibles',
  'modelattr.edit.modelname': 'Modèle {name}',
  'component.plugin-parameter.action.choose-plugin': 'Utiliser un plugin',
  'component.plugin-parameter.action.reset': 'Supprimer le plugin',
  'component.plugin-parameter.no-plugin-available': 'Aucun plugin disponible',
  'modelattr.edit.computation.label': 'Calcul',
  'modelattr.edit.table.computationMethod': 'Méthode de calcul',
  'modelattr.edit.table.name': 'Nom (type)',
  'modelattr.edit.noAttrLink': 'Aucun attribut n\'est lié au modèle',
  ...Locales.fr,
}

export default messages
