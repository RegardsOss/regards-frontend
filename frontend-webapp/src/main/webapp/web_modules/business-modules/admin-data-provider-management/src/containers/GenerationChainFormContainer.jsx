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
import get from 'lodash/get'
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { DataProviderShapes } from '@regardsoss/shape'
import GenerationChainFormComponent from '../components/GenerationChainFormComponent'
import { generationChainActions, generationChainSelectors } from '../clients/GenerationChainClient'

/**
* Container to display a form of GenerationChain entity
* @author Sébastien Binda
*/
export class GenerationChainFormContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, ownProps) {
    return {
      chain: get(ownProps, 'params.chain_id', false) ? generationChainSelectors.getById(ownProps.params.chain_id) : undefined,
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
      fetch: id => dispatch(generationChainActions.fetchEntity(id)),
    }
  }

  static propTypes = {
    params: PropTypes.shape({
      project: PropTypes.string.isRequired,
      chain_id: PropTypes.string,
    }),
    // from mapStateToProps
    chain: DataProviderShapes.GenerationChain,
    // from mapDispatchToProps
    fetch: PropTypes.func.isRequired,
  }

  onSubmit = () => {

  }

  onBack = () => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/acquisition/dataprovider/chain/list`
    browserHistory.push(url)
  }

  render() {
    const { chain } = this.props
    return (
      <GenerationChainFormComponent
        chain={chain}
        onSubmit={this.onSubmit}
        onBack={this.onBack}
      />
    )
  }
}
export default connect(
  GenerationChainFormContainer.mapStateToProps,
  GenerationChainFormContainer.mapDispatchToProps,
)(GenerationChainFormContainer)
