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
import values from 'lodash/values'
import Refresh from 'material-ui/svg-icons/navigation/refresh'
import Filter from 'mdi-material-ui/Filter'
import Close from 'mdi-material-ui/Close'
import FlatButton from 'material-ui/FlatButton'
import { Card, CardTitle, CardActions, CardMedia } from 'material-ui/Card'
import AddToPhotos from 'material-ui/svg-icons/image/add-to-photos'
import DatePicker from 'material-ui/DatePicker'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import Error from 'material-ui/svg-icons/alert/error'
import Arrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right'
import PageView from 'material-ui/svg-icons/action/pageview'
import {
  Breadcrumb,
  CardActionsComponent,
  ConfirmDialogComponent,
  ConfirmDialogComponentTypes,
  ShowableAtRender,
  PageableInfiniteTableContainer,
  TableDeleteOption,
  TableLayout,
  TableColumnBuilder,
  DateValueRender,
  NoContentComponent,
  TableHeaderLine, TableHeaderLineLoadingAndResults, TableHeaderOptionsArea, TableHeaderOptionGroup,
} from '@regardsoss/components'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { sessionActions, sessionSelectors } from '../clients/SessionClient'
import messages from '../i18n'
import styles from '../styles'

/**
 * SIP list test
 * @author Maxime Bouveron
 * @author Sébastien Binda
 */
class SIPSessionComponent extends React.Component {
  static propTypes = {
    pageSize: PropTypes.number.isRequired,
    resultsCount: PropTypes.number.isRequired,
    handleOpen: PropTypes.func,
    onBack: PropTypes.func.isRequired,
    onRefresh: PropTypes.func.isRequired,
    fetchPage: PropTypes.func.isRequired,
    deleteSession: PropTypes.func.isRequired,
    initialFilters: PropTypes.object,
  }

  static contextTypes = {
    // enable plugin theme access through this.context
    ...themeContextType,
    // enable i18n access trhough this.context
    ...i18nContextType,
  }

  static defaultPropTypes = {
    resultsCount: 0,
  }

  state = {
    filters: {},
    appliedFilters: {},
    sessionToDelete: null,
  }

  componentWillMount() {
    const { initialFilters } = this.props
    if (initialFilters) {
      this.setState({
        filters: initialFilters,
      })
    }
  }

