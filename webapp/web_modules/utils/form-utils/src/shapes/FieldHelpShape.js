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

import { FieldHelp } from '../domain/FieldHelp'

/**
 * Help content related shapes
 * @author Raphaël Mechali
 */

/** A simple help message content (with optional tital) */
export const FieldMessageHelpContent = PropTypes.shape({
  contentType: PropTypes.oneOf([FieldHelp.CONTENT_TYPES.MESSAGE]).isRequired,
  titleKey: PropTypes.string,
  messageKey: PropTypes.string.isRequired,
})

export const FieldHelpContent = PropTypes.oneOfType([FieldMessageHelpContent])
