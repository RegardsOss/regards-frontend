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
import { AccessDomain } from '@regardsoss/domain'

/**
 * UI Module related shapes
 * @author Sébastien Binda
 * @author Raphaël Mechali
 */

export const ModulePage = PropTypes.shape({
  home: PropTypes.bool,
  iconType: PropTypes.oneOf(AccessDomain.PAGE_MODULE_ICON_TYPES),
  customIconURL: PropTypes.string,
  // module titles by locale, as a json string
  title: PropTypes.objectOf(PropTypes.string),
})

// loaded module fields
const moduleFields = {
  id: PropTypes.number,
  applicationId: PropTypes.string,
  type: PropTypes.string.isRequired,
  description: PropTypes.string,
  active: PropTypes.bool,
  container: PropTypes.string,
  page: ModulePage,
  // module configuration, as a json string
  conf: PropTypes.objectOf(PropTypes.any),
}

export const ModuleWithoutContent = PropTypes.shape({
  ...moduleFields,
})

export const Module = PropTypes.shape({
  content: ModuleWithoutContent,
})

export const ModuleList = PropTypes.objectOf(Module)
export const ModuleArray = PropTypes.arrayOf(Module)

/**
 * Fields for a runtime display module (ie: userContainer in dynamic module)
 */
export const runtimeDispayModuleFields = {
  appName: PropTypes.string.isRequired,
  project: PropTypes.string,
  // module configuration
  moduleConf: PropTypes.object,
  ...moduleFields,
}

/**
 *  admin form shape
 */
export const moduleAdminForm = PropTypes.shape({
  // While creating the module, every fields shall be created in the redux form using that namespace
  // which allows us to launch a module from another module
  currentNamespace: PropTypes.string,
  // Current module status
  isCreating: PropTypes.bool,
  isDuplicating: PropTypes.bool,
  isEditing: PropTypes.bool,
  isPage: PropTypes.bool.isRequired,
  // Form changeField function.
  changeField: PropTypes.func,
  // Configuration from another admin module
  // eslint-disable-next-line react/forbid-prop-types
  conf: PropTypes.object,
  // This parameter contains the entire redux-form form
  // eslint-disable-next-line react/forbid-prop-types
  form: PropTypes.object.isRequired,
})

/**
 * Fields for a runtime configuration module (ie: adminContainer in dynamic module)
 */
export const runtimeConfigurationModuleFields = {
  ...runtimeDispayModuleFields,
  adminForm: moduleAdminForm,
}
