/**
* LICENSE_PLACEHOLDER
**/
import DescriptionLevelActions from './DescriptionLevelActions'

/**
 * Description level reducer: provides the currentDescriptionPath to component.
 * Use: when empty, the component is not visible. Otherwise, the component is visible on the last path element.
 * Elements are stored by their ipId to be loaded on need
 */
export class DescriptionLevelReducer {

  static DEFAULT_STATE = {
    currentDescriptionPath: null,
  }

  constructor(namespace) {
    this.actionsModel = new DescriptionLevelActions(namespace)
  }


  /**
   * Reducer for description levels (sort of breadcrumb controlling the component visibility)
   */
  reduce(state = DescriptionLevelReducer.DEFAULT_STATE, action) {
    switch (action.type) {
      case this.actionsModel.SHOW:
        // shows the root entity
        return {
          currentDescriptionPath: [action.entity],
        }
      case this.actionsModel.SHOW_RELATED_ENTITY:
        if (!state.currentDescriptionPath) {
          throw new Error('No root path element')
        }
        return {
          currentDescriptionPath: [...state.currentDescriptionPath, action.entity],
        }
      case this.actionsModel.JUMP_TO_LEVEL:
        if (action.levelIndex === state.currentDescriptionPath.length - 1) {
          // do not handle the 'jump to' the last level, already shown
          return state
        }
        if (!state.currentDescriptionPath) {
          throw new Error('Cannot jump to a new level when no path is set up!')
        }
        if (action.levelIndex < 0 || action.levelIndex >= state.currentDescriptionPath.length) {
          throw new Error('Jump to level forbidden: level index outside the current path range', action.levelIndex, state.currentDescriptionPath)
        }
        return { // remove the levels that are after selected one
          currentDescriptionPath: state.currentDescriptionPath.slice(0, action.levelIndex + 1),
        }
      case this.actionsModel.HIDE:
        return DescriptionLevelReducer.DEFAULT_STATE
      default:
        return state
    }
  }

}

/**
 * Returns reduce function instance for a given namespace
 * @param {*} namespace namespace
 */
export default function getDescriptionLevelReducer(namespace) {
  const reducer = new DescriptionLevelReducer(namespace)
  return function reduce(state, action) {
    return reducer.reduce(state, action)
  }
}

