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
import Refresh from 'material-ui/svg-icons/navigation/refresh'
import FlatButton from 'material-ui/FlatButton'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import { withI18n, i18nContextType } from '@regardsoss/i18n'
import { DataManagementShapes } from '@regardsoss/shape'
import {
  CardActionsComponent, DateValueRender, InfiniteTableContainer, TableColumnBuilder, TableLayout,
  TableHeaderLine, TableHeaderOptionsArea, TableHeaderOptionGroup,
} from '@regardsoss/components'
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
  }

  static defaultProps = {}

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const { crawlerDatasources, onBack, onRefresh } = this.props
    const { intl } = this.context
    // emptyComponent
    const columns = [
      // ID column
      TableColumnBuilder.buildSimplePropertyColumn('label', intl.formatMessage({ id: 'crawler.list.label.column.header' }), 'content.label', 0, true),
      // Last ingest date
      TableColumnBuilder.buildSimplePropertyColumn('lastIngestDate', intl.formatMessage({ id: 'crawler.list.lastIngestDate.column.header' }), 'content.lastIngestDate', 0, true, DateValueRender),
      // Duration
      TableColumnBuilder.buildSimplePropertyColumn('duration', intl.formatMessage({ id: 'crawler.list.duration.column.header' }), 'content.duration', 0, true),
      // savedObjectsCount
      TableColumnBuilder.buildSimplePropertyColumn('savedObjectsCount', intl.formatMessage({ id: 'crawler.list.savedObjectsCount.column.header' }), 'content.savedObjectsCount', 0, true),
      // status
      TableColumnBuilder.buildSimplePropertyColumn('status', intl.formatMessage({ id: 'crawler.list.status.column.header' }), 'content.status', 0, true),
      // Next planed ingest date
      TableColumnBuilder.buildSimplePropertyColumn('nextPlannedIngestDate', intl.formatMessage({ id: 'crawler.list.nextPlannedIngestDate.column.header' }), 'content.nextPlannedIngestDate', 0, true, DateValueRender),
    ]

    console.error('render for ', crawlerDatasources)

    return (
      <Card>
        <CardTitle
          title={intl.formatMessage({ id: 'crawler.list.title' })}
        />
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
