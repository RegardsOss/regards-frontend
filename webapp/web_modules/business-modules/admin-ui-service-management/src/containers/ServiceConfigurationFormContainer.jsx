/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { I18nProvider } from '@regardsoss/i18n'
import { ModuleStyleProvider } from '@regardsoss/theme'
import { AccessShapes } from '@regardsoss/shape'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { PluginProvider } from '@regardsoss/plugins'
import ServiceConfigurationFormComponent from '../components/ServiceConfigurationFormComponent'
import { uiPluginConfigurationSelectors, uiPluginConfigurationActions } from '../clients/UIPluginConfigurationClient'
import messages from '../i18n'
import styles from '../styles'

/**
 * Show the plugin service configuration form
 *
 * @author Léo Mieulet
 */
export class ServiceConfigurationFormContainer extends React.Component {
  static mapStateToProps = (state, ownProps) => ({
    uiPluginConfiguration: ownProps.params.uiPluginConfId ? uiPluginConfigurationSelectors.getById(state, ownProps.params.uiPluginConfId) : null,
  })

  static mapDispatchToProps = (dispatch) => ({
    fetchUIPluginConfiguration: (id) => dispatch(uiPluginConfigurationActions.fetchEntity(id)),
    createUIPluginConfiguration: (entity, pathParams) => dispatch(uiPluginConfigurationActions.createEntity(entity, pathParams)),
    updateUIPluginConfiguration: (id, entity, pathParams) => dispatch(uiPluginConfigurationActions.updateEntity(id, entity, pathParams)),
  })

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
      uiPluginId: PropTypes.string,
      uiPluginConfId: PropTypes.string,
      mode: PropTypes.string,
    }),
    // from mapStateToProps
    uiPluginConfiguration: AccessShapes.UIPluginConf,
    // from mapDispatchToProps
    fetchUIPluginConfiguration: PropTypes.func,
    updateUIPluginConfiguration: PropTypes.func,
    createUIPluginConfiguration: PropTypes.func,
  }

  /**
   * Initial state
   */
  state = {
    isCreating: !this.props.params.uiPluginConfId,
    isLoading: !!this.props.params.uiPluginConfId, // loading initially when not creating
    isEditing: !!this.props.params.uiPluginConfId && this.props.params.mode === 'edit',
    isDuplicating: !!this.props.params.uiPluginConfId && this.props.params.mode === 'duplicate',
  }

  componentDidMount() {
    if (this.state.isCreating === false) {
      Promise.resolve(this.props.fetchUIPluginConfiguration(this.props.params.uiPluginConfId))
        .then(() => {
          this.setState({
            isLoading: false,
          })
        })
    }
  }

  getBackUrl = () => {
    const { params: { project, uiPluginId } } = this.props
    return `/admin/${project}/ui/service/${uiPluginId}/list`
  }

  redirectToBackUrl = () => {
    browserHistory.push(this.getBackUrl())
  }

  handleUpdate = (values) => {
    const updatedPluginConfiguration = {
      id: this.props.uiPluginConfiguration.content.id,
      pluginDefinition: this.props.uiPluginConfiguration.content.pluginDefinition,
      label: values.label,
      active: values.isActive,
      linkedToAllEntities: values.linkedToAllEntities,
      conf: {
        static: values.static || {},
        dynamic: values.dynamic || {},
      },
    }
    Promise.resolve(this.props.updateUIPluginConfiguration(this.props.params.uiPluginConfId, updatedPluginConfiguration))
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          this.redirectToBackUrl()
        }
      })
  }

  /**
   * Handle form submission on duplication / creation
   * Create a new service configuration
   * @param values
   */
  handleCreate = (values) => {
    const newPluginConfiguration = {
      label: values.label,
      pluginDefinition: { id: this.props.params.uiPluginId },
      active: values.isActive,
      linkedToAllEntities: values.linkedToAllEntities,
      conf: {
        static: values.static || {},
        dynamic: values.dynamic || {},
      },
    }
    Promise.resolve(this.props.createUIPluginConfiguration(newPluginConfiguration, {
      // eslint-disable-next-line camelcase
      plugin_id: this.props.params.uiPluginId, // eslint wont fix: expected server format
    }))
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          this.redirectToBackUrl()
        }
      })
  }

  render() {
    const { uiPluginConfiguration, params: { uiPluginId } } = this.props
    const {
      isCreating, isEditing, isDuplicating, isLoading,
    } = this.state
    return (
      <I18nProvider messages={messages}>
        <ModuleStyleProvider module={styles}>
          <LoadableContentDisplayDecorator
            isLoading={isLoading}
          >
            {() => (
              <PluginProvider
                pluginId={Number(uiPluginId)}
                pluginInstanceId="something"
                displayPlugin={false}
              >
                <ServiceConfigurationFormComponent
                  uiPluginConfiguration={uiPluginConfiguration}
                  isCreating={isCreating}
                  isEditing={isEditing}
                  isDuplicating={isDuplicating}
                  onSubmit={isEditing ? this.handleUpdate : this.handleCreate}
                  backUrl={this.getBackUrl()}
                />
              </PluginProvider>
            )}
          </LoadableContentDisplayDecorator>
        </ModuleStyleProvider>
      </I18nProvider>
    )
  }
}

export default connect(ServiceConfigurationFormContainer.mapStateToProps, ServiceConfigurationFormContainer.mapDispatchToProps)(ServiceConfigurationFormContainer)
