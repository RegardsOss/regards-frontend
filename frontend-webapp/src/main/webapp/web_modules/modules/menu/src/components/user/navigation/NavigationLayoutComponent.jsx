/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import Measure from 'react-measure'
import { themeContextType } from '@regardsoss/theme'
import MainBarNavigationItem from './MainBarNavigationItem'
import MoreNavigationButton from './MoreNavigationButton'


const TEMP_NAV_MODEL = [{
  key: 'item.1',
  label: 'A test',
  selected: false,
  moduleId: 0,
}, {
  key: 'item.2',
  label: 'Another test',
  selected: false,
  moduleId: 0,
}, {
  key: 'item.3',
  label: 'Some page',
  selected: true,
  moduleId: 0,
}, {
  key: 'item.4',
  label: 'Some other',
  selected: false,
  moduleId: 0,
}, {
  key: 'item.5',
  label: 'Toilets',
  selected: false,
  moduleId: 0,
}, {
  key: 'item.6',
  label: 'Patatoes',
  selected: false,
  moduleId: 0,
}, {
  key: 'item.7',
  label: 'Burger',
  selected: false,
  moduleId: 0,
}, {
  key: 'item.8',
  label: 'One long page',
  selected: false,
  moduleId: 0,
}, {
  key: 'item.9',
  label: 'Bad idea',
  selected: false,
  moduleId: 0,
}, {
  key: 'item.10',
  label: 'Broken server',
  selected: false,
  moduleId: 0,
}, {
  key: 'item.11',
  label: 'PopCorn',
  selected: false,
  moduleId: 0,
}, {
  key: 'item.12',
  label: 'External site',
  selected: false,
  moduleId: 0,
}, {
  key: 'item.13',
  label: 'VDM',
  selected: false,
  moduleId: 0,
}, {
  key: 'item.14',
  label: 'Le mulot!',
  selected: false,
  moduleId: 0,
}, {
  key: 'item.15',
  label: 'Pas toucher',
  selected: false,
  moduleId: 0,
}, {
  key: 'item.16',
  label: 'Banana',
  selected: false,
  moduleId: 0,
}, {
  key: 'item.17',
  label: 'Cup cake',
  selected: false,
  moduleId: 0,
},
]

/**
 * Navigation layout component: displays navigation elements and more menu according with available width
 * @author Raphaël Mechali
 */
class NavigationLayoutComponent extends React.Component {
  static propTypes = {
    // TODO better shape
    navigationModel: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      selected: PropTypes.bool.isRequired,
    })).isRequired,
  }

  // TODO remove that
  static defaultProps = {
    navigationModel: TEMP_NAV_MODEL,
  }

  static contextTypes = {
    ...themeContextType,
  }


  /** Initial state */
  state = {
    // Count of bar items shown (at start, we display all items once to get their width)
    shownBarItemsCount: Number.MAX_SAFE_INTEGER,
    // should show MORE button (shown by default to get its initial width)
    showMoreButton: true,
  }

  componentWillMount() {
    // we initialize here transient graphics data that should not provoke redrawing
    this.layoutWidth = 0 // This layout element available width
    this.barItemsWidths = {} // bar items width (key is the item key)
    this.moreButtonWidth = 0 // more button width
  }

  /**
   * One of the layout items size changed: update the bar items width then re-layout
   * @param {string} itemKey
   * @param {number} newWidth new item width
   */
  onBarItemResized = (itemKey, newWidth) => {
    this.barItemsWidths = {
      ...this.barItemsWidths,
      [itemKey]: newWidth,
    }
    this.onLayoutUpdate(this.props.navigationModel)
  }

  /**
   * More button size changed,
   * @param {number} newWidth new button width
   */
  onMoreButtonResized = (newWidth) => {
    this.moreButtonWidth = newWidth
    this.onLayoutUpdate(this.props.navigationModel)
  }

  /**
   * Called when component is resized, to force the inner table implementation at same width
   * @param {width: number} dimensions
   */
  onComponentResized = ({ width }) => {
    this.layoutWidth = width
    this.onLayoutUpdate(this.props.navigationModel)
  }

  /**
   * On layout update
   * @param [NavigationItem] navigationModel navigation model
   */
  onLayoutUpdate = (navigationModel) => {
    const totalItemsCount = navigationModel.length

    // 1 - consume this width to show more possible elements (never less than one)
    let shownBarItemsCount
    let consumedWidth = 0
    for (shownBarItemsCount = 0; shownBarItemsCount < totalItemsCount; shownBarItemsCount += 1) {
      // recover corresponding model
      const currentItemModel = navigationModel[shownBarItemsCount]
      // compute next width
      const nextWidth = this.barItemsWidths[currentItemModel.key] + consumedWidth
      if (nextWidth > this.layoutWidth) {
        // this item doesn't fit the layout
        break
      }
      consumedWidth = nextWidth
    }
    // 2 - insert the more button in this layout if required
    const showMoreButton = shownBarItemsCount < totalItemsCount
    if (showMoreButton) {
      // algorithm: we remove items previously considered in width until it remains enough space to set the more button
      // in layout. If there is not enough space, only the more button will be displayed (we cannot hide it)
      let remainingWidth = this.layoutWidth - consumedWidth
      for (; shownBarItemsCount > 0 && remainingWidth < this.moreButtonWidth; shownBarItemsCount -= 1) {
        const itemToRemove = navigationModel[shownBarItemsCount - 1]
        remainingWidth += this.barItemsWidths[itemToRemove.key]
      }
    }
    const nextState = {
      shownBarItemsCount,
      showMoreButton,
    }

    if (!isEqual(this.state, nextState)) {
      this.setState(nextState)
    }
  }


  render() {
    const { navigationModel } = this.props
    const { shownBarItemsCount, showMoreButton } = this.state
    const { moduleTheme: { user: { navigationGroup } } } = this.context
    return (
      <Measure onMeasure={this.onComponentResized} >
        <div style={navigationGroup}>
          {
            navigationModel.map((item, index) => (
              <MainBarNavigationItem
                key={item.key}
                item={item}
                displayed={index < shownBarItemsCount}
                onItemResized={this.onBarItemResized}
              />
            ))
          }
          <MoreNavigationButton
            visible={showMoreButton}
            onResized={this.onMoreButtonResized}
            navigationModel={navigationModel}
            firstMenuElementIndex={shownBarItemsCount}
          />
        </div>
      </Measure>
    )
  }
}
export default NavigationLayoutComponent
