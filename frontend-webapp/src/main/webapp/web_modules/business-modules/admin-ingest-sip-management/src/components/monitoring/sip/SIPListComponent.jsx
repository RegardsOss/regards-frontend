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
import { Card, CardTitle, CardMedia, CardActions } from 'material-ui/Card'
import Dialog from 'material-ui/Dialog'
import HistoryIcon from 'material-ui/svg-icons/action/history'
import AddToPhotos from 'material-ui/svg-icons/image/add-to-photos'
import PageView from 'material-ui/svg-icons/action/pageview'
import {
  DateValueRender, NoContentComponent, TableColumnBuilder, TableDeleteOption, TableSimpleActionOption,
  TableLayout, TableHeaderLineLoadingAndResults, PageableInfiniteTableContainer, Breadcrumb,
  CardActionsComponent,
} from '@regardsoss/components'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { IngestShapes } from '@regardsoss/shape'
import SIPDetailComponent from './SIPDetailComponent'
import SIPDetailTableAction from './SIPDetailTableAction'
import SIPConfirmDeleteDialog from './SIPConfirmDeleteDialog'
import SIPListFiltersComponent from './SIPListFiltersComponent'
import { sipActions, sipSelectors } from '../../../clients/SIPClient'
import messages from '../../../i18n'
import styles from '../../../styles'

/**
 * SIP list
 * @author Maxime Bouveron
 * @author Sébastien Binda
 */
