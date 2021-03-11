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
import { buildTestContext, testSuiteHelpers, criterionTestSuiteHelpers } from '@regardsoss/tests-helpers'
import { DamDomain } from '@regardsoss/domain'
import { SEARCH_MODES_ENUM } from '../../src/domain/SearchMode'
import { StringCriterionContainer } from '../../src/containers/StringCriterionContainer'
import StringCriterionComponent from '../../src/components/StringCriterionComponent'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/**
 * Test case for {@link StringCriterionContainer}
 *
 * @author Xavier-Alexandre Brochard
 */
describe('[String criterion] Testing StringCriterionContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)
  it('should exists', () => {
    assert.isDefined(StringCriterionContainer)
  })
  it('should render self and sub components and publish state / query on updates', () => {
    const spiedPublishStateData = {
      count: 0,
      state: null,
      requestParameters: null,
    }
    const props = {
      // parent callbacks (required)
      pluginInstanceId: 'any',
      attributes: {
        searchField: criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.STRING),
      },
      state: {
        searchText: 'xxx',
        searchMode: SEARCH_MODES_ENUM.CONTAINS,
      },
      label: criterionTestSuiteHelpers.getLabelStub(),
      publishState: (state, requestParameters) => {
        spiedPublishStateData.count += 1
        spiedPublishStateData.state = state
        spiedPublishStateData.requestParameters = requestParameters
      },
    }
    const enzymeWrapper = shallow(<StringCriterionContainer {...props} />, { context })
    const component = enzymeWrapper.find(StringCriterionComponent)
    assert.lengthOf(component, 1, 'There should be the component')
    testSuiteHelpers.assertWrapperProperties(component, {
      label: props.label,
      searchAttribute: props.attributes.searchField,
      searchText: props.state.searchText,
      searchMode: props.state.searchMode,
      onSelectMode: enzymeWrapper.instance().onSelectMode,
      onTextInput: enzymeWrapper.instance().onTextInput,
    }, 'Component properties should be correctly reported')
    // check state and request are published when text value is updated
    enzymeWrapper.instance().onTextInput(null, 'abc')
    assert.equal(spiedPublishStateData.count, 1, 'Update text: publish state should have been called 1 time')
    assert.deepEqual(spiedPublishStateData.state, {
      searchText: 'abc',
      searchMode: props.state.searchMode,
    }, 'Update text: state should be computed with new value and previous state from props')
    assert.deepEqual(spiedPublishStateData.requestParameters,
      StringCriterionContainer.convertToRequestParameters(spiedPublishStateData.state, props.attributes.searchField),
      'request parameters should be updated')
    // check state is published when user changes mode selection
    enzymeWrapper.instance().onSelectMode(SEARCH_MODES_ENUM.EQUALS)
    assert.equal(spiedPublishStateData.count, 2, 'publish state should have been called on strict equal mode selection')
    assert.deepEqual(spiedPublishStateData.state, {
      searchText: props.state.searchText,
      searchMode: SEARCH_MODES_ENUM.EQUALS,
    }, 'State should be correctly updated when user selects strict equal mode')
    assert.deepEqual(spiedPublishStateData.requestParameters,
      StringCriterionContainer.convertToRequestParameters(spiedPublishStateData.state, props.attributes.searchField),
      'Equal mode selection: query should be computed')
  })
  it('should convert correctly into a query', () => {
    const attribute = {
      ...criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.STRING),
      jsonPath: 'attr.path.x1',
    }
    // 1 - Strict  equal queries
    assert.deepEqual(StringCriterionContainer.convertToRequestParameters({ searchText: 'FULL_word"+', searchMode: SEARCH_MODES_ENUM.EQUALS }, attribute),
      { q: 'attr.path.x1:"FULL_word\\"+"' })
    assert.deepEqual(StringCriterionContainer.convertToRequestParameters({ searchText: 'FULL word *', searchMode: SEARCH_MODES_ENUM.EQUALS }, attribute),
      { q: 'attr.path.x1:"FULL word *"' })
    assert.isNotOk(StringCriterionContainer.convertToRequestParameters({ searchText: null, searchMode: SEARCH_MODES_ENUM.EQUALS }, attribute).q)
    assert.isNotOk(StringCriterionContainer.convertToRequestParameters({ searchText: '', searchMode: SEARCH_MODES_ENUM.EQUALS }, attribute).q)
    assert.isNotOk(StringCriterionContainer.convertToRequestParameters({ searchText: '          ', searchMode: SEARCH_MODES_ENUM.EQUALS }, attribute).q)
    assert.isNotOk(StringCriterionContainer.convertToRequestParameters({ searchText: undefined, searchMode: SEARCH_MODES_ENUM.EQUALS }, attribute).q)
    assert.isNotOk(StringCriterionContainer.convertToRequestParameters({ searchMode: SEARCH_MODES_ENUM.EQUALS }, attribute).q)

    // 2 - Contains queries
    assert.deepEqual(StringCriterionContainer.convertToRequestParameters({ searchText: 'FULL_word"+', searchMode: SEARCH_MODES_ENUM.CONTAINS }, attribute),
      { q: 'attr.path.x1:(FULL_word\\"\\+)' })
    assert.deepEqual(StringCriterionContainer.convertToRequestParameters({ searchText: 'FULL- word *', searchMode: SEARCH_MODES_ENUM.CONTAINS }, attribute),
      { q: 'attr.path.x1:((FULL\\-) AND (word) AND (\\*))' })
    assert.isNotOk(StringCriterionContainer.convertToRequestParameters({ searchText: null, searchMode: SEARCH_MODES_ENUM.CONTAINS }, attribute).q)
    assert.isNotOk(StringCriterionContainer.convertToRequestParameters({ searchText: '', searchMode: SEARCH_MODES_ENUM.CONTAINS }, attribute).q)
    assert.isNotOk(StringCriterionContainer.convertToRequestParameters({ searchText: '          ', searchMode: SEARCH_MODES_ENUM.CONTAINS }, attribute).q)
    assert.isNotOk(StringCriterionContainer.convertToRequestParameters({ searchText: undefined, searchMode: SEARCH_MODES_ENUM.CONTAINS }, attribute).q)
    assert.isNotOk(StringCriterionContainer.convertToRequestParameters({ searchMode: SEARCH_MODES_ENUM.CONTAINS }, attribute).q)

    // 2 - Regex queries
    assert.deepEqual(StringCriterionContainer.convertToRequestParameters({ searchText: 'FULL_word"+', searchMode: SEARCH_MODES_ENUM.REGEX }, attribute),
      { q: 'attr.path.x1:/FULL_word"+/' })
    assert.isNotOk(StringCriterionContainer.convertToRequestParameters({ searchText: null, searchMode: SEARCH_MODES_ENUM.REGEX }, attribute).q)
    assert.isNotOk(StringCriterionContainer.convertToRequestParameters({ searchText: '', searchMode: SEARCH_MODES_ENUM.REGEX }, attribute).q)
    assert.isNotOk(StringCriterionContainer.convertToRequestParameters({ searchText: '          ', searchMode: SEARCH_MODES_ENUM.REGEX }, attribute).q)
    assert.isNotOk(StringCriterionContainer.convertToRequestParameters({ searchText: undefined, searchMode: SEARCH_MODES_ENUM.REGEX }, attribute).q)
    assert.isNotOk(StringCriterionContainer.convertToRequestParameters({ searchMode: SEARCH_MODES_ENUM.REGEX }, attribute).q)

    // 5 - No value (No value, word parts)
    assert.isNotOk(StringCriterionContainer.convertToRequestParameters({ searchText: null, strictEqual: false }, attribute).q, '5- null should not be converted into a query')
    assert.isNotOk(StringCriterionContainer.convertToRequestParameters({ searchText: '', strictEqual: false }, attribute).q, '5- "" should not be converted into a query')
    assert.isNotOk(StringCriterionContainer.convertToRequestParameters({ strictEqual: false }, attribute).q, '5- undefined should not be converted into a query')
    // 6 - No query (No attribute json path)
    const nonConvertable = { ...attribute, jsonPath: null }
    assert.isNotOk(StringCriterionContainer.convertToRequestParameters({ searchText: 'FULL_word', strictEqual: true }, nonConvertable).q,
      '6 attribute with no JSON path should not be converted into a query (full word)"')
    assert.isNotOk(StringCriterionContainer.convertToRequestParameters({ searchText: 'WORD_part', strictEqual: false }, nonConvertable).q,
      '6 attribute with no JSON path should not be converted into a query (word parts)"')
  })
})
