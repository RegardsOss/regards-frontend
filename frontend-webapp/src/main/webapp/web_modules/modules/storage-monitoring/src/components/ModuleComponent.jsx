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
import ModuleIcon from 'material-ui/svg-icons/device/data-usage'
import { i18nContextType } from '@regardsoss/i18n'
import { storage } from '@regardsoss/units'
import { DynamicModule, ModuleTitle } from '@regardsoss/components'
import { dependencies } from '../user-dependencies'
import StorageMonitoringContainer from '../containers/StorageMonitoringContainer'
import ScaleSelectorComponent from './ScaleSelectorComponent'


/**
 * Displays module in card, protects it from being shown when the user has not enough rights
 * @author Raphaël Mechali
 */
class ModuleComponent extends React.Component {
  static propTypes = {
    // expanded state management
    expandable: PropTypes.bool.isRequired,
    expanded: PropTypes.bool.isRequired,
    onExpandChange: PropTypes.func.isRequired,
    // scale state management
    scale: storage.StorageUnitScaleShape.isRequired,
    onUnitScaleChanged: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /**
 * @return {[React.element]} module options
 */
  renderOptions = () => {
    const { scale, onUnitScaleChanged } = this.props
    return [<ScaleSelectorComponent key="selector" scale={scale} onUnitScaleChanged={onUnitScaleChanged} />]
  }

  render() {
    const {
      expandable, expanded, scale, onExpandChange,
    } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <DynamicModule
        title={<ModuleTitle
          IconConstructor={ModuleIcon}
          text={formatMessage({ id: 'archival.storage.capacity.monitoring.title' })}
        />}
        expandable={expandable}
        expanded={expanded}
        onExpandChange={onExpandChange}
        options={this.renderOptions()}
        requiredDependencies={dependencies}
      >
        <StorageMonitoringContainer scale={scale} />
      </DynamicModule>
    )
  }
}
export default ModuleComponent
