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
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField'
import { DamDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers, criterionTestSuiteHelpers } from '@regardsoss/tests-helpers'
import StringCriterionComponent from '../../src/components/StringCriterionComponent'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Test StringCriterionComponent
 * @author Raphaël Mechali
 */
describe('[String criterion] Testing StringCriterionComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(StringCriterionComponent)
  })
  it('should render correctly searching words parts', () => {
    const props = {
      searchAttribute: criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.STRING),
      searchText: 'xxx',
      searchFullWords: false,
      onTextInput: () => {},
      onCheckFullWord: () => {},
    }
    const enzymeWrapper = shallow(<StringCriterionComponent {...props} />, { context })
    const textField = enzymeWrapper.find(TextField)
    assert.lengthOf(textField, 1, 'There should be the text field')
    testSuiteHelpers.assertWrapperProperties(textField, {
      value: props.searchText,
      onChange: props.onTextInput,
    }, 'Text field properties should be correctly set')
    const buttonWrapper = enzymeWrapper.find(IconButton)
    assert.lengthOf(buttonWrapper, 1, 'There should be the full word toggle')
    testSuiteHelpers.assertWrapperProperties(buttonWrapper, {
      iconStyle: context.moduleTheme.uncheckIconStyle, // verifying that way the full word toggle is off
      onClick: props.onCheckFullWord,
    }, 'Full word toggle properties should be correctly set, it should not be selected')
  })
  it('should render correctly searching full words', () => {
    const props = {
      searchAttribute: criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.STRING),
      searchText: '',
      searchFullWords: true,
      onTextInput: () => {},
      onCheckFullWord: () => {},
    }
    const enzymeWrapper = shallow(<StringCriterionComponent {...props} />, { context })
    const textField = enzymeWrapper.find(TextField)
    assert.lengthOf(textField, 1, 'There should be the text field')
    testSuiteHelpers.assertWrapperProperties(textField, {
      value: props.searchText,
      onChange: props.onTextInput,
    }, 'Text field properties should be correctly set')
    const buttonWrapper = enzymeWrapper.find(IconButton)
    assert.lengthOf(buttonWrapper, 1, 'There should be the full word toggle')
    testSuiteHelpers.assertWrapperProperties(buttonWrapper, {
      iconStyle: context.moduleTheme.checkedIconStyle, // verifying that way the full word toggle is on
      onClick: props.onCheckFullWord,
    }, 'Full word toggle properties should be correctly set, it should be selected')
  })
})
