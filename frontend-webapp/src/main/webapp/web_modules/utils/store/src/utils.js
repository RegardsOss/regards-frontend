import { pickBy } from 'lodash'

export const deleteEntityReducer = (state, removeAction) => (
  Object.assign({}, state, {
    items: pickBy(state.items, (value, key) => key !== removeAction.id),
    ids: state.ids.filter(id => id !== removeAction.id),
  })
)
