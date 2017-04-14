/**
 * LICENSE_PLACEHOLDER
 **/
import { connect } from '@regardsoss/redux'
import { AuthenticationParametersSelectors } from '@regardsoss/authentication-manager'
import ModulesListContainer from './ModulesListContainer'
import { moduleInstanceActions, moduleInstanceSelectors } from '../client/ModuleInstanceClient'
import { moduleActions, moduleSelectors } from '../client/ModuleClient'

/**
 * Router for all modules container to use instance client or project client. (rs-access-project or rs-access-instance).
 * @author Sébastien Binda
 * @author Léo Mieulet
 */
export class ModulesListAdapter extends React.Component {

  static propTypes = {
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
      applicationId: React.PropTypes.string,
    }),
    // Set by mapStateToProps
    isInstance: React.PropTypes.bool,
    // Set by mapDispatchToProps
    fetchModules: React.PropTypes.func,
    fetchInstanceModules: React.PropTypes.func,
    updateModule: React.PropTypes.func,
    updateInstanceModule: React.PropTypes.func,
    deleteModule: React.PropTypes.func,
    deleteInstanceModule: React.PropTypes.func,
  }


  // passes the information down to its children
  getChildProps() {
    let props = {}
    if (this.props.isInstance) {
      props = {
        params: this.props.params,
        isInstance: this.props.isInstance,
        moduleSelectors: moduleInstanceSelectors,
        fetchModules: this.props.fetchInstanceModules,
        updateModule: this.props.updateInstanceModule,
        deleteModule: this.props.deleteInstanceModule,
      }
    } else {
      props = {
        params: this.props.params,
        isInstance: this.props.isInstance,
        moduleSelectors,
        fetchModules: this.props.fetchModules,
        updateModule: this.props.updateModule,
        deleteModule: this.props.deleteModule,
      }
    }
    return props
  }


  render() {
    return (<ModulesListContainer
      {...this.getChildProps()}
    />)
  }
}

const mapStateToProps = (state, ownProps) => ({
  isInstance: AuthenticationParametersSelectors.isInstance(state),
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchModules: (applicationId, moduleId) => dispatch(moduleActions.fetchPagedEntityList(0, 100, { applicationId })),
  fetchInstanceModules: (applicationId, moduleId) => dispatch(moduleInstanceActions.fetchPagedEntityList(0, 100, { applicationId })),
  updateModule: (applicationId, module) => dispatch(moduleActions.updateEntity(module.id, module, { applicationId })),
  updateInstanceModule: (applicationId, module) => dispatch(moduleInstanceActions.updateEntity(module.id, module, { applicationId })),
  deleteModule: (applicationId, module) => dispatch(moduleActions.deleteEntity(module.id, { applicationId })),
  deleteInstanceModule: (applicationId, module) => dispatch(moduleInstanceActions.deleteEntity(module.id, { applicationId })),
})

export default connect(mapStateToProps, mapDispatchToProps)(ModulesListAdapter)
