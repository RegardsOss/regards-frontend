/**
* LICENSE_PLACEHOLDER
**/
import { connect } from '@regardsoss/redux'
import navigationContextSelectors from '../../../models/navigation/NavigationContextSelectors'
import NavigationLevel from '../../../models/navigation/NavigationLevel'
import NavigationComponent from '../../../components/user/navigation/NavigationComponent'

/**
* Navigation container
*/
export class NavigationContainer extends React.Component {

  static mapStateToProps = state => ({
    levels: navigationContextSelectors.getLevels(state),
  })

  static propTypes = {
    // from mapStateToProps
    levels: PropTypes.arrayOf(PropTypes.instanceOf(NavigationLevel)).isRequired,
  }


  render() {
    const { levels } = this.props
    return (
      <NavigationComponent navigationLevels={levels} />
    )
  }
}
export default connect(NavigationContainer.mapStateToProps)(NavigationContainer)
