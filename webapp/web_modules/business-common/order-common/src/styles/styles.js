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
    statusLabelStyle: {
      marginBottom: '5px',
    },
    statusLabelContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
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
      marginRight: '10px',
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
})
