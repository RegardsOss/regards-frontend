/**
 * LICENSE_PLACEHOLDER
 **/
import React, { Component, PropTypes } from 'react'
import { FormattedMessage } from 'react-intl'
import Paper from 'material-ui/Paper'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { Pie } from 'react-chartjs-2'
import { Card, CardTitle, CardMedia } from 'material-ui/Card'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import PluginShape from '@regardsoss/model/src/archival-storage/StorageMonitoringPlugin'
import { bytesScale, allUnitScales } from '../helper/StorageUnit'
import { capacityFromValue } from '../helper/StorageCapacity'

class StorageMonitoring extends Component {

  static propTypes = {
    onClose: PropTypes.func.isRequired,
    initScale: PropTypes.string.isRequired,
    storagePluginsData: PropTypes.arrayOf(PluginShape).isRequired,
  }

  static defaultProps = {
    initScale: bytesScale,
    storagePluginsData: [],
  }

  /** I18N injection */
  static contextTypes = {
    ...themeContextType, ...i18nContextType,
  }

  componentWillMount() {
    const { initScale } = this.props
    // initialize the state, through unit selection converter
    this.onUnitScaleSelected(initScale)
  }

  onUnitScaleSelected(newScale) {
    const currentPlugins = this.state && this.state.plugins ? // initial data input parsing (lazy)
      this.state.plugins : this.parsePluginsInput(this.props.storagePluginsData)
    this.setState({
      currentScale: newScale,
      plugins: this.toNewScale(currentPlugins, newScale),
    })
  }

  parsePluginsInput = pluginsInput => pluginsInput.map(({ label, description, totalSize, usedSize }) => ({
    label,
    description,
    totalSize: capacityFromValue(totalSize),
    usedSize: capacityFromValue(usedSize),
  }))

  /**
   * Converts known plugins sizes using a new scale
   * @param plugins plugins
   * @param newScale new storage capacity scale
   */
  toNewScale = (plugins, newScale) => plugins.map(({ label, description, totalSize, usedSize }) => ({
    label,
    description,
    totalSize: totalSize ? totalSize.scaleAndConvert(newScale) : null,
    usedSize: usedSize ? usedSize.scaleAndConvert(newScale) : null,
  }))

  /**
   * Builds I18N label for capacity as parameter
   */
  buildI18NCapacity = (capacity) => {
    if (!capacity) {
      // unknown capacity
      return this.context.intl.formatMessage({ id: 'archival.storage.capacity.monitoring.capacity.unknown' })
    }
    // recover current scale unit
    const { currentScale } = this.state
    // pick up best matching unit in scale
    const capacityToShow = capacity.scaleAndConvert(currentScale)
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
    const { onClose } = this.props
    const { moduleTheme, muiTheme } = this.context
    const { currentScale, plugins } = this.state

    const firstCellStyles = Object.assign({}, moduleTheme.table.firstColumn, moduleTheme.table.row)
    return (
      <Paper >
        <AppBar
          title={
            <FormattedMessage
              id="archival.storage.capacity.monitoring.title"
            />
          }
          iconElementLeft={<IconButton onTouchTap={onClose}><NavigationClose /></IconButton>}
          iconElementRight={
            <DropDownMenu
              labelStyle={{
                color: muiTheme.appBar.textColor,
              }}
              value={currentScale}
              onChange={(evt, i, value) => this.onUnitScaleSelected(value)}
            >
              {allUnitScales.map((scale, index) => (
                <MenuItem
                  value={scale} key={index}
                  primaryText={
                    <FormattedMessage
                      id={`archival.storage.capacity.monitoring.units.scale.${scale}`}
                    />
                  }
                />
              ))}
            </DropDownMenu>
          }
        />

        <div className="row">
          {
            // map all plugins to cards
            plugins.map(({ label, description, totalSize, usedSize }, index) => (
              <Card className={moduleTheme.card.classes} key={index} style={moduleTheme.card.root}>
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
                          <TableRowColumn
                            style={firstCellStyles}
                          >{ this.buildI18NCapacity(totalSize)}
                          </TableRowColumn>
                          <TableRowColumn
                            style={moduleTheme.table.row}
                          >{ this.buildI18NCapacity(usedSize)}
                          </TableRowColumn>
                          <TableRowColumn
                            style={moduleTheme.table.row}
                          >{ this.buildI18NCapacity(usedSize && totalSize ? totalSize.subtract(usedSize) : null)}
                          </TableRowColumn>
                        </TableRow>
                      </TableBody>
                    </Table>
                    <div style={moduleTheme.chart.root}>
                      <Pie
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
            ))
          }
        </div>
      </Paper>
    )
  }

}

export default StorageMonitoring
