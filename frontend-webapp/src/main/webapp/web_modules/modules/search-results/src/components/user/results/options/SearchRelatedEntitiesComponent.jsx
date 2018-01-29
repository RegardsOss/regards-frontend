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
import keys from 'lodash/keys'
import pick from 'lodash/pick'
import IconButton from 'material-ui/IconButton/IconButton'
import SearchIcon from 'material-ui/svg-icons/action/search'
import { AccessShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'


/**
 * Displays the option to search related entities
 * @author Raphaël Mechali
 */
class SearchRelatedEntitiesComponent extends React.Component {
  static propTypes = {
    entity: AccessShapes.EntityWithServices.isRequired,
    onSearchEntity: PropTypes.func, // can not be required as it is rendered in a table holding multiple objects types
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /** Stores sub component properties keys to avoid computing it at render */
  static SUBCOMPONENT_PROPS_KEYS = keys(IconButton.propTypes)

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
    const buttonProperties = pick(this.props, SearchRelatedEntitiesComponent.SUBCOMPONENT_PROPS_KEYS)
    return (
      <IconButton
        onTouchTap={this.onSearchEntity}
        title={formatMessage({ id: 'search.related.objects' })}
        {...buttonProperties}
      >
        <SearchIcon />
      </IconButton>
    )
  }
}
export default SearchRelatedEntitiesComponent
