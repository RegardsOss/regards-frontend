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

export default (theme) => ({
  inErrorCell: {
    color: theme.formsExtensions.validation.errorColor,
    fontWeight: 'bolder',
  },
  validCell: {
    color: theme.palette.textColor,
    fontWeight: 'normal',
  },
  downloadWithCount: {
    iconButton: {
      style: { padding: 0 },
      iconStyle: { position: 'relative', width: theme.button.iconButtonSize, height: theme.button.iconButtonSize },
    },
    overlay: {
      style: {
        position: 'absolute',
        top: 5 * theme.button.iconButtonSize / 9,
        left: 5 * theme.button.iconButtonSize / 9,
        zIndex: '1',
      },
      chip: {
        style: {
          backgroundColor: theme.palette.accent1Color,
        },
        labelStyle: {
          padding: '1px 3px',
          lineHeight: undefined,
        },
      },
    },
    icon: {
      style: { position: 'absolute', left: theme.spacing.iconSize / 2, top: theme.spacing.iconSize / 2 },
    },
  },
  progressBarModuleStyle: {
    progressBarContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
    },
    statusContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '10px',
      width: '100%',
    },
    percentAdminLabelStyle: {
      display: 'block',
      position: 'relative',
      marginTop: '-17px',
    },
    percentUserLabelStyle: {
      display: 'block',
      position: 'relative',
      marginTop: '-18px',
    },
    expirationIconContainer: {
      flex: '0 0 25px',
    },
    expirationIconStyle: {
      height: '20px',
      width: '20px',
      color: theme.module.orderHistory.secondaryStatut.expirationIconColor,
    },
    expiredIconStyle: {
      height: '20px',
      width: '20px',
      color: theme.module.orderHistory.secondaryStatut.expiredIconColor,
    },
    progressBarStatut: {
      flex: '1 1 auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: '30px',
    },
    statusIconStyle: {
      marginLeft: '-30px',
      marginRight: '7px',
    },
    progressBarOutline: {
      width: '179px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '5px',
      marginLeft: '5px',
    },
    progressBarStyle: {
      backgroundColor: '#1a1a1a',
      height: '20px',
      width: '175px',
      borderRadius: '5px',
      backgroundSize: '30px 30px',
      backgroundImage: `linear-gradient(
        135deg,
        rgba(255, 255, 255, .15) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, .15) 50%,
        rgba(255, 255, 255, .15) 75%,
        transparent 75%,
        transparent
    )`,
    },
    progressBarContentStyle: {
      display: 'block',
      height: '20px',
      backgroundColor: theme.palette.primary1Color,
      position: 'relative',
      borderRadius: '5px',
      padding: '0px 0px 0px 0px',
    },
  },
  orderProcessingListStyle: {
    dialogContentStyle: {
      display: 'flex',
      alignItems: 'center',
      height: '100%',
    },
    middleBarStyle: {
      borderLeft: `1px solid ${theme.palette.accent3Color}`,
      display: 'inline-block',
      height: '90%',
      margin: '0% 1.5%',
    },
    rightPaneStyle: {
      width: '74.25%',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    },
    rightPaneTitleStyle: {
      color: theme.palette.accent3Color,
      height: '19px',
    },
    leftPaneTitleStyle: {
      height: '19px',
    },
    scrollAreaStyle: {
      maxHeight: '488px',
      flexGrow: 1,
      height: '100%',
    },
    globalTextStyle: {
      width: '100%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    leftPaneStyle: {
      width: '24.25%',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    },
    selectedDatasetStyle: {
      color: theme.palette.accent3Color,
    },
  },
  orderFileFiltersStyle: {
    mainDivStyle: {
      display: 'flex',
      flexDirection: 'column',
      height: '44px',
      justifyContent: 'center',
      width: '100%',
      fontSize: '14px',
      alignItems: 'center',
    },
    lineDivStyle: {
      height: '50%',
      display: 'flex',
      alignItems: 'center',
    },
    lineLabelStyle: {
      color: 'rgb(230, 81, 0)',
      marginRight: '3px',
    },
    lineValueStyle: {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
  },
})
