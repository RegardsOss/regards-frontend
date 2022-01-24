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
import pick from 'lodash/pick'

/**
 * Provides tools to write modules
 * @author Raphaël Mechali
 */

/** Module properties to be reported on DynamicModulePane for instance */
const userModulePropertiesKeys = [
  'id',
  'applicationId',
  'appName',
  'project',
  'type',
  'moduleConf',
  'description',
  'active',
  'container',
  'page',
  'conf',
]

/** Module properties to be reported at configuration (admin part) */
const adminModulePropertiesKeys = [
  ...userModulePropertiesKeys,
  'adminForm',
]

/**
 * Returns the list of properties consumed by a module user component (to be used in order to instanciated a
 * DynamicModulePane for instance)
 * @param {*} props parent properties
 */
const getReportedUserModuleProps = (props) => pick(props, userModulePropertiesKeys)
/**
 * Returns the list of properties consumed by a module admin component (to be used in order to instanciated a
 * DynamicModulePane for instance)
 * @param {*} props parent properties
 */
const getReportedAdminModuleProps = (props) => pick(props, adminModulePropertiesKeys)

export default {
  getReportedUserModuleProps,
  getReportedAdminModuleProps,
}
