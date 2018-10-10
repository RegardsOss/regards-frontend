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
import { DamDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers, criterionTestSuiteHelpers } from '@regardsoss/tests-helpers'
import MultipleAttributesContainer from '../../src/containers/MultipleAttributesContainer'
import NumericalCriteriaComponent from '../../src/components/NumericalCriteriaComponent'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/**
 * Test case for {@link MultipleAttributesContainer}
 *
 * @author Xavier-Alexandre Brochard
 */
describe('[PLUGIN TWO NUMERICAL CRITERIA] Testing MultipleAttributesContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)
  it('should exists', () => {
    assert.isDefined(MultipleAttributesContainer)
    assert.isDefined(NumericalCriteriaComponent)
  })
  it('should render self and subcomponents with attribute bounds', () => {
    const props = {
      pluginInstanceId: 'any',
      onChange: () => { },
      getDefaultState: () => { },
      savePluginState: () => { },
      registerClear: () => { },
      attributes: {
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
      },
    }
    const enzymeWrapper = shallow(<MultipleAttributesContainer {...props} />, { context })
    const criteriaComponents = enzymeWrapper.find(NumericalCriteriaComponent)
    assert.lengthOf(criteriaComponents, 2, 'There should be one component to edit each attribute')

    const firstCriterion = criteriaComponents.at(0)
    assert.isFalse(firstCriterion.props().disabled, 'First criterion component should be enabled')
    assert.deepEqual(firstCriterion.props().availableComparators, MultipleAttributesContainer.AVAILABLE_FLOAT_COMPARATORS,
      'First criterion component comparators should be restricted to float comparators')
    assert.isOk(firstCriterion.props().hintText, 'First criterion should have an hintText')
    assert.isOk(firstCriterion.props().tooltip, 'First criterion should have a tooltip')

    const secondCriterion = criteriaComponents.at(1)
    assert.isTrue(secondCriterion.props().disabled, 'Second criterion component should be disabled')
    assert.deepEqual(secondCriterion.props().availableComparators, MultipleAttributesContainer.AVAILABLE_INT_COMPARATORS,
      'Second criterion component comparators should have all available comparators')
    assert.isOk(secondCriterion.props().hintText, 'Second criterion should have an hintText')
    assert.isOk(secondCriterion.props().tooltip, 'Second criterion should have a tooltip')
  })
  it('should parse correctly state from URL', () => {
    // 1 - Buiild component to get instance
    const props = {
      pluginInstanceId: 'any',
      onChange: () => { },
      getDefaultState: () => { },
      savePluginState: () => { },
      registerClear: () => { },
      attributes: {
        firstField: {
          ...criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.INTEGER),
          name: 'firstField',
          jsonPath: 'pipapa.padapo',
        },
        secondField: {
          ...criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.INTEGER),
          name: 'secondField',
          jsonPath: 'papapa.padapo',
        },
      },
    }
    const enzymeWrapper = shallow(<MultipleAttributesContainer {...props} />, { context })
    const wrapperInstance = enzymeWrapper.instance()
    // 2 - test parsing on instance with test cases list to avoid some boiler plate. Note that each test will be run for each field
    const parsingTests = [
      { text: '[* TO *]', expected: null, testCaseMsg: 'Component should parse infinite range as default state' }, // 1 - infinite range: should return default state
      { text: 'XXX', expected: null, testCaseMsg: 'Component should return default state when query text cannot be parsed' }, // 2 - unparsable: should return default state
      { text: '', expected: null, testCaseMsg: 'Component should return default state for empty query values' }, // 3 - empty (no query): should return default state
      { text: '\\-3.14', expected: { value: -3.14, operator: EnumNumericalComparator.EQ }, testCaseMsg: '"\\-3.14" should be parsed as EQ -3.14' }, // 4 - = -3.14
      { text: '85', expected: { value: 85, operator: EnumNumericalComparator.EQ }, testCaseMsg: '"85" should be parsed as EQ 85' }, // 5 - = 85
      { text: '[* TO \\-3.14]', expected: { value: -3.14, operator: EnumNumericalComparator.LE }, testCaseMsg: '[* TO \\-3.14] should be parsed LE -3.14' }, // 6 - < -3.14
      { text: '[85 TO *]', expected: { value: 85, operator: EnumNumericalComparator.GE }, testCaseMsg: '[85 TO *] should be parsed as GE 85' }, // 7 - > 85
    ]
    const fieldNames = ['firstField', 'secondField']
    parsingTests.forEach(({ text, expected, testCaseMsg }) => {
      fieldNames.forEach((fieldName) => {
        const parsed = wrapperInstance.parseOpenSearchQuery(fieldName, text)
        const actualExpected = expected || wrapperInstance.getDefaultState()[fieldName]
        assert.deepEqual(parsed, actualExpected, `${testCaseMsg} for field ${fieldName}`)
      })
    })
  })
  it('should export correctly state to open search URL', () => {
    // 1 - Build component to get instance
    const props = {
      pluginInstanceId: 'any',
      onChange: () => { },
      getDefaultState: () => { },
      savePluginState: () => { },
      registerClear: () => { },
      attributes: {
        firstField: {
          ...criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.INTEGER),
          name: 'firstField',
          jsonPath: 'pipapa.padapo',
        },
        secondField: {
          ...criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.INTEGER),
          name: 'secondField',
          jsonPath: 'papapa.padapo',
        },
      },
    }
    const enzymeWrapper = shallow(<MultipleAttributesContainer {...props} />, { context })
    const wrapperInstance = enzymeWrapper.instance()
    // 2 - test URL computing on instance (using test list to avoid some boiler plate)
    const urlComputingTests = [
      {
        firstField: { value: -3.14, operator: EnumNumericalComparator.GE },
        secondField: { value: 0.125, operator: EnumNumericalComparator.LE },
        testCaseMsg: '1) Component should compute rigth URL for full range',
        expectedURL: 'pipapa.padapo:[\\-3.14 TO *] AND papapa.padapo:[* TO 0.125]',
      }, {
        firstField: { value: -0.1, operator: EnumNumericalComparator.EQ },
        secondField: { value: null, operator: EnumNumericalComparator.EQ },
        testCaseMsg: '2) Component should compute right URL when range has only first field entered',
        expectedURL: 'pipapa.padapo:\\-0.1',
      }, {
        firstField: { value: null, operator: EnumNumericalComparator.EQ },
        secondField: { value: -0.125, operator: EnumNumericalComparator.GE },
        testCaseMsg: '3) Component should compute right URL when range has only second field entered',
        expectedURL: 'papapa.padapo:[\\-0.125 TO *]',
      }, {
        firstField: { value: null, operator: EnumNumericalComparator.EQ },
        secondField: { value: null, operator: EnumNumericalComparator.EQ },
        testCaseMsg: '4) Component should return no URL when user entered no value',
        expectedURL: '',
      }]
    urlComputingTests.forEach(({
      firstField, secondField, testCaseMsg, expectedURL,
    }) => {
      const builtURL = wrapperInstance.getPluginSearchQuery({ firstField, secondField })
      assert.equal(builtURL, expectedURL, testCaseMsg)
    })
  })
})
