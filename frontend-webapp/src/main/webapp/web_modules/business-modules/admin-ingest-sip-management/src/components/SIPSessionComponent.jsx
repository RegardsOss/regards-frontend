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

import { Card, CardTitle, CardActions, CardText } from 'material-ui/Card'
import AddToPhotos from 'material-ui/svg-icons/image/add-to-photos'
import DatePicker from 'material-ui/DatePicker'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import IconButton from 'material-ui/IconButton'
import Error from 'material-ui/svg-icons/alert/error'
import Arrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right'
import {
  CardActionsComponent,
  ClearFieldButton,
  ConfirmDialogComponent,
  ConfirmDialogComponentTypes,
  ShowableAtRender,
  PageableInfiniteTableContainer,
  TableDeleteOption,
  TableLayout,
  TableColumnBuilder,
  DateValueRender,
  NoContentComponent,
} from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { sessionActions, sessionSelectors } from '../clients/SessionClient'

/**
 * SIP list test
 * @author Maxime Bouveron
 * @author Sébastien Binda
 */
class SIPSessionComponent extends React.Component {
  static propTypes = {
    handleOpen: PropTypes.func,
    onBack: PropTypes.func.isRequired,
    fetchPage: PropTypes.func.isRequired,
    deleteSession: PropTypes.func.isRequired,
  }

  static contextTypes = {
    // enable plugin theme access through this.context
    ...themeContextType,
    // enable i18n access trhough this.context
    ...i18nContextType,
  }

  constructor(props) {
    super(props)
    const from = new Date()
    const to = new Date()
    from.setHours(0, 0, 0, 0)
    to.setHours(23, 59, 59, 999)
    this.state = {
      filters: {},
      fromFilter: from,
      toFilter: to,
      nameFilter: null,
      sessionToDelete: null,
    }
  }

  onConfirmDelete = () => {
    this.closeDeleteDialog()
    if (this.state.sessionToDelete) {
      this.props.deleteSession(this.state.sessionToDelete.content)
    }
  }

  onDelete = (sessionToDelete) => {
    this.setState({
      sessionToDelete,
    })
  }

  getProgressLabel = step => (entity) => {
    const progress = entity.content[`${step}SipsCount`]
    const total = entity.content.sipsCount

    return `${progress} / ${total}`
  }

  getProgressPercent = step => (entity) => {
    const progress = entity.content[`${step}SipsCount`]
    const total = entity.content.sipsCount

    return progress / total * 100
  }

  handleClearDate = () => this.setState({ fromFilter: undefined, toFilter: undefined })

  handleFilter = () => {
    const filters = {}
    if (this.state.nameFilter && this.state.nameFilter !== '') {
      filters.id = this.state.nameFilter
    }
    if (this.state.fromFilter) {
      filters.from = this.state.fromFilter.toISOString()
    }
    if (this.state.toFilter) {
      filters.to = this.state.toFilter.toISOString()
    }
    this.setState({
      filters,
    })
  }

  changeNameFilter = (event, newValue) => {
    this.setState({
      nameFilter: newValue,
    })
  }

  changeFromFilter = (event, newDate) => {
    newDate.setHours(0, 0, 0, 0)
    this.setState({
      fromFilter: newDate,
    })
  }

  changeToFilter = (event, newDate) => {
    newDate.setHours(23, 59, 59, 999)
    this.setState({
      fromFilter: newDate,
    })
  }

  closeDeleteDialog = () => {
    this.setState({
      sessionToDelete: null,
    })
  }

  renderFilters = () => {
    const { intl, moduleTheme: { sip } } = this.context
    return (
      <CardText>
        <div style={sip.filter.lineStyle}>
          <div>{intl.formatMessage({ id: 'sips.session.filter.name' })}</div>
          <TextField
            style={sip.filter.fieldStyle}
            floatingLabelText={intl.formatMessage({
              id: 'sips.session.filter.name.label',
            })}
            onChange={this.changeNameFilter}
          />
        </div>
        <div style={sip.filter.lineStyle}>
          <div>{intl.formatMessage({ id: 'sips.session.filter.date' })}</div>
          <DatePicker
            value={this.state.fromFilter}
            textFieldStyle={sip.filter.dateStyle}
            floatingLabelText={intl.formatMessage({ id: 'sips.session.filter.from.label' })}
            defaultDate={this.state.fromFilter}
            onChange={this.changeFromFilter}
          />
          <DatePicker
            value={this.state.toFilter}
            textFieldStyle={sip.filter.dateStyle}
            floatingLabelText={intl.formatMessage({ id: 'sips.session.filter.to.label' })}
            defaultDate={this.state.toFilter}
            onChange={this.changeToFilter}
          />
          <ClearFieldButton onTouchTap={this.handleClearDate} displayed={!!this.state.toFilter || !!this.state.fromFilter} />
        </div>
        <RaisedButton
          label={intl.formatMessage({ id: 'sips.button.filter' })}
          primary
          onTouchTap={this.handleFilter}
        />
      </CardText>
    )
  }

