import { pickBy } from "lodash"

export const deleteEntityReducer = (state: any, removeAction: any) => (
  Object.assign({}, state, {
    items: pickBy(state.items, (value: string, key: string) => key !== removeAction.id),
    ids: state.ids.filter((id: string) => id !== removeAction.id)
  })
)
