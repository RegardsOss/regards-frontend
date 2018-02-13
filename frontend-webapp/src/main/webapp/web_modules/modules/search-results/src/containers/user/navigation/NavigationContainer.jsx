/**
* LICENSE_PLACEHOLDER
**/
import { UIDomain } from '@regardsoss/domain'
import { AccessShapes } from '@regardsoss/shape'
import { connect } from '@regardsoss/redux'
import { i18nSelectors } from '@regardsoss/i18n'
import navigationContextSelectors from '../../../models/navigation/NavigationContextSelectors'
import { Tag } from '../../../models/navigation/Tag'
import NavigationContextActions from '../../../models/navigation/NavigationContextActions'
import NavigationComponent from '../../../components/user/navigation/NavigationComponent'

/**
* Navigation container
*/
export class NavigationContainer extends React.Component {
  static mapStateToProps = state => ({
    locale: i18nSelectors.getLocale(state),
    levels: navigationContextSelectors.getLevels(state),
  })

  static mapDispatchToProps(dispatch) {
    return ({
      gotoLevel: levelIndex => dispatch(NavigationContextActions.gotoLevel(levelIndex)),
    })
  }

  static propTypes = {
    // module description
    description: PropTypes.string,
    // module page definition
    page: AccessShapes.ModulePage,
    // module type (avoid redefining it)
    type: PropTypes.string.isRequired,
    // from mapStateToProps
    locale: PropTypes.string,
    levels: PropTypes.arrayOf(PropTypes.instanceOf(Tag)).isRequired,
    gotoLevel: PropTypes.func.isRequired,
  }

  /**
   * On user level selected
   */
  onLevelSelected = (level, index) => this.props.gotoLevel(index) // works for root (0) and "real" levels after

  render() {
    const {
      locale, levels, description, page, type,
    } = this.props
    return (
      <NavigationComponent
        locale={locale}
        description={description}
        page={page}
        defaultIconURL={UIDomain.getModuleDefaultIconURL(type)}
        navigationLevels={levels}
        onLevelSelected={this.onLevelSelected}
      />
    )
  }
}
export default connect(
  NavigationContainer.mapStateToProps,
  NavigationContainer.mapDispatchToProps,
)(NavigationContainer)
