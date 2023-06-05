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
      expectedQuery: { q: 'x.a1:[* TO 2017-05-22T12:25:25.150Z]' }, // reversed, see class documentation
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
      expectedQuery: { q: 'y.a2:[2017-07-26T08:11:05.222Z TO *] AND x.a1:[* TO 2030-05-02T11:40:54.756Z]' },
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
      expectedQuery: { q: 'y.a2:[2010-11-14T23:10:37.868Z TO *] AND x.a1:[* TO 2030-05-02T11:40:54.756Z]' },
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
      expectedQuery: { q: 'y.a2:[2010-11-14T23:10:37.868Z TO *]' },
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
      update: () => enzymeWrapper.instance().onDate2Changed(new Date('2016-07-26T05:11:05.222Z')),
      expectedState: {
        error: false,
        time1: TwoTemporalCriteriaContainer.DEFAULT_STATE.time1,
        time2: new Date('2016-07-26T05:11:05.222Z').getTime(),
      },
      expectedQuery: { q: 'x.a1:[* TO 2016-07-26T05:11:05.222Z]' },
    }, {
      label: '#3: Set lower value greater than upper (error)',
      update: () => enzymeWrapper.instance().onDate1Changed(new Date('2016-08-02T11:40:54.756Z')),
      expectedState: {
        error: true,
        time1: new Date('2016-08-02T11:40:54.756Z').getTime(),
        time2: new Date('2016-07-26T05:11:05.222Z').getTime(),
      },
      expectedQuery: { },
    }, {
      label: '#4: Set lower value lower than upper bound (no error)',
      update: () => enzymeWrapper.instance().onDate1Changed(new Date('2010-04-17T16:35:44.133Z')),
      expectedState: {
        error: false,
        time1: new Date('2010-04-17T16:35:44.133Z').getTime(),
        time2: new Date('2016-07-26T05:11:05.222Z').getTime(),
      },
      expectedQuery: { q: 'x.a1:[2010-04-17T16:35:44.133Z TO 2016-07-26T05:11:05.222Z]' },
    }, {
      label: '#5: Set upper value in far future (no error)',
      update: () => enzymeWrapper.instance().onDate2Changed(new Date('2035-09-07T05:05:05.005Z')),
      expectedState: {
        error: false,
        time1: new Date('2010-04-17T16:35:44.133Z').getTime(),
        time2: new Date('2035-09-07T05:05:05.005Z').getTime(),
      },
      expectedQuery: { q: 'x.a1:[2010-04-17T16:35:44.133Z TO 2035-09-07T05:05:05.005Z]' },
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
      expectedQuery: { q: 'x.a1:[* TO 2035-09-07T05:05:05.005Z]' },
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
})
