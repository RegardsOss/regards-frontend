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
import Subheader from 'material-ui/Subheader'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { storage } from '@regardsoss/units'
import { ParsedStoragePluginShape } from '../../model/ParsedStoragePluginShape'

/**
 * Displays chart legend to add total size and icons in an unified screen location
 * @author Raphaël Mechali
 */
export class StoragePluginLegendComponent extends React.Component {
  static propTypes = {
    storagePlugin: ParsedStoragePluginShape, // not required, selection may be empty
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /** Legend number format options */
  static NUMBER_FORMAT_OPTIONS = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }

  /**
   * Renders a legend item
   * @param {string} label legend item label
   * @param {storage.Capacity} size total item size (undefined allowed if unknwon)
   * @param {string} mainColor main color, if not provided, the item will only have the outer circle
   * drawn in text color (total size or unknown size)
   * @param {number} percent of this part on the chart (undefined allowed if unknwon)
   * @return {React.Component} render component
   */
  renderLegendItem = (labelKey, size, mainColor = null, percent = null) => {
    const {
      intl: { formatMessage, formatNumber },
      moduleTheme: {
        user: {
          pluginCard: {
            media: {
              legend: {
                itemRootContainerStyle,
                legendIcon,
                itemLabelStyle,
              },
            },
          },
        },
      },
    } = this.context
    const label = formatMessage({ id: labelKey })
    const capacity = storage.formatStorageCapacity(formatMessage, formatNumber, size)
    let message
    if (isNumber(percent)) { // label for knwon percent
      const percentLabel = formatNumber(percent, StoragePluginLegendComponent.NUMBER_FORMAT_OPTIONS)
      message = formatMessage({ id: 'archival.storage.capacity.monitoring.size.with.percent' }, { label, capacity, percentLabel })
    } else { // no label
      message = formatMessage({ id: 'archival.storage.capacity.monitoring.size.without.percent' }, { label, capacity })
    }

    return (
      <div key={labelKey} style={itemRootContainerStyle} >
        {
          mainColor ?
            <svg style={legendIcon.style} xmlns="http://www.w3.org/2000/svg">
              <circle
                cx={legendIcon.svgData.center}
                cy={legendIcon.svgData.center}
                r={legendIcon.svgData.radius}
                fill={mainColor}
              />
            </svg> : null
        }
        <Subheader style={itemLabelStyle}>
          {message}
        </Subheader>
      </div>)
  }

  render() {
    const {
      moduleTheme: {
        user: {
          pluginCard: {
            media: {
              chart: { curves },
              legend: { rootContainerStyle, firstColumnContainerStyle, secondColumnContainerStyle },
            },
          },
        },
      },
    } = this.context
    const {
      storagePlugin: {
        totalSize, usedSize, unusedSize, usedPercent, unusedPercent,
      },
    } = this.props

    return (
      <div style={rootContainerStyle} >
        {/* used and unused sizes column */}
        <div style={firstColumnContainerStyle}>
          {
            usedSize ?
              [ // used size is defined, we have here all chart parts rendered
                this.renderLegendItem('archival.storage.capacity.monitoring.chart.used.label', usedSize, curves.usedSizeColor, usedPercent),
                this.renderLegendItem('archival.storage.capacity.monitoring.chart.free.label', unusedSize, curves.unusedSizeColor, unusedPercent),
              ] : null
          }
        </div>
        {/* total size column */}
        <div style={secondColumnContainerStyle}>
          {this.renderLegendItem('archival.storage.capacity.monitoring.chart.total.label', totalSize)}
        </div>
      </div>
    )
  }
}

// add the i18n context from scales to this component to use capacity formatter
export default withI18n(storage.messages, true)(StoragePluginLegendComponent)
