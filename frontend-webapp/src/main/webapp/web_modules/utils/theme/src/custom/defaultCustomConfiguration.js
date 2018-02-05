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
module.exports = {
  palette: {
    background: '',
    backgroundImage: '',
  },
  'ACE-editor': {
    theme: 'monokai',
  },
  'components:infinite-table': {
    lineHeight: 50,
    fixedColumnsWidth: 42,
    minRowCount: 13,
    maxRowCount: 13,
    minHeaderRowHeight: 40,
    multipleValuesSeparatorMargin: '0 10px',
    multipleValuesSeparatorHeight: 14,
    thumbnailPadding: 5,
  },
  'forms-extension:validation': {
    validColor: '#4CAF50',
    warningColor: '#FF9800',
    errorColor: '#f44336',
  },
  'forms-extension:jsonField': {
    marginTop: '8px',
    padding: '24px 0 12px 0',
    lineHeight: 1,
    height: '140px',
    showLineNumbers: true,
  },
  'forms-extension:dateField': {
    marginTop: '14px',
    innerMargins: '0 10px 0 0',
    height: '58px',
    textTop: '-13px',
  },
  module: {
    titleBarHeight: '48px',
    titleMarginLeft: 8,
    titleIconSize: 24,
    titleTextMarginLeft: 8,
    titleFontSize: '20px',
    titleFontWeight: '500',
    titleTextTransform: undefined,
    subtitleMarginTop: -4,
  },
  // menu module
  'module:menu': {
    background: 'transparent',
    borderWidth: '0 0 1px 0',
    borderColor: 'rgba(255, 255, 255, 0.175)',
    borderStyle: 'solid',
    navigationBarMaxHeight: 36,
    navigationItemTextTransform: 'none',
    selectedNavigationItemTextColor: 'rgb(255, 109, 0)',
    selectedNavigationItemTextDecoration: 'underline',
  },
  // search results module
  'module:search-results': {
    minListRowCount: 4,
    maxListRowCount: 4,
    listLineHeight: 160,
    listRowsByColumnCount: 4,
  },
  // storage plugins module
  'module:storage-plugins': {
    usedSpaceColor: '#133e63',
    unusedSpaceColor: '#FFFFFF',
    chartBorderColor: '#94a4b2',
    chartBorderWidth: '1px',
    legendMarginTop: 16,
    legendItemMarginTop: 8,
    legendItemIconToText: 10,
    circleIconSize: 12,
  },
  'module:order-history': {
    // common
    statusIconMargin: '0 7px 0 15px',
    // orders
    'color.PENDING': '#00BCD4',
    'color.RUNNING': 'white',
    'color.WAITING_USER_DOWNLOAD': '#00BCD4',
    'color.PAUSED': '#00BCD4',
    'color.EXPIRED': '#9E9E9E',
    'color.FAILED': '#f44336',
    'color.DONE_WITH_WARNING': '#FF9800',
    'color.DONE': '#9E9E9E',
    'color.DELETED': '#9E9E9E',
    'color.REMOVED': '#9E9E9E',
    'color.UNKNOWN': '#9E9E9E',
    'waiting.user.download.animation': 'shake 3s infinite',
    // files
    'color.file.PENDING': '#00BCD4',
    'color.file.AVAILABLE': 'white',
    'color.file.ONLINE': 'white',
    'color.file.DOWNLOADED': '#9E9E9E',
    'color.file.ERROR': '#f44336',
    'color.file.UNKNOWN': '#9E9E9E',
    // filters (admin only)
    clearEmailFilterPadding: '7px 16px 7px 8px',
  },
  'components:button-anchor-scroll-top': {
    iconColor: '#303030',
    buttonColor: '#2196f3',
    buttonRight: '10px',
    buttonBottom: '10px',
  },
}
