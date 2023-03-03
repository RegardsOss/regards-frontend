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
import map from 'lodash/map'
import pick from 'lodash/pick'
import omit from 'lodash/omit'
import compose from 'lodash/fp/compose'
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { IngestShapes, CommonShapes } from '@regardsoss/shape'
import { withI18n, i18nContextType } from '@regardsoss/i18n'
import { ApplicationErrorAction } from '@regardsoss/global-system-error'
import { CommonEndpointClient } from '@regardsoss/endpoints-common'
import { allMatchHateoasDisplayLogic } from '@regardsoss/display-control'
import { TableFilterSortingAndVisibilityContainer } from '@regardsoss/components'
import {
  RunAcquisitionProcessingChainActions, StopAcquisitionProcessingChainActions,
  ToggleAcquisitionProcessingChainActions, AcquisitionProcessingChainActions, AcquisitionProcessingChainEditActions,
  MultiToggleAcquisitionProcessingChainActions, AcquisitionProcessingChainSelectors,
} from '../../clients/AcquisitionProcessingChainClient'
import AcquisitionProcessingChainListComponent from '../../components/acquisitionChain/AcquisitionProcessingChainListComponent'
import { tableSelectors } from '../../clients/TableClient'
import AcquisitionProcessingChainListFiltersComponent from '../../components/acquisitionChain/AcquisitionProcessingChainListFiltersComponent'
import messages from '../../i18n'

/**
* Container to handle AcquisitionProcessingChains.
* @author Sébastien Binda
*/
export class AcquisitionProcessingChainListContainer extends React.Component {
  static propTypes = {
    params: PropTypes.shape({
      project: PropTypes.string,
    }),
    displayLogic: PropTypes.func,

    // from mapStateToProps
    meta: PropTypes.shape({ // use only in onPropertiesUpdate
      number: PropTypes.number,
      size: PropTypes.number,
      totalElements: PropTypes.number,
    }),
    entitiesLoading: PropTypes.bool.isRequired,
    deleteChain: PropTypes.func.isRequired,
    toggleChain: PropTypes.func.isRequired,
    isOneCheckboxToggled: PropTypes.bool.isRequired,
    toggledChains: PropTypes.arrayOf(PropTypes.shape({
      content: IngestShapes.IngestProcessingChain,
      links: PropTypes.arrayOf(CommonShapes.HateOASLink),
    })),
    availableDependencies: PropTypes.arrayOf(PropTypes.string),

    // from mapDispatchToProps
    fetchPage: PropTypes.func.isRequired,
    runChain: PropTypes.func.isRequired,
    stopChain: PropTypes.func.isRequired,
    multiToggleChain: PropTypes.func.isRequired,
    throwError: PropTypes.func.isRequired,
  }

