/**
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { I18nProvider, i18nContextType } from '@regardsoss/i18n'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { StorageDomain } from '@regardsoss/domain'
import { themeContextType } from '@regardsoss/theme'
import { CommonShapes } from '@regardsoss/shape'
import PluginMetaDataListComponent from '../components/PluginMetaDataListComponent'
import { pluginMetaDataActions, pluginMetaDataSelectors } from '../clients/PluginMetadataClient'
import messages from '../i18n'

const MICROSERVICE = STATIC_CONF.MSERVICES.STORAGE
/**
 * Displays the list of plugins for the current microservice (in route) as a {@link GridList} of {@link Card}s sorted by
 * plugin type.
 *
 * @author Sébastien Binda
 */
export class AllocationPluginsConfContainer extends React.Component {
  static mapStateToProps = (state, ownProps) => ({
    entities: pluginMetaDataSelectors.getList(state),
  })

  static mapDispatchToProps = dispatch => ({
    fetch: () => dispatch(pluginMetaDataActions.fetchEntityList({ microserviceName: MICROSERVICE })),
  })

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
    }),
    // from mapStateToProps
    entities: CommonShapes.PluginMetaDataList,
    // from mapDispatchToProps
    fetch: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static defaultProps = {
    entities: {},
  }

  state = {
    isLoading: true,
  }

  componentDidMount() {
    const { fetch } = this.props
    fetch().then((actionResults) => {
      this.setState({
        isLoading: false,
      })
      return actionResults
    })
  }

  /**
   * @return back URL
   */
  onBack = () => {
    const { params: { project } } = this.props
    browserHistory.push(`/admin/${project}/data/acquisition/board`)
  }

  /**
   * @param pluginId plugin ID
   * @return create new configuration URL for navigation
   */
  onAddConf = (pluginId) => {
    const { params: { project } } = this.props
    return `/admin/${project}/microservice/${MICROSERVICE}/plugin/${pluginId}/configuration/create?backUrl=data/acquisition/storage/allocations`
  }

  getView = () => (
    <PluginMetaDataListComponent
      microserviceName={MICROSERVICE}
      pluginType={StorageDomain.PluginTypeEnum.ALLOCATION_STRATEGY}
      pluginMetaDataList={this.props.entities}
      getProjectConfigurationListURL={this.getProjectConfigurationListURL}
      getAddConfURL={this.onAddConf}
      onBack={this.onBack}
    />
  )

  /**
   * @param pluginId plugin ID
   * @return project plugins configuration list URL for navigation
   */
  getProjectConfigurationListURL = (pluginId) => {
    const { params: { project } } = this.props
    return `/admin/${project}/microservice/${MICROSERVICE}/plugin/${pluginId}/configuration/list?backUrl=data/acquisition/storage/allocations`
  }

  render() {
    const { isLoading } = this.state
    return (
      <I18nProvider messages={messages}>
        <LoadableContentDisplayDecorator
          isLoading={isLoading}
        >
          {this.getView()}
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}

export default connect(AllocationPluginsConfContainer.mapStateToProps,
  AllocationPluginsConfContainer.mapDispatchToProps)(AllocationPluginsConfContainer)
