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
import { connect } from '@regardsoss/redux'
import { I18nProvider, withI18n } from '@regardsoss/i18n'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { values, isEqual, reduce, get} from 'lodash'
import compose from 'lodash/fp/compose'
import { withModuleStyle } from '@regardsoss/theme'

import { browserHistory } from 'react-router'
import { processingMonitoringActions, processingMonitoringSelectors } from '../clients/ProcessingMonitoringClient'
import messages from '../i18n'
import styles from '../styles'
import ProcessingMonitoringComponent from '../components/ProcessingMonitoringComponent'


/**
 * List all the processing running or not
 * @author Théo Lasserre
 */
export class ProcessingMonitoringContainer extends React.Component {

    static propTypes = {
        meta: PropTypes.shape({
            // use only in onPropertiesUpdate
            number: PropTypes.number,
            size: PropTypes.number,
            totalElements: PropTypes.number,
        }),
        // from router
        params: PropTypes.shape({
            project: PropTypes.string,
        }),
        // from mapStateToProps
        listEntities: PropTypes.object.isRequired,
        // from mapDispatchToProps
        fetchProcessingMonitorList: PropTypes.func,
    }

    static DATES_FIELDS = ["from", "to"]

    /**
     * Redux: map state to props function
     * @param {*} state: current redux state
     * @param {*} props: (option) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
     * @return {*} list of component properties extracted from redux state
     */
    static mapStateToProps = (state) => ({
        listEntities: processingMonitoringSelectors.getList(state),
    })
    
    /**
     * Redux: map to dispatch to props function
     * @param {*} dispatch: redux dispatch function
     * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
     * @return {*} list of actions ready to be dispatched in the redux store
     */
    static mapDispatchToProps = (dispatch) => ({
        fetchProcessingMonitorList: (pageIndex, pageSize, requestParams, queryParams) => dispatch(processingMonitoringActions.fetchPagedEntityList(pageIndex, pageSize, requestParams, queryParams)),
    })

    /**
     * Default state for filters edition
     */
    static DEFAULT_FILTERS_STATE = {
        name: '',
        userName: '',
        status: {
            SUCCESS: true,
            FAILURE: true,
            CANCELLED: true,
            TIMEDOUT: true,
            CLEANUP: true,
            RUNNING: true,
            PREPARE: true,
            REGISTERED: true,
        },
        from: null,
        to: null,
    }

    /**
     * Converts column order and filters state into request parameters
     * @param {[{columnKey: string, order: string}]} columnsSorting column sorting definition
     * @param {*} applyingFiltersState filters state from component state
     * @return {*} requestParameters as an object compound od string and string arrays
     */
    static buildRequestParameters(applyingFiltersState) {
        const requestParameters = {}
        if (applyingFiltersState.name) {
            requestParameters.name = applyingFiltersState.name
        }
        if (applyingFiltersState.userName) {
            requestParameters.userName = applyingFiltersState.userName
        }
        ProcessingMonitoringContainer.DATES_FIELDS.forEach((fieldName) => {
            const date = applyingFiltersState[fieldName]
            if (date) {
                requestParameters[fieldName] = [new Date(date).toISOString()]
            }
        })
        requestParameters.status = reduce(applyingFiltersState.status, (acc, valueStatus, filterStatus) => {
            if (valueStatus) {
                acc.push(filterStatus)
            }
            return acc
        }, []).join(',')
        return requestParameters
    }

    /**
     * Initial state
     */
    state = {
        isLoading: true,
        initialFiltersState: ProcessingMonitoringContainer.DEFAULT_FILTERS_STATE,
        editionFiltersState: ProcessingMonitoringContainer.DEFAULT_FILTERS_STATE,
        applyingFiltersState: ProcessingMonitoringContainer.DEFAULT_FILTERS_STATE,
        requestParameters: ProcessingMonitoringContainer.buildRequestParameters(ProcessingMonitoringContainer.DEFAULT_FILTERS_STATE),
        filtersEdited: false,
        canEmptyFilters: false,
    }

    UNSAFE_componentWillMount() {
        Promise.resolve(this.props.fetchProcessingMonitorList()).then((actionResult) => {
          if (!actionResult.error) {
            this.setState({
              isLoading: false,
            })
          }
        })
        this.initializeFiltersFromURL()
    }

