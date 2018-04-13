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
import Refresh from 'material-ui/svg-icons/navigation/refresh'
import FlatButton from 'material-ui/FlatButton'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import { withI18n, i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { DataManagementShapes } from '@regardsoss/shape'
import {
  CardActionsComponent, DateValueRender, InfiniteTableContainer, TableColumnBuilder, TableLayout,
  TableHeaderLine, TableHeaderOptionsArea, TableHeaderOptionGroup, DurationValueRender, ShowableAtRender,
  FitContentDialog, ConfirmDialogComponent, ConfirmDialogComponentTypes,
} from '@regardsoss/components'
import messages from '../i18n'
import DatasourceStatusTableCell from './DatasourceStatusTableCell'
import DataSourceMonitoringDeleteAction from './DataSourceMonitoringDeleteAction'

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
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static wrapperPreserveWhitespace = {
    whiteSpace: 'pre-wrap',
  }

  state = {
    showModal: false,
    crawlerToDelete: null,
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

  getDialogActions = () => [
    <FlatButton
      key="cancel"
      label={this.context.intl.formatMessage({ id: 'crawler.list.stacktrace.action.close' })}
      primary
      onClick={this.closeDialog}
    />,
  ]


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
      <FitContentDialog
        title={this.context.intl.formatMessage({ id: 'crawler.list.stacktrace.title' })}
        modal
        open={this.state.showModal}
        onRequestClose={this.closeDialog}
        autoScrollBodyContent
        actions={this.getDialogActions()}
      >
        <div style={DataSourceMonitoringComponent.wrapperPreserveWhitespace}>
          {this.state.stacktrace}
        </div>
      </FitContentDialog>
    </ShowableAtRender>
  )
  render() {
    const { crawlerDatasources, onBack, onRefresh } = this.props
    const { intl, muiTheme } = this.context
    const { fixedColumnsWidth } = muiTheme.components.infiniteTable
    // emptyComponent
    const columns = [
      TableColumnBuilder.buildSimplePropertyColumn('label', intl.formatMessage({ id: 'crawler.list.label.column.header' }), 'content.label', 0, true),
      TableColumnBuilder.buildSimplePropertyColumn('lastIngestDate', intl.formatMessage({ id: 'crawler.list.lastIngestDate.column.header' }), 'content.lastIngestDate', 0, true, DateValueRender),
      TableColumnBuilder.buildSimplePropertyColumn('duration', intl.formatMessage({ id: 'crawler.list.duration.column.header' }), 'content.duration', 0, true, DurationValueRender),
      TableColumnBuilder.buildSimplePropertyColumn('savedObjectsCount', intl.formatMessage({ id: 'crawler.list.savedObjectsCount.column.header' }), 'content.savedObjectsCount', 0, true),
      TableColumnBuilder.buildSimpleColumnWithCell('status', intl.formatMessage({ id: 'crawler.list.status.column.header' }), {
        Constructor: DatasourceStatusTableCell,
        props: { onShow: this.openStacktraceDialog },
      }, 0, true),
      // Next planed ingest date
      TableColumnBuilder.buildSimplePropertyColumn('nextPlannedIngestDate', intl.formatMessage({ id: 'crawler.list.nextPlannedIngestDate.column.header' }), 'content.nextPlannedIngestDate', 0, true, DateValueRender),
      TableColumnBuilder.buildOptionsColumn('', [{
        OptionConstructor: DataSourceMonitoringDeleteAction,
        optionProps: { onDelete: this.onDelete },
      }], true, fixedColumnsWidth),
    ]

    return (
      <Card>
        <CardTitle
          title={intl.formatMessage({ id: 'crawler.list.title' })}
        />
        {this.renderStacktraceDialog()}
        {this.renderDeleteConfirmDialog()}
        <CardText>
          <TableLayout>
            <TableHeaderLine>
              <TableHeaderOptionsArea />
              <TableHeaderOptionsArea >
                <TableHeaderOptionGroup>
                  <FlatButton
                    icon={<Refresh />}
                    label={intl.formatMessage({ id: 'crawler.list.refresh.button' })}
                    onClick={onRefresh}
                  />
                </TableHeaderOptionGroup>
              </TableHeaderOptionsArea >
            </TableHeaderLine>
            <InfiniteTableContainer
              columns={columns}
              entities={crawlerDatasources}
              minRowCount={0}
              maxRowCount={10}
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
