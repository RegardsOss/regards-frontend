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
import isEmpty from 'lodash/isEmpty'
import cloneDeep from 'lodash/cloneDeep'
import get from 'lodash/get'
import isNil from 'lodash/isNil'
import { browserHistory } from 'react-router'
import { getFormValues, change } from 'redux-form'
import { I18nProvider } from '@regardsoss/i18n'
import { FormLoadingComponent, FormEntityNotFoundComponent } from '@regardsoss/form-utils'
import { connect } from '@regardsoss/redux'
import { AccessShapes } from '@regardsoss/shape'
import { ContainerHelper } from '@regardsoss/layout'
import { modulesManager } from '@regardsoss/modules'
import { CommonEndpointClient } from '@regardsoss/endpoints-common'
import { allMatchHateoasDisplayLogic } from '@regardsoss/display-control'
import FormShape from '../model/FormShape'
import ModuleFormComponent from '../components/ModuleFormComponent'
import NoContainerAvailables from '../components/NoContainerAvailables'
import messages from '../i18n'

/**
 * React component to display a edition form for Module entity
 * @author Sébastien binda
 * @author Léo Mieulet
 */
class ModuleFormContainer extends React.Component {
  static propTypes = {
    // From react router
    params: PropTypes.shape({
      project: PropTypes.string,
      applicationId: PropTypes.string,
      module_id: PropTypes.string,
      duplicate_module_id: PropTypes.string,
    }),
    updateModule: PropTypes.func,
    createModule: PropTypes.func,
    fetchModule: PropTypes.func,
    fetchLayout: PropTypes.func,
    isInstance: PropTypes.bool,
    // eslint-disable-next-line react/no-unused-prop-types
    form: FormShape,
    changeField: PropTypes.func,
    // Set by mapStateToProps
    module: AccessShapes.Module,
    layout: AccessShapes.Layout,
    // eslint-disable-next-line react/no-unused-prop-types
    availableEndpoints: PropTypes.arrayOf(PropTypes.string),
  }

  static filterAllowedModules(isInstance, endpoints, module) {
    if (isInstance) {
      return true // all modules are allowed for the instance administrator
    }
    // Normal case: the module dependencies requirements must be met in current state
    const moduleDependencies = get(module, 'dependencies.admin', [])
    return allMatchHateoasDisplayLogic(moduleDependencies, endpoints)
  }

  constructor(props) {
    super(props)

    const isDuplicating = !isNil(props.params.duplicate_module_id)
    const isCreating = isDuplicating || isNil(this.props.params.module_id)
    const isEditing = !isDuplicating && !isNil(this.props.module)
    this.state = {
      availableModuleTypes: [],
      isLoading: true,
      isDuplicating,
      isCreating,
      isEditing,
    }
  }

  componentDidMount() {
    const { isDuplicating, isEditing } = this.state
    const tasks = [
      this.props.fetchLayout(this.props.params.applicationId),
    ]
    // Fetch the module we are editing or duplicating
    if (isDuplicating || isEditing) {
      const moduleId = isDuplicating ? this.props.params.duplicate_module_id : this.props.params.module_id
      tasks.push(this.props.fetchModule(this.props.params.applicationId, moduleId))
    }
    // Initialize module list
    const filterModules = ModuleFormContainer.filterAllowedModules.bind(null, this.props.isInstance, this.props.availableEndpoints)
    tasks.push(
      modulesManager.getAvailableVisibleModuleTypes(filterModules)
        .then((availableModuleTypes) => {
          this.setState({ availableModuleTypes })
          return availableModuleTypes
        }),
    )
    Promise.all(tasks).then((results) => {
      this.setState({ isLoading: false })
    })
  }

  handleSubmit = (values) => {
    const { isEditing } = this.state
    const valuesToSave = Object.assign({}, values)
    if (valuesToSave.conf) {
      valuesToSave.conf = JSON.stringify(values.conf)
    }
    if (isEditing) {
      return this.handleUpdate(valuesToSave)
    }
    return this.handleCreate(valuesToSave)
  }

  handleCreate = (values) => {
    const defaultProps = {
      applicationId: this.props.params.applicationId,
      active: false,
      defaultDynamicModule: false,
      conf: '{}',
    }
    const submitModel = Object.assign({}, defaultProps, values)
    Promise.resolve(this.props.createModule(this.props.params.applicationId, submitModel))
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          this.handleBack()
        }
      })
  }

  handleUpdate = (values) => {
    const defaultProps = {
      applicationId: this.props.params.applicationId,
      active: false,
      defaultDynamicModule: false,
      conf: '{}',
    }
    const submitModel = Object.assign({}, defaultProps, this.props.module, values)
    Promise.resolve(this.props.updateModule(this.props.params.applicationId, submitModel))
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          this.handleBack()
        }
      })
  }

  handleBack = () => {
    const { params: { project, applicationId } } = this.props
    if (this.props.isInstance) {
      browserHistory.push(`/admin/ui/module/${applicationId}/list`)
    } else {
      browserHistory.push(`/admin/${project}/ui/module/${applicationId}/list`)
    }
  }

  goToLayoutConfiguration = () => {
    const { params: { project, applicationId } } = this.props
    if (this.props.isInstance) {
      browserHistory.push(`/admin/ui/layout/${applicationId}`)
    } else {
      browserHistory.push(`/admin/${project}/layout/${applicationId}`)
    }
  }

  renderComponent() {
    const {
      isEditing, isCreating, isDuplicating, isLoading,
    } = this.state
    if (isLoading) {
      return (<FormLoadingComponent />)
    }

    if ((isEditing || isDuplicating) && !this.props.module) {
      return (<FormEntityNotFoundComponent />)
    }

    if (isEmpty(this.state.availableModuleTypes)) {
      return (<FormEntityNotFoundComponent />)
    }

    let availablecontainers = []
    if (this.props.layout) {
      availablecontainers = ContainerHelper.getAvailableContainersInLayout(this.props.layout.layout, true)
    }

    if (isEmpty(availablecontainers)) {
      return (<NoContainerAvailables
        goToLayoutConfiguration={this.goToLayoutConfiguration}
      />)
    }

    let module
    if (isDuplicating || isEditing) {
      module = cloneDeep(this.props.module)
      if (isDuplicating) {
        delete module.id
      }
    }

    const adminForm = {
      currentNamespace: 'conf',
      form: this.props.form,
      changeField: this.props.changeField,
      isCreating,
      isEditing,
      isDuplicating,
    }
    return (
      <ModuleFormComponent
        project={this.props.params.project}
        applicationId={this.props.params.applicationId}
        onSubmit={this.handleSubmit}
        onBack={this.handleBack}
        module={module}
        availableModuleTypes={this.state.availableModuleTypes}
        containers={availablecontainers}
        adminForm={adminForm}
      />
    )
  }

  render() {
    return (
      <I18nProvider messages={messages}>
        {this.renderComponent()}
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  module: ownProps.moduleSelectors.getContentById(state, ownProps.params.module_id),
  layout: ownProps.params.applicationId ? ownProps.layoutSelectors.getContentById(state, ownProps.params.applicationId) : null,
  form: getFormValues('edit-module-form')(state),
  availableEndpoints: CommonEndpointClient.endpointSelectors.getListOfKeys(state),
})

const mapDispatchToProps = dispatch => ({
  changeField: (field, value) => dispatch(change('edit-module-form', field, value)),
})

const UnconnectedModuleFormContainer = ModuleFormContainer
export {
  UnconnectedModuleFormContainer,
}

export default connect(mapStateToProps, mapDispatchToProps)(ModuleFormContainer)
