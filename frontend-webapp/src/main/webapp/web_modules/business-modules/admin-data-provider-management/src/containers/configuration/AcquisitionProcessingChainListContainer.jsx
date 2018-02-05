/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import AcquisitionProcessingChainListComponent from '../../components/configuration/AcquisitionProcessingChainListComponent'
import { AcquisitionProcessingChainActions } from '../../clients/AcquisitionProcessingChainClient'

/**
* AcquisitionProcessingChainListContainer
* @author Sébastien Binda
*/
export class AcquisitionProcessingChainListContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {}
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch) {
    return {
      deleteChain: id => dispatch(AcquisitionProcessingChainActions.deleteEntity(id)),
      fetchPage: (pageIndex, pageSize) => dispatch(AcquisitionProcessingChainActions.fetchPagedEntityList(pageIndex, pageSize)),
    }
  }

  static propTypes = {
    params: PropTypes.shape({
      project: PropTypes.string,
    }),
    // from mapDispatchToProps
    deleteChain: PropTypes.func,
    fetchPage: PropTypes.func,
  }

  static PAGE_SIZE = 100

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
   * Callback to go to the chain creation page
   */
  onCreate = () => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/acquisition/dataprovider/chain/create`
    browserHistory.push(url)
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
   * Callback to delete the given chain by id
   * @param { content: * } chain : Object containing the chain to delete ({content: chain})
   */
  onDelete = ({ content: { id } }, callback) => {
    this.props.deleteChain(id).then(callback)
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

  render() {
    return (
      <AcquisitionProcessingChainListComponent
        fetchPage={this.props.fetchPage}
        onDelete={this.onDelete}
        onEdit={this.onEdit}
        onDuplicate={this.onDuplicate}
        onCreate={this.onCreate}
        onBack={this.onBack}
        queryPageSize={AcquisitionProcessingChainListContainer.PAGE_SIZE}
      />
    )
  }
}
export default connect(
  AcquisitionProcessingChainListContainer.mapStateToProps,
  AcquisitionProcessingChainListContainer.mapDispatchToProps,
)(AcquisitionProcessingChainListContainer)
