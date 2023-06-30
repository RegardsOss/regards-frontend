/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { assert, expect } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import routes from '../src/router'
import ThemeFormAdapter from '../src/containers/ThemeFormAdapter'
import ThemeListAdapter from '../src/containers/ThemeListAdapter'

describe('[ADMIN UI THEME MANAGEMENT] Testing admin theme board router', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should return the correct value', () => {
    assert.isOk(routes)
    expect(routes.childRoutes).to.have.length(3)
    expect(routes.childRoutes[0].path).to.eq(':themeId/:mode')
    expect(routes.childRoutes[1].path).to.eq('create')
    expect(routes.childRoutes[2].path).to.eq('list')
  })

  it('should return theme edition / duplication form', (done) => {
    routes.childRoutes[0].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(ThemeFormAdapter)
      done()
    })
  })
  it('should return theme creation form', (done) => {
    routes.childRoutes[1].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(ThemeFormAdapter)
      done()
    })
  })
  it('should return themes list', (done) => {
    routes.childRoutes[2].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(ThemeListAdapter)
      done()
    })
  })
})
