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
import RaisedButton from 'material-ui/RaisedButton'
import { UIShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import DeleteIcon from 'mdi-material-ui/Delete'

/**
 * Render a search history element
 * @author Théo Lasserre
 */
class SearchHistoryElementRender extends React.Component {
  static propTypes = {
    entity: UIShapes.SearchHistory,
    onSelectUserSearchHistory: PropTypes.func.isRequired,
    onDeleteUserSearchHistory: PropTypes.func.isRequired,
    isUserSearchHistoryFetching: PropTypes.bool.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  onDeleteUserSearchHistory = (event) => {
    const { onDeleteUserSearchHistory, entity } = this.props
    event.stopPropagation() // prevent selecting search history element
    onDeleteUserSearchHistory(entity.content.id)
  }

  render() {
    const {
      entity, onSelectUserSearchHistory, isUserSearchHistoryFetching,
    } = this.props
    const { moduleTheme: { user: { searchHistoryPane } } } = this.context
    return (
      <RaisedButton
        style={searchHistoryPane.raisedButtonStyle}
        overlayStyle={searchHistoryPane.raisedButtonOverlayStyle}
        labelStyle={searchHistoryPane.raisedLabelStyle}
        label={entity.content.name}
        onClick={() => onSelectUserSearchHistory(entity.content.id, entity.content.name, entity.content.configuration)}
      >
        <DeleteIcon onClick={this.onDeleteUserSearchHistory} disabled={isUserSearchHistoryFetching} style={searchHistoryPane.iconStyle} />
      </RaisedButton>
    )
  }
}
export default SearchHistoryElementRender
