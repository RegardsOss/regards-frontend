/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { connect } from '@regardsoss/redux'
import { themeContextType } from '@regardsoss/theme'
import { InfiniteTableContainer, TableColumnConfiguration } from '@regardsoss/components'
import { aipActions, aipSelectors } from '../../clients/AIPClient'
import { tableActions } from '../../clients/TableClient'

/**
 * Container for AIPs infinite table: works like the PageableInfiniteTableContainer but uses POST requests
 * @author Raphaël Mechali
 */
export class InfiniteAIPTableContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      // results entities
      entities: aipSelectors.getOrderedList(state),
      pageMetadata: aipSelectors.getMetaData(state),
      entitiesFetching: aipSelectors.isFetching(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch, { currentFilters }) {
    return {
      flushEntities: () => dispatch(aipActions.flush()),
      fetchEntities: (pageNumber, nbEntitiesByPage) => dispatch(
        aipActions.fetchPagedEntityList(pageNumber, nbEntitiesByPage, currentFilters)),
      flushSelection: () => dispatch(tableActions.unselectAll()),
    }
  }

  static propTypes = {
    // Table parameters
    pageSize: PropTypes.number.isRequired,
    columns: PropTypes.arrayOf(TableColumnConfiguration).isRequired,
    emptyComponent: PropTypes.element,
    // Context
    currentFilters: PropTypes.objectOf(PropTypes.string).isRequired, // used only in mapDispatchToProps#fetchEntities
    // from mapStateToProps
    entities: PropTypes.arrayOf(PropTypes.object),
    entitiesFetching: PropTypes.bool,
    pageMetadata: PropTypes.shape({ // use only in onPropertiesUpdate
      number: PropTypes.number,
      size: PropTypes.number,
      totalElements: PropTypes.number,
    }),
    // from mapDispatchToProps
    flushEntities: PropTypes.func.isRequired,
    fetchEntities: PropTypes.func.isRequired,
    flushSelection: PropTypes.func.isRequired,
  }


  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const {
      pageSize, columns, currentFilters, emptyComponent,
      entities, entitiesFetching, pageMetadata,
      flushEntities, fetchEntities, flushSelection,
    } = this.props
    const { minRowCount, maxRowCount } = this.context.muiTheme.components.infiniteTable.admin
    return (
      <InfiniteTableContainer
        pageSize={pageSize}
        columns={columns}
        // Small hack here: use context filters here to let the table refetch on change (they are ignored by fetch method)
        requestParams={currentFilters}

        entities={entities}
        entitiesCount={get(pageMetadata, 'totalElements', 0)}
        entitiesPageIndex={get(pageMetadata, 'number', 0)}
        entitiesFetching={entitiesFetching}

        emptyComponent={emptyComponent}

        minRowCount={minRowCount}
        maxRowCount={maxRowCount}

        flushEntities={flushEntities}
        fetchEntities={fetchEntities}
        flushSelection={flushSelection}
      />
    )
  }
}
export default connect(
  InfiniteAIPTableContainer.mapStateToProps,
  InfiniteAIPTableContainer.mapDispatchToProps)(InfiniteAIPTableContainer)
