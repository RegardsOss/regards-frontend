import configureStore from "redux-mock-store"
const {apiMiddleware} = require('redux-api-middleware')
import thunk from "redux-thunk"
import { expect } from "chai"
import { SET_LOCALE, SET_LOCALE_MSG, updateLocale } from "../src/I18nActions" // You can use any testing library

const middlewares = [thunk, apiMiddleware]
const mockStore = configureStore(middlewares)

describe('[COMMON] Testing i18n actions', () => {

  // Test dégradé dans le cas ou le serveur renvoie un erreur
  it('Test actions creation for internazionalisation language change', () => {

    const store = mockStore({
      common: {
        i18n: {
          locale: 'fr',
          messages: [{
            messagesDir: 'utils/i18n/tests/messages/test1'
          }, {
            messagesDir: 'utils/i18n/tests/messages/test2'
          }]
        }
      }
    })

    const setLocaleAction: any = {
      type: SET_LOCALE,
      locale: 'en'
    }

    const setLocaleMessage: any = {
      type: SET_LOCALE_MSG,
      messagesDir: 'utils/i18n/tests/messages/test1',
      messages: {'message1': 'first message'}
    }

    const setLocaleMessage2: any = {
      type: SET_LOCALE_MSG,
      messagesDir: 'utils/i18n/tests/messages/test2',
      messages: {'message2': 'second message'}
    }

    const expectedActions = [setLocaleAction, setLocaleMessage, setLocaleMessage2]

    return store.dispatch(updateLocale('en'))
                .then(() => { // return of async actions
                  expect(store.getActions()).to.eql(expectedActions)
                })
  })

  it('Test fallback en-US --> en', () => {

    const store = mockStore({
      common: {
        i18n: {
          locale: 'en',
          messages: [{
            messagesDir: 'utils/i18n/tests/messages/test1'
          }, {
            messagesDir: 'utils/i18n/tests/messages/test2'
          }]
        }
      }
    })



    const setLocaleAction: any = {
      type: SET_LOCALE,
      locale: 'en-US'
    }

    const setLocaleMessage: any = {
      type: SET_LOCALE_MSG,
      messagesDir: 'utils/i18n/tests/messages/test1',
      messages: {'message1': 'first message'}
    }

    const setLocaleMessage2: any = {
      type: SET_LOCALE_MSG,
      messagesDir: 'utils/i18n/tests/messages/test2',
      messages: {'message2': 'second message'}
    }

    const expectedActions = [setLocaleAction, setLocaleMessage, setLocaleMessage2]

    return store.dispatch(updateLocale('en-US'))
        .then(() => { // return of async actions
          expect(store.getActions()).to.eql(expectedActions)
        })
  })

})
