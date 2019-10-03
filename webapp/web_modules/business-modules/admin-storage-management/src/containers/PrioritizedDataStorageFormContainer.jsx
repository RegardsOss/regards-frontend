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
import { storagesPluginActions, storagesPluginSelectors } from '../clients/StoragesPluginClient'
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
      entity: get(ownProps, 'params.name') ? storagesPluginSelectors.getById(state, ownProps.params.name) : null,
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
      fetch: entityName => dispatch(storagesPluginActions.fetchEntity(entityName)),
      create: entity => dispatch(storagesPluginActions.createEntity(entity)),
      update: (entityName, entity) => dispatch(storagesPluginActions.updateEntity(entityName, entity)),
    }
  }

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string.isRequired,
      name: PropTypes.string,
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
      isLoading: !!get(props, 'params.name', false),
    }
  }

  componentWillMount() {
    const { params: { name }, fetch } = this.props
    if (name) {
      fetch(name).then(() => this.setState({ isLoading: false }))
    }
  }

  render() {
    const {
      params: { mode, project }, entity, update, create,
    } = this.props
    return (
      <LoadableContentDisplayDecorator
        isLoading={this.state.isLoading}
      >
        {() => (
          <PrioritizedDataStorageFormComponent
            mode={mode || 'create'}
            entity={entity}
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
