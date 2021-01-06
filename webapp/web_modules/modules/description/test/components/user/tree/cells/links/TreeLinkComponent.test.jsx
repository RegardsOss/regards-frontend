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
import flattenDeep from 'lodash/flattenDeep'
import TestIcon from 'mdi-material-ui/Human'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import TreeLinkComponent from '../../../../../../src/components/user/tree/cells/links/TreeLinkComponent'
import styles from '../../../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test TreeLinkComponent
 * @author Raphaël Mechali
 */
describe('[Description] Testing TreeLinkComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(TreeLinkComponent)
  })
  const testCases = flattenDeep([{
    sectionLabel: 'a section',
    section: true,
  }, {
    sectionLabel: 'an element',
    section: false,
  }].map(({ sectionLabel, section }) => [{
    disabledLabel: 'enabled',
    disabled: false,
  }, {
    disabledLabel: 'disabled',
    disabled: true,
  }].map(({ disabledLabel, disabled }) => disabled ? [{
    sectionLabel,
    section,
    disabledLabel,
    disabled,
    selectedLabel: 'unselelected',
    selected: false,
  }] : [{
    sectionLabel,
    section,
    disabledLabel,
    disabled,
    selectedLabel: 'unselelected',
    selected: false,
  }, {
    sectionLabel,
    section,
    disabledLabel,
    disabled,
    selectedLabel: 'selelected',
    selected: true,
  }])))

  testCases.forEach(({
    sectionLabel, disabledLabel, selectedLabel,
    section, disabled, selected,
  }) => it(`should render correctly ${sectionLabel} when ${disabledLabel} and ${selectedLabel}`, () => {
    const props = {
      text: 'someText',
      tooltip: 'someTooltip',
      selected,
      disabled,
      IconConstructor: TestIcon,
      section,
      onClick: () => {},
    }
    const enzymeWrapper = shallow(<TreeLinkComponent {...props} />, { context })
    if (disabled) {
      // when disabled, check there is not:
      // - the icon
      // - the click callback
      assert.lengthOf(enzymeWrapper.find(TestIcon), 0, 'Icon should not be shown')
      assert.lengthOf(enzymeWrapper.findWhere((n) => n.props().onClick === props.onClick), 0, 'On click callback should not be available')
    } else {
      // when enabled, check there is:
      // - the icon
      // - the click callback
      assert.lengthOf(enzymeWrapper.find(TestIcon), 1, 'Icon should not be shown')
      assert.lengthOf(enzymeWrapper.findWhere((n) => n.props().onClick === props.onClick), 1, 'On click callback should be available')
    }
    // In any case, the link text and tooltip should be displayed
    assert.lengthOf(enzymeWrapper.filterWhere((n) => n.props().title === props.tooltip), 1, 'Tooltip should be shown')
    assert.include(enzymeWrapper.debug(), props.text, 'Link text should be shown')
  }))
})
