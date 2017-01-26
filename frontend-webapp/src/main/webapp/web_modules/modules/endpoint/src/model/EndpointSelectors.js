/**
 * LICENSE_PLACEHOLDER
 **/
import { map } from 'lodash'
import { BasicPageableSelectors } from '@regardsoss/store-utils'

class EndpointSelectors extends BasicPageableSelectors {
  constructor() {
    super(['common', 'endpoints'])
  }

   getListOfKeys(state) {
     const list = this.getList(state)
     return map(list, item => `${item.content.resource}@${item.content.verb}`)
   }
}

const instance = new EndpointSelectors()
export default instance
