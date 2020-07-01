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
import isNumber from 'lodash/isNumber'
import throttle from 'lodash/throttle'
import { Measure } from '@regardsoss/adapters'
import { themeContextType } from '@regardsoss/theme'
import { NavigationItem } from '../../../shapes/Navigation'
import MainBarNavigationItem from './bar/MainBarNavigationItem'
import MainBarMoreNavigationButton from './bar/MainBarMoreNavigationButton'

const RELAYOUT_DELAY = 25

/**
 * Navigation layout component: displays navigation elements and more menu according with available width
 * @author Raphaël Mechali
 */
class NavigationLayoutComponent extends React.Component {
  /**
   * WORKAROUND: When first rendering, react-measure provides a wrong width of 48 pixels to big, and this makes the layout wrong. Therefore
   * we reserve that width to make sure full menu will be shown
   */
  static OBSERVED_FIRST_WIDTH_ERROR = 48

  static propTypes = {
    navigationElements: PropTypes.arrayOf(NavigationItem),
    buildLinkURL: PropTypes.func.isRequired,
  }

  static defaultProps = {
    // ensure at list an empty array will be provided
    navigationElements: [],
  }

  static contextTypes = {
    ...themeContextType,
  }

  /** Non initialized state */
  static NON_INITIALIZE_STATE = {
    // Count of bar items shown (at start and after reinitialization, we display all items once to get their width)
    shownBarItemsCount: Number.MAX_SAFE_INTEGER,
    //force showing more button to get its width
    forceMoreButton: true,
    // more elements items
    moreButtonItems: [],
  }

  /**
   * Lifecycle method: component will mount. Used here to detect properties changes
   * @param {*} nextProps next component properties
   */
  UNSAFE_componentWillMount = () => {
    // initialize transient layout data
    this.layoutWidth = null
    this.moreButtonWidth = null
    this.barItemsWidths = {}
    // handle initial layout (through common properties change detection)
    this.onPropertiesUpdated({}, this.props)
  }

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
    // check if the state has been computed on current properties (or if some modules where added / removed)
    const oldElements = oldProps.navigationElements
    const newElements = newProps.navigationElements
    if (!isEqual(oldElements, newElements)) {
      // we re-initialize here the items layout data (the list needs to be recomputed)
      this.onLayoutUpdate(newProps.navigationElements)
    }
  }

  /**
   * One of the layout items size changed: update the bar items width then re-layout
   * @param {string} itemKey
   * @param {number} newWidth new item width
   */
  onBarItemResized = (itemKey, newWidth) => {
    this.barItemsWidths = {
      ...this.barItemsWidths,
      [itemKey]: Math.ceil(newWidth),
    }
    this.onLayoutUpdate(this.props.navigationElements)
  }

  /**
   * More button size changed,
   * @param {number} newWidth new button width
   */
  onMoreButtonResized = (newWidth) => {
    this.moreButtonWidth = Math.ceil(newWidth)
    this.onLayoutUpdate(this.props.navigationElements)
  }

  /**
   * Called when component is resized to update the layout
   * @param {width: number} dimensions
   */
  onComponentResized = ({ measureDiv: { width } }) => {
    // XXX-WORKAROUND: see OBSERVED_FIRST_WIDTH_ERROR comment
    this.layoutWidth = Math.max(0, Math.floor(width) - NavigationLayoutComponent.OBSERVED_FIRST_WIDTH_ERROR)
    // update, bypassing throttle
    this.onLayoutUpdateImpl(this.props.navigationElements)
  }

  /**
   * Layout update implementation
   * @param {[NavigationItem]} navigationElements navigation model
   */
  onLayoutUpdateImpl = (navigationElements) => {
    // 0 - check if initialized (if not, show all)
    let nextState = NavigationLayoutComponent.NON_INITIALIZE_STATE
    const isInitialized = isNumber(this.layoutWidth) && isNumber(this.moreButtonWidth)
      && navigationElements.reduce((acc, navigationElement) => acc && isNumber(this.barItemsWidths[navigationElement.key]), true)
    if (isInitialized) {
      // 1 - consume this width to show more possible elements
      let shownBarItemsCount = 0
      let consumedWidth = 0
      let exceededWidth = false
      navigationElements.forEach((element) => {
        // already exceed available width?
        if (!exceededWidth) {
          const elementWidth = this.barItemsWidths[element.key]
          const nextWidth = elementWidth + consumedWidth
          if (nextWidth > this.layoutWidth) {
            // this item and following ones will not be shown in main bar
            exceededWidth = true
          } else {
            // this item will be shown (if next algorithm doesn't remove it)
            consumedWidth = nextWidth
            shownBarItemsCount += 1
          }
        }
      })

      // 2 - insert the more button in this layout if required
      // 2.a - retrieve the first item that should be hidden
      const showMoreButton = shownBarItemsCount < navigationElements.length
      if (showMoreButton) {
        // algorithm: we remove items previously considered in width until it remains enough space to set the more button
        // in layout. If there is not enough space, only the more button will be displayed (we cannot hide it)
        let remainingWidth = this.layoutWidth - consumedWidth
        for (; shownBarItemsCount > 0 && remainingWidth < this.moreButtonWidth; shownBarItemsCount -= 1) {
          const itemToRemove = navigationElements[shownBarItemsCount - 1]
          remainingWidth += this.barItemsWidths[itemToRemove.key]
        }
      }
      // 2.b - publish the new  in state
      nextState = {
        shownBarItemsCount,
        // empty when shown count is the exact items count
        forceMoreButton: false,
        moreButtonItems: navigationElements.slice(shownBarItemsCount),
      }
    }

    if (!isEqual(this.state, nextState)) {
      this.setState(nextState)
    }
  }

  /**
   * On layout update (wrapper)
   * @param {[NavigationItem]} navigationElements navigation model
   */
  onLayoutUpdate = throttle(this.onLayoutUpdateImpl, RELAYOUT_DELAY, { leading: true })

  render() {
    const { navigationElements, buildLinkURL } = this.props
    const { shownBarItemsCount, moreButtonItems, forceMoreButton } = this.state
    const { moduleTheme: { user: { navigationGroup } } } = this.context
    return (
      <Measure bounds onMeasure={this.onComponentResized}>
        {
          ({ bind }) => (
            <div style={navigationGroup} {...bind('measureDiv')}>
              { /** main bar items */
                navigationElements.map((navigationElement, index) => (
                  <MainBarNavigationItem
                    key={navigationElement.key}
                    item={navigationElement}
                    displayed={index < shownBarItemsCount}
                    buildLinkURL={buildLinkURL}
                    onItemResized={this.onBarItemResized}
                  />
                ))
              }
              {/* More elements button  */}
              <MainBarMoreNavigationButton
                displayed={forceMoreButton || moreButtonItems.length > 0}
                items={moreButtonItems}
                buildLinkURL={buildLinkURL}
                onResized={this.onMoreButtonResized}
              />
            </div>)
        }
      </Measure>)
  }
}
export default NavigationLayoutComponent
