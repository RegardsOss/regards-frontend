/**
 * LICENSE_PLACEHOLDER
 **/
import {connect} from '@regardsoss/redux'
import {ModuleShape, LazyModuleComponent, ModuleListComponent} from '@regardsoss/modules'
import {ApplicationErrorAction} from '@regardsoss/global-sytem-error'
import ModulesSelector from '../model/modules/ModulesSelector'

/**
 * Component to display the dynamic content of the application.
 * The dynamic content is one of the modules associated to the dynamic container content.
 * The module to display is retrieved from the url from react-router /modules/moduleId
 */
class DynamicContentContainer extends React.Component {

  /**
   * @type {{theme: string, content: React.Component}}
   */
  static propTypes = {
    // From React router
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
      moduleId: React.PropTypes.string,
    }),
    // Module to display
    module: ModuleShape,
    // Function to throw an error
    throwError: React.PropTypes.func,
  }

  componentDidMount() {
    if (!this.props.module) {
      const message = `No module found for id=${this.props.params.moduleId}`
      console.warn(message)
      this.props.throwError(message)
    }
  }

  render() {
    if (this.props.module) {
      return (
        <LazyModuleComponent
          key={this.props.module.content.id}
          appName={"user"}
          project={this.props.project}
          module={this.props.module.content}
        />
      )
    }

    return null
  }

}

const mapStateToProps = (state, ownProps) => ({
  module: ModulesSelector.getById(state, ownProps.params.moduleId),
})

const mapDispatchToProps = (dispatch) => ({
  throwError: (message) => dispatch(ApplicationErrorAction.throwError(message))
})

export default connect(mapStateToProps, mapDispatchToProps)(DynamicContentContainer)
