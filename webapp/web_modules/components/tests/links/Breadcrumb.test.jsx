/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import NextLevelIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-right'
import TestIcon from 'material-ui/svg-icons/device/airplanemode-active'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { Breadcrumb } from '../../src/links/Breadcrumb'
import BreadcrumbElement from '../../src/links/BreadcrumbElement'
import styles from '../../src/links/styles/styles'

const context = buildTestContext(styles)

describe('[Components] Testing Breadcrumb', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(Breadcrumb)
  })

  it('should render correctly an empty list', () => {
    const props = {
      elements: [],
      labelGenerator: elt => elt,
      onAction: () => { },
    }
    const enzymeWrapper = shallow(<Breadcrumb {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(NextLevelIcon), 0, 'There should be no separator')
    assert.lengthOf(enzymeWrapper.find(BreadcrumbElement), 0, 'There should be no breadcrumb element')
  })

  it('should render correctly a one element list', () => {
    const props = {
      elements: ['root'],
      labelGenerator: elt => elt,
      onAction: () => { },
    }
    const enzymeWrapper = shallow(<Breadcrumb {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(NextLevelIcon), 0, 'There should be no separator')
    const breadcrumbElement = enzymeWrapper.find(BreadcrumbElement)
    assert.lengthOf(breadcrumbElement, 1, 'There should be root breadcrumb element')
    assert.equal(breadcrumbElement.props().label, 'root', 'label should be correctly reported')
    assert.isDefined(breadcrumbElement.props().onAction, 'onAction should be correctly reported')
    assert.isTrue(breadcrumbElement.props().isFirst, 'Root element should be marked first')
    assert.isTrue(breadcrumbElement.props().isLast, 'Root element should be marked last in one element list')
    assert.equal(breadcrumbElement.props().index, 0, 'Index should be correctly reported')
    assert.equal(breadcrumbElement.props().element, props.elements[0], 'Element should be correctly reported')
    assert.isTrue(breadcrumbElement.props().navigationAllowed, 'Default predicate should allow navigation for all elements')
  })

  it('should render correctly a complete list', () => {
    const props = {
      elements: ['elementA', 'elementB', 'elementC', 'elementD'],
      labelGenerator: (elt, index) => `${elt}-${index}`, // make simple label to check generator
      navigationAllowedPredicate: (elt, index) => index % 2 === 0, // each even element should allow navigation
      onAction: () => { },
      rootIcon: <TestIcon />,
    }
    const enzymeWrapper = shallow(<Breadcrumb {...props} />, { context })

    // 1 - Check there is a separator between each element
    assert.lengthOf(enzymeWrapper.find(NextLevelIcon), props.elements.length - 1)
    // 2 - Check each element has been correctly rendered
    const renderedElements = enzymeWrapper.find(BreadcrumbElement)
    assert.lengthOf(renderedElements, props.elements.length, 'Elements rendered should keep the same size')
    renderedElements.forEach((element, index) => {
      // 2.1 - check element label
      assert.equal(element.props().label, `${props.elements[index]}-${index}`, 'Label should be correctly reported')
      // 2.2 - check element callback
      assert.isDefined(element.props().onAction, 'Callback should be defined (cannot test further due to anonymous function)')
      // 2.3 - check icon
      assert.equal(element.props().rootIcon, props.rootIcon, 'Root icon should be correctly reported')
      // 2.4 - check list position variables
      assert.equal(element.props().isFirst, index === 0)
      assert.equal(element.props().isLast, index === props.elements.length - 1)
      // 2.5 - check element and index
      assert.equal(element.props().index, index, 'Index should be correctly reported')
      assert.equal(element.props().element, props.elements[index], 'Element should be correctly reported')

      // check that navigation is allowed only for even elements
      if (index % 2 === 0) {
        assert.isTrue(element.props().navigationAllowed, `Navigation should be allowed for element at index ${index}`)
      } else {
        assert.isFalse(element.props().navigationAllowed, `Navigation should be forbidden for element at index ${index}`)
      }
    })
  })
})
