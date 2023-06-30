/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { FullTextCriterionContainer } from '../../src/containers/FullTextCriterionContainer'
import FullTextCriterionComponent from '../../src/components/FullTextCriterionComponent'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Test FullTextCriteriaContainer
 * @author Raphaël Mechali
 */
describe('[Full text criterion] Testing FullTextCriteriaContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(FullTextCriterionContainer)
  })
  it('should render correctly', () => {
    const props = {
      label: criterionTestSuiteHelpers.getLabelStub(),
      state: {
        searchText: 'Some research...',
      },
      publishState: () => {},
    }
    const enzymeWrapper = shallow(<FullTextCriterionContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(FullTextCriterionComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      label: props.label,
      searchText: props.state.searchText,
      onTextInput: enzymeWrapper.instance().onTextInput,
    }, 'State and callback should be correctly provided to component')
  })
  it('should publish state on text input', () => {
    const spiedPublishData = {
      count: 0,
      state: null,
      requestParameters: null,
    }
    const props = {
      label: criterionTestSuiteHelpers.getLabelStub(),
      state: {
        searchText: '',
      },
      publishState: (state, requestParameters) => {
        spiedPublishData.count += 1
        spiedPublishData.state = state
        spiedPublishData.requestParameters = requestParameters
      },
    }
    const enzymeWrapper = shallow(<FullTextCriterionContainer {...props} />, { context })
    // check publish state was not initially called
    assert.equal(spiedPublishData.count, 0, 'State should not be initially published')

    // 1 - call text input once
    enzymeWrapper.instance().onTextInput(null, '   To  ')
    assert.equal(spiedPublishData.count, 1, '1 - Publish data should have been called 1 time')
    assert.deepEqual(spiedPublishData.state, {
      searchText: '   To  ',
    }, '1 - State should match with text')
    assert.deepEqual(spiedPublishData.requestParameters, { q: '*To*' }, '1 - Query should match with text, triming white spaces')

    // 1 - call text input twice
    enzymeWrapper.instance().onTextInput(null, '   aaa bbbb c')
    assert.equal(spiedPublishData.count, 2, '2 - Publish data should have been called 2 times')
    assert.deepEqual(spiedPublishData.state, {
      searchText: '   aaa bbbb c',
    }, '2 - State should match with text')
    assert.deepEqual(spiedPublishData.requestParameters, { q: '*aaa* AND *bbbb* AND *c*' }, '2 - Query should match with text, triming white spaces')
  })
})
