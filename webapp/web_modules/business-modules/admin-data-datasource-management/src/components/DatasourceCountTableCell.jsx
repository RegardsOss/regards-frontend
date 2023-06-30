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
import get from 'lodash/get'
import { i18nContextType } from '@regardsoss/i18n'

/**
  * @author Sébastien Binda
  * Display the count of aspired entities.
  */

class DatasourceCountTableCell extends React.Component {
  static propTypes = {
    // from table cell API
    entity: DataManagementShapes.CrawlerDatasource.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  static lineWrapper = {
    display: 'flex',
    alignItems: 'center',
  }

  render() {
    const { entity } = this.props
    const okCount = get(entity, 'content.savedObjectsCount', 0)
    const errorCount = get(entity, 'content.inErrorObjectsCount', 0)
    return (<div style={DatasourceCountTableCell.lineWrapper}>{`${okCount} / ${okCount + errorCount}`}</div>)
  }
}

export default DatasourceCountTableCell
