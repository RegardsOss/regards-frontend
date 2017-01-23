import { connect } from 'react-redux'
import { Role, Resource } from '@regardsoss/model'
import { remove } from 'lodash'
import { ShowableAtRender } from '@regardsoss/components'
import RoleActions from '../model/RoleActions'
import ControllerSelectors from '../model/ControllerSelectors'
import ControllerActions from '../model/ControllerActions'
import ResourceAccessActions from '../model/ResourceAccessActions'
import ResourceAccessSelectors from '../model/ResourceAccessSelectors'
import ResourceAccessFormByMicroserviceComponent from '../components/ResourceAccessFormByMicroserviceComponent'
import ResourceAccessModalOverviewComponent from '../components/ResourceAccessModalOverviewComponent'

/**
 * React container to edit resource access allowed for the
 * current role
 */
export class ResourceAccessFormByMicroserviceContainer extends React.Component {

  static propTypes = {
    microserviceName: React.PropTypes.string.isRequired,
    currentRole: Role,
    // from mapStateToProps
    controllerList: React.PropTypes.arrayOf(React.PropTypes.string),
    resourceList: React.PropTypes.objectOf(Resource),
    // from mapDispatchToProps
    fetchControllerList: React.PropTypes.func,
    fetchResourceList: React.PropTypes.func,
    updateRole: React.PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      modalResourceAccessId: undefined,
      isModalOpen: false,
    }
  }

  componentWillMount() {
    this.props.fetchControllerList(this.props.microserviceName)
  }

  handleOpenController = (controllerName) => {
    this.props.fetchResourceList(this.props.microserviceName, controllerName)
  }

  handleToggleResourceAccess = (resource, previousValue) => {
    const { currentRole } = this.props
    if (previousValue) {
      remove(currentRole.content.permissions, permission => permission.resource === resource.content.resource &&
          permission.microservice === resource.content.microservice &&
          permission.verb === resource.content.verb)
    } else {
      currentRole.content.permissions.push(resource.content)
    }
    Promise.resolve(this.props.updateRole(currentRole.content.id, currentRole.content))
  }

  handleOpenResourceAccessModal = (resource) => {
    this.setState({
      modalResourceAccessId: resource.content.id,
      isModalOpen: true,
    })
  }
  handleCloseResourceAccessModal = () => {
    this.setState({
      modalResourceAccessId: undefined,
      isModalOpen: false,
    })
  }

  render() {
    const { currentRole, microserviceName, resourceList, controllerList } = this.props
    const { modalResourceAccessId, isModalOpen } = this.state
    // const { controllerList } = this.props
    return (
      <div>
        <ShowableAtRender show={isModalOpen}>
          <ResourceAccessModalOverviewComponent
            onClose={this.handleCloseResourceAccessModal}
            currentResource={modalResourceAccessId ? resourceList[modalResourceAccessId] : {}}
          />
        </ShowableAtRender>
        <ResourceAccessFormByMicroserviceComponent
          controllerList={controllerList}
          resourceList={resourceList}
          currentRole={currentRole}
          microserviceName={microserviceName}
          handleOpenController={this.handleOpenController}
          handleToggleResourceAccess={this.handleToggleResourceAccess}
          handleOpenResourceAccess={this.handleOpenResourceAccessModal}
        />
      </div>
    )
  }
}
const mapStateToProps = state => ({
  controllerList: ControllerSelectors.getArray(state),
  resourceList: ResourceAccessSelectors.getList(state),
})
const mapDispatchToProps = dispatch => ({
  fetchControllerList: microserviceName => dispatch(ControllerActions.fetchEntityList(dispatch, [microserviceName])),
  fetchResourceList: (microserviceName, controllerName) => dispatch(ResourceAccessActions.fetchEntityList(dispatch, [microserviceName, controllerName])),
  updateRole: (roleName, updatedRole) => dispatch(RoleActions.updateEntity(roleName, updatedRole, dispatch)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ResourceAccessFormByMicroserviceContainer)

