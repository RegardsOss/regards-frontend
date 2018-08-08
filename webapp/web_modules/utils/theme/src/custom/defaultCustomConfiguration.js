/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
module.exports = baseTheme => ({
  palette: {
    background: '',
    backgroundImage: '',
  },
  components: {
    anchorScrollTop: {
      iconColor: baseTheme.palette.alternateTextColor,
      buttonColor: baseTheme.palette.primary1Color,
      buttonRight: 10,
      buttonBottom: 10,
    },
    editorACE: {
      theme: 'monokai',
    },
    scrollArea: {
      scrollingSidePadding: 15,
    },
    infiniteTable: {
      lineHeight: 50,
      fixedColumnsWidth: baseTheme.button.iconButtonSize, // best fit for default IconButton size
      minColumnsWidth: 200,
      minHeaderRowHeight: 40,
      multipleValuesSeparatorMargin: '0 10px',
      multipleValuesSeparatorHeight: 14,
      thumbnailPadding: 5,
      sortIndexNumber: {
        margin: '7px 0 -7px 0',
        fontSize: '10px',
        fontWeight: 'bold',
      },
      admin: {
        minRowCount: 2,
        maxRowCount: 10,
      },
      fixedContentMarginBottom: 5,
    },
  },
  formsExtensions: {
    dateField: {
      marginTop: 14,
      innerMargins: '0 10px 0 0',
      height: 58,
      textTop: -13,
    },
    jsonField: {
      marginTop: 8,
      padding: '24px 0 12px 0',
      lineHeight: 1,
      height: 140,
      showLineNumbers: true,
    },
    validation: {
      validColor: '#4CAF50',
      warningColor: '#FF9800',
      errorColor: baseTheme.textField.errorColor,
    },
  },
  module: {
    // common to all modules (especially dynamic ones)
    common: {
      titleBarHeight: 48,
      titleMarginLeft: 8,
      titleIconSize: 24,
      titleTextMarginLeft: 0,
      titleFontSize: baseTheme.toolbar.titleFontSize,
      titleFontWeight: 500,
      titleTextTransform: undefined,
      subtitleMarginTop: -4,
      layoutOptionSize: 24,
      layoutOptionPadding: 3,
      layoutIconSize: 18,
      minContentHeight: 200,
    },
    // description module
    description: {
      thumbnail: {
        maxSize: 128,
        margin: '1em 0 0.4em 20px',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: baseTheme.palette.textColor,
      },
      attributeGroupTitlePadding: '1em 0 0.4em 0',
      attributeGroupTitleColor: baseTheme.palette.accent1Color,
      attributeGroupTitlePlaceholderPadding: '1em 0 0.4em 0',
      attributeLabelPadding: '0.4em 20px 0.4em 0',
      attributeLabelTextDecoration: 'underline',
      attributeValuesPadding: '0.4em 20px 0.4em 0',
      attributeValuesTextDecoration: 'none',
      fileContentBackground: 'white',
      filesOptions: {
        top: 60,
        right: 40,
        padding: '0 0 0 10px',
        background: baseTheme.palette.primary1Color,
      },
    },
    // menu module
    menu: {
      background: baseTheme.palette.canvasColor,
      borderColor: baseTheme.toolbar.separatorColor,
      borderWidth: '0 0 1px 0',
      borderStyle: 'solid',
      navigationBarMaxHeight: 36,
      navigationItemTextTransform: 'none',
      separatorBorderWidth: 2,
      separatorBorderRadius: 2,
      separatorBorderStyle: 'solid',
      separatorMargin: '12px 10px 12px 0',
    },
    // order history module
    orderHistory: {
      // common
      statusIconMargin: '0 7px 0 15px',
      clearEmailFilterPadding: '7px 16px 7px 8px',
      'waiting.user.download.animation': 'shake 3s infinite',
      // orders
      'color.PENDING': '#00BCD4',
      'color.RUNNING': baseTheme.palette.textColor,
      'color.WAITING_USER_DOWNLOAD': '#00BCD4',
      'color.PAUSED': '#00BCD4',
      'color.EXPIRED': baseTheme.textField.disabledTextColor,
      'color.FAILED': baseTheme.textField.errorColor,
      'color.DONE_WITH_WARNING': '#FF9800',
      'color.DONE': baseTheme.textField.disabledTextColor,
      'color.DELETED': baseTheme.textField.disabledTextColor,
      'color.REMOVED': baseTheme.textField.disabledTextColor,
      'color.UNKNOWN': baseTheme.textField.disabledTextColor,
      // files
      'color.file.PENDING': '#00BCD4',
      'color.file.AVAILABLE': baseTheme.palette.textColor,
      'color.file.ONLINE': baseTheme.palette.textColor,
      'color.file.DOWNLOADED': baseTheme.textField.disabledTextColor,
      'color.file.DOWNLOAD_ERROR': baseTheme.textField.errorColor,
      'color.file.ERROR': baseTheme.textField.errorColor,
      'color.file.UNKNOWN': baseTheme.textField.disabledTextColor,
    },
    // search results module
    searchResults: {
      listLineHeight: 160,
      listRowsByColumnCount: 4,
    },
    // storage plugins module
    storagePlugins: {
      usedSpaceColor: '#133e63',
      unusedSpaceColor: '#FFFFFF',
      chartBorderColor: baseTheme.toolbar.separatorColor,
      chartBorderWidth: 1,
      legendMarginTop: 16,
      legendItemMarginTop: 8,
      legendItemIconToText: 10,
      circleIconSize: 12,
    },
  },
})
