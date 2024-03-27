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
import { connect } from '@regardsoss/redux'
import { browserHistory } from 'react-router'
import forEach from 'lodash/forEach'
import pick from 'lodash/pick'
import omit from 'lodash/omit'
import isEqual from 'lodash/isEqual'
import compose from 'lodash/fp/compose'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { NotifierShapes } from '@regardsoss/shape'
import { IngestDomain, UIDomain } from '@regardsoss/domain'
import { withI18n } from '@regardsoss/i18n'
import { TableFilterSortingAndVisibilityContainer } from '@regardsoss/components'
import { CommonEndpointClient } from '@regardsoss/endpoints-common'
import { allMatchHateoasDisplayLogic } from '@regardsoss/display-control'
import { withModuleStyle } from '@regardsoss/theme'
import { REQUESTS_COLUMN_KEYS } from '../components/requests/OAISRequestManagerComponent'
import { PACKAGE_COLUMN_KEYS } from '../components/packages/OAISPackageManagerComponent'
import { processingChainActions } from '../clients/ProcessingChainClient'
import { aipRecipientsActions, aipRecipientsSelectors } from '../clients/AIPRecipientsClient'
import OAISFeatureManagerComponent from '../components/OAISFeatureManagerComponent'
import clientByPane from '../domain/ClientByPane'
import dependencies from '../dependencies'
import messages from '../i18n'
import styles from '../styles'

/**
 * OAIS Feature manager container.
 * @author Simon MILHAU
 */
