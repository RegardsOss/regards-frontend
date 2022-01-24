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
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { UIDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import AppTitleComponent from '../../../../src/components/user/title/AppTitleComponent'
import styles from '../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test AppTitleComponent
 * @author Raphaël Mechali
 */
describe('[Menu] Testing AppTitleComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AppTitleComponent)
  })
  it('should render correctly in admin app', () => {
    const props = {
      displayMode: UIDomain.MENU_DISPLAY_MODES_ENUM.ADMIN_PROJECT,
      project: 'any',
    }
    const enzymeWrapper = shallow(<AppTitleComponent {...props} />, { context })
    assert.include(enzymeWrapper.debug(), 'menu.admin.project.title', 'There should be the right title key')
  })
  it('should render correctly in admin instance app', () => {
    const props = {
      displayMode: UIDomain.MENU_DISPLAY_MODES_ENUM.ADMIN_INSTANCE,
      project: 'any',
    }
    const enzymeWrapper = shallow(<AppTitleComponent {...props} />, { context })
    assert.include(enzymeWrapper.debug(), 'menu.admin.instance.title', 'There should be the right title key')
  })
})
