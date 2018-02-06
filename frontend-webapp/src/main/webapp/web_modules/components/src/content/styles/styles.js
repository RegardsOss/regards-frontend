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
* Styles for file content components
* @param theme
* @author Raphaël Mechali
*/
const styles = theme => ({
  code: {
    styles: {
      width: '100%',
      height: '100%',
    },
  },
  image: {
    containerStyles: {
      width: '100%',
      height: '100%',
      textAlign: 'center',
    },
    styles: {
      maxWidth: '100%',
      maxHeight: '100%',
      objectFit: 'contain',
    },
  },
  markdown: {
    scrollbarStyle: {
      background: '#0366d6',
      borderRadius: '3px',
      width: '6px',
    },
  },
  noPreview: {
    container: {
      display: 'flex',
      flexDirection: 'column',
      margin: 'auto',
      width: '256px',
    },
    text: { width: '256px', textAlign: 'center' },
    icon: {
      width: '256px',
    },
  },
})

export default styles
