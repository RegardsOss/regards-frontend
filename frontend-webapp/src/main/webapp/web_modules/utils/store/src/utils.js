import { pickBy } from 'lodash'

const deleteEntityReducer = (state, removeAction) => (
  Object.assign({}, state, {
    items: pickBy(state.items, (value, key) => key !== removeAction.id),
    ids: state.ids.filter(id => id !== removeAction.id),
  })
)

export default deleteEntityReducer
