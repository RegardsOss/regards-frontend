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
import GenerationChainListComponent from '../components/GenerationChainListComponent'
import { generationChainActions, generationChainSelectors } from '../clients/GenerationChainClient'

/**
* GenerationChainListContainer
* @author Sébastien Binda
*/
export class GenerationChainListContainer extends React.Component {
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
      deleteChain: id => dispatch(generationChainActions.deleteEntity(id)),
      fetchPage: (pageIndex, pageSize) => dispatch(generationChainActions.fetchPagedEntityList(pageIndex, pageSize)),
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

  onEdit = (chainIdToEdit) => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/acquisition/dataprovider/chain/${chainIdToEdit}/edit`
    browserHistory.push(url)
  }

  onCreate = () => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/acquisition/dataprovider/chain/create`
    browserHistory.push(url)
  }

  onBack = () => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/acquisition/board`
    browserHistory.push(url)
  }

  onDelete = ({ content: { id } }, callback) => {
    this.props.deleteChain(id).then(callback)
  }

  render() {
    const { maProp } = this.props
    return (
      <GenerationChainListComponent
        fetchPage={this.props.fetchPage}
        onDelete={this.onDelete}
        onEdit={this.onEdit}
        onCreate={this.onCreate}
        onBack={this.onBack}
        queryPageSize={GenerationChainListContainer.PAGE_SIZE}
      />
    )
  }
}
export default connect(
  GenerationChainListContainer.mapStateToProps,
  GenerationChainListContainer.mapDispatchToProps,
)(GenerationChainListContainer)
