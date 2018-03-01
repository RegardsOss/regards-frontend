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
import { connect } from '@regardsoss/redux'
import { CommonShapes } from '@regardsoss/shape'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { pluginConfigurationActions, pluginConfigurationByPluginIdActions, pluginConfigurationSelectors } from '../clients/PluginConfigurationClient'
import PluginStorageConfigurationFormComponent from '../components/PluginStorageConfigurationFormComponent'

/**
* Container to handle create/edit/duplicate form of a storage location plugin
* @author Sébastien Binda
*/
export class PluginStorageConfigurationFormContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, ownProps) {
    return {
      pluginConf: get(ownProps, 'params.pluginId') ? pluginConfigurationSelectors.getById(state, ownProps.params.pluginId) : null,
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
      fetchPluginConfiguration: pluginConfId => dispatch(pluginConfigurationActions.fetchEntity(pluginConfId, { microserviceName: STATIC_CONF.MSERVICES.STORAGE })),
      createPluginConfiguration: (vals, microserviceName, pluginId) => dispatch(pluginConfigurationByPluginIdActions.createEntity(vals, {
        microserviceName,
        pluginId,
      })),
      updatePluginConfiguration: (vals, microserviceName, pluginId, pluginConfId) => dispatch(pluginConfigurationByPluginIdActions.updateEntity(pluginConfId, vals, {
        microserviceName,
        pluginId,
      })),
    }
  }

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
      mode: PropTypes.string,
      pluginId: PropTypes.string,
    }),
    // from mapStateToProps
    pluginConf: CommonShapes.PluginConfiguration,
    // from mapDispatchToProps
    fetchPluginConfiguration: PropTypes.func.isRequired,
    updatePluginConfiguration: PropTypes.func.isRequired,
    createPluginConfiguration: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      isLoading: !!get(props, 'params.pluginId', false),
    }
  }

  componentWillMount() {
    const { params: { pluginId } } = this.props
    if (pluginId) {
      this.props.fetchPluginConfiguration(pluginId).then(() => this.setState({ isLoading: false }))
    }
  }

  render() {
    const { params: { mode, project }, pluginConf } = this.props
    return (
      <LoadableContentDisplayDecorator
        isLoading={this.state.isLoading}
      >
        {() => (
          <PluginStorageConfigurationFormComponent
            mode={mode || 'create'}
            pluginConfiguration={pluginConf}
            backUrl={`/admin/${project}/data/acquisition/storage/storages/list`}
            onUpdatePluginConfiguration={this.props.updatePluginConfiguration}
            onCreatePluginConfiguration={this.props.createPluginConfiguration}
          />
        )
        }
      </LoadableContentDisplayDecorator >
    )
  }
}
export default connect(
  PluginStorageConfigurationFormContainer.mapStateToProps,
  PluginStorageConfigurationFormContainer.mapDispatchToProps)(PluginStorageConfigurationFormContainer)
