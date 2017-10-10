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
import { connect } from '@regardsoss/redux'
import { I18nProvider, i18nContextType } from '@regardsoss/i18n'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { themeContextType } from '@regardsoss/theme'
import { CommonShapes } from '@regardsoss/shape'
import PluginTypeActions from '../../model/plugin/PluginTypeActions'
import PluginTypeSelectors from '../../model/plugin/PluginTypeSelectors'
import PluginMetaDataActions from '../../model/plugin/PluginMetaDataActions'
import PluginMetaDataSelectors from '../../model/plugin/PluginMetaDataSelectors'
import PluginMetaDataListComponent from '../../components/plugin/PluginMetaDataListComponent'

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
    // from mapDispatchToProps
    fetchPluginTypeList: PropTypes.func,
    fetchPluginMetaDataList: PropTypes.func,
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
  getView = () => (
    <PluginMetaDataListComponent
      microserviceName={this.props.params.microserviceName}
      pluginTypes={this.props.pluginTypes}
      pluginMetaDataList={this.props.pluginMetaDataList}
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
      <I18nProvider messageDir="business-modules/admin-microservice-management/src/i18n">
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
  pluginTypes: PluginTypeSelectors.getList(state),
  pluginMetaDataList: PluginMetaDataSelectors.getList(state),
})

const mapDispatchToProps = dispatch => ({
  fetchPluginTypeList: microserviceName => dispatch(PluginTypeActions.fetchEntityList({ microserviceName })),
  fetchPluginMetaDataList: microserviceName => dispatch(PluginMetaDataActions.fetchEntityList({ microserviceName })),
})

export default connect(mapStateToProps, mapDispatchToProps)(PluginMetaDataListContainer)
