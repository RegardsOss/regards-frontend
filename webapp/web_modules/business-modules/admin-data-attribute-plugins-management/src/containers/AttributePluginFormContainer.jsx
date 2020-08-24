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
import get from 'lodash/get'
import { connect } from '@regardsoss/redux'
import { CommonShapes } from '@regardsoss/shape'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { pluginConfigurationActions, pluginConfigurationByPluginIdActions, pluginConfigurationSelectors } from '../clients/PluginConfigurationClient'
import AttributePluginFormComponent from '../components/AttributePluginFormComponent'

const MICROSERVICE = STATIC_CONF.MSERVICES.DAM

/**
* Container to handle create/edit/duplicate form of a attribute calculation plugin
* @author Sébastien Binda
*/
export class AttributePluginFormContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, ownProps) {
    return {
      entity: get(ownProps, 'params.pluginId') ? pluginConfigurationSelectors.getById(state, ownProps.params.pluginId) : null,
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch, props) {
    return {
      fetch: (entityId) => dispatch(pluginConfigurationActions.fetchEntity(entityId, { microserviceName: MICROSERVICE })),
      create: (entity, microserviceName, pluginId) => dispatch(pluginConfigurationByPluginIdActions.createEntity({
        ...entity,
        businessId: null, // clear source entity business ID for duplication case
      }, { microserviceName, pluginId })),
      update: (entity, microserviceName, pluginId, pluginConfBusinessId) => dispatch(pluginConfigurationByPluginIdActions.updateEntity(pluginConfBusinessId, entity, { microserviceName, pluginId })),
    }
  }

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string.isRequired,
      pluginId: PropTypes.string,
      mode: PropTypes.string,
    }),
    // from mapStateToProps
    entity: CommonShapes.PluginConfiguration,
    // from mapDispatchToProps
    fetch: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    create: PropTypes.func.isRequired,
  }

  state = {
    isLoading: !!get(this.props, 'params.pluginId', false),
  }

  UNSAFE_componentWillMount() {
    const { params: { pluginId }, fetch } = this.props
    if (pluginId) {
      fetch(pluginId).then(() => this.setState({ isLoading: false }))
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
          <AttributePluginFormComponent
            mode={mode || 'create'}
            pluginConfiguration={entity}
            backUrl={`/admin/${project}/data/models/calculationplugins/list`}
            onUpdate={update}
            onCreate={create}
          />
        )}
      </LoadableContentDisplayDecorator>
    )
  }
}
export default connect(
  AttributePluginFormContainer.mapStateToProps,
  AttributePluginFormContainer.mapDispatchToProps)(AttributePluginFormContainer)
