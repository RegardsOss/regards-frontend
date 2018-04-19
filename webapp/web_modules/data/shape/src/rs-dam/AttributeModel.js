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
import { FragmentContent } from './Fragment'

const AttributeModelContent = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  // only provided when fetching attrModel list
  jsonPath: PropTypes.string,
  description: PropTypes.string,
  defaultValue: PropTypes.string,
  type: PropTypes.string.isRequired,
  unit: PropTypes.string,
  precision: PropTypes.number,
  arraysize: PropTypes.number,
  fragment: FragmentContent,
  queryable: PropTypes.bool,
  facetable: PropTypes.bool,
  alterable: PropTypes.bool,
  optional: PropTypes.bool,
  group: PropTypes.string,
})
const AttributeModel = PropTypes.shape({
  content: AttributeModelContent,
})
const AttributeModelList = PropTypes.objectOf(AttributeModel)

const AttributeModelArray = PropTypes.arrayOf(AttributeModel)

module.exports = {
  AttributeModelContent,
  AttributeModel,
  AttributeModelList,
  AttributeModelArray,
}