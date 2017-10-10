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
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { expect } from 'chai'
import { SET_LOCALE, SET_LOCALE_MSG, updateLocale } from '../../src/model/I18nActions' // You can use any testing library

const { apiMiddleware } = require('redux-api-middleware')

const middlewares = [thunk, apiMiddleware]
const mockStore = configureStore(middlewares)

describe('[I18N] Testing i18n actions', () => {
  // Test dégradé dans le cas ou le serveur renvoie un erreur
  it('Test actions creation for internationalization language change', () => {
    const store = mockStore({
      common: {
        i18n: {
          locale: 'en',
          messages: {
            'utils/i18n/tests/messages/test1': {},
            'utils/i18n/tests/messages/test2': {},
          },
        },
      },
    })

    const setLocaleAction = {
      type: SET_LOCALE,
      locale: 'en',
    }

    const setLocaleMessage = {
      type: SET_LOCALE_MSG,
      messagesDir: 'utils/i18n/tests/messages/test1',
      messages: { message1: 'first message' },
    }

    const setLocaleMessage2 = {
      type: SET_LOCALE_MSG,
      messagesDir: 'utils/i18n/tests/messages/test2',
      messages: { message2: 'second message' },
    }

    const expectedActions = [setLocaleAction, setLocaleMessage, setLocaleMessage2]

    return store.dispatch(updateLocale('en'))
      .then(() =>  // return of async actions
        expect(store.getActions()).to.eql(expectedActions))
  }).timeout(20000)

  it('Test fallback en-US --> en', () => {
    const store = mockStore({
      common: {
        i18n: {
          locale: 'en',
          messages: {
            'utils/i18n/tests/messages/test1': {},
            'utils/i18n/tests/messages/test2': {},
          },
        },
      },
    })


    const setLocaleAction = {
      type: SET_LOCALE,
      locale: 'en-US',
    }

    const setLocaleMessage = {
      type: SET_LOCALE_MSG,
      messagesDir: 'utils/i18n/tests/messages/test1',
      messages: { message1: 'first message' },
    }

    const setLocaleMessage2 = {
      type: SET_LOCALE_MSG,
      messagesDir: 'utils/i18n/tests/messages/test2',
      messages: { message2: 'second message' },
    }

    const expectedActions = [setLocaleAction, setLocaleMessage, setLocaleMessage2]

    return store.dispatch(updateLocale('en-US'))
      .then(() =>  // return of async actions
        expect(store.getActions()).to.eql(expectedActions))
  })
})
