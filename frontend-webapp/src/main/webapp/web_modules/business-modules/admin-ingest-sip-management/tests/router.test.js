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
import SIPSessionListContainer from '../src/containers/SIPSessionListContainer'
import SIPListContainer from '../src/containers/SIPListContainer'
import SIPSubmissionFormContainer from '../src/containers/SIPSubmissionFormContainer'
import SIPSubmissionSummaryContainer from '../src/containers/SIPSubmissionSummaryContainer'

/**
 * @author Sébastien Binda
 */
describe('[ADMIN INGEST SIP MANAGEMENT] Testing router', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should return the correct value', () => {
    assert.isNotNull(Routes)
    expect(Routes.childRoutes).to.have.length(5)
    expect(Routes.childRoutes[0].path).to.eq('session')
    expect(Routes.childRoutes[1].path).to.eq(':session/list')
    expect(Routes.childRoutes[2].path).to.eq(':session/:sip/history')
    expect(Routes.childRoutes[3].path).to.eq('submission')
    expect(Routes.childRoutes[4].path).to.eq('submission-summary')
  })
  it('session should return SIPSessionContainer', (done) => {
    Routes.childRoutes[0].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(SIPSessionListContainer)
      done()
    })
  })
  it(':session/list should return SIPListContainer', (done) => {
    Routes.childRoutes[1].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(SIPListContainer)
      done()
    })
  })
  it(':session/:sip/history should return SIPListContainer', (done) => {
    Routes.childRoutes[2].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(SIPListContainer)
      done()
    })
  })
  it(':submission should return SIPsubmissionFormContainer', (done) => {
    Routes.childRoutes[3].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(SIPSubmissionFormContainer)
      done()
    })
  })
  it('submission-summary should return SIPsubmissionSummaryContainer', (done) => {
    Routes.childRoutes[4].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(SIPSubmissionSummaryContainer)
      done()
    })
  })
})
