/**
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { withModuleStyle } from '@regardsoss/theme'
import { StorageShapes } from '@regardsoss/shape'
import { storage } from '@regardsoss/units'
import StoragePluginComponent from '../../components/user/StoragePluginComponent'

import styles from '../../styles'

/**
* Storage plugin container
* @author Raphaël Mechali
*/
export class StoragePluginContainer extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    scale: storage.StorageUnitScaleShape.isRequired, // used only in onPropertiesChanged
    // eslint-disable-next-line react/no-unused-prop-types
    plugin: StorageShapes.StorageMonitoring.isRequired, // used only in onPropertiesChanged
  }

  /**
   * Parses text capacity as parameter then converts it on scale as parameter
   * @param {string} textCapacity text for capacity
   * @param {StorageUnitScale} scale scale family (bits, bytes...)
   * @return {storage.StorageCapacity} parsed capacity or null
   */
  static parseAndConvert(textCapacity = '', scale) {
    const parsed = storage.StorageCapacity.fromValue(textCapacity)
    return parsed ? parsed.scaleAndConvert(scale) : null
  }

  /** Percent max count... */
  static TOTAL_PERCENT = 100

  /** Precision digits in percents computing */
  static PRECISION_DIGITS = 2

  /**
   * Computes the sub size as percent of the total size, rounds to PRECISION_DIGITS
   * @param {storage.StorageCapacity} totalSize total size
   * @param {storage.StorageCapacity} subSize sub size
   * @return {storage.StorageCapacity} percents of sub size on total size
   */
  static computePercents(totalSize, subSize) {
    const rawPercent = subSize.multiply(StoragePluginContainer.TOTAL_PERCENT).divide(totalSize).value
    const precisionFactor = 10 ** StoragePluginContainer.PRECISION_DIGITS
    return Math.round(rawPercent * precisionFactor) / precisionFactor
  }


  /**
   * Lifecycle method: component will mount. Used here to pre-compute sub component properties (stabilization of render cycles)
   */
  componentWillMount = () => this.onPropertiesChanged(this.props)

  /**
   * Lifecycle method: component will receive props. Used here to pre-compute sub component properties (stabilization of render cycles)
   */
  componentWillReceiveProps = nextProps => this.onPropertiesChanged(nextProps)

  /**
   * On properties changed: properties change detected, used here to recompute and 'stabilize' the storage systems array info (parse data,
   * pre-compute occupancy rates and so on...)
   * @param newProps new props
   */
  onPropertiesChanged = ({ scale, plugin }) => {
    const {
      content: {
        confId,
        label,
        description,
        totalSize: textTotalSize,
        usedSize: textUsedSize,
      },
    } = plugin
    const totalSize = StoragePluginContainer.parseAndConvert(textTotalSize, scale)
    const usedSize = StoragePluginContainer.parseAndConvert(textUsedSize, scale)
    let unusedSize = null
    let usedPercent = null
    let unusedPercent = null

    if (totalSize && usedSize) {
      unusedSize = totalSize.subtract(usedSize)
      usedPercent = StoragePluginContainer.computePercents(totalSize, usedSize)
      unusedPercent = StoragePluginContainer.TOTAL_PERCENT - usedPercent
    }
    this.setState({
      parsedStoragePlugin: {
        confId,
        label,
        description,
        totalSize,
        usedSize,
        unusedSize,
        usedPercent,
        unusedPercent,
      },
    })
  }

  render() {
    const { parsedStoragePlugin } = this.state
    return (
      <StoragePluginComponent storagePlugin={parsedStoragePlugin} />
    )
  }
}
export default withModuleStyle(styles)(StoragePluginContainer)
