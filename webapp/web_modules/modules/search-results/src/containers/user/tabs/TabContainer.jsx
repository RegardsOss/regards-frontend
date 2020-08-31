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
import { AccessProjectClient } from '@regardsoss/client'
import { UIShapes } from '@regardsoss/shape'
import { connect } from '@regardsoss/redux'
import TabComponent, { TabData } from '../../../components/user/tabs/TabComponent'

/** Default UI settings selectors instance, retrieving common user app settings data */
const uiSettingsSelectors = AccessProjectClient.getUISettingsSelectors()

/**
 * Single tab container (provides UI settings as required by tab component)
 * @author Raphaël Mechali
 */
export class TabContainer extends React.Component {
  static propTypes = {
    tab: TabData.isRequired,
    // selection control callback: (tabType: string) => ()
    onTabSelected: PropTypes.func.isRequired,
    // close control callback: (tabType: string) => ()
    onTabClosed: PropTypes.func.isRequired,
    // from mapStateToProps
    settings: UIShapes.UISettings.isRequired,
  }

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      settings: uiSettingsSelectors.getSettings(state),
    }
  }

  render() {
    const {
      tab, onTabSelected, onTabClosed, settings,
    } = this.props
    return (
      <TabComponent
        tab={tab}
        onTabSelected={onTabSelected}
        onTabClosed={onTabClosed}
        settings={settings}
      />
    )
  }
}
export default connect(TabContainer.mapStateToProps)(TabContainer)
