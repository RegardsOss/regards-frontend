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
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import find from 'lodash/find'
import root from 'window-or-global'
import Drawer from 'material-ui/Drawer'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import CloseIcon from 'mdi-material-ui/Close'
import SearchIcon from 'mdi-material-ui/Magnify'
import ClearIcon from 'mdi-material-ui/Eraser'
import HistoryIcon from 'mdi-material-ui/History'
import PluginsIcon from 'mdi-material-ui/FormatListBulleted'
import SaveIcon from 'mdi-material-ui/ContentSaveOutline'
import { UIShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { UIDomain } from '@regardsoss/domain'
import { SearchCriteriaGroupRuntime } from '../../../../../shapes/search/SearchCriteriaGroupRuntime'
import CriteriaListComponent from './CriteriaListComponent'
import SearchHistoryComponent from './SearchHistoryComponent'
import SaveSearchHistoryComponent from './SaveSearchHistoryComponent'

const SELECTED_VIEW = {
  SEARCH_PANE: 'SEARCH_PANE',
  HISTORY: 'HISTORY',
  SAVE: 'SAVE',
}

/**
 * Search pane component
 * @author Raphaël Mechali
 * @author Théo Lasserre
 */
class SearchPaneComponent extends React.Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    groups: PropTypes.arrayOf(SearchCriteriaGroupRuntime).isRequired,
    rootContextCriteria: PropTypes.arrayOf(UIShapes.BasicCriterion).isRequired,
    searchDisabled: PropTypes.bool.isRequired,
    onUpdatePluginState: PropTypes.func.isRequired,
    onResetPluginsStates: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    moduleId: PropTypes.number.isRequired,
    accountEmail: PropTypes.string,
    onSelectUserSearchHistory: PropTypes.func.isRequired,
    onAddUserSearchHistory: PropTypes.func.isRequired,
    onDeleteUserSearchHistory: PropTypes.func.isRequired,
    isUserSearchHistoryFetching: PropTypes.bool.isRequired,
    throwError: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    selectedSearchHistory: PropTypes.object,
    onRemoveSelectedSearchHistory: PropTypes.func.isRequired,
    onUpdateUserSearchHistory: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static retrieveSearchHistoryPayload(actionResult) {
    const { searchHistory } = actionResult.payload.entities
    // When using find and no condition is supplied, the first value of the object is returned
    const firstSearchHistory = find(searchHistory)
    return get(firstSearchHistory, 'content')
  }

  state = {
    selectedView: SELECTED_VIEW.SEARCH_PANE,
  }

  /** Lifecyle method: component did mount. Used  here to register keyboard listener in order to manage document level events */
  componentDidMount() {
    root.document.addEventListener('keydown', this.onKeyPressed, false)
  }

  /**
   * Lifecycle method: component will unmount. Used here to unregister keyboard lister
   */
  componentWillUnmount() {
    root.document.removeEventListener('keydown', this.onKeyPressed, false)
  }

  /**
   * Callback user pressed keyboard key: handle event for specific combinations:
   * - ESCAPE: Close pane
   * - CTRL+BACKSPACE: Clear pane
   * - ENTER / CTRL + ENTRE: Start search
   */
  onKeyPressed = (event) => {
    const {
      open, onSearch, onClose, onResetPluginsStates,
    } = this.props
    const { selectedView } = this.state
    if (open) {
      if (selectedView === SELECTED_VIEW.SEARCH_PANE && UIDomain.KeyboardShortcuts.matchEvent(event, UIDomain.KeyboardShortcuts.ALL.runSearch)) {
        onSearch()
      } else if (UIDomain.KeyboardShortcuts.matchEvent(event, UIDomain.KeyboardShortcuts.ALL.closeSearch)) {
        onClose()
      } else if (UIDomain.KeyboardShortcuts.matchEvent(event, UIDomain.KeyboardShortcuts.ALL.clearSearch)) {
        onResetPluginsStates()
      }
    }
  }

  /**
   * Update state with selected view
   * @param {SELECTED_VIEW} selectedView
   */
  setSelectedView = (selectedView) => this.setState({ selectedView })

  /**
   * Set search pane view
   */
  setSearchPaneView = () => {
    this.setSelectedView(SELECTED_VIEW.SEARCH_PANE)
  }

  onAddUserSearchHistory = (fieldValue, searchHistoryConfig) => {
    const { onAddUserSearchHistory, throwError } = this.props
    onAddUserSearchHistory(fieldValue, searchHistoryConfig).then((actionResult) => {
      const { error } = actionResult
      if (!error) {
        const firstSearchHistoryContent = SearchPaneComponent.retrieveSearchHistoryPayload(actionResult)
        if (!isEmpty(firstSearchHistoryContent)) {
          return this.onSelectUserSearchHistory(firstSearchHistoryContent.id, firstSearchHistoryContent.name, firstSearchHistoryContent.configuration)
        }
      }
      return throwError('Unable to create element')
    })
  }

  /**
   * Update a search history element using its id and a new config
   * @param {number} searchHistoryId
   * @param {string} searchHistoryConfig
   */
  onUpdateUserSearchHistory = (searchHistoryId, searchHistoryConfig) => {
    const { onUpdateUserSearchHistory, throwError } = this.props
    onUpdateUserSearchHistory(searchHistoryId, searchHistoryConfig).then((actionResult) => {
      const { error } = actionResult
      if (!error) {
        const firstSearchHistoryContent = SearchPaneComponent.retrieveSearchHistoryPayload(actionResult)
        if (!isEmpty(firstSearchHistoryContent)) {
          return this.onSelectUserSearchHistory(firstSearchHistoryContent.id, firstSearchHistoryContent.name, firstSearchHistoryContent.configuration)
        }
      }
      return throwError('Unable to update element')
    })
  }

  onSelectUserSearchHistory = (searchHistoryId, searchHistoryName, searchHistoryConfig) => {
    const { onSelectUserSearchHistory } = this.props
    onSelectUserSearchHistory(searchHistoryId, searchHistoryName, searchHistoryConfig)
    this.setSearchPaneView()
  }

  /**
   * Display selected view depending on user choice
   * @param {SELECTED_VIEW} selectedView
   * @returns selected view
   */
  renderSelectedView = (selectedView) => {
    const {
      rootContextCriteria, onUpdatePluginState, groups, onDeleteUserSearchHistory, accountEmail,
      moduleId, isUserSearchHistoryFetching, selectedSearchHistory, onRemoveSelectedSearchHistory,
    } = this.props
    switch (selectedView) {
      case SELECTED_VIEW.SEARCH_PANE:
        return (
          <CriteriaListComponent
            rootContextCriteria={rootContextCriteria}
            groups={groups}
            onUpdatePluginState={onUpdatePluginState}
            selectedSearchHistory={selectedSearchHistory}
            onRemoveSelectedSearchHistory={onRemoveSelectedSearchHistory}
          />
        )
      case SELECTED_VIEW.HISTORY:
        return (
          <SearchHistoryComponent
            moduleId={moduleId}
            accountEmail={accountEmail}
            onSelectUserSearchHistory={this.onSelectUserSearchHistory}
            onDeleteUserSearchHistory={onDeleteUserSearchHistory}
            isUserSearchHistoryFetching={isUserSearchHistoryFetching}
          />
        )
      case SELECTED_VIEW.SAVE:
        return (
          <SaveSearchHistoryComponent
            onAddUserSearchHistory={this.onAddUserSearchHistory}
            searchHistoryConfig={JSON.stringify({ rootContextCriteria, groups })}
            setSearchPaneView={this.setSearchPaneView}
            selectedSearchHistory={selectedSearchHistory}
            onUpdateUserSearchHistory={this.onUpdateUserSearchHistory}
          />
        )
      default:
        return null
    }
  }

  render() {
    const {
      open, searchDisabled, onResetPluginsStates, onSearch, onClose,
      accountEmail,
    } = this.props
    const {
      intl: { formatMessage },
      muiTheme: { module: { searchResults: { searchPane: { width } } } },
      moduleTheme: {
        user: {
          searchPane: {
            rootContainer,
            title,
            buttons,
          },
        },
      },
    } = this.context
    const { selectedView } = this.state
    return (
      <Drawer
        width={width}
        containerStyle={rootContainer}
        open={open}
        disableSwipeToOpen
        openSecondary
      >
        {/* 1. Title bar */}
        <div style={title.container}>
          {/* 1.a Icon and title */}
          <SearchIcon style={title.icon} />
          <div style={title.text}>{formatMessage({ id: 'search.results.search.pane.title' })}</div>
          {/* 1.b close button */}
          <IconButton
            title={formatMessage({ id: 'search.results.search.pane.close.tooltip' })}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        </div>
        {/* 2. Display selected view depending on state */}
        {
          this.renderSelectedView(selectedView)
        }
        {/* 3. Buttons bar */}
        <div style={buttons.container}>
          {/* 3.a history/plugins buttons */}
          <FlatButton
            icon={selectedView === SELECTED_VIEW.HISTORY ? <PluginsIcon /> : <HistoryIcon />}
            label={selectedView === SELECTED_VIEW.HISTORY ? formatMessage({ id: 'search.results.search.pane.plugins.label' }) : formatMessage({ id: 'search.results.search.pane.history.label' })}
            title={selectedView === SELECTED_VIEW.HISTORY ? formatMessage({ id: 'search.results.search.pane.plugins.title' }) : formatMessage({ id: 'search.results.search.pane.history.title' })}
            onClick={() => this.setSelectedView(selectedView === SELECTED_VIEW.HISTORY ? SELECTED_VIEW.SEARCH_PANE : SELECTED_VIEW.HISTORY)}
            disabled={!accountEmail || selectedView === SELECTED_VIEW.SAVE}
            style={buttons.historyButton}
            labelStyle={buttons.labelStyle}
          />
          {/* 3.b clear inputs */}
          <FlatButton
            icon={<ClearIcon />}
            label={formatMessage({ id: 'search.results.search.pane.reset.label' })}
            title={formatMessage({ id: 'search.results.search.pane.reset.title' })}
            onClick={onResetPluginsStates}
            disabled={selectedView === SELECTED_VIEW.HISTORY || selectedView === SELECTED_VIEW.SAVE}
            style={buttons.clearButton}
            labelStyle={buttons.labelStyle}
          />
          {/* 3.c search */}
          <FlatButton
            icon={<SearchIcon />}
            disabled={searchDisabled || selectedView === SELECTED_VIEW.HISTORY || selectedView === SELECTED_VIEW.SAVE}
            label={formatMessage({ id: 'search.results.search.pane.search.label' })}
            title={formatMessage({ id: 'search.results.search.pane.search.title' })}
            onClick={onSearch}
            style={buttons.searchButton}
            labelStyle={buttons.labelStyle}
          />
          {/* 3.d save search history */}
          <FlatButton
            icon={<SaveIcon />}
            disabled={!accountEmail || selectedView === SELECTED_VIEW.HISTORY || selectedView === SELECTED_VIEW.SAVE}
            label={formatMessage({ id: 'search.results.search.pane.save.label' })}
            title={formatMessage({ id: 'search.results.search.pane.save.title' })}
            onClick={() => this.setSelectedView(SELECTED_VIEW.SAVE)}
            style={buttons.saveButton}
            labelStyle={buttons.labelStyle}
          />
        </div>
      </Drawer>
    )
  }
}
export default SearchPaneComponent
