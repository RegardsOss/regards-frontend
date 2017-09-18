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
 * Exports modules styles builder on current theme values
 * @author Raphaël Mechali
 */
const moduleStyles = theme => ({
  user: {
    // root card container
    styles: {
      margin: '0 0 10px 0',
    },
    // module content styles
    content: {
      styles: {
        borderStyle: 'solid',
        borderWidth: '1px 0 0 0',
        borderColor: theme.toolbar.separatorColor,
        padding: 5,
      },
      table: {
        optionColumn: {
          style: {
            width: 48,
            height: 48,
            padding: 0,
          },
        },
      },
    },
    // module header styles
    header: {
      styles: {
        background: theme.palette.canvasColor,
        height: '', // remove useless MUI height there!
      },
      firstToolbarGroup: {
        styles: {
          flexGrow: 1,
        },
      },
      cardTitle: {
        styles: {
          padding: '10px',
        },
        titleStyles: {
          lineHeight: '', // remove wrong height!
          padding: '0 0 5px 0',
        },
      },
      options: {
        styles: { marginLeft: 0, marginRight: 6 },
        separator: { styles: { marginLeft: 6, marginRight: 12 } },
      },
    },
  },
})

export default moduleStyles
