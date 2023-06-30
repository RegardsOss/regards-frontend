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
import compose from 'lodash/fp/compose'
import { connect } from '@regardsoss/redux'
import { AdminShapes } from '@regardsoss/shape'
import { withModuleStyle } from '@regardsoss/theme'
import { ShowableAtRender } from '@regardsoss/components'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { controllerActions, controllerSelectors } from '../clients/ResourceControllerClient'
import { resourceAccessActions, resourceAccessSelectors } from '../clients/ResourceAccessClient'
import { roleResourceActions } from '../clients/RoleResourceClient'
import { resourceRolesActions, resourceRolesSelectors } from '../clients/ResourceRolesClient'
import ResourceAccessFormByMicroserviceComponent from '../components/ResourceAccessFormByMicroserviceComponent'
import ResourceAccessModalOverviewComponent from '../components/ResourceAccessModalOverviewComponent'
import styles from '../styles'

/**
 * React container to edit resource access allowed for the
 * current role
 */
export class ResourceAccessFormByMicroserviceContainer extends React.Component {
  static propTypes = {
    microserviceName: PropTypes.string.isRequired,
    currentRole: AdminShapes.Role,
    resourceRoles: AdminShapes.RoleList,
    roleResources: AdminShapes.ResourceArray,
    editRoleResources: PropTypes.func.isRequired,
    // from mapStateToProps
    controllerList: PropTypes.arrayOf(PropTypes.string),
    resourceList: PropTypes.arrayOf(AdminShapes.Resource),
    resourceListFetching: PropTypes.bool,
    getResource: PropTypes.func,
    // from mapDispatchToProps
    fetchControllerList: PropTypes.func,
    fetchResourceList: PropTypes.func,
    flushResourceList: PropTypes.func,
    removeRoleResourceAccess: PropTypes.func,
    addRoleResourceAccess: PropTypes.func,
    fetchResourceRoles: PropTypes.func,
  }

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      controllerList: controllerSelectors.getArray(state),
      resourceList: resourceAccessSelectors.getOrderedList(state),
      resourceListFetching: resourceAccessSelectors.isFetching(state),
      resourceRoles: resourceRolesSelectors.getList(state),
      getResource: (resourceId) => resourceAccessSelectors.getById(state, resourceId),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch) {
    return {
      fetchControllerList: (microservicename) => dispatch(controllerActions.fetchEntityList({ microservicename })),
      fetchResourceList: (microservicename, controllername) => dispatch(resourceAccessActions.fetchEntityList({
        microservicename,
        controllername,
      })),
      flushResourceList: () => dispatch(resourceAccessActions.flush()),
      removeRoleResourceAccess: (role, resource) => dispatch(roleResourceActions.deleteEntity(resource.content.id, {
        // eslint-disable-next-line camelcase
        role_name: role.content.name, // eslint wont fix: matches server format
      })),
      addRoleResourceAccess: (role, resource) => dispatch(roleResourceActions.createEntity(resource.content, {
        // eslint-disable-next-line camelcase
        role_name: role.content.name, // eslint wont fix: matches server format
      })),
      fetchResourceRoles: (resource) => dispatch(resourceRolesActions.fetchEntityList({ resourceId: resource.content.id })),
    }
  }

  state = {
    modalResourceAccessId: undefined,
    isModalOpen: false,
    controllersLoading: true,
  }

  UNSAFE_componentWillMount() {
    Promise.resolve(this.props.fetchControllerList(this.props.microserviceName)).then(() => this.setState({
      controllersLoading: false,
    }))
  }

  handleOpenController = (controllerName) => {
    this.props.flushResourceList()
    this.props.fetchResourceList(this.props.microserviceName, controllerName)
  }

  handleToggleResourceAccess = (resource, previousValue) => {
    const { currentRole, removeRoleResourceAccess, addRoleResourceAccess } = this.props
    const updateAction = previousValue ? removeRoleResourceAccess : addRoleResourceAccess
    updateAction(currentRole, resource)
  }

  handleOpenResourceAccessModal = (resource) => {
    Promise.resolve(this.props.fetchResourceRoles(resource)).then((ActionResult) => {
      if (!ActionResult.error) {
        this.setState({
          modalResourceAccessId: resource.content.id,
          isModalOpen: true,
        })
      }
    })
  }

  handleCloseResourceAccessModal = () => {
    this.setState({
      modalResourceAccessId: undefined,
      isModalOpen: false,
    })
  }

  render() {
    const {
      currentRole, roleResources, microserviceName, resourceList, getResource, controllerList,
      editRoleResources, resourceRoles,
    } = this.props
    const { modalResourceAccessId, isModalOpen } = this.state

    const resource = modalResourceAccessId ? getResource(modalResourceAccessId) : {}

    return (
      <div>
        <ShowableAtRender show={isModalOpen}>
          <ResourceAccessModalOverviewComponent
            onClose={this.handleCloseResourceAccessModal}
            currentResource={resource}
            roles={resourceRoles}
            editRoleResources={editRoleResources}
          />
        </ShowableAtRender>
        <LoadableContentDisplayDecorator
          isLoading={this.state.controllersLoading}
        >
          {() => (<ResourceAccessFormByMicroserviceComponent
            controllerList={controllerList}
            resourceList={resourceList}
            resourceListFetching={this.props.resourceListFetching}
            currentRole={currentRole}
            roleResources={roleResources}
            microserviceName={microserviceName}
            handleOpenController={this.handleOpenController}
            handleToggleResourceAccess={this.handleToggleResourceAccess}
            handleOpenResourceAccess={this.handleOpenResourceAccessModal}
          />)}
        </LoadableContentDisplayDecorator>
      </div>
    )
  }
}

export default compose(
  connect(ResourceAccessFormByMicroserviceContainer.mapStateToProps, ResourceAccessFormByMicroserviceContainer.mapDispatchToProps),
  withModuleStyle(styles))(ResourceAccessFormByMicroserviceContainer)
