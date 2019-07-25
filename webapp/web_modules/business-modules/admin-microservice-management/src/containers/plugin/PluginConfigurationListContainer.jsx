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
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { CommonShapes } from '@regardsoss/shape'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { themeContextType } from '@regardsoss/theme'
import { I18nProvider, i18nContextType } from '@regardsoss/i18n'
import { pluginMetaDataActions, pluginMetaDataSelectors } from '../../clients/PluginMetadataClient'
import { pluginConfigurationByPluginIdActions, pluginConfigurationSelectors } from '../../clients/PluginConfigurationClient'
import PluginConfigurationListComponent from '../../components/plugin/PluginConfigurationListComponent'
import messages from '../../i18n'

/**
 * Container connecting the plugin configuration list to the redux store and handling user interface actions.
 *
 * @author Xavier-Alexandre Brochard
 */
export class PluginConfigurationListContainer extends React.Component {
  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
      microserviceName: PropTypes.string,
      pluginId: PropTypes.string,
      pluginConfigurationId: PropTypes.string,
    }),
    // from mapStateToProps
    pluginMetaData: CommonShapes.PluginMetaData,
    pluginConfigurationList: CommonShapes.PluginConfigurationList,
    // from mapDispatchToProps
    fetchPluginMetaData: PropTypes.func,
    fetchPluginConfigurationList: PropTypes.func,
    // eslint-disable-next-line react/no-unused-prop-types
    deletePluginConfiguration: PropTypes.func,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  state = {
    isLoading: true,
  }

  componentDidMount() {
    const { params: { microserviceName, pluginId } } = this.props
    const tasks = [
      this.props.fetchPluginMetaData(pluginId, microserviceName),
      this.props.fetchPluginConfigurationList(microserviceName, pluginId),
    ]
    return Promise.all(tasks)
      .then((actionResults) => {
        this.setState({
          isLoading: false,
        })
        return actionResults
      })
  }

  getView = () => (
    <PluginConfigurationListComponent
      params={this.props.params}
      pluginMetaData={this.props.pluginMetaData}
      pluginConfigurationList={this.props.pluginConfigurationList}
      getBackURL={this.getBackURL}
      getAddURL={this.getAddURL}
    />
  )

  getAddURL = () => {
    const { params: { project, microserviceName, pluginId } } = this.props
    const { query } = browserHistory.getCurrentLocation()
    const url = `/admin/${project}/microservice/${microserviceName}/plugin/${pluginId}/configuration/create`
    if (query.backUrl && query.backUrl !== '') {
      return `${url}?backUrl=${query.backUrl}`
    }
    return url
  }

  /**
   * Return string url from the query parameter backUrl in the current url if any or fixed one to return to the plugin list.
   */
  getBackURL = () => {
    const { params: { project, microserviceName } } = this.props
    const { query } = browserHistory.getCurrentLocation()
    if (query.backUrl && query.backUrl !== '') {
      return `/admin/${project}/${query.backUrl}`
    }
    return `/admin/${project}/microservice/${microserviceName}/plugin/list`
  }

  render() {
    const { isLoading } = this.state
    return (
      <I18nProvider messages={messages}>
        <LoadableContentDisplayDecorator
          isLoading={isLoading}
        >
          {this.getView}
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  pluginMetaData: pluginMetaDataSelectors.getById(state, ownProps.params.pluginId),
  pluginConfigurationList: pluginConfigurationSelectors.getListByPluginId(state, ownProps.params.pluginId),
})

const mapDispatchToProps = dispatch => ({
  fetchPluginMetaData: (pluginId, microserviceName) => dispatch(pluginMetaDataActions.fetchEntity(pluginId, { microserviceName })),
  fetchPluginConfigurationList: (microserviceName, pluginId) => dispatch(pluginConfigurationByPluginIdActions.fetchEntityList({
    microserviceName,
    pluginId,
  })),
  deletePluginConfiguration: (pluginConfigurationId, microserviceName, pluginId) => dispatch(pluginConfigurationByPluginIdActions.deleteEntity(pluginConfigurationId, {
    microserviceName,
    pluginId,
  })),
})

export default connect(mapStateToProps, mapDispatchToProps)(PluginConfigurationListContainer)
