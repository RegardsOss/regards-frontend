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
import InsertIcon from 'mdi-material-ui/Plus'
import CircularProgress from 'material-ui/CircularProgress'
import FlatButton from 'material-ui/FlatButton'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'

/**
 * Empty component for criteria table: it displays loading while loading
 * @author Raphaël Mechali
 */
class CriteriaEmptyComponent extends React.Component {
  static propTypes = {
    fetching: PropTypes.bool.isRequired,
    onInsertGroup: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /** User callback: first group added */
  onAddGroup = () => {
    const { onInsertGroup } = this.props
    onInsertGroup(0)
  }

  render() {
    const { fetching } = this.props
    const { intl: { formatMessage }, moduleTheme: { configuration: { content: { searchPane: { loading, empty } } } } } = this.context
    return fetching ? ( // render fetching
      <CircularProgress
        style={loading.style}
        size={loading.size}
        thickness={loading.thickness}
      />) : ( // render empty, with add group option
      <div style={empty.root}>
        <div style={empty.message}>
          {formatMessage({ id: 'search.results.form.configuration.search.pane.empty.message' })}
        </div>
        <FlatButton
          label={formatMessage({ id: 'search.results.form.configuration.search.pane.empty.first.group.label' })}
          icon={<InsertIcon />}
          style={empty.button}
          onClick={this.onAddGroup}
        />
      </div>
    )
  }
}
export default CriteriaEmptyComponent
