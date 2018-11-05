/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import { UIDomain } from '@regardsoss/domain'
import { AccessShapes } from '@regardsoss/shape'
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
      description, page, type,
    } = this.props
    const { navigationLevels } = this.state
    return (
      <NavigationComponent
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
