/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import noop from 'lodash/noop'
import C1Icon from 'mdi-material-ui/AbTesting'
import C2Icon from 'mdi-material-ui/Account'
import C3Icon from 'mdi-material-ui/Airplane'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import DropDownButton from '../../src/buttons/DropDownButton'
import { IconElementSelector } from '../../src/buttons/IconElementSelector'
import styles from '../../src/buttons/styles'

const context = buildTestContext(styles)

/**
 * Test IconElementSelector
 * @author Raphaël Mechali
 */
describe('[Components] Testing IconElementSelector', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(IconElementSelector)
  })
  it('should render correctly and allow user selecting another option', () => {
    const spiedData = {}
    const props = {
      value: 'c2',
      choices: ['c1', 'c2', 'c3'],
      choiceGraphics: {
        c1: {
          IconConstructor: C1Icon,
          labelKey: 'choice.c1.label',
          tooltipKey: 'choice.c1.tooltip',
        },
        c2: {
          IconConstructor: C2Icon,
          labelKey: 'choice.c2.label',
          tooltipKey: 'choice.c2.tooltip',
        },
        c3: {
          IconConstructor: C3Icon,
          labelKey: 'choice.c3.label',
          tooltipKey: 'choice.c3.tooltip',
        },
      },
      disabled: false,
      onChange: (value) => {
        spiedData.value = value
      },
    }
    const enzymeWrapper = shallow(<IconElementSelector {...props} />, { context })
    // 1 - Check initial selection
    // 1.a - drop down button properties
    let dropDownWrapper = enzymeWrapper.find(DropDownButton)
    assert.lengthOf(dropDownWrapper, 1, '1.a - There should be drop down button')
    const InnerButtonConstructor = enzymeWrapper.instance().renderIconButton
    testSuiteHelpers.assertWrapperProperties(dropDownWrapper, {
      ButtonConstructor: InnerButtonConstructor,
      value: props.value,
      onChange: props.onChange,
    }, '1.a - Drop down button properties should be correctly reported')
    // 1.b - inner button render (only drop down reported properties here, others come from root wrapper properties)
    const innerProps = {
      onClick: () => {},
    }
    let innerButtonWrapper = shallow(<InnerButtonConstructor {...innerProps} />, { context })
    let iconButtonWrapper = innerButtonWrapper.find(IconButton)
    assert.lengthOf(iconButtonWrapper, 1, '1.b - There should be inner button')
    testSuiteHelpers.assertWrapperProperties(iconButtonWrapper, {
      title: 'choice.c2.tooltip',
      disabled: false,
      onClick: innerProps.onClick,
    }, '1.b - Current state should be correctly rendered')
    assert.lengthOf(innerButtonWrapper.find(C2Icon), 1, '1.b - The right icon should be displayed')
    // 1.c - Check menu items
    const menuItemsWrapper = dropDownWrapper.find(MenuItem)
    assert.lengthOf(menuItemsWrapper, props.choices.length, 'There should be a menu item for each option')
    props.choices.forEach((choice, index) => {
      const choiceMenuItemWrapper = menuItemsWrapper.at(index)
      const choiceGraphics = props.choiceGraphics[choice]
      testSuiteHelpers.assertWrapperProperties(choiceMenuItemWrapper, {
        value: choice,
        leftIcon: <choiceGraphics.IconConstructor />,
        primaryText: choiceGraphics.labelKey,
      }, 'Menu item properties should be correctly computed')
    })
    // 2 - Test callback
    dropDownWrapper.props().onChange('c1')
    assert.equal(spiedData.value, 'c1', 'Change event should be correctly dispatched')
    // 3 - Apply new choice and change button rendering
    enzymeWrapper.setProps({
      ...props,
      value: 'c1',
    })
    // 3.a - Drop down button
    dropDownWrapper = enzymeWrapper.find(DropDownButton)
    assert.lengthOf(dropDownWrapper, 1, '3.a - There should be drop down button')
    testSuiteHelpers.assertWrapperProperties(dropDownWrapper, {
      ButtonConstructor: InnerButtonConstructor,
      value: 'c1',
      onChange: props.onChange,
    }, '3.a - Drop down button properties should be correctly reported')
    // 3.b - inner button render
    innerButtonWrapper = shallow(<InnerButtonConstructor {...innerProps} />, { context })
    iconButtonWrapper = innerButtonWrapper.find(IconButton)
    assert.lengthOf(iconButtonWrapper, 1, '3.b - There should be inner button')
    testSuiteHelpers.assertWrapperProperties(iconButtonWrapper, {
      title: 'choice.c1.tooltip',
      disabled: false,
      onClick: innerProps.onClick,
    }, '3.b - Current state should be correctly rendered')
    assert.lengthOf(innerButtonWrapper.find(C1Icon), 1, '3.b - The right icon should be displayed')
  })
  it('should render correctly disabled', () => {
    const props = {
      value: 'c1',
      choices: ['c1'],
      choiceGraphics: {
        c1: {
          IconConstructor: C1Icon,
          labelKey: 'choice.c1.label',
          tooltipKey: 'choice.c1.tooltip',
        },
      },
      disabled: true,
      onChange: () => { },
    }
    const enzymeWrapper = shallow(<IconElementSelector {...props} />, { context })
    const InnerButtonConstructor = enzymeWrapper.instance().renderIconButton
    const innerButtonWrapper = shallow(<InnerButtonConstructor onClick={noop} />, { context })
    const iconButtonWrapper = innerButtonWrapper.find(IconButton)
    assert.lengthOf(iconButtonWrapper, 1, 'There should be inner button')
    assert.isTrue(iconButtonWrapper.props().disabled, 'Disabled state should be reported to inner icon button render')
  })
})
