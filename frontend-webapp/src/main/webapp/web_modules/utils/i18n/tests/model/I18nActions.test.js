import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { expect } from 'chai'
import { SET_LOCALE, SET_LOCALE_MSG, updateLocale } from '../../src/model/I18nActions' // You can use any testing library

const { apiMiddleware } = require('redux-api-middleware')

const middlewares = [thunk, apiMiddleware]
const mockStore = configureStore(middlewares)

describe('[COMMON] Testing i18n actions', () => {
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
                .then(() => { // return of async actions
                  expect(store.getActions()).to.eql(expectedActions)
                })
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
      .then(() => { // return of async actions
        expect(store.getActions()).to.eql(expectedActions)
      })
  })
})
