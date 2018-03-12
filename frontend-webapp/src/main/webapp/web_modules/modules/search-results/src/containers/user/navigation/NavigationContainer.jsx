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
    initialLevels: navigationContextSelectors.getInitialLevels(state),
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
    // eslint-disable-next-line react/no-unused-prop-types
    initialLevels: PropTypes.arrayOf(PropTypes.instanceOf(Tag)).isRequired, // used only in onPropertiesUpdated
    // eslint-disable-next-line react/no-unused-prop-types
    levels: PropTypes.arrayOf(PropTypes.instanceOf(Tag)).isRequired, // used only in onPropertiesUpdated
    gotoLevel: PropTypes.func.isRequired,
  }

  /** Initial component state */
  state = {
    navigationLevels: [],
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  componentWillReceiveProps = nextProps => this.onPropertiesUpdated(this.props, nextProps)

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    if (newProps.levels !== oldProps.levels || newProps.initialLevels !== oldProps.initialLevels) {
      // update state levels
      const hasInitialContextLevels = newProps.initialLevels.length
      this.setState({
        navigationLevels: [
          // when computing levels, add ROOT if there is no initial context tags (initial levels are repeated in levels)
          ...(hasInitialContextLevels ? [] : [NavigationComponent.ROOT_PLACEHOLDER]),
          // all levels with initial one
          ...newProps.levels,
        ],
      })
    }
  }

  /**
   * On user level selected
   */
  onLevelSelected = (level, index) => {
    this.props.gotoLevel(index) // works for root (0) and "real" levels after
  }

  render() {
    const {
      locale, description, page, type,
    } = this.props
    const { navigationLevels } = this.state
    return (
      <NavigationComponent
        locale={locale}
        description={description}
        page={page}
        defaultIconURL={UIDomain.getModuleDefaultIconURL(type)}
        navigationLevels={navigationLevels}
        onLevelSelected={this.onLevelSelected}
      />
    )
  }
}
export default connect(
  NavigationContainer.mapStateToProps,
  NavigationContainer.mapDispatchToProps,
)(NavigationContainer)
