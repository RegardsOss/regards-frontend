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
const styles = theme => ({
  card: {
    classes: 'col-lg-24 col-md-32 col-xs-48',
    root: {
      margin: '10px 0 0 10px',
    },
    media: {
      paddingBottom: '10px',
    },
  },
  table: {
    header: {
      borderBottom: 'none',
    },
    body: {
      marginBottom: '10px',
    },
    row: {
      height: '22px',
    },
    firstColumn: {
      paddingLeft: '18px',
    },
  },
  chart: {
    root: {
      marginTop: '10px',
    },
    curves: {
      usedSizeColor: '#7EA5C9',
      unusedSizeColor: '#F0F0F0',
    },
    legend: {
      position: 'right',
    },
  },
})

export default styles
