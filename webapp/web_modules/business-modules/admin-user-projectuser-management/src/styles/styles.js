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
  * Builds module style
  * @param {*} theme MUI theme
  * @return {*} module styles
  * @author Raphaël Mechali
  */
export default function buildStyles(theme) {
  return {
    userForm: {
      chipBackground: theme.palette.primary1Color,
      chip: {
        margin: 4,
      },
      avatarBackground: theme.palette.primary2Color,
      renderChipInput: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: 4,
      },
      groupsLabel: {
        color: theme.textField.floatingLabelColor,
        fontFamily: theme.fontFamily,
        fontSize: '0.9em',
        marginTop: 21,
        marginBottom: 7,
      },
    },
    usersList: {
      quotaCell: {
        root: {
          display: 'flex',
          alignItems: 'center',
        },
        icon: {
          warning: {
            color: theme.components.download.quotaWarningColor,
            marginLeft: 24,
          },
          consumed: {
            color: theme.components.download.quotaConsumedColor,
            marginLeft: 24,
          },
        },
      },
      quotaDialog: {
        root: {
          padding: '0 24px 12px 24px',
        },
        form: {
          root: {
            display: 'grid',
            gridTemplateColumns: 'min-content 1fr min-content',
            gridTemplateRows: 'min-content min-content min-content min-content',
            gridColumnGap: 12,
            gridRowGap: 0,
          },
          spaceConsumer: {
            gridColumn: 1,
            gridRow: 1,
          },
          maxField: {
            gridColumn: 2,
            gridRow: 1,
          },
          minusIcon: {
            width: 24,
            height: 24,
            gridColumn: 1,
            gridRow: 2,
            alignSelf: 'end',
            marginBottom: 12,
            color: theme.palette.primary1Color,
          },
          currentField: {
            gridColumn: 2,
            gridRow: 2,
          },
          equalIcon: {
            width: 24,
            height: 24,
            gridColumn: 1,
            gridRow: 3,
            alignSelf: 'end',
            marginBottom: 12,
            color: theme.palette.primary1Color,
          },
          remainingField: {
            gridColumn: 2,
            gridRow: 3,
          },
          warningIcon: {
            width: 24,
            height: 24,
            gridColumn: 3,
            gridRow: 3,
            alignSelf: 'end',
            marginBottom: 12,
            color: theme.components.download.quotaWarningColor,
          },
          consumedIcon: {
            width: 24,
            height: 24,
            gridColumn: 3,
            gridRow: 3,
            alignSelf: 'end',
            marginBottom: 12,
            color: theme.components.download.quotaConsumedColor,
          },
          unlimitedIcon: {
            width: 24,
            height: 24,
            gridColumn: 3,
            gridRow: 3,
            alignSelf: 'end',
            marginBottom: 12,
            color: theme.palette.primary2Color,
          },
          buttonsBar: {
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gridColumn: '1 / span 3',
            paddingTop: 20,
            gridRow: 4,
          },
        },
      },
      selectVisualisationModeStyle: {
        width: '340px',
        textAlign: 'center',
      },
      cardActionDivStyle: {
        display: 'flex',
        alignItems: 'center',
      },
      headerDivStyle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      actionsStyles: {
        display: 'flex',
        justifyContent: 'space-between',
      },
      filterButtonStyle: {
        backgroundColor: theme.palette.accent1Color,
      },
    },
    settings: {
      settingDiv: {
        display: 'flex',
      },
    },
  }
}
