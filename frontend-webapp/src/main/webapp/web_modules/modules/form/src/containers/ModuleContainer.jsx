/**
 * LICENSE_PLACEHOLDER
 **/
import { ApplicationLayout } from '@regardsoss/layout'
import { PluginComponent } from '@regardsoss/plugins'
/**
 * Main container to display module form.
 */
class ModuleContainer extends React.Component {

  static propTypes = {
    layout: React.PropTypes.string.isRequired,
  }

  render() {
    if (this.props.layout) {
      const layoutObj = JSON.parse(this.props.layout)

      return (
        <div>
          <ApplicationLayout
            appName="user"
            layout={layoutObj}
            plugins={this.props.criterion}
          />
        </div>
      )
    } else {
      return <div>Loading ... </div>
    }
  }

}

export default ModuleContainer
