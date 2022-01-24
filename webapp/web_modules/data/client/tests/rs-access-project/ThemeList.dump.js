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

export default {
  metadata: {
    size: 100,
    totalElements: 6,
    totalPages: 1,
    number: 0,
  },
  content: [
    {
      content: {
        id: 2,
        name: 'Light',
        active: false,
        configuration: '{\n  "mainTheme": {\n  "palette":\n  {\n    "backgroundImage":"",\n    "primary1Color":"#00bcd4",\n    "primary2Color":"#0097a7",\n    "primary3Color":"#bdbdbd",\n    "accent1Color":"#ff4081",\n    "accent2Color":"#f5f5f5",\n    "accent3Color":"#9e9e9e",\n    "textColor":"rgba(0, 0, 0, 0.87)",\n    "secondaryTextColor":"rgba(0, 0, 0, 0.54)",\n    "alternateTextColor":"#ffffff",\n    "canvasColor":"#ffffff",\n    "borderColor":"#e0e0e0",\n    "disabledColor":"rgba(0, 0, 0, 0.3)",\n    "pickerHeaderColor":"#00bcd4",\n    "clockCircleColor":"rgba(0, 0, 0, 0.07)",\n    "shadowColor":"rgba(0, 0, 0, 1)"\n  },\n  "themeName":"Light",\n  "tableRow":\n  {\n    "stripeColor":"#e0e0e0"\n  }\n},\n  "alternativeTheme": {\n  }\n}\n',
      },
      links: [
        {
          rel: 'self',
          href: 'http://172.26.47.52/api/v1/rs-access-project/themes/2',
        },
        {
          rel: 'update',
          href: 'http://172.26.47.52/api/v1/rs-access-project/themes/2',
        },
        {
          rel: 'delete',
          href: 'http://172.26.47.52/api/v1/rs-access-project/themes/2',
        },
      ],
    },
    {
      content: {
        id: 4,
        name: 'Montheme2',
        active: false,
        configuration: '{"mainTheme":{"spacing":{"iconSize":24,"desktopGutter":24,"desktopGutterMore":32,"desktopGutterLess":16,"desktopGutterMini":8,"desktopKeylineIncrement":64,"desktopDropDownMenuItemHeight":32,"desktopDropDownMenuFontSize":15,"desktopDrawerMenuItemHeight":48,"desktopSubheaderHeight":48,"desktopToolbarHeight":56},"fontFamily":"Roboto, sans-serif","borderRadius":2,"palette":{"primary1Color":"#0097a7","primary2Color":"#0097a7","primary3Color":"#757575","accent1Color":"#ff4081","accent2Color":"#f50057","accent3Color":"#ff80ab","textColor":"rgba(255, 255, 255, 1)","secondaryTextColor":"rgba(255, 255, 255, 0.7)","alternateTextColor":"#303030","canvasColor":"#303030","borderColor":"rgba(255, 255, 255, 0.3)","disabledColor":"rgba(255, 255, 255, 0.3)","pickerHeaderColor":"rgba(255, 255, 255, 0.12)","clockCircleColor":"rgba(255, 255, 255, 0.12)"},"forms-extension:dateField":{"marginTop":"18px"}},"alternativeTheme":{}}',
      },
      links: [
        {
          rel: 'self',
          href: 'http://172.26.47.52/api/v1/rs-access-project/themes/4',
        },
        {
          rel: 'update',
          href: 'http://172.26.47.52/api/v1/rs-access-project/themes/4',
        },
        {
          rel: 'delete',
          href: 'http://172.26.47.52/api/v1/rs-access-project/themes/4',
        },
      ],
    },
    {
      content: {
        id: 3,
        name: 'Energy',
        active: false,
        configuration: '{"mainTheme":{"palette":{"background":"","backgroundImage":"/img/background.jpg","primary2Color":"#0097A7","primary3Color":"#757575","textColor":"#FFFFFF","secondaryTextColor":"rgba(255, 255, 255, 0.7)","alternateTextColor":"#303030","canvasColor":"#303030","borderColor":"rgba(255, 255, 255, 0.3)","disabledColor":"rgba(255, 255, 255, 0.3)","pickerHeaderColor":"rgba(255, 255, 255, 0.12)","clockCircleColor":"rgba(255, 255, 255, 0.12)","shadowColor":"rgba(0, 0, 0, 1)","accent2Color":"#2196f3","accent3Color":"#ff6d00","primary1Color":"#2196f3","accent1Color":"#ff6d00"},"ACE-editor":{"theme":"monokai"},"components:infinite-table":{"lineHeight":50,"fixedColumnsWidth":42,"minRowCount":13,"maxRowCount":13,"minHeaderRowHeight":40,"multipleValuesSeparatorMargin":"0 10px","multipleValuesSeparatorHeight":14,"thumbnailPadding":5},"forms-extension:validation":{"validColor":"#4CAF50","warningColor":"#FF9800","errorColor":"#f44336"},"forms-extension:jsonField":{"marginTop":"8px","padding":"24px 0 12px 0","lineHeight":1,"height":"140px","showLineNumbers":true},"forms-extension:dateField":{"marginTop":"14px","innerMargins":"0 10px 0 0","height":"58px","textTop":"-13px"},"module":{"titleBarHeight":"48px","titleMarginLeft":8,"titleIconSize":24,"titleTextMarginLeft":8,"titleFontSize":"20px","titleFontWeight":"500","subtitleMarginTop":-4},"module:search-results":{"minListRowCount":4,"maxListRowCount":4,"listLineHeight":160,"listRowsByColumnCount":4},"module:storage-plugins":{"usedSpaceColor":"#133e63","unusedSpaceColor":"#FFFFFF","chartBorderColor":"#94a4b2","chartBorderWidth":"1px","legendMarginTop":16,"legendItemMarginTop":8,"legendItemIconToText":10,"circleIconSize":12},"module:order-history":{"statusIconMargin":"0 7px 0 15px","color.PENDING":"#00BCD4","color.RUNNING":"white","color.WAITING_USER_DOWNLOAD":"#00BCD4","color.PAUSED":"#00BCD4","color.EXPIRED":"#9E9E9E","color.FAILED":"#f44336","color.DONE_WITH_WARNING":"#FF9800","color.DONE":"#9E9E9E","color.DELETED":"#9E9E9E","color.REMOVED":"#9E9E9E","color.UNKNOWN":"#9E9E9E","waiting.user.download.animation":"shake 3s infinite","color.file.PENDING":"#00BCD4","color.file.AVAILABLE":"white","color.file.ONLINE":"white","color.file.DOWNLOADED":"#9E9E9E","color.file.ERROR":"#f44336","color.file.UNKNOWN":"#9E9E9E","clearEmailFilterPadding":"7px 16px 7px 8px"},"components:button-anchor-scroll-top":{"iconColor":"#303030","buttonColor":"#1565c0","buttonRight":20,"buttonBottom":20},"themeName":"Dark","tableRow":{"stripeColor":"#212121","hoverColor":"#424242"},"menuItem":{"rightIconDesktopFill":"#fb8c00","selectedTextColor":"#ff6d00","hoverColor":"#1e88e5"},"badge":{"primaryTextColor":"#FFFFFF","secondaryTextColor":"#FFFFFF","primaryColor":"#ff6d00","secondaryColor":"#2196f3"},"appBar":{"textColor":"#FFFFFF"},"tabs":{"textColor":"#fafafa","selectedTextColor":"#ff9100"},"raisedButton":{"primaryTextColor":"#fafafa","secondaryTextColor":"#fafafa"},"stepper":{"disabledTextColor":"#757575","textColor":"#ffffff"},"toggle":{"thumbOnColor":"#8bc34a","thumbOffColor":"#f44336","thumbDisabledColor":"#757575","trackOffColor":"#f5f5f5","trackOnColor":"#f5f5f5"},"module:menu":{"background":"rgba(0, 0, 0, 0.5)","borderColor":"rgba(255, 255, 255, 0.185)"}},"alternativeTheme":{"flatButton":{"color":"#4a148c","textColor":"#ffffff","buttonFilterColor":"#673ab7"},"palette":{"textColor":"#1b5e20","disabledColor":"#880e4f","canvasColor":"#e0e0e0","secondaryTextColor":"#1a237e"},"tableRow":{"stripeColor":"#dce775","hoverColor":"#7e57c2"},"table":{"backgroundColor":"#bbdefb"},"paper":{"backgroundColor":"#5c6bc0"}}}',
      },
      links: [
        {
          rel: 'self',
          href: 'http://172.26.47.52/api/v1/rs-access-project/themes/3',
        },
        {
          rel: 'update',
          href: 'http://172.26.47.52/api/v1/rs-access-project/themes/3',
        },
        {
          rel: 'delete',
          href: 'http://172.26.47.52/api/v1/rs-access-project/themes/3',
        },
      ],
    },
    {
      content: {
        id: 52,
        name: 'Ocean',
        active: true,
        configuration: '{"mainTheme":{"palette":{"background":"","backgroundImage":"/img/background.jpg","primary2Color":"#0097A7","primary3Color":"#757575","textColor":"#FFFFFF","secondaryTextColor":"rgba(255, 255, 255, 0.7)","alternateTextColor":"#303030","canvasColor":"#00202f","borderColor":"rgba(255, 255, 255, 0.3)","disabledColor":"rgba(255, 255, 255, 0.3)","pickerHeaderColor":"rgba(255, 255, 255, 0.12)","clockCircleColor":"rgba(255, 255, 255, 0.12)","shadowColor":"rgba(0, 0, 0, 1)","accent3Color":"#ff6d00","primary1Color":"#2196f3","accent1Color":"#ff6d00","accent2Color":"#64b5f6"},"ACE-editor":{"theme":"monokai"},"components:infinite-table":{"lineHeight":50,"fixedColumnsWidth":48,"minRowCount":13,"maxRowCount":13,"minHeaderRowHeight":40,"multipleValuesSeparatorMargin":"0 10px","multipleValuesSeparatorHeight":14,"thumbnailPadding":5},"forms-extension:validation":{"validColor":"#4CAF50","warningColor":"#FF9800","errorColor":"#f44336"},"forms-extension:jsonField":{"marginTop":"8px","padding":"24px 0 12px 0","lineHeight":1,"height":"140px","showLineNumbers":true},"forms-extension:dateField":{"marginTop":"14px","innerMargins":"0 10px 0 0","height":"58px","textTop":"-13px"},"module:menu":{"background":"rgba(0, 32, 47, 0.85)","borderWidth":"0 0 1px 0","borderColor":"rgba(255, 255, 255, 0.175)","borderStyle":"solid","navigationBarMaxHeight":36,"navigationItemTextTransform":"none","separatorBorderWidth":2,"separatorBorderRadius":2,"separatorBorderStyle":"solid","separatorMargin":"12px 10px"},"module:search-results":{"minListRowCount":4,"maxListRowCount":4,"listLineHeight":160,"listRowsByColumnCount":4},"module:storage-plugins":{"usedSpaceColor":"#133e63","unusedSpaceColor":"#FFFFFF","chartBorderColor":"#94a4b2","chartBorderWidth":"1px","legendMarginTop":16,"legendItemMarginTop":8,"legendItemIconToText":10,"circleIconSize":12},"module:order-history":{"statusIconMargin":"0 7px 0 15px","color.PENDING":"#00BCD4","color.RUNNING":"white","color.WAITING_USER_DOWNLOAD":"#00BCD4","color.PAUSED":"#00BCD4","color.EXPIRED":"#9E9E9E","color.FAILED":"#f44336","color.DONE_WITH_WARNING":"#FF9800","color.DONE":"#9E9E9E","color.DELETED":"#9E9E9E","color.REMOVED":"#9E9E9E","color.UNKNOWN":"#9E9E9E","waiting.user.download.animation":"shake 3s infinite","color.file.PENDING":"#00BCD4","color.file.AVAILABLE":"white","color.file.ONLINE":"white","color.file.DOWNLOADED":"#9E9E9E","color.file.ERROR":"#f44336","color.file.UNKNOWN":"#9E9E9E","clearEmailFilterPadding":"7px 16px 7px 8px"},"components:button-anchor-scroll-top":{"iconColor":"#303030","buttonColor":"#2196f3","buttonRight":"10px","buttonBottom":"10px"},"themeName":"Dark","tableRow":{"stripeColor":"#0a415b","hoverColor":"#003047","selectedColor":"#214f6c"},"badge":{"primaryTextColor":"#FFFFFF","secondaryTextColor":"#FFFFFF","primaryColor":"#ff6d00","secondaryColor":"#2196f3"},"appBar":{"textColor":"#FFFFFF"},"tabs":{"textColor":"#fafafa","selectedTextColor":"#ff9100"},"raisedButton":{"primaryTextColor":"#fafafa","secondaryTextColor":"#fafafa","color":"#285165","disabledColor":"#184155"},"stepper":{"disabledTextColor":"#757575","textColor":"#ffffff"},"toggle":{"thumbOnColor":"#8bc34a","thumbOffColor":"#f44336","thumbDisabledColor":"#757575","trackOffColor":"#f5f5f5","trackOnColor":"#f5f5f5"},"menu":{"backgroundColor":"#00202f","containerBackgroundColor":"#00202f"},"tableHeaderColumn":{"height":48},"module":{"common":{"titleMarginLeft":0}}},"alternativeTheme":{}}',
      },
      links: [
        {
          rel: 'self',
          href: 'http://172.26.47.52/api/v1/rs-access-project/themes/52',
        },
        {
          rel: 'update',
          href: 'http://172.26.47.52/api/v1/rs-access-project/themes/52',
        },
        {
          rel: 'delete',
          href: 'http://172.26.47.52/api/v1/rs-access-project/themes/52',
        },
      ],
    },
    {
      content: {
        id: 102,
        name: 'TEMPORARY',
        active: false,
        configuration: '{"mainTheme":{"spacing":{"iconSize":24,"desktopGutter":24,"desktopGutterMore":32,"desktopGutterLess":16,"desktopGutterMini":8,"desktopKeylineIncrement":64,"desktopDropDownMenuItemHeight":32,"desktopDropDownMenuFontSize":15,"desktopDrawerMenuItemHeight":48,"desktopSubheaderHeight":48,"desktopToolbarHeight":56},"fontFamily":"Roboto, sans-serif","borderRadius":2,"palette":{"primary1Color":"#303f9f","primary2Color":"#0097a7","primary3Color":"#757575","accent1Color":"#40c4ff","accent2Color":"#ff3d00","accent3Color":"#ff80ab","textColor":"rgba(255, 255, 255, 1)","secondaryTextColor":"rgba(255, 255, 255, 0.7)","alternateTextColor":"#303030","canvasColor":"#303030","borderColor":"rgba(255, 255, 255, 0.3)","disabledColor":"rgba(255, 255, 255, 0.3)","pickerHeaderColor":"rgba(255, 255, 255, 0.12)","clockCircleColor":"rgba(255, 255, 255, 0.12)"}},"alternativeTheme":{"cardMedia":{"overlayContentBackground":"#e91e63"},"overlay":{"backgroundColor":"#e91e63"},"paper":{"backgroundColor":"#e91e63"},"palette":{"canvasColor":"#e91e63","accent1Color":"#ffeb3b","accent2Color":"#4caf50"},"flatButton":{"primaryTextColor":"#000000","color":"#e91e63"},"raisedButton":{"color":"#e91e63","primaryTextColor":"#ffffff","primaryColor":"#fbc02d"}}}',
      },
      links: [
        {
          rel: 'self',
          href: 'http://172.26.47.52/api/v1/rs-access-project/themes/102',
        },
        {
          rel: 'update',
          href: 'http://172.26.47.52/api/v1/rs-access-project/themes/102',
        },
        {
          rel: 'delete',
          href: 'http://172.26.47.52/api/v1/rs-access-project/themes/102',
        },
      ],
    },
    {
      content: {
        id: 1,
        name: 'Dark',
        active: false,
        configuration: '{"mainTheme":{"palette":{"background":"","backgroundImage":"/img/background.jpg","primary2Color":"#0097A7","primary3Color":"#757575","textColor":"#FFFFFF","secondaryTextColor":"rgba(255, 255, 255, 0.7)","alternateTextColor":"#303030","canvasColor":"#00202f","borderColor":"rgba(255, 255, 255, 0.3)","disabledColor":"rgba(255, 255, 255, 0.3)","pickerHeaderColor":"rgba(255, 255, 255, 0.12)","clockCircleColor":"rgba(255, 255, 255, 0.12)","shadowColor":"rgba(0, 0, 0, 1)","accent3Color":"#ff6d00","primary1Color":"#2196f3","accent1Color":"#ff6d00","accent2Color":"#64b5f6"},"ACE-editor":{"theme":"monokai"},"components:infinite-table":{"lineHeight":50,"fixedColumnsWidth":48,"minRowCount":13,"maxRowCount":13,"minHeaderRowHeight":40,"multipleValuesSeparatorMargin":"0 10px","multipleValuesSeparatorHeight":14,"thumbnailPadding":5},"forms-extension:validation":{"validColor":"#4CAF50","warningColor":"#FF9800","errorColor":"#f44336"},"forms-extension:jsonField":{"marginTop":"8px","padding":"24px 0 12px 0","lineHeight":1,"height":"140px","showLineNumbers":true},"forms-extension:dateField":{"marginTop":"14px","innerMargins":"0 10px 0 0","height":"58px","textTop":"-13px"},"module:menu":{"background":"rgba(0, 32, 47, 0.85)","borderWidth":"0 0 1px 0","borderColor":"rgba(255, 255, 255, 0.175)","borderStyle":"solid","navigationBarMaxHeight":36,"navigationItemTextTransform":"none","separatorBorderWidth":2,"separatorBorderRadius":2,"separatorBorderStyle":"solid","separatorMargin":"12px 10px"},"module:search-results":{"minListRowCount":4,"maxListRowCount":4,"listLineHeight":160,"listRowsByColumnCount":4},"module:storage-plugins":{"usedSpaceColor":"#133e63","unusedSpaceColor":"#FFFFFF","chartBorderColor":"#94a4b2","chartBorderWidth":"1px","legendMarginTop":16,"legendItemMarginTop":8,"legendItemIconToText":10,"circleIconSize":12},"module:order-history":{"statusIconMargin":"0 7px 0 15px","color.PENDING":"#00BCD4","color.RUNNING":"white","color.WAITING_USER_DOWNLOAD":"#00BCD4","color.PAUSED":"#00BCD4","color.EXPIRED":"#9E9E9E","color.FAILED":"#f44336","color.DONE_WITH_WARNING":"#FF9800","color.DONE":"#9E9E9E","color.DELETED":"#9E9E9E","color.REMOVED":"#9E9E9E","color.UNKNOWN":"#9E9E9E","waiting.user.download.animation":"shake 3s infinite","color.file.PENDING":"#00BCD4","color.file.AVAILABLE":"white","color.file.ONLINE":"white","color.file.DOWNLOADED":"#9E9E9E","color.file.ERROR":"#f44336","color.file.UNKNOWN":"#9E9E9E","clearEmailFilterPadding":"7px 16px 7px 8px"},"components:button-anchor-scroll-top":{"iconColor":"#303030","buttonColor":"#2196f3","buttonRight":"10px","buttonBottom":"10px"},"themeName":"Dark","tableRow":{"stripeColor":"#0a415b","hoverColor":"#003047","selectedColor":"#214f6c"},"badge":{"primaryTextColor":"#FFFFFF","secondaryTextColor":"#FFFFFF","primaryColor":"#ff6d00","secondaryColor":"#2196f3"},"appBar":{"textColor":"#FFFFFF"},"tabs":{"textColor":"#fafafa","selectedTextColor":"#ff9100"},"raisedButton":{"primaryTextColor":"#fafafa","secondaryTextColor":"#fafafa","color":"#285165","disabledColor":"#184155"},"stepper":{"disabledTextColor":"#757575","textColor":"#ffffff"},"toggle":{"thumbOnColor":"#8bc34a","thumbOffColor":"#f44336","thumbDisabledColor":"#757575","trackOffColor":"#f5f5f5","trackOnColor":"#f5f5f5"},"menu":{"backgroundColor":"#00202f","containerBackgroundColor":"#00202f"},"tableHeaderColumn":{"height":48}},"alternativeTheme":{}}',
      },
      links: [
        {
          rel: 'self',
          href: 'http://172.26.47.52/api/v1/rs-access-project/themes/1',
        },
        {
          rel: 'update',
          href: 'http://172.26.47.52/api/v1/rs-access-project/themes/1',
        },
        {
          rel: 'delete',
          href: 'http://172.26.47.52/api/v1/rs-access-project/themes/1',
        },
      ],
    },
  ],
  links: [
    {
      rel: 'self',
      href: 'http://172.26.47.52/api/v1/rs-access-project/themes?page\u003d0\u0026size\u003d100',
    },
  ],
}
