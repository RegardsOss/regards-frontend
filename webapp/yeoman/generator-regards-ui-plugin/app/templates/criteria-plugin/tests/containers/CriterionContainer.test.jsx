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
import { buildTestContext, testSuiteHelpers, criterionTestSuiteHelpers } from '@regardsoss/tests-helpers'
import { CriterionContainer } from '../../src/containers/CriterionContainer'
import CriterionComponent from '../../src/components/CriterionComponent'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/**
 * Test case for {@link SampleCriteria}
 *
 * @author <%= author %>
 */
describe('[<%= name %>] Testing CriterionContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)
  it('should exists', () => {
    assert.isDefined(CriterionContainer)
  })
  it('should render self and sub components', () => {
    const props = {
      // parent callbacks (required)
      pluginInstanceId: 'any',
      state: {
        searchText: 'some research',
      },
      attributes: {
        searchField: {
          name: 'searchField',
          description: 'Attribute to search',
          type: 'string',
        },
      },
    }
    const enzymeWrapper = shallow(<CriterionContainer {...props} />, { context })
    const component = enzymeWrapper.find(CriterionComponent)
    assert.lengthOf(component, 1, 'There should be the component')
    testSuiteHelpers.assertWrapperProperties(component, {
      searchAttribute: props.attributes.searchField,
      searchText: props.state.searchText, // Make sure text field will update with state changes
      onTextInput: enzymeWrapper.instance().onTextInput, // Callback is correctly set
    }, 'Component properties should be correctly set')
  })
  it('should convert correctly to open search queries', () => {
    const attribute = { ...criterionTestSuiteHelpers.getAttributeStub(), jsonPath: 'x.y.z' }
    assert.equal(CriterionContainer.convertToQuery({ searchText: ' aaa  ' }, attribute), { q: 'x.y.z="aaa"' }, 'Query should be correctly converted, triming white spaces')
    assert.isNotOk(CriterionContainer.convertToQuery({ searchText: '' }, attribute).q, 'No query should be converted when there is no research')
  })
})
