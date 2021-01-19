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
import root from 'window-or-global'
import Drawer from 'material-ui/Drawer'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import CloseIcon from 'mdi-material-ui/Close'
import SearchIcon from 'mdi-material-ui/Magnify'
import ClearIcon from 'mdi-material-ui/Eraser'
import { UIShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { UIDomain } from '@regardsoss/domain'
import { SearchCriteriaGroupRuntime } from '../../../../../shapes/search/SearchCriteriaGroupRuntime'
import CriteriaListComponent from './CriteriaListComponent'

/**
 * Search pane component
 * @author Raphaël Mechali
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
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
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
    if (open) {
      if (UIDomain.KeyboardShortcuts.matchEvent(event, UIDomain.KeyboardShortcuts.ALL.runSearch)) {
        onSearch()
      } else if (UIDomain.KeyboardShortcuts.matchEvent(event, UIDomain.KeyboardShortcuts.ALL.closeSearch)) {
        onClose()
      } else if (UIDomain.KeyboardShortcuts.matchEvent(event, UIDomain.KeyboardShortcuts.ALL.clearSearch)) {
        onResetPluginsStates()
      }
    }
  }

  render() {
    const {
      open, groups, rootContextCriteria, searchDisabled,
      onUpdatePluginState, onResetPluginsStates, onSearch, onClose,
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
        {/* 2. Criteria list display in scrollable area */}
        <CriteriaListComponent
          rootContextCriteria={rootContextCriteria}
          groups={groups}
          onUpdatePluginState={onUpdatePluginState}
        />
        {/* 3. Buttons bar */}
        <div style={buttons.container}>
          {/* 3.a clear inputs */}
          <FlatButton
            icon={<ClearIcon />}
            label={formatMessage({ id: 'search.results.search.pane.reset.label' })}
            title={formatMessage({ id: 'search.results.search.pane.reset.title' })}
            onClick={onResetPluginsStates}
          />
          {/* 3.b search */}
          <FlatButton
            icon={<SearchIcon />}
            disabled={searchDisabled}
            label={formatMessage({ id: 'search.results.search.pane.search.label' })}
            title={formatMessage({ id: 'search.results.search.pane.search.title' })}
            onClick={onSearch}
          />
        </div>
      </Drawer>
    )
  }
}
export default SearchPaneComponent
