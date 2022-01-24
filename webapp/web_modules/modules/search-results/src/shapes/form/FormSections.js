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
import { FORM_SECTIONS } from '../../domain/form/FormSectionsEnum'
import { FORM_PAGES } from '../../domain/form/FormPagesEnum'

/**
 * Defines sections and pages shapes for form browing
 * @author Raphaël Mechali
 */

/** A form page */
export const FormPage = PropTypes.shape({
  type: PropTypes.oneOf(FORM_PAGES).isRequired,
  selected: PropTypes.bool.isRequired, // is this page selected in navigation tree?
})

/** A section with form pages */
export const FormSection = PropTypes.shape({
  type: PropTypes.oneOf(FORM_SECTIONS).isRequired,
  pages: PropTypes.arrayOf(FormPage).isRequired,
})
