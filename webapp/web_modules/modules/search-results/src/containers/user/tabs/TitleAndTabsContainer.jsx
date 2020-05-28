/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import isEqual from 'lodash/isEqual'
import { connect } from '@regardsoss/redux'
import { AccessShapes, UIShapes } from '@regardsoss/shape'
import { CatalogDomain, UIDomain } from '@regardsoss/domain'
import { resultsContextActions, resultsContextSelectors } from '../../../clients/ResultsContextClient'
import TitleAndTabsComponent from '../../../components/user/tabs/TitleAndTabsComponent'

/**
 * Tabs container: it wraps current results context tabs into an array of visible / selected tabs for component
 * @author Raphaël Mechali
 */
export class TitleAndTabsContainer extends React.Component {
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

  /**
 * Redux: map dispatch to props function
 * @param {*} dispatch: redux dispatch function
 * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
 * @return {*} list of component properties extracted from redux state
 */
  static mapDispatchToProps(dispatch) {
    return {
      updateResultsContext: (moduleId, stateDiff) => dispatch(resultsContextActions.updateResultsContext(moduleId, stateDiff)),
    }
  }

  static propTypes = {
    moduleId: PropTypes.number.isRequired,
    description: PropTypes.string, // used only in onPropertiesUpdated
    // module page definition
    page: AccessShapes.ModulePage,
    // from mapStateToProps
    resultsContext: UIShapes.ResultsContext.isRequired, // used only in onPropertiesUpdated
    // from mapDispatchToProps
    updateResultsContext: PropTypes.func.isRequired,
  }

  /** Defines tabs in the order they be shown */
  static TABS_ORDER = [
    UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
    UIDomain.RESULTS_TABS_ENUM.DESCRIPTION,
    UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS,
  ]

  /** Closable tabs */
  static CLOSABLE_TABS = [
    UIDomain.RESULTS_TABS_ENUM.DESCRIPTION,
    UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS,
  ]

  /** Default state: only results visible */
  state = {
    tabs: [{
      type: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
      selected: true,
    }],
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
    const { resultsContext } = newProps
    const newState = { ...this.state }
    // compute tabs state
    newState.tabs = TitleAndTabsContainer.TABS_ORDER.reduce((acc, tabType) => {
      let tabVisible
      let tabName = null
      switch (tabType) {
        case UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS:
          tabVisible = true // always visible
          break
        case UIDomain.RESULTS_TABS_ENUM.DESCRIPTION:
          // visible when there is at least one described entity
          tabVisible = resultsContext.tabs[tabType].descriptionPath.length > 0
          break
        case UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS: {
          const { contextTags } = resultsContext.tabs[tabType].criteria
          // visible when there is root context tag
          tabVisible = contextTags.length > 0 && contextTags[0].type !== CatalogDomain.TAG_TYPES_ENUM.UNRESOLVED
          tabName = tabVisible ? contextTags[0].label : null
          if (tabName && CatalogDomain.TagsHelper.isCouplingTag(tabName)) {
            // specific case of coupling tags: use only coupling label
            tabName = CatalogDomain.TagsHelper.parseCouplingTag(tabName).label
          }
          break
        }
        default:
          throw new Error(`Unknwon tab type ${tabType}`)
      }
      return tabVisible ? [
        ...acc, {
          tabType,
          tabName,
          selected: resultsContext.selectedTab === tabType,
          closable: TitleAndTabsContainer.CLOSABLE_TABS.includes(tabType),
        }] : acc
    }, [])

    // perform update only on new state detection
    if (!isEqual(this.state, newState)) {
      this.setState(newState)
    }
  }

  /**
   * User callback: Updates results context with selected tab.
   * @param {string} selectedTab selected tab type, one of UIDomain.RESULTS_TABS
   */
  onTabSelected = (selectedTab) => {
    const { moduleId, resultsContext, updateResultsContext } = this.props
    if (selectedTab !== resultsContext.selectedTab) {
      updateResultsContext(moduleId, { selectedTab })
    }
  }

  /**
   * User callback: Updates results context with selected tab.
   * @param {string} closedTabType closed tab type, one of UIDomain.RESULTS_TABS
   */
  onTabClosed = (closedTabType) => {
    const { moduleId, updateResultsContext, resultsContext } = this.props
    const nextTabType = resultsContext.selectedTab === closedTabType ? UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS : resultsContext.selectedTab
    switch (closedTabType) {
      case UIDomain.RESULTS_TABS_ENUM.DESCRIPTION:
        updateResultsContext(moduleId, {
          selectedTab: nextTabType,
          tabs: {
            [closedTabType]: { descriptionPath: [], selectedIndex: 0 },
          },
        })
        break
      case UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS:
        updateResultsContext(moduleId, {
          selectedTab: nextTabType,
          tabs: {
            [closedTabType]: {
              criteria: { contextTags: [] },
            },
          },
        })
        break
      case UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS:
        throw new Error(`Unclosable tab type ${closedTabType}`)
      default:
        throw new Error(`Unknwon tab type ${closedTabType}`)
    }
  }

  render() {
    const { description, page } = this.props
    const { tabs } = this.state
    return (
      <TitleAndTabsComponent
        description={description}
        page={page}
        tabs={tabs}
        onTabSelected={this.onTabSelected}
        onTabClosed={this.onTabClosed}
      />
    )
  }
}
export default connect(
  TitleAndTabsContainer.mapStateToProps,
  TitleAndTabsContainer.mapDispatchToProps)(TitleAndTabsContainer)
