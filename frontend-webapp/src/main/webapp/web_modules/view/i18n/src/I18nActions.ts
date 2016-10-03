// For tests we need to define require.ensure method if not defined
if (typeof require.ensure !== `function`) require.ensure = (d: any, c: any) => c(require)
import { LocaleMessagesStore } from "./I18nTypes"

export const SET_LOCALE = 'SET_LOCALE'
export function setLocale (locale: string): Object {
  return {
    type: SET_LOCALE,
    locale: locale
  }
}

export const SET_LOCALE_MSG = 'SET_LOCALE_MSG'
export function setLocaleMessages (messagesDir: string, messages: Object): Object {
  return {
    type: SET_LOCALE_MSG,
    messagesDir: messagesDir,
    messages: messages
  }
}

export function updateMessages (messagesDir: string, locale: string): Object {

  return (dispatch: any, getState: any) => {
    require.ensure([], function (require: any): any {
      // Warning de compilation
      let messages: any
      try {
        messages = require("../../../" + messagesDir + '/messages.' + locale + ".i18n")
        dispatch(setLocaleMessages(messagesDir, messages.default))
      } catch (e) {
        console.error("messagesDir", messagesDir, "locale", locale, e, e.stack)
        throw new Error("Failed to access to i18n file. Are you sure the path is correct ?")
      }
    })
  }
}

export function updateLocale (locale: string): any {
  return (dispatch: any, getState: any) => {
    return dispatch(setLocale(locale)).then(() => {
      // Update all messages
      let messages: Array<LocaleMessagesStore> = getState().common.i18n.messages
      messages.map((message) => dispatch(updateMessages(message.messagesDir, locale)))
    })

  }
}
