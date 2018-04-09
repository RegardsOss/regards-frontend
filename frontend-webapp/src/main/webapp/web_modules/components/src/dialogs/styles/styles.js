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
 * Styles dialog components
 * @param theme
 * @author Raphaël Mechali
 */
const styles = theme => ({
  loading: {
    styles: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      flexGrow: 1,
      flexShrink: 1,
    },
    progressSize: 256,
    messageStyles: { marginTop: '2em' },
  },
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
})

export default styles
