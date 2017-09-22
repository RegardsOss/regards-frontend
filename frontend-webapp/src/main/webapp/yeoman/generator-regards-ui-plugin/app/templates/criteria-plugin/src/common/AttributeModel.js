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
import Fragment from './Fragment'

/**
 * Shape of an AttributeModel entity as it is passed to the criterion plugins
 * @author Sébastien Binda
 */
const AttributeModel = React.PropTypes.shape({
  id: React.PropTypes.number,
  name: React.PropTypes.string,
  label: React.PropTypes.string,
  description: React.PropTypes.string,
  defaultValue: React.PropTypes.string,
  type: React.PropTypes.string,
  unit: React.PropTypes.string,
  precision: React.PropTypes.number,
  arraysize: React.PropTypes.number,
  fragment: Fragment,
  queryable: React.PropTypes.bool,
  facetable: React.PropTypes.bool,
  alterable: React.PropTypes.bool,
  optional: React.PropTypes.bool,
  group: React.PropTypes.string,
})

export default AttributeModel
