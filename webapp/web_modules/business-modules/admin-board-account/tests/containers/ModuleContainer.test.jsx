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
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { I18nProvider } from '@regardsoss/i18n'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import AccountsBoardComponent from '../../src/components/AccountsBoardComponent'
import ModuleContainer from '../../src/containers/ModuleContainer'

const context = buildTestContext()

/**
 * Test ModuleContainer
 * @author Raphaël Mechali
 */
describe('[ADMIN BOARD ACCOUNT] Testing ModuleContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ModuleContainer)
  })
  it('should render correctly', () => {
    const enzymeWrapper = shallow(<ModuleContainer />, { context })
    const i18nProviderWrapper = enzymeWrapper.find(I18nProvider)
    assert.lengthOf(i18nProviderWrapper, 1, 'Container should provide messages to its main component')
    const componentWrapper = enzymeWrapper.find(AccountsBoardComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the main component')
  })
})
