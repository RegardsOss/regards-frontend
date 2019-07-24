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
import { connect } from '@regardsoss/redux'
import { StorageShapes } from '@regardsoss/shape'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { getActions, getSelectors } from '../clients/PrioritizedDataStorageClient'
import PrioritizedDataStorageFormComponent from '../components/PrioritizedDataStorageFormComponent'

/**
* Container to handle create/edit/duplicate form of a storage location plugin
* @author Sébastien Binda
*/
export class PrioritizedDataStorageFormContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, ownProps) {
    return {
      entity: get(ownProps, 'params.id') ? getSelectors(ownProps.params.type).getById(state, ownProps.params.id) : null,
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
      fetch: entityId => dispatch(getActions(ownProps.params.type).fetchEntity(entityId)),
      create: entity => dispatch(getActions(ownProps.params.type).createEntity(entity)),
      update: (entityId, entity) => dispatch(getActions(ownProps.params.type).updateEntity(entityId, entity)),
    }
  }

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      id: PropTypes.string,
      mode: PropTypes.string,
    }),
    // from mapStateToProps
    entity: StorageShapes.PrioritizedDataStorage,
    // from mapDispatchToProps
    fetch: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    create: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      isLoading: !!get(props, 'params.id', false),
    }
  }

  componentWillMount() {
    const { params: { id }, fetch } = this.props
    if (id) {
      fetch(id).then(() => this.setState({ isLoading: false }))
    }
  }

  render() {
    const {
      params: { mode, project, type }, entity, update, create,
    } = this.props
    return (
      <LoadableContentDisplayDecorator
        isLoading={this.state.isLoading}
      >
        {() => (
          <PrioritizedDataStorageFormComponent
            mode={mode || 'create'}
            entity={entity}
            type={type}
            backUrl={`/admin/${project}/data/acquisition/storage/storages`}
            onUpdate={update}
            onCreate={create}
          />
        )
        }
      </LoadableContentDisplayDecorator>
    )
  }
}

export default connect(
  PrioritizedDataStorageFormContainer.mapStateToProps,
  PrioritizedDataStorageFormContainer.mapDispatchToProps)(PrioritizedDataStorageFormContainer)