export class OAISFeatureManagerContainer extends React.Component {
  /** Dependencies to select a version mode, when a treatment is waiting */
  static SELECT_VERSION_DEPENDENCIES = [dependencies.selectVersionModeDependency]

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps = (state) => ({
    isFetching: clientByPane[IngestDomain.REQUEST_TYPES_ENUM.AIP].selectors.isFetching(state) || clientByPane[IngestDomain.REQUEST_TYPES_ENUM.REQUEST].selectors.isFetching(state),
    storages: clientByPane[IngestDomain.REQUEST_TYPES_ENUM.AIP].storageSelectors.getArray(state),
    availableDependencies: CommonEndpointClient.endpointSelectors.getListOfKeys(state),
    recipientList: aipRecipientsSelectors.getResult(state),
  })

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of actions ready to be dispatched in the redux store
   */
  static mapDispatchToProps = (dispatch) => ({
    fetchProcessingChains: () => dispatch(processingChainActions.fetchPagedEntityList(0, 1000)), // Pourquoi ?
    fetchPage: (pageIndex, pageSize, pathParams, queryParams, bodyParams, paneType) => dispatch(clientByPane[paneType].actions.fetchPagedEntityListByPost(pageIndex, pageSize, pathParams, queryParams, bodyParams)),
    deleteRequests: (bodyParams, paneType) => dispatch(clientByPane[paneType].deleteActions.sendSignal('POST', bodyParams)),
    retryRequests: (bodyParams) => dispatch(clientByPane[IngestDomain.REQUEST_TYPES_ENUM.REQUEST].retryActions.sendSignal('POST', bodyParams)),
    abortRequests: () => dispatch(clientByPane[IngestDomain.REQUEST_TYPES_ENUM.REQUEST].abortActions.sendSignal('PUT')),
    selectVersionOption: (versionBodyParams) => dispatch(clientByPane[IngestDomain.REQUEST_TYPES_ENUM.REQUEST].selectVersionActions.sendSignal('PUT', versionBodyParams)),
    fetchStorages: (bodyParams, pathParams) => dispatch(clientByPane[IngestDomain.REQUEST_TYPES_ENUM.AIP].storageActions.fetchEntityListByPost(pathParams, null, bodyParams)),
    modifyAips: (bodyParams) => dispatch(clientByPane[IngestDomain.REQUEST_TYPES_ENUM.AIP].updateActions.sendSignal('POST', bodyParams)),
    dispatchUnselectAll: (paneType) => dispatch(clientByPane[paneType].tableActions.unselectAll()),
    fetchRecipients: () => dispatch(aipRecipientsActions.fetchRecipients()),
    notifyAips: (filters, recipients) => dispatch(clientByPane[IngestDomain.REQUEST_TYPES_ENUM.AIP].notifyActions.notifyAip(filters, recipients)),
    fetchRequestsCount: (pageIndex, pageSize, pathParams, queryParams, bodyParams, paneType) => dispatch(clientByPane[paneType].countActions.fetchPagedEntityListByPost(pageIndex, pageSize, pathParams, queryParams, bodyParams)),
  })

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
      session: PropTypes.string,
      type: PropTypes.string,
    }),
    // from mapDistpathToProps
    fetchProcessingChains: PropTypes.func.isRequired,
    fetchPage: PropTypes.func.isRequired,
    deleteRequests: PropTypes.func.isRequired,
    retryRequests: PropTypes.func.isRequired,
    abortRequests: PropTypes.func.isRequired,
    selectVersionOption: PropTypes.func.isRequired,
    fetchStorages: PropTypes.func.isRequired,
    modifyAips: PropTypes.func.isRequired,
    fetchRecipients: PropTypes.func.isRequired,
    notifyAips: PropTypes.func.isRequired,
    fetchRequestsCount: PropTypes.func.isRequired,
    // from mapStateToProps
    storages: PropTypes.arrayOf(PropTypes.string),
    isFetching: PropTypes.bool,
    availableDependencies: PropTypes.arrayOf(PropTypes.string),
    dispatchUnselectAll: PropTypes.func.isRequired,
    recipientList: NotifierShapes.RecipientArray,
  }

  state = {
    isLoading: true,
    modeSelectionAllowed: false,
    isRecipientsDependenciesExist: allMatchHateoasDisplayLogic([aipRecipientsActions.getDependency(RequestVerbEnum.GET)], this.props.availableDependencies),
  }

  UNSAFE_componentWillMount() {
    const { fetchRecipients } = this.props
    const { isRecipientsDependenciesExist } = this.state
    if (isRecipientsDependenciesExist) {
      fetchRecipients()
    }
  }

  /**
   * Lifecycle method: component did mount. Used here to fetch user lists
   */
  componentDidMount = () => {
    this.props.fetchProcessingChains()
    this.props.fetchStorages({}, {})
    this.setState({ isLoading: false })
  }

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesUpdated(this.props, nextProps)

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    const { availableDependencies } = this.props
    const nextState = { ...this.state }
    if (!isEqual(oldProps.availableDependencies, newProps.availableDependencies)) {
      // resources changed, update modeSelectionAllowed
      nextState.modeSelectionAllowed = allMatchHateoasDisplayLogic(OAISFeatureManagerContainer.SELECT_VERSION_DEPENDENCIES, availableDependencies)
    }
    if (!isEqual(this.state, nextState)) {
      this.setState(nextState)
    }
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
  setFetching = (isLoading) => this.setState({ isLoading })

  /**
   * Enable to update tabs count when user click on the Refresh button.
   * See OAISSwitchTablesContainer for tabs count refresh when user switch tab and when user change filters
   */
  fetchRequestsCounts = (queryParams, bodyParams) => {
    const { fetchRequestsCount } = this.props
    forEach(IngestDomain.REQUEST_TYPES_ENUM, (paneType) => {
      const columnKeys = paneType === IngestDomain.REQUEST_TYPES_ENUM.AIP ? PACKAGE_COLUMN_KEYS : REQUESTS_COLUMN_KEYS
      // We remove sorting parameters that are not used in this pane
      const filteredQueryParams = UIDomain.SortingHelper.buildSortingParameters(queryParams, columnKeys)
      fetchRequestsCount(0, 1, {}, filteredQueryParams, bodyParams, paneType)
    })
  }

  onRefresh = (requestParameters, paneType) => {
    const { fetchPage } = this.props
    const queryParams = { ...pick(requestParameters, 'sort') }
    const bodyParams = { ...omit(requestParameters, 'sort') }
    fetchPage(0, TableFilterSortingAndVisibilityContainer.PAGE_SIZE, {}, queryParams, bodyParams, paneType)
    this.fetchRequestsCounts(queryParams, bodyParams)
  }

  unselectAll = (actionResult, paneType) => {
    const { dispatchUnselectAll } = this.props
    return !actionResult.error && dispatchUnselectAll(paneType)
  }

  onDeleteRequests = (bodyParams, paneType, updatePostDialogState, onRefresh) => {
    const { deleteRequests } = this.props
    this.perform(deleteRequests(bodyParams, paneType).then(updatePostDialogState).then((actionResult) => this.unselectAll(actionResult, paneType)), onRefresh)
  }

  onRetryRequests = (bodyParams, onRefresh) => {
    const { retryRequests } = this.props
    this.perform(retryRequests(bodyParams).then((actionResult) => this.unselectAll(actionResult, IngestDomain.REQUEST_TYPES_ENUM.REQUEST)), onRefresh)
  }

  onAbortRequests = (onRefresh) => {
    const { abortRequests } = this.props
    this.perform(abortRequests(), onRefresh)
  }

  onSelectVersionOption = (bodyParams, onRefresh) => {
    const { selectVersionOption } = this.props
    this.perform(selectVersionOption(bodyParams).then((actionResult) => this.unselectAll(actionResult, IngestDomain.REQUEST_TYPES_ENUM.REQUEST)), onRefresh)
  }

  onModifyAip = (bodyParams, updatePostDialogState, onRefresh) => {
    const { modifyAips } = this.props
    this.perform(modifyAips(bodyParams).then(updatePostDialogState).then((actionResult) => this.unselectAll(actionResult, IngestDomain.REQUEST_TYPES_ENUM.AIP)), onRefresh)
  }

  onNotifyAip = (filters, recipients, onRefresh) => {
    const { notifyAips } = this.props
    this.perform(notifyAips(filters, recipients).then((actionResult) => this.unselectAll(actionResult, IngestDomain.REQUEST_TYPES_ENUM.REQUEST)), onRefresh)
  }

  render() {
    const {
      params, isFetching, storages, recipientList,
    } = this.props
    const { isLoading, modeSelectionAllowed } = this.state
    return (
      <OAISFeatureManagerComponent
        params={params}
        isLoading={isFetching || isLoading}
        storages={storages}
        onRefresh={this.onRefresh}
        onDeleteRequests={this.onDeleteRequests}
        onRetryRequests={this.onRetryRequests}
        onAbortRequests={this.onAbortRequests}
        onSelectVersionOption={this.onSelectVersionOption}
        onModifyAip={this.onModifyAip}
        modeSelectionAllowed={modeSelectionAllowed}
        onBack={this.onBack}
        recipientList={recipientList}
        onNotifyAip={this.onNotifyAip}
      />
    )
  }
}

export default compose(withI18n(messages), withModuleStyle(styles), connect(OAISFeatureManagerContainer.mapStateToProps, OAISFeatureManagerContainer.mapDispatchToProps))(OAISFeatureManagerContainer)
