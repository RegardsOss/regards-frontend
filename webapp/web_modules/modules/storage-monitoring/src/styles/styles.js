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
 */

const styles = theme => ({
  admin: {
    // in admin mode, we replace the root to not be limited in height
    root: {
      style: {
        flexGrow: 1,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        minHeight: '66vh',
      },
    },
    pluginCard: {
      classes: 'col-lg-33 col-md-45 col-xs-80',
    },
  },
  user: {
    // root container style
    root: {
      style: {
        flexGrow: 1,
        flexShrink: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
      },
    },
    scollContentArea: {
      style: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        alignItems: 'stretch',
        paddingRight: theme.components.scrollArea.scrollingSidePadding,
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
            usedSizeColor: theme.module.storagePlugins.usedSpaceColor,
            unusedSizeColor: theme.module.storagePlugins.unusedSpaceColor,
            borderColor: theme.module.storagePlugins.chartBorderColor,
            borderWidth: theme.module.storagePlugins.chartBorderWidth,
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
            marginTop: theme.module.storagePlugins.legendMarginTop,
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
            marginTop: theme.module.storagePlugins.legendItemMarginTop,
          },
          legendIcon: {
            style: {
              width: theme.module.storagePlugins.circleIconSize,
              height: theme.module.storagePlugins.circleIconSize,
            },
            svgData: {
              center: theme.module.storagePlugins.circleIconSize / 2,
              radius: (theme.module.storagePlugins.circleIconSize / 2) - 1,
            },
          },
          itemLabelStyle: {
            lineHeight: 1,
            paddingLeft: theme.module.storagePlugins.legendItemIconToText,
          },
        },
      },
    },
  },

})

export default styles
