/**
 * LICENSE_PLACEHOLDER
 **/
import { ApplicationLayout } from '@regardsoss/layout'
import { PluginConf } from '@regardsoss/model'
/**
 * Main container to display module form.
 */
class ModuleContainer extends React.Component {

  static propTypes = {
    layout: React.PropTypes.string.isRequired,
    criterion: React.PropTypes.arrayOf(PluginConf),
  }

  render() {
    if (this.props.layout) {
      const layoutObj = JSON.parse(this.props.layout)

      return (
        <div style={{ marginTop: 20, marginRight: 20, marginLeft: 20 }}>
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
