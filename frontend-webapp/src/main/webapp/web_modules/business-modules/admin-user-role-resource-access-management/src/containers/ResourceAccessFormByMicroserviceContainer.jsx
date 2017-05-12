import { connect } from '@regardsoss/redux'
import { Role, Resource } from '@regardsoss/model'
import { ShowableAtRender } from '@regardsoss/components'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { controllerActions, controllerSelectors } from '../client/ResourceControllerClient'
import { resourceAccessActions, resourceAccessSelectors } from '../client/ResourceAccessClient'
import { roleResourceActions } from '../client/RoleResourceClient'
import { resourceRolesActions, resourceRolesSelectors } from '../client/ResourceRolesClient'
import ResourceAccessFormByMicroserviceComponent from '../components/ResourceAccessFormByMicroserviceComponent'
import ResourceAccessModalOverviewComponent from '../components/ResourceAccessModalOverviewComponent'

/**
 * React container to edit resource access allowed for the
 * current role
 */
export class ResourceAccessFormByMicroserviceContainer extends React.Component {

  static propTypes = {
    microserviceName: PropTypes.string.isRequired,
    currentRole: Role,
    resourceRoles: PropTypes.arrayOf(Role),
    roleResources: PropTypes.arrayOf(Resource),
    editRoleResources: PropTypes.func.isRequired,
    // from mapStateToProps
    controllerList: PropTypes.arrayOf(PropTypes.string),
    resourceList: PropTypes.arrayOf(Resource),
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

  constructor(props) {
    super(props)
    this.state = {
      modalResourceAccessId: undefined,
      isModalOpen: false,
      controllersLoading: true,
    }
  }

  componentWillMount() {
    Promise.resolve(this.props.fetchControllerList(this.props.microserviceName)).then(() =>
      this.setState({
        controllersLoading: false,
      }),
    )
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
    const { currentRole, roleResources, microserviceName, resourceList, getResource, controllerList,
      editRoleResources, resourceRoles } = this.props
    const { modalResourceAccessId, isModalOpen } = this.state

    return (
      <div>
        <ShowableAtRender show={isModalOpen}>
          <ResourceAccessModalOverviewComponent
            onClose={this.handleCloseResourceAccessModal}
            currentResource={modalResourceAccessId ? getResource(modalResourceAccessId) : {}}
            roles={resourceRoles}
            editRoleResources={editRoleResources}
          />
        </ShowableAtRender>
        <LoadableContentDisplayDecorator
          isLoading={this.state.controllersLoading}
        >
          {() =>
            (<ResourceAccessFormByMicroserviceComponent
              controllerList={controllerList}
              resourceList={resourceList}
              resourceListFetching={this.props.resourceListFetching}
              currentRole={currentRole}
              roleResources={roleResources}
              microserviceName={microserviceName}
              handleOpenController={this.handleOpenController}
              handleToggleResourceAccess={this.handleToggleResourceAccess}
              handleOpenResourceAccess={this.handleOpenResourceAccessModal}
            />)
          }
        </LoadableContentDisplayDecorator>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  controllerList: controllerSelectors.getArray(state),
  resourceList: resourceAccessSelectors.getOrderedList(state),
  resourceListFetching: resourceAccessSelectors.isFetching(state),
  resourceRoles: resourceRolesSelectors.getList(state),
  getResource: resourceId => resourceAccessSelectors.getById(state, resourceId),
})

const mapDispatchToProps = dispatch => ({
  fetchControllerList: microserviceName => dispatch(controllerActions.fetchEntityList({ microserviceName })),
  fetchResourceList: (microserviceName, controllerName) => dispatch(resourceAccessActions.fetchEntityList({
    microserviceName,
    controllerName,
  })),
  flushResourceList: () => dispatch(resourceAccessActions.flush()),
  removeRoleResourceAccess: (role, resource) => dispatch(roleResourceActions.deleteEntity(resource.content.id, { role_name: role.content.name })),
  addRoleResourceAccess: (role, resource) => dispatch(roleResourceActions.createEntity(resource.content, { role_name: role.content.name })),
  fetchResourceRoles: resource => dispatch(resourceRolesActions.fetchEntityList({ resourceId: resource.content.id })),
})

export default connect(mapStateToProps, mapDispatchToProps)(ResourceAccessFormByMicroserviceContainer)

