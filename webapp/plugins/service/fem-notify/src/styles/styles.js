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
 **/

/**
 * Styles for plugin
 * @param theme Material UI theme, can be used to compute dynamic style values from current theme (automatically updated)
 * @author C-S
 */
export default function buildServiceStyles(theme) {
  return {
    // the document styles
    confirmTitleStyle: {
      fontSize: '21px',
    },
    messageDivStyle: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      rowGap: '15px',
    },
    messageButtonStyle: {
      display: 'flex',
      flexDirection: 'row',
      columnGap: '2px',
    },
    messageIconStyle: {
      marginBottom: '7px',
    },
    mainDivStyle: {
      display: 'flex',
      flexDirection: 'column',
      height: '95%',
      alignItems: 'center',
      paddingLeft: '20px',
      paddingRight: '20px',
      paddingBottom: '5px',
    },
    topBlocStyle: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    },
    titleStyle: {
      height: '19px',
      textAlign: 'center',
      width: '100%',
      color: theme.palette.textColor,
      paddingLeft: '5px',
    },
    subTitleStyle: {
      paddingLeft: '5px',
      paddingRight: '5px',
      textAlign: 'left',
      width: '100%',
      marginBottom: '10px',
    },
    bottomBlocStyle: {
      display: 'flex',
      justifyContent: 'center',
      paddingLeft: '5px',
      paddingRight: '5px',
      width: '100%',
      flexDirection: 'column',
    },
    headerTableStyle: {
      width: '100%',
      borderTop: '1px solid rgba(255, 255, 255, 0.3)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
    },
    scrollAreaStyle: {
      maxHeight: '285px',
      height: '100%',
      width: '100%',
      marginBottom: '5px',
    },
    selectableListStyle: {
      width: '100%',
      paddingTop: '0px',
      paddingBottom: '0px',
    },
    lineStyle: {
      width: '100%',
      backgroundColor: 'rgb(33 33 33)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
    },
    lineAltStyle: {
      width: '100%',
      backgroundColor: 'rgb(48 48 48)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
    },
    buttonDivStyle: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      marginTop: '10px',
    },
    lineDivStyle: {
      width: '100%',
      display: 'flex',
      flexDirection: 'line',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
    },
    lineCheckBoxStyle: {
      textAlign: 'left',
    },
    lineLabelStyle: {
      width: '30%',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    lineHeaderLabelStyle: {
      width: '30%',
      color: theme.palette.accent1Color,
      fontWeight: 'bold',
    },
    lineDescriptionStyle: {
      width: '65%',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    lineHeaderDescriptionStyle: {
      width: '65%',
      color: theme.palette.accent1Color,
      fontWeight: 'bold',
    },
  }
}
