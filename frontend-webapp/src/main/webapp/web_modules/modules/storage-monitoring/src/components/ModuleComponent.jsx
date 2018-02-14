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
import { AccessShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { storage } from '@regardsoss/units'
import { DynamicModule } from '@regardsoss/components'
import { dependencies } from '../user-dependencies'
import StorageMonitoringContainer from '../containers/StorageMonitoringContainer'
import ScaleSelectorComponent from './ScaleSelectorComponent'


/**
 * Displays module in card, protects it from being shown when the user has not enough rights
 * @author Raphaël Mechali
 */
class ModuleComponent extends React.Component {
  static propTypes = {
    // default modules properties
    ...AccessShapes.runtimeDispayModuleFields,
    // scale state management
    scale: storage.StorageUnitScaleShape.isRequired,
    onUnitScaleChanged: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /**
   * Renders module options
   * @param scale current scale
   * @param onUnitScaleChanged unit scale changed callback
   * @return {[React.element]} module options
   */
  renderOptions = (scale, onUnitScaleChanged) =>
    [<ScaleSelectorComponent key="selector" scale={scale} onUnitScaleChanged={onUnitScaleChanged} />]

  render() {
    const { scale, onUnitScaleChanged, ...moduleProperties } = this.props
    return (
      <DynamicModule
        {...moduleProperties}
        options={this.renderOptions(scale, onUnitScaleChanged)}
        requiredDependencies={dependencies}
      >
        <StorageMonitoringContainer scale={scale} />
      </DynamicModule>
    )
  }
}
export default ModuleComponent
