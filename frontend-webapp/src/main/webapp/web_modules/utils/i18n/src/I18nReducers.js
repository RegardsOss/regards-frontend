import { SET_LOCALE, SET_LOCALE_MSG } from './I18nActions'
import { I18nStore, LocaleMessagesStore } from './I18nTypes'

// If navigator is not defined, set the locale to english
let navigator
if (typeof navigator === 'undefined') {
  navigator = { language: 'en' }
}


export default (state = {
  locale: navigator.language,
  messages: [],
}, action) => {
  switch (action.type) {
    // Running fetch plugins from server
    case SET_LOCALE:
      return Object.assign({}, state, { locale: action.locale })
    case SET_LOCALE_MSG:
      // Duplicate state
      const newState = Object.assign({}, state)
      const newMessages = Object.assign([], state.messages)
      // Find message associated to the messagesDir of the action
      const localeMessages = newMessages.find(message => message.messagesDir === action.messagesDir)
      // If the messageDir already define, juste update the messages with the new ones
      if (localeMessages) {
        localeMessages.messages = action.messages
      } else {
        // Else, create a new messagedir object
        newMessages.push({
          messagesDir: action.messagesDir,
          messages: action.messages,
        })
      }
      newState.messages = newMessages
      return newState
    default:
      return state
  }
}
