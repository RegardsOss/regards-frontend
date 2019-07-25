/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
      levels: resultsContextSelectors.getLevels(state, moduleId),
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
      updateResultsContext: stateDiff => dispatch(resultsContextActions.updateResultsContext(moduleId, stateDiff)),
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
    levels: UIShapes.LevelsArray.isRequired, // levels currently shown (set by user in this module or controlling one)
    // from mapDispatchToProps
    updateResultsContext: PropTypes.func.isRequired,
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
      description, page, levels, contextTags,
    } = newProps

    // Update displayed levels list (always, as levels and context tags are the only mutable properties in component)
    const navigationLevels = []
    // 1. Add root level if it was provided in configuration (there is a page or a description) and no context tag
    // (Context tags replace root)
    if (NavigationContainer.hasRootTag(newProps) && !contextTags.length) {
      navigationLevels.push({
        type: NavigationComponent.ROOT_TAG,
        label: {
          en: get(page, 'title.en', description),
          fr: get(page, 'title.fr', description),
        },
        // navigation is allowed to root level only when there is no next context tags and there are
        // levels after (meaningless otherwise)
        isNavigationAllowed: !contextTags.length,
      })
    }

    // 2. Add all levels from context. Allow navigation only for the last element (to avoid user
    // removing any contextual element), when there are following tags (meaningless otherwise)
    if (contextTags.length) {
      navigationLevels.push(...contextTags.map(({ type, label }) => ({
        type,
        label: {
          en: label,
          fr: label,
        },
        isNavigationAllowed: false,
      })))
      navigationLevels[navigationLevels.length - 1].isNavigationAllowed = true
    }
    // 3. Finally add user levels, that can always be navigated through (last one will never be, due to Breadcrumb automations)
    if (levels.length) {
      navigationLevels.push(...levels.map(({ type, label, entity }) => {
        let locLabel
        switch (type) {
          case UIDomain.ResultsContextConstants.DESCRIPTION_LEVEL: // description level: label can be found in entity
            locLabel = get(entity, 'content.label')
            break
          default: // Word or entity tag: use label in tag directly
            locLabel = label
        }
        return { type, label: { en: locLabel, fr: locLabel }, isNavigationAllowed: true }
      }))
    }

    const newState = { navigationLevels }
    if (!isEqual(this.state, newState)) {
      this.setState(newState)
    }
  }

  /**
   * On user level selected: levels after the one clicked should be removed (all if the last root/context tag was clicked)
   * @param {*} level as it was initially provided to subcomponent
   * @param {number} index level index (0 to N-1)
   */
  onLevelSelected = (level, index) => {
    const { levels, contextTags, updateResultsContext } = this.props
    // compute last static tag index (as level is expressed at a relative position to previous context / root levels),
    // as [0 ; N-1] index
    const lastContextTagIndex = (NavigationContainer.hasRootTag(this.props) ? 1 : 0) + contextTags.length - 1
    // compute last element index to NOT KEEP in levels (...if 2, elements 0, 1 are kept, if 1; element 0 is kept; if 0 itself, empty array)
    const remainingTagsCount = index - lastContextTagIndex
    const nextLevels = levels.slice(0, remainingTagsCount)
    updateResultsContext({
      criteria: {
        levels: nextLevels,
      },
    })
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
