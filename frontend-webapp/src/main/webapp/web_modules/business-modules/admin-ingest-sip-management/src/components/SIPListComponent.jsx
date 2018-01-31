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
import get from 'lodash/get'
import map from 'lodash/map'
import Refresh from 'material-ui/svg-icons/navigation/refresh'
import Filter from 'mdi-material-ui/Filter'
import Close from 'mdi-material-ui/Close'
import { Card, CardTitle, CardMedia } from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog'
import HistoryIcon from 'material-ui/svg-icons/action/history'
import AddToPhotos from 'material-ui/svg-icons/image/add-to-photos'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import DatePicker from 'material-ui/DatePicker'
import FlatButton from 'material-ui/FlatButton'
import PageView from 'material-ui/svg-icons/action/pageview'
import {
  DateValueRender,
  NoContentComponent,
  TableColumnBuilder, TableDeleteOption, TableSimpleActionOption,
  TableHeaderLine, TableLayout, TableHeaderLineLoadingAndResults, TableHeaderOptionsArea, TableHeaderOptionGroup,
  PageableInfiniteTableContainer,
  Breadcrumb,
} from '@regardsoss/components'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { IngestShapes } from '@regardsoss/shape'
import { sipActions, sipSelectors } from '../clients/SIPClient'
import SIPDetailComponent from './SIPDetailComponent'
import SIPDetailTableAction from './SIPDetailTableAction'
import SIPStatusEnum from './SIPStatusEnum'
import SIPConfirmDeleteDialog from './SIPConfirmDeleteDialog'
import messages from '../i18n'
import styles from '../styles'

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
    // eslint-disable-next-line react/forbid-prop-types
    appliedFilters: PropTypes.object.isRequired,
    onBack: PropTypes.func.isRequired,
    chains: IngestShapes.IngestProcessingChainList.isRequired,
    fetchPage: PropTypes.func.isRequired,
    onRefresh: PropTypes.func.isRequired,
    handleFilter: PropTypes.func.isRequired,
    onDeleteByIpId: PropTypes.func.isRequired,
    onDeleteBySipId: PropTypes.func.isRequired,
    goToSipHistory: PropTypes.func.isRequired,
  }

  static contextTypes = {
    // enable plugin theme access through this.context
    ...themeContextType,
    // enable i18n access trhough this.context
    ...i18nContextType,
  }

  constructor(props) {
    super(props)
    this.state = {
      filters: {
        chainFilter: null,
        dateFilter: undefined,
        stateFilter: null,
        sipIdFilter: '',
      },
      sipToView: null,
      sipToDelete: null,
    }
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

  handleClearFilters = () => {
    const clearedFilters = {
      dateFilter: undefined,
      chainFilter: undefined,
      stateFilter: undefined,
      sipIdFilter: '',
    }
    this.setState({
      filters: clearedFilters,
    })
    this.props.handleFilter(clearedFilters)
  }

  changeChainFilter = (event, key, newValue) => {
    this.setState({
      filters: {
        ...this.state.filters,
        chainFilter: newValue,
      },
    })
  }

  changeDateFilter = (event, newValue) => {
    this.setState({
      filters: {
        ...this.state.filters,
        dateFilter: newValue,
      },
    })
  }

  changeStateFilter = (event, key, newValue) => {
    this.setState({
      filters: {
        ...this.state.filters,
        stateFilter: newValue,
      },
    })
  }

  changeSipIdFilter = (event, newValue) => {
    this.setState({
      filters: {
        ...this.state.filters,
        sipIdFilter: newValue,
      },
    })
  }

  closeDeleteDialog = () => {
    this.setState({
      sipToDelete: null,
    })
  }


  goToSipHistory = (entity, index) => {
    this.props.goToSipHistory(entity.content.sipId)
  }

  handleFilter = () => {
    this.props.handleFilter(this.state.filters)
  }

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
    const { pageSize, resultsCount } = this.props
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
          {this.renderFilters()}
          {this.renderRefreshLine()}
          <TableHeaderLineLoadingAndResults isFetching={false} resultsCount={resultsCount} />
          <PageableInfiniteTableContainer
            name="sip-management-session-table"
            pageActions={sipActions}
            pageSelectors={sipSelectors}
            pageSize={pageSize}
            displayedRowsCount={12}
            columns={columns}
            requestParams={this.props.appliedFilters}
            emptyComponent={emptyComponent}
          />
        </TableLayout>
      </CardMedia>
    )
  }

  renderFilters = () => {
    const { intl, moduleTheme: { filter } } = this.context
    const { chains } = this.props
    return (
      <TableHeaderLine>
        <TableHeaderOptionsArea reducible>
          <TableHeaderOptionGroup>
            <SelectField
              style={filter.fieldStyle}
              hintText={intl.formatMessage({
                id: 'sips.list.filters.chain.label',
              })}
              value={get(this.state, 'filters.chainFilter', undefined)}
              onChange={this.changeChainFilter}
            >
              <MenuItem value={null} primaryText="" />
              {map(chains, chain => <MenuItem key={chain.content.name} value={chain.content.name} primaryText={chain.content.name} />)}
            </SelectField>
            <TextField
              value={get(this.state, 'filters.sipIdFilter', '')}
              onChange={this.changeSipIdFilter}
              hintText={intl.formatMessage({ id: 'sips.list.filters.sipid.label' })}
              style={filter.fieldStyle}
            />
          </TableHeaderOptionGroup>
          <TableHeaderOptionGroup>
            <SelectField
              style={filter.fieldStyle}
              hintText={intl.formatMessage({
                id: 'sips.list.filters.status.label',
              })}
              value={get(this.state, 'filters.stateFilter', undefined)}
              onChange={this.changeStateFilter}
            >
              <MenuItem value={null} primaryText="" />
              {map(SIPStatusEnum, status => (<MenuItem
                key={status}
                value={status}
                primaryText={intl.formatMessage({
                  id: status,
                })}
              />))}
            </SelectField>
            <DatePicker
              value={get(this.state, 'filters.dateFilter', undefined)}
              textFieldStyle={filter.dateStyle}
              hintText={intl.formatMessage({
                id: 'sips.list.filters.date.label',
              })}
              onChange={this.changeDateFilter}
            />
          </TableHeaderOptionGroup>
        </TableHeaderOptionsArea>
      </TableHeaderLine>
    )
  }

  renderRefreshLine = () => (
    <TableHeaderLine>
      <TableHeaderOptionsArea>
        <TableHeaderOptionGroup>
          <FlatButton
            label={this.context.intl.formatMessage({ id: 'sips.session.clear.filters.button' })}
            icon={<Close />}
            disabled={
              !get(this.state, 'filters.dateFilter') &&
              !get(this.state, 'filters.stateFilter') &&
              !get(this.state, 'filters.chainFilter') &&
              !get(this.state, 'filters.sipIdFilter')
            }
            onClick={this.handleClearFilters}
          />
          <FlatButton
            label={this.context.intl.formatMessage({ id: 'sips.session.apply.filters.button' })}
            icon={<Filter />}
            onClick={this.handleFilter}
          />
        </TableHeaderOptionGroup>
      </TableHeaderOptionsArea>
      <TableHeaderOptionsArea>
        <TableHeaderOptionGroup>
          <FlatButton
            label={this.context.intl.formatMessage({ id: 'sips.session.refresh.button' })}
            icon={<Refresh />}
            onClick={this.props.onRefresh}
          />
        </TableHeaderOptionGroup>
      </TableHeaderOptionsArea>
    </TableHeaderLine>
  )

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
        RootIconConstructor={PageView}
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
        </Card>
        {this.renderSIPDetail()}
        {this.renderDeleteConfirmDialog()}
      </div>
    )
  }
}
export default withModuleStyle(styles)(withI18n(messages)(SIPListComponent))
