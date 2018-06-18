/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import isNumber from 'lodash/isNumber'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { ChartAdapter } from '@regardsoss/adapters'
import { ParsedStoragePluginShape } from '../../model/ParsedStoragePluginShape'

/**
* Component to display a physical storage state as chart. Note: it is independent of scale and should receive
* the total and used size expressed in the right scale (optimization to avoid multiple conversion accross the sub components)
* @author Raphaël Mechali
*/
class StoragePluginChartComponent extends React.Component {
  static propTypes = {
    storagePlugin: ParsedStoragePluginShape, // not required, selection may be empty
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
    let data
    let colors
    const { moduleTheme: { user: { pluginCard: { media: { chart: { curves } } } } } } = this.context
    if (isNumber(usedPercent) && isNumber(unusedPercent)) {
      // unused size computation, as percents
      data = [usedPercent, unusedPercent]
      colors = [curves.usedSizeColor, curves.unusedSizeColor]
    } else if (isNumber(totalSize)) {
      data = [totalSize.value]
      colors = [curves.unusedSizeColor]
    } else {
      data = [1]
      colors = [curves.unusedSizeColor]
    }

    return {
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
    const { storagePlugin } = this.props
    const { moduleTheme: { user: { pluginCard: { media: { chart } } } } } = this.context

    // Sadly, we are obliged here to render the pie data synchronously as we need the intl / module theme contexts
    const chartData = this.buildPieData(storagePlugin.totalSize, storagePlugin.usedPercent, storagePlugin.unusedPercent)

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
export default StoragePluginChartComponent
