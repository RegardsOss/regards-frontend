/**
 * LICENSE_PLACEHOLDER
 **/
import { connect } from '@regardsoss/redux'
import { AuthenticationParametersSelectors } from '@regardsoss/authentication-manager'
import ModuleFormContainer from './ModuleFormContainer'
import { moduleInstanceActions, moduleInstanceSelectors } from '../client/ModuleInstanceClient'
import { layoutInstanceActions, layoutInstanceSelectors } from '../client/LayoutInstanceClient'
import { moduleActions, moduleSelectors } from '../client/ModuleClient'
import { layoutActions, layoutSelectors } from '../client/LayoutClient'

/**
 * Adapter for all modules container to use instance client or project client. (rs-access-project or rs-access-instance).
 * @author Sébastien Binda
 * @author Léo Mieulet
 */
export class ModuleFormAdapter extends React.Component {

  static propTypes = {
    params: PropTypes.shape({
      project: PropTypes.string,
      applicationId: PropTypes.string,
      module_id: PropTypes.string,
      duplicate_module_id: PropTypes.string,
    }),
    // Set by mapStateToProps
    isInstance: PropTypes.bool,
    // Set by mapDispatchToProps
    fetchModule: PropTypes.func,
    fetchInstanceModule: PropTypes.func,
    updateModule: PropTypes.func,
    updateInstanceModule: PropTypes.func,
    createModule: PropTypes.func,
    createInstanceModule: PropTypes.func,
    deleteModule: PropTypes.func,
    deleteInstanceModule: PropTypes.func,
    fetchLayout: PropTypes.func,
    fetchInstanceLayout: PropTypes.func,
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
        fetchModule: this.props.fetchInstanceModule,
        updateModule: this.props.updateInstanceModule,
        createModule: this.props.createInstanceModule,
        deleteModule: this.props.deleteInstanceModule,
        fetchLayout: this.props.fetchInstanceLayout,
      }
    } else {
      props = {
        params: this.props.params,
        isInstance: this.props.isInstance,
        moduleSelectors,
        layoutSelectors,
        fetchModule: this.props.fetchModule,
        updateModule: this.props.updateModule,
        createModule: this.props.createModule,
        deleteModule: this.props.deleteModule,
        fetchLayout: this.props.fetchLayout,
      }
    }
    return props
  }


  render() {
    return (<ModuleFormContainer
      {...this.getChildProps()}
    />)
  }
}

const mapStateToProps = (state, ownProps) => ({
  isInstance: AuthenticationParametersSelectors.isInstance(state),
})

const mapDispatchToProps = (dispatch, ownProps) => ({
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

export default connect(mapStateToProps, mapDispatchToProps)(ModuleFormAdapter)
