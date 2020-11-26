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
 * Exports modules styles builder on current theme values
 * @author Raphaël Mechali
 */
const moduleStyles = (theme) => ({
  user: {
    // module content styles
    root: { // report parent layout
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      flexGrow: 1,
      flexShrink: 1,
    },
    content: {
      spaceConsumer: {
        flexGrow: 1,
        flexShrink: 1,
      },
      scrollContentArea: {
        paddingRight: theme.components.scrollArea.scrollingSidePadding,
      },
      table: {
        firstColumnHeader: {
          paddingLeft: theme.components.treeTable.firstLevelIndentation,
        },
        optionColumn: {
          width: theme.button.iconButtonSize,
          height: theme.button.iconButtonSize,
          padding: 0,
        },
        totalRow: {
          cell: {
            color: theme.module.orderCart.totalRowFontColor,
            fontWeight: theme.module.orderCart.totalRowFontWeight,
          },
          quotaCell: {
            container: {
              display: 'flex',
              alignItems: 'center',
            },
            icon: {
              warning: {
                color: theme.components.download.quotaWarningColor,
                marginLeft: theme.module.orderCart.textToQuotaWarningGap,
              },
              consumed: {
                color: theme.components.download.quotaConsumedColor,
                marginLeft: theme.module.orderCart.textToQuotaWarningGap,
              },
            },
          },
          processingStyle: {
            display: 'flex',
            justifyContent: 'flex-end',
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
