/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { ProcessingShapes } from '@regardsoss/shape'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import get from 'lodash/get'
import { processingActions, processingSelectors } from '../clients/ProcessingClient'
import ProcessingFormComponent from '../components/ProcessingFormComponent'

/**
* Container to handle create/edit/duplicate form of a storage location plugin
* @author Théo Lasserre
*/
export class ProcessingFormContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, ownProps) {
    return {
      entity: get(ownProps, 'params.businessId') ? processingSelectors.getById(state, ownProps.params.businessId) : null,
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of actions ready to be dispatched in the redux store
   */
  static mapDispatchToProps(dispatch, ownProps) {
    return {
      fetch: (businessId) => dispatch(processingActions.fetchEntity(businessId)),
      create: (entity) => dispatch(processingActions.createEntity(entity)),
      update: (entityId, entity) => dispatch(processingActions.updateEntity(entityId, entity)),
    }
  }

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string.isRequired,
      businessId: PropTypes.string,
    }),
    // from mapStateToProps
    entity: ProcessingShapes.Processing,
    // from mapDispatchToProps
    fetch: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    create: PropTypes.func.isRequired,
  }

  state = {
    isLoading: !!get(this.props, 'params.businessId', false),
    mode: 'create',
  }

  UNSAFE_componentWillMount() {
    const { params: { businessId }, fetch } = this.props
    if (businessId) {
      fetch(businessId).then(() => this.setState({ isLoading: false, mode: 'edit' }))
    }
  }

  render() {
    const {
      params: { project }, entity, update, create,
    } = this.props

    return (
      <LoadableContentDisplayDecorator
        isLoading={this.state.isLoading}
      >
        {() => (
          <ProcessingFormComponent
            project={project}
            mode={this.state.mode}
            entity={entity}
            onUpdate={update}
            onCreate={create}
          />
        )}
      </LoadableContentDisplayDecorator>
    )
  }
}

export default connect(
  ProcessingFormContainer.mapStateToProps,
  ProcessingFormContainer.mapDispatchToProps)(ProcessingFormContainer)
