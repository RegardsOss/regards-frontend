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
import isEmpty from 'lodash/isEmpty'
import cloneDeep from 'lodash/cloneDeep'
import get from 'lodash/get'
import isNil from 'lodash/isNil'
import { browserHistory } from 'react-router'
import { getFormValues, change } from 'redux-form'
import { AccessShapes } from '@regardsoss/shape'
import { CommonEndpointClient } from '@regardsoss/endpoints-common'
import { I18nProvider } from '@regardsoss/i18n'
import { connect } from '@regardsoss/redux'
import { ModuleStyleProvider } from '@regardsoss/theme'
import { FormLoadingComponent, FormEntityNotFoundComponent } from '@regardsoss/form-utils'
import { ContainerHelper } from '@regardsoss/layout'
import { modulesManager } from '@regardsoss/modules'
import { allMatchHateoasDisplayLogic } from '@regardsoss/display-control'
import ModuleFormComponent from '../components/ModuleFormComponent'
import NoContainerAvailables from '../components/NoContainerAvailables'
import messages from '../i18n'
import styles from '../styles'

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
      moduleId: PropTypes.string,
      duplicateModuleId: PropTypes.string,
    }),
    updateModule: PropTypes.func,
    createModule: PropTypes.func,
    fetchModule: PropTypes.func,
    fetchLayout: PropTypes.func,
    isInstance: PropTypes.bool,
    // eslint-disable-next-line react/no-unused-prop-types
    form: AccessShapes.Module,
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

  state = {
    availableModuleTypes: [],
    isLoading: true,
    isEditing: !isNil(this.props.params.moduleId),
    isDuplicating: !isNil(this.props.params.duplicateModuleId),
    isCreating: isNil(this.props.params.moduleId) && isNil(this.props.params.duplicateModuleId),
  }

  componentDidMount() {
    const { isDuplicating, isEditing } = this.state
    const tasks = [
      this.props.fetchLayout(this.props.params.applicationId),
    ]
    // Fetch the module we are editing or duplicating
    if (isDuplicating || isEditing) {
      const moduleId = isDuplicating ? this.props.params.duplicateModuleId : this.props.params.moduleId
      tasks.push(this.props.fetchModule(this.props.params.applicationId, moduleId))
    }
    // Initialize module list
    const filterModules = ModuleFormContainer.filterAllowedModules.bind(null, this.props.isInstance, this.props.availableEndpoints)
    tasks.push(modulesManager.getAvailableVisibleModuleTypes(filterModules))

    Promise.all(tasks).then((results) => {
      // last task results
      const availableModuleTypes = results[results.length - 1]
      this.setState({ availableModuleTypes, isLoading: false })
    })
  }

  handleSubmit = (values) => {
    const { isEditing } = this.state
    const valuesToSave = { // default values
      applicationId: this.props.params.applicationId,
      active: false,
      ...values,
    }
    // stringify conf (containing module specific variables) for server
    valuesToSave.conf = JSON.stringify(values.conf)
    // stringify page titles (containing text by locale) for server (paying attention to not link references, that
    // would otherwise destroy form fields values)
    if (valuesToSave.page) {
      valuesToSave.page = { // decorrelate JS objects reference to not modify form values
        ...values.page,
        title: JSON.stringify({ // decorrelate JS objects reference to not modify form values
          ...get(values, 'page.title', {}),
        }),
      }
    }
    let fetchMethod
    if (isEditing) {
      // set ID to update
      valuesToSave.id = this.props.params.moduleId
      // update module promise builder
      fetchMethod = this.props.updateModule
    } else {
      // create module promise builder
      fetchMethod = this.props.createModule
    }
    // resolve promise then handle back if successful
    Promise.resolve(fetchMethod(this.props.params.applicationId, valuesToSave))
      .then((actionResult) => {
        if (!actionResult.error) {
          this.handleBack() // back to list on success
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
        <ModuleStyleProvider module={styles}>
          {this.renderComponent()}
        </ModuleStyleProvider>
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { moduleId: editModuleId, duplicateModuleId } = ownProps.params
  const thisFormModuleId = editModuleId || duplicateModuleId
  return {
    module: ownProps.moduleSelectors.getContentById(state, thisFormModuleId),
    layout: ownProps.params.applicationId ? ownProps.layoutSelectors.getContentById(state, ownProps.params.applicationId) : null,
    form: getFormValues('edit-module-form')(state),
    availableEndpoints: CommonEndpointClient.endpointSelectors.getListOfKeys(state),
  }
}

const mapDispatchToProps = (dispatch) => ({
  changeField: (field, value) => dispatch(change('edit-module-form', field, value)),
})

const UnconnectedModuleFormContainer = ModuleFormContainer
export { UnconnectedModuleFormContainer }

export default connect(mapStateToProps, mapDispatchToProps)(ModuleFormContainer)