class SIPListComponent extends React.Component {
  static propTypes = {
    session: PropTypes.string.isRequired,
    sip: PropTypes.string, // Not mandatory. If a SIP is set (sipId) then display only SIPs with the same sipId
    pageSize: PropTypes.number.isRequired,
    resultsCount: PropTypes.number.isRequired,
    onBack: PropTypes.func.isRequired,
    chains: IngestShapes.IngestProcessingChainList.isRequired,
    fetchPage: PropTypes.func.isRequired,
    onRefresh: PropTypes.func.isRequired,
    onDeleteByIpId: PropTypes.func.isRequired,
    onDeleteBySipId: PropTypes.func.isRequired,
    goToSipHistory: PropTypes.func.isRequired,
    initialFilters: PropTypes.objectOf(PropTypes.string),
    contextFilters: PropTypes.objectOf(PropTypes.string),
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  state = {
    appliedFilters: {},
    sipToView: null,
    sipToDelete: null,
  }

  componentWillMount() {
    this.setState({
      appliedFilters: this.props.contextFilters,
    })
  }

  onCloseDetails = () => {
    this.setState({
      sipToView: null,
    })
  }

  onViewSIPDetail = (sipToView) => {
    this.setState({
      sipToView: sipToView || null,
    })
  }

  onConfirmDeleteSIP = () => {
    this.closeDeleteDialog()
    if (this.state.sipToDelete) {
      this.props.onDeleteByIpId(this.state.sipToDelete.content).then(this.state.onDeleteDone)
    }
  }

  onConfirmDeleteSIPs = () => {
    this.closeDeleteDialog()
    if (this.state.sipToDelete) {
      this.props.onDeleteBySipId(this.state.sipToDelete.content).then(this.state.onDeleteDone)
    }
  }

  onDelete = (sipToDelete, onDone) => {
    this.setState({
      sipToDelete,
      onDeleteDone: onDone,
    })
  }

  getTableOptions = (fixedColumnWidth) => {
    if (!this.props.sip) {
      const { intl: { formatMessage } } = this.context
      return TableColumnBuilder.buildOptionsColumn('', [
        {
          OptionConstructor: TableSimpleActionOption,
          optionProps: { onAction: this.goToSipHistory, icon: HistoryIcon, title: formatMessage({ id: 'sips.list.sip-history.title' }) },
        },
        {
          OptionConstructor: SIPDetailTableAction,
          optionProps: { onViewDetail: this.onViewSIPDetail },
        }, {
          OptionConstructor: TableDeleteOption,
          optionProps: {
            fetchPage: this.props.fetchPage,
            onDelete: this.onDelete,
            queryPageSize: 20,
          },
        }], true, fixedColumnWidth)
    }
    return TableColumnBuilder.buildOptionsColumn('', [
      {
        OptionConstructor: SIPDetailTableAction,
        optionProps: { onViewDetail: this.onViewSIPDetail },
      }, {
        OptionConstructor: TableDeleteOption,
        optionProps: {
          fetchPage: this.props.fetchPage,
          onDelete: this.onDelete,
          queryPageSize: 20,
        },
      }], true, fixedColumnWidth)
  }

  applyFilters = (filters) => {
    const { contextFilters } = this.props
    const appliedFilters = { ...filters, ...contextFilters }
    this.setState({ appliedFilters })
  }

  closeDeleteDialog = () => {
    this.setState({
      sipToDelete: null,
    })
  }

  goToSipHistory = (entity, index) => {
    this.props.goToSipHistory(entity.content.sipId)
  }

  handleRefresh = () => this.props.onRefresh(this.state.appliedFilters)

  renderDeleteConfirmDialog = () => {
    const { sipToDelete } = this.state
    if (sipToDelete) {
      return (
        <SIPConfirmDeleteDialog
          sipId={sipToDelete.content.sipId}
          onDeleteSip={this.onConfirmDeleteSIP}
          onDeleteSips={this.onConfirmDeleteSIPs}
          onClose={this.closeDeleteDialog}
        />
      )
    }
    return null
  }

  renderTable = () => {
    const { intl, muiTheme } = this.context
    const {
      pageSize, resultsCount, initialFilters, chains,
    } = this.props
    const fixedColumnWidth = muiTheme['components:infinite-table'].fixedColumnsWidth

    const emptyComponent = (
      <NoContentComponent
        title={intl.formatMessage({ id: 'sips.list.empty.title' })}
        Icon={AddToPhotos}
      />
    )

    const columns = [
      // id column
      TableColumnBuilder.buildSimplePropertyColumn(
        'column.sipId',
        intl.formatMessage({ id: 'sips.list.table.headers.sip-id' }),
        'content.sipId',
      ),
      TableColumnBuilder.buildSimplePropertyColumn(
        'column.type',
        intl.formatMessage({ id: 'sips.list.table.headers.type' }),
        'content.sip.ipType',
      ),
      TableColumnBuilder.buildSimplePropertyColumn(
        'column.state',
        intl.formatMessage({ id: 'sips.list.table.headers.state' }),
        'content.state',
      ),
      TableColumnBuilder.buildSimplePropertyColumn(
        'column.date',
        intl.formatMessage({ id: 'sips.list.table.headers.date' }),
        'content.ingestDate',
        undefined,
        undefined,
        DateValueRender,
      ),
      TableColumnBuilder.buildSimplePropertyColumn(
        'column.version',
        intl.formatMessage({ id: 'sips.list.table.headers.version' }),
        'content.version',
      ),
      this.getTableOptions(fixedColumnWidth),
    ]

    return (
      <CardMedia>
        <TableLayout>
          <SIPListFiltersComponent
            initialFilters={initialFilters}
            applyFilters={this.applyFilters}
            handleRefresh={this.handleRefresh}
            chains={chains}
          />
          <TableHeaderLineLoadingAndResults isFetching={false} resultsCount={resultsCount} />
          <PageableInfiniteTableContainer
            name="sip-management-session-table"
            pageActions={sipActions}
            pageSelectors={sipSelectors}
            pageSize={pageSize}
            displayedRowsCount={12}
            columns={columns}
            requestParams={this.state.appliedFilters}
            emptyComponent={emptyComponent}
          />
        </TableLayout>
      </CardMedia>
    )
  }


  renderSIPDetail = () => {
    const { intl } = this.context
    if (!this.state.sipToView) {
      return null
    }
    return (
      <Dialog
        title={intl.formatMessage({ id: 'sips.list.sip-details.title' })}
        open
        onRequestClose={this.handlesipToView}
      >
        <SIPDetailComponent
          sip={this.state.sipToView}
          onClose={this.onCloseDetails}
        />
      </Dialog>
    )
  }

  renderBreadCrump = () => {
    const { session, onBack, sip } = this.props
    const { intl: { formatMessage } } = this.context
    const elements = [formatMessage({ id: 'sips.session.title' }), formatMessage({ id: 'sips.session.sips.title' }, { session })]
    if (sip) {
      elements.push(sip)
    }
    return (
      <Breadcrumb
        RootIconConstructor={<PageView />}
        elements={elements}
        labelGenerator={label => label}
        onAction={onBack}
      />
    )
  }

  render() {
    const { intl } = this.context

    return (
      <div>
        <Card>
          <CardTitle
            title={this.renderBreadCrump()}
            subtitle={intl.formatMessage({ id: 'sips.list.subtitle' })}
          />
          {this.renderTable()}
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={intl.formatMessage({ id: 'sips.session.button.back' })}
              mainButtonTouchTap={this.props.onBack}
            />
          </CardActions>
        </Card>
        {this.renderSIPDetail()}
        {this.renderDeleteConfirmDialog()}
      </div>
    )
  }
}
export default withModuleStyle(styles)(withI18n(messages)(SIPListComponent))
