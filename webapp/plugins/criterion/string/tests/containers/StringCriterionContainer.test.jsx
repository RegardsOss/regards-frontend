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
import { DamDomain } from '@regardsoss/domain'
import { StringCriterionContainer } from '../../src/containers/StringCriterionContainer'
import styles from '../../src/styles/styles'
import StringCriterionComponent from '../../src/components/StringCriterionComponent'
import { SEARCH_MODES_ENUM } from '../../src/domain/SearchMode'

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
  it('should render self and sub components and publish state on updates', () => {
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
      searchAttribute: props.attributes.searchField,
      searchText: props.state.searchText,
      searchMode: props.state.searchMode,
      onTextInput: enzymeWrapper.instance().onTextInput,
      onCheckStrictEqual: enzymeWrapper.instance().onCheckStrictEqual,
    }, 'Component properties should be correctly reported')
    // check state is published when text value is updated (query is not tested here)
    enzymeWrapper.instance().onTextInput(null, 'abc')
    assert.equal(spiedPublishStateData.count, 1, 'Update text: publish state should have been called 1 time')
    assert.deepEqual(spiedPublishStateData.state, {
      searchText: 'abc',
      searchMode: SEARCH_MODES_ENUM.CONTAINS,
    }, 'Update text: state should be computed with new value and previous state from props')
    assert.isDefined(spiedPublishStateData.requestParameters, 'Update text: requestParameters should be computed')
    // check state is published when user changes mode selection
    enzymeWrapper.instance().onSelectStrictEqualMode()
    assert.equal(spiedPublishStateData.count, 2, 'publish state should have been called on strict equal mode selection')
    assert.deepEqual(spiedPublishStateData.state, {
      searchText: 'xxx',
      searchMode: SEARCH_MODES_ENUM.EQUALS,
    }, 'State should be correctly updated when user selects strict equal mode')
    assert.isDefined(spiedPublishStateData.requestParameters, 'Equal mode selection: query should be computed')

    enzymeWrapper.instance().onSelectRegexpMode()
    assert.equal(spiedPublishStateData.count, 3, 'publish state should have been called on strict regexp mode selection')
    assert.deepEqual(spiedPublishStateData.state, {
      searchText: 'xxx',
      searchMode: SEARCH_MODES_ENUM.REGEXP,
    }, 'State should be correctly updated when user selects regexp mode')
    assert.isDefined(spiedPublishStateData.requestParameters, 'Regexp mode selection: query should be computed')

    enzymeWrapper.instance().onSelectContainsMode()
    assert.equal(spiedPublishStateData.count, 3, 'publish state should not have been called on contains selection (already selected)')
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

    // 2 - Regexp queries
    assert.deepEqual(StringCriterionContainer.convertToRequestParameters({ searchText: 'FULL_word"+', searchMode: SEARCH_MODES_ENUM.REGEXP }, attribute),
      { q: 'attr.path.x1:(FULL_word"+)' })
    assert.deepEqual(StringCriterionContainer.convertToRequestParameters({ searchText: 'FULL word *', searchMode: SEARCH_MODES_ENUM.REGEXP }, attribute),
      { q: 'attr.path.x1:(FULL word *)' })
    assert.isNotOk(StringCriterionContainer.convertToRequestParameters({ searchText: null, searchMode: SEARCH_MODES_ENUM.REGEXP }, attribute).q)
    assert.isNotOk(StringCriterionContainer.convertToRequestParameters({ searchText: '', searchMode: SEARCH_MODES_ENUM.REGEXP }, attribute).q)
    assert.isNotOk(StringCriterionContainer.convertToRequestParameters({ searchText: '          ', searchMode: SEARCH_MODES_ENUM.REGEXP }, attribute).q)
    assert.isNotOk(StringCriterionContainer.convertToRequestParameters({ searchText: undefined, searchMode: SEARCH_MODES_ENUM.REGEXP }, attribute).q)
    assert.isNotOk(StringCriterionContainer.convertToRequestParameters({ searchMode: SEARCH_MODES_ENUM.REGEXP }, attribute).q)

    // 3 - Contains queries
    assert.deepEqual(StringCriterionContainer.convertToRequestParameters({ searchText: 'FULL_word"+', searchMode: SEARCH_MODES_ENUM.CONTAINS }, attribute),
      { q: 'attr.path.x1:FULL_word\\"\\+' })
    assert.deepEqual(StringCriterionContainer.convertToRequestParameters({ searchText: 'FULL- word *', searchMode: SEARCH_MODES_ENUM.CONTAINS }, attribute),
      { q: 'attr.path.x1:(FULL\\- AND word AND \\*)' })
    assert.isNotOk(StringCriterionContainer.convertToRequestParameters({ searchText: null, searchMode: SEARCH_MODES_ENUM.CONTAINS }, attribute).q)
    assert.isNotOk(StringCriterionContainer.convertToRequestParameters({ searchText: '', searchMode: SEARCH_MODES_ENUM.CONTAINS }, attribute).q)
    assert.isNotOk(StringCriterionContainer.convertToRequestParameters({ searchText: '          ', searchMode: SEARCH_MODES_ENUM.CONTAINS }, attribute).q)
    assert.isNotOk(StringCriterionContainer.convertToRequestParameters({ searchText: undefined, searchMode: SEARCH_MODES_ENUM.CONTAINS }, attribute).q)
    assert.isNotOk(StringCriterionContainer.convertToRequestParameters({ searchMode: SEARCH_MODES_ENUM.CONTAINS }, attribute).q)

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
