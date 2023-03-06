/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import Refresh from 'mdi-material-ui/Refresh'
import FlatButton from 'material-ui/FlatButton'
import {
  Card, CardTitle, CardText, CardActions,
} from 'material-ui/Card'
import { withI18n, i18nContextType } from '@regardsoss/i18n'
import Snackbar from 'material-ui/Snackbar'
import { themeContextType } from '@regardsoss/theme'
import { DataManagementShapes } from '@regardsoss/shape'
import {
  CardActionsComponent, DateValueRender, DateRelativeValueRender, InfiniteTableContainer, TableColumnBuilder, TableLayout,
  TableHeaderLine, TableHeaderOptionsArea, TableHeaderOptionGroup, DurationValueRender, ShowableAtRender,
  ConfirmDialogComponent, ConfirmDialogComponentTypes, ContentDisplayDialog,
} from '@regardsoss/components'
import DatasourceStatusTableCell from './DatasourceStatusTableCell'
import DatasourceCountTableCell from './DatasourceCountTableCell'
import DataSourceMonitoringDeleteOption from './DataSourceMonitoringDeleteOption'
import DataSourceMonitoringScheduleAction from './DataSourceMonitoringScheduleAction'
import messages from '../i18n'

/**
* DataSourceMonitoringComponent
* @author Sébastien Binda
*/
class DataSourceMonitoringComponent extends React.Component {
  static propTypes = {
    crawlerDatasources: DataManagementShapes.CrawlerDatasourceArray.isRequired,
    onBack: PropTypes.func.isRequired,
    onRefresh: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onSchedule: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static wrapperPreserveWhitespace = {
    whiteSpace: 'pre-wrap',
  }

  static SNACKBAR_DURATION = 5000

  state = {
    showModal: false,
    crawlerToDelete: null,
    showSnackbar: false,
    snackbarMessage: null,
  }

  onDelete = (crawler) => {
    this.setState({
      crawlerToDelete: crawler,
    })
  }

  onConfirmDelete = () => {
    this.closeDeleteDialog()
    if (this.state.crawlerToDelete) {
      this.props.onDelete(this.state.crawlerToDelete.id)
    }
  }

  handleSnackbarClose = () => {
    this.setState({
      showSnackbar: false,
      snackbarMessage: '',
    })
  }

  renderSnackbar = () => this.state.showSnackbar ? (
    <Snackbar
      open
      message={this.state.snackbarMessage}
      autoHideDuration={DataSourceMonitoringComponent.SNACKBAR_DURATION}
      onRequestClose={this.handleSnackbarClose}
    />
  ) : null

  onSchedule = (crawlerId) => {
    const { intl } = this.context

    this.props.onSchedule(crawlerId)
      .then(() => {
        this.setState({
          showSnackbar: true,
          snackbarMessage: intl.formatMessage({ id: 'crawler.list.scheduled' }),
        })
      })
  }

  closeDeleteDialog = () => {
    this.setState({
      crawlerToDelete: null,
    })
  }

  closeDialog = () => {
    this.setState({
      stacktrace: null,
      showModal: false,
    })
  }

  openStacktraceDialog = (entity) => {
    this.setState({
      stacktrace: entity.content.stackTrace,
      showModal: true,
    })
  }

  renderDeleteConfirmDialog = () => {
    if (this.state.crawlerToDelete) {
      return (
        <ConfirmDialogComponent
          dialogType={ConfirmDialogComponentTypes.DELETE}
          title={this.context.intl.formatMessage({ id: 'crawler.delete.confirm.title' }, { crawler: this.state.crawlerToDelete.label })}
          onConfirm={this.onConfirmDelete}
          onClose={this.closeDeleteDialog}
        />
      )
    }
    return null
  }

  /**
   * Render the dialog containing the stacktrace.
   */
  renderStacktraceDialog = () => (
    <ShowableAtRender
      show={this.state.showModal}
    >
      <ContentDisplayDialog
        displayedContent={this.state.stacktrace}
        title={this.context.intl.formatMessage({ id: 'crawler.list.stacktrace.title' })}
        onClose={this.closeDialog}
        style={DataSourceMonitoringComponent.wrapperPreserveWhitespace}
      />
    </ShowableAtRender>
  )

  render() {
    const { crawlerDatasources, onBack, onRefresh } = this.props
    const { intl, muiTheme } = this.context
    const { admin: { minRowCount, maxRowCount } } = muiTheme.components.infiniteTable
    // emptyComponent
    const columns = [
      new TableColumnBuilder('label').titleHeaderCell().propertyRenderCell('content.label')
        .label(intl.formatMessage({ id: 'crawler.list.label.column.header' }))
        .build(),
      new TableColumnBuilder('lastIngestDate').titleHeaderCell().propertyRenderCell('content.lastIngestDate', DateValueRender)
        .label(intl.formatMessage({ id: 'crawler.list.lastIngestDate.column.header' }))
        .build(),
      new TableColumnBuilder('duration').titleHeaderCell().propertyRenderCell('content.duration', DurationValueRender)
        .label(intl.formatMessage({ id: 'crawler.list.duration.column.header' }))
        .build(),
      new TableColumnBuilder('status').titleHeaderCell().rowCellDefinition({
        Constructor: DatasourceStatusTableCell,
        props: { onShow: this.openStacktraceDialog },
      })
        .label(intl.formatMessage({ id: 'crawler.list.status.column.header' }))
        .build(),
      new TableColumnBuilder('savedObjectsCount').titleHeaderCell().rowCellDefinition({
        Constructor: DatasourceCountTableCell,
      })
        .label(intl.formatMessage({ id: 'crawler.list.savedObjectsCount.column.header' }))
        .build(),
      // Next planed ingest date
      new TableColumnBuilder('nextPlannedIngestDate').titleHeaderCell().propertyRenderCell('content.nextPlannedIngestDate', DateRelativeValueRender, { displayOnlyFutureDate: true })
        .label(intl.formatMessage({ id: 'crawler.list.nextPlannedIngestDate.column.header' }))
        .build(),
      new TableColumnBuilder().optionsColumn([{
        OptionConstructor: DataSourceMonitoringScheduleAction,
        optionProps: { onSchedule: this.onSchedule },
      }, {
        OptionConstructor: DataSourceMonitoringDeleteOption,
        optionProps: { onDelete: this.onDelete },
      }]).build(),
    ]

    return (
      <Card>
        <CardTitle
          title={intl.formatMessage({ id: 'crawler.list.title' })}
        />
        {this.renderStacktraceDialog()}
        {this.renderDeleteConfirmDialog()}
        {this.renderSnackbar()}
        <CardText>
          <TableLayout>
            <TableHeaderLine>
              <TableHeaderOptionsArea />
              <TableHeaderOptionsArea>
                <TableHeaderOptionGroup>
                  <FlatButton
                    icon={<Refresh />}
                    label={intl.formatMessage({ id: 'crawler.list.refresh.button' })}
                    onClick={onRefresh}
                  />
                </TableHeaderOptionGroup>
              </TableHeaderOptionsArea>
            </TableHeaderLine>
            <InfiniteTableContainer
              columns={columns}
              entities={crawlerDatasources}
              minRowCount={minRowCount}
              maxRowCount={maxRowCount}
              entitiesCount={crawlerDatasources.length}
            />
          </TableLayout>
        </CardText>
        <CardActions>
          <CardActionsComponent
            mainButtonClick={onBack}
            mainButtonLabel={intl.formatMessage({ id: 'crawler.list.back.button' })}
          />
        </CardActions>
      </Card>
    )
  }
}
export default withI18n(messages)(DataSourceMonitoringComponent)
