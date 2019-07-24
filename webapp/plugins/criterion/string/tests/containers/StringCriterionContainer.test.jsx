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
        searchFullWords: true,
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
      searchFullWords: props.state.searchFullWords,
      onTextInput: enzymeWrapper.instance().onTextInput,
      onCheckFullWord: enzymeWrapper.instance().onCheckFullWord,
      allowFullword: true,
    }, 'Component properties should be correctly reported')
    // check state is published when text value is updated (query is not tested here)
    enzymeWrapper.instance().onTextInput(null, 'abc')
    assert.equal(spiedPublishStateData.count, 1, 'Update text: publish state should have been called 1 time')
    assert.deepEqual(spiedPublishStateData.state, {
      searchText: 'abc',
      searchFullWords: true,
    }, 'Update text: state should be computed with new value and previous state from props')
    assert.isDefined(spiedPublishStateData.requestParameters, 'Update text: requestParameters should be computed')
    // check state is published when full word is toggled (query is not tested here)
    enzymeWrapper.instance().onCheckFullWord()
    assert.equal(spiedPublishStateData.count, 2, 'Toggle full word: publish state should have been called 2 times')
    assert.deepEqual(spiedPublishStateData.state, {
      searchText: 'xxx',
      searchFullWords: false,
    }, 'Toggle full word: state should be computed with new value and previous state from props')
    assert.isDefined(spiedPublishStateData.requestParameters, 'Toggle full word: query should be computed')
  })
  it('should forbid fullword search on STRING_ARRAY attributes', () => {
    const props = {
      // parent callbacks (required)
      pluginInstanceId: 'any',
      attributes: {
        searchField: criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.STRING_ARRAY),
      },
      state: {
        searchText: 'xxx',
        searchFullWords: true,
      },
      publishState: () => {},
    }
    const enzymeWrapper = shallow(<StringCriterionContainer {...props} />, { context })
    const component = enzymeWrapper.find(StringCriterionComponent)
    assert.lengthOf(component, 1, 'There should be the component')
    testSuiteHelpers.assertWrapperProperties(component, {
      searchAttribute: props.attributes.searchField,
      searchText: props.state.searchText,
      searchFullWords: props.state.searchFullWords,
      onTextInput: enzymeWrapper.instance().onTextInput,
      onCheckFullWord: enzymeWrapper.instance().onCheckFullWord,
      allowFullword: false,
    }, 'Component properties should be correctly reported')
  })
  it('should convert correctly into a query', () => {
    const attribute = {
      ...criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.STRING),
      jsonPath: 'attr.path.x1',
    }
    // 1 - Full word query
    assert.deepEqual(StringCriterionContainer.convertToRequestParameters({ searchText: 'FULL_word', searchFullWords: true }, attribute),
      { q: 'attr.path.x1:"FULL_word"' })
    // 2 - Simple word part query
    assert.deepEqual(StringCriterionContainer.convertToRequestParameters({ searchText: 'WORD_part', searchFullWords: false }, attribute),
      { q: 'attr.path.x1:(*WORD_part*)' })
    // 3 - Many words parts query
    assert.deepEqual(StringCriterionContainer.convertToRequestParameters({ searchText: 'Part1 part2 PART3', searchFullWords: false }, attribute),
      { q: 'attr.path.x1:(*Part1* AND *part2* AND *PART3*)' })

    // 4 - No query - (No value, full word)
    assert.isNotOk(StringCriterionContainer.convertToRequestParameters({ searchText: null, searchFullWords: true }, attribute).q, '4- null should not be converted into a query')
    assert.isNotOk(StringCriterionContainer.convertToRequestParameters({ searchText: '', searchFullWords: true }, attribute).q, '4- "" should not be converted into a query')
    assert.isNotOk(StringCriterionContainer.convertToRequestParameters({ searchFullWords: true }, attribute).q, '4- undefined should not be converted into a query')
    // 5 - No value (No value, word parts)
    assert.isNotOk(StringCriterionContainer.convertToRequestParameters({ searchText: null, searchFullWords: false }, attribute).q, '5- null should not be converted into a query')
    assert.isNotOk(StringCriterionContainer.convertToRequestParameters({ searchText: '', searchFullWords: false }, attribute).q, '5- "" should not be converted into a query')
    assert.isNotOk(StringCriterionContainer.convertToRequestParameters({ searchFullWords: false }, attribute).q, '5- undefined should not be converted into a query')
    // 6 - No query (No attribute json path)
    const nonConvertable = { ...attribute, jsonPath: null }
    assert.isNotOk(StringCriterionContainer.convertToRequestParameters({ searchText: 'FULL_word', searchFullWords: true }, nonConvertable).q,
      '6 attribute with no JSON path should not be converted into a query (full word)"')
    assert.isNotOk(StringCriterionContainer.convertToRequestParameters({ searchText: 'WORD_part', searchFullWords: false }, nonConvertable).q,
      '6 attribute with no JSON path should not be converted into a query (word parts)"')
  })
})
