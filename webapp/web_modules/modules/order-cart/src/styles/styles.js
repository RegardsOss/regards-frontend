/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 * Exports modules styles builder on current theme values
 * @author Raphaël Mechali
 */
const moduleStyles = theme => ({
  user: {
    // module content styles
    content: {
      table: {
        optionColumn: {
          style: {
            width: theme.button.iconButtonSize,
            height: theme.button.iconButtonSize,
            padding: 0,
          },
        },
        objectsCountRender: {
          style: {
            display: 'flex',
            alignItems: 'center',
          },
          numberTextStyle: {
            marginRight: theme.spacing.iconSize / 2,
          },
        },
      },
      detail: {
        widthPercent: 80,
        heightPercent: 70,
        dialogBodyStyle: { paddingBottom: 0 },
      },
    },
    header: {
      optionStyle: { marginLeft: 0, marginRight: 6 },
    },
    duplicateMessage: {
      iconButtonStyle: {
        padding: 0,
        width: theme.spacing.iconSize,
        height: theme.spacing.iconSize,
      },
      iconStyle: {
        color: theme.flatButton.secondaryTextColor,
      },
    },
  },
})

export default moduleStyles
