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
 * Exports modules styles builder on current theme values
 * @author Raphaël Mechali
 */
const moduleStyles = (theme) => ({
  user: {
    // module content styles
    import: {
      buttonStyle: {
        boxShadow: 'none',
      },
    },
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
          columnButtonStyle: {
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
        warningMessageStyle: {
          mainMessageDivStyle: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: '15px',
          },
          messageTextStyle: {
            marginLeft: '10px',
            color: theme.formsExtensions.validation.warningColor,
          },
          warningIconStyle: {
            color: theme.formsExtensions.validation.warningColor,
          },
        },
        fileFiltersStyle: {
          dialogStyle: {
            dialogHeightPercent: 100,
            maxHeight: 360,
            dialogWidthPercent: 50,
          },
          fieldsFiltersStyle: {
            width: '100%',
          },
          deleteButtonStyle: {
            color: 'red',
          },
          lineStyle: {
            height: '50%',
            display: 'flex',
            alignItems: 'center',
            padding: '3px',
          },
          mainDivStyle: {
            display: 'flex',
            flexDirection: 'column',
            height: '39px',
            justifyContent: 'center',
            padding: '0px 3px 3px 3px',
          },
          pStyle: {
            color: 'rgb(230, 81, 0)',
            marginRight: '2px',
          },
          pValueStyle: {
            textOverflow: 'ellipsis',
            overflow: 'hidden',
          },
          iconStyle: {
            height: '20px',
            width: '20px',
          },
          labelStyle: {
            fontSize: '13px',
          },
          buttonStyle: {
            width: '100%',
            textAlign: 'left',
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
    dragOrderMainDivStyle: {
      minHeight: '800px',
      display: 'flex',
    },
  },
})

export default moduleStyles
