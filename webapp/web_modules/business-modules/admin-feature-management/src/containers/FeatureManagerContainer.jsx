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
import pick from 'lodash/pick'
import omit from 'lodash/omit'
import { connect } from '@regardsoss/redux'
import { FemDomain } from '@regardsoss/domain'
import { browserHistory } from 'react-router'
import compose from 'lodash/fp/compose'
import { withI18n } from '@regardsoss/i18n'
import { withModuleStyle } from '@regardsoss/theme'
import { TableFilterSortingAndVisibilityContainer } from '@regardsoss/components'
import FeatureManagerComponent from '../components/FeatureManagerComponent'
import clientByPane from '../domain/ClientByPane'
import messages from '../i18n'
import styles from '../styles'

/**
 * Feature manager container
 * @author Théo Lasserre
 */
export class FeatureManagerContainer extends React.Component {
  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of actions ready to be dispatched in the redux store
   */
  static mapDispatchToProps = (dispatch) => ({
    fetchRequests: (pageIndex, pageSize, pathParams, queryParams, bodyParams, paneType) => dispatch(clientByPane[paneType].actions.fetchPagedEntityListByPost(pageIndex, pageSize, pathParams, queryParams, bodyParams)),
    notifyRequests: (bodyParams) => dispatch(clientByPane[FemDomain.REQUEST_TYPES_ENUM.REFERENCES].notifyActions.sendSignal('POST', bodyParams)),
    retryRequests: (bodyParams, pathParams, paneType) => dispatch(clientByPane[paneType].retryActions.sendSignal('POST', bodyParams, pathParams)),
    deleteRequests: (bodyParams, pathParams, paneType) => dispatch(clientByPane[paneType].deleteActions.sendSignal('DELETE', bodyParams, pathParams)),
  })

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
      type: PropTypes.string,
    }),
    fetchRequests: PropTypes.func.isRequired,
    deleteRequests: PropTypes.func.isRequired,
    retryRequests: PropTypes.func.isRequired,
    notifyRequests: PropTypes.func.isRequired,
  }

  state = { isFetching: true }

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

  /**
  * Set actions fetching state
  * @param {bool} isFetchingActions is fetching actions?
  */
  setFetching = (isFetching) => this.setState({ isFetching })

  getPathParams = (paneType) => paneType !== FemDomain.REQUEST_TYPES_ENUM.REFERENCES ? { type: paneType } : {}

  onRefresh = (requestParameters, paneType) => {
    const { fetchRequests } = this.props
    const pathParams = this.getPathParams(paneType)
    fetchRequests(0, TableFilterSortingAndVisibilityContainer.PAGE_SIZE, pathParams, { ...pick(requestParameters, 'sort') }, { ...omit(requestParameters, 'sort') }, paneType)
  }

  onDeleteRequests = (bodyParams, paneType, onRefresh) => {
    const { deleteRequests } = this.props
    const pathParams = this.getPathParams(paneType)
    this.perform(deleteRequests(bodyParams, pathParams, paneType), onRefresh)
  }

  onRetryRequests = (bodyParams, paneType, onRefresh) => {
    const { retryRequests } = this.props
    this.perform(retryRequests(bodyParams, { type: paneType }, paneType), onRefresh)
  }

  onNotifyRequests = (bodyParams, onRefresh) => {
    const { notifyRequests } = this.props
    this.perform(notifyRequests(bodyParams), onRefresh)
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
      />
    )
  }
}

export default compose(
  connect(null, FeatureManagerContainer.mapDispatchToProps),
  withI18n(messages), withModuleStyle(styles, true))(FeatureManagerContainer)
