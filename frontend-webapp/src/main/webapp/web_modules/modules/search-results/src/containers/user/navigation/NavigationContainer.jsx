/**
* LICENSE_PLACEHOLDER
**/
import { connect } from '@regardsoss/redux'
import navigationContextSelectors from '../../../models/navigation/NavigationContextSelectors'
import { Tag } from '../../../models/navigation/Tag'
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
    levels: PropTypes.arrayOf(PropTypes.instanceOf(Tag)).isRequired,
    gotoLevel: PropTypes.func.isRequired,
  }

  /**
   * On user level selected
   */
  onLevelSelected = (level, index) => this.props.gotoLevel(index) // works for root (0) and "real" levels after

  render() {
    const { levels, resultsTitle } = this.props
    return (
      <NavigationComponent
        resultsTitle={resultsTitle}
        navigationLevels={levels}
        onLevelSelected={this.onLevelSelected}
      />
    )
  }
}
export default connect(
  NavigationContainer.mapStateToProps,
  NavigationContainer.mapDispatchToProps)(NavigationContainer)
