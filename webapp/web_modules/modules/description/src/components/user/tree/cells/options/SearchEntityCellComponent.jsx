/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { CatalogShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import SearchOptionComponent from './SearchOptionComponent'

/**
 * Cell showing search entity option
 * @author Raphaël Mechali
 */
class SearchEntityCellComponent extends React.Component {
  static propTypes = {
    entity: CatalogShapes.Entity.isRequired,
    // Callback: user searched for an entity tag (tag:CatalogShapes.Entity) => ()
    onSearchEntity: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /**
   * User clicked this option, propagate event
   */
  onSearch = () => {
    const { entity, onSearchEntity } = this.props
    onSearchEntity(entity)
  }

  render() {
    const { entity: { content: { label } } } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <SearchOptionComponent
        tooltip={formatMessage({ id: 'module.description.common.search.entity.tooltip' }, { entityLabel: label })}
        onSearch={this.onSearch}
      />)
  }
}
export default SearchEntityCellComponent
