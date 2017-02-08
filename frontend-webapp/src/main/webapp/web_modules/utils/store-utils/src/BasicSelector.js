/**
 * @author Léo Mieulet
 */

/**
 *  Store the location of the selector in the redux tree, and provides a function to only retrieve the subset of the redux tree
 */
class BasicSelector {

  /**
   * @param {string[]} rootStore an array of key of the redux tree
   */
  constructor(rootStore) {
    /**
     * @property {string[]} rootStore the keys we need to go over
     * @type {string[]}
     */
    this.rootStore = rootStore
  }

  /**
   * Returns the subset of the store that your reducer is based on
   * @param {object} store the store
   * @returns {object} subset of the store
   */
  uncombineStore(store) {
    let partialStore = store
    try {
      for (let i = 0; i < this.rootStore.length; i += 1) {
        partialStore = partialStore[this.rootStore[i]]
      }
    } catch (e) {
      console.error('this.rootStore = ', this.rootStore)
      console.error('store = ', store)
      throw new Error('Failed to uncombine the store to be able to extract data from the store')
    }
    return partialStore
  }

  /**
   * Returns error from state, if available.
   * @param state state
   * @return {hasError(bool), message(string), status(int, code), type (string, request failure type)}
   */
  getError(state) {
    return this.uncombineStore(state).error
  }

  /**
   * Return true when the app is downloading a list of or a piece of entity
   * @param state
   */
  isFetching(state) {
    return this.uncombineStore(state).isFetching
  }

  /**
   * Return true when the app is saving, updating or creating a entity
   * @param state
   * @returns {BasicSelector.isSyncing|boolean}
   */
  isSyncing(state) {
    return this.uncombineStore(state).isSyncing
  }
}

export default BasicSelector
