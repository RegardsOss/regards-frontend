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

/**
 * Default available types of container for layout configuration
 * @author Sébastien Binda
 */
export default {
  /**
   * Default application main container.
   */
  MainContainer: {
    classes: [],
    styles: {
      backgroundColor: 'transparent',
      // background: "url('/img/background.jpg') top right no-repeat",
      backgroundAttachment: 'fixed',
      backgroundSize: 'cover',
      paddingRight: '1px', // Quick fix for bootstrap grid .row
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    },
  },

  /**
   * Row container to display a responsive row.
   */
  RowContainer: {
    classes: ['row'],
    styles: {
      margin: 0,
      flexShrink: 0,
      flexGrow: 0,
    },
  },

  ContentRowContainer: {
    classes: ['row'],
    styles: {
      margin: 0,
      flexShrink: 1,
      flexGrow: 1,
    },
  },

  /**
   * Full width column
   */
  FullWidthColumnContainer: {
    classes: ['col-sm-98', 'col-sm-offset-1'],
    styles: {
      marginBottom: '1px',
    },
  },
  /**
   * Column container to display a large responsive column.
   */
  '50PercentColumnContainer': {
    classes: ['col-sm-48'],
    styles: {
      margin: '1px',
    },
  },
  /**
   * Column container to display a large responsive column.
   */
  LargeColumnContainer: {
    classes: ['col-sm-75'],
    styles: {
      margin: '1px',
    },
  },
  /**
   * Column container to display a small responsive column.
   */
  SmallColumnContainer: {
    classes: ['col-sm-23'],
    styles: {
      margin: '1px',
    },
  },
}
