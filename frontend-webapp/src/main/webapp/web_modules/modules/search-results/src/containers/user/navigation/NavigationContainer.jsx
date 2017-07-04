/**
* LICENSE_PLACEHOLDER
**/
import { connect } from '@regardsoss/redux'
import navigationContextSelectors from '../../../models/navigation/NavigationContextSelectors'
import NavigationLevel from '../../../models/navigation/NavigationLevel'
import NavigationContextActions from '../../../models/navigation/NavigationContextActions'
import NavigationComponent from '../../../components/user/navigation/NavigationComponent'

/**
* Navigation container
*/
export class NavigationContainer extends React.Component {

  static mapStateToProps = state => ({
    levels: navigationContextSelectors.getLevels(state),
  })


  static mapDispatchToProps(dispatch) {
    return ({
      gotoLevel: levelIndex => dispatch(NavigationContextActions.gotoLevel(levelIndex)),
    })
  }

  static propTypes = {
    resultsTitle: PropTypes.string,
    // from mapStateToProps
    levels: PropTypes.arrayOf(PropTypes.instanceOf(NavigationLevel)).isRequired,
    displayDatasets: PropTypes.bool.isRequired,
    gotoLevel: PropTypes.func.isRequired,
  }

  /**
   * On user level selected
   */
  onLevelSelected = (level, index) => this.props.gotoLevel(index) // works for root (0) and "real" levels after

  render() {
    const { levels, displayDatasets, resultsTitle } = this.props
    // hide single dataset level if datasets are not displayed (user should not use it to navigate)
    const displayLevels = displayDatasets ? levels : levels.filter(level => level.levelType !== NavigationLevel.LevelTypes.DATASET)
    return (
      <NavigationComponent
        resultsTitle={resultsTitle}
        navigationLevels={displayLevels}
        onLevelSelected={this.onLevelSelected}
      />
    )
  }
}
export default connect(
  NavigationContainer.mapStateToProps,
  NavigationContainer.mapDispatchToProps)(NavigationContainer)
