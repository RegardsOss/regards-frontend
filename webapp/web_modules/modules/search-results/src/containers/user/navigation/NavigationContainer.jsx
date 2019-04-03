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
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import { UIDomain } from '@regardsoss/domain'
import { AccessShapes, UIShapes } from '@regardsoss/shape'
import { connect } from '@regardsoss/redux'
import { resultsContextActions, resultsContextSelectors } from '../../../clients/ResultsContextClient'
import NavigationComponent from '../../../components/user/navigation/NavigationComponent'

/**
* Navigation container
*/
export class NavigationContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, { moduleId }) {
    return {
      contextTags: resultsContextSelectors.getContextTags(state, moduleId),
      tags: resultsContextSelectors.getTags(state, moduleId),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch, { moduleId }) {
    return {
      setTags: tags => dispatch(resultsContextActions.setTags(moduleId, tags)),
    }
  }

  static propTypes = {
    // module ID, used in mapStateToProps and mapDispatchToProps only
    // eslint-disable-next-line react/no-unused-prop-types
    moduleId: PropTypes.number.isRequired,
    // module description, used only in onPropertiesUpdated
    // eslint-disable-next-line react/no-unused-prop-types
    description: PropTypes.string,
    // module page definition
    page: AccessShapes.ModulePage,
    // module type (avoid redefining it)
    type: PropTypes.string.isRequired,
    // from mapStateToProps
    // context tags (usually set by any module driving this one)
    contextTags: UIShapes.TagsArray.isRequired,
    // tags (usually set by user within this module)
    tags: UIShapes.TagsArray.isRequired,
    // from mapDispatchToProps
    setTags: PropTypes.func.isRequired,
  }

  /**
   * Should there be a root tag with properties as parameters (if not, use context or tags as root)
   * @param {*} props properties to test
   * @return {Boolean} true when a root tag can / should be added, false otherwise
   */
  static hasRootTag(props) {
    return (props.page && props.page.title) || props.description
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
    const {
      description, page, tags, contextTags,
    } = newProps

    // Update levels list (always, as tags and context tags are the only mutable properties in component)
    const navigationLevels = []
    // 1. Add root level if it was provided in configuration (there is a page or a description)
    if (NavigationContainer.hasRootTag(newProps)) {
      navigationLevels.push({
        label: {
          en: get(page.title, 'en', description),
          fr: get(page.title, 'fr', description),
        },
        // navigation is allowed to root level only when there is no next context tags and there are
        // tags after (meaningless otherwise)
        isNavigationAllowed: !contextTags.length,
      })
    }

    // 2. Add all levels from context. Allow navigation only for the last element (to avoid user
    // removing any contextual element), when there are following tags (meaningless otherwise)
    if (contextTags.length) {
      navigationLevels.push(...contextTags.map(({ label }) => ({
        label: {
          en: label,
          fr: label,
        },
        isNavigationAllowed: false,
      })))
      navigationLevels[navigationLevels.length - 1].isNavigationAllowed = true
    }
    // 3. Finally add user tags, that can always be navigated through (last one will never be, due to Breadcrumb automations)
    if (tags.length) {
      navigationLevels.push(...tags.map(({ label }) => ({
        label: {
          en: label,
          fr: label,
        },
        isNavigationAllowed: true,
      })))
    }

    const newState = { navigationLevels }
    if (!isEqual(this.state, newState)) {
      this.setState(newState)
    }
  }

  /**
   * On user level selected: tags after the one clicked should be removed (all if the last root/context tag was clicked)
   * @param {*} level as it was initially provided to subcomponent
   * @param {number} index level index (0 to N-1)
   */
  onLevelSelected = (level, index) => {
    const { tags, contextTags, setTags } = this.props
    // compute last static tag index (as tag level is expressed as a relative number to previous context / root tags),
    // as [0 ; N-1] index
    const lastContextTagIndex = (NavigationContainer.hasRootTag(this.props) ? 1 : 0) + contextTags.length - 1
    // compute last element index to NOT KEEP in tags (...if 2, elements 0, 1 are kept, if 1; element 0 is kept; if 0 itself, empty array)
    const remainingTagsCount = index - lastContextTagIndex
    const nextTags = tags.slice(0, remainingTagsCount)
    setTags(nextTags)
  }

  render() {
    const { page, type } = this.props
    const { navigationLevels } = this.state

    return (
      <NavigationComponent
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
