/**
 * LICENSE_PLACEHOLDER
 **/
import { isUndefined } from 'lodash'
import { SET_LOCALE, SET_LOCALE_MSG } from './I18nActions'

// If navigator is not defined, set the locale to english
let navigator
if (isUndefined(navigator)) {
  navigator = { language: 'en' }
}

function mergeCurrentLocaleMessagesWithNewOnes(state, action) {
  const newMessages = Object.assign({}, state.messages, { [action.messagesDir]: action.messages })
  return Object.assign({}, state, { messages: newMessages })
}
export default (state = {
  locale: navigator.language,
  messages: {},
}, action) => {
  switch (action.type) {
    // Running fetch plugins from server
    case SET_LOCALE:
      return Object.assign({}, state, { locale: action.locale })
    case SET_LOCALE_MSG:
      return mergeCurrentLocaleMessagesWithNewOnes(state, action)
    default:
      return state
  }
}
