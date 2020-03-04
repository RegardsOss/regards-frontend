/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import FlatButton from 'material-ui/FlatButton'
import SearchIcon from 'mdi-material-ui/Magnify'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { DescriptionEntity } from '../../../shapes/DescriptionState'

/**
 * Option to search entity currently displayed
 * @author Raphaël Mechali
 */
class SearchEntityOptionComponent extends React.Component {
  static propTypes = {
    descriptionEntity: DescriptionEntity.isRequired,
    onSearchEntity: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  onSearchEntity = () => {
    const { descriptionEntity, onSearchEntity } = this.props
    onSearchEntity(descriptionEntity.entity)
  }

  render() {
    const { intl: { formatMessage }, moduleTheme: { user: { header: { flatIconButtonStyle } } } } = this.context
    return (
      <FlatButton
        onClick={this.onSearchEntity}
        icon={<SearchIcon />}
        style={flatIconButtonStyle}
        label={formatMessage({ id: 'module.description.header.search.entity.label' })}
        title={formatMessage({ id: 'module.description.header.search.entity.tooltip' })}
      />
    )
  }
}
export default SearchEntityOptionComponent
