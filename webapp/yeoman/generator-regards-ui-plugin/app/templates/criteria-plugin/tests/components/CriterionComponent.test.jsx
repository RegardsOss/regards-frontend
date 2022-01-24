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
import TextField from 'material-ui/TextField'
import { DamDomain, UIDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers, criterionTestSuiteHelpers } from '@regardsoss/tests-helpers'
import CriterionComponent from '../../src/components/CriterionComponent'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Test CriterionComponent
 * @author <%= author %>
 */
describe('[<%= name %>] Testing CriterionComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(CriterionComponent)
  })
  it('should render correctly with all locales', () => {
    const props = {
      label: criterionTestSuiteHelpers.getLabelStub(),
      searchAttribute: criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.STRING),
      searchText: 'xxx',
      onSelectMode: () => {},
    }
    UIDomain.LOCALES.forEach((locale) => {
      const enzymeWrapper = shallow(<CriterionComponent {...props} />, {
        context: buildTestContext(styles, locale),
      })
      assert.include(enzymeWrapper.debug(), props.label[locale])
    })
  })
  it('should ...', () => {
    // TODO other tests for view
    const props = {
      label: criterionTestSuiteHelpers.getLabelStub(),
      searchAttribute: criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.STRING),
      searchText: 'xxx',
      onTextInput: () => {},
      onSelectMode: () => {},
    }
    const enzymeWrapper = shallow(<CriterionComponent {...props} />, { context })
    const textField = enzymeWrapper.find(TextField)
    assert.lengthOf(textField, 1, 'There should be the textField')
    testSuiteHelpers.assertWrapperProperties(textField, {
      value: props.searchText,
      onChange: props.onTextInput,
    })
  })
})
