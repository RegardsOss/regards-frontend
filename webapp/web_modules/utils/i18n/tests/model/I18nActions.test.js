/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { apiMiddleware } from 'redux-api-middleware'
import { SET_LOCALE, setLocale } from '../../src/model/I18nActions'

const middlewares = [thunk, apiMiddleware]
const mockStore = configureStore(middlewares)

describe('[COMMON] Testing i18n actions', () => {
  it('Test actions creation for internationalization language change', () => {
    const store = mockStore({
      common: {
        i18n: {
          locale: 'en',
        },
      },
    })

    const setLocaleAction = {
      type: SET_LOCALE,
      locale: 'fr',
    }

    const expectedActions = [setLocaleAction]

    store.dispatch(setLocale('fr'))
    expect(store.getActions()).to.eql(expectedActions)
  }).timeout(20000)
})
