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
import { orderRouter } from '@regardsoss/admin-order-management'
import { processingRouter } from '@regardsoss/admin-processing-management'
import { deliveryManagementRouter } from '@regardsoss/admin-delivery-management'
import Routes from '../src/router'
import ModuleContainer from '../src/components/ModuleContainer'

describe('[ADMIN BOARD COMMANDS] Testing acquisition board router', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should return the correct value', () => {
    assert.isNotNull(Routes)
    expect(Routes.childRoutes).to.have.length(4)
    expect(Routes.childRoutes[0].path).to.eq('board')
    expect(Routes.childRoutes[1].path).to.eq('history')
    expect(Routes.childRoutes[2].path).to.eq('processing')
    expect(Routes.childRoutes[3].path).to.eq('delivery')
  })

  it('should return BoardContainer', (done) => {
    Routes.childRoutes[0].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(ModuleContainer)
      done()
    })
  })
  it('should return orderRouter', (done) => {
    Routes.childRoutes[1].getChildRoutes(undefined, (smth, component) => {
      expect(component[0]).to.eq(orderRouter)
      done()
    })
  })
  it('should return processingRouter', (done) => {
    Routes.childRoutes[2].getChildRoutes(undefined, (smth, component) => {
      expect(component[0]).to.eq(processingRouter)
      done()
    })
  })
  it('should return deliveryManagementRouter', (done) => {
    Routes.childRoutes[3].getChildRoutes(undefined, (smth, component) => {
      expect(component[0]).to.eq(deliveryManagementRouter)
      done()
    })
  })
})
