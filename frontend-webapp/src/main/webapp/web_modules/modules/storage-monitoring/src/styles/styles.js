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
 */

const MODULE_THEME_KEY = 'module:storage-plugins'

const styles = theme => ({
  user: {
    // root container style
    root: {
      style: {
        display: 'flex',
        flexDirection: 'horizontal',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        alignItems: 'stretch',
        paddingBottom: '10px',
      },
    },
    // plugin card and sub content styles
    pluginCard: {
      classes: 'col-lg-24 col-md-32 col-xs-48',
      root: {
        margin: '10px 0 0 10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      },
      contentStyle: {
        flexGrow: 1,
        flexShrink: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      },
      media: {
        rootStyle: {
          flexGrow: 1,
          flexShrink: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: '0 10px 10px 10px',
        },
        contentStyle: {
          flexGrow: 1,
          flexShrink: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
        },
        chart: {
          root: {
            flexGrow: 1,
            flexShrink: 1,
          },
          curves: {
            usedSizeColor: theme[MODULE_THEME_KEY].usedSpaceColor,
            unusedSizeColor: theme[MODULE_THEME_KEY].unusedSpaceColor,
            borderColor: theme[MODULE_THEME_KEY].chartBorderColor,
            borderWidth: theme[MODULE_THEME_KEY].chartBorderWidth,
          },
          options: {
            segmentShowStroke: false,
            legend: {
              display: false,
            },
            tooltips: {
              enabled: false,
            },
          },
        },
        legend: {
          rootContainerStyle: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            flexGrow: 0,
            flexShrink: 0,
            marginTop: theme[MODULE_THEME_KEY].legendMarginTop,
          },
          firstColumnContainerStyle: {
            flexGrow: 1,
            flexShrink: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          },
          secondColumnContainerStyle: {
            flexGrow: 1,
            flexShrink: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
          },
          itemRootContainerStyle: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginTop: theme[MODULE_THEME_KEY].legendItemMarginTop,
          },
          legendIcon: {
            style: {
              width: theme[MODULE_THEME_KEY].circleIconSize,
              height: theme[MODULE_THEME_KEY].circleIconSize,
            },
            svgData: {
              center: theme[MODULE_THEME_KEY].circleIconSize / 2,
              radius: (theme[MODULE_THEME_KEY].circleIconSize / 2) - 1,
            },
          },
          itemLabelStyle: {
            lineHeight: 1,
            paddingLeft: theme[MODULE_THEME_KEY].legendItemIconToText,
          },
        },
      },
    },
  },

})

export default styles
