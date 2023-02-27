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
 */

import { AccessDomain } from '@regardsoss/domain'

const styles = (theme) => ({
  sessionsStyles: {
    iconColor: {
      [AccessDomain.SESSION_STATUS_ENUM.OK]: theme.sessionsMonitoring.acquiredProductRunningColor,
      [AccessDomain.SESSION_STATUS_ENUM.DELETED]: theme.formsExtensions.validation.errorColor,
      [AccessDomain.SESSION_STATUS_ENUM.ACKNOWLEDGED]: theme.tableHeaderColumn.textColor,
      [AccessDomain.SESSION_STATUS_ENUM.ERROR]: theme.formsExtensions.validation.errorColor,
    },
    smallIconButton: {
      minWidth: theme.button.iconButtonSize,
    },
    menuDropDown: {
      minWidth: '0px',
    },
    cellErrorBackground: {
      backgroundColor: 'rgba(255,0,0,0.2)',
    },
    cellDeletedBackground: {
      backgroundColor: 'rgba(102, 73, 4)',
    },
    filters: {
      autocomplete: {
        marginRight: '10px',
      },
      checkboxLabel: {
        whiteSpace: 'nowrap',
        paddingRight: '20px',
      },
    },
    cell: {
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: 0,
      height: '100%',
    },
    gridSessionCell: {
      gridSessionContainer: {
        display: 'grid',
        gridTmplateColumns: '100%',
        gridTemplateRows: '31% 69%',
        gridTemplateAreas: '"header" "infos"',
        width: '100%',
        height: '100%',
        padding: '5px 0',
      },
      headerSession: {
        gridArea: 'header',
        alignSelf: 'center',
        wordBreak: 'break-word',
      },
      infosSession: {
        gridArea: 'infos',
        alignSelf: 'end',
        justifySelf: 'right',
      },
      buttonStateContainer: {
        gridArea: 'infos',
        alignSelf: 'end',
        justifySelf: 'center',
      },
      buttonState: {
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
      },
    },
    gridCell: {
      gridContainer: {
        display: 'grid',
        gridTmplateColumns: '100%',
        gridTemplateRows: '31% 69%',
        gridTemplateAreas: '"header" "infos"',
        width: '100%',
        height: '100%',
        padding: '5px 0',
      },
      gridHeaderContainer: {
        alignSelf: 'center',
        gridArea: 'header',
        margin: '0 5px',
      },
      barGraphContainer: {
        height: '18px',
      },
      cellContainer: {
        width: '100%',
        height: '100%',
      },
      barGraph: {
        done: {
          display: 'inline-block',
          height: '100%',
          backgroundColor: theme.sessionsMonitoring.acquiredProductRunningColor,
        },
        error: {
          display: 'inline-block',
          height: '100%',
          backgroundColor: theme.formsExtensions.validation.errorColor,
        },
        pending: {
          display: 'inline-block',
          height: '100%',
          backgroundColor: 'white',
        },
      },
      infosContainer: {
        display: 'grid',
        gridTemplateColumns: 'max-content auto 10%',
        gridTemplateRows: '100%',
        gridTemplateAreas: '"list listValues menu"',
        gridArea: 'infos',
      },
      listValues: {
        display: 'grid',
        gridTemplateColumns: '100%',
        gridTemplateRows: '33,3% 33,3% 33,3%',
        gridTemplateAreas: '"one" "two" "three"',
        gridArea: 'listValues',
        textAlign: 'left',
      },
      listFourValues: {
        display: 'grid',
        gridTemplateColumns: '100%',
        gridTemplateRows: '25% 25% 25% 25%',
        gridTemplateAreas: '"one" "two" "three" "four"',
        gridArea: 'listValues',
        textAlign: 'left',
      },
      listFiveValues: {
        display: 'grid',
        gridTemplateColumns: '100%',
        gridTemplateRows: '20% 20% 20% 20% 20%',
        gridTemplateAreas: '"one" "two" "three" "four" "five"',
        gridArea: 'listValues',
        textAlign: 'left',
      },
      lineContainer: {
        display: 'grid',
        gridTemplateColumns: '100%',
        gridTemplateRows: '33,3% 33,3% 33,3%',
        gridTemplateAreas: '"one" "two" "three"',
        gridArea: 'list',
        textAlign: 'left',
      },
      lineFourContainer: {
        display: 'grid',
        gridTemplateColumns: '100%',
        gridTemplateRows: '25% 25% 25% 25%',
        gridTemplateAreas: '"one" "two" "three" "four"',
        gridArea: 'list',
        textAlign: 'left',
      },
      lineFiveContainer: {
        display: 'grid',
        gridTemplateColumns: '100%',
        gridTemplateRows: '20% 20% 20% 20% 20%',
        gridTemplateAreas: '"one" "two" "three" "four" "five"',
        gridArea: 'list',
        textAlign: 'left',
      },
      lines: {
        one: {
          alignSelf: 'center',
          gridArea: 'one',
          paddingLeft: '5px',
        },
        two: {
          alignSelf: 'center',
          gridArea: 'two',
          paddingLeft: '5px',
        },
        three: {
          alignSelf: 'center',
          gridArea: 'three',
          paddingLeft: '5px',
        },
        four: {
          alignSelf: 'center',
          gridArea: 'four',
          paddingLeft: '5px',
        },
        five: {
          alignSelf: 'center',
          gridArea: 'five',
          paddingLeft: '5px',
        },
      },
      versioningState: {
        waiting: {
          container: {
            paddingTop: '6px',
            cursor: 'pointer',
            animation: 'shake 3s infinite',
          },
          text: {
            color: theme.sessionsMonitoring.waitingVersionColor,
            display: 'inline-block',
            height: 29,
            fontWeight: 'bold',
            marginRight: 12,
          },
          iconColor: theme.palette.textColor,
        },
      },
      acquiredProductState: {
        running: {
          color: theme.sessionsMonitoring.acquiredProductRunningColor,
          display: 'inline-block',
          height: '29px',
          fontWeight: 'bold',
        },
        runningContainer: {
          paddingTop: '6px',
        },
        runningIconColor: theme.sessionsMonitoring.acquiredProductRunningColor,
      },
    },
  },
  pluginStyles: {
    display: 'flex',
    alignItems: 'baseline',
  },
  avatarStyles: {
    marginRight: 10,
  },
  storageInfos: {
    storageTabStyle: {
      marginTop: '10px',
    },
    storageTypeListStyle: {
      marginLeft: '20px',
      marginBottom: '20px',
      marginTop: '10px',
    },
    typeStyle: {
      color: theme.palette.accent1Color,
    },
  },
  productInfos: {
    errorStyle: {
      color: theme.formsExtensions.validation.errorColor,
      whiteSpace: 'pre-wrap',
      maxHeight: '200px',
      overflow: 'auto',
      margin: '0px 0px 0px 30px',
    },
    jobInfos: {
      titleStyle: {
        color: theme.palette.textColor,
        fontSize: '1.2em',
        borderBottom: '1px solid',
        borderColor: theme.palette.textColor,
        margin: '10px 0px',
      },
      fieldLabelStyle: {
        color: theme.palette.textColor,
        margin: '0px 0px 0px 8px',
      },
      stackTraceStyle: {
        whiteSpace: 'pre-wrap',
        maxHeight: '200px',
        overflow: 'auto',
        margin: '0px 0px 0px 30px',
      },
    },
  },
  metafiles: {
    layoutStyle: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      border: '1px solid',
      borderColor: theme.palette.borderColor,
    },
    titleStyle: {
      width: '100%',
    },
    contentStyle: {
      display: 'flex',
      flexDirection: 'row',
      height: '450px',
      width: '100%',
    },
    leftColumnStyle: {
      width: '18%',
      borderRight: '1px solid',
      borderColor: theme.palette.borderColor,
    },
    rightColumnStyle: {
      width: '82%',
      overflow: 'auto',
      margin: '0px 15px',
    },
    typeListStyle: {
      height: '415px',
      overflow: 'auto',
    },
  },
  chains: {
    filterButtonStyle: {
      backgroundColor: theme.palette.accent1Color,
    },
    headerActionBarStyle: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    stateStyle: {
      display: 'flex',
      alignItems: 'center',
    },
    toggles: {
      toggleContainer: {
        width: '100%',
        display: 'grid',
        gridTemplateAreas: '"label" "toggle"',
        gridTmplateColumns: '100%',
      },
      toggleModeColor: {
        backgroundColor: '#2196f3',
      },
      toggleStyle: {
        margin: 'auto',
        width: 'inherit',
      },
      toggleGridLabel: {
        gridArea: 'label',
      },
      toggleGridToggle: {
        gridArea: 'toggle',
      },
    },
    totalStyle: {
      fontSize: '1.2em',
      textDecoration: 'underline',
      color: theme.formsExtensions.validation.validColor,
      cursor: 'pointer',
    },
    errorStyle: {
      fontSize: '1.2em',
      textDecoration: 'underline',
      borderLeft: `1px solid ${theme.palette.borderColor}`,
      paddingLeft: '4px',
      marginLeft: '4px',
      color: theme.formsExtensions.validation.errorColor,
      cursor: 'pointer',
    },
    inProgressStyle: {
      fontSize: '1.2em',
      textDecoration: 'underline',
      borderLeft: `1px solid ${theme.palette.borderColor}`,
      paddingLeft: '4px',
      marginLeft: '4px',
      color: theme.formsExtensions.validation.warningColor,
      cursor: 'pointer',
    },
    productSessionLink: {
      textDecoration: 'underline',
      cursor: 'pointer',
    },
    chainJobs: {
      descriptionStyle: {
        marginBottom: '20px',
      },
      jobActivityStyle: {
        margin: '10px 0px',
      },
    },
  },
  chainForm: {
    fileInfoDirStyle: {
      width: '95%',
    },
    errorIcon: {
      color: theme.formsExtensions.validation.errorColor,
      marginRight: 10,
    },
    errorMessage: {
      color: theme.formsExtensions.validation.errorColor,
      display: 'flex',
      alignItems: 'center',
    },
    paperFlexContainer: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    papers: {
      padding: 10,
      margin: '20px',
    },
    storageTitleBar: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
    },
    storageTitle: {
      marginTop: -24,
      marginRight: 25,
      fontSize: '1.5em',
    },
    storageRepository: {
      marginTop: -15,
      marginBottom: 15,
    },
    info: {
      marginTop: '26px',
      marginBottom: '8px',
    },
    input: {
      minWidth: '400px',
      margin: '-7px 0 0 0',
    },

    checkboxesInline: {
      background: 'red',
    },
  },
  markdownDialog: {
    dialogRoot: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 0,
    },
    dialogContent: {
      position: 'relative',
      width: '80vw',
      transform: '',
    },
    bodyStyle: {
      padding: 0,
    },
    markdownView: {
      width: '100%',
      height: 450,
    },
  },
  periodicity: {
    layout: {
      display: 'flex',
    },
    field: {
      flexGrow: 1,
    },
    help: {
      width: '150px',
    },
  },
})

export default styles
