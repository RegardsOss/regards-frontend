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
import isEqual from 'lodash/isEqual'
import { connect } from '@regardsoss/redux'
import { UIDomain } from '@regardsoss/domain'
import { HOCUtils } from '@regardsoss/display-control'
import { getSelectionClient } from '../../../../../clients/SelectionClient'
import { getSearchCatalogClient } from '../../../../../clients/SearchEntitiesClient'

/**
 * Container that provides select all properties to its children
 * @author Léo Mieulet
 */
export class TableHeaderSelectAllContainer extends React.Component {

  static propTypes = {
    // components children, where this container will inject select all related properties
    // eslint-disable-next-line react/no-unused-prop-types
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    tabType: PropTypes.oneOf(UIDomain.RESULTS_TABS).isRequired, // used in mapStateToProps and mapDispatchToProps
    selectionEnabled: PropTypes.bool.isRequired,

    // from mapStateToProps
    allSelected: PropTypes.bool.isRequired,
    pageMetadata: PropTypes.shape({
      number: PropTypes.number,
      size: PropTypes.number,
      totalElements: PropTypes.number,
    }),

    // from mapDispatchToProps
    dispatchSelectAll: PropTypes.func.isRequired,
    dispatchUnselectAll: PropTypes.func.isRequired,
  }

  static DEFAULT_STATE = {
    children: null, // pre rendered children
  }

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, { tabType }) {
    const { tableSelectors } = getSelectionClient(tabType)
    const { searchSelectors } = getSearchCatalogClient(tabType)
    return {
      // are all elements selected?
      allSelected: tableSelectors.areAllSelected(state, searchSelectors),
      // results metadata
      pageMetadata: searchSelectors.getMetaData(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of actions ready to be dispatched in the redux store
   */
  static mapDispatchToProps(dispatch, { tabType }) {
    const { tableActions } = getSelectionClient(tabType)
    return {
      dispatchSelectAll: () => dispatch(tableActions.selectAll()),
      dispatchUnselectAll: () => dispatch(tableActions.unselectAll()),
    }
  }

  /**
   * Lifecycle hook: component will mount, used here to update component state
   */
  UNSAFE_componentWillMount = () => this.onPropertiesChanged({}, this.props)

  /**
   * Lifecycle hook: component will receive props, used here to update component state
   * @param nextProps component next properties
   */
  UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesChanged(this.props, nextProps)

  /**
  * Updates component state (recompute properties related elements)
  * @param oldProps previous component
  * @param newProps new component props
  */
  onPropertiesChanged = (oldProps, newProps) => {
    const oldState = this.state || {}
    const newState = { ...(this.state || TableHeaderSelectAllContainer.DEFAULT_STATE) }
    if (oldProps.children !== newProps.children ||
      !isEqual(oldProps.pageMetadata, newProps.pageMetadata) ||
      oldProps.allSelected !== newProps.allSelected ||
      oldProps.selectionEnabled !== newProps.selectionEnabled) {
      // pre render children (attempt to enhance render performances)
      newState.children = HOCUtils.cloneChildrenWith(newProps.children, {
        saDisabled: !newProps.pageMetadata || !newProps.pageMetadata.totalElements,
        saAllSelected: newProps.allSelected,
        saOnToggleSelectAll: this.onToggleSelectAll,
        saSelectionEnabled: newProps.selectionEnabled,
      })
      this.setState(newState)
    }
  }


  onToggleSelectAll = () => {
    const { dispatchSelectAll, dispatchUnselectAll } = this.props
    if (this.props.allSelected) {
      dispatchUnselectAll()
    } else {
      dispatchSelectAll()
    }
  }

  render() {
    const { children } = this.state
    // render only the children
    return HOCUtils.renderChildren(children)
  }
}
export default connect(TableHeaderSelectAllContainer.mapStateToProps, TableHeaderSelectAllContainer.mapDispatchToProps)(TableHeaderSelectAllContainer)
