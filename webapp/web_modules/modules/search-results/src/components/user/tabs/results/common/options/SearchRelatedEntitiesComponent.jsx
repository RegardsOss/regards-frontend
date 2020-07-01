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
import omit from 'lodash/omit'
import IconButton from 'material-ui/IconButton/IconButton'
import FilterIcon from 'mdi-material-ui/Filter'
import { AccessShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'

/**
 * Displays the option to search related entities: when triggered, entity filter is added
 * @author Raphaël Mechali
 */
class SearchRelatedEntitiesComponent extends React.Component {
  static propTypes = {
    entity: AccessShapes.EntityWithServices.isRequired,
    // from table cell API
    rowIndex: PropTypes.number,
    onSearchEntity: PropTypes.func, // can not be required as it is rendered in a table holding multiple objects types
  }

  /** Properties that will not be reported to sub component */
  static NON_REPORTED_PROPS = ['entity', 'rowIndex', 'onSearchEntity']

  static contextTypes = {
    ...i18nContextType,
  }

  /**
   * Callback proxy for search entity
   */
  onSearchEntity = () => {
    const { entity, onSearchEntity } = this.props
    onSearchEntity(entity)
  }

  render() {
    const { intl: { formatMessage } } = this.context
    // compute the properties that should be reported to sub component
    const buttonProperties = omit(this.props, SearchRelatedEntitiesComponent.NON_REPORTED_PROPS)
    return (
      <IconButton
        onClick={this.onSearchEntity}
        title={formatMessage({ id: 'filter.related.data' })}
        {...buttonProperties}
      >
        <FilterIcon />
      </IconButton>
    )
  }
}
export default SearchRelatedEntitiesComponent
