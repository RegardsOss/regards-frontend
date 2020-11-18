/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 * Builds module style on theme
 */
export default (theme) => ({
  pluginServiceDialog: {
    widthPercent: 70,
    heightPercent: 68,
    commonBodyStyles: {
      borderWidth: '1px 0 0 0',
      borderColor: theme.toolbar.separatorColor,
      borderStyle: 'solid',
      padding: '16px',
    },
    resultsBodyStyle: { // different style to enhance the available view area size
      borderWidth: '1px 0 0 0',
      borderColor: theme.toolbar.separatorColor,
      borderStyle: 'solid',
      padding: '0',
    },
    parameterPresentation: {
      display: 'flex',
      flexDirection: 'row',
    },
    parameterDescriptionIcon: {
      marginTop: '12px',
    },
    removeProcessingButton: {
      color: 'red',
    },
  },
  description: {
    markdownView: {
      width: '100%',
      height: '200px',
    },
  },
})
