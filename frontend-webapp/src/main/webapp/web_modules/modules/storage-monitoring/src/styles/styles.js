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
        },
        table: {
          rootStyle: {
            flexGrow: 1,
            flexShrink: 0,
            marginBottom: theme[MODULE_THEME_KEY].tableRowHeight,
            paddingBottom: theme[MODULE_THEME_KEY].tableRowHeight,
            borderColor: theme.toolbar.separatorColor,
            borderWidth: '0 0 1px 0',
            borderStyle: 'solid',
          },
          headerRow: {
            height: theme[MODULE_THEME_KEY].tableRowHeight,
          },
          row: {
            height: theme[MODULE_THEME_KEY].tableRowHeight,
          },
          cell: {
            height: theme[MODULE_THEME_KEY].tableRowHeight,
            padding: theme[MODULE_THEME_KEY].tableCellPadding,
          },
        },
        chart: {
          curves: {
            usedSizeColor: theme[MODULE_THEME_KEY].usedSpaceColor,
            unusedSizeColor: theme[MODULE_THEME_KEY].unusedSpaceColor,
            borderColor: theme[MODULE_THEME_KEY].chartBorderColor,
            borderWidth: theme[MODULE_THEME_KEY].chartBorderWidth,
          },
          options: {
            segmentShowStroke: false,
            legend: {
              position: 'right',
              labels: {
                fontColor: theme.card.subtitleColor,
              },
            },
          },
        },
      },
    },
  },

})

export default styles
