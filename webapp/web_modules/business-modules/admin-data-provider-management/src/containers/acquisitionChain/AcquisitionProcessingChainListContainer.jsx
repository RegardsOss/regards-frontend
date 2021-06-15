/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import get from 'lodash/get'
import map from 'lodash/map'
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { IngestShapes, CommonShapes } from '@regardsoss/shape'
import { CommonEndpointClient } from '@regardsoss/endpoints-common'
import { allMatchHateoasDisplayLogic } from '@regardsoss/display-control'
import {
  RunAcquisitionProcessingChainActions, StopAcquisitionProcessingChainActions,
  ToggleAcquisitionProcessingChainActions, AcquisitionProcessingChainActions, AcquisitionProcessingChainEditActions,
  MultiToggleAcquisitionProcessingChainActions, AcquisitionProcessingChainSelectors,
} from '../../clients/AcquisitionProcessingChainClient'
import AcquisitionProcessingChainListComponent from '../../components/acquisitionChain/AcquisitionProcessingChainListComponent'
import { tableSelectors } from '../../clients/TableClient'
import AcquisitionProcessingChainListFiltersComponent from '../../components/acquisitionChain/AcquisitionProcessingChainListFiltersComponent'

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
  }

  static defaultProps = {
    meta: {
      totalElements: 0,
    },
    displayLogic: allMatchHateoasDisplayLogic,
  }

  static PAGE_SIZE = 100

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
      fetchPage: (pageIndex, pageSize, requestParams) => dispatch(AcquisitionProcessingChainActions.fetchPagedEntityList(pageIndex, pageSize, {}, requestParams)),
      runChain: (chainId, sessionName) => dispatch(RunAcquisitionProcessingChainActions.run(chainId, sessionName)),
      stopChain: (chainId) => dispatch(StopAcquisitionProcessingChainActions.stop(chainId)),
      deleteChain: (id) => dispatch(AcquisitionProcessingChainEditActions.deleteEntity(id)),
      toggleChain: (chainId, target, nextValue) => dispatch(ToggleAcquisitionProcessingChainActions.toggle(chainId, target, nextValue)),
      multiToggleChain: (chains, target, nextValue) => dispatch(MultiToggleAcquisitionProcessingChainActions.toggle(chains, target, nextValue)),
    }
  }

  /**
   * Callback to return to the acquisition board
   */
  onBack = () => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/acquisition/board`
    browserHistory.push(url)
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

  onRefresh = (filters) => {
    const { meta, fetchPage } = this.props
    const curentPage = get(meta, 'number', 0)
    return fetchPage(0, AcquisitionProcessingChainListContainer.PAGE_SIZE * (curentPage + 1), filters)
  }

  /**
   * Callback to delete the given chain by id
   * @param { content: * } chain : Object containing the chain to delete ({content: chain})
   */
  onDelete = ({ content: { chainId } }, callback) => {
    this.props.deleteChain(chainId).then(callback)
  }

  /**
   * Callback to go to the chain creation page
   */
  onCreate = () => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/acquisition/dataprovider/chain/create`
    browserHistory.push(url)
  }

  onMultiToggleSelection = (target, nextValue) => {
    //
    const { toggledChains, multiToggleChain } = this.props
    const chainList = map(toggledChains, 'content.chainId')
    multiToggleChain(chainList, target, nextValue)
  }

  onToggle = (chainId, target, nextValue) => this.props.toggleChain(chainId, target, nextValue)

  render() {
    const {
      meta, entitiesLoading, runChain, stopChain, params: { project }, isOneCheckboxToggled, displayLogic, availableDependencies,
    } = this.props

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
        fetchPage={this.props.fetchPage}
        onListSessions={this.onListSessions}
        onRunChain={runChain}
        onStopChain={stopChain}
        pageSize={AcquisitionProcessingChainListContainer.PAGE_SIZE}
        resultsCount={meta.totalElements}
        entitiesLoading={entitiesLoading}
        onMultiToggleSelection={this.onMultiToggleSelection}
        onToggle={this.onToggle}
        onToggleEnable={this.onToggleEnable}
        isOneCheckboxToggled={isOneCheckboxToggled}
        hasAccess={hasAccess}
      />
    )
  }
}
export default connect(
  AcquisitionProcessingChainListContainer.mapStateToProps,
  AcquisitionProcessingChainListContainer.mapDispatchToProps)(AcquisitionProcessingChainListContainer)
