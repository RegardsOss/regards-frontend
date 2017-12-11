/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
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
        if (includes(locale, '-')) {
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
