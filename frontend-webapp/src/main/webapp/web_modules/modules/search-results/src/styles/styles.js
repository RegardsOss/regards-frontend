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
 * Styles for form module
 * @author Sébastien binda
 */
const formStyles = theme => ({
  configuration: {
    topOptions: {
      styles: {
        padding: '0 0 15px 15px',
      },
    },
  },
  criteria: {
    label: {
      marginRight: 20,
    },
  },
  user: {
    cardTitle: {
      padding: '0',
    },
    searchButtonContainer: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
    },
    searchButton: {
      marginTop: 10,
      width: 200,
    },
    selectionService: {
      iconStyles: {
        height: '24px',
        width: '24px',
      },
    },
    optionsStyles: {
      rootStyles: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        flexGrow: 1,
        flexShrink: 1,
      },
      buttonStyles: {
        width: 34,
        height: 24,
        padding: 0,
      },
      iconStyles: {
        width: 24,
        height: 24,
      },
    },
    filters: {
      style: {
        margin: '0 5px',
      },
    },
    listViewStyles: {
      cell: {
        backgroundColor: theme.palette.canvasColor,
        textAlign: 'left',
      },
      line: {
        marginTop: 10,
        display: 'flex',
        flexFlow: 'column wrap',
        alignContent: 'stretch',
        alignItems: 'flex-start',
        maxHeight: 90,
      },
      lineHover: {
        height: '100%',
        width: '100%',
        margin: 'auto',
        cursor: 'auto',
        backgroundColor: theme.tableRow.hoverColor,
      },
      lineOut: {
        height: '100%',
        width: '100%',
        margin: 'auto',
        cursor: 'auto',
        backgroundColor: theme.tableRow.stripeColor,
      },
      title: {
        rootStyles: { display: 'flex', alignItems: 'center' },
        checkboxStyles: { margin: '0 0 0 6px', width: 'auto' },
        labelStyles: { margin: '0 10px 0 6px' },
        optionsBarStyles: { display: 'flex', right: 16, position: 'absolute' },
        option: {
          buttonStyles: {
            width: 24,
            height: 24,
            padding: 0,
            marginLeft: 12,
          },
          iconStyles: {
            width: 24,
            height: 24,
          },
        },
      },
      thumbnail: {
        display: 'inline-block',
        marginTop: 5,
      },
      attribute: {
        marginLeft: 10,
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        display: 'flex',
        alignItems: 'flex-end',
      },
      attributeLabel: {
        color: theme.palette.accent1Color,
        maxWidth: 150,
        minWidth: 50,
      },
      attributeValue: {
        maxWidth: 250,
      },
    },
    options: {
      selection: {
        service: {
          iconSize: 24,
        },
      },
      more: {
        service: {
          iconSize: 24,
        },
      },
    },
  },
  resultsButtonsType: {
    buttonsGroup: {
      top: 0,
      position: 'fixed',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      zIndex: 1000,
    },
    buttons: {
      display: 'flex',
      flexDirection: 'column',
    },
  },
})

export default formStyles
