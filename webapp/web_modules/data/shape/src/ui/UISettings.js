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

/**
 * UI settings shape
 *
 * @author Raphaël Mechali
 */
export const UISettings = PropTypes.shape({
  // show products versions in project
  showVersion: PropTypes.bool.isRequired,
  // Identifies data model of entities to consider as documents
  documentModels: PropTypes.arrayOf(PropTypes.string).isRequired,
  // Datafile.types keyword: when present in a quicklook, marks its assignement in primary group (it is not a group name!)
  primaryQuicklookGroup: PropTypes.string.isRequired,
  // Quota warning: Used to warn user when maxQuota - quotaWarningCount < currentQuota
  quotaWarningCount: PropTypes.number.isRequired,
  // Rate warning: Used to warn user when rateLimit - rateWarningCount < currentRate
  rateWarningCount: PropTypes.number.isRequired,
})
