/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { AccessShapes } from '@regardsoss/shape'
import { connect } from '@regardsoss/redux'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import ModuleListComponent from '../components/ModuleListComponent'
import messages from '../i18n'

/**
 * Module container to display list of configured modules for a given application id.
 * @author Sébastien binda
 * @author Léo Mieulet
 */
class ModulesListContainer extends React.Component {
  static propTypes = {
    // From react router
    params: PropTypes.shape({
      project: PropTypes.string,
      applicationId: PropTypes.string,
    }),
    isInstance: PropTypes.bool,
    fetchModules: PropTypes.func,
    updateModule: PropTypes.func,
    deleteModule: PropTypes.func,
    // Set by mapStateToProps
    modules: AccessShapes.ModuleArray,
  }

  state = {
    isLoading: true,
  }

  componentDidMount() {
    Promise.resolve(this.props.fetchModules(this.props.params.applicationId))
      .then(() => {
        this.setState({
          isLoading: false,
        })
      })
  }

  getBackUrl = () => {
    if (this.props.isInstance) {
      return '/admin/ui/board'
    }
    const { params: { project } } = this.props
    return `/admin/${project}/ui/board`
  }

  handleEditModule = (module) => {
    if (this.props.isInstance) {
      const url = `/admin/ui/module/${this.props.params.applicationId}/${module.id}/edit`
      browserHistory.push(url)
    } else {
      const url = `/admin/${this.props.params.project}/ui/module/${this.props.params.applicationId}/${module.id}/edit`
      browserHistory.push(url)
    }
  }

  handleCreateModule = () => {
    if (this.props.isInstance) {
      const url = `/admin/ui/module/${this.props.params.applicationId}/create`
      browserHistory.push(url)
    } else {
      const url = `/admin/${this.props.params.project}/ui/module/${this.props.params.applicationId}/create`
      browserHistory.push(url)
    }
  }

  handleDuplicateModule = (module) => {
    if (this.props.isInstance) {
      const url = `/admin/ui/module/${this.props.params.applicationId}/${module.id}/duplicate`
      browserHistory.push(url)
    } else {
      const url = `/admin/${this.props.params.project}/ui/module/${this.props.params.applicationId}/${module.id}/duplicate`
      browserHistory.push(url)
    }
  }

  handleDeleteModule = (module) => {
    this.props.deleteModule(this.props.params.applicationId, module)
  }

  handleModuleActivation = (module) => {
    const moduleToUpdate = { ...module }
    moduleToUpdate.conf = JSON.stringify(moduleToUpdate.conf)
    this.props.updateModule(this.props.params.applicationId, { ...moduleToUpdate, active: !module.active })
  }

  render() {
    return (
      <I18nProvider messages={messages}>
        <LoadableContentDisplayDecorator
          isLoading={this.state.isLoading}
        >
          {() => (<ModuleListComponent
            modules={this.props.modules}
            onCreate={this.handleCreateModule}
            onEdit={this.handleEditModule}
            onDuplicate={this.handleDuplicateModule}
            onDelete={this.handleDeleteModule}
            onActivation={this.handleModuleActivation}
            backUrl={this.getBackUrl()}
            handleUpdate={this.props.updateModule}
          />)}
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}

const UnconnectedModulesListContainer = ModulesListContainer
export { UnconnectedModulesListContainer }

const mapStateToProps = (state, ownProps) => ({
  modules: ownProps.moduleSelectors.getOrderedList(state),
})

export default connect(mapStateToProps, null)(ModulesListContainer)
