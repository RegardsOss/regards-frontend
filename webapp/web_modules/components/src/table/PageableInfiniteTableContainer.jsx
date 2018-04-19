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
import omit from 'lodash/omit'
import { connect } from '@regardsoss/redux'
import { BasicPageableSelectors, BasicPageableActions } from '@regardsoss/store-utils'
import TableActions from './model/TableActions'
import InfiniteTableContainer from './InfiniteTableContainer'

/**
 * Pageable implementation for React infinite tables: Provides a quick wrapper on the InfiniteTableContainer.
 * Reports unused properties onto InfiniteTableContainer
 * based on basic pageable actions and selectors
 * @author Raphaël Mechali
 */
export class PageableInfiniteTableContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, { pageSelectors }) {
    return {
      // results entities
      entities: pageSelectors.getOrderedList(state),
      pageMetadata: pageSelectors.getMetaData(state),
      entitiesFetching: pageSelectors.isFetching(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch, { pageActions, tableActions }) {
    return {
      flushEntities: () => dispatch(pageActions.flush()),
      fetchEntities: (pageNumber, nbEntitiesByPage, pathParam, requestParams) => dispatch(pageActions.fetchPagedEntityList(pageNumber, nbEntitiesByPage, pathParam, requestParams)),
      flushSelection: () => tableActions && dispatch(tableActions.unselectAll()),
    }
  }

  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    pageActions: PropTypes.instanceOf(BasicPageableActions).isRequired, // BasicPageableActions to retrieve entities from server
    // eslint-disable-next-line react/no-unused-prop-types
    pageSelectors: PropTypes.instanceOf(BasicPageableSelectors).isRequired, // BasicPageableSelectors to retrieve entities from store
    // optional table selection actions: when provided, the table will be able to flush selection on entities re-fetch
    // eslint-disable-next-line react/no-unused-prop-types
    tableActions: PropTypes.instanceOf(TableActions), // Table actions instance, used in mapDispatchToProps

    // see InfiniteTableContainer for the other properties required (note that the fetch / flush method are
    // already provided by this component, just fill in the other ones =)

    // from map state to props

    // eslint-disable-next-line react/no-unused-prop-types
    entities: PropTypes.arrayOf(PropTypes.object),
    // eslint-disable-next-line react/no-unused-prop-types
    entitiesFetching: PropTypes.bool,
    // eslint-disable-next-line react/no-unused-prop-types
    pageMetadata: PropTypes.shape({ // use only in onPropertiesUpdate
      number: PropTypes.number,
      size: PropTypes.number,
      totalElements: PropTypes.number,
    }),

    // from map dispatch to props

    // eslint-disable-next-line react/no-unused-prop-types
    flushEntities: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    fetchEntities: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    flushSelection: PropTypes.func.isRequired,
  }

  /** List of properties that should not be reported to children */
  static PROPS_TO_OMIT = ['pageActions', 'pageSelectors', 'tableActions', 'pageMetadata']

  /**
   * Lifecycle method: component will mount. used here to initialize state for properties
   */
  componentWillMount = () => this.onPropertiesChanged(this.props)

  /**
   * Lifecycle method: component will receive props. Used here to update state for properties, avoid new references
   * at render time
   * @param nextProps next component properties values
   */
  componentWillReceiveProps = nextProps => this.onPropertiesChanged(nextProps, this.props)

  /**
   * On properties changed, used here to update sub component properties (limits the references creation at render time)
   * @param {*} newProps this component new properties
   * @param {*} oldProps this component old properties (optional)
   */
  onPropertiesChanged = (newProps, oldProps = {}) => {
    // for sub component, we report any non declared properties
    const tableProps = {
      ...omit(newProps, PageableInfiniteTableContainer.PROPS_TO_OMIT),
      entitiesCount: get(newProps.pageMetadata, 'totalElements', 0),
      entitiesPageIndex: get(newProps.pageMetadata, 'number', 0),
    }
    this.setState({ tableProps })
  }


  render() {
    // except actions / selectors, we need all properties through
    const { tableProps } = this.state
    return (
      <InfiniteTableContainer {...tableProps} />
    )
  }
}
export default connect(
  PageableInfiniteTableContainer.mapStateToProps,
  PageableInfiniteTableContainer.mapDispatchToProps,
)(PageableInfiniteTableContainer)