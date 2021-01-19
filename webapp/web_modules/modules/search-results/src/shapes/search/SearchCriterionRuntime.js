/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

import { CommonShapes, DataManagementShapes } from '@regardsoss/shape'

/**
 * Defines search criterion runtime shape, for edition (shared accross search area)
 * @author Raphaël Mechali
 */
export const SearchCriterionRuntime = PropTypes.shape({
  // from configuration
  pluginId: PropTypes.number.isRequired,
  pluginInstanceId: PropTypes.string.isRequired,
  conf: PropTypes.shape({ // configuration
    attributes: PropTypes.objectOf(DataManagementShapes.AttributeModelContent).isRequired,
  }),
  label: PropTypes.shape({
    en: PropTypes.string, // english group label, optional
    fr: PropTypes.string, // french group label, optional
  }).isRequired,
  // from SearchCriterion
  // eslint-disable-next-line react/forbid-prop-types
  state: PropTypes.object,
  requestParameters: CommonShapes.RequestParameters, // not mandatory in edition
  delayedRequestParameters: CommonShapes.RequestParameters, // delayed parameters
})
