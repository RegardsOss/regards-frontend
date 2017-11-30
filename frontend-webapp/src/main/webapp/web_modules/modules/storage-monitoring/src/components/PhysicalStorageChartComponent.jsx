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
import { CommonShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { storage } from '@regardsoss/units'
import { ChartAdapter } from '@regardsoss/adapters'

export const PhysicalStorageShape = PropTypes.shape({
  // current display storage physical ID
  storagePhysicalId: PropTypes.string.isRequired,
  // total and used size  must be expressed in the right scale
  totalSize: PropTypes.instanceOf(storage.StorageCapacity),
  usedSize: PropTypes.instanceOf(storage.StorageCapacity),
  usedPercent: CommonShapes.Percent,
  unusedPercent: CommonShapes.Percent,
})

/**
* Component to display a physical storage state as chart. Note: it is independent of scale and should receive
* the total and used size expressed in the right scale (optimization to avoid multiple conversion accross the sub components)
* @author Raphaël Mechali
*/
class PhysicalStorageChartComponent extends React.Component {
  static propTypes = {
    physicalStorage: PhysicalStorageShape, // not required, selection may be empty
  }

  /** Chart number format options */
  static NUMBER_FORMAT_OPTIONS = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }


  /**
   * Builds Pie data model for a plugin sizes
   * @param {storage.StorageCapacity} totalSize total size
   * @param usedPercent used size in percents
   * @param unusedPercent unused size in percents
   * @returns pie data model or null if pie should not be shown
   */
  buildPieData = (totalSize, usedPercent, unusedPercent) => {
    // compute percents used / unused
    let labels
    let data
    let colors
    const { moduleTheme: { user: { pluginCard: { media: { chart: { curves } } } } }, intl: { formatMessage } } = this.context
    if (usedPercent && unusedPercent) {
      // A - show both used and used size on storage
      labels = [formatMessage({
        id: 'archival.storage.capacity.monitoring.chart.used.size',
      }), formatMessage({
        id: 'archival.storage.capacity.monitoring.chart.unused.size',
      })]
      // unused size computation, as percents
      data = [usedPercent, unusedPercent]
      colors = [curves.usedSizeColor, curves.unusedSizeColor]
    } else if (totalSize) {
      // B - show total size as used size is not available
      labels = [formatMessage(
        { id: 'archival.storage.capacity.monitoring.chart.total.size' },
        { unitLabel: this.context.intl.formatMessage({ id: totalSize.unit.messageKey }) },
      )]
      data = [totalSize.value]
      colors = [curves.unusedSizeColor]
    } else {
      // C unknown size, keep graphic but don't show anything except a grey circle
      labels = [formatMessage({ id: 'archival.storage.capacity.monitoring.chart.unknown.size' })]
      data = [1]
      colors = [curves.unusedSizeColor]
    }

    return {
      labels,
      datasets: [{
        data,
        backgroundColor: colors,
        hoverColor: colors,
        borderColor: curves.borderColor,
        borderWidth: curves.borderWidth,
      }],
    }
  }

  render() {
    const physicalStorage = this.props.physicalStorage || {}
    const { moduleTheme: { user: { pluginCard: { media: { chart } } } } } = this.context

    // Sadly, we are obliged here to render the pie data synchronously as we need the intl / module theme contexts
    const chartData = this.buildPieData(physicalStorage.totalSize, physicalStorage.usedPercent, physicalStorage.unusedPercent)

    return (
      <div style={chart.root} >
        <ChartAdapter
          ChartComponent="Pie"
          data={chartData}
          options={chart.options}
        />
      </div>
    )
  }
}
export default PhysicalStorageChartComponent
