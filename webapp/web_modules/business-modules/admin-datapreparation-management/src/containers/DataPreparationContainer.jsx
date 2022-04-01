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
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { ModuleStyleProvider } from '@regardsoss/theme'
import get from 'lodash/get'
import { TableFilterSortingAndVisibilityContainer } from '@regardsoss/components'
import { requestActions, requestSelectors } from '../clients/WorkerRequestClient'
import { requestSignalsActions } from '../clients/WorkerRequestSignalsClient'
import DataPreparationComponent from '../components/DataPreparationComponent'
import messages from '../i18n'
import styles from '../styles'
/**
 * @author Théo Lasserre
 */
export class DataPreparationContainer extends React.Component {
  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
    }),
    // from mapStateToProps
    pageMeta: PropTypes.shape({
      number: PropTypes.number,
      size: PropTypes.number,
      totalElements: PropTypes.number,
    }),
    // from mapDispatchToProps
    fetchRequests: PropTypes.func.isRequired,
    onDeleteRequest: PropTypes.func.isRequired,
    onRetryRequest: PropTypes.func.isRequired,
  }

  static PAGE_SIZE = STATIC_CONF.TABLE.PAGE_SIZE || 20;

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      pageMeta: requestSelectors.getMetaData(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch) {
    return {
      fetchRequests: (pageIndex, pageSize, pathParams, queryParams, bodyParam) => dispatch(requestActions.fetchPagedEntityList(pageIndex, pageSize, pathParams, queryParams, bodyParam)),
      onDeleteRequest: (requestBodyParameters) => dispatch(requestSignalsActions.delete(requestBodyParameters)),
      onRetryRequest: (requestBodyParameters) => dispatch(requestSignalsActions.retry(requestBodyParameters)),
    }
  }

  state = { isFetching: false }

  /**
   * Lifecycle method: component did mount. Used here to fetch user lists
   */
  componentDidMount = () => {
    this.setState({ isFetching: false })
  }

  onBack = () => {
    const { params: { project } } = this.props
    browserHistory.push(`/admin/${project}/data/acquisition/board`)
  }

  onDeleteRequest = (requestBodyParameters, onRefresh) => {
    const { onDeleteRequest } = this.props
    this.perform(onDeleteRequest(requestBodyParameters), onRefresh)
  }

  onRetryRequest = (requestBodyParameters, onRefresh) => {
    const { onRetryRequest } = this.props
    this.perform(onRetryRequest(requestBodyParameters), onRefresh)
  }

  /**
   * Set actions fetching state
   * @param {bool} isFetchingActions is fetching actions?
   */
  setFetching = (isFetching) => this.setState({ isFetching })

  /**
   * Marks fetching true, performs promise as parameter, update waiting users state then marks fetching false
   * @param promise
   */
  perform = (promise, onRefresh) => {
    this.setFetching(true)
    const onDone = () => { this.setFetching(false) }
    Promise.resolve(promise).then(() => Promise.resolve(
      onRefresh(true),
    ).then(onDone).catch(onDone)).catch(onDone)
  }

  renderComponent = (filterSortingAndVisibilityProps) => {
    const {
      pageMeta,
    } = this.props
    const { isFetching } = this.state
    return (
      <DataPreparationComponent
        {...filterSortingAndVisibilityProps}
        onBack={this.onBack}
        isLoading={isFetching}
        pageSize={DataPreparationContainer.PAGE_SIZE}
        numberOfRequests={get(pageMeta, 'totalElements', 0)}
      />
    )
  }

  render() {
    return (
      <I18nProvider messages={messages}>
        <ModuleStyleProvider module={styles}>
          <TableFilterSortingAndVisibilityContainer
            pageActions={requestActions}
            pageSelectors={requestSelectors}
            defaultFiltersState={DataPreparationComponent.DEFAULT_FILTERS_STATE}
            onDeleteRequest={this.onDeleteRequest}
            onRetryRequest={this.onRetryRequest}
            isPagePostFetching
          >
            {this.renderComponent}
          </TableFilterSortingAndVisibilityContainer>
        </ModuleStyleProvider>
      </I18nProvider>
    )
  }
}

export default connect(
  DataPreparationContainer.mapStateToProps,
  DataPreparationContainer.mapDispatchToProps)(DataPreparationContainer)
