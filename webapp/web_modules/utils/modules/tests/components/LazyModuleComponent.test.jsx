/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { shallow } from 'enzyme'
import { expect } from 'chai'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import { moduleContainer } from '@regardsoss-modules/authentication'
import { I18nProvider } from '@regardsoss/i18n'
import { ModuleStyleProvider } from '@regardsoss/theme'
import LazyModuleComponent from '../../src/components/LazyModuleComponent'
import modulesManager from '../../src/ModulesManager'

/**
 * Tests for LazyModuleComponent
 * @author Sébastien Binda
 */
describe('[MODULES] Testing LazyModuleComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  const context = buildTestContext()

  // This test can last ~6s so we override the timeout duration
  it('Should render correctly an application layout with ApplicationLayout', (done) => {
    let wrapper = null
    const props = {
      appName: 'testApp',
      project: 'test',
      module: {
        type: modulesManager.AllDynamicModuleTypes.AUTHENTICATION,
        active: true,
      },
      onLoadAction: () => {
        try {
          wrapper.update()
          expect(wrapper.find(moduleContainer)).to.have.length(1)
          expect(wrapper.find(ModuleStyleProvider)).to.have.length(1)
          expect(wrapper.find(I18nProvider)).to.have.length(1)
          done()
        } catch (e) {
          done(e)
        }
      },

    }
    wrapper = shallow(<LazyModuleComponent {...props} />, { context })
  }).timeout(60000)

  it('Should not render a disabled module', (done) => {
    let wrapper = null
    const props = {
      appName: 'testApp',
      project: 'test',
      module: {
        type: modulesManager.AllDynamicModuleTypes.AUTHENTICATION,
        active: false,
      },
      onLoadAction: () => {
        try {
          wrapper.update()
          expect(wrapper.find(moduleContainer)).to.have.length(0)
          expect(wrapper.find(ModuleStyleProvider)).to.have.length(0)
          expect(wrapper.find(I18nProvider)).to.have.length(0)
          done()
        } catch (e) {
          done(e)
        }
      },
    }
    wrapper = shallow(<LazyModuleComponent {...props} />, { context })
  }).timeout(60000)
})
