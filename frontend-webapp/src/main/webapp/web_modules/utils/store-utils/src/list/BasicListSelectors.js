/**
 * LICENSE_PLACEHOLDER
 **/
import size from 'lodash/size'
import map from 'lodash/map'
import {createSelector} from 'reselect'
/**
 * @author Léo Mieulet
 */
import BasicSelector from '../BasicSelector'
/**
 *  Provide an high level class to interact with entity stored in a list
 */
class BasicListSelectors extends BasicSelector {

  getList = (state) => {
    return this.uncombineStore(state).items
  }

  getResults = (state) => {
    return this.uncombineStore(state).results
  }

  getOrderedList = createSelector([this.getResults, this.getList],
    (orderedResults, list) => map(orderedResults, entityId => list[entityId])
  )

  getById(state, id) {
    return this.uncombineStore(state).items[id]
  }

  getContentById(state, id) {
    const response = this.getById(state, id)
    if (response && response.content) {
      return response.content
    }
    return undefined
  }

  getSize(state) {
    return size(this.uncombineStore(state).items)
  }

}

export default BasicListSelectors
