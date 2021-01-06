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
 */
const styles = (theme) => (
  {
    layout: {
    },
    action: {
      display: 'flex',
      justifyContent: 'center',
    },
    linksBar: {
      display: 'flex',
      padding: '10px',
      margin: '20px 10px 10px 10px',
      justifyContent: 'space-around',
      borderWidth: '1px 0 0 0',
      borderStyle: 'solid',
      borderColor: theme.palette.borderColor,
    },
    dialog: {
      preferredWidth: '680px',
      maxFormHeight: '55vh',
      body: { padding: '0', overflowY: 'none' },
      content: {
        width: '680px',
        maxWidth: 'none',
      },
      scrollStyle: {
        height: '55vh',
      },
    },
  })

export default styles