    initializeFiltersFromURL = () => {
        const { query } = browserHistory.getCurrentLocation()
        if (values(query).length > 0) {
            const newState = {
                ...this.state.initialFiltersState,
                ...query,
            }
            this.setState({
                initialFiltersState: newState,
                editionFiltersState: newState,
                applyingFiltersState: newState,
            })
        }
    }

    onRefresh = (filters) => {
        const { meta, fetchProcessingMonitorList } = this.props
        const curentPage = get(meta, 'number', 0)
        return fetchProcessingMonitorList(0, ProcessingMonitoringComponent.PAGE_SIZE * (curentPage + 1), {}, filters)
    }

    /**
     * Change processName filter
     */
    onChangeName = (newName) => {
        const { editionFiltersState } = this.state
        this.onStateUpdated({ 
            editionFiltersState: {
                ...editionFiltersState,
                name: newName,
            }
        })
    }

    /**
     * Change userName filter
     */
    onChangeUserName = (newUserName) => {
        const { editionFiltersState } = this.state

        this.onStateUpdated({
            editionFiltersState: {
                ...editionFiltersState,
                userName: newUserName,
            }
        })
    }

    /**
     * Toggle Status filter
     */
    onToggleStatus = (statusField) => {
        const { editionFiltersState } = this.state
        const newFilters = {}
        newFilters.status[statusField] = !editionFiltersState.status[statusField]
        this.onStateUpdated({
            editionFiltersState: {
                ...editionFiltersState,
                ...newFilters,
            }
        })
    }

    /**
     * Change Date From
     */
    onChangeFrom = (newDate) => {
        const { editionFiltersState } = this.state
        this.onStateUpdated({
            editionFiltersState: {
                ...editionFiltersState,
                from: newDate,
            }
        })
    }

    /**
     * Change Date To
     */
    onChangeTo = (newDate) => {
        const { editionFiltersState } = this.state
        this.onStateUpdated({
            editionFiltersState: {
                ...editionFiltersState,
                to: newDate
            }
        })
    }

    /**
     * User callback: Apply edited filters to current request
     */
    onApplyFilters = () => {
        const { editionFiltersState } = this.state
        this.onStateUpdated({ applyingFiltersState: editionFiltersState })
        this.onRefresh()
    }

    /**
     * User callback: Reset filter to default
     */
    onClearFilters = () => this.onStateUpdated({
        applyingFiltersState: ProcessingMonitoringContainer.DEFAULT_FILTERS_STATE,
        editionFiltersState: ProcessingMonitoringContainer.DEFAULT_FILTERS_STATE,
    })

    /**
     * Update full state based on changes
     */
    onStateUpdated = (stateDiff) => {
        const nextState = { ...this.state, ...stateDiff }
        nextState.filtersEdited = !isEqual(nextState.applyingFiltersState, nextState.editionFiltersState)
        nextState.canEmptyFilters = !isEqual(nextState.editionFiltersState, nextState.initialFiltersState)
        nextState.requestParameters = ProcessingMonitoringContainer.buildRequestParameters(nextState.applyingFiltersState)
        this.setState(nextState)
    }

    getBackURL = () => {
        const { params: { project } } = this.props
        return `/admin/${project}/commands/board`
    }

    render() {
        const { isLoading, requestParameters, filtersEdited, canEmptyFilters, 
            editionFiltersState,
        } = this.state
        return (
            <I18nProvider messages={messages}>
                <LoadableContentDisplayDecorator isLoading={isLoading}>
                    <ProcessingMonitoringComponent
                        backUrl={this.getBackURL()}
                        onRefresh={this.onRefresh}
                        requestParameters={requestParameters}
                        initialFilters={editionFiltersState}
                        filtersEdited={filtersEdited}
                        canEmptyFilters={canEmptyFilters}
                        onApplyFilters={this.onApplyFilters}
                        onClearFilters={this.onClearFilters}
                        onChangeName={this.onChangeName}
                        onChangeUserName={this.onChangeUserName}
                        onChangeFrom={this.onChangeFrom}
                        onChangeTo={this.onChangeTo}
                        onToggleStatus={this.onToggleStatus}
                        listEntities={this.props.listEntities}
                    />
                </LoadableContentDisplayDecorator>
            </I18nProvider>
        )
    }
}

export default compose(
    connect(ProcessingMonitoringContainer.mapStateToProps, ProcessingMonitoringContainer.mapDispatchToProps),
    withI18n(messages), withModuleStyle(styles))(ProcessingMonitoringContainer)