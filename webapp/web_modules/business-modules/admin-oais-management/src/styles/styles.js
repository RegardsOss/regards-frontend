/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

const aipManagementStyles = (theme) => ({
  import: {
    errorColor: theme.formsExtensions.validation.errorColor,
    validColor: theme.formsExtensions.validation.validColor,
  },
  displayBlock: {
    display: 'block',
  },
  displayNone: {
    display: 'none',
  },
  filter: {
    fieldStyle: {
      width: '190px',
      margin: '0px 10px',
    },
    dateStyle: {
      width: '120px',
      margin: '0px 10px',
    },
    autocomplete: {
      marginRight: '10px',
      marginLeft: '10px',
    },
  },
  session: {
    error: {
      rowColumnStyle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '80%',
      },
      iconContainerStyle: {
        width: '25%',
      },
      textStyle: {
        width: '75%',
      },
      iconStyle: {
        color: '#f44336',
      },
    },
  },
  aipDetailsStyle: {
    height: '300px',
    width: '100%',
  },
  sipDetailsStyle: {
    height: '300px',
    width: '100%',
  },
  dataFileLinkStyle: {
    fontSize: '1.2em',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  manageTags: {
    subtitle: {
      paddingLeft: 0,
    },
    tagsChipWrapper: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    tagsSeparator: {
      margin: '10px 0px',
    },
    formInput: {
      display: 'flex',
      alignItems: 'center',
    },
  },
  aips: {
    selectStorageDialog: {
      title: {
        fontSize: theme.dialog.titleFontSize,
      },
      subtitle: {
        fontSize: theme.dialog.bodyFontSize,
        lineHeight: 1,
      },
    },
  },
  sipSubmition: {
    link: {
      color: theme.palette.accent1Color,
    },
  },
  noteStyle: {
    color: theme.palette.accent1Color,
  },
  summary: {
    granted: {
      mainMessage: {
        display: 'flex',
        alignItems: 'center',
        fontWeight: 500,
      },
      icon: {
        valid: {
          color: theme.formsExtensions.validation.validColor,
          marginRight: 10,
        },
        info: {
          color: theme.formsExtensions.validation.infoColor,
          marginRight: 10,
        },
      },
    },
    denied: {
      mainMessage: {
        marginTop: 15,
        display: 'flex',
        alignItems: 'center',
        fontWeight: 500,
      },
      icon: {
        color: theme.formsExtensions.validation.errorColor,
        marginRight: 10,
      },
      featureErrorMessage: {
        marginLeft: theme.spacing.iconSize + 10,
        marginBottom: 5,
      },
    },
    gotoSubmission: {
      marginLeft: 20,
    },
  },
  switchButton: {
    color: theme.palette.accent1Color,
  },
  aipModifyDialog: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  aipModifyDialogList: {
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 1,
    flexGrow: 1,
    flexBasis: 0,
    minWidth: 0,
  },
  aipModifyDialogSectionTable: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    minWidth: 0,
  },
  aipModifyDialogSectionTableSeparator: {
    margin: '0 20px 0 20px',
    background: theme.toolbar.separatorColor,
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 1,
  },
  aipModifyDialogAddButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '10px',
  },
  requests: {
    status: {
      common: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      waitingAction: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: theme.palette.accent1Color,
        animation: 'shake 3s infinite',
        cursor: 'pointer',
      },
      action: {
        marginLeft: 10,
      },
    },
    selectionDialog: {
      headerMessage: {
        // fontSize: theme.raisedButton.fontSize,
        color: theme.palette.secondaryTextColor,
        lineHeight: `${theme.radioButton.size}px`,
        marginBottom: theme.radioButton.size,
      },
      asyncInfo: {
        fontStyle: 'italic',
      },
    },
  },
})

export default aipManagementStyles
