/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import OAISFeatureManagerContainer from '../src/containers/OAISFeatureManagerContainer'

/**
 * @author Léo Mieulet
 */
describe('[OAIS MANAGEMENT] Testing router', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should return the correct value', () => {
    assert.isNotNull(Routes)
    expect(Routes.childRoutes).to.have.length(2)
    expect(Routes.childRoutes[0].path).to.eq('sip/submission')
    expect(Routes.childRoutes[1].path).to.eq('featureManager')
    // expect(Routes.childRoutes[1].path).to.eq('sip/list')
    // expect(Routes.childRoutes[2].path).to.eq('sip/:sip/history')
    // expect(Routes.childRoutes[4].path).to.eq('sip/submission-summary')
  })
  it('featureManager should return OAISFeatureManagerContainer', (done) => {
    Routes.childRoutes[1].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(OAISFeatureManagerContainer)
      done()
    })
  })
  // it('sip/list should return SIPListContainer', (done) => {
  //   Routes.childRoutes[1].getComponents(undefined, (smth, component) => {
  //     expect(component.content).to.eq(SIPListContainer)
  //     done()
  //   })
  // })
  // it('sip/:sip/history should return SIPListContainer', (done) => {
  //   Routes.childRoutes[2].getComponents(undefined, (smth, component) => {
  //     expect(component.content).to.eq(SIPListContainer)
  //     done()
  //   })
  // })
  // it('sip/submission should return SIPSubmissionFormContainer', (done) => {
  //   Routes.childRoutes[3].getComponents(undefined, (smth, component) => {
  //     expect(component.content).to.eq(SIPSubmissionFormContainer)
  //     done()
  //   })
  // })
  // it('sip/submission-summary should return SIPSubmissionSummaryContainer', (done) => {
  //   Routes.childRoutes[4].getComponents(undefined, (smth, component) => {
  //     expect(component.content).to.eq(SIPSubmissionSummaryContainer)
  //     done()
  //   })
  // })
})
