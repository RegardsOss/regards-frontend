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
 */
import isNil from 'lodash/isNil'
import { FormattedMessage } from 'react-intl'
import { Card, CardTitle, CardMedia } from 'material-ui/Card'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { storage } from '@regardsoss/units'
import PhysicalStorageChartComponent, { PhysicalStorageShape } from './PhysicalStorageChartComponent'

/**
 * Displays storage plugin capacity information
 */
class StoragePluginComponent extends React.Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    // storage info, as reshaped by parent container and expected by sub components
    storageInfo: PropTypes.arrayOf(PhysicalStorageShape).isRequired,
    // selected storage index (null / undefined if none)
    selectedStorageIndex: PropTypes.number,
    // callback when a row is selected. (int) => ()
    onStorageRowSelected: PropTypes.func.isRequired,
  }

  /** I18N injection & themes */
  static contextTypes = {
    ...themeContextType, ...i18nContextType,
  }

  /** Number format options */
  static NUMBER_FORMAT_OPTIONS = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }

  /**
   * User callback: on plugin table row selection
   * @param {[number]} rows selectedRows index array (here, only one)
   */
  onRowSelection = ([firstRowIndex]) => this.props.onStorageRowSelected(firstRowIndex)

  render() {
    const {
      label, description, storageInfo, selectedStorageIndex,
    } = this.props
    const { moduleTheme: { user: { pluginCard } } } = this.context
    const selectedStorage = !isNil(selectedStorageIndex) ? storageInfo[selectedStorageIndex] : null

    return (
      <Card className={pluginCard.classes} style={pluginCard.root} containerStyle={pluginCard.contentStyle}>
        <CardTitle
          title={label}
          subtitle={description}
        />
        <CardMedia style={pluginCard.media.rootStyle} mediaStyle={pluginCard.media.contentStyle} >
          <div style={pluginCard.media.table.rootStyle}>
            <Table onRowSelection={this.onRowSelection}>
              <TableHeader
                displaySelectAll={false}
                adjustForCheckbox={false}
              >
                {/* style={pluginCard.media.table.header} */}
                <TableRow style={pluginCard.media.table.headerRow}>
                  <TableHeaderColumn style={pluginCard.media.table.cell}>
                    <FormattedMessage id="archival.storage.capacity.monitoring.table.device.id" />
                  </TableHeaderColumn>
                  <TableHeaderColumn style={pluginCard.media.table.cell}>
                    <FormattedMessage id="archival.storage.capacity.monitoring.table.total.size" />
                  </TableHeaderColumn>
                  <TableHeaderColumn style={pluginCard.media.table.cell}>
                    <FormattedMessage id="archival.storage.capacity.monitoring.table.used.size" />
                  </TableHeaderColumn>
                  <TableHeaderColumn style={pluginCard.media.table.cell}>
                    <FormattedMessage id="archival.storage.capacity.monitoring.table.unused.size" />
                  </TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody showRowHover displayRowCheckbox={false} deselectOnClickaway={false}>
                {
                  storageInfo.map(({
 storagePhysicalId, totalSize, usedSize, unusedSize,
}, index) =>
                    (<TableRow style={pluginCard.media.table.row} key={storagePhysicalId} selected={index === selectedStorageIndex}>
                      <TableRowColumn title={storagePhysicalId} style={pluginCard.media.table.cell}>
                        {storagePhysicalId}
                      </TableRowColumn>
                      <TableRowColumn style={pluginCard.media.table.cell}>
                        <storage.FormattedStorageCapacity capacity={totalSize} />
                      </TableRowColumn>
                      <TableRowColumn style={pluginCard.media.table.cell}>
                        <storage.FormattedStorageCapacity capacity={usedSize} />
                      </TableRowColumn>
                      <TableRowColumn style={pluginCard.media.table.cell}>
                        <storage.FormattedStorageCapacity capacity={unusedSize} />
                      </TableRowColumn>
                    </TableRow>))}
              </TableBody>
            </Table>
          </div>
          <PhysicalStorageChartComponent physicalStorage={selectedStorage} />
        </CardMedia>
      </Card>
    )
  }
}

export default StoragePluginComponent
