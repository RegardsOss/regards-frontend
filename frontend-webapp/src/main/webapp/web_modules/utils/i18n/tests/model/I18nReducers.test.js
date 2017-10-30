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
import { SET_LOCALE } from '../../src/model/I18nActions'

describe('[I18N] Testing i18n reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.eql({
      locale: 'en',
    })
  })
  it('should handle locale update', () => {
    const action = {
      type: SET_LOCALE,
      locale: 'fr',
    }
    const initState = {
      locale: 'en',
    }
    const expectedState = {
      locale: 'fr',
    }
    expect(reducer(initState, action)).to.eql(expectedState)
  })
})
