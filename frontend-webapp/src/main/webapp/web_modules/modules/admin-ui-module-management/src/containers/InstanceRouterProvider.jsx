/**
 * LICENSE_PLACEHOLDER
 **/
import { connect } from '@regardsoss/redux'
import { AuthenticationParametersSelectors } from '@regardsoss/authentication-manager'
import { moduleInstanceActions, moduleInstanceSelectors } from '../client/ModuleInstanceClient'
import { layoutInstanceActions, layoutInstanceSelectors } from '../client/LayoutInstanceClient'
import { moduleActions, moduleSelectors } from '../client/ModuleClient'
import { layoutActions, layoutSelectors } from '../client/LayoutClient'

/**
 * Router for all modules container to use instance client or project client. (rs-access-project or rs-access-instance).
 * @author Sébastien Binda
 */
class InstanceRouterProvider extends React.Component {

  static propTypes = {
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
      applicationId: React.PropTypes.string,
    }),
    element: React.PropTypes.func,
    // Set by mapStateToProps
    isInstance: React.PropTypes.bool,
    // Set by mapDispatchToProps
    fetchModules: React.PropTypes.func,
    fetchInstanceModules: React.PropTypes.func,
    fetchModule: React.PropTypes.func,
    fetchInstanceModule: React.PropTypes.func,
    updateModule: React.PropTypes.func,
    updateInstanceModule: React.PropTypes.func,
    createModule: React.PropTypes.func,
    createInstanceModule: React.PropTypes.func,
    deleteModule: React.PropTypes.func,
    deleteInstanceModule: React.PropTypes.func,
    fetchLayout: React.PropTypes.func,
    fetchInstanceLayout: React.PropTypes.func,
    updateLayout: React.PropTypes.func,
    updateInstanceLayout: React.PropTypes.func,
  }

  // passes the information down to its children
  getChildProps() {
    let props = {}
    if (this.props.isInstance) {
      props = {
        params: this.props.params,
        isInstance: this.props.isInstance,
        moduleSelectors: moduleInstanceSelectors,
        layoutSelectors: layoutInstanceSelectors,
        fetchModules: this.props.fetchInstanceModules,
        fetchModule: this.props.fetchInstanceModule,
        updateModule: this.props.updateInstanceModule,
        createModule: this.props.createInstanceModule,
        deleteModule: this.props.deleteInstanceModule,
        fetchLayout: this.props.fetchInstanceLayout,
        updateLayout: this.props.updateInstanceLayout,
      }
    } else {
      props = {
        params: this.props.params,
        isInstance: this.props.isInstance,
        moduleSelectors,
        layoutSelectors,
        fetchModules: this.props.fetchModules,
        fetchModule: this.props.fetchModule,
        updateModule: this.props.updateModule,
        createModule: this.props.createModule,
        deleteModule: this.props.deleteModule,
        fetchLayout: this.props.fetchLayout,
        updateLayout: this.props.updateLayout,
      }
    }
    return props
  }


  render() {
    if (this.props.isInstance !== undefined) {
      return React.createElement(this.props.element, { ...this.getChildProps() })
    }
    return null
  }
}

const mapStateToProps = (state, ownProps) => ({
  isInstance: AuthenticationParametersSelectors.isInstance(state),
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchModules: (applicationId, moduleId) => dispatch(moduleActions.fetchPagedEntityList(0, 100, { applicationId })),
  fetchInstanceModules: (applicationId, moduleId) => dispatch(moduleInstanceActions.fetchPagedEntityList(0, 100, { applicationId })),
  fetchModule: (applicationId, moduleId) => dispatch(moduleActions.fetchEntity(moduleId, { applicationId })),
  fetchInstanceModule: (applicationId, moduleId) => dispatch(moduleInstanceActions.fetchEntity(moduleId, { applicationId })),
  updateModule: (applicationId, module) => dispatch(moduleActions.updateEntity(module.id, module, { applicationId })),
  updateInstanceModule: (applicationId, module) => dispatch(moduleInstanceActions.updateEntity(module.id, module, { applicationId })),
  createModule: (applicationId, module) => dispatch(moduleActions.createEntity(module, { applicationId })),
  createInstanceModule: (applicationId, module) => dispatch(moduleInstanceActions.createEntity(module, { applicationId })),
  deleteModule: (applicationId, module) => dispatch(moduleActions.deleteEntity(module.id, { applicationId })),
  deleteInstanceModule: (applicationId, module) => dispatch(moduleInstanceActions.deleteEntity(module.id, { applicationId })),
  fetchLayout: applicationId => dispatch(layoutActions.fetchEntity(applicationId)),
  fetchInstanceLayout: applicationId => dispatch(layoutInstanceActions.fetchEntity(applicationId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(InstanceRouterProvider)
