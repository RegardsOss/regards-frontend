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
import AIPSessionListFiltersComponent from './AIPSessionListFiltersComponent'
import { aipSessionActions, aipSessionSelectors } from '../../../clients/AIPSessionClient'
import messages from '../../../i18n'
import styles from '../../../styles'

/**
 * Component to display AIP sessions list with filters.
 * @author Léo Mieulet
 */
class AIPSessionListComponent extends React.Component {
  static propTypes = {
    pageSize: PropTypes.number.isRequired,
    resultsCount: PropTypes.number.isRequired,
    entitiesLoading: PropTypes.bool.isRequired,
    initialFilters: PropTypes.objectOf(PropTypes.string),
    handleOpen: PropTypes.func,
    onBack: PropTypes.func.isRequired,
    onRefresh: PropTypes.func.isRequired,
    fetchPage: PropTypes.func.isRequired,
    deleteAips: PropTypes.func.isRequired,
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
      this.props.deleteAips(this.state.sessionToDelete.content)
    }
  }

  onDelete = (sessionToDelete) => {
    this.setState({
      sessionToDelete,
    })
  }

  getProgressLabel = step => (entity) => {
    const progress = entity.content[`${step}AipsCount`]
    const total = entity.content.aipsCount - entity.content.deletedAipsCount
    return `${progress} / ${total}`
  }

  getProgressPercent = step => (entity) => {
    const progress = entity.content[`${step}AipsCount`]
    const total = entity.content.aipsCount - entity.content.deletedAipsCount
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
    const elements = [formatMessage({ id: 'aips.session.title' })]
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
        title={intl.formatMessage({ id: 'aips.list.empty.title' })}
        Icon={AddToPhotos}
      />
    )

    const columns = [
      // id column
      new TableColumnBuilder('column.id').titleHeaderCell().propertyRenderCell('content.id')
        .label(intl.formatMessage({ id: 'aips.session.table.headers.id' }))
        .build(),
      new TableColumnBuilder('column.files').titleHeaderCell().propertyRenderCell('content.storedDataFilesCount')
        .label(intl.formatMessage({ id: 'aips.session.table.headers.storedDataFilesCount' }))
        .build(),
      // steps columns
      new TableColumnBuilder('column.stored').titleHeaderCell()
        .progressRenderCell(this.getProgressPercent('stored'), this.getProgressLabel('stored'))
        .label(intl.formatMessage({ id: 'aips.session.table.headers.stored' }))
        .build(),
      // errors columns
      new TableColumnBuilder('column.errors').titleHeaderCell()
        .label(intl.formatMessage({ id: 'aips.session.table.headers.errors' }))
        .rowCellDefinition({
          Constructor: props => (
            <div style={session.error.rowColumnStyle}>
              <div style={session.error.textStyle}>
                {props.entity.content.errorAipsCount}
                /
                {props.entity.content.aipsCount - props.entity.content.deletedAipsCount}
              </div>
              <ShowableAtRender
                style={session.error.iconContainerStyle}
                show={props.entity.content.errorAipsCount > 0}
              >
                <IconButton
                  iconStyle={session.error.iconStyle}
                  title={intl.formatMessage({
                    id: 'aips.session.table.actions.errors',
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
        .label(intl.formatMessage({ id: 'aips.session.table.headers.date' }))
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
              id: 'aips.session.table.actions.list',
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
          <AIPSessionListFiltersComponent
            initialFilters={initialFilters}
            applyFilters={this.applyFilters}
            handleRefresh={this.handleRefresh}
          />
          <TableHeaderLineLoadingAndResults isFetching={entitiesLoading} resultsCount={resultsCount} />
          <PageableInfiniteTableContainer
            name="aip-management-session-table"
            pageActions={aipSessionActions}
            pageSelectors={aipSessionSelectors}
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
          title={this.context.intl.formatMessage({ id: 'aips.session.delete.confirm.title' }, { id: this.state.sessionToDelete.content.id })}
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
          subtitle={intl.formatMessage({ id: 'aips.session.subtitle' })}
        />
        {this.renderTable()}
        <CardActions>
          <CardActionsComponent
            mainButtonLabel={intl.formatMessage({ id: 'aips.session.button.back' })}
            mainButtonClick={this.props.onBack}
          />
        </CardActions>
        {this.renderDeleteConfirmDialog()}
      </Card>
    )
  }
}
export default withModuleStyle(styles)(withI18n(messages)(AIPSessionListComponent))
