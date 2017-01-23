/**
 * LICENSE_PLACEHOLDER
 */
import { FormattedMessage } from 'react-intl'
import { Card, CardTitle, CardMedia } from 'material-ui/Card'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import ChartAdapter from '@regardsoss/charts'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { StorageCapacityShape } from '../helper/StorageCapacity'
import { UnitScaleShape, bytesScale } from '../helper/StorageUnit'

/**
 * Displays storage plugin capacity information
 */
class StoragePluginCapacityComponent extends React.Component {

  static propTypes = {
    label: React.PropTypes.string.isRequired,
    description: React.PropTypes.string.isRequired, // null or capacity
    scale: UnitScaleShape,
    totalSize: StorageCapacityShape, // null or capacity
    usedSize: StorageCapacityShape,
  }

  static defaultProps = {
    scale: bytesScale,
  }

  /** I18N injection & themes */
  static contextTypes = {
    ...themeContextType, ...i18nContextType,
  }

  /**
   * Builds I18N label for capacity as parameter
   */
  buildI18NCapacity = (capacity) => {
    if (!capacity) {
      // unknown capacity
      return this.context.intl.formatMessage({ id: 'archival.storage.capacity.monitoring.capacity.unknown' })
    }
    // recover current scale unit
    const { scale } = this.props
    // pick up best matching unit in scale
    const capacityToShow = capacity.scaleAndConvert(scale)
    const unitLabel = this.buildI18NUnit(capacityToShow.unit)
    const valueLabel = this.formatNumber(capacityToShow.value)
    return this.context.intl.formatMessage({
      id: 'archival.storage.capacity.monitoring.capacity',
    }, {
      valueLabel,
      unitLabel,
    })
  }

  buildI18NUnit = unit => this.context.intl.formatMessage({
    id: `archival.storage.capacity.monitoring.unit.${unit.symbol.toLowerCase()}`,
  })

  /** Formats a number on 2 digits (presentation need) */
  formatNumber = number => (Math.round(number * 100) / 100).toString()

  /**
   * Builds Pie data model for a plugin sizes
   * @param totalSize -
   * @param usedSize -
   * @returns * pie data model or null if pie should not be shown
   */
  buildPieData = (totalSize, usedSize) => {
    // compute percents used / unused
    let labels
    let data
    let colors
    const { moduleTheme, intl: { formatMessage } } = this.context
    if (usedSize && totalSize) {
      // A - show both used and used size on storage
      labels = [formatMessage({
        id: 'archival.storage.capacity.monitoring.chart.used.size',
      }), formatMessage({
        id: 'archival.storage.capacity.monitoring.chart.unused.size',
      })]
      // unused size computation, as percents
      const totalPercent = 100
      const usedPercentValue = this.formatNumber(usedSize.multiply(totalPercent).divide(totalSize).value)
      data = [usedPercentValue, totalPercent - usedPercentValue]
      colors = [moduleTheme.chart.curves.usedSizeColor, moduleTheme.chart.curves.unusedSizeColor]
    } else if (totalSize) {
      // B - show total size as used size is not available
      labels = [formatMessage({
        id: 'archival.storage.capacity.monitoring.chart.total.size',
      }, {
        unitLabel: this.buildI18NUnit(totalSize.unit),
      })]
      data = [this.formatNumber(totalSize.value)]
      colors = [moduleTheme.chart.curves.unusedSizeColor]
    } else {
      // C unknown size, keep graphic but don't show anything except a grey circle
      labels = [formatMessage({ id: 'archival.storage.capacity.monitoring.chart.unknown.size' })]
      data = [1]
      colors = [moduleTheme.chart.curves.unusedSizeColor]
    }

    return {
      labels,
      datasets: [{
        data,
        backgroundColor: colors,
        hoverColor: colors,
      }],
    }
  }

  render() {
    const { label, description, totalSize, usedSize } = this.props
    const { moduleTheme, muiTheme } = this.context
    const firstCellStyles = Object.assign({}, moduleTheme.table.firstColumn, moduleTheme.table.row)
    return (
      <Card className={moduleTheme.card.classes} style={moduleTheme.card.root}>
        <CardTitle
          title={label}
          subtitle={description}
        />
        <CardMedia style={moduleTheme.card.media}>
          <div>
            <Table>
              <TableHeader
                displaySelectAll={false}
                adjustForCheckbox={false}
                style={moduleTheme.table.header}
              >
                <TableRow style={Object.assign({}, moduleTheme.table.header, moduleTheme.table.row)}>
                  <TableHeaderColumn style={firstCellStyles}>
                    <FormattedMessage id="archival.storage.capacity.monitoring.table.total.size" />
                  </TableHeaderColumn>
                  <TableHeaderColumn style={moduleTheme.table.row}>
                    <FormattedMessage id="archival.storage.capacity.monitoring.table.used.size" />
                  </TableHeaderColumn>
                  <TableHeaderColumn style={moduleTheme.table.row}>
                    <FormattedMessage id="archival.storage.capacity.monitoring.table.unused.size" />
                  </TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false} style={moduleTheme.table.body}>
                <TableRow style={firstCellStyles}>
                  <TableRowColumn style={firstCellStyles}>
                    { this.buildI18NCapacity(totalSize)}
                  </TableRowColumn>
                  <TableRowColumn style={moduleTheme.table.row}>
                    { this.buildI18NCapacity(usedSize)}
                  </TableRowColumn>
                  <TableRowColumn style={moduleTheme.table.row} >
                    { this.buildI18NCapacity(usedSize && totalSize ? totalSize.subtract(usedSize) : null)}
                  </TableRowColumn>
                </TableRow>
              </TableBody>
            </Table>
            <div style={moduleTheme.chart.root}>
              <ChartAdapter
                ChartComponent="Pie"
                data={this.buildPieData(totalSize, usedSize)}
                options={{
                  legend: {
                    position: moduleTheme.chart.legend.position,
                    labels: {
                      fontColor: muiTheme.card.subtitleColor,
                    },
                  },
                }}
              />
            </div>
          </div>
        </CardMedia>
      </Card>
    )
  }
}

export default StoragePluginCapacityComponent
