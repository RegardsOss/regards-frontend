/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
const microserviceManagementStyles = (theme) => ({
  board: {
    block: {
      maxWidth: 250,
    },
    checkbox: {
      marginBottom: 16,
    },
  },
  plugins: {
    root: {
      position: 'relative',
      paddingBottom: 20,
    },
    moreInfoLink: {
      color: theme.palette.accent1Color,
      textDecoration: 'none',
      marginTop: 10,
    },
    grid: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    tile: {
      classes: ['col-xs-50', 'col-sm-50', 'col-lg-33'].join(' '),
      styles: {
        margin: 20,
      },
      title: {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
      },
      actionsStyles: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
      },
    },
    gridList: {
      margin: 0,
    },
    icon: {
      color: theme.palette.alternateTextColor,
    },
  },
  pluginConfiguration: {
    root: {
      position: 'relative',
    },
    card: {
      margin: '0px 20px',
    },
    cardExpanded: {
      margin: '30px 20px',
    },
    cardExpandedText: {
      borderTop: `solid 1px ${theme.palette.borderColor}`,
    },
    subheader: {
      padding: 0,
    },
    lineWrapper: {
      display: 'flex',
      flexWrap: 'nowrap',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginRight: 50,
    },
    buttonsGroupWrapper: {
      display: 'flex',
      flexWrap: 'nowrap',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    toggle: {
      width: 'auto',
      height: 'auto',
    },
    version: {
      color: theme.palette.secondaryTextColor,
      marginLeft: 7,
    },
    form: {
      section: {
        marginTop: 20,
      },
      toggle: {
        width: 'auto',
        marginTop: 14,
      },
    },
  },
  pluginParameter: {
    pluginButton: {
      marginLeft: 10,
    },
    iconMenu: {
      visibility: 'hidden',
    },
    field: {
      display: 'none',
    },
    label: {
      paddingLeft: 0,
      fontSize: 12,
      color: theme.textField.hintColor,
      width: 'initial',
      marginRight: 10,
    },
    wrapper: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
  },
  dynamicValue: {
    createdialogbuttons: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    chip: {
      marginRight: 5,
    },
  },
})

export default microserviceManagementStyles
