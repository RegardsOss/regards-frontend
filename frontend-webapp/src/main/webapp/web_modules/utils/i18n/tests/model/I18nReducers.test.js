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
import { expect } from 'chai'
import reducer from '../../src/model/I18nReducers'
import { SET_LOCALE, SET_LOCALE_MSG } from '../../src/model/I18nActions'

describe('[I18N] Testing i18n reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.eql({
      locale: 'en',
      messages: {},
    })
  })

  it('should handle locale update', () => {
    const action = {
      type: SET_LOCALE,
      locale: 'fr',
    }
    const someMessages = {
      'common/i18n/tests/messages/test1': { message1: 'premier message' },
      'common/i18n/tests/messages/test2': { message2: 'deuxieme message' },
    }
    const initState = {
      locale: 'en',
      messages: someMessages,
    }
    const expectedState = {
      locale: 'fr',
      messages: someMessages,
    }
    expect(reducer(initState, action)).to.eql(expectedState)
  })


  it('should handle messages update', () => {
    const action = {
      type: SET_LOCALE_MSG,
      messagesDir: 'common/i18n/tests/messages/test1',
      messages: { message1: 'nouveau premier message' },
    }
    const initState = {
      locale: 'fr',
      messages: {
        'common/i18n/tests/messages/test1': { message1: 'premier message' },
        'common/i18n/tests/messages/test2': { message2: 'deuxieme message' },
      },
    }
    const expectedState = {
      locale: 'fr',
      messages: {
        'common/i18n/tests/messages/test1': { message1: 'nouveau premier message' },
        'common/i18n/tests/messages/test2': { message2: 'deuxieme message' },
      },
    }
    expect(reducer(initState, action)).to.eql(expectedState)
  })

  it('should handle new locales messages success', () => {
    const action = {
      type: SET_LOCALE_MSG,
      messagesDir: 'common/i18n/tests/messages/test3',
      messages: { message3: 'troisieme message' },
    }
    const initState = {
      locale: 'fr',
      messages: {
        'common/i18n/tests/messages/test1': { message1: 'premier message' },
        'common/i18n/tests/messages/test2': { message2: 'deuxieme message' },
      },
    }
    const expectedState = {
      locale: 'fr',
      messages: {
        'common/i18n/tests/messages/test1': { message1: 'premier message' },
        'common/i18n/tests/messages/test2': { message2: 'deuxieme message' },
        'common/i18n/tests/messages/test3': { message3: 'troisieme message' },
      },
    }
    expect(reducer(initState, action)).to.eql(expectedState)
  })
})
