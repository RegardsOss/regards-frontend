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
  it('should render self and subcomponents and publish state on updates (should not update request when there is an error)', () => {
    const spiedPublishStateData = {
      state: null,
      requestParameters: null,
    }
    const props = {
      // This attributes has bounds in context
      firstField: {
        ...criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.DOUBLE, 'dB',
          criterionTestSuiteHelpers.getBoundsInformationStub(true, false, false, null, 25.5)),
        name: 'firstField',
        jsonPath: 'x.a1',
      },
      // This attributes has no bound in context
      secondField: {
        ...criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.INTEGER, null,
          criterionTestSuiteHelpers.getBoundsInformationStub(true, false, false, 0, 10)),
        name: 'secondField',
        jsonPath: 'y.a2',
      },
      label: criterionTestSuiteHelpers.getLabelStub(),
      state: MultipleAttributesContainer.DEFAULT_STATE,
      publishState: (state, requestParameters) => {
        spiedPublishStateData.state = state
        spiedPublishStateData.requestParameters = requestParameters
      },
    }
    const enzymeWrapper = shallow(<MultipleAttributesContainer {...props} />, { context })
    let component = enzymeWrapper.find(MultipleAttributesComponent)
    assert.lengthOf(component, 1, 'There should be the component')
    testSuiteHelpers.assertWrapperProperties(component, {
      label: props.label,

      attribute1: props.firstField,
      error1: false,
      value1: '',
      comparator1: CommonDomain.EnumNumericalComparator.GE,
      availableComparators1: MultipleAttributesContainer.AVAILABLE_FLOAT_COMPARATORS,
      onValue1Changed: enzymeWrapper.instance().onValue1Changed,

      attribute2: props.secondField,
      error2: false,
      value2: '',
      comparator2: CommonDomain.EnumNumericalComparator.LE,
      availableComparators2: MultipleAttributesContainer.AVAILABLE_INT_COMPARATORS,
      onValue2Changed: enzymeWrapper.instance().onValue2Changed,
    })
    // apply successive state updates to check that:
    // query is built when user input at least on field and there there is no error
    // component receives the mutable properties
    const testUpdates = [{
      label: 'Set correct field 2 value',
      updateMethod: () => enzymeWrapper.instance().onValue2Changed('5', CommonDomain.EnumNumericalComparator.LE),
      expected: {
        error: false,
        field1: { error: false, value: '', operator: CommonDomain.EnumNumericalComparator.GE },
        field2: { error: false, value: '5', operator: CommonDomain.EnumNumericalComparator.LE },
        query: { q: 'y.a2:[* TO 5]' },
      },
    }, {
      label: 'Set correct field 1 value',
      updateMethod: () => enzymeWrapper.instance().onValue1Changed('-0.5', CommonDomain.EnumNumericalComparator.LE),
      expected: {
        error: false,
        field1: { error: false, value: '-0.5', operator: CommonDomain.EnumNumericalComparator.LE },
        field2: { error: false, value: '5', operator: CommonDomain.EnumNumericalComparator.LE },
        query: { q: 'x.a1:[* TO \\-0.5] AND y.a2:[* TO 5]' },
      },
    }, {
      label: 'Set invalid field 2 value (outside bounds)',
      updateMethod: () => enzymeWrapper.instance().onValue2Changed('11', CommonDomain.EnumNumericalComparator.GE),
      expected: {
        error: true,
        field1: { error: false, value: '-0.5', operator: CommonDomain.EnumNumericalComparator.LE },
        field2: { error: true, value: '11', operator: CommonDomain.EnumNumericalComparator.GE },
        query: { },
      },
    }, {
      label: 'Set back field 2 in bounds',
      updateMethod: () => enzymeWrapper.instance().onValue2Changed('10', CommonDomain.EnumNumericalComparator.GE),
      expected: {
        error: false,
        field1: { error: false, value: '-0.5', operator: CommonDomain.EnumNumericalComparator.LE },
        field2: { error: false, value: '10', operator: CommonDomain.EnumNumericalComparator.GE },
        query: { q: 'x.a1:[* TO \\-0.5] AND y.a2:[10 TO *]' },
      },
    }, {
      label: 'Set back field 1 in error (parsing)',
      updateMethod: () => enzymeWrapper.instance().onValue1Changed('qsd14', CommonDomain.EnumNumericalComparator.GE),
      expected: {
        error: true,
        field1: { error: true, value: 'qsd14', operator: CommonDomain.EnumNumericalComparator.GE },
        field2: { error: false, value: '10', operator: CommonDomain.EnumNumericalComparator.GE },
        query: {},
      },
    }, {
      label: 'Unset field 1 (check query is still built)',
      updateMethod: () => enzymeWrapper.instance().onValue1Changed('', CommonDomain.EnumNumericalComparator.GE),
      expected: {
        error: false,
        field1: { error: false, value: '', operator: CommonDomain.EnumNumericalComparator.GE },
        field2: { error: false, value: '10', operator: CommonDomain.EnumNumericalComparator.GE },
        query: { q: 'y.a2:[10 TO *]' },
      },
    }, {
      label: 'Set field 1 back',
      updateMethod: () => enzymeWrapper.instance().onValue1Changed('18.564', CommonDomain.EnumNumericalComparator.LE),
      expected: {
        error: false,
        field1: { error: false, value: '18.564', operator: CommonDomain.EnumNumericalComparator.LE },
        field2: { error: false, value: '10', operator: CommonDomain.EnumNumericalComparator.GE },
        query: { q: 'x.a1:[* TO 18.564] AND y.a2:[10 TO *]' },
      },
    }, {
      label: 'Unset field 2 (check query is still built)',
      updateMethod: () => enzymeWrapper.instance().onValue2Changed('', CommonDomain.EnumNumericalComparator.LE),
      expected: {
        error: false,
        field1: { error: false, value: '18.564', operator: CommonDomain.EnumNumericalComparator.LE },
        field2: { error: false, value: '', operator: CommonDomain.EnumNumericalComparator.LE },
        query: { q: 'x.a1:[* TO 18.564]' },
      },
    }]
    testUpdates.forEach(({ label, updateMethod, expected }, caseIndex) => {
      updateMethod()
      // check published state
      assert.deepEqual(spiedPublishStateData.state, {
        error: expected.error,
        error1: expected.field1.error,
        value1: expected.field1.value,
        comparator1: expected.field1.operator,
        error2: expected.field2.error,
        value2: expected.field2.value,
        comparator2: expected.field2.operator,
      }, `#${caseIndex} ${label} - state should be correctly updated`)
      // check published query
      assert.deepEqual(spiedPublishStateData.requestParameters, expected.query,
        `#${caseIndex} ${label} - query should be correctly computed`)
      // mute state through props and check it is correctly reported
      enzymeWrapper.setProps({ ...props, state: spiedPublishStateData.state })
      component = enzymeWrapper.find(MultipleAttributesComponent)
      testSuiteHelpers.assertWrapperProperties(component, {
        error1: expected.field1.error,
        value1: expected.field1.value,
        comparator1: expected.field1.operator,
        error2: expected.field2.error,
        value2: expected.field2.value,
        comparator2: expected.field2.operator,
      }, `#${caseIndex} ${label} - mutable properties should be correctly reported`)
    })
  })
})
