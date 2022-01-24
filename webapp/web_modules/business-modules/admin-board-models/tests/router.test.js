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
import { assert, expect } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import { attributeModelDataManagementRouter } from '@regardsoss/admin-data-attributemodel-management'
import { fragmentDataManagementRouter } from '@regardsoss/admin-data-fragment-management'
import { modelDataManagementRouter } from '@regardsoss/admin-data-model-management'
import { modelAttributeDataManagementRouter } from '@regardsoss/admin-data-modelattribute-management'
import { attributePluginDataManagementRouter } from '@regardsoss/admin-data-attribute-plugins-management'
import Routes from '../src/router'
import ModuleContainer from '../src/components/ModuleContainer'

describe('[ADMIN DATA MANAGEMENT] Testing data board router', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should return the correct value', () => {
    assert.isNotNull(Routes)
    expect(Routes.childRoutes).to.have.length(6)
    expect(Routes.childRoutes[0].path).to.eq('board')
    expect(Routes.childRoutes[1].path).to.eq('model')
    expect(Routes.childRoutes[2].path).to.eq('model-attribute')
    expect(Routes.childRoutes[3].path).to.eq('attribute/model')
    expect(Routes.childRoutes[4].path).to.eq('fragment')
    expect(Routes.childRoutes[5].path).to.eq('calculationplugins')
  })

  it('should return BoardContainer', (done) => {
    Routes.childRoutes[0].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(ModuleContainer)
      done()
    })
  })
  it('should return modelDataManagementRouter', (done) => {
    Routes.childRoutes[1].getChildRoutes(undefined, (smth, component) => {
      expect(component[0]).to.eq(modelDataManagementRouter)
      done()
    })
  })

  it('should return modelAttributeDataManagementRouter', (done) => {
    Routes.childRoutes[2].getChildRoutes(undefined, (smth, component) => {
      expect(component[0]).to.eq(modelAttributeDataManagementRouter)
      done()
    })
  })
  it('should return dataManagementRouter', (done) => {
    Routes.childRoutes[3].getChildRoutes(undefined, (smth, component) => {
      expect(component[0]).to.eq(attributeModelDataManagementRouter)
      done()
    })
  })
  it('should return fragmentDataManagementRouter', (done) => {
    Routes.childRoutes[4].getChildRoutes(undefined, (smth, component) => {
      expect(component[0]).to.eq(fragmentDataManagementRouter)
      done()
    })
  })
  it('should return attributePluginDataManagementRouter', (done) => {
    Routes.childRoutes[5].getChildRoutes(undefined, (smth, component) => {
      expect(component[0]).to.eq(attributePluginDataManagementRouter)
      done()
    })
  })
})
