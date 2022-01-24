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
 * Styles dialog components
 * @param theme
 * @author Raphaël Mechali
 * @author Théo Lasserre
 */
const styles = (theme) => ({
  dragAndDropMapStyle: {
    dropDivStyle: {
      backgroundColor: 'rgba(89, 91, 96, 0.7)',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 9999,
    },
    dropTextStyle: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      textAlign: 'center',
    },
    dropTitleStyle: {
      fontWeight: 500,
      marginBottom: '40px',
      fontSize: '20px',
    },
    dropSubtitleStyle: {
      fontSize: '25px',
    },
    dropIconStyle: {
      height: '80px',
      width: '70px',
    },
  },
  dragAndDropCriterionStyle: {
    dropDivStyle: {
      backgroundColor: 'rgba(89, 91, 96, 0.7)',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 9999,
    },
    dropTextStyle: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      textAlign: 'center',
    },
    dropTitleStyle: {
      fontWeight: 500,
      fontSize: '15px',
    },
    dropSubtitleStyle: {
      fontSize: '15px',
    },
    dropIconStyle: {
      height: '55px',
      width: '50px',
      marginRight: '10px',
    },
  },
})

export default styles
