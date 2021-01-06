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
import { browserHistory } from 'react-router'
import { I18nProvider } from '@regardsoss/i18n'
import { FormLoadingComponent, FormEntityNotFoundComponent } from '@regardsoss/form-utils'
import { connect } from '@regardsoss/redux'
import { AccessShapes, AdminShapes } from '@regardsoss/shape'
import { uiPluginDefinitionActions, uiPluginDefinitionSelectors } from '../clients/UIPluginDefinitionClient'
import { roleActions, roleSelectors } from '../clients/RoleClient'
import PluginFormComponent from '../components/PluginFormComponent'
import messages from '../i18n'

/**
 * React component to display a edition form for plugin entity
 * @author Sébastien Binda
 */
export class PluginFormContainer extends React.Component {
  static propTypes = {
    // From react router
    params: PropTypes.shape({
      project: PropTypes.string,
      // eslint-disable-next-line camelcase
      plugin_id: PropTypes.string, // eslint wont fix: from URL parameters
    }),
    // Set by mapDispatchToProps
    updatePlugin: PropTypes.func,
    createPlugin: PropTypes.func,
    fetchPlugin: PropTypes.func,
    fetchRoleList: PropTypes.func,
    // Set by mapStateToProps
    isFetching: PropTypes.bool,
    plugin: AccessShapes.UIPluginDefinition,
    roleList: AdminShapes.RoleList,
  }

  state = {
    submitError: null,
  }

  UNSAFE_componentWillMount() {
    this.props.fetchRoleList()
    if (this.props.params.plugin_id && !this.props.plugin) {
      this.props.fetchPlugin(this.props.params.plugin_id)
    }
  }

  handleSubmit = (values) => {
    // Remove empty iconUrl
    const newValues = { ...values }
    newValues.iconUrl = values.iconUrl === '' ? null : values.iconUrl
    if (this.props.params.plugin_id) {
      return this.handleUpdate(newValues)
    }
    return this.handleCreate(newValues)
  }

  handleCreate = (values) => {
    const submitModel = { ...values }
    Promise.resolve(this.props.createPlugin(submitModel))
      .then((actionResult) => {
        if (actionResult.error) {
          this.setState({
            submitError: actionResult.meta && actionResult.meta.status === 422 ? 'plugin.form.submit.error.invalid.plugin' : 'plugin.form.submit.error',
          })
        } else {
          this.setState({
            submitError: null,
          })
          this.handleBack()
        }
      })
  }

  handleUpdate = (values) => {
    const submitModel = { ...this.props.plugin.content, ...values }
    Promise.resolve(this.props.updatePlugin(submitModel))
      .then((actionResult) => {
        if (actionResult.error) {
          this.setState({
            submitError: actionResult.meta && actionResult.meta.status === 422 ? 'plugin.form.submit.error.invalid.plugin' : 'plugin.form.submit.error',
          })
        } else {
          this.setState({
            submitError: null,
          })
          this.handleBack()
        }
      })
  }

  handleBack = () => {
    const { params: { project } } = this.props
    browserHistory.push(`/admin/${project}/ui/plugin/list`)
  }

  render() {
    if (this.props.params.plugin_id && !this.props.plugin && this.props.isFetching) {
      return (<FormLoadingComponent />)
    }

    if (this.props.params.plugin_id && !this.props.plugin) {
      return (<FormEntityNotFoundComponent />)
    }

    return (
      <I18nProvider messages={messages}>
        <PluginFormComponent
          onSubmit={this.handleSubmit}
          onBack={this.handleBack}
          plugin={this.props.plugin}
          roleList={this.props.roleList}
          submitError={this.state.submitError}
        />
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  plugin: ownProps.params.plugin_id ? uiPluginDefinitionSelectors.getById(state, ownProps.params.plugin_id) : null,
  roleList: roleSelectors.getList(state),
  isFetching: uiPluginDefinitionSelectors.isFetching(state),
})

const mapDispatchToProps = (dispatch) => ({
  fetchPlugin: (pluginId) => dispatch(uiPluginDefinitionActions.fetchEntity(pluginId)),
  updatePlugin: (plugin) => dispatch(uiPluginDefinitionActions.updateEntity(plugin.id, plugin)),
  createPlugin: (plugin) => dispatch(uiPluginDefinitionActions.createEntity(plugin)),
  fetchRoleList: () => dispatch(roleActions.fetchEntityList()),
})

export default connect(mapStateToProps, mapDispatchToProps)(PluginFormContainer)
