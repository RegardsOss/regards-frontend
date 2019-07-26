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
import { UIDomain } from '@regardsoss/domain'
import { AccessShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { modulesManager } from '@regardsoss/modules'
import { DefaultModuleTitleComponent } from '@regardsoss/components'
import TabComponent from './TabComponent'

/**
 * Tabs component: tabs interactor (when more than one tab is available)
 * @author Raphaël Mechali
 */
class TitleAndTabsComponent extends React.Component {
  static propTypes = {
    page: AccessShapes.ModulePage,
    localizedTitle: PropTypes.objectOf(PropTypes.string).isRequired,
    // list of visible tabs: contains at least results tab
    tabs: PropTypes.arrayOf(PropTypes.shape({
      tabType: PropTypes.oneOf(UIDomain.RESULTS_TABS).isRequired,
      tabName: PropTypes.string, // specific parameter for tabs with name
      selected: PropTypes.bool.isRequired,
      closable: PropTypes.bool.isRequired,
    })).isRequired,
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
      page, localizedTitle, tabs, onTabSelected, onTabClosed,
    } = this.props
    const { moduleTheme: { user: { titleBar: { container, title, tabsContainer } } } } = this.context
    return ( // TODO paused here: externalise the styles and add a separator
      <div style={container}>
        {/* 1. Module title */}
        <div style={title}>
          <DefaultModuleTitleComponent
            type={modulesManager.AllDynamicModuleTypes.SEARCH_RESULTS}
            localizedTitle={localizedTitle}
            page={page}
          />
        </div>
        {/* 2. tabs (center aligned) */ }
        <div style={tabsContainer}>
          { /** Show tabs only when more than 1 */
           tabs.length > 1
             ? tabs.map(({
               tabType, tabName, selected, closable,
             }) => <TabComponent
               key={tabType}
               tabType={tabType}
               tabName={tabName}
               selected={selected}
               closable={closable}
               onTabSelected={onTabSelected}
               onTabClosed={onTabClosed}
             />)
             : null // hide when only one tab
        }
        </div>
        {/* Right spacer */}
        <div />
      </div>
    )
  }
}
export default TitleAndTabsComponent
