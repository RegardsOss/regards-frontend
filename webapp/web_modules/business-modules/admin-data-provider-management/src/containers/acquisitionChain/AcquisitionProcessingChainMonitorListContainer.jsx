/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { IngestShapes } from '@regardsoss/shape'
import { CommonEndpointClient } from '@regardsoss/endpoints-common'
import { allMatchHateoasDisplayLogic } from '@regardsoss/display-control'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { AcquisitionProcessingChainMonitorActions, AcquisitionProcessingChainMonitorSelectors }
  from '../../clients/AcquisitionProcessingChainMonitorClient'
import {
  RunAcquisitionProcessingChainActions, StopAcquisitionProcessingChainActions,
  ToggleAcquisitionProcessingChainActions, AcquisitionProcessingChainActions,
  MultiToggleAcquisitionProcessingChainActions,
}
  from '../../clients/AcquisitionProcessingChainClient'
import AcquisitionProcessingChainMonitorListComponent
  from '../../components/acquisitionChain/AcquisitionProcessingChainMonitorListComponent'
import { tableMonitorSelectors } from '../../clients/TableClient'

/**
* Container to handle monitoring AcquisitionProcessingChains.
* @author Sébastien Binda
*/
export class AcquisitionProcessingChainMonitorListContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    const toggledChains = tableMonitorSelectors.getToggledElementsAsList(state)

    return {
      meta: AcquisitionProcessingChainMonitorSelectors.getMetaData(state),
      entitiesLoading: AcquisitionProcessingChainMonitorSelectors.isFetching(state),
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
      fetchPage: (pageIndex, pageSize, requestParams) => dispatch(AcquisitionProcessingChainMonitorActions.fetchPagedEntityList(pageIndex, pageSize, {}, requestParams)),
      runChain: (chainId, sessionName) => dispatch(RunAcquisitionProcessingChainActions.run(chainId, sessionName)),
      stopChain: chainId => dispatch(StopAcquisitionProcessingChainActions.stop(chainId)),
      deleteChain: id => dispatch(AcquisitionProcessingChainActions.deleteEntity(id)),
      toggleChain: (chainId, target, nextValue) => dispatch(ToggleAcquisitionProcessingChainActions.toggle(chainId, target, nextValue)),
      multiToggleChain: (chains, target, nextValue) => dispatch(MultiToggleAcquisitionProcessingChainActions.toggle(chains, target, nextValue)),
    }
  }

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
      links: PropTypes.array,
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

  /** List of dependencies required for toggling multiple chains state  */
  static TOGGLE_MULTIPLE_CHAIN_DEPENDENCIES = [MultiToggleAcquisitionProcessingChainActions.getDependency(RequestVerbEnum.PATCH)]

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
   * Callback to return to the acquisition board
   */
  onListChainAction = (source) => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/acquisition/dataprovider/sessions?source=${source}`
    browserHistory.push(url)
  }

  onRefresh = (filters) => {
    const { meta, fetchPage } = this.props
    const curentPage = get(meta, 'number', 0)
    return fetchPage(0, AcquisitionProcessingChainMonitorListContainer.PAGE_SIZE * (curentPage + 1), filters)
  }

  /**
   * Callback to delete the given chain by id
   * @param { content: * } chain : Object containing the chain to delete ({content: chain})
   */
  onDelete = ({ content: { id } }, callback) => {
    this.props.deleteChain(id).then(callback)
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

  onToggle = (chainId, target, nextValue) => {
    this.props.toggleChain(chainId, target, nextValue)
  }


  render() {
    const {
      meta, entitiesLoading, runChain, stopChain, params: { project }, isOneCheckboxToggled, displayLogic, availableDependencies,
    } = this.props

    const hasAccess = displayLogic(AcquisitionProcessingChainMonitorListContainer.TOGGLE_MULTIPLE_CHAIN_DEPENDENCIES, availableDependencies)
    return (
      <AcquisitionProcessingChainMonitorListComponent
        project={project}
        onRefresh={this.onRefresh}
        onBack={this.onBack}
        onCreate={this.onCreate}
        onDelete={this.onDelete}
        onEdit={this.onEdit}
        onDuplicate={this.onDuplicate}
        fetchPage={this.props.fetchPage}
        onListChainAction={this.onListChainAction}
        onRunChain={runChain}
        onStopChain={stopChain}
        pageSize={AcquisitionProcessingChainMonitorListContainer.PAGE_SIZE}
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
  AcquisitionProcessingChainMonitorListContainer.mapStateToProps,
  AcquisitionProcessingChainMonitorListContainer.mapDispatchToProps)(AcquisitionProcessingChainMonitorListContainer)
