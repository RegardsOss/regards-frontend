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
import {
  Card, CardTitle, CardText, CardActions,
} from 'material-ui/Card'
import AddToPhotos from 'material-ui/svg-icons/image/add-to-photos'
import PageView from 'material-ui/svg-icons/action/pageview'
import {
  PageableInfiniteTableContainer, TableColumnBuilder, TableLayout, TableHeaderLineLoadingAndResults,
  NoContentComponent, CardActionsComponent, FormErrorMessage, Breadcrumb,
} from '@regardsoss/components'
import { withI18n, i18nContextType } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import AcquisitionProcessingChainMonitoringTableRunAction from './AcquisitionProcessingChainMonitoringTableRunAction'
import AcquisitionProcessingChainMonitoringTableStopAction from './AcquisitionProcessingChainMonitoringTableStopAction'
import AcquisitionProcessingChainMonitoringActivityRenderer from './AcquisitionProcessingChainMonitoringActivityRenderer'
import AcquisitionProcessingChainMonitoringProductsRenderer from './AcquisitionProcessingChainMonitoringProductsRenderer'
import AcquisitionProcessingChainMonitoringFilesRenderer from './AcquisitionProcessingChainMonitoringFilesRenderer'
import AcquisitionProcessingChainMonitorModeRenderer from './AcquisitionProcessingChainMonitorModeRenderer'
import AcquisitionProcessingChainMonitoringListFiltersComponent from './AcquisitionProcessingChainMonitoringListFiltersComponent'
import { AcquisitionProcessingChainMonitorActions, AcquisitionProcessingChainMonitorSelectors }
  from '../../../clients/AcquisitionProcessingChainMonitorClient'
import { tableActions } from '../../../clients/TableClient'
import messages from '../../../i18n'
import styles from '../../../styles'

/**
* Component to display list of acquisition processing chains monitoring
* @author Sébastien Binda
*/
export class AcquisitionProcessingChainMonitorListComponent extends React.Component {
  static propTypes = {
    project: PropTypes.string.isRequired,
    initialFilters: PropTypes.objectOf(PropTypes.string),
    pageSize: PropTypes.number.isRequired,
    resultsCount: PropTypes.number.isRequired,
    entitiesLoading: PropTypes.bool.isRequired,
    onRefresh: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    onRunChain: PropTypes.func.isRequired,
    onStopChain: PropTypes.func.isRequired,
  }

  static defaultProps = {}

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static AUTO_REFRESH_PERIOD = 20000

  state = {
    errorMessage: null,
    appliedFilters: {},
  }

  /**
   * At component mount, run acquisition chains auto refresh
   */
  componentDidMount = () => {
    // this.autoRefresh()
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
    this.handleRefresh().then(() => {
      this.timeout = setTimeout(this.autoRefresh, AcquisitionProcessingChainMonitorListComponent.AUTO_REFRESH_PERIOD)
    })
  }

  /**
  * Callback to apply specific filters for Product search
  * @param filters : new filters to apply
  * @param callback : callback called when state is updated with new filters
  */
  applyFilters = (filters, callback) => {
    this.setState({ appliedFilters: filters }, callback)
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

  stopChainAction = (label, chainId) => {
    this.props.onStopChain(chainId).then(
      (ActionResult) => {
        if (!ActionResult.error) {
          this.autoRefresh()
        } else {
          this.setState({
            errorMessage: this.context.intl.formatMessage({ id: 'acquisition-chain.monitor.list.stop.error' }, { label, chainId }),
          })
        }
      },
    )
  }

  renderBreadCrump = () => {
    const { intl: { formatMessage } } = this.context
    const elements = [formatMessage({ id: 'acquisition-chain-monitor.breadcrumb.label' })]
    return (
      <Breadcrumb
        rootIcon={<PageView />}
        elements={elements}
        labelGenerator={label => label}
        onAction={() => { }}
      />
    )
  }

  render() {
    const { intl: { formatMessage }, muiTheme } = this.context
    const {
      onBack, pageSize, resultsCount, entitiesLoading, project, initialFilters,
    } = this.props
    const { appliedFilters, errorMessage } = this.state
    const { admin: { minRowCount, maxRowCount } } = muiTheme.components.infiniteTable

    const emptyComponent = (
      <NoContentComponent
        title={formatMessage({ id: 'acquisition-chain.monitor.empty.title' })}
        Icon={AddToPhotos}
      />
    )

    const columns = [
      new TableColumnBuilder('column.name').titleHeaderCell().propertyRenderCell('content.chain.label')
        .label(formatMessage({ id: 'acquisition-chain.monitor.list.label' }))
        .build(),
      new TableColumnBuilder('column.mode').titleHeaderCell()
        .propertyRenderCell('content.chain.mode', AcquisitionProcessingChainMonitorModeRenderer)
        .label(formatMessage({ id: 'acquisition-chain.monitor.list.mode' }))
        .build(),
      new TableColumnBuilder('column.running').titleHeaderCell()
        .rowCellDefinition({ Constructor: AcquisitionProcessingChainMonitoringActivityRenderer })
        .label(formatMessage({ id: 'acquisition-chain.monitor.list.running' }))
        .build(),
      new TableColumnBuilder('column.products').titleHeaderCell()
        .rowCellDefinition({
          Constructor: AcquisitionProcessingChainMonitoringProductsRenderer,
          props: { project },
        })
        .label(formatMessage({ id: 'acquisition-chain.monitor.list.total-nb-products' }))
        .build(),
      new TableColumnBuilder('column.files').titleHeaderCell()
        .rowCellDefinition({
          Constructor: AcquisitionProcessingChainMonitoringFilesRenderer,
          props: { project },
        })
        .label(formatMessage({ id: 'acquisition-chain.monitor.list.total-nb-files' }))
        .build(),
      new TableColumnBuilder().optionsColumn([{
        OptionConstructor: AcquisitionProcessingChainMonitoringTableRunAction,
        optionProps: { onRunChain: this.runChainAction },
      },
      {
        OptionConstructor: AcquisitionProcessingChainMonitoringTableStopAction,
        optionProps: { onStopChain: this.stopChainAction },
      }]).build(),
    ]
    return (
      <Card>
        <CardTitle
          title={this.renderBreadCrump()}
          subtitle={formatMessage({ id: 'acquisition-chain.monitor.list.subtitle' })}
        />
        <CardText>
          <FormErrorMessage>{errorMessage}</FormErrorMessage>
          <TableLayout>
            <AcquisitionProcessingChainMonitoringListFiltersComponent
              initialFilters={initialFilters}
              applyFilters={this.applyFilters}
              handleRefresh={this.handleRefresh}
            />
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
              minRowCount={minRowCount}
              maxRowCount={maxRowCount}
              queryPageSize={pageSize}
            />
          </TableLayout>
        </CardText>
        <CardActions>
          <CardActionsComponent
            mainButtonClick={onBack}
            mainButtonLabel={formatMessage({ id: 'acquisition-chain.monitor.list.back.button' })}
          />
        </CardActions>
      </Card>
    )
  }
}
export default withModuleStyle(styles)(withI18n(messages)(AcquisitionProcessingChainMonitorListComponent))
