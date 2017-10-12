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

/**
 * Styles for menu module
 * @author Sébastien binda
 */
const menuStyles = theme => (
  {
    admin: {
      rootStyle: {
        padding: 10,
      },
    },
    user: {
      rootStyle: {
        display: 'flex',
        flexWrap: 'nowrap',
        flexDirection: 'row',
        justifyContent: 'flexStart',
        alignItems: 'center',
        background: theme.appBar.color,
        borderWidth: '0 0 1px 0',
        borderColor: theme.toolbar.separatorColor,
        borderStyle: 'solid',
      },
      optionsGroup: {
        flexGrow: 0,
        flexShrink: 0,
      },
      optionsLabelStyle: {
        textTransform: undefined,
      },
      titleGroup: {
        flexGrow: 1,
        flexShrink: 1,
        fontSize: theme.flatButton.fontSize,
        fontFamily: theme.fontFamily,
        textAlign: 'center',
        color: theme.palette.textColor,
        fontWeight: 'bold',
      },
      profile: {
        dialog: {
          styles: {
            padding: '0',
            overflowY: 'none',
          },
        },
        scrollArea: {
          styles: {
            height: '55vh',
          },
        },
        actions: {
          styles: {
            display: 'flex',
            justifyContent: 'flex-end',
          },
        },
      },
    },
  })

export default menuStyles
