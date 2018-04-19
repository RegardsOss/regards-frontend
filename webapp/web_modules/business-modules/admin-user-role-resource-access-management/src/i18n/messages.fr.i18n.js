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

const messages = Object.assign({
  'role.list.title': 'Ressources autorisées pour le rôle {role}',
  'role.list.subtitle': 'Toutes les fonctionnalités du système présentées par microservice. Les autorisation d\'accès sont positionnées pour chacune d\'elles',
  'role.list.action.back': 'Retour',
  'role.form.info': 'Plus d\'informations',
  'role.form.autorizedBy': 'Est également accessible par',
  'role.form.moreinfo': 'Plus d\'informations',
  'role.modal.title': 'Ressource {name}',
  'role.modal.action.back': 'Retour',
}, Locales.fr)

export default messages