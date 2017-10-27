/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 * Additional mui theme properties for regards.
 * @author Sébastien Binda.
 */
export default {
  palette: {
    background: '',
    backgroundImage: '',
  },
  module: {
    titleBarHeight: '48px',
    titleMargin: '0 0 0 8px',
    titleIconMargin: '0',
    titleIconSize: '24px',
    titleTextMargin: '0 0 0 8px',
    titleFontSize: '20px',
    titleFontWeight: '500',
    titleTextTransform: undefined,
  },
  // storage plugins module
  'module:storage-plugins': {
    tableRowHeight: '24px',
    tableCellPadding: '0 5px 0 0',
    usedSpaceColor: '#3DC9D5',
    unusedSpaceColor: '#E0E0E0',
    chartBorderColor: '#FFFFFF',
    chartBorderWidth: '1px',
  },
}
