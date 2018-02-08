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
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import AddToPhotos from 'material-ui/svg-icons/image/add-to-photos'
import FlatButton from 'material-ui/FlatButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import get from 'lodash/get'
import Refresh from 'material-ui/svg-icons/navigation/refresh'
import Filter from 'mdi-material-ui/Filter'
import Close from 'mdi-material-ui/Close'
import TextField from 'material-ui/TextField/TextField'
import {
  PageableInfiniteTableContainer,
  TableColumnBuilder,
  TableHeaderLine, TableLayout, TableHeaderLineLoadingAndResults, TableHeaderOptionsArea, TableHeaderOptionGroup,
  NoContentComponent,
  CardActionsComponent,
  FormErrorMessage,
} from '@regardsoss/components'
import { withI18n, i18nContextType } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import AcquisitionProcessingChainMonitoringTableRunAction from './AcquisitionProcessingChainMonitoringTableRunAction'
import AcquisitionProcessingChainMonitoringActivityRenderer from './AcquisitionProcessingChainMonitoringActivityRenderer'
import AcquisitionProcessingChainMonitoringProductsRenderer from './AcquisitionProcessingChainMonitoringProductsRenderer'
import AcquisitionProcessingChainMonitoringFilesRenderer from './AcquisitionProcessingChainMonitoringFilesRenderer'
import { AcquisitionProcessingChainMonitorActions, AcquisitionProcessingChainMonitorSelectors }
  from '../../../clients/AcquisitionProcessingChainMonitorClient'
import { tableActions } from '../../../clients/TableClient'
import messages from '../../../i18n'
import styles from '../../../styles'

/**
* Component to display list of acquisition processing chains monitoring
* @author Sébastien Binda
*/
class AcquisitionProcessingChainMonitorMonitorComponent extends React.Component {
  static propTypes = {
    project: PropTypes.string.isRequired,
    pageSize: PropTypes.number.isRequired,
    resultsCount: PropTypes.number.isRequired,
    entitiesLoading: PropTypes.bool.isRequired,
    onRefresh: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    onRunChain: PropTypes.func.isRequired,
  }

  static defaultProps = {}

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static AUTO_REFRESH_PERIOD = 20000

  state = {
    errorMessage: null,
    filters: {},
    appliedFilters: {},
  }

  /**
   * At component mount, run acquisition chains auto refresh
   */
  componentDidMount = () => {
    this.autoRefresh()
  }

  /**
   * At component unmount, remove acquisition chains auto refresh
   */
  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  /**
   * Use javascript setTimeout to run auto refresh of acquisition chains
   */
  autoRefresh = () => {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
    this.handleRefresh().then((ActionResult) => {
      this.timeout = setTimeout(this.autoRefresh, AcquisitionProcessingChainMonitorMonitorComponent.AUTO_REFRESH_PERIOD)
    })
  }

  /**
   * Callback when the label filter is updated
   */
  changeLabelFilter = (event, newValue) => {
    if (newValue !== null) {
      this.setState({
        filters: {
          ...this.state.filters,
          label: newValue,
        },
      })
    }
  }

  /**
   * Callback when running filter is updated
   */
  changeRunningFilter = (event, key, newValue) => {
    if (newValue) {
      this.setState({
        filters: {
          ...this.state.filters,
          running: newValue,
        },
      })
    }
  }

  /**
   * Callback when running filter is updated
   */
  changeModeFilter = (event, key, newValue) => {
    if (newValue) {
      this.setState({
        filters: {
          ...this.state.filters,
          mode: newValue,
        },
      })
    }
  }

  /**
   * Clear all filters
   */
  handleClearFilters = () => {
    this.setState({ filters: {}, appliedFilters: {} })
  }

  /**
   * Callback to apply selected filters
   */
  handleFilter = () => {
    const running = get(this.state.filters, 'running', 'all')
    const mode = get(this.state.filters, 'mode', 'all')
    const label = get(this.state.filters, 'label', null)
    const filters = {}
    if (running !== 'all') {
      filters.running = running === 'running'
    }
    if (mode !== 'all') {
      filters.mode = mode
    }
    if (label) {
      filters.label = label
    }

    this.setState({
      appliedFilters: filters,
    })
  }

  handleRefresh = () => this.props.onRefresh(this.state.appliedFilters)

  runChainAction = (label, chainId) => {
    this.props.onRunChain(chainId).then(
      (ActionResult) => {
        if (!ActionResult.error) {
          this.autoRefresh()
        } else {
          this.setState({
            errorMessage: this.context.intl.formatMessage({ id: 'acquisition-chain.monitor.list.run.error' }, { label, chainId }),
          })
        }
      },
    )
  }

