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
import SearchIcon from 'mdi-material-ui/FolderSearchOutline'
import AddToPhotos from 'mdi-material-ui/PlusBoxMultiple'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import {
  NoContentComponent, PageableInfiniteTableContainer, TableLayout, TableColumnBuilder,
} from '@regardsoss/components'
import { searchHistoryActions, searchHistorySelectors } from '../../../../../clients/SearchHistoryClient'
import SearchHistoryElementRender from './render/SearchHistoryElementRender'

/**
 * Display search history elements
 * @author Théo Lasserre
 */
class SearchHistoryComponent extends React.Component {
  static propTypes = {
    onSelectUserSearchHistory: PropTypes.func.isRequired,
    onDeleteUserSearchHistory: PropTypes.func.isRequired,
    isUserSearchHistoryFetching: PropTypes.bool.isRequired,
    moduleId: PropTypes.number.isRequired,
    accountEmail: PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static PAGE_SIZE = 20

  static COLUMN_KEYS = {
    NAME: 'name',
  }

  static LOADING_COMPONENT = (
    <NoContentComponent
      titleKey="search.history.loading.content.title"
      Icon={SearchIcon}
    />)

  static EMPTY_COMPONENT = (
    <NoContentComponent
      titleKey="search.history.no.content.title"
      messageKey="search.history.no.content.message"
      Icon={AddToPhotos}
    />)

  render() {
    const {
      isUserSearchHistoryFetching, onSelectUserSearchHistory, onDeleteUserSearchHistory,
      moduleId, accountEmail,
    } = this.props
    const { muiTheme, moduleTheme: { user: { searchHistoryPane: { cellWrapperStyle } } } } = this.context
    const { admin: { minRowCount, maxRowCount } } = muiTheme.components.infiniteTable
    const columns = [
      new TableColumnBuilder(SearchHistoryComponent.COLUMN_KEYS.NAME)
        .rowCellDefinition({
          Constructor: SearchHistoryElementRender,
          props: { onSelectUserSearchHistory, onDeleteUserSearchHistory, isUserSearchHistoryFetching },
        }).build(),
    ]
    return (
      <TableLayout>
        <PageableInfiniteTableContainer
          name="search-history-list-table"
          pageActions={searchHistoryActions}
          pageSelectors={searchHistorySelectors}
          pageSize={SearchHistoryComponent.PAGE_SIZE}
          minRowCount={minRowCount}
          maxRowCount={maxRowCount}
          displayColumnsHeader={false}
          stripeRows={false}
          columns={columns}
          cellWrapperStyle={cellWrapperStyle}
          lineHeight={80}
          requestParams={{ moduleId, accountEmail }}
          emptyComponent={isUserSearchHistoryFetching ? SearchHistoryComponent.LOADING_COMPONENT : SearchHistoryComponent.EMPTY_COMPONENT}
        />
      </TableLayout>
    )
  }
}
export default SearchHistoryComponent
