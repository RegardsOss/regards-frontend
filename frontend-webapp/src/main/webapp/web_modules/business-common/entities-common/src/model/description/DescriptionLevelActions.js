/**
* LICENSE_PLACEHOLDER
**/

export default class DescriptionLevelAction {

  constructor(namespace) {
    this.SHOW = `${namespace}/DESCRIPTION_LEVEL/SHOW`
    this.SHOW_RELATED_ENTITY = `${namespace}/DESCRIPTION_LEVEL/SHOW_RELATED_ENTITY`
    this.JUMP_TO_LEVEL = `${namespace}/DESCRIPTION_LEVEL/JUMP_TO_LEVEL`
    this.HIDE = `${namespace}/DESCRIPTION_LEVEL/HIDE`
  }

  /**
   * Returns action to dispatch to show description of a new entity
   * @param {CatalogEntity} entity entity to show (will be root of the new context description breadcrumb)
   * @return action
   */
  show(entity) {
    return {
      type: this.SHOW,
      entity,
    }
  }

  /**
   * Returns action to dispatch to show the description of an entity related to the currently shown one
   * @param {CatalogEntity} entity entity to show (will be the new last path element of context description breadcrumb)
   * @return action
   */
  showRelatedEntity(entity) {
    return {
      type: this.SHOW_RELATED_ENTITY,
      entity,
    }
  }

  /**
   * Returns action to dispatch to jump to level as parameter
   * @param {number} levelIndex level index
   * @return action
   */
  jumpToLevel(levelIndex) {
    return {
      type: this.JUMP_TO_LEVEL,
      levelIndex,
    }
  }

  /**
     * Returns action to dispatch to hide description
     * @return action
     */
  hide() {
    return {
      type: this.HIDE,
    }
  }

}
