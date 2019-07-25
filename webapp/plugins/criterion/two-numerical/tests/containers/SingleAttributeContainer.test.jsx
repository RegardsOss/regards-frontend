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
import { SingleAttributeContainer } from '../../src/containers/SingleAttributeContainer'
import NumericalCriterionComponent from '../../src/components/NumericalCriterionComponent'
import SingleAttributeComponent from '../../src/components/SingleAttributeComponent'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/**
 * Test case for {@link SingleAttributeContainer}
 *
 * @author Xavier-Alexandre Brochard
 */
describe('[Two numerical criteria] Testing SingleAttributeContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)
  it('should exists', () => {
    assert.isDefined(SingleAttributeContainer)
    assert.isDefined(NumericalCriterionComponent)
  })
  it('should render self and subcomponents and publish state on updates', () => {
    const spiedPublishStateData = {
      count: 0,
      state: null,
      requestParameters: null,
    }
    const props = {
      // parent callbacks (required)
      pluginInstanceId: 'any',
      searchField: {
        ...criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.DOUBLE, null,
          criterionTestSuiteHelpers.getBoundsInformationStub(true, false, false, -25.3, 455555555543435421321354.2)),
        name: 'myAttribute',
        jsonPath: 'somewhere.over.the.rainbow',
      },
      state: {
        value1: -3.5,
        value2: 18,
      },
      publishState: (state, requestParameters) => {
        spiedPublishStateData.count += 1
        spiedPublishStateData.state = state
        spiedPublishStateData.requestParameters = requestParameters
      },
    }
    const enzymeWrapper = shallow(<SingleAttributeContainer {...props} />, { context })
    const component = enzymeWrapper.find(SingleAttributeComponent)
    assert.lengthOf(component, 1, 'There should be the component')
    testSuiteHelpers.assertWrapperProperties(component, {
      searchAttribute: props.searchField,
      value1: props.state.value1,
      value2: props.state.value2,
      onChangeValue1: enzymeWrapper.instance().onChangeValue1,
      onChangeValue2: enzymeWrapper.instance().onChangeValue2,
    }, 'Component properties should be correctly reported')
    // check updating value1 publihes state and query (query conversion is not tested here)
    enzymeWrapper.instance().onChangeValue1(-77.15)
    assert.equal(spiedPublishStateData.count, 1, 'OnChangeValue1: Publish data should have been called 1 time')
    assert.deepEqual(spiedPublishStateData.state, {
      value1: -77.15,
      value2: 18,
    }, 'OnChangeValue1: next state should be correctly computed from the props state')
    assert.isDefined(spiedPublishStateData.requestParameters, 'OnChangeValue1: query should have been built')
    // check updating value2 publihes state and query (query conversion is not tested here)
    enzymeWrapper.instance().onChangeValue2(777.777)
    assert.equal(spiedPublishStateData.count, 2, 'onChangeValue2: Publish data should have been called 2 times')
    assert.deepEqual(spiedPublishStateData.state, {
      value1: -3.5,
      value2: 777.777,
    }, 'OnChangeValue2: next state should be correctly computed from the props state')
    assert.isDefined(spiedPublishStateData.requestParameters, 'onChangeValue2: query should have been built')
  })
  it('should export correctly state to open search query', () => {
    // 1 - Build component to get instance
    const attribute = {
      ...criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.DOUBLE),
      jsonPath: 'somewhere.over.the.rainbow',
    }
    // 2 - test URL computing on instance
    // 2.1 - full range
    assert.deepEqual(SingleAttributeContainer.convertToRequestParameters({ value1: -0.569, value2: 0.32 }, attribute),
      { q: 'somewhere.over.the.rainbow:[\\-0.569 TO 0.32]' }, 'Full range should be correctly exported')
    // 2.2 - lower bound range
    assert.deepEqual(SingleAttributeContainer.convertToRequestParameters({ value1: 1.5 }, attribute),
      { q: 'somewhere.over.the.rainbow:[1.5 TO *]' }, 'Lower bound range should be correctly exported')
    // 2.3 - upper bound range
    assert.deepEqual(SingleAttributeContainer.convertToRequestParameters({ value2: -2.3 }, attribute),
      { q: 'somewhere.over.the.rainbow:[* TO \\-2.3]' }, 'Upper bound range should be correctly exported')
    // 2.4 -not exportable (no value)
    assert.isNotOk(SingleAttributeContainer.convertToRequestParameters({}, attribute).q,
      'Range query should not be exported when there is no value (full infinite range)')
    // 2.4 -not exportable (no attribute path)
    assert.isNotOk(SingleAttributeContainer.convertToRequestParameters({ value1: -0.569, value2: 0.32 }, { ...attribute, jsonPath: null }).q,
      'Range query should not be exported when there is attribute path')
  })
})
