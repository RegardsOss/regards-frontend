import { connect } from '@regardsoss/redux'
import { Role, Resource } from '@regardsoss/model'
import { remove } from 'lodash'
import { ShowableAtRender } from '@regardsoss/components'
import {LoadableContentDisplayDecorator} from '@regardsoss/display-control'
import {roleActions} from '../client/RoleClient'
import {controllerActions, controllerSelectors} from '../client/ResourceControllerClient'
import {resourceAccessActions, resourceAccessSelectors} from '../client/ResourceAccessClient'
import {roleResourceActions} from '../client/RoleResourceClient'
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
    roleResources: React.PropTypes.arrayOf(Resource),
    updateRoleResources: React.PropTypes.func,
    // from mapStateToProps
    controllerList: React.PropTypes.arrayOf(React.PropTypes.string),
    resourceList: React.PropTypes.arrayOf(Resource),
    resourceListFetching: React.PropTypes.bool,
    // from mapDispatchToProps
    fetchControllerList: React.PropTypes.func,
    fetchResourceList: React.PropTypes.func,
    flushResourceList : React.PropTypes.func,
    removeRoleResourceAccess: React.PropTypes.func,
    addRoleResourceAccess: React.PropTypes.func,
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
        controllersLoading: false
      })
    )
  }

  handleOpenController = (controllerName) => {
    this.props.flushResourceList()
    this.props.fetchResourceList(this.props.microserviceName, controllerName)
  }

  handleToggleResourceAccess = (resource, previousValue) => {
    const { currentRole,removeRoleResourceAccess, addRoleResourceAccess, updateRoleResources } = this.props
    const updateAction = previousValue ? removeRoleResourceAccess : addRoleResourceAccess
    updateAction(currentRole, resource)
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
    const { currentRole, roleResources, microserviceName, resourceList, controllerList } = this.props
    const { modalResourceAccessId, isModalOpen } = this.state
    return (
      <div>
        <ShowableAtRender show={isModalOpen}>
          <ResourceAccessModalOverviewComponent
            onClose={this.handleCloseResourceAccessModal}
            currentResource={modalResourceAccessId ? resourceList[modalResourceAccessId] : {}}
          />
        </ShowableAtRender>
        <LoadableContentDisplayDecorator
          isLoading={this.state.controllersLoading}
        >
          {() =>
            <ResourceAccessFormByMicroserviceComponent
              controllerList={controllerList}
              resourceList={resourceList}
              resourceListFetching={this.props.resourceListFetching}
              currentRole={currentRole}
              roleResources={roleResources}
              microserviceName={microserviceName}
              handleOpenController={this.handleOpenController}
              handleToggleResourceAccess={this.handleToggleResourceAccess}
              handleOpenResourceAccess={this.handleOpenResourceAccessModal}
            />
          }
        </LoadableContentDisplayDecorator>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  controllerList: controllerSelectors.getArray(state),
  resourceList: resourceAccessSelectors.getOrderedList(state),
  resourceListFetching: resourceAccessSelectors.isFetching(state)
})
const mapDispatchToProps = dispatch => ({
  fetchControllerList: microserviceName => dispatch(controllerActions.fetchEntityList({ microserviceName })),
  fetchResourceList: (microserviceName, controllerName) => dispatch(resourceAccessActions.fetchEntityList({ microserviceName, controllerName })),
  flushResourceList : () => dispatch(resourceAccessActions.flush()),
  removeRoleResourceAccess: (role, resource) => dispatch(roleResourceActions.deleteEntity(resource.content.id, {role_name: role.content.name})),
  addRoleResourceAccess: (role, resource) => dispatch(roleResourceActions.createEntity(resource.content, {role_name: role.content.name})),
})

export default connect(mapStateToProps, mapDispatchToProps)(ResourceAccessFormByMicroserviceContainer)

