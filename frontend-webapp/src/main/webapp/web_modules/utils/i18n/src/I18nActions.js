// For tests we need to define require.ensure method if not defined
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);
import { LocaleMessagesStore } from './I18nTypes';

export const SET_LOCALE = 'SET_LOCALE';
export function setLocale(locale) {
  return {
    type: SET_LOCALE,
    locale,
  };
}

export const SET_LOCALE_MSG = 'SET_LOCALE_MSG';
export function setLocaleMessages(messagesDir, messages) {
  return {
    type: SET_LOCALE_MSG,
    messagesDir,
    messages,
  };
}

export function updateMessages(messagesDir, locale) {
  return (dispatch, getState) => {
    require.ensure([], (require) => {
      // Warning de compilation
      let messages;
      try {
        messages = require(`../../../${messagesDir}/messages.${locale}.i18n`);
      } catch (e) {
        if (locale.indexOf("-") > -1) {
          try {
            let langFallback = locale.split("-")[0];
            messages = require("../../../" + messagesDir + '/messages.' + langFallback + ".i18n")
          } catch (exceptionOnFallback) {
            manageException(messagesDir, locale, exceptionOnFallback);
          }
        } else {
          manageException(messagesDir, locale, e);
        }
      }
      dispatch(setLocaleMessages(messagesDir, messages))
    });
  };
}

function manageException(messagesDir, locale, e) {
  console.error("messagesDir", messagesDir, "locale", locale, e, e.stack)
  throw new Error("Failed to access to i18n file. Are you sure the path is correct ?")
}

export function updateLocale(locale) {
  return (dispatch, getState) => {
    return dispatch(setLocale(locale)).then(() => {
      // Update all messages
      const messages = getState().common.i18n.messages;
      messages.map(message => dispatch(updateMessages(message.messagesDir, locale)));
    });
  };
}
