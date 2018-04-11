/**
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import Routes from '../src/router'
import DynamicContentContainer from '../src/containers/DynamicContentContainer'
import RedirectContainer from '../src/containers/RedirectContainer'

describe('[USER] Testing router', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should return the correct value', () => {
    assert.isDefined(Routes)
    expect(Routes.childRoutes).to.have.length(2)
    expect(Routes.childRoutes[0].path).to.eq('modules/:moduleId')
    expect(Routes.childRoutes[1].path).to.eq('redirect')
  })
  it('modules should return DynamicContentContainer', (done) => {
    Routes.childRoutes[0].getComponent(undefined, (smth, component) => {
      expect(component.content).to.eq(DynamicContentContainer)
      done()
    })
  })
  it('redirect should return RedirectContainer', (done) => {
    Routes.childRoutes[1].getComponent(undefined, (smth, component) => {
      expect(component.content).to.eq(RedirectContainer)
      done()
    })
  })
})
