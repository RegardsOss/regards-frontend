/**
 * LICENSE_PLACEHOLDER
 **/
import ProjectListComponent from '../components/ProjectListComponent'
/**
 * Display news and project list on the homepage
 */
export class ModuleContainer extends React.Component {
  /**
   * @returns {React.Component}
   */
  render() {
    return (
      <div>
        <ProjectListComponent />
      </div>
    )
  }
}

export default ModuleContainer
