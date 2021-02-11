/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import currentThemeReducer from '../../src/model/reducers/currentThemeReducer'

describe('[COMMON THEME] Testing current theme reducer', () => {
  it('should return the initial state', () => {
    expect(currentThemeReducer(undefined, {})).to.eql({})
  })

  it('should set the current theme', () => {
    const action = {
      type: 'SET_CURRENT_THEME',
      themeId: 1,
    }
    const initState = 0
    const expectedState = 1
    expect(currentThemeReducer(initState, action)).to.eql(expectedState)
  })
})
