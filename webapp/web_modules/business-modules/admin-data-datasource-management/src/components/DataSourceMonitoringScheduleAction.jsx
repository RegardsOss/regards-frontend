/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import Schedule from 'mdi-material-ui/ClockOutline'
import IconButton from 'material-ui/IconButton'
import { DataManagementShapes, CommonShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { DamDomain } from '@regardsoss/domain'

/**
* Delete table action for datasourceIngestions
* @author Sébastien Binda
*/
class DataSourceMonitoringScheduleAction extends React.Component {
  static propTypes = {
    entity: PropTypes.shape({
      content: DataManagementShapes.CrawlerDatasourceContent.isRequired,
      links: PropTypes.arrayOf(CommonShapes.HateOASLink),
    }),
    onSchedule: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  static iconStyle = { height: 23, width: 23 }

  static buttonStyle = { padding: 0, height: 30, width: 30 }

  isSchedulable = () => {
    const { content } = this.props.entity
    return content.status !== DamDomain.DataSourcesStatusEnum.STARTED
  }

  render() {
    const { intl: { formatMessage } } = this.context
    const crawlerDatasource = this.props.entity.content
    return [
      <IconButton
        key="schedule-button"
        className={`selenium-schedule-${crawlerDatasource.id}`}
        title={formatMessage({ id: 'crawler.list.schedule.action' })}
        iconStyle={DataSourceMonitoringScheduleAction.iconStyle}
        style={DataSourceMonitoringScheduleAction.buttonStyle}
        onClick={() => this.props.onSchedule(crawlerDatasource.id)}
        disabled={!this.isSchedulable()}
      >
        <Schedule />
      </IconButton>,
    ]
  }
}
export default DataSourceMonitoringScheduleAction
