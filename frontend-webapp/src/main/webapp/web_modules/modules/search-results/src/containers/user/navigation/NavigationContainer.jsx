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
    displayDatasets: PropTypes.bool.isRequired,
  }


  render() {
    const { levels, displayDatasets } = this.props
    // hide single dataset level if datasets are not displayed (user should not use it to navigate)
    const displayLevels = displayDatasets ? levels : levels.filter(level => level.levelType !== NavigationLevel.LevelTypes.DATASET)
    return (
      <NavigationComponent navigationLevels={displayLevels} />
    )
  }
}
export default connect(NavigationContainer.mapStateToProps)(NavigationContainer)
