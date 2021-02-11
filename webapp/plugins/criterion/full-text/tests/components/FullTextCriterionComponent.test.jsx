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
import TextField from 'material-ui/TextField'
import { UIDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers, criterionTestSuiteHelpers } from '@regardsoss/tests-helpers'
import FullTextCriterionComponent from '../../src/components/FullTextCriterionComponent'
import styles from '../../src/styles'

/**
 * Test FullTextCriterionComponent
 * @author Raphaël Mechali
 */
describe('[Full text criterion] Testing FullTextCriterionComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(FullTextCriterionComponent)
  })
  it('should render correctly, using all locales', () => {
    const props = {
      label: criterionTestSuiteHelpers.getLabelStub(),
      searchText: 'Hello',
      onTextInput: () => {},
    }
    UIDomain.LOCALES.forEach((locale) => {
      const enzymeWrapper = shallow(<FullTextCriterionComponent {...props} />, {
        context: buildTestContext(styles, locale),
      })
      const textfield = enzymeWrapper.find(TextField)
      assert.lengthOf(textfield, 1, 'There should be a text field')
      testSuiteHelpers.assertWrapperProperties(textfield, {
        hintText: props.label[locale],
        value: props.searchText,
        onChange: props.onTextInput,
      }, 'Text field properties should be correctly set')
    })
  })
})
