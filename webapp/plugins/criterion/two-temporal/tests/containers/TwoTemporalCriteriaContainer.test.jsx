/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
  // override timezone offset to make it constant for tests (+3h) - avoids tests issues on other timezones
  let savedGetTimezoneOffset
  before(() => {
    savedGetTimezoneOffset = Date.prototype.getTimezoneOffset
    // eslint-disable-next-line no-extend-native
    Date.prototype.getTimezoneOffset = () => 180 // in minutes
    testSuiteHelpers.before()
  })
  after(() => {
    // eslint-disable-next-line no-extend-native
    Date.prototype.getTimezoneOffset = savedGetTimezoneOffset
    testSuiteHelpers.after()
  })
  it('should exists', () => {
    assert.isDefined(TwoTemporalCriteriaContainer)
  })
  it('should render and update state / query correctly with two different attributes', () => {
    const spiedPublishStateData = {
      state: null,
      requestParameters: null,
    }

    const props = {
      // parent callbacks (required)
      pluginInstanceId: 'any',
      attributes: {
        firstField: {
          ...criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601, null,
            criterionTestSuiteHelpers.getBoundsInformationStub(true, false, false, '2015-01-01T06:00:00.000Z', '2017-01-01T06:00:00.000Z')),
          name: 'firstAttribute',
          jsonPath: 'x.a1',
        },
        secondField: {
          ...criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601, null,
            criterionTestSuiteHelpers.getBoundsInformationStub(true, false, false, '2016-06-01T06:00:00.000Z', '2018-01-01T06:00:00.000Z')),
          name: 'secondAttribute',
          jsonPath: 'y.a2',
        },
      },
      label: criterionTestSuiteHelpers.getLabelStub(),
      publishState: (state, requestParameters) => {
        spiedPublishStateData.state = state
        spiedPublishStateData.requestParameters = requestParameters
      },
    }
    // 0 - Build up and check initial state
    const enzymeWrapper = shallow(<TwoTemporalCriteriaContainer {...props} />, { context })
    let componentWrapper = enzymeWrapper.find(TwoTemporalCriteriaComponent)
    assert.lengthOf(componentWrapper, 1, 'Init - There should be the component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      pluginInstanceId: props.pluginInstanceId,
      label: props.label,
      attribute1: props.attributes.firstField,
      attribute2: props.attributes.secondField,
      error: TwoTemporalCriteriaContainer.DEFAULT_STATE.error,
      value1: TwoTemporalCriteriaContainer.DEFAULT_STATE.time1,
      value2: TwoTemporalCriteriaContainer.DEFAULT_STATE.time2,
      onDate1Changed: enzymeWrapper.instance().onDate1Changed,
      onDate2Changed: enzymeWrapper.instance().onDate2Changed,
    }, 'Init - default state should be correctly reported')

    // apply successive update and check next state / query is correctly built / ignored
    const updates = [{
      label: '#1: Set upper value',
      // time 2 must be above attr1 range
      update: () => enzymeWrapper.instance().onDate2Changed(new Date('2017-05-22T12:25:25.150Z')),
      expectedState: {
        error: false,
        time1: TwoTemporalCriteriaContainer.DEFAULT_STATE.time1,
        time2: new Date('2017-05-22T12:25:25.150Z').getTime(),
      },
      expectedQuery: { q: 'x.a1:[* TO 2017-05-22T09:25:25.150Z]' }, // reversed, see class documentation
    }, {
      label: '#2: Set lower value greater than upper value (error)',
      update: () => enzymeWrapper.instance().onDate1Changed(new Date('2017-07-26T08:11:05.222Z')),
      expectedState: {
        error: true,
        time1: new Date('2017-07-26T08:11:05.222Z').getTime(),
        time2: new Date('2017-05-22T12:25:25.150Z').getTime(),
      },
      expectedQuery: { },
    }, {
      label: '#3: Set upper bound greater than lower (no error)',
      update: () => enzymeWrapper.instance().onDate2Changed(new Date('2030-05-02T11:40:54.756Z')),
      expectedState: {
        error: false,
        time1: new Date('2017-07-26T08:11:05.222Z').getTime(),
        time2: new Date('2030-05-02T11:40:54.756Z').getTime(),
      },
      expectedQuery: { q: 'y.a2:[2017-07-26T05:11:05.222Z TO *] AND x.a1:[* TO 2030-05-02T08:40:54.756Z]' },
    }, {
      label: '#4: Set lower bound greater than attribute 2 range (error)',
      update: () => enzymeWrapper.instance().onDate1Changed(new Date('2029-04-17T16:35:44.133Z')),
      expectedState: {
        error: true,
        time1: new Date('2029-04-17T16:35:44.133Z').getTime(),
        time2: new Date('2030-05-02T11:40:54.756Z').getTime(),
      },
      expectedQuery: { },
    }, {
      label: '#5: Set lower bound lower than attribute 2 range (no error)',
      update: () => enzymeWrapper.instance().onDate1Changed(new Date('2010-11-14T23:10:37.868Z')),
      expectedState: {
        error: false,
        time1: new Date('2010-11-14T23:10:37.868Z').getTime(),
        time2: new Date('2030-05-02T11:40:54.756Z').getTime(),
      },
      // 1 hour shift only on min date (winter time change)
      expectedQuery: { q: 'y.a2:[2010-11-14T20:10:37.868Z TO *] AND x.a1:[* TO 2030-05-02T08:40:54.756Z]' },
    }, {
      label: '#6: Set upper lower than attribute 1 range (error)',
      update: () => enzymeWrapper.instance().onDate2Changed(new Date('2012-01-01T06:00:00.000Z')),
      expectedState: {
        error: true,
        time1: new Date('2010-11-14T23:10:37.868Z').getTime(),
        time2: new Date('2012-01-01T06:00:00.000Z').getTime(),
      },
      expectedQuery: { },
    }, {
      label: '#7: Unset upper bound (no error)',
      update: () => enzymeWrapper.instance().onDate2Changed(null),
      expectedState: {
        error: false,
        time1: new Date('2010-11-14T23:10:37.868Z').getTime(),
        time2: null,
      },
      expectedQuery: { q: 'y.a2:[2010-11-14T20:10:37.868Z TO *]' },
    }, {
      label: '#8: Unset lower bound (no error)',
      update: () => enzymeWrapper.instance().onDate1Changed(null),
      expectedState: {
        error: false,
        time1: null,
        time2: null,
      },
      expectedQuery: {},
    }]
    updates.forEach(({
      label, update, expectedState, expectedQuery,
    }) => {
      update()
      assert.deepEqual(spiedPublishStateData.state, expectedState, `${label} - Next state should be correctly computed`)
      assert.deepEqual(spiedPublishStateData.requestParameters, expectedQuery, `${label} - Next query should be correctly computed`)
      enzymeWrapper.setProps({
        ...props,
        state: expectedState,
      })
      componentWrapper = enzymeWrapper.find(TwoTemporalCriteriaComponent)
      assert.lengthOf(componentWrapper, 1, `${label} - There should be the component`)
      testSuiteHelpers.assertWrapperProperties(componentWrapper, {
        error: expectedState.error,
        value1: expectedState.time1 && new Date(expectedState.time1),
        value2: expectedState.time2 && new Date(expectedState.time2),
      }, `${label} - Mutable state properties should be correctly reported to the component`)
    })
  })
  it('should render and update state / query correctly with a single attribute', () => {
    const spiedPublishStateData = {
      state: null,
      requestParameters: null,
    }

    const props = {
      // parent callbacks (required)
      pluginInstanceId: 'any',
      attributes: {
        firstField: {
          ...criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601, null,
            criterionTestSuiteHelpers.getBoundsInformationStub(true, false, false, '2015-01-01T06:00:00.000Z', '2017-01-01T06:00:00.000Z')),
          name: 'firstAttribute',
          jsonPath: 'x.a1',
        },
        secondField: {
          ...criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601, null,
            criterionTestSuiteHelpers.getBoundsInformationStub(true, false, false, '2015-01-01T06:00:00.000Z', '2017-01-01T06:00:00.000Z')),
          name: 'firstAttribute',
          jsonPath: 'x.a1',
        },
      },
      label: criterionTestSuiteHelpers.getLabelStub(),
      publishState: (state, requestParameters) => {
        spiedPublishStateData.state = state
        spiedPublishStateData.requestParameters = requestParameters
      },
    }
    // 0 - Build up and check initial state
    const enzymeWrapper = shallow(<TwoTemporalCriteriaContainer {...props} />, { context })
    let componentWrapper = enzymeWrapper.find(TwoTemporalCriteriaComponent)
    assert.lengthOf(componentWrapper, 1, 'Init - There should be the component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      pluginInstanceId: props.pluginInstanceId,
      label: props.label,
      attribute1: props.attributes.firstField,
      attribute2: props.attributes.firstField,
      error: TwoTemporalCriteriaContainer.DEFAULT_STATE.error,
      value1: TwoTemporalCriteriaContainer.DEFAULT_STATE.time1,
      value2: TwoTemporalCriteriaContainer.DEFAULT_STATE.time2,
      onDate1Changed: enzymeWrapper.instance().onDate1Changed,
      onDate2Changed: enzymeWrapper.instance().onDate2Changed,
    }, 'Init - default state should be correctly reported')

    // apply successive update and check next state / query is correctly built / ignored
    const updates = [{
      label: '#1: Set upper value below attribute range (error)',
      update: () => enzymeWrapper.instance().onDate2Changed(new Date('2010-05-22T12:25:25.150Z')),
      expectedState: {
        error: true,
        time1: TwoTemporalCriteriaContainer.DEFAULT_STATE.time1,
        time2: new Date('2010-05-22T12:25:25.150Z').getTime(),
      },
      expectedQuery: { },
    }, {
      label: '#2: Set upper value in range',
      update: () => enzymeWrapper.instance().onDate2Changed(new Date('2016-07-26T08:11:05.222Z')),
      expectedState: {
        error: false,
        time1: TwoTemporalCriteriaContainer.DEFAULT_STATE.time1,
        time2: new Date('2016-07-26T08:11:05.222Z').getTime(),
      },
      expectedQuery: { q: 'x.a1:[* TO 2016-07-26T05:11:05.222Z]' },
    }, {
      label: '#3: Set lower value greater than upper (error)',
      update: () => enzymeWrapper.instance().onDate1Changed(new Date('2016-08-02T11:40:54.756Z')),
      expectedState: {
        error: true,
        time1: new Date('2016-08-02T11:40:54.756Z').getTime(),
        time2: new Date('2016-07-26T08:11:05.222Z').getTime(),
      },
      expectedQuery: { },
    }, {
      label: '#4: Set lower value lower than upper bound (no error)',
      update: () => enzymeWrapper.instance().onDate1Changed(new Date('2010-04-17T16:35:44.133Z')),
      expectedState: {
        error: false,
        time1: new Date('2010-04-17T16:35:44.133Z').getTime(),
        time2: new Date('2016-07-26T08:11:05.222Z').getTime(),
      },
      expectedQuery: { q: 'x.a1:[2010-04-17T13:35:44.133Z TO 2016-07-26T05:11:05.222Z]' },
    }, {
      label: '#5: Set upper value in far future (no error)',
      update: () => enzymeWrapper.instance().onDate2Changed(new Date('2035-09-07T05:05:05.005Z')),
      expectedState: {
        error: false,
        time1: new Date('2010-04-17T16:35:44.133Z').getTime(),
        time2: new Date('2035-09-07T05:05:05.005Z').getTime(),
      },
      expectedQuery: { q: 'x.a1:[2010-04-17T13:35:44.133Z TO 2035-09-07T02:05:05.005Z]' },
    }, {
      label: '#6: Set lower value greater than attribute range max (error)',
      update: () => enzymeWrapper.instance().onDate1Changed(new Date('2030-01-01T06:00:00.000Z')),
      expectedState: {
        error: true,
        time1: new Date('2030-01-01T06:00:00.000Z').getTime(),
        time2: new Date('2035-09-07T05:05:05.005Z').getTime(),
      },
      expectedQuery: { },
    }, {
      label: '#7: Unset lower bound (no error)',
      update: () => enzymeWrapper.instance().onDate1Changed(null),
      expectedState: {
        error: false,
        time1: null,
        time2: new Date('2035-09-07T05:05:05.005Z').getTime(),
      },
      expectedQuery: { q: 'x.a1:[* TO 2035-09-07T02:05:05.005Z]' },
    }, {
      label: '#8: Unset upper bound (no error)',
      update: () => enzymeWrapper.instance().onDate2Changed(null),
      expectedState: {
        error: false,
        time1: null,
        time2: null,
      },
      expectedQuery: {},
    }]
    updates.forEach(({
      label, update, expectedState, expectedQuery,
    }) => {
      update()
      assert.deepEqual(spiedPublishStateData.state, expectedState, `${label} - Next state should be correctly computed`)
      assert.deepEqual(spiedPublishStateData.requestParameters, expectedQuery, `${label} - Next query should be correctly computed`)
      enzymeWrapper.setProps({
        ...props,
        state: expectedState,
      })
      componentWrapper = enzymeWrapper.find(TwoTemporalCriteriaComponent)
      assert.lengthOf(componentWrapper, 1, `${label} - There should be the component`)
      testSuiteHelpers.assertWrapperProperties(componentWrapper, {
        error: expectedState.error,
        value1: expectedState.time1 && new Date(expectedState.time1),
        value2: expectedState.time2 && new Date(expectedState.time2),
      }, `${label} - Mutable state properties should be correctly reported to the component`)
    })
  })

  // it('should render the simple component when two different attributes, publishing state on date updates', () => {
  //   const component = enzymeWrapper.find(TwoTemporalCriteriaComponent)
  //   assert.lengthOf(component, 1, 'There should be the component')
  //   testSuiteHelpers.assertWrapperProperties(component, {
  //     attribute1: props.attributes.firstField,
  //     attribute2: props.attributes.secondField,
  //     value1: new Date(props.state.value1),
  //     value2: null,
  //     onDate1Changed: enzymeWrapper.instance().onDate1Changed,
  //     onDate2Changed: enzymeWrapper.instance().onDate2Changed,
  //   })
  //   // Update date 2 and check state is updated AND QUERY MATCHES THE MULTIPLE ATTRIBUTES
  //   enzymeWrapper.instance().onDate2Changed(new Date('2017-09-28T13:15:42.726Z'))
  //   assert.equal(spiedPublishStateData.count, 1, 'onDate2Changed: spiedPublishStateData should have been called')
  //   const expectedState = {
  //     value1: '2017-09-27T13:15:42.726Z',
  //     value2: '2017-09-28T13:15:42.726Z',
  //   }
  //   assert.deepEqual(spiedPublishStateData.state, expectedState, 'onDate2Changed: new state should be correctly computed from previous state (props) and new value')
  //   assert.deepEqual(spiedPublishStateData.requestParameters,
  //     { q: TwoTemporalCriteriaContainer.convertToMultipleAttributesQuery(expectedState, props.attributes.firstField, props.attributes.secondField) },
  //     'The query should be converted for multiple attributes')
  //   assert.notDeepEqual(spiedPublishStateData.requestParameters,
  //     { q: TwoTemporalCriteriaContainer.convertToSingleAttributeQuery(expectedState, props.attributes.firstField) },
  //     'The query should not be converted for single attribute')

  //   // Update date 1 and check state is published
  //   enzymeWrapper.instance().onDate1Changed(new Date('2017-09-28T13:15:42.726Z'))
  //   assert.equal(spiedPublishStateData.count, 2, 'onDate1Changed: spiedPublishStateData should have been called')
  //   assert.deepEqual(spiedPublishStateData.state, {
  //     value1: '2017-09-28T13:15:42.726Z',
  //     value2: null,
  //   }, 'onDate2Changed: new state should be correctly computed from previous state (props) and new value')
  // })
  // it('should render the composed component when just a single attribute, publishing state on date updates', () => {
  //   const attribute = {
  //     ...criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601),
  //     name: 'firstAttribute',
  //     jsonPath: 'x.attr1',
  //   }
  //   const spiedPublishStateData = {
  //     count: 0,
  //     state: null,
  //     requestParameters: null,
  //   }
  //   const props = {
  //     // parent callbacks (required)
  //     pluginInstanceId: 'any',
  //     attributes: {
  //       firstField: attribute,
  //       secondField: attribute,
  //     },
  //     state: {
  //       value1: '2017-09-27T13:15:42.726Z',
  //       value2: null,
  //     },
  //     publishState: (state, requestParameters) => {
  //       spiedPublishStateData.count += 1
  //       spiedPublishStateData.state = state
  //       spiedPublishStateData.requestParameters = requestParameters
  //     },
  //   }
  //   const enzymeWrapper = shallow(<TwoTemporalCriteriaContainer {...props} />, { context })
  //   const component = enzymeWrapper.find(TwoTemporalCriteriaComponent)
  //   assert.lengthOf(component, 1, 'There should be the component')
  //   testSuiteHelpers.assertWrapperProperties(component, {
  //     attribute1: attribute,
  //     attribute2: attribute,
  //     value1: new Date(props.state.value1),
  //     value2: null,
  //     onDate1Changed: enzymeWrapper.instance().onDate1Changed,
  //     onDate2Changed: enzymeWrapper.instance().onDate2Changed,
  //   })
  //   // Update date 2 and check state is updated AND QUERY MATCHES THE SINGLE ATTRIBUTE
  //   enzymeWrapper.instance().onDate2Changed(new Date('2017-09-28T13:15:42.726Z'))
  //   assert.equal(spiedPublishStateData.count, 1, 'onDate2Changed: spiedPublishStateData should have been called')
  //   const expectedState = {
  //     value1: '2017-09-27T13:15:42.726Z',
  //     value2: '2017-09-28T13:15:42.726Z',
  //   }
  //   assert.deepEqual(spiedPublishStateData.state, expectedState, 'onDate2Changed: new state should be correctly computed from previous state (props) and new value')
  //   assert.deepEqual(spiedPublishStateData.requestParameters,
  //     { q: TwoTemporalCriteriaContainer.convertToSingleAttributeQuery(expectedState, attribute) },
  //     'The query should be converted for single attributes')
  //   assert.notDeepEqual(spiedPublishStateData.requestParameters,
  //     { q: TwoTemporalCriteriaContainer.convertToMultipleAttributesQuery(expectedState, props.attributes.firstField, props.attributes.secondField) },
  //     'The query should not be converted for multiple attributes')

  //   // Update date 1 and check state is published
  //   enzymeWrapper.instance().onDate1Changed(new Date('2017-09-28T13:15:42.726Z'))
  //   assert.equal(spiedPublishStateData.count, 2, 'onDate1Changed: spiedPublishStateData should have been called')
  //   assert.deepEqual(spiedPublishStateData.state, {
  //     value1: '2017-09-28T13:15:42.726Z',
  //     value2: null,
  //   }, 'onDate2Changed: new state should be correctly computed from previous state (props) and new value')
  // })
  // it('should convert correctly single attribute requests', () => {
  //   const attribute = {
  //     ...criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601),
  //     name: 'firstAttribute',
  //     jsonPath: 'x.attr1',
  //   }

  //   // Creates date in local timezone (no Z)
  //   const value1 = '2017-09-27T13:15:42.726'
  //   const value2 = '2017-09-28T13:15:42.726'
  //   // Results should be same dates with Z for UTC
  //   // This is done to simulate UTC date selected by users and not in the local timeZone

  //   // 1 - Lower value only
  //   assert.equal(TwoTemporalCriteriaContainer.convertToSingleAttributeQuery({ value1 }, attribute),
  //     'x.attr1:[2017-09-27T13:15:42.726Z TO *]', '1- Lower bound query should be correctly built')
  //   // 2 - Upper value only
  //   assert.equal(TwoTemporalCriteriaContainer.convertToSingleAttributeQuery({ value2 }, attribute),
  //     'x.attr1:[* TO 2017-09-28T13:15:42.726Z]', '2- Upper bound query should be correctly built')
  //   // 3 - Both values
  //   assert.equal(TwoTemporalCriteriaContainer.convertToSingleAttributeQuery({ value1, value2 }, attribute),
  //     'x.attr1:[2017-09-27T13:15:42.726Z TO 2017-09-28T13:15:42.726Z]', '3- Both bounds query should be correctly built')
  //   // 4 - No value
  //   assert.isNotOk(TwoTemporalCriteriaContainer.convertToSingleAttributeQuery({ }, attribute),
  //     '4- No query should be built for no value')
  //   // 5 - No JSON path
  //   const attributeWithoutJP = { ...attribute, jsonPath: null }
  //   assert.isNotOk(TwoTemporalCriteriaContainer.convertToSingleAttributeQuery({ value1, value2 }, attributeWithoutJP),
  //     '5- No query should be built when attribute has no json path')
  // })
  // it('should convert correctly two attributes requests', () => {
  //   /* Note: entered values are inverted in open search query, see convertToMultipleAttributesQuery comment */
  //   const attribute1 = {
  //     ...criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601),
  //     name: 'firstAttribute',
  //     jsonPath: 'x.attr1',
  //   }
  //   const attribute2 = {
  //     ...criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601),
  //     name: 'firstAttribute',
  //     jsonPath: 'x.attr2',
  //   }
  //   // Creates date in local timezone (no Z)
  //   const value1 = '2017-09-27T13:15:42.726'
  //   const value2 = '2017-09-28T13:15:42.726'
  //   // Results should be same dates with Z for UTC
  //   // This is done to simulate UTC date selected by users and not in the local timeZone

  //   // 1 - Lower value only
  //   assert.equal(TwoTemporalCriteriaContainer.convertToMultipleAttributesQuery({ value1 }, attribute1, attribute2),
  //     'x.attr2:[2017-09-27T13:15:42.726Z TO *]', '1- Lower bound query should be correctly built')
  //   // 2 - Upper value only
  //   assert.equal(TwoTemporalCriteriaContainer.convertToMultipleAttributesQuery({ value2 }, attribute1, attribute2),
  //     'x.attr1:[* TO 2017-09-28T13:15:42.726Z]', '2- Upper bound query should be correctly built')
  //   // 3 - Both values
  //   assert.equal(TwoTemporalCriteriaContainer.convertToMultipleAttributesQuery({ value1, value2 }, attribute1, attribute2),
  //     'x.attr2:[2017-09-27T13:15:42.726Z TO *] AND x.attr1:[* TO 2017-09-28T13:15:42.726Z]',
  //     '3- Both bounds query should be correctly built')
  //   // 4 - No value
  //   assert.isNotOk(TwoTemporalCriteriaContainer.convertToMultipleAttributesQuery({ }, attribute1, attribute2),
  //     '4- No query should be built for no value')
  //   // 5 - No JSON path
  //   const attribute1WithoutJP = { ...attribute1, jsonPath: null }
  //   const attribute2WithoutJP = { ...attribute2, jsonPath: null }
  //   assert.equal(TwoTemporalCriteriaContainer.convertToMultipleAttributesQuery({ value1, value2 }, attribute1WithoutJP, attribute2),
  //     'x.attr2:[2017-09-27T13:15:42.726Z TO *]', '5.1- Only attribute2 with JSON path should be exported as query')
  //   assert.equal(TwoTemporalCriteriaContainer.convertToMultipleAttributesQuery({ value1, value2 }, attribute1, attribute2WithoutJP),
  //     'x.attr1:[* TO 2017-09-28T13:15:42.726Z]', '5.2- Only attribute1 with JSON path should be exported as query')
  //   assert.isNotOk(TwoTemporalCriteriaContainer.convertToMultipleAttributesQuery({ value1, value2 }, attribute1WithoutJP, attribute2WithoutJP),
  //     '5.3- No query should be exported as no attribute has json path')
  // })
})