  renderTable = () => {
    const { intl, muiTheme, moduleTheme: { sip } } = this.context
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
        'column.id',
        intl.formatMessage({ id: 'sips.session.table.headers.id' }),
        'content.id',
      ),
      ...['generated', 'stored', 'indexed'].map(step =>
        TableColumnBuilder.buildSimpleColumnWithCell(
          `column.${step}`,
          intl.formatMessage({ id: `sips.session.table.headers.${step}` }),
          TableColumnBuilder.buildProgressRenderCell(this.getProgressPercent(step), this.getProgressLabel(step)),
        ),
      ),
      TableColumnBuilder.buildSimpleColumnWithCell(
        'column.errors',
        intl.formatMessage({ id: 'sips.session.table.headers.errors' }),
        {
          Constructor: props => (
            <div style={sip.session.error.rowColumnStyle}>
              <div style={sip.session.error.textStyle}>
                {props.entity.content.errorSipsCount} / {props.entity.content.sipsCount}
              </div>
              <ShowableAtRender
                style={sip.session.error.iconContainerStyle}
                show={props.entity.content.errorSipsCount > 0}
              >
                <IconButton
                  iconStyle={sip.session.error.iconStyle}
                  title={intl.formatMessage({
                    id: 'sips.session.table.actions.errors',
                  })}
                  onTouchTap={() => this.props.handleOpen(props.entity.content.id, true)}
                >
                  <Error />
                </IconButton>
              </ShowableAtRender>
            </div>
          ),
        },
      ),
      TableColumnBuilder.buildSimplePropertyColumn(
        'column.date',
        intl.formatMessage({ id: 'sips.session.table.headers.date' }),
        'content.lastActivationDate',
        undefined,
        undefined,
        DateValueRender,
      ),
      TableColumnBuilder.buildOptionsColumn(
        '',
        [
          {
            OptionConstructor: TableDeleteOption,
            optionProps: {
              fetchPage: this.props.fetchPage,
              onDelete: this.onDelete,
              queryPageSize: 20,
            },
          },
          {
            OptionConstructor: props => (
              <IconButton
                title={intl.formatMessage({
                  id: 'sips.session.table.actions.list',
                })}
                onTouchTap={() => this.props.handleOpen(props.entity.content.id)}
              >
                <Arrow />
              </IconButton>
            ),
            optionProps: {},
          },
        ],
        true,
        fixedColumnWidth,
      ),
    ]

    return (
      <CardText>
        <TableLayout>
          <PageableInfiniteTableContainer
            name="sip-management-session-table"
            pageActions={sessionActions}
            pageSelectors={sessionSelectors}
            pageSize={10}
            columns={columns}
            requestParams={this.state.filters}
            emptyComponent={emptyComponent}
          />
        </TableLayout>
      </CardText>
    )
  }

  renderDeleteConfirmDialog = () => {
    if (this.state.sessionToDelete) {
      return (
        <ConfirmDialogComponent
          dialogType={ConfirmDialogComponentTypes.DELETE}
          title={this.context.intl.formatMessage({ id: 'sip.session.delete.confirm.title' }, { id: this.state.sessionToDelete.content.id })}
          onConfirm={this.onConfirmDelete}
          onClose={this.closeDeleteDialog}
        />
      )
    }
    return null
  }

  render() {
    const { intl } = this.context

    return (
      <Card>
        <CardTitle
          title={intl.formatMessage({ id: 'sips.title' })}
          subtitle={intl.formatMessage({ id: 'sips.session.subtitle' })}
        />
        {this.renderFilters()}
        {this.renderTable()}
        <CardActions>
          <CardActionsComponent
            mainButtonLabel={intl.formatMessage({ id: 'sips.session.button.back' })}
            mainButtonTouchTap={this.props.onBack}
          />
        </CardActions>
        {this.renderDeleteConfirmDialog()}
      </Card>
    )
  }
}
export default SIPSessionComponent
