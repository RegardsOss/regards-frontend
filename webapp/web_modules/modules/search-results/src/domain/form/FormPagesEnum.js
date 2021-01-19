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
import values from 'lodash/values'

/**
 * Holds constants defining the sections pages in form
 * @author Raphaël Mechali
 */

export const FORM_PAGES_ENUM = {
  MAIN: 'MAIN', // main configuration page
  SORTING: 'SORTING', // sorting attributes configuration page
  LIST_AND_TABLE: 'LIST_AND_TABLE', // list and table columns configuration page
  QUICKLOOKS: 'QUICKLOOKS', // quicklook attributes configuration page
  MAP: 'MAP', // map configuration page
}

export const FORM_PAGES = values(FORM_PAGES_ENUM)