  renderFilters = () => {
    const { intl: { formatMessage }, moduleTheme: { monitoring: { filters } } } = this.context
    return (
      <TableHeaderLine>
        <TableHeaderOptionsArea reducible>
          <TableHeaderOptionGroup>
            <SelectField
              style={filters.fieldStyle}
              hintText={formatMessage({
                id: 'acquisition-chain.monitor.list.filters.running',
              })}
              value={get(this.state, 'filters.running', undefined)}
              onChange={this.changeRunningFilter}
            >
              <MenuItem
                value="all"
                primaryText={formatMessage({
                  id: 'acquisition-chain.monitor.list.filters.running.all',
                })}
              />
              <MenuItem
                value="running"
                primaryText={formatMessage({
                  id: 'acquisition-chain.monitor.list.filters.running.running',
                })}
              />
              <MenuItem
                value="stopped"
                primaryText={formatMessage({
                  id: 'acquisition-chain.monitor.list.filters.running.stopped',
                })}
              />
            </SelectField>
            <SelectField
              style={filters.fieldStyle}
              hintText={formatMessage({
                id: 'acquisition-chain.monitor.list.filters.mode',
              })}
              value={get(this.state, 'filters.mode', undefined)}
              onChange={this.changeModeFilter}
            >
              <MenuItem
                value="all"
                primaryText={formatMessage({
                  id: 'acquisition-chain.monitor.list.filters.mode.all',
                })}
              />
              <MenuItem
                value="AUTO"
                primaryText={formatMessage({
                  id: 'acquisition-chain.monitor.list.filters.mode.auto',
                })}
              />
              <MenuItem
                value="MANUAL"
                primaryText={formatMessage({
                  id: 'acquisition-chain.monitor.list.filters.mode.manual',
                })}
              />
            </SelectField>
            <TextField
              hintText={formatMessage({
                id: 'acquisition-chain.monitor.list.filters.label',
              })}
              style={filters.fieldStyle}
              value={get(this.state, 'filters.label', '')}
              onChange={this.changeLabelFilter}
            />
          </TableHeaderOptionGroup>

        </TableHeaderOptionsArea>
      </TableHeaderLine>
    )
  }

  renderActionsLine = () => (
    <TableHeaderLine>
      <TableHeaderOptionsArea>
        <TableHeaderOptionGroup>
          <FlatButton
            label={this.context.intl.formatMessage({ id: 'acquisition-chain.monitor.list.filters.clear.button' })}
            icon={<Close />}
            disabled={!get(this.state, 'filters.running') && !get(this.state, 'filters.label') && !get(this.state, 'filters.mode')}
            onTouchTap={this.handleClearFilters}
          />
          <FlatButton
            label={this.context.intl.formatMessage({ id: 'acquisition-chain.monitor.list.filters.apply.button' })}
            icon={<Filter />}
            onTouchTap={this.handleFilter}
          />
        </TableHeaderOptionGroup>
      </TableHeaderOptionsArea>
      <TableHeaderOptionsArea>
        <TableHeaderOptionGroup>
          <FlatButton
            label={this.context.intl.formatMessage({ id: 'acquisition-chain.monitor.list.refresh.button' })}
            icon={<Refresh />}
            onClick={this.handleRefresh}
          />
        </TableHeaderOptionGroup>
      </TableHeaderOptionsArea>
    </TableHeaderLine>
  )

  render() {
    const { intl: { formatMessage }, muiTheme } = this.context
    const {
      onBack, pageSize, resultsCount, entitiesLoading, project,
    } = this.props
    const { appliedFilters, errorMessage } = this.state

    const fixedColumnWidth = muiTheme['components:infinite-table'].fixedColumnsWidth

    const emptyComponent = (
      <NoContentComponent
        title={formatMessage({ id: 'acquisition-chain.monitor.empty.title' })}
        Icon={AddToPhotos}
      />
    )

    const columns = [
      TableColumnBuilder.buildSimplePropertyColumn('column.name', formatMessage({ id: 'acquisition-chain.monitor.list.label' }), 'content.chain.label'),
      TableColumnBuilder.buildSimpleColumnWithCell('column.running', formatMessage({ id: 'acquisition-chain.monitor.list.running' }), {
        Constructor: AcquisitionProcessingChainMonitoringActivityRenderer,
      }),
      TableColumnBuilder.buildSimpleColumnWithCell('column.products', formatMessage({ id: 'acquisition-chain.monitor.list.total-nb-products' }), {
        Constructor: AcquisitionProcessingChainMonitoringProductsRenderer,
        props: { project },
      }),
      TableColumnBuilder.buildSimpleColumnWithCell('column.files', formatMessage({ id: 'acquisition-chain.monitor.list.total-nb-files' }), {
        Constructor: AcquisitionProcessingChainMonitoringFilesRenderer,
        props: { project },
      }),
      TableColumnBuilder.buildOptionsColumn('column.files.actions', [{
        OptionConstructor: AcquisitionProcessingChainMonitoringTableRunAction,
        optionProps: { onRunChain: this.runChainAction },
      },
      ], true, fixedColumnWidth),
    ]
    return (
      <Card>
        <CardTitle
          title={formatMessage({ id: 'acquisition-chain.monitor.list.title' })}
          subtitle={formatMessage({ id: 'acquisition-chain.monitor.list.subtitle' })}
        />
        <CardText>
          <FormErrorMessage>{errorMessage}</FormErrorMessage>
          <TableLayout>
            {this.renderFilters()}
            {this.renderActionsLine()}
            <TableHeaderLineLoadingAndResults isFetching={entitiesLoading} resultsCount={resultsCount} />
            <PageableInfiniteTableContainer
              name="acquisition-chain-monitor-table"
              pageActions={AcquisitionProcessingChainMonitorActions}
              pageSelectors={AcquisitionProcessingChainMonitorSelectors}
              tableActions={tableActions}
              requestParams={appliedFilters}
              columns={columns}
              emptyComponent={emptyComponent}
              displayColumnsHeader
              displayedRowsCount={10}
              queryPageSize={pageSize}
            />
          </TableLayout>
        </CardText>
        <CardActions>
          <CardActionsComponent
            mainButtonTouchTap={onBack}
            mainButtonLabel={formatMessage({ id: 'acquisition-chain.monitor.list.back.button' })}
          />
        </CardActions>
      </Card>
    )
  }
}
export default withModuleStyle(styles)(withI18n(messages)(AcquisitionProcessingChainMonitorMonitorComponent))
