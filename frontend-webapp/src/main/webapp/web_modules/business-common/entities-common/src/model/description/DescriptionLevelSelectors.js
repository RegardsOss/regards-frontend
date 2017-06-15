/**
* LICENSE_PLACEHOLDER
**/
import last from 'lodash/last'
import { BasicSelector } from '@regardsoss/store-utils'

export class DescriptionLevelSelectors extends BasicSelector {

  getCurrentDescriptionPath(state) {
    return this.uncombineStore(state).currentDescriptionPath
  }

  getShownEntity(state) {
    const path = this.getCurrentDescriptionPath(state)
    return path && path.length ? last(path) : null
  }

}

export default function getDescriptionLevelSelectors(storePath) {
  return new DescriptionLevelSelectors(storePath)
}
