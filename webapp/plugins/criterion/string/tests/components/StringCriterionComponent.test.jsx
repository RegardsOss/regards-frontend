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
import { shallow } from 'enzyme'
import { assert } from 'chai'
import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField'
import { DamDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers, criterionTestSuiteHelpers } from '@regardsoss/tests-helpers'
import StringCriterionComponent from '../../src/components/StringCriterionComponent'
import styles from '../../src/styles'
import { SEARCH_MODES_ENUM } from '../../src/domain/SearchMode'

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
  it('should render correctly in contains mode', () => {
    const props = {
      searchAttribute: criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.STRING),
      searchText: 'xxx',
      searchMode: SEARCH_MODES_ENUM.CONTAINS,
      onTextInput: () => {},
      onSelectContainsMode: () => {},
      onSelectStrictEqualMode: () => {},
      onSelectRegexpMode: () => {},
    }
    const enzymeWrapper = shallow(<StringCriterionComponent {...props} />, { context })
    const textField = enzymeWrapper.find(TextField)
    assert.lengthOf(textField, 1, 'There should be the text field')
    testSuiteHelpers.assertWrapperProperties(textField, {
      value: props.searchText,
      onChange: props.onTextInput,
    }, 'Text field properties should be correctly set')
    const buttonWrapper = enzymeWrapper.find(IconButton)
    assert.lengthOf(buttonWrapper, 3, 'There should be 3 mode selectors')
    testSuiteHelpers.assertWrapperProperties(buttonWrapper.at(0), {
      iconStyle: context.moduleTheme.selectedIconStyle,
      title: 'criterion.search.field.contains.selector.title',
      onClick: props.onSelectContainsMode,
    }, 'Contains mode selector properties should be correctly set')
    testSuiteHelpers.assertWrapperProperties(buttonWrapper.at(1), {
      iconStyle: context.moduleTheme.defaultIconStyle,
      title: 'criterion.search.field.equals.selector.title',
      onClick: props.onSelectStrictEqualMode,
    }, 'Strict equal mode selector properties should be correctly set, it should not be selected')
    testSuiteHelpers.assertWrapperProperties(buttonWrapper.at(2), {
      iconStyle: context.moduleTheme.defaultIconStyle,
      title: 'criterion.search.field.regexp.selector.title',
      onClick: props.onSelectRegexpMode,
    }, 'Regexp mode selector properties should be correctly set, it should not be selected')
  })
  it('should render correctly in strictly equals mode', () => {
    const props = {
      searchAttribute: criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.STRING),
      searchText: 'xxx',
      searchMode: SEARCH_MODES_ENUM.EQUALS,
      onTextInput: () => {},
      onSelectContainsMode: () => {},
      onSelectStrictEqualMode: () => {},
      onSelectRegexpMode: () => {},
    }
    const enzymeWrapper = shallow(<StringCriterionComponent {...props} />, { context })
    const textField = enzymeWrapper.find(TextField)
    assert.lengthOf(textField, 1, 'There should be the text field')
    testSuiteHelpers.assertWrapperProperties(textField, {
      value: props.searchText,
      onChange: props.onTextInput,
    }, 'Text field properties should be correctly set')
    const buttonWrapper = enzymeWrapper.find(IconButton)
    assert.lengthOf(buttonWrapper, 3, 'There should be 3 mode selectors')
    testSuiteHelpers.assertWrapperProperties(buttonWrapper.at(0), {
      iconStyle: context.moduleTheme.defaultIconStyle,
      title: 'criterion.search.field.contains.selector.title',
      onClick: props.onSelectContainsMode,
    }, 'Contains mode selector properties should be correctly set')
    testSuiteHelpers.assertWrapperProperties(buttonWrapper.at(1), {
      iconStyle: context.moduleTheme.selectedIconStyle,
      title: 'criterion.search.field.equals.selector.title',
      onClick: props.onSelectStrictEqualMode,
    }, 'Strict equal mode selector properties should be correctly set, it should not be selected')
    testSuiteHelpers.assertWrapperProperties(buttonWrapper.at(2), {
      iconStyle: context.moduleTheme.defaultIconStyle,
      title: 'criterion.search.field.regexp.selector.title',
      onClick: props.onSelectRegexpMode,
    }, 'Regexp mode selector properties should be correctly set, it should not be selected')
  })
  it('should render correctly in matches regexp mode', () => {
    const props = {
      searchAttribute: criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.STRING),
      searchText: 'xxx',
      searchMode: SEARCH_MODES_ENUM.REGEXP,
      onTextInput: () => {},
      onSelectContainsMode: () => {},
      onSelectStrictEqualMode: () => {},
      onSelectRegexpMode: () => {},
    }
    const enzymeWrapper = shallow(<StringCriterionComponent {...props} />, { context })
    const textField = enzymeWrapper.find(TextField)
    assert.lengthOf(textField, 1, 'There should be the text field')
    testSuiteHelpers.assertWrapperProperties(textField, {
      value: props.searchText,
      onChange: props.onTextInput,
    }, 'Text field properties should be correctly set')
    const buttonWrapper = enzymeWrapper.find(IconButton)
    assert.lengthOf(buttonWrapper, 3, 'There should be 3 mode selectors')
    testSuiteHelpers.assertWrapperProperties(buttonWrapper.at(0), {
      iconStyle: context.moduleTheme.defaultIconStyle,
      title: 'criterion.search.field.contains.selector.title',
      onClick: props.onSelectContainsMode,
    }, 'Contains mode selector properties should be correctly set')
    testSuiteHelpers.assertWrapperProperties(buttonWrapper.at(1), {
      iconStyle: context.moduleTheme.defaultIconStyle,
      title: 'criterion.search.field.equals.selector.title',
      onClick: props.onSelectStrictEqualMode,
    }, 'Strict equal mode selector properties should be correctly set, it should not be selected')
    testSuiteHelpers.assertWrapperProperties(buttonWrapper.at(2), {
      iconStyle: context.moduleTheme.selectedIconStyle,
      title: 'criterion.search.field.regexp.selector.title',
      onClick: props.onSelectRegexpMode,
    }, 'Regexp mode selector properties should be correctly set, it should not be selected')
  })
})
