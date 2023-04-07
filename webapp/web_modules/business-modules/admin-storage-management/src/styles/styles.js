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
 */

/**
 * @author Sébastien Binda
 */
const storageManagementStyles = (theme) => ({
  root: {
    position: 'relative',
    paddingBottom: 20,
  },
  storageTypeListStyle: {
    marginLeft: '20px',
  },
  typeStyle: {
    color: theme.palette.accent1Color,
  },
  securityTester: {
    style: {
      display: 'flex',
      alignItems: 'center',
    },
    iconStyle: {
      padding: '16px 0 16px 16px',
      height: 50,
      width: 50,
      boxSizing: 'content-box',
    },
    textCardStyle: {
      flexGrow: 1,
      flexShrink: 1,
    },
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
  storageTable: {
    nbFilesStoredStyle: {
      container: {
        display: 'flex',
        alignItems: 'center',
      },
      iconStyle: {
        color: theme.formsExtensions.validation.validColor,
      },
    },
    percentageColumn: {
      percentage: {
        position: 'absolute',
        left: '0px',
        top: '0px',
        zIndex: '1',
        height: 'calc(100% - 1px)',
      },
      container: {
        background: 'rgb(155, 155, 155)',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      size: {
        position: 'relative',
        zIndex: '2',
      },
    },
    errorColumn: {
      container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      icon: {
        padding: 0,
        margin: 0,
      },
    },
    dialog: {
      messageDiv: {
        marginBottom: '10px',
      },
      warning: {
        color: theme.palette.accent1Color,
      },
    },
  },
  dropdown: {
    minWidth: '300px',
  },
  settings: {
    settingDiv: {
      display: 'flex',
    },
    settingTitleStyle: {
      marginLeft: '64px',
      fontSize: '1.2em',
    },
    settingTitleAltStyle: {
      marginLeft: '64px',
      marginTop: '20px',
      fontSize: '1.2em',
    },
  },
})

export default storageManagementStyles
