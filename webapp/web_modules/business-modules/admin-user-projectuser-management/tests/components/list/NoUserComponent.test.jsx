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
import { NoContentComponent } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import NoUserComponent from '../../../src/components/list/NoUserComponent'
import styles from '../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test NoUserComponent
 * @author Raphaël Mechali
 */
describe('[ADMIN PROJECTUSER MANAGEMENT] Testing NoUserComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(NoUserComponent)
  })
  it('should render correctly when there is no filter', () => {
    const props = {
      hasFilter: false,
    }
    const enzymeWrapper = shallow(<NoUserComponent {...props} />, { context })
    const noContentWrapper = enzymeWrapper.find(NoContentComponent)
    assert.lengthOf(noContentWrapper, 1)
    testSuiteHelpers.assertWrapperProperties(noContentWrapper, {
      titleKey: 'projectUser.list.table.no.content.title',
      messageKey: 'projectUser.list.table.no.content.without.filter.message',
    })
  })
  it('should render correctly when there is a filter', () => {
    const props = {
      hasFilter: true,
    }
    const enzymeWrapper = shallow(<NoUserComponent {...props} />, { context })
    const noContentWrapper = enzymeWrapper.find(NoContentComponent)
    assert.lengthOf(noContentWrapper, 1)
    testSuiteHelpers.assertWrapperProperties(noContentWrapper, {
      titleKey: 'projectUser.list.table.no.content.title',
      messageKey: 'projectUser.list.table.no.content.with.filter.message',
    })
  })
})
