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
import join from 'lodash/join'
import map from 'lodash/map'
import get from 'lodash/get'
import { OrderDomain } from '@regardsoss/domain'
import { themeContextType } from '@regardsoss/theme'
import { OrderShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'

/**
 * @author Théo Lasserre
 */
export class FileFiltersComponent extends React.Component {
  static propTypes = {
    // from table cell API
    // eslint-disable-next-line react/no-unused-prop-types
    entity: OrderShapes.DatasetTask, // used in mapDispatchToProps only
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  filterValueExist = (filterKey, filters) => !!get(filters, filterKey, null)

  getFilterValue = (filterKey, filters) => {
    const { intl: { formatMessage } } = this.context
    if (filterKey === OrderDomain.FILTER_PARAMS.TYPE) {
      return `${join(map(filters[OrderDomain.FILTER_PARAMS.TYPE], (fileType) => formatMessage({ id: `datasets.list.column.fileFilters.fileTypes.${fileType}` })), ', ')}`
    } if (filterKey === OrderDomain.FILTER_PARAMS.NAME) {
      return filters[OrderDomain.FILTER_PARAMS.NAME]
    }
    return null
  }

  computeLine = (filters, filterType) => {
    const {
      intl: { formatMessage },
      moduleTheme: {
        orderFileFiltersStyle: {
          lineDivStyle, lineLabelStyle, lineValueStyle,
        },
      } = this.context,
    } = this.context
    return (
      this.filterValueExist(filterType, filters)
        ? <div style={lineDivStyle}>
          <p style={lineLabelStyle}>
            {`${formatMessage({ id: `datasets.list.column.fileFilters.${filterType}.label` })}: `}
          </p>
          <p style={lineValueStyle}>
            {this.getFilterValue(filterType, filters)}
          </p>
        </div> : null
    )
  }

  render() {
    const { entity } = this.props
    const { moduleTheme: { orderFileFiltersStyle: { mainDivStyle } } } = this.context
    const fileSelectionDescription = get(entity, 'fileSelectionDescription', null)
    return (
      fileSelectionDescription
        ? <div style={mainDivStyle}>
          {this.computeLine(fileSelectionDescription, OrderDomain.FILTER_PARAMS.TYPE)}
          {this.computeLine(fileSelectionDescription, OrderDomain.FILTER_PARAMS.NAME)}
        </div>
        : null
    )
  }
}
export default FileFiltersComponent
