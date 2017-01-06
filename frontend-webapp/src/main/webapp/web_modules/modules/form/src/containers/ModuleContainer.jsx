/**
 * LICENSE_PLACEHOLDER
 **/
import { ApplicationLayout } from '@regardsoss/layout'
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
        <ApplicationLayout
          appName="user"
          layout={layoutObj}
        />
      )
    } else {
      return <div>Loading ... </div>
    }
  }

}

export default ModuleContainer
