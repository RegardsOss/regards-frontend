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
import FlatButton from 'material-ui/FlatButton'
import SearchIcon from 'mdi-material-ui/Magnify'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'

/**
 * Search option switch display
 * @author Raphaël Mechali
 */
class SearchOptionComponent extends React.Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    onToggleOpen: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  render() {
    const { open, onToggleOpen } = this.props
    const { intl: { formatMessage }, moduleTheme: { user: { searchButton } } } = this.context
    return (
      <FlatButton
        // label from configuration when provided, default otherwise
        label={formatMessage({ id: 'search.results.show.search.pane.label' })}
        title={formatMessage({ id: 'search.results.show.search.pane.title' })}
        onClick={onToggleOpen}
        icon={<SearchIcon />}
        secondary={open}
        style={searchButton}
      />
    )
  }
}
export default SearchOptionComponent
