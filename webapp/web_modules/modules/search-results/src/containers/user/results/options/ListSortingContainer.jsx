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
import isEqual from 'lodash/isEqual'
import { AccessShapes } from '@regardsoss/shape'
import { TableSortOrders } from '@regardsoss/components'
import { StringComparison } from '@regardsoss/form-utils'
import ListSortingComponent from '../../../../components/user/results/options/ListSortingComponent'

/**
 * Table sort filter options container (sort by in lists)
 * @author Raphaël Mechali
 */
export class ListSortingContainer extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    attributePresentationModels: AccessShapes.AttributePresentationModelArray.isRequired, // presentation model, used in onPropertiesChanged
    onSortByAttribute: PropTypes.func.isRequired, // sort changed callback
  }

  /**
   * Lifecycle method component will mount, used here to update state from properties
   */
  componentWillMount = () => this.onPropertiesChanged({}, this.props)

  /**
   * Lifecycle method component will receive props, used here to update state from properties
   * @param {*} nextProps next component properties
   */
  componentWillReceiveProps = nextProps => this.onPropertiesChanged(this.props, nextProps)

  /**
   * On properties change detected: updated state properties that are computed from props (save some render
   * time)
   * @param {*} oldProps old component properties
   * @param {*} newProps new component properties
   */
  onPropertiesChanged = (oldProps, newProps) => {
    const oldState = this.state
    const newState = {}
    if (!isEqual(oldProps, newProps)) {
      // 1 - Filter to keep only models enabling sorting, then sort them alpĥabetically
      newState.sortableModels = newProps.attributePresentationModels
        .filter(model => model.enableSorting)
        .sort((m1, m2) => StringComparison.compare(m1.label, m2.label))
      // 2 - Find in those the currently selected model
      newState.sortingModel = newState.sortableModels.find(model => model.sortOrder && model.sortOrder !== TableSortOrders.NO_SORT)
      // 3 - Check if default sorting is in attributes
      newState.defaultSortingModel = newState.sortableModels.find(model => model.defaultSorting)
    }

    // update when there is a real difference (avoid columns visibility and such updates)
    if (!isEqual(oldState, newState)) {
      this.setState(newState)
    }
  }

  /**
   * On user selected a new presentation model
   * @param attributePresentationModel selected presentation model, or null
   */
  onSortBy = (attributePresentationModel) => {
    const { onSortByAttribute } = this.props
    if (attributePresentationModel) {
      // enabling sorting on one model
      onSortByAttribute(attributePresentationModel.key, TableSortOrders.ASCENDING_ORDER)
    } else {
      // disabling sort order on current sorting attribute, if any
      const { sortingModel } = this.state
      if (sortingModel) {
        onSortByAttribute(sortingModel.key, TableSortOrders.NO_SORT)
      }
      // else: nothing to do, already no sort
    }
  }

  render() {
    const { sortableModels, sortingModel, defaultSortingModel } = this.state
    return (
      <ListSortingComponent
        sortingModel={sortingModel}
        defaultSortingModel={defaultSortingModel}
        sortableModels={sortableModels}
        onSortBy={this.onSortBy}
      />
    )
  }
}
export default ListSortingContainer
