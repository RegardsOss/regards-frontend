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
import { HateoasKeys } from '@regardsoss/display-control'
import { HateoasToggle } from '@regardsoss/components'

/**
 * Toggle to enable a configuration for all datasets / on dataset in list
 * @author Raphaël Mechali
 */
class EnableConfigurationOnAllComponent extends React.Component {
  static propTypes = {
    uiPluginConfiguration: AccessShapes.UIPluginConf.isRequired,
    onToggleEnabledForAll: PropTypes.func.isRequired,
  }

  /**
   * User callback: toggles configuration enabled state
   */
  onToggleEnabledForAll = () => {
    const { uiPluginConfiguration, onToggleEnabledForAll } = this.props
    onToggleEnabledForAll(uiPluginConfiguration.content)
  }

  render() {
    const { uiPluginConfiguration } = this.props
    return (
      <HateoasToggle
        entityLinks={uiPluginConfiguration.links}
        hateoasKey={HateoasKeys.UPDATE}
        toggled={uiPluginConfiguration.content.linkedToAllEntities}
        disabled={!uiPluginConfiguration.content.active}
        onToggle={this.onToggleEnabledForAll}
      />
    )
  }
}
export default EnableConfigurationOnAllComponent
