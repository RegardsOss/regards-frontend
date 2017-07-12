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
import { I18nProvider, i18nContextType } from '@regardsoss/i18n'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { themeContextType } from '@regardsoss/theme'
import { PluginLoader } from '@regardsoss/plugins'
import { AccessShapes } from '@regardsoss/shape'
import { uiPluginConfigurationSelectors, uiPluginConfigurationActions } from '../clients/UIPluginConfigurationClient'
import { uiPluginDefinitionSelectors, uiPluginDefinitionActions } from '../clients/UIPluginDefinitionClient'
import ServiceConfigurationListComponent from '../components/ServiceConfigurationListComponent'

/**
 * Show the list of plugin service configuration
 *
 * @author Léo Mieulet
 */
export class ServiceConfigurationListContainer extends React.Component {

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
      uiPluginId: PropTypes.string,
    }),
    // from mapStateToProps
    uiPluginConfigurationList: AccessShapes.UIPluginConfList,
    uiPluginDefinition: AccessShapes.UIPluginDefinition,
    // from mapDispatchToProps
    fetchUIPluginConfigurationList: PropTypes.func,
    fetchUIPluginDefinition: PropTypes.func,
    updateUIPluginConfiguration: PropTypes.func,
    deleteUIPluginConfiguration: PropTypes.func,
  }

  static mapStateToProps = (state, ownProps) => ({
    uiPluginConfigurationList: uiPluginConfigurationSelectors.getList(state),
    uiPluginDefinition: uiPluginDefinitionSelectors.getById(state, ownProps.params.uiPluginId),
  })

  static mapDispatchToProps = dispatch => ({
    deleteUIPluginConfiguration: (uiPluginConfId, uiPluginId) => dispatch(uiPluginConfigurationActions.deleteEntity(uiPluginConfId, { pluginId: uiPluginId })),
    fetchUIPluginConfigurationList: uiPluginId => dispatch(uiPluginConfigurationActions.fetchPagedEntityList(0, 100, { pluginId: uiPluginId })),
    updateUIPluginConfiguration: (uiPluginId, value) => dispatch(uiPluginConfigurationActions.updateEntity(uiPluginId, value, { pluginId: uiPluginId })),
    fetchUIPluginDefinition: uiPluginId => dispatch(uiPluginDefinitionActions.fetchEntity(uiPluginId)),
  })

  state = {
    isLoading: true,
  }

  componentDidMount() {
    const { params: { uiPluginId } } = this.props
    const tasks = [
      this.props.fetchUIPluginDefinition(uiPluginId),
      this.props.fetchUIPluginConfigurationList(uiPluginId),
    ]
    Promise.all(tasks)
      .then(() => {
        this.setState({
          isLoading: false,
        })
      })
  }

  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/ui/service/list`
  }

  getCreateUrl = () => {
    const { params: { project, uiPluginId } } = this.props
    return `/admin/${project}/ui/service/${uiPluginId}/create`
  }

  handleEdit = (uiPluginConfId) => {
    const { params: { project, uiPluginId } } = this.props
    const url = `/admin/${project}/ui/service/${uiPluginId}/${uiPluginConfId}/edit`
    browserHistory.push(url)
  }

  handleDuplicate = (uiPluginConfId) => {
    const { params: { project, uiPluginId } } = this.props
    const url = `/admin/${project}/ui/service/${uiPluginId}/${uiPluginConfId}/duplicate`
    browserHistory.push(url)
  }


  handleDelete = (uiPluginConfId) => {
    this.props.deleteUIPluginConfiguration(uiPluginConfId)
  }

  handleToggleActivation = (uiPluginConf) => {
    const { params: { uiPluginId } } = this.props
    const updatedPluginConfiguration = Object.assign({}, uiPluginConf, {
      active: !uiPluginConf.active,
    })
    this.props.updateUIPluginConfiguration(uiPluginConf.id, updatedPluginConfiguration, uiPluginId)
  }

  handleToggleDefault = (uiPluginConf) => {
    const { params: { uiPluginId } } = this.props
    const updatedPluginConfiguration = Object.assign({}, uiPluginConf, {
      default: !uiPluginConf.default,
    })
    this.props.updateUIPluginConfiguration(uiPluginConf.id, updatedPluginConfiguration, uiPluginId)
  }

  render() {
    const { uiPluginDefinition, uiPluginConfigurationList } = this.props
    const { isLoading } = this.state
    return (
      <I18nProvider messageDir="business-modules/admin-ui-service-management/src/i18n">
        <LoadableContentDisplayDecorator
          isLoading={isLoading}
        >
          {() => (
            <PluginLoader
              pluginPath={uiPluginDefinition.content.sourcePath}
              pluginInstanceId="something"
              displayPlugin={false}
            >
              <ServiceConfigurationListComponent
                uiPluginConfigurationList={uiPluginConfigurationList}
                handleEdit={this.handleEdit}
                handleDelete={this.handleDelete}
                handleDuplicate={this.handleDuplicate}
                handleToggleActivation={this.handleToggleActivation}
                handleToggleDefault={this.handleToggleDefault}
                createUrl={this.getCreateUrl()}
                backUrl={this.getBackUrl()}
              />
            </PluginLoader>
          )}
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}

export default connect(ServiceConfigurationListContainer.mapStateToProps, ServiceConfigurationListContainer.mapDispatchToProps)(ServiceConfigurationListContainer)
