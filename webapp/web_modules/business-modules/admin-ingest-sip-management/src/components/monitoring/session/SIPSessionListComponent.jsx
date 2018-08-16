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
  Card, CardTitle, CardActions, CardMedia,
} from 'material-ui/Card'
import AddToPhotos from 'material-ui/svg-icons/image/add-to-photos'
import IconButton from 'material-ui/IconButton'
import Error from 'material-ui/svg-icons/alert/error'
import Arrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right'
import PageView from 'material-ui/svg-icons/action/pageview'
import {
  Breadcrumb, CardActionsComponent, ConfirmDialogComponent, ConfirmDialogComponentTypes,
  ShowableAtRender, PageableInfiniteTableContainer, TableDeleteOption, TableLayout,
  TableColumnBuilder, DateValueRender, NoContentComponent, TableHeaderLineLoadingAndResults,
} from '@regardsoss/components'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import SIPSessionListFiltersComponent from './SIPSessionListFiltersComponent'
import { sessionActions, sessionSelectors } from '../../../clients/SessionClient'
import messages from '../../../i18n'
import styles from '../../../styles'

/**
 * Component to display SIP sessions list with filters.
 * @author Maxime Bouveron
 * @author Sébastien Binda
 */
class SIPSessionListComponent extends React.Component {
  static propTypes = {
    pageSize: PropTypes.number.isRequired,
    resultsCount: PropTypes.number.isRequired,
    entitiesLoading: PropTypes.bool.isRequired,
    handleOpen: PropTypes.func,
    onBack: PropTypes.func.isRequired,
    onRefresh: PropTypes.func.isRequired,
    fetchPage: PropTypes.func.isRequired,
    deleteSession: PropTypes.func.isRequired,
    initialFilters: PropTypes.objectOf(PropTypes.string),
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static defaultPropTypes = {
    resultsCount: 0,
  }

  state = {
    appliedFilters: {},
    sessionToDelete: null,
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
    const total = entity.content.sipsCount - entity.content.deletedSipsCount
    return `${progress} / ${total}`
  }

  getProgressPercent = step => (entity) => {
    const progress = entity.content[`${step}SipsCount`]
    const total = entity.content.sipsCount - entity.content.deletedSipsCount
    return progress / total * 100
  }

  applyFilters = (filters) => {
    this.setState({ appliedFilters: filters })
  }

  handleRefresh = () => this.props.onRefresh(this.state.appliedFilters)

  closeDeleteDialog = () => {
    this.setState({
      sessionToDelete: null,
    })
  }

  renderBreadCrump = () => {
    const { intl: { formatMessage } } = this.context
    const elements = [formatMessage({ id: 'sips.session.title' })]
    return (
      <Breadcrumb
        rootIcon={<PageView />}
        elements={elements}
        labelGenerator={label => label}
        onAction={() => null}
      />
    )
  }

  renderTable = () => {
    const {
      pageSize, resultsCount, initialFilters, entitiesLoading,
    } = this.props
    const { intl, muiTheme, moduleTheme: { session } } = this.context
    const { admin: { minRowCount, maxRowCount } } = muiTheme.components.infiniteTable
    const { appliedFilters } = this.state

    const emptyComponent = (
      <NoContentComponent
        title={intl.formatMessage({ id: 'sips.list.empty.title' })}
        Icon={AddToPhotos}
      />
    )

    const columns = [
      // id column
      new TableColumnBuilder('column.id').titleHeaderCell().propertyRenderCell('content.id')
        .label(intl.formatMessage({ id: 'sips.session.table.headers.id' }))
        .build(),
      // steps columns
      ...['generated', 'stored', 'indexed'].map(step => new TableColumnBuilder(`column.${step}`).titleHeaderCell()
        .progressRenderCell(this.getProgressPercent(step), this.getProgressLabel(step))
        .label(intl.formatMessage({ id: `sips.session.table.headers.${step}` }))
        .build()),
      // errors columns
      new TableColumnBuilder('column.errors').titleHeaderCell()
        .label(intl.formatMessage({ id: 'sips.session.table.headers.errors' }))
        .rowCellDefinition({
          Constructor: props => (
            <div style={session.error.rowColumnStyle}>
              <div style={session.error.textStyle}>
                {props.entity.content.errorSipsCount}
                /
                {props.entity.content.sipsCount - props.entity.content.deletedSipsCount}
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
                  onClick={() => this.props.handleOpen(props.entity.content.id, true)}
                >
                  <Error />
                </IconButton>
              </ShowableAtRender>
            </div>
          ),
        })
        .build(),
      new TableColumnBuilder('column.date').titleHeaderCell().propertyRenderCell('content.lastActivationDate', DateValueRender)
        .label(intl.formatMessage({ id: 'sips.session.table.headers.date' }))
        .build(),
      new TableColumnBuilder().optionsColumn([{
        OptionConstructor: TableDeleteOption,
        optionProps: {
          fetchPage: this.props.fetchPage,
          onDelete: this.onDelete,
          queryPageSize: 20,
        },
      }, {
        OptionConstructor: props => (
          <IconButton
            title={intl.formatMessage({
              id: 'sips.session.table.actions.list',
            })}
            onClick={() => this.props.handleOpen(props.entity.content.id)}
          >
            <Arrow />
          </IconButton>
        ),
      }]).build(),
    ]

    return (
      <CardMedia>
        <TableLayout>
          <SIPSessionListFiltersComponent
            initialFilters={initialFilters}
            applyFilters={this.applyFilters}
            handleRefresh={this.handleRefresh}
          />
          <TableHeaderLineLoadingAndResults isFetching={entitiesLoading} resultsCount={resultsCount} />
          <PageableInfiniteTableContainer
            name="sip-management-session-table"
            pageActions={sessionActions}
            pageSelectors={sessionSelectors}
            pageSize={pageSize}
            minRowCount={minRowCount}
            maxRowCount={maxRowCount}
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
            mainButtonClick={this.props.onBack}
          />
        </CardActions>
        {this.renderDeleteConfirmDialog()}
      </Card>
    )
  }
}
export default withModuleStyle(styles)(withI18n(messages)(SIPSessionListComponent))
