/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { AccessShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { modulesManager } from '@regardsoss/modules'
import { DefaultModuleTitleComponent } from '@regardsoss/components'
import TabContainer from '../../../containers/user/tabs/TabContainer'
import { TabData } from './TabComponent'

/**
 * Tabs component: tabs interactor (when more than one tab is available)
 * @author Raphaël Mechali
 */
class TitleAndTabsComponent extends React.Component {
  static propTypes = {
    description: PropTypes.string,
    page: AccessShapes.ModulePage,
    // list of visible tabs: contains at least results tab
    tabs: PropTypes.arrayOf(TabData).isRequired,
    // selection control callback: (tabType: string) => ()
    onTabSelected: PropTypes.func.isRequired,
    // close control callback: (tabType: string) => ()
    onTabClosed: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const {
      description, page, tabs, onTabSelected, onTabClosed,
    } = this.props
    const { moduleTheme: { user: { titleBar: { container, title, tabsContainer } } } } = this.context
    return (
      <div style={container}>
        {/* 1. Module title */}
        <div style={title}>
          <DefaultModuleTitleComponent
            type={modulesManager.AllDynamicModuleTypes.SEARCH_RESULTS}
            description={description}
            page={page}
          />
        </div>
        {/* 2. tabs (center aligned) */ }
        <div style={tabsContainer}>
          { /** Show tabs only when more than 1 */
             tabs.map((tab) => <TabContainer
               key={tab.tabType}
               tab={tab}
               onTabSelected={onTabSelected}
               onTabClosed={onTabClosed}
             />)
        }
        </div>
        {/* Right spacer */}
        <div />
      </div>
    )
  }
}
export default TitleAndTabsComponent
