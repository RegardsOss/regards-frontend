/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import isEqual from 'lodash/isEqual'
import keys from 'lodash/keys'
import omit from 'lodash/omit'
import { connect } from '@regardsoss/redux'
import { BasicPageableSelectors, BasicPageableActions } from '@regardsoss/store-utils'
import AbstractInfiniteTableContainer from './AbstractInfiniteTableContainer'

/**
 * Pageable implementation for React infinite tables: Provides a quick wrapper on the AbstractInfiniteTableContainer.
 * Reports unused properties onto AbstractInfiniteTableContainer
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
  static mapDispatchToProps(dispatch, { pageActions }) {
    return {
      flushEntities: () => dispatch(pageActions.flush()),
      fetchEntities: (pageNumber, nbEntitiesByPage, requestParams) => dispatch(pageActions.fetchPagedEntityList(pageNumber, nbEntitiesByPage, requestParams)),
    }
  }

  static propTypes = {
    pageActions: PropTypes.instanceOf(BasicPageableActions).isRequired, // BasicPageableActions to retrieve entities from server
    pageSelectors: PropTypes.instanceOf(BasicPageableSelectors).isRequired, // BasicPageableSelectors to retrieve entities from store
    // other props, from map state to props, map dispatch to props of TABLE API are reported to AbstractInfiniteTableContainer
  }

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
    const tableProps = omit(newProps, keys(PageableInfiniteTableContainer.propTypes))
    const newState = { tableProps }
    if (!isEqual(this.state, newState)) {
      this.setState(newState)
    }
  }


  render() {
    // except actions / selectors, we need all properties through
    const { tableProps } = this.state
    return (
      <AbstractInfiniteTableContainer {...tableProps} />
    )
  }
}
export default connect(
  PageableInfiniteTableContainer.mapStateToProps,
  PageableInfiniteTableContainer.mapDispatchToProps)(PageableInfiniteTableContainer)
