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
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'

/**
 * @author Théo Lasserre
 */
class SaveSearchHistoryComponent extends React.Component {
  static propTypes = {
    onAddUserSearchHistory: PropTypes.func.isRequired,
    onUpdateUserSearchHistory: PropTypes.func.isRequired,
    searchHistoryConfig: PropTypes.string.isRequired,
    setSearchPaneView: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    selectedSearchHistory: PropTypes.object,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  state = {
    fieldValue: '',
  }

  /**
   * Either update current selected search history element or create a new one.
   */
  onSaveSearchHistory = (selectedSearchHistoryId) => {
    const {
      onAddUserSearchHistory, searchHistoryConfig, onUpdateUserSearchHistory,
    } = this.props
    const { fieldValue } = this.state
    if (selectedSearchHistoryId) {
      onUpdateUserSearchHistory(selectedSearchHistoryId, searchHistoryConfig)
    } else {
      onAddUserSearchHistory(fieldValue, searchHistoryConfig)
    }
  }

  onChangeFieldValue = (event, newValue) => {
    this.setState({
      fieldValue: newValue,
    })
  }

  render() {
    const { setSearchPaneView, selectedSearchHistory } = this.props
    const {
      intl: { formatMessage },
      moduleTheme: {
        user: {
          saveHistoryPane: {
            mainDivStyle,
            buttonsDivStyle,
            textFieldStyle,
            updateElementStyle,
          },
        },
      },
    } = this.context
    const { fieldValue } = this.state
    const selectedSearchHistoryId = get(selectedSearchHistory, 'id')
    return (
      <div style={mainDivStyle}>
        <div>{selectedSearchHistoryId ? formatMessage({ id: 'search.history.update.title' }) : formatMessage({ id: 'search.history.save.title' })}</div>
        {
          !selectedSearchHistoryId ? <TextField
            id="nameField"
            value={fieldValue}
            onChange={this.onChangeFieldValue}
            style={textFieldStyle}
          /> : <div style={updateElementStyle}>{selectedSearchHistory.name}</div>
        }
        <div style={buttonsDivStyle}>
          <RaisedButton
            label={formatMessage({ id: 'search.history.save.cancel' })}
            onClick={setSearchPaneView}
          />
          <RaisedButton
            label={formatMessage({ id: 'search.history.save.confirm' })}
            secondary
            onClick={() => this.onSaveSearchHistory(selectedSearchHistoryId)}
            disabled={isEmpty(fieldValue) && !selectedSearchHistoryId}
          />
        </div>
      </div>
    )
  }
}
export default SaveSearchHistoryComponent