  static defaultProps = {
    meta: {
      totalElements: 0,
    },
    displayLogic: allMatchHateoasDisplayLogic,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  // static PAGE_SIZE = 100

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    const toggledChains = tableSelectors.getToggledElementsAsList(state)

    return {
      meta: AcquisitionProcessingChainSelectors.getMetaData(state),
      entitiesLoading: AcquisitionProcessingChainSelectors.isFetching(state),
      toggledChains,
      isOneCheckboxToggled: toggledChains.length > 0,
      availableDependencies: CommonEndpointClient.endpointSelectors.getListOfKeys(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of actions ready to be dispatched in the redux store
   */
  static mapDispatchToProps(dispatch) {
    return {
      fetchPage: (pageIndex, pageSize, pathParam, requestParams) => dispatch(AcquisitionProcessingChainActions.fetchPagedEntityList(pageIndex, pageSize, pathParam, requestParams)),
      runChain: (chainId, sessionName) => dispatch(RunAcquisitionProcessingChainActions.run(chainId, sessionName)),
      stopChain: (chainId) => dispatch(StopAcquisitionProcessingChainActions.stop(chainId)),
      deleteChain: (id) => dispatch(AcquisitionProcessingChainEditActions.deleteEntity(id)),
      toggleChain: (chainId, target, nextValue) => dispatch(ToggleAcquisitionProcessingChainActions.toggle(chainId, target, nextValue)),
      multiToggleChain: (chains, target, nextValue) => dispatch(MultiToggleAcquisitionProcessingChainActions.toggle(chains, target, nextValue)),
      throwError: (message) => dispatch(ApplicationErrorAction.throwError(message)),
    }
  }

  state = { isFetching: false }

  /**
   * Lifecycle method: component did mount. Used here to fetch user lists
   */
  componentDidMount = () => {
    this.setState({ isFetching: false })
  }

  /**
   * Callback to return to the acquisition board
   */
  onBack = () => {
    const { params: { project } } = this.props
    browserHistory.push(`/admin/${project}/data/acquisition/board`)
  }

  /**
   * Callback to go to chain edition page
   * @param {*} chainIdToEdit : identifier of the generation chain to edit
   */
  onEdit = (chainIdToEdit) => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/acquisition/dataprovider/chain/${chainIdToEdit}/edit`
    browserHistory.push(url)
  }

  /**
   * Callback to go to the duplication page of the given chain.
   * @param {*} chainIdToDuplicate : Identifier of the chain to duplicate
   */
  onDuplicate = (chainIdToDuplicate) => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/acquisition/dataprovider/chain/${chainIdToDuplicate}/duplicate`
    browserHistory.push(url)
  }

  /**
   * Callback to go to session list associated to the given acquisition chain
   */
  onListSessions = (source) => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/acquisition/dashboard/monitor?sourceName=${source}`
    browserHistory.push(url)
  }

  getFetchPageSize = () => {
    const { meta } = this.props
    const lastPage = (meta && meta.number) || 0
    return TableFilterSortingAndVisibilityContainer.PAGE_SIZE * (lastPage + 1)
  }

  onRefresh = (requestParameters) => {
    const { fetchPage } = this.props
    const fetchPageSize = this.getFetchPageSize()
    return fetchPage(0, fetchPageSize, { ...pick(requestParameters, 'sort') }, { ...omit(requestParameters, 'sort') })
  }

  /**
   * Callback to go to the chain creation page
   */
  onCreate = () => {
    const { params: { project } } = this.props
    browserHistory.push(`/admin/${project}/data/acquisition/dataprovider/chain/create`)
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

  onToggle = (entity, target, nextValue, onRefresh) => {
    const { toggleChain } = this.props
    const { chainId } = entity.content
    this.perform(toggleChain(chainId, target, nextValue), onRefresh)
  }

  onMultiToggleSelection = (target, nextValue, onRefresh) => {
    const { toggledChains, multiToggleChain } = this.props
    const chainList = map(toggledChains, 'content.chainId')
    this.perform(multiToggleChain(chainList, target, nextValue), onRefresh)
  }

  /**
   * Callback to delete the given chain by id
   * @param { content: * } chain : Object containing the chain to delete ({content: chain})
   */
  onDelete = (entity, onRefresh) => {
    const { deleteChain } = this.props
    const { chainId } = entity.content
    this.perform(deleteChain(chainId), onRefresh)
  }

  onRunChain = (entity, sessionName, onRefresh) => {
    const { runChain, throwError } = this.props
    const { intl: { formatMessage } } = this.context
    const { chainId, label } = entity.content
    this.perform(runChain(chainId, sessionName).then(
      (actionResult) => {
        if (actionResult.error) {
          throwError(formatMessage({ id: 'acquisition-chain.list.run.error' }, { label, chainId }))
        }
      },
    ), onRefresh)
  }

  onStopChain = (entity, onRefresh) => {
    const { stopChain, throwError } = this.props
    const { intl: { formatMessage } } = this.context
    const { chainId, label } = entity.content
    this.perform(stopChain(chainId).then(
      (actionResult) => {
        if (actionResult.error) {
          throwError(formatMessage({ id: 'acquisition-chain.list.stop.error' }, { label, chainId }))
        }
      },
    ), onRefresh)
  }

  render() {
    const {
      meta, entitiesLoading, params: { project }, isOneCheckboxToggled, displayLogic, availableDependencies,
    } = this.props
    const { isFetching } = this.state

    const hasAccess = displayLogic(AcquisitionProcessingChainListFiltersComponent.TOGGLE_MULTIPLE_CHAIN_DEPENDENCIES, availableDependencies)
    return (
      <AcquisitionProcessingChainListComponent
        project={project}
        onRefresh={this.onRefresh}
        onBack={this.onBack}
        onCreate={this.onCreate}
        onDelete={this.onDelete}
        onEdit={this.onEdit}
        onDuplicate={this.onDuplicate}
        onListSessions={this.onListSessions}
        onRunChain={this.onRunChain}
        onStopChain={this.onStopChain}
        resultsCount={meta.totalElements}
        entitiesLoading={entitiesLoading || isFetching}
        onMultiToggleSelection={this.onMultiToggleSelection}
        onToggle={this.onToggle}
        onToggleEnable={this.onToggleEnable}
        isOneCheckboxToggled={isOneCheckboxToggled}
        hasAccess={hasAccess}
      />
    )
  }
}
export default compose(
  connect(AcquisitionProcessingChainListContainer.mapStateToProps,
    AcquisitionProcessingChainListContainer.mapDispatchToProps),
  withI18n(messages))(AcquisitionProcessingChainListContainer)
