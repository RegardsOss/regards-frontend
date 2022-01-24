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
import { uiSettingsRouter } from '@regardsoss/admin-ui-settings-management'
import { moduleUIRouter } from '@regardsoss/admin-ui-module-management'
import { pluginUIRouter } from '@regardsoss/admin-ui-plugin-management'
import { serviceUIRouter } from '@regardsoss/admin-ui-service-management'
import { themeUIRouter } from '@regardsoss/admin-ui-theme-management'
import { layoutUIRouter } from '@regardsoss/admin-ui-layout-management'
import BoardUIContainer from '../src/containers/BoardUIContainer'
import Routes from '../src/router'

describe('[ADMIN UI MANAGEMENT] Testing UI settings board router', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should return the correct value', () => {
    assert.isNotNull(Routes)
    expect(Routes.childRoutes).to.have.length(7)
    expect(Routes.childRoutes[0].path).to.eq('board')
    expect(Routes.childRoutes[1].path).to.eq('settings')
    expect(Routes.childRoutes[2].path).to.eq('layout')
    expect(Routes.childRoutes[3].path).to.eq('theme')
    expect(Routes.childRoutes[4].path).to.eq('module')
    expect(Routes.childRoutes[5].path).to.eq('plugin')
    expect(Routes.childRoutes[6].path).to.eq('service')
  })
  it('board should return BoardUIContainer', (done) => {
    Routes.childRoutes[0].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(BoardUIContainer)
      done()
    })
  })
  it('settings should return uiSettingsRouter', (done) => {
    Routes.childRoutes[1].getChildRoutes(undefined, (smth, component) => {
      expect(component[0]).to.eq(uiSettingsRouter)
      done()
    })
  })
  it('layout should return layoutUIRouter', (done) => {
    Routes.childRoutes[2].getChildRoutes(undefined, (smth, component) => {
      expect(component[0]).to.eq(layoutUIRouter)
      done()
    })
  })
  it('theme should return themeUIRouter', (done) => {
    Routes.childRoutes[3].getChildRoutes(undefined, (smth, component) => {
      expect(component[0]).to.eq(themeUIRouter)
      done()
    })
  })
  it('module should return moduleUIRouter', (done) => {
    Routes.childRoutes[4].getChildRoutes(undefined, (smth, component) => {
      expect(component[0]).to.eq(moduleUIRouter)
      done()
    })
  })
  it('plugin should return pluginUIRouter', (done) => {
    Routes.childRoutes[5].getChildRoutes(undefined, (smth, component) => {
      expect(component[0]).to.eq(pluginUIRouter)
      done()
    })
  })
  it('service should return serviceUIRouter', (done) => {
    Routes.childRoutes[6].getChildRoutes(undefined, (smth, component) => {
      expect(component[0]).to.eq(serviceUIRouter)
      done()
    })
  })
})
