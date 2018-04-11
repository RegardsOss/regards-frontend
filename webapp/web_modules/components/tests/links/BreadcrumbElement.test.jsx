/**
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import TestIcon from 'material-ui/svg-icons/device/airplanemode-active'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import BreadcrumbElement from '../../src/links/BreadcrumbElement'
import styles from '../../src/links/styles/styles'

const context = buildTestContext(styles)

describe('[Components] Testing BreadcrumbElement', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(BreadcrumbElement)
  })
  it('should render properly root item', () => {
    const props = {
      isFirst: true,
      isLast: true,
      onAction: () => { },
      label: 'root',
      rootIcon: <TestIcon />,
    }
    const wrapper = shallow(<BreadcrumbElement {...props} />, { context })
    assert.lengthOf(wrapper.find(TestIcon), 1, 'There should be the icon for root element')
    assert.include(wrapper.debug(), props.label, 'Element label should be rendered')
  })
  it('should render properly any next item', () => {
    const props = {
      isFirst: false,
      isLast: true,
      onAction: () => { },
      label: 'any',
      rootIcon: <TestIcon />,
    }
    const wrapper = shallow(<BreadcrumbElement {...props} />, { context })
    assert.lengthOf(wrapper.find(TestIcon), 0, 'There should not be the icon as element is not root')
    assert.include(wrapper.debug(), props.label, 'Element label should be rendered')
  })
  it('should call onAction when item is not selected (not last element)', () => {
    let spiedCalls = 0
    const props = {
      isFirst: false,
      isLast: false,
      onAction: () => { spiedCalls += 1 },
      label: 'root',
      rootIcon: <TestIcon />,
    }
    const wrapper = shallow(<BreadcrumbElement {...props} />, { context })
    wrapper.instance().onClick()
    assert.equal(spiedCalls, 1, 'onAction should have been invoked')
  })
  it('should not call onAction when item is selected (last element)', () => {
    let spiedCalls = 0
    const props = {
      isFirst: false,
      isLast: true,
      onAction: () => { spiedCalls += 1 },
      label: 'root',
      rootIcon: <TestIcon />,
    }
    const wrapper = shallow(<BreadcrumbElement {...props} />, { context })
    wrapper.instance().onClick()
    assert.equal(spiedCalls, 0, 'onAction should not have been invoked')
  })
})
