/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import reduce from 'lodash/reduce'

/**
 * Default available types of container for layout configuration
 * @author Sébastien Binda
 */
export const ALL_CONTAINERS = {
  /**
   * Default application main container.
   */
  MainContainer: {
    inUserApp: false,
    dynamicOnly: false,
    classes: [],
    styles: {
      backgroundColor: 'transparent',
      // background: "url('/img/background.jpg') top right no-repeat",
      backgroundAttachment: 'fixed',
      backgroundSize: 'cover',
      paddingRight: '1px', // Quick fix for bootstrap grid .row
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    },
  },
  FormMainContainer: {
    inUserApp: false,
    dynamicOnly: false,
    classes: [],
    styles: {
      backgroundColor: 'transparent',
      // background: "url('/img/background.jpg') top right no-repeat",
      backgroundAttachment: 'fixed',
      backgroundSize: 'cover',
      paddingRight: '1px', // Quick fix for bootstrap grid .row
      display: 'flex',
      flexDirection: 'column',
    },
  },
  /**
   * Row container to display a responsive row.
   */
  RowContainer: {
    inUserApp: true,
    dynamicOnly: false,
    i18nKey: 'container.type.row.container',
    classes: ['row'],
    styles: {
      margin: 0,
      flexShrink: 0,
      flexGrow: 0,
    },
  },
  ContentRowContainer: {
    inUserApp: true,
    dynamicOnly: true, // should not be provided to form layout and such
    i18nKey: 'container.type.content.row.container',
    classes: ['row'],
    styles: {
      margin: 0,
      flexShrink: 1,
      flexGrow: 1,
      display: 'flex',
      alignItems: 'stretch',
      flexDirection: 'column',
    },
  },
  /**
   * Column container to display full width responsive column
   */
  ColumnContainer100PercentWidth: {
    inUserApp: true,
    dynamicOnly: false,
    i18nKey: 'container.type.content.column.100.percent.container',
    classes: ['col-sm-98', 'col-sm-offset-1'],
    styles: {
      marginBottom: '1px',
    },
  },
  /**
 * Column container to display a large responsive column.
 */
  ColumnContainer75PercentWidth: {
    inUserApp: true,
    dynamicOnly: false,
    i18nKey: 'container.type.content.column.75.percent.container',
    classes: ['col-sm-75'],
    styles: {
      margin: '1px',
    },
  },
  /**
   * Column container to display a middle-sized responsive column.
   */
  ColumnContainer50PercentWidth: {
    inUserApp: true,
    dynamicOnly: false,
    i18nKey: 'container.type.content.column.50.percent.container',
    classes: ['col-sm-48'],
    styles: {
      margin: '1px',
    },
  },
  /**
   * Column container to display a small responsive column.
   */
  ColumnContainer25PercentWidth: {
    inUserApp: true,
    dynamicOnly: false,
    i18nKey: 'container.type.content.column.25.percent.container',
    classes: ['col-sm-23'],
    styles: {
      margin: '1px',
    },
  },
}

/** Store filter map of static containers */
export const STATIC_CONTAINERS = reduce(ALL_CONTAINERS, (acc, value, key) => value.dynamicOnly ? acc : {
  ...acc,
  [key]: value,
}, {})
