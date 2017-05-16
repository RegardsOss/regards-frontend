/**
 * LICENSE_PLACEHOLDER
 **/
import NavigationLevel from '../../../models/navigation/NavigationLevel'
import NavigationLinkContainer from '../../../containers/user/navigation/NavigationLinkContainer'

/**
 * Component to display navigation bar
 *
 * @author Sébastien binda
 */
class NavigationComponent extends React.Component {

  static propTypes = {
    navigationLevels: React.PropTypes.arrayOf(React.PropTypes.instanceOf(NavigationLevel)).isRequired,
  }

  render() {
    const { navigationLevels } = this.props
    return (
      <div>
        {
          navigationLevels.map((level, index) =>
            <NavigationLinkContainer key={level.levelType} level={level} levelIndex={index} />)
        }
      </div>
    )
  }

}

export default NavigationComponent
