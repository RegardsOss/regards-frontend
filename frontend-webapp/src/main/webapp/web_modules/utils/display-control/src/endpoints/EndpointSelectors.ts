import {BasicSelector} from "@regardsoss/store-utils"

class EndpointSelectors extends BasicSelector {
  constructor () {
    super(["common", "endpoints"])
  }
  getEndpointsItems (state: any): any {
    return this.uncombineStore(state).items
  }

}

const _instance = new EndpointSelectors()

export default _instance
