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
import { UIDomain } from '@regardsoss/domain'

/**
 * Module configuration shape
 * @author Sébastien Binda
 */
const ModuleConfigurationShape = PropTypes.shape({
  preview: PropTypes.bool, // is in preview (undefined when not)
  previewLocale: PropTypes.oneOf(UIDomain.LOCALES), // preview locale (undefined when not in preview)
  cssHeight: PropTypes.string,
  cssWidth: PropTypes.string,
  urlByLocale: PropTypes.shape({
    [UIDomain.LOCALES_ENUM.en]: PropTypes.string,
    [UIDomain.LOCALES_ENUM.fr]: PropTypes.string,
  }),
})

export default ModuleConfigurationShape
