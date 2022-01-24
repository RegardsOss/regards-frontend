/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { StorageShapes } from '@regardsoss/shape'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { storage } from '@regardsoss/units'

/**
 * Show storage size used
 * @author Kévin Picart
 */
class StorageLocationSizeRenderer extends React.Component {
  static propTypes = {
    entity: StorageShapes.StorageLocation,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const { entity } = this.props
    const { intl: { formatMessage, formatNumber }, moduleTheme: { storageTable: { percentageColumn: { percentage, container, size } } } } = this.context
    let color

    const storageUnit = storage.StorageUnitScale.getMatchingUnit('ko')
    const allocatedSize = entity.content.configuration ? entity.content.configuration.allocatedSizeInKo : null
    let allocatedSizeUnitConverted = null
    if (allocatedSize) {
      const valueWithUnit = new storage.StorageCapacity(allocatedSize, storageUnit).scaleAndConvert(storageUnit.scale)
      allocatedSizeUnitConverted = storage.formatStorageCapacity(formatMessage, formatNumber, valueWithUnit)
    }
    const usedSize = entity.content.totalStoredFilesSizeKo
    const valueWithUnitUsed = new storage.StorageCapacity(usedSize, storageUnit).scaleAndConvert(storageUnit.scale)
    const usedSizeUnitConverted = storage.formatStorageCapacity(formatMessage, formatNumber, valueWithUnitUsed)
    let width = entity.content.totalStoredFilesSizeKo * 100 / allocatedSize
    const realWidth = width.toFixed(2)
    if (usedSize === 0) {
      color = { backgroundColor: 'rgb(255, 255, 255)' }
    } else if (width < 80) {
      color = { backgroundColor: 'rgb(33, 150, 243)' }
    } else {
      color = { backgroundColor: 'rgb(243, 33, 33)' }
    }
    if (width < 3) { width = 3 }
    const percentageComputedSize = {
      ...percentage,
      ...color,
      width: `${width}%`,
    }

    if (allocatedSizeUnitConverted) {
      return (
        <div style={container} title={`${realWidth}%`}>
          <div style={percentageComputedSize} />
          <div style={size}>{`${usedSizeUnitConverted} / ${allocatedSizeUnitConverted}`}</div>
        </div>
      )
    }
    return <div style={container} title={`${formatMessage({ id: 'storage.location.list.size.no.quota' })}`}>
      <div style={size}>{`${usedSizeUnitConverted}`}</div>
    </div>
  }
}

export default withI18n(storage.messages, true)(StorageLocationSizeRenderer)
