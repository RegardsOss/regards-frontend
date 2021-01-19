/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import ObjectsCountCellRenderComponent from '../../../src/components/user/ObjectsCountCellRenderComponent'
import DuplicatedObjectsMessageComponents from '../../../src/components/user/options/DuplicatedObjectsMessageComponents'
import styles from '../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test ObjectsCountCellRenderComponent
 * @author Raphaël Mechali
 */
describe('[Order Cart] Testing ObjectsCountCellRenderComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ObjectsCountCellRenderComponent)
  })
  it('should render correctly and provide rigth data to DuplicatedObjectsMessageComponents', () => {
    const props = {
      effectiveObjectsCount: 55,
      totalObjectsCount: 55,
      onShowDuplicatedMessage: () => { },
    }
    const enzymeWrapper = shallow(<ObjectsCountCellRenderComponent {...props} />, { context })
    // 1 - There should be the count in render
    assert.include(enzymeWrapper.debug(), props.effectiveObjectsCount.toString(), 'The effective objects count should be shown')
    // 2 - Check information button (hiding / showing system is tested in DuplicatedObjectsMessageComponents.test)
    const buttonWrapper = enzymeWrapper.find(DuplicatedObjectsMessageComponents)
    assert.lengthOf(buttonWrapper, 1, 'Information button should be hidden')
    testSuiteHelpers.assertWrapperProperties(buttonWrapper, props, 'This properties should be correctly reported to delete message button')
  })
})
