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
import { buildTestContext, testSuiteHelpers, criterionTestSuiteHelpers } from '@regardsoss/tests-helpers'
import { DamDomain } from '@regardsoss/domain'
import { TwoTemporalCriteriaContainer } from '../../src/containers/TwoTemporalCriteriaContainer'
import TwoTemporalCriteriaComponent from '../../src/components/TwoTemporalCriteriaComponent'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)


/**
 * Test case for {@link TwoTemporalCriteriaContainer}
 *
 * @author Xavier-Alexandre Brochard
 */
describe('[Two temporal criterion] Testing TwoTemporalCriteriaContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)
  it('should exists', () => {
    assert.isDefined(TwoTemporalCriteriaContainer)
  })
  it('should render the simple component when two different attributes, publishing state on date updates', () => {
    const spiedPublishStateData = {
      count: 0,
      state: null,
      requestParameters: null,
    }
    const props = {
      // parent callbacks (required)
      pluginInstanceId: 'any',
      attributes: {
        firstField: {
          ...criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601),
          name: 'firstAttribute',
          jsonPath: 'x.attr1',
        },
        secondField: {
          ...criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601),
          name: 'secondAttribute',
          jsonPath: 'x.attr2',
        },
      },
      state: {
        value1: '2017-09-27T13:15:42.726Z',
        value2: null,
      },
      publishState: (state, requestParameters) => {
        spiedPublishStateData.count += 1
        spiedPublishStateData.state = state
        spiedPublishStateData.requestParameters = requestParameters
      },
    }
    const enzymeWrapper = shallow(<TwoTemporalCriteriaContainer {...props} />, { context })
    const component = enzymeWrapper.find(TwoTemporalCriteriaComponent)
    assert.lengthOf(component, 1, 'There should be the component')
    testSuiteHelpers.assertWrapperProperties(component, {
      attribute1: props.attributes.firstField,
      attribute2: props.attributes.secondField,
      value1: new Date(props.state.value1),
      value2: null,
      onDate1Changed: enzymeWrapper.instance().onDate1Changed,
      onDate2Changed: enzymeWrapper.instance().onDate2Changed,
    })
    // Update date 2 and check state is updated AND QUERY MATCHES THE MULTIPLE ATTRIBUTES
    enzymeWrapper.instance().onDate2Changed(new Date('2017-09-28T13:15:42.726Z'))
    assert.equal(spiedPublishStateData.count, 1, 'onDate2Changed: spiedPublishStateData should have been called')
    const expectedState = {
      value1: '2017-09-27T13:15:42.726Z',
      value2: '2017-09-28T13:15:42.726Z',
    }
    assert.deepEqual(spiedPublishStateData.state, expectedState, 'onDate2Changed: new state should be correctly computed from previous state (props) and new value')
    assert.deepEqual(spiedPublishStateData.requestParameters,
      { q: TwoTemporalCriteriaContainer.convertToMultipleAttributesQuery(expectedState, props.attributes.firstField, props.attributes.secondField) },
      'The query should be converted for multiple attributes')
    assert.notDeepEqual(spiedPublishStateData.requestParameters,
      { q: TwoTemporalCriteriaContainer.convertToSingleAttributeQuery(expectedState, props.attributes.firstField) },
      'The query should not be converted for single attribute')

    // Update date 1 and check state is published
    enzymeWrapper.instance().onDate1Changed(new Date('2017-09-28T13:15:42.726Z'))
    assert.equal(spiedPublishStateData.count, 2, 'onDate1Changed: spiedPublishStateData should have been called')
    assert.deepEqual(spiedPublishStateData.state, {
      value1: '2017-09-28T13:15:42.726Z',
      value2: null,
    }, 'onDate2Changed: new state should be correctly computed from previous state (props) and new value')
  })
  it('should render the composed component when just a single attribute, publishing state on date updates', () => {
    const attribute = {
      ...criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601),
      name: 'firstAttribute',
      jsonPath: 'x.attr1',
    }
    const spiedPublishStateData = {
      count: 0,
      state: null,
      requestParameters: null,
    }
    const props = {
      // parent callbacks (required)
      pluginInstanceId: 'any',
      attributes: {
        firstField: attribute,
        secondField: attribute,
      },
      state: {
        value1: '2017-09-27T13:15:42.726Z',
        value2: null,
      },
      publishState: (state, requestParameters) => {
        spiedPublishStateData.count += 1
        spiedPublishStateData.state = state
        spiedPublishStateData.requestParameters = requestParameters
      },
    }
    const enzymeWrapper = shallow(<TwoTemporalCriteriaContainer {...props} />, { context })
    const component = enzymeWrapper.find(TwoTemporalCriteriaComponent)
    assert.lengthOf(component, 1, 'There should be the component')
    testSuiteHelpers.assertWrapperProperties(component, {
      attribute1: attribute,
      attribute2: attribute,
      value1: new Date(props.state.value1),
      value2: null,
      onDate1Changed: enzymeWrapper.instance().onDate1Changed,
      onDate2Changed: enzymeWrapper.instance().onDate2Changed,
    })
    // Update date 2 and check state is updated AND QUERY MATCHES THE SINGLE ATTRIBUTE
    enzymeWrapper.instance().onDate2Changed(new Date('2017-09-28T13:15:42.726Z'))
    assert.equal(spiedPublishStateData.count, 1, 'onDate2Changed: spiedPublishStateData should have been called')
    const expectedState = {
      value1: '2017-09-27T13:15:42.726Z',
      value2: '2017-09-28T13:15:42.726Z',
    }
    assert.deepEqual(spiedPublishStateData.state, expectedState, 'onDate2Changed: new state should be correctly computed from previous state (props) and new value')
    assert.deepEqual(spiedPublishStateData.requestParameters,
      { q: TwoTemporalCriteriaContainer.convertToSingleAttributeQuery(expectedState, attribute) },
      'The query should be converted for single attributes')
    assert.notDeepEqual(spiedPublishStateData.requestParameters,
      { q: TwoTemporalCriteriaContainer.convertToMultipleAttributesQuery(expectedState, props.attributes.firstField, props.attributes.secondField) },
      'The query should not be converted for multiple attributes')

    // Update date 1 and check state is published
    enzymeWrapper.instance().onDate1Changed(new Date('2017-09-28T13:15:42.726Z'))
    assert.equal(spiedPublishStateData.count, 2, 'onDate1Changed: spiedPublishStateData should have been called')
    assert.deepEqual(spiedPublishStateData.state, {
      value1: '2017-09-28T13:15:42.726Z',
      value2: null,
    }, 'onDate2Changed: new state should be correctly computed from previous state (props) and new value')
  })
  it('should convert correctly single attribute requests', () => {
    const attribute = {
      ...criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601),
      name: 'firstAttribute',
      jsonPath: 'x.attr1',
    }
    const value1 = '2017-09-27T13:15:42.726Z'
    const value2 = '2017-09-28T13:15:42.726Z'
    // 1 - Lower value only
    assert.equal(TwoTemporalCriteriaContainer.convertToSingleAttributeQuery({ value1 }, attribute),
      'x.attr1:[2017-09-27T13:15:42.726Z TO *]', '1- Lower bound query should be correctly built')
    // 2 - Upper value only
    assert.equal(TwoTemporalCriteriaContainer.convertToSingleAttributeQuery({ value2 }, attribute),
      'x.attr1:[* TO 2017-09-28T13:15:42.726Z]', '2- Upper bound query should be correctly built')
    // 3 - Both values
    assert.equal(TwoTemporalCriteriaContainer.convertToSingleAttributeQuery({ value1, value2 }, attribute),
      'x.attr1:[2017-09-27T13:15:42.726Z TO 2017-09-28T13:15:42.726Z]', '3- Both bounds query should be correctly built')
    // 4 - No value
    assert.isNotOk(TwoTemporalCriteriaContainer.convertToSingleAttributeQuery({ }, attribute),
      '4- No query should be built for no value')
    // 5 - No JSON path
    const attributeWithoutJP = { ...attribute, jsonPath: null }
    assert.isNotOk(TwoTemporalCriteriaContainer.convertToSingleAttributeQuery({ value1, value2 }, attributeWithoutJP),
      '5- No query should be built when attribute has no json path')
  })
  it('should convert correctly two attributes requests', () => {
    /* Note: entered values are inverted in open search query, see convertToMultipleAttributesQuery comment */
    const attribute1 = {
      ...criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601),
      name: 'firstAttribute',
      jsonPath: 'x.attr1',
    }
    const attribute2 = {
      ...criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601),
      name: 'firstAttribute',
      jsonPath: 'x.attr2',
    }
    const value1 = '2017-09-27T13:15:42.726Z'
    const value2 = '2017-09-28T13:15:42.726Z'
    // 1 - Lower value only
    assert.equal(TwoTemporalCriteriaContainer.convertToMultipleAttributesQuery({ value1 }, attribute1, attribute2),
      'x.attr2:[2017-09-27T13:15:42.726Z TO *]', '1- Lower bound query should be correctly built')
    // 2 - Upper value only
    assert.equal(TwoTemporalCriteriaContainer.convertToMultipleAttributesQuery({ value2 }, attribute1, attribute2),
      'x.attr1:[* TO 2017-09-28T13:15:42.726Z]', '2- Upper bound query should be correctly built')
    // 3 - Both values
    assert.equal(TwoTemporalCriteriaContainer.convertToMultipleAttributesQuery({ value1, value2 }, attribute1, attribute2),
      'x.attr2:[2017-09-27T13:15:42.726Z TO *] AND x.attr1:[* TO 2017-09-28T13:15:42.726Z]',
      '3- Both bounds query should be correctly built')
    // 4 - No value
    assert.isNotOk(TwoTemporalCriteriaContainer.convertToMultipleAttributesQuery({ }, attribute1, attribute2),
      '4- No query should be built for no value')
    // 5 - No JSON path
    const attribute1WithoutJP = { ...attribute1, jsonPath: null }
    const attribute2WithoutJP = { ...attribute2, jsonPath: null }
    assert.equal(TwoTemporalCriteriaContainer.convertToMultipleAttributesQuery({ value1, value2 }, attribute1WithoutJP, attribute2),
      'x.attr2:[2017-09-27T13:15:42.726Z TO *]', '5.1- Only attribute2 with JSON path should be exported as query')
    assert.equal(TwoTemporalCriteriaContainer.convertToMultipleAttributesQuery({ value1, value2 }, attribute1, attribute2WithoutJP),
      'x.attr1:[* TO 2017-09-28T13:15:42.726Z]', '5.2- Only attribute1 with JSON path should be exported as query')
    assert.isNotOk(TwoTemporalCriteriaContainer.convertToMultipleAttributesQuery({ value1, value2 }, attribute1WithoutJP, attribute2WithoutJP),
      '5.3- No query should be exported as no attribute has json path')
  })
})
