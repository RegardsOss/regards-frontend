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
import { DataManagementShapes } from '@regardsoss/shape'
import { DamDomain } from '@regardsoss/domain'
import get from 'lodash/get'
import Report from 'mdi-material-ui/AlertOctagon'
import Info from 'mdi-material-ui/Information'
import IconButton from 'material-ui/IconButton'
import { i18nContextType } from '@regardsoss/i18n'

/**
  * @author Léo Mieulet
  * Display the Status of the corresponding ingestion - with a link to open the Stacktrace modal
  */

class DatasourceStatusTableCell extends React.Component {
  static propTypes = {
    // from table cell API
    entity: DataManagementShapes.CrawlerDatasource.isRequired,
    onShow: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  static lineWrapper = {
    display: 'flex',
    alignItems: 'center',
  }

  static iconStyle = { height: 23, width: 23 }

  static buttonStyle = { padding: 0, height: 30, width: 30 }

  render() {
    const { intl: { formatMessage } } = this.context
    const { entity } = this.props
    const status = get(entity, 'content.status', null)
    // display an icon if the status can contains a stacktrace
    let icon = null
    if (status === DamDomain.DataSourcesStatusEnum.ERROR || status === DamDomain.DataSourcesStatusEnum.FINISHED_WITH_WARNINGS
      || DamDomain.DataSourcesStatusEnum.NOT_FINISHED) {
      icon = (
        <IconButton
          title={formatMessage({ id: 'crawler.list.show.stacktrace.tooltip' })}
          iconStyle={DatasourceStatusTableCell.iconStyle}
          style={DatasourceStatusTableCell.buttonStyle}
          onClick={() => this.props.onShow(entity)}
        >
          <Report />
        </IconButton>
      )
    } else if (status === DamDomain.DataSourcesStatusEnum.STARTED || status === DamDomain.DataSourcesStatusEnum.FINISHED) {
      icon = (
        <IconButton
          title={formatMessage({ id: 'crawler.list.show.stacktrace.tooltip' })}
          iconStyle={DatasourceStatusTableCell.iconStyle}
          style={DatasourceStatusTableCell.buttonStyle}
          onClick={() => this.props.onShow(entity)}
        >
          <Info />
        </IconButton>
      )
    }
    return (
      <div style={DatasourceStatusTableCell.lineWrapper}>
        {status}
        {icon}
      </div>
    )
  }
}

export default DatasourceStatusTableCell
