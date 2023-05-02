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

/**
 * Builds module style on theme
 */
export default (theme) => ({
  downloadIcon: {
    backgroundIcon: {
      position: 'absolute',
      top: -theme.spacing.iconSize / 2, // Due to SVG container drawing way (don't want to know more?...)
      left: 0,
      width: theme.spacing.iconSize,
      height: theme.spacing.iconSize,
    },
    foregroundWarningIcon: {
      position: 'absolute',
      color: theme.components.download.quotaWarningColor,
      ...theme.components.download.foregroundWarningPlacement,
    },
    foregroundConsumedIcon: {
      position: 'absolute',
      color: theme.components.download.quotaConsumedColor,
      ...theme.components.download.foregroundWarningPlacement,
    },
  },
  pluginServiceDialog: {
    widthPercent: 70,
    heightPercent: 68,
    commonBodyStyles: {
      borderWidth: '1px 0 0 0',
      borderColor: theme.toolbar.separatorColor,
      borderStyle: 'solid',
      padding: '16px',
    },
    resultsBodyStyle: { // different style to enhance the available view area size
      borderWidth: '1px 0 0 0',
      borderColor: theme.toolbar.separatorColor,
      borderStyle: 'solid',
      padding: '0',
    },
    parameterPresentation: {
      display: 'flex',
      flexDirection: 'row',
    },
    selectPluginField: {
      display: 'flex',
      alignItems: 'center',
    },
    selectHelpPluginField: {
      marginTop: '12px',
    },
    maxFilesInputStyle: {
      display: 'flex',
      justifyContent: 'end',
      marginTop: '10px',
      color: theme.palette.primary1Color,
    },
    parameterDescriptionIcon: {
      marginTop: '12px',
    },
    removeProcessingButton: {
      color: 'red',
    },
    disabledRemoveProcessingButton: {
      color: 'red',
    },
    openButtonStyle: {
      width: '100%',
      textAlign: 'left',
    },
    iconStyle: {
      height: '20px',
      width: '20px',
    },
    labelStyle: {
      fontSize: '13px',
    },
    warningMessageStyle: {
      mainMessageDivStyle: {
        display: 'flex',
        alignItems: 'center',
      },
      messageTextStyle: {
        marginLeft: '10px',
        color: theme.formsExtensions.validation.warningColor,
      },
      warningIconStyle: {
        color: theme.formsExtensions.validation.warningColor,
      },
    },
  },
  description: {
    markdownView: {
      width: '100%',
      height: '100%',
    },
  },
})
