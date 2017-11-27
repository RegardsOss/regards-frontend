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
import map from 'lodash/map'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import Dialog from 'material-ui/Dialog'

import RaisedButton from 'material-ui/RaisedButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import DatePicker from 'material-ui/DatePicker'
import Checkbox from 'material-ui/Checkbox'
import {
  CardActionsComponent,
  ConfirmDialogComponent,
  ConfirmDialogComponentTypes,
  DateValueRender,
  TableColumnBuilder,
  TableDeleteOption,
  TableLayout,
  PageableInfiniteTableContainer,
} from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { IngestShapes } from '@regardsoss/shape'
import { sipActions, sipSelectors } from '../clients/SIPClient'
import SIPDetailComponent from './SIPDetailComponent'
import SIPDetailTableAction from './SIPDetailTableAction'

/**
 * SIP list
 * @author Maxime Bouveron
 */
class SIPListComponent extends React.Component {
  static propTypes = {
    onBack: PropTypes.func.isRequired,
    chains: IngestShapes.IngestProcessingChainList.isRequired,
    fetchPage: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
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
      filters: {},
      chainFilter: null,
      dateFilter: null,
      stateFilter: null,
      ownerFilter: null,
      sipToView: null,
      sipToDelete: null,
    }
  }

  handleFilters = () => {
    const { chainFilter, dateFilter, stateFilter, ownerFilter } = this.state
    const filters = {}
    if (chainFilter) {
      filters.processing = chainFilter
    }
    if (dateFilter) {
      filters.from = dateFilter
    }
    if (stateFilter) {
      filters.state = dateFilter
    }
    this.setState({
      filters,
    })
    // TODO Owner
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

  changeChainFilter = (event, key, newValue) => {
    this.setState({
      chainFilter: newValue,
    })
  }

  changeDateFilter = (event, newValue) => {
    this.setState({
      dateFilter: newValue,
    })
  }

  changeStateFilter = (event, key, newValue) => {
    this.setState({
      stateFilter: newValue,
    })
  }

  changeOwnerFilter = (event, newValue) => {
    this.setState({
      owner: newValue,
    })
  }

  closeDeleteDialog = () => {
    this.setState({
      sipToDelete: null,
    })
  }

  onConfirmDelete = () => {
    this.closeDeleteDialog()
    if (this.state.sipToDelete) {
      this.props.onDelete(this.state.sipToDelete.content)
    }
  }

  onDelete = (sipToDelete) => {
    this.setState({
      sipToDelete,
    })
  }

  renderDeleteConfirmDialog = () => {
    if (this.state.sipToDelete) {
      return (
        <ConfirmDialogComponent
          dialogType={ConfirmDialogComponentTypes.DELETE}
          title={this.context.intl.formatMessage({ id: 'sip.delete.confirm.title' }, { name: this.state.sipToDelete.content.id })}
          onConfirm={this.onConfirmDelete}
          onClose={this.closeDeleteDialog}
        />
      )
    }
    return null
  }

  renderTable = () => {
    const { intl, muiTheme } = this.context
    const fixedColumnWidth = muiTheme['components:infinite-table'].fixedColumnsWidth

    const tableOptions = TableColumnBuilder.buildOptionsColumn('', [{
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
      tableOptions,
    ]

    return (
      <CardText>
        <TableLayout>
          <PageableInfiniteTableContainer
            name="sip-management-session-table"
            pageActions={sipActions}
            pageSelectors={sipSelectors}
            pageSize={10}
            columns={columns}
            requestParams={this.state.filters}
          />
        </TableLayout>
      </CardText>
    )
  }

  renderErrorFilter = () => {
    const { intl, moduleTheme: { sip } } = this.context
    return (
      <SelectField
        style={sip.filter.textFieldStyle}
        floatingLabelText={intl.formatMessage({
          id: 'sips.list.filters.status.label',
        })}
        value={this.state.stateFilter}
        onChange={this.changeStateFilter}
      >
        <MenuItem value={null} primaryText={'None'} />
        <MenuItem
          value={0}
          primaryText={intl.formatMessage({
            id: 'sips.list.filters.status.errors',
          })}
        />
        <MenuItem
          value={1}
          primaryText={intl.formatMessage({
            id: 'sips.list.filters.status.errors.rsingest',
          })}
        />
        <MenuItem
          value={2}
          primaryText={intl.formatMessage({
            id: 'sips.list.filters.status.errors.rsstorage',
          })}
        />
        <MenuItem
          value={3}
          primaryText={intl.formatMessage({
            id: 'sips.list.filters.status.done',
          })}
        />
      </SelectField>
    )
  }

  renderSelectChainsFiler = () => {
    const { chains } = this.props
    const { intl, moduleTheme: { sip } } = this.context
    return (
      <SelectField
        style={sip.filter.textFieldStyle}
        floatingLabelText={intl.formatMessage({
          id: 'sips.list.filters.chain.label',
        })}
        value={this.state.chainFilter}
        onChange={this.changeChainFilter}
      >
        <MenuItem value={null} primaryText={'None'} />
        {map(chains, chain => <MenuItem key={chain.content.name} value={chain.content.name} primaryText={chain.content.name} />)}
      </SelectField>
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

  render() {
    const { intl, moduleTheme: { sip } } = this.context

    return (
      <div>
        <Card>
          <CardTitle
            title={intl.formatMessage({ id: 'sips.title' })}
            subtitle={intl.formatMessage({ id: 'sips.list.subtitle' })}
          />
          <CardText>
            <div style={sip.filter.toolbarStyle}>
              {this.renderSelectChainsFiler()}
              {this.renderErrorFilter()}
              <DatePicker
                textFieldStyle={sip.filter.textFieldStyle}
                floatingLabelText={intl.formatMessage({
                  id: 'sips.list.filters.date.label',
                })}
                onChange={(nothing, date) => {
                  this.handleFilter('from', date.toISOString())
                }}
                container="inline"
                autoOk
              />
              <Checkbox
                style={sip.filter.checkboxStyle}
                label={intl.formatMessage({
                  id: 'sips.list.filters.my-sips.label',
                })}
                labelPosition="right"
              />
              <RaisedButton
                label={intl.formatMessage({ id: 'sips.button.filter' })}
                onClick={this.handleFilters}
                primary
              />
            </div>
          </CardText>
          {this.renderTable()}
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={intl.formatMessage({ id: 'sips.list.button.back' })}
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
export default SIPListComponent
