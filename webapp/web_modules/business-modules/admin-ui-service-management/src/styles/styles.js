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

/**
 * Module styles
 * @param theme
 * @author Sébastien binda
 */
const formStyles = (theme) => ({
  plugins: {
    root: {
      position: 'relative',
    },
    grid: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    tile: {
      classes: ['col-xs-50', 'col-sm-50', 'col-lg-33'].join(' '),
      styles: {
        margin: 20,
      },
    },
    gridList: {
      margin: 0,
    },
  },
  plugin: {
    line: {
      classes: 'row',
    },
    description: {
      classes: 'col-sm-70',
    },
    icon: {
      classes: 'col-sm-30',
      style: { width: '150px', height: '150px' },
    },
    editHover: theme.palette.primary1Color,
    duplicateHover: theme.palette.primary1Color,
    deleteHover: theme.palette.accent1Color,
  },
  service: {
    list: {
      optionsStyles: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
      },
    },
    form: {
      subheaderStyles: {
        paddingLeft: 0,
        margin: '35px 0 -14px 0',
      },
    },
  },
})

export default formStyles
