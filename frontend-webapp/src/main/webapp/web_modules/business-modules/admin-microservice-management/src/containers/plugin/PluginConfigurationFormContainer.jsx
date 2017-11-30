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
import { PluginFormConfigurator } from '@regardsoss/microservice-plugin-configurator'
/**
 * Container connecting the plugin configuration from to the redux store and handling user actions.
 *
 * @author Xavier-Alexandre Brochard
 */
export class PluginConfigurationFormContainer extends React.Component {
  static storePath = ['admin', 'microservice-management', 'pluginConfigurator']

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
      microserviceName: PropTypes.string,
      pluginId: PropTypes.string,
      pluginConfigurationId: PropTypes.string,
      formMode: PropTypes.oneOf(['create', 'edit', 'copy']),
    }),
  }

  static defaultProps = {
    params: {
      formMode: 'create',
    },
  }

  getBackUrl = () => {
    const { params: { project, microserviceName, pluginId } } = this.props
    const query = browserHistory.getCurrentLocation().query
    if (query.backUrl && query.backUrl !== '') {
      return `/admin/${project}/${query.backUrl}`
    }
    return `/admin/${project}/microservice/${microserviceName}/plugin/${pluginId}/configuration/list`
  }

  render() {
    const { params } = this.props
    return (
      <PluginFormConfigurator
        microserviceName={params.microserviceName}
        pluginId={params.pluginId}
        pluginConfigurationId={params.pluginConfigurationId}
        formMode={params.formMode}
        backUrl={this.getBackUrl()}
        storePath={PluginConfigurationFormContainer.storePath}
      />
    )
  }
}
const mapStateToProps = (state, ownProps) => ({
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(PluginConfigurationFormContainer)
