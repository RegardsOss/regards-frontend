/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import find from 'lodash/find'
import Delete from 'mdi-material-ui/Delete'
import IconButton from 'material-ui/IconButton'
import { DataManagementShapes, CommonShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'

/**
* Delete table action for datasourceIngestions
* @author Sébastien Binda
*/
class DataSourceMonitoringDeleteOption extends React.Component {
  static propTypes = {
    entity: PropTypes.shape({
      content: DataManagementShapes.CrawlerDatasourceContent.isRequired,
      links: PropTypes.arrayOf(CommonShapes.HateOASLink),
    }),
    onDelete: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  static iconStyle = { height: 23, width: 23 }

  static buttonStyle = { padding: 0, height: 30, width: 30 }

  isDeletable = () => {
    const { links } = this.props.entity
    return !!find(links, (l) => l.rel === 'delete')
  }

  render() {
    const { intl: { formatMessage } } = this.context
    const crawlerDatasource = this.props.entity.content
    return [
      <IconButton
        key="delete-button"
        className={`selenium-edit-${crawlerDatasource.id}`}
        title={formatMessage({ id: 'crawler.list.delete.action' })}
        iconStyle={DataSourceMonitoringDeleteOption.iconStyle}
        style={DataSourceMonitoringDeleteOption.buttonStyle}
        onClick={() => this.props.onDelete(crawlerDatasource)}
        disabled={!this.isDeletable()}
      >
        <Delete />
      </IconButton>,
    ]
  }
}
export default DataSourceMonitoringDeleteOption
