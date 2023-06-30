/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { connect } from '@regardsoss/redux'
import { UIShapes } from '@regardsoss/shape'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import { resultsContextSelectors } from '../../../clients/ResultsContextClient'
import TabsContentComponent from '../../../components/user/tabs/TabsContentComponent'

/**
 * Tabs content container: provides to child component the tab state
 * @author Raphaël Mechali
 */
export class TabsContentContainer extends React.Component {
  /**
   * List of tabs displayed after some user actions
   */
  static ALL_TABS = UIDomain.RESULTS_TABS

  /**
   * Initial tabs loaded, as the TAGS_TAB is not relevant at first
   */
  static TABS_WITHOUT_TAGS_TAB = [UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS, UIDomain.RESULTS_TABS_ENUM.DESCRIPTION]

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, { moduleId }) {
    return {
      resultsContext: resultsContextSelectors.getResultsContext(state, moduleId),
    }
  }

  static propTypes = {
    moduleId: PropTypes.number.isRequired,
    appName: PropTypes.string.isRequired,
    project: PropTypes.string.isRequired,
    // from mapStateToProps
    resultsContext: UIShapes.ResultsContext.isRequired,
  }

  /** Default state: only results visible */
  state = {
    displayedTagsTab: false,
    activeTabs: TabsContentContainer.TABS_WITHOUT_TAGS_TAB,
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  UNSAFE_componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesUpdated(this.props, nextProps)

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    const { resultsContext } = newProps
    const newState = { ...this.state }

    // Render the TAG_RESULTS tab only if active or context tags criteria not empty
    const isTagsTabActive = resultsContext.selectedTab === UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS || !isEmpty(get(resultsContext, '[UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS].tagResult.criteria.contextTags'))

    // update activeTabs
    if (isTagsTabActive) {
      newState.activeTabs = TabsContentContainer.ALL_TABS
    } else {
      newState.activeTabs = TabsContentContainer.TABS_WITHOUT_TAGS_TAB
    }

    // perform update only on new state detection
    if (!isEqual(this.state, newState)) {
      this.setState(newState)
    }
  }

  render() {
    const {
      moduleId, appName, project, resultsContext,
    } = this.props
    const {
      activeTabs,
    } = this.state
    return (
      <TabsContentComponent
        moduleId={moduleId}
        appName={appName}
        project={project}
        resultsContext={resultsContext}
        activeTabs={activeTabs}
      />
    )
  }
}
export default connect(TabsContentContainer.mapStateToProps)(TabsContentContainer)
