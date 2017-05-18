/**
* LICENSE_PLACEHOLDER
**/
import { connect } from '@regardsoss/redux'
import NavigationLevel from '../../../models/navigation/NavigationLevel'
import NavigationContextActions from '../../../models/navigation/NavigationContextActions'
import NavigationLinkComponent from '../../../components/user/navigation/NavigationLinkComponent'

/**
* Container for a navigation link
*/
export class NavigationLinkContainer extends React.Component {

  static mapDispatchToProps(dispatch) {
    return ({
      gotoLevel: levelIndex => dispatch(NavigationContextActions.gotoLevel(levelIndex)),
    })
  }

  static propTypes = {
    level: PropTypes.instanceOf(NavigationLevel).isRequired,
    levelIndex: PropTypes.number.isRequired,
    // from mapDispatchToProps
    gotoLevel: PropTypes.func.isRequired,
  }

  onClickLevel = () => {
    const { levelIndex, gotoLevel } = this.props
    gotoLevel(levelIndex)
  }

  render() {
    const { level, levelIndex } = this.props
    return (
      <NavigationLinkComponent
        firstLevel={levelIndex === 0}
        level={level}
        onClickLevel={this.onClickLevel}
      />
    )
  }
}
export default connect(null, NavigationLinkContainer.mapDispatchToProps)(NavigationLinkContainer)
