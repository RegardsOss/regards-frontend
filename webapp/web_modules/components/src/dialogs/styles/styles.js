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
 * Styles dialog components
 * @param theme
 * @author Raphaël Mechali
 * @author Théo Lasserre
 */
const styles = (theme) => ({
  dialogCommon: {
    actionsContainerStyle: {
      backgroundColor: theme.palette.canvasColor,
      borderWidth: '1px 0 0 0',
      borderColor: theme.toolbar.separatorColor,
      borderStyle: 'solid',
    },
  },
  positionedDialog: {
    paperProps: {
      style: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
      },
    },
    bodyStyle: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      flexGrow: 1,
    },
  },
  fitContentDialog: {
    paperProps: {
      style: {
        height: '100%',
        display: 'table',
      },
    },
    contentStyle: {
      display: 'table',
      width: 'auto',
    },
  },
  urlContentDialog: {
    bodyStyle: {
      padding: 0,
    },
  },
  browserChecker: {
    contentStyle: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'stretch',
      padding: `0 ${theme.spacing.desktopGutter}px 12px ${theme.spacing.desktopGutter}px`,
    },
    messageStyle: {
      flexGrow: 1,
      paddingBottom: theme.spacing.desktopGutter,
    },
    actionsStyle: {
      flexGrow: 0,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    checkboxStyle: {
      maxWidth: '60%',
    },
  },
  helpDialog: {
    iconStyle: {
      height: '23px',
      width: '23px',
    },
    buttonStyle: {
      paddingTop: '14px',
      height: '30px',
      width: '30px',
    },
    linkDivStyle: {
      paddingTop: '10px',
    },
    linkStyle: {
      color: theme.palette.textColor,
    },
  },
})

export default styles