  componentDidMount() {
    if (values(this.state.filters).length > 0) {
      this.handleFilter()
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

  closeDeleteDialog = () => {
    this.setState({
      sessionToDelete: null,
    })
  }


  changename = (event, newValue) => {
    this.setState({
      filters: {
        ...this.state.filters,
        name: newValue,
      },
    })
  }

  changefrom = (event, newDate) => {
    newDate.setHours(0, 0, 0, 0)
    this.setState({
      filters: {
        ...this.state.filters,
        from: newDate,
      },
    })
  }

  changeto = (event, newDate) => {
    newDate.setHours(23, 59, 59, 999)
    this.setState({
      filters: {
        ...this.state.filters,
        to: newDate,
      },
    })
  }

  /**
    * Clear all filters
    */
  handleClearFilters = () => {
    this.setState({ filters: {}, appliedFilters: {} })
  }

  handleFilter = () => {
    const { filters } = this.state
    const appliedFilters = {}
    if (filters.name && filters.name !== '') {
      appliedFilters.id = filters.name
    }
    if (filters.from) {
      appliedFilters.from = filters.from.toISOString()
    }
    if (filters.to) {
      appliedFilters.to = filters.to.toISOString()
    }
    this.setState({
      appliedFilters,
    })
  }

  renderFilters = () => {
    const { intl, moduleTheme: { filter } } = this.context
    return (
      <TableHeaderLine>
        <TableHeaderOptionsArea reducible>
          <TableHeaderOptionGroup>
            <TextField
              style={filter.fieldStyle}
              hintText={intl.formatMessage({
                id: 'sips.session.filter.name.label',
              })}
              onChange={this.changename}
              value={get(this.state, 'filters.name', '')}
            />
            <DatePicker
              value={this.state.filters.from}
              textFieldStyle={filter.dateStyle}
              hintText={intl.formatMessage({ id: 'sips.session.filter.from.label' })}
              defaultDate={get(this.state, 'filters.from', undefined)}
              onChange={this.changefrom}
            />
            <DatePicker
              value={this.state.filters.to}
              textFieldStyle={filter.dateStyle}
              hintText={intl.formatMessage({ id: 'sips.session.filter.to.label' })}
              defaultDate={get(this.state, 'filters.to', undefined)}
              onChange={this.changeto}
            />
            <FlatButton
              label={intl.formatMessage({ id: 'sips.session.clear.filters.button' })}
              icon={<Close />}
              disabled={!this.state.filters.name && !this.state.filters.to && !this.state.filters.from}
              onTouchTap={this.handleClearFilters}
            />
            <FlatButton
              label={intl.formatMessage({ id: 'sips.session.apply.filters.button' })}
              icon={<Filter />}
              onTouchTap={this.handleFilter}
            />
          </TableHeaderOptionGroup>
        </TableHeaderOptionsArea>
        <TableHeaderOptionsArea>
          <TableHeaderOptionGroup>
            <FlatButton
              label={intl.formatMessage({ id: 'sips.session.refresh.button' })}
              icon={<Refresh />}
              onClick={this.props.onRefresh}
            />
          </TableHeaderOptionGroup>
        </TableHeaderOptionsArea>
      </TableHeaderLine >
    )
  }

  renderBreadCrump = () => {
    const { intl: { formatMessage } } = this.context
    const elements = [formatMessage({ id: 'sips.session.title' })]
    return (
      <Breadcrumb
        RootIconConstructor={PageView}
        elements={elements}
        labelGenerator={label => label}
        onAction={() => null}
      />
    )
  }

  renderTable = () => {
    const { pageSize, resultsCount } = this.props
    const { intl, muiTheme, moduleTheme: { session } } = this.context
    const fixedColumnWidth = muiTheme['components:infinite-table'].fixedColumnsWidth
    const { appliedFilters } = this.state

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
        )),
      TableColumnBuilder.buildSimpleColumnWithCell(
        'column.errors',
        intl.formatMessage({ id: 'sips.session.table.headers.errors' }),
        {
          Constructor: props => (
            <div style={session.error.rowColumnStyle}>
              <div style={session.error.textStyle}>
                {props.entity.content.errorSipsCount} / {props.entity.content.sipsCount}
              </div>
              <ShowableAtRender
                style={session.error.iconContainerStyle}
                show={props.entity.content.errorSipsCount > 0}
              >
                <IconButton
                  iconStyle={session.error.iconStyle}
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
        'options',
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
      <CardMedia>
        <TableLayout>
          {this.renderFilters()}
          <TableHeaderLineLoadingAndResults isFetching={false} resultsCount={resultsCount} />
          <PageableInfiniteTableContainer
            name="sip-management-session-table"
            pageActions={sessionActions}
            pageSelectors={sessionSelectors}
            pageSize={pageSize}
            displayedRowsCount={12}
            columns={columns}
            requestParams={appliedFilters}
            emptyComponent={emptyComponent}
          />
        </TableLayout>
      </CardMedia>
    )
  }

  renderDeleteConfirmDialog = () => {
    if (this.state.sessionToDelete) {
      return (
        <ConfirmDialogComponent
          dialogType={ConfirmDialogComponentTypes.DELETE}
          title={this.context.intl.formatMessage({ id: 'sips.session.delete.confirm.title' }, { id: this.state.sessionToDelete.content.id })}
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
          title={this.renderBreadCrump()}
          subtitle={intl.formatMessage({ id: 'sips.session.subtitle' })}
        />
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
export default withModuleStyle(styles)(withI18n(messages)(SIPSessionComponent))
