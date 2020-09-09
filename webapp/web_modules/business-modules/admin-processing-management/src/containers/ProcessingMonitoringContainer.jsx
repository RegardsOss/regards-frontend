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
import { ProcessingShapes } from '@regardsoss/shape'


/**
 * List all the processing running or not
 * @author Théo Lasserre
 */
export class ProcessingMonitoringContainer extends React.Component {

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
        listEntities: ProcessingShapes.ProcessingMonitoringList.isRequired,
        // from mapDispatchToProps
        fetchProcessingMonitorList: PropTypes.func,
    }

    /**
     * Initial state
     */
    state = {
        isLoading: true,
    }

    UNSAFE_componentWillMount() {
        Promise.resolve(this.props.fetchProcessingMonitorList()).then((actionResult) => {
          if (!actionResult.error) {
            this.setState({
              isLoading: false,
            })
          }
        })
    }

    onRefresh = (filters) => {
        const { meta, fetchProcessingMonitorList } = this.props
        const curentPage = get(meta, 'number', 0)
        return fetchProcessingMonitorList(0, ProcessingMonitoringComponent.PAGE_SIZE * (curentPage + 1), {}, filters)
    }

    getBackURL = () => {
        const { params: { project } } = this.props
        return `/admin/${project}/commands/board`
    }

    render() {
        const { isLoading, requestParameters, filtersEdited, canEmptyFilters, 
            editionFiltersState,
        } = this.state
        const { listEntities } = this.props
   
        return (
            <I18nProvider messages={messages}>
                <LoadableContentDisplayDecorator isLoading={isLoading}>
                    <ProcessingMonitoringComponent
                        onRefresh={this.onRefresh}
                        backUrl={this.getBackURL()}
                        listEntities={listEntities}
                    />
                </LoadableContentDisplayDecorator>
            </I18nProvider>
        )
    }
}

export default compose(
    connect(ProcessingMonitoringContainer.mapStateToProps, ProcessingMonitoringContainer.mapDispatchToProps),
    withI18n(messages), withModuleStyle(styles))(ProcessingMonitoringContainer)