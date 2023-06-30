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
 */

/**
 * Module theme
 * @author Raphaël Mechali
 */
export default (theme) => ({
  openSearchCrawler: {
    queryFilters: {
      mainContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
      },
      buttonsContainer: {
        display: 'flex',
        justifyContent: 'flex-start',
        marginTop: 30,
      },
      emptyMessage: {
        color: theme.palette.secondaryTextColor,
        paddingLeft: 20,
        paddingTop: 20,
      },
      filtersTable: {
        nameColumnWidth: '10%',
        descriptionColumnWidth: '20%',
        valueColumnWidth: '40%',
        actionsColumnWidth: 48,
        fieldsStyle: {
          marginTop: -20,
          marginBottom: 10,
        },
      },
      addFilterDialog: {
        mainContainer: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'stretch',
          minHeight: '50vh',
          maxHeight: '50vh',
        },
        listContainer: {
          flexGrow: 1,
          flexBasis: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          overflowY: 'auto',
          paddingRight: 20,
        },
        descriptionContainer: {
          flexGrow: 2,
          flexBasis: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          overflowY: 'auto',
          paddingLeft: 20,
        },
        descriptionFieldLabel: {
          color: theme.palette.accent1Color,
          display: 'inline',
        },
        descriptionFieldValue: {
          color: theme.palette.textColor,
          paddingTop: 10,
          paddingBottom: 15,
        },
        descriptionOptionsList: {
          paddingTop: 10,
          paddingLeft: 20,
          color: theme.palette.textColor,
        },
        // descriptionOptionsBullet: {

        // },
        noSelectionMessage: {
          color: theme.palette.secondaryTextColor,
        },
      },
    },
    resultsMapping: {
      inputContainer: {
        display: 'flex',
        flexDirection: 'column',
      },
      title: {
        paddingTop: 50,
      },
    },
  },
  pickDatsource: {
    pluginWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '33%',
    },
    styleIcon: {
      height: 108,
      width: 108,
      margin: '30px 0px',
    },
    styleButton: {
      margin: '30px 0px',
    },
    contentWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      marginTop: '20px',
      marginLeft: '15px',
      flexWrap: 'wrap',
      textAlign: 'center',
    },
  },

})
