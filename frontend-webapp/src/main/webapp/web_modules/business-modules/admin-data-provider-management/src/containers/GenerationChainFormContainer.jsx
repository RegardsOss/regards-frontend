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
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { ErrorCardComponent } from '@regardsoss/components'
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
      chain: get(ownProps, 'params.chainId', false) ? generationChainSelectors.getById(ownProps.params.chainId) : undefined,
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
      create: values => dispatch(generationChainActions.createEntity(values)),
      update: (id, values) => dispatch(generationChainActions.updateEntity(id, values)),
    }
  }

  static propTypes = {
    params: PropTypes.shape({
      project: PropTypes.string.isRequired,
      chainId: PropTypes.string,
      mode: PropTypes.string,
    }),
    // from mapStateToProps
    chain: DataProviderShapes.GenerationChain,
    // from mapDispatchToProps
    fetch: PropTypes.func.isRequired,
    create: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    const isLoading = !(props.params.chainId === undefined)
    this.state = {
      isLoading,
      isLoadingError: false,
    }
  }

  componentDidMount() {
    const { params: { chainId }, fetch } = this.props
    if (chainId) {
      fetch(chainId).then((actionResults) => {
        if (actionResults.error) {
          this.setState({
            isLoading: false,
            isLoadingError: true,
          })
        } else {
          this.setState({
            isLoading: false,
            isLoadingError: false,
          })
        }
      })
    }
  }

  /**
   * Callback to return to the list page
   */
  onBack = () => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/acquisition/dataprovider/chain/list`
    browserHistory.push(url)
  }

  /**
   * Callback to submit form values
   * @param {*} values : generationChain object to submit (update or create)
   */
  onSubmit = (values) => {
    const { params: { mode } } = this.props
    if (mode === 'edit') {
      this.props.update(values.id, values)
    } else {
      this.props.create(values)
    }
  }

  render() {
    const { chain, params: { mode } } = this.props
    const { isLoading, isLoadingError } = this.state
    return (
      <LoadableContentDisplayDecorator
        isLoading={isLoading}
        isContentError={isLoadingError}
        contentErrorComponent={<ErrorCardComponent />}
      >
        <GenerationChainFormComponent
          chain={chain}
          mode={mode}
          onSubmit={this.onSubmit}
          onBack={this.onBack}
        />
      </LoadableContentDisplayDecorator>
    )
  }
}
export default connect(
  GenerationChainFormContainer.mapStateToProps,
  GenerationChainFormContainer.mapDispatchToProps,
)(GenerationChainFormContainer)
