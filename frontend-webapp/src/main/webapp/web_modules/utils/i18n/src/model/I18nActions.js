/**
 * LICENSE_PLACEHOLDER
 **/
import forOwn from 'lodash/forOwn'
import includes from 'lodash/includes'
import I18nSelectors from './I18nSelectors'

export const SET_LOCALE = 'SET_LOCALE'
export function setLocale(locale) {
  return {
    type: SET_LOCALE,
    locale,
  }
}

export const SET_LOCALE_MSG = 'SET_LOCALE_MSG'
export function setLocaleMessages(messagesDir, messages) {
  return {
    type: SET_LOCALE_MSG,
    messagesDir,
    messages,
  }
}

function manageException(messagesDir, locale, e) {
  console.error('messagesDir', messagesDir, 'locale', locale, e, e.stack)
  throw new Error('Failed to access to i18n file. Are you sure the path is correct ?')
}

export function updateMessages(messagesDir, locale) {
  return (dispatch, getState) => {
    require.ensure([], (require) => {
      let messages
      try {
        // eslint-disable-next-line import/no-dynamic-require
        messages = require(`../../../../${messagesDir}/messages.${locale}.i18n.js`)
      } catch (e) {
        if (includes(locale)) {
          try {
            const langFallback = locale.split('-')[0]
            // eslint-disable-next-line import/no-dynamic-require
            messages = require(`../../../../${messagesDir}/messages.${langFallback}.i18n`)
          } catch (exceptionOnFallback) {
            manageException(messagesDir, locale, exceptionOnFallback)
          }
        } else {
          manageException(messagesDir, locale, e)
        }
      }
      dispatch(setLocaleMessages(messagesDir, messages))
    })
  }
}

export function updateLocale(locale) {
  return (dispatch, getState) => (
    dispatch(setLocale(locale)).then(() => {
      const messages = I18nSelectors.getMessages(getState())
      // Update all messages
      forOwn(messages, (m, messagesDir) => {
        dispatch(updateMessages(messagesDir, locale))
      })
    })
  )
}
