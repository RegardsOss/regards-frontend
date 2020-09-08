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

import map from 'lodash/map'
import {
    TableHeaderOptionsArea,
    TableHeaderLine,
    TableHeaderOptionGroup,
    TableHeaderAutoCompleteFilter,
  } from '@regardsoss/components'
  import { i18nContextType } from '@regardsoss/i18n'
  import { themeContextType } from '@regardsoss/theme'
  import ProcessingMonitoringFilterFromComponent from '../filters/ProcessingMonitoringFilterFromComponent'
  import ProcessingMonitoringFilterToComponent from '../filters/ProcessingMonitoringFilterToComponent'
  import ProcessingMonitoringFilterClearComponent from '../filters/ProcessingMonitoringFilterClearComponent'
  import ProcessingMonitoringFilterApplyComponent from '../filters/ProcessingMonitoringFilterApplyComponent'
  import ProcessingMonitoringFilterToggleComponent from '../filters/ProcessingMonitoringFilterToggleComponent'
  import { ProcessingDomain } from '@regardsoss/domain'
import { SelectField } from 'material-ui'
import { MenuItem } from 'material-ui/Menu'

  /**
   * Monitoring processing list filters
   * @author Théo Lasserre
   */
  class ProcessingMonitoringFiltersComponent extends React.Component {

      static propTypes = {
        initialFilters: PropTypes.shape({
          name: PropTypes.string,
          userName: PropTypes.string,
          status: PropTypes.shape({
              SUCCESS: PropTypes.bool.isRequired,
              FAILURE: PropTypes.bool.isRequired,
              CANCELLED: PropTypes.bool.isRequired,
              TIMEDOUT: PropTypes.bool.isRequired,
              CLEANUP: PropTypes.bool.isRequired,
              RUNNING: PropTypes.bool.isRequired,
              PREPARE: PropTypes.bool.isRequired,
              REGISTERED: PropTypes.bool.isRequired,
          }),
          from: PropTypes.instanceOf(Date),
          to: PropTypes.instanceOf(Date),
      }).isRequired,
      onApplyFilters: PropTypes.func.isRequired,
      onClearFilters: PropTypes.func.isRequired,
      filtersEdited: PropTypes.bool.isRequired,
      canEmptyFilters: PropTypes.bool.isRequired,
      onChangeName: PropTypes.func.isRequired,
      onChangeUserName: PropTypes.func.isRequired,
      onChangeFrom: PropTypes.func.isRequired,
      onChangeTo: PropTypes.func.isRequired,
      onToggleStatus: PropTypes.func.isRequired,
      listEntities: PropTypes.object.isRequired,
      }

      static contextTypes = {
          ...themeContextType,
          ...i18nContextType,
      }

      /**
       * Initial state
       */
      state = {
        listEntitiesProcessName: ProcessingMonitoringFiltersComponent.getAutoCompleteFilterElements(this.props.listEntities).processNames,
        listEntitiesUserNames: ProcessingMonitoringFiltersComponent.getAutoCompleteFilterElements(this.props.listEntities).userNames,
      }

      /**
        * Return elements (process name & usernames) in order to filter on
        */
      static getAutoCompleteFilterElements(listEntities) {
        const autoCompleteElements = {
            processNames: Object.getOwnPropertyNames(listEntities),
            userNames: []
        }
        if(listEntities) {
            Object.getOwnPropertyNames(listEntities).forEach(function(key) {
            autoCompleteElements.userNames.push(listEntities[key].content.userName)
            })
        }
        return autoCompleteElements
      }

      /**
       * User updated the process name text field
       * @param {string} searchText text field value
       */
      onUpdateNameInput = (searchText = '') => {
        this.props.onChangeName(searchText)
        const newState = Object.getOwnPropertyNames(this.props.listEntities)
                              .filter(processName => processName.startsWith(searchText))
        this.setState({
          listEntitiesProcessName: newState
        })
      }

      /**
       * User updated the user name text field
       * @param {string} searchText text field value
       */
      onUpdateUserNameInput = (searchText = '') => {
          this.props.onChangeUserName(searchText)
          const listEntities = this.props.listEntities
          const userNames = []
          Object.getOwnPropertyNames(listEntities).forEach(function(key) {
            userNames.push(listEntities[key].content.userName)
          })
          if (userNames) {
            const newState = userNames.filter(userName => userName.startsWith(searchText))
            this.setState({
              listEntitiesUserNames: newState
            })
          }
      }

      /**
       * Callback: the user selected a value or typed in some text (validated with return key)
       * @param {string} test selected parameter value or validated text field value
       * @param {string} isInList did user select a strict value in list? (or did he type some unknown value)
       */
      onFilterNameSelected = (text, isInList) => {
          this.props.onChangeName(text)
      }

      /**
       * Callback: the user selected a value or typed in some text (validated with return key)
       * @param {string} test selected parameter value or validated text field value
       * @param {string} isInList did user select a strict value in list? (or did he type some unknown value)
       */
      onFilterUserNameSelected = (text, isInList) => {
          this.props.onChangeUserName(text)
      }

      prepareHints = (element) => ({ id: element, text: element, value: element })
      // filters : {
      //   name: "ma chaine", 
      //   userName: "mon user qui a lance",
        // status : {
        //   attr: true,
        // }
      // }
      render() {
          const {
              filtersEdited, onApplyFilters, onClearFilters, canEmptyFilters,
              onChangeTo, onChangeFrom,
              initialFilters: {
                name, userName, status, from, to,
              }
          } = this.props
          const {
            listEntitiesProcessName, listEntitiesUserNames
          } = this.state

          const { intl: { formatMessage } } = this.context
          const { moduleTheme: { processingMonitoring: { filters: { autocomplete } } } } = this.context

          return (
              <TableHeaderLine>
                  <TableHeaderOptionsArea reducible alignLeft>
                      <TableHeaderOptionGroup>
                          <TableHeaderAutoCompleteFilter
                            hintText={formatMessage({ id: 'processing.monitoring.filters.name-hint' })}
                            text={name}
                            currentHints={listEntitiesProcessName}
                            onUpdateInput={this.onUpdateNameInput}
                            onFilterSelected={this.onFilterNameSelected}
                            isFetching={false}
                            noData={!listEntitiesProcessName.length}
                            prepareHints={this.prepareHints}
                            style={autocomplete}
                          />
                          <TableHeaderAutoCompleteFilter
                            hintText={formatMessage({ id: 'processing.monitoring.filters.userName-hint' })}
                            text={userName}
                            currentHints={listEntitiesUserNames}
                            onUpdateInput={this.onUpdateUserNameInput}
                            onFilterSelected={this.onFilterUserNameSelected}
                            isFetching={false}
                            noData={!listEntitiesUserNames.length}
                            prepareHints={this.prepareHints}
                            style={autocomplete}
                          />
                          <ProcessingMonitoringFilterFromComponent
                            onChangeFrom={onChangeFrom}
                            from={from}
                          />
                          <ProcessingMonitoringFilterToComponent
                            onChangeTo={onChangeTo}
                            to={to}
                          />
                      </TableHeaderOptionGroup>
                      <TableHeaderOptionGroup>
                        <SelectField
                          fullWidth
                          autoWidth
                        >
                          {
                            map(ProcessingDomain.PROCESSING_MONITORING_VALUES, (key) => {
                              <MenuItem
                                key={key}

                                primaryText={"lala"}
                              />
                            })
                          }

                        </SelectField>
                       {/* {map(ProcessingDomain.PROCESSING_MONITORING_VALUES, (value) => {
                          <ProcessingMonitoringFilterToggleComponent
                            onToggle={(value) => {onToggleAllStatus})
                            status={allStatus}
                            label="all-status"
                          />
                        })}*/}
                      </TableHeaderOptionGroup>
                  </TableHeaderOptionsArea>
                  <TableHeaderOptionsArea>
                      <TableHeaderOptionGroup>
                          <ProcessingMonitoringFilterClearComponent
                            onClearFilters={onClearFilters}
                            canEmptyFilters={canEmptyFilters}
                          />
                          <ProcessingMonitoringFilterApplyComponent
                            onApplyFilters={onApplyFilters}
                            filtersEdited={filtersEdited}
                          />    
                      </TableHeaderOptionGroup>
                  </TableHeaderOptionsArea>
              </TableHeaderLine>
          )
      }
  }
  export default ProcessingMonitoringFiltersComponent