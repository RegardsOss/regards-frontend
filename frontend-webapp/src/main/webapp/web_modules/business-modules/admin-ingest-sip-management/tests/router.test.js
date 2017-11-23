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
import { assert, expect } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import Routes from '../src/router'
import SIPSessionContainer from '../src/containers/SIPSessionContainer'
import SIPListContainer from '../src/containers/SIPListContainer'
import SIPSubmitionFormContainer from '../src/containers/SIPSubmitionFormContainer'
import SIPSubmitionSummaryContainer from '../src/containers/SIPSubmitionSummaryContainer'

/**
 * @author Sébastien Binda
 */
describe('[ADMIN INGEST SIP MANAGEMENT] Testing router', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should return the correct value', () => {
    assert.isNotNull(Routes)
    expect(Routes.childRoutes).to.have.length(4)
    expect(Routes.childRoutes[0].path).to.eq('session')
    expect(Routes.childRoutes[1].path).to.eq('list')
    expect(Routes.childRoutes[2].path).to.eq('submition')
    expect(Routes.childRoutes[3].path).to.eq('submition-summary')
  })
  it('session should return SIPSessionContainer', (done) => {
    Routes.childRoutes[0].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(SIPSessionContainer)
      done()
    })
  })
  it('list should return SIPListContainer', (done) => {
    Routes.childRoutes[1].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(SIPListContainer)
      done()
    })
  })
  it(':submition should return SIPSubmitionFormContainer', (done) => {
    Routes.childRoutes[2].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(SIPSubmitionFormContainer)
      done()
    })
  })
  it('submition-summary should return SIPSubmitionSummaryContainer', (done) => {
    Routes.childRoutes[3].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(SIPSubmitionSummaryContainer)
      done()
    })
  })
})
