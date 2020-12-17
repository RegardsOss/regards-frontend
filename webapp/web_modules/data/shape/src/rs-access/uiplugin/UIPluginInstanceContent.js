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
import { UIPluginInfoContent } from './UIPluginInfoContent'
/**
 * IHM Plugin entity definition
 * @author Sébastien Binda
 */
export const UIPluginInstanceContent = PropTypes.shape({
  name: PropTypes.string,
  plugin: PropTypes.func,
  styles: PropTypes.shape({
    styles: PropTypes.func,
  }),
  messages: PropTypes.shape({
    fr: PropTypes.objectOf(PropTypes.string),
    en: PropTypes.objectOf(PropTypes.string),
  }),
  info: UIPluginInfoContent,
  error: PropTypes.bool,
  initialized: PropTypes.bool,
})
