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
import pick from 'lodash/pick'
import omit from 'lodash/omit'
import forEach from 'lodash/forEach'
import { connect } from '@regardsoss/redux'
import { FemDomain, UIDomain } from '@regardsoss/domain'
import { browserHistory } from 'react-router'
import compose from 'lodash/fp/compose'
import { NotifierShapes } from '@regardsoss/shape'
import { withI18n } from '@regardsoss/i18n'
import { withModuleStyle } from '@regardsoss/theme'
import { TableFilterSortingAndVisibilityContainer } from '@regardsoss/components'
import { REFERENCES_COLUMN_KEYS } from '../components/ReferencesManagerComponent'
import { REQUESTS_COLUMN_KEYS } from '../components/RequestManagerComponent'
import FeatureManagerComponent from '../components/FeatureManagerComponent'
import { referenceRecipientsActions, referenceRecipientsSelectors } from '../clients/ReferenceRecipientsClient'
import clientByPane from '../domain/ClientByPane'
import messages from '../i18n'
import styles from '../styles'

/**
 * Feature manager container
 * @author Théo Lasserre
 */
export class FeatureManagerContainer extends React.Component {
  static mapStateToProps = (state) => ({
    recipientList: referenceRecipientsSelectors.getResult(state),
  })

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of actions ready to be dispatched in the redux store
   */
  static mapDispatchToProps = (dispatch) => ({
    fetchRequests: (pageIndex, pageSize, pathParams, queryParams, bodyParams, paneType) => dispatch(clientByPane[paneType].actions.fetchPagedEntityListByPost(pageIndex, pageSize, pathParams, queryParams, bodyParams)),
    fetchRequestsCount: (pageIndex, pageSize, pathParams, queryParams, bodyParams, paneType) => dispatch(clientByPane[paneType].countActions.fetchPagedEntityListByPost(pageIndex, pageSize, pathParams, queryParams, bodyParams)),
    notifyRequests: (bodyParams) => dispatch(clientByPane[FemDomain.REQUEST_TYPES_ENUM.REFERENCES].notifyActions.sendSignal('POST', bodyParams)),
    forceErrorRequests: (bodyParams, pathParams, paneType) => dispatch(clientByPane[paneType].forceErrorActions.sendSignal('POST', bodyParams, pathParams)),
    retryRequests: (bodyParams, pathParams, paneType) => dispatch(clientByPane[paneType].retryActions.sendSignal('POST', bodyParams, pathParams)),
    deleteRequests: (bodyParams, pathParams, paneType) => dispatch(clientByPane[paneType].deleteActions.sendSignal('DELETE', bodyParams, pathParams)),
    fetchRecipients: () => dispatch(referenceRecipientsActions.fetchRecipients()),
    dispatchUnselectAll: (paneType) => dispatch(clientByPane[paneType].tableActions.unselectAll()),
  })

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
      type: PropTypes.string,
    }),
    // from mapDispatchToProps
    fetchRequests: PropTypes.func.isRequired,
    fetchRequestsCount: PropTypes.func.isRequired,
    deleteRequests: PropTypes.func.isRequired,
    retryRequests: PropTypes.func.isRequired,
    notifyRequests: PropTypes.func.isRequired,
    forceErrorRequests: PropTypes.func.isRequired,
    fetchRecipients: PropTypes.func.isRequired,
    dispatchUnselectAll: PropTypes.func.isRequired,
    // from mapStateToProps
    recipientList: NotifierShapes.RecipientArray,
  }

  static getPathParams(paneType) {
    return paneType !== FemDomain.REQUEST_TYPES_ENUM.REFERENCES ? { type: paneType } : {}
  }

  state = { isFetching: true }

  UNSAFE_componentWillMount() {
    this.props.fetchRecipients()
  }

  /**
   * Lifecycle method: component did mount. Used here to fetch user lists
   */
  componentDidMount() {
    this.setState({ isFetching: false })
  }

  onBack = () => {
    const { params: { project } } = this.props
    browserHistory.push(`/admin/${project}/data/acquisition/board`)
  }

  /**
  * Marks fetching true, performs promise as parameter, update waiting users state then marks fetching false
  * @param promise
  */
  perform = (promise, paneType, onRefresh) => {
    this.setFetching(true)
    const onDone = () => { this.setFetching(false) }
    Promise.resolve(promise).then((actionResult) => {
      this.unselectAll(actionResult, paneType)
      return Promise.resolve(
        onRefresh(true),
      ).then(onDone).catch(onDone)
    }).catch(onDone)
  }

  /**
  * Set actions fetching state
  * @param {bool} isFetchingActions is fetching actions?
  */
  setFetching = (isFetching) => this.setState({ isFetching })

  /**
   * Enable to update tabs count when user click on the Refresh button.
   * See SwitchTablesContainer for tabs count refresh when user switch tab and when user change filters
   */
  fetchRequestsCounts = (queryParams, bodyParams) => {
    const { fetchRequestsCount } = this.props
    forEach(FemDomain.REQUEST_TYPES_ENUM, (paneType) => {
      const pathParams = this.getPathParams(paneType)
      const columnKeys = paneType === FemDomain.REQUEST_TYPES_ENUM.REFERENCES ? REFERENCES_COLUMN_KEYS : REQUESTS_COLUMN_KEYS
      // We remove sorting parameters that are not used in this pane
      const filteredQueryParams = UIDomain.SortingHelper.buildSortingParameters(queryParams, columnKeys)
      fetchRequestsCount(0, 1, pathParams, filteredQueryParams, bodyParams, paneType)
    })
  }

  onRefresh = (requestParameters, paneType) => {
    const { fetchRequests } = this.props
    const pathParams = FeatureManagerContainer.getPathParams(paneType)
    const queryParams = { ...pick(requestParameters, 'sort') }
    const bodyParams = { ...omit(requestParameters, 'sort') }
    fetchRequests(0, TableFilterSortingAndVisibilityContainer.PAGE_SIZE, pathParams, queryParams, bodyParams, paneType)
    this.fetchRequestsCounts(queryParams, bodyParams)
  }

  unselectAll = (actionResult, paneType) => {
    const { dispatchUnselectAll } = this.props
    return !actionResult.error && dispatchUnselectAll(paneType)
  }

  onDeleteRequests = (bodyParams, paneType, onRefresh) => {
    const { deleteRequests } = this.props
    const pathParams = FeatureManagerContainer.getPathParams(paneType)
    this.perform(deleteRequests(bodyParams, pathParams, paneType), paneType, onRefresh)
  }

  onRetryRequests = (bodyParams, paneType, onRefresh) => {
    const { retryRequests } = this.props
    this.perform(retryRequests(bodyParams, { type: paneType }, paneType), paneType, onRefresh)
  }

  onNotifyRequests = (bodyParams, onRefresh) => {
    const { notifyRequests } = this.props
    this.perform(notifyRequests(bodyParams), FemDomain.REQUEST_TYPES_ENUM.REFERENCES, onRefresh)
  }

  onForceErrorRequests = (bodyParams, paneType, onRefresh) => {
    const { forceErrorRequests } = this.props
    this.perform(forceErrorRequests(bodyParams, { type: paneType }, paneType), paneType, onRefresh)
  }

  render() {
    const { params } = this.props
    const { isFetching } = this.state
    return (
      <FeatureManagerComponent
        params={params}
        onBack={this.onBack}
        onRefresh={this.onRefresh}
        isFetching={isFetching}
        onDeleteRequests={this.onDeleteRequests}
        onRetryRequests={this.onRetryRequests}
        onNotifyRequests={this.onNotifyRequests}
        onForceErrorRequests={this.onForceErrorRequests}
        recipientList={this.props.recipientList}
      />
    )
  }
}

export default compose(
  connect(FeatureManagerContainer.mapStateToProps, FeatureManagerContainer.mapDispatchToProps),
  withI18n(messages), withModuleStyle(styles, true))(FeatureManagerContainer)
