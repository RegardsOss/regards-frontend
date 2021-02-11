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
import ToggleTreeVisibleOptionComponent from '../../../../src/components/user/header/ToggleTreeVisibleOptionComponent'
import { ToggleTreeVisibleOptionContainer } from '../../../../src/containers/user/header/ToggleTreeVisibleOptionContainer'
import styles from '../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test ToggleTreeVisibleOptionContainer
 * @author Raphaël Mechali
 * @author Théo Lasserre
 */
describe('[Description] Testing ToggleTreeVisibleOptionContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ToggleTreeVisibleOptionContainer)
  })
  it('should render correctly', () => {
    const spySetBrowsingTreeVisible = {}
    // 1 - Test with visible tree
    const props = {
      browsingTreeVisible: true,
      setBrowsingTreeVisible: (treeVisible) => {
        spySetBrowsingTreeVisible.treeVisible = treeVisible
      },
      toggleTreeButton: () => { },
    }
    const enzymeWrapper = shallow(<ToggleTreeVisibleOptionContainer {...props} />, { context })
    let componentWrapper = enzymeWrapper.find(ToggleTreeVisibleOptionComponent)
    assert.lengthOf(componentWrapper, 1, '(1) There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      browsingTreeVisible: true,
      onToggleVisible: enzymeWrapper.instance().onToggleVisible,
    }, '(1) Component should define the expected properties')
    // test callback
    componentWrapper.props().onToggleVisible()
    assert.isFalse(spySetBrowsingTreeVisible.treeVisible, '(1) Tree should have been hidden')

    // 2 - Test with hidden tree
    enzymeWrapper.setProps({
      ...props,
      browsingTreeVisible: false,
    })
    componentWrapper = enzymeWrapper.find(ToggleTreeVisibleOptionComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      browsingTreeVisible: false,
      onToggleVisible: enzymeWrapper.instance().onToggleVisible,
    }, '(2) Component should define the expected properties')
    // test callback
    componentWrapper.props().onToggleVisible()
    assert.isTrue(spySetBrowsingTreeVisible.treeVisible, '(1) Tree should have been shown')
  })
})
