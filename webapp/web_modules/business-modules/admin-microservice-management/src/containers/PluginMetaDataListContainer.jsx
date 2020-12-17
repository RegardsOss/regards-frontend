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
import { I18nProvider, i18nContextType } from '@regardsoss/i18n'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { themeContextType } from '@regardsoss/theme'
import { CommonShapes } from '@regardsoss/shape'
import PluginMetaDataListComponent from '../components/PluginMetaDataListComponent'
import { pluginTypeSelectors, pluginTypeActions } from '../clients/PluginTypeClient'
import { pluginMetaDataActions, pluginMetaDataSelectors } from '../clients/PluginMetadataClient'
import { clearPluginCacheActions, clearPluginCacheSelectors } from '../clients/ClearPluginCacheClient'
import messages from '../i18n'

/**
 * Displays the list of plugins for the current microservice (in route) as a {@link GridList} of {@link Card}s sorted by
 * plugin type.
 *
 * @autor Xavier-Alexandre Brochard
 */
export class PluginMetaDataListContainer extends React.Component {
  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
      microserviceName: PropTypes.string,
    }),
    // from mapStateToProps
    pluginTypes: PropTypes.arrayOf(PropTypes.shape({
      content: PropTypes.string,
    })),
    pluginMetaDataList: CommonShapes.PluginMetaDataList,
    isFetchingClearPlugin: PropTypes.bool,
    // from mapDispatchToProps
    fetchClearPluginCache: PropTypes.func.isRequired,
    fetchPluginTypeList: PropTypes.func.isRequired,
    fetchPluginMetaDataList: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  state = {
    isLoading: true,
  }

  componentDidMount() {
    const { params: { microserviceName } } = this.props
    const tasks = [
      this.props.fetchPluginTypeList(microserviceName), // Fetch the plugin types
      this.props.fetchPluginMetaDataList(microserviceName),
    ]
    return Promise.all(tasks)
      .then((actionResults) => {
        this.setState({
          isLoading: false,
        })
        return actionResults
      })
  }

  onClearPluginCache = () => this.props.fetchClearPluginCache(this.props.params.microserviceName)

  getView = () => (
    <PluginMetaDataListComponent
      isFetchingClearPlugin={this.props.isFetchingClearPlugin}
      microserviceName={this.props.params.microserviceName}
      pluginTypes={this.props.pluginTypes}
      pluginMetaDataList={this.props.pluginMetaDataList}
      onClearPluginCache={this.onClearPluginCache}
      getProjectConfigurationListURL={this.getProjectConfigurationListURL}
      getAddURL={this.getAddURL}
      getBackURL={this.getBackURL}
    />
  )

  /**
   * @return back URL
   */
  getBackURL = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/microservice/board`
  }

  /**
   * @param pluginId plugin ID
   * @return create new configuration URL for navigation
   */
  getAddURL = (pluginId) => {
    const { params: { project, microserviceName } } = this.props
    return `/admin/${project}/microservice/${microserviceName}/plugin/${pluginId}/configuration/create`
  }

  /**
   * @param pluginId plugin ID
   * @return project plugins configuration list URL for navigation
   */
  getProjectConfigurationListURL = (pluginId) => {
    const { params: { project, microserviceName } } = this.props
    return `/admin/${project}/microservice/${microserviceName}/plugin/${pluginId}/configuration/list`
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
  isFetchingClearPlugin: clearPluginCacheSelectors.isFetching(state),
  pluginTypes: pluginTypeSelectors.getList(state),
  pluginMetaDataList: pluginMetaDataSelectors.getList(state),
})

const mapDispatchToProps = (dispatch) => ({
  fetchClearPluginCache: (microserviceName) => dispatch(clearPluginCacheActions.clearCache(microserviceName)),
  fetchPluginTypeList: (microserviceName) => dispatch(pluginTypeActions.fetchEntityList({ microserviceName }, { available: true })),
  fetchPluginMetaDataList: (microserviceName) => dispatch(pluginMetaDataActions.fetchEntityList({ microserviceName })),
})

export default connect(mapStateToProps, mapDispatchToProps)(PluginMetaDataListContainer)
