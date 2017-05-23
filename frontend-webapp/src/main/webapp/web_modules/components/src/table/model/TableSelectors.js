import { BasicSelector } from '@regardsoss/store-utils'

export class TableSelectors extends BasicSelector {

  /**
   * @param store redux store
   * @return current selection mode (as a TableSelectionModes)
   */
  getSelectionMode(store) {
    return this.uncombineStore(store).selectionMode
  }

  /**
   * @param store redux store
   * @return currently toggled elements
   */
  getToggledElements(store) {
    return this.uncombineStore(store).toggledElements
  }

}

export default storePath => new TableSelectors(storePath)

