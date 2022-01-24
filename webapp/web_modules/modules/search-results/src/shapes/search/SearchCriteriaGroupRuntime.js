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
import { SearchCriterionRuntime } from './SearchCriterionRuntime'

/**
 * Defines search criteria group runtime shape, for edition (shared accross search area)
 * @author Raphaël Mechali
 */
export const SearchCriteriaGroupRuntime = PropTypes.shape({
  showTitle: PropTypes.bool.isRequired,
  title: PropTypes.shape({
    en: PropTypes.string,
    fr: PropTypes.string,
  }).isRequired,
  criteria: PropTypes.arrayOf(SearchCriterionRuntime).isRequired,
})
