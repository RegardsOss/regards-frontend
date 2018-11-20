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
import { EnumNumericalComparator } from '@regardsoss/domain/common'
import { DamDomain, CommonDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers, criterionTestSuiteHelpers } from '@regardsoss/tests-helpers'
import { MultipleAttributesContainer } from '../../src/containers/MultipleAttributesContainer'
import NumericalCriterionComponent from '../../src/components/NumericalCriterionComponent'
import styles from '../../src/styles/styles'
import MultipleAttributesComponent from '../../src/components/MultipleAttributesComponent'

const context = buildTestContext(styles)

/**
 * Test case for {@link MultipleAttributesContainer}
 *
 * @author Xavier-Alexandre Brochard
 */
describe('[Two numerical criteria] Testing MultipleAttributesContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)
  it('should exists', () => {
    assert.isDefined(MultipleAttributesContainer)
    assert.isDefined(NumericalCriterionComponent)
  })
  it('should render self and subcomponents and publish state on updates', () => {
    const spiedPublishStateData = {
      count: 0,
      state: null,
      query: null,
    }
    const props = {
      pluginInstanceId: 'any',
      // This attributes has bounds in context
      firstField: {
        ...criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.DOUBLE, 'dB',
          criterionTestSuiteHelpers.getBoundsInformationStub(true, false, false, null, 25.5)),
        name: 'firstField',
        jsonPath: 'pipapa.padapo',
      },
      // This attributes has no bound in context
      secondField: {
        ...criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.INTEGER, null,
          criterionTestSuiteHelpers.getBoundsInformationStub(true, false, false)),
        name: 'secondField',
        jsonPath: 'papapa.padapo',
      },
      state: {
        value1: 34,
        comparator1: CommonDomain.EnumNumericalComparator.GE,
        value2: null,
        comparator2: CommonDomain.EnumNumericalComparator.LE,
      },
      publishState: (state, query) => {
        spiedPublishStateData.count += 1
        spiedPublishStateData.state = state
        spiedPublishStateData.query = query
      },
    }
    const enzymeWrapper = shallow(<MultipleAttributesContainer {...props} />, { context })
    const component = enzymeWrapper.find(MultipleAttributesComponent)
    assert.lengthOf(component, 1, 'There should be the component')
    testSuiteHelpers.assertWrapperProperties(component, {
      attribute1: props.firstField,
      value1: props.state.value1,
      comparator1: props.state.comparator1,
      availableComparators1: MultipleAttributesContainer.AVAILABLE_FLOAT_COMPARATORS,
      onChangeValue1: enzymeWrapper.instance().onChangeValue1,

      attribute2: props.secondField,
      value2: props.state.value2,
      comparator2: props.state.comparator2,
      availableComparators2: MultipleAttributesContainer.AVAILABLE_INT_COMPARATORS,
      onChangeValue2: enzymeWrapper.instance().onChangeValue2,
    })
    // check updating value1 publihes state and query (query conversion is not tested here)
    enzymeWrapper.instance().onChangeValue1(18, CommonDomain.EnumNumericalComparator.EQ)
    assert.equal(spiedPublishStateData.count, 1, 'OnChangeValue1: Publish data should have been called 1 time')
    assert.deepEqual(spiedPublishStateData.state, {
      value1: 18,
      comparator1: CommonDomain.EnumNumericalComparator.EQ,
      value2: null,
      comparator2: CommonDomain.EnumNumericalComparator.LE,
    }, 'OnChangeValue1: next state should be correctly computed from the props state')
    assert.isDefined(spiedPublishStateData.query, 'OnChangeValue1: query should have been built')
    // check updating value2 publihes state and query (query conversion is not tested here)
    enzymeWrapper.instance().onChangeValue2(-55, CommonDomain.EnumNumericalComparator.GE)
    assert.equal(spiedPublishStateData.count, 2, 'onChangeValue2: Publish data should have been called 2 times')
    assert.deepEqual(spiedPublishStateData.state, {
      value1: 34,
      comparator1: CommonDomain.EnumNumericalComparator.GE,
      value2: -55,
      comparator2: CommonDomain.EnumNumericalComparator.GE,
    }, 'OnChangeValue2: next state should be correctly computed from the props state')
    assert.isDefined(spiedPublishStateData.query, 'onChangeValue2: query should have been built')
  })
  it('should export correctly state to open search URL', () => {
    const firstAttribute = {
      ...criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.INTEGER),
      name: 'firstField',
      jsonPath: 'pipapa.padapo',
    }
    const secondAttribute = {
      ...criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.INTEGER),
      name: 'secondField',
      jsonPath: 'papapa.padapo',
    }
    // 2 - test URL computing on instance (using test list to avoid some boiler plate)
    const urlComputingTests = [
      {
        state: {
          value1: -3.14,
          comparator1: EnumNumericalComparator.GE,
          value2: 0.125,
          comparator2: EnumNumericalComparator.LE,
        },
        testCaseMsg: '1) Component should compute rigth URL for full range',
        expectedURL: 'pipapa.padapo:[\\-3.14 TO *] AND papapa.padapo:[* TO 0.125]',
      }, {
        state: {
          value1: -0.1,
          comparator1: EnumNumericalComparator.EQ,
          value2: null,
          comparator2: EnumNumericalComparator.EQ,
        },
        testCaseMsg: '2) Component should compute right URL when range has only first field entered',
        expectedURL: 'pipapa.padapo:\\-0.1',
      }, {
        state: {
          value1: null,
          comparator1: EnumNumericalComparator.EQ,
          value2: -0.125,
          comparator2: EnumNumericalComparator.GE,
        },
        testCaseMsg: '3) Component should compute right URL when range has only second field entered',
        expectedURL: 'papapa.padapo:[\\-0.125 TO *]',
      }, {
        state: {
          value1: null,
          comparator1: EnumNumericalComparator.LE,
          value2: null,
          comparator2: EnumNumericalComparator.GE,
        },
        testCaseMsg: '4) Component should return no URL when user entered no value',
        expectedURL: null,
      }]
    urlComputingTests.forEach(({
      state, testCaseMsg, expectedURL,
    }) => {
      const builtURL = MultipleAttributesContainer.convertToQuery(state, firstAttribute, secondAttribute)
      assert.equal(builtURL, expectedURL, testCaseMsg)
    })
  })
})
