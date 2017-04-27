import { TABLE_REDUX_STORE_NAME } from './TableReducers'

/**
 * Table selectors for entities selection
 *
 * @author Sébastien Binda
 */
const getTableSelectionMode = (state, tableName) => {
  if (state && state[TABLE_REDUX_STORE_NAME] && state[TABLE_REDUX_STORE_NAME][tableName]) {
    return state[TABLE_REDUX_STORE_NAME][tableName].selectMode
  }
  return undefined
}

const getToggledElements = (state, tableName) => {
  if (state && state[TABLE_REDUX_STORE_NAME] && state[TABLE_REDUX_STORE_NAME][tableName]) {
    return state[TABLE_REDUX_STORE_NAME][tableName].toggledElements
  }
  return undefined
}

export default {
  getTableSelectionMode,
  getToggledElements,
}
