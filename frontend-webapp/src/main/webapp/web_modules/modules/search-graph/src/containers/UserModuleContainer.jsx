/**
 * LICENSE_PLACEHOLDER
 **/
import ModuleConfiguration from '../model/ModuleConfiguration'
import NavigableSearchResults from '../components/user/NavigableSearchResults'

/**
 * Module container for user interface
 **/
class UserModuleContainer extends React.Component {

  static propTypes = {
    // Props supplied by LazyModuleComponent
    appName: React.PropTypes.string,
    project: React.PropTypes.string,
    // Module configuration
    moduleConf: ModuleConfiguration.isRequired,
  }

  render() {
    const { appName, project, moduleConf } = this.props
    return (
      <div>
        <NavigableSearchResults
          appName={appName}
          project={project}
          moduleConf={moduleConf}
        />
      </div>)
  }
}

export default UserModuleContainer
