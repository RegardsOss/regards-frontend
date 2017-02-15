/**
 * LICENSE_PLACEHOLDER
 **/
import { find } from 'lodash'
import ThemeActions from './ThemeActions'
import setCurrentTheme from './setCurrentTheme'

// You can define asynchronous action creators that return functions.
// We call such action creators "thunks":

export default function bootstrapThemes() {
  // Redux Thunk will inject dispatch here:
  return dispatch => Promise.resolve(ThemeActions.fetchEntityList()).then(
    response => dispatch(setCurrentTheme(find(response.content.items, item => item.active))),
  )
}
