import { BasicSelector } from "@regardsoss/store-utils"

class DatasetCreationFormSelectors extends BasicSelector {
  constructor () {
    super(["admin", "data-management", "dataset-form"])
  }

  getViewState (state: any): any {
    console.log(state)
    return this.uncombineStore(state).viewState
  }


}

const _instance = new DatasetCreationFormSelectors()

export default _instance

