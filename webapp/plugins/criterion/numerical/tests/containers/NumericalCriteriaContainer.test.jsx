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
import TextField from 'material-ui/TextField'
import { EnumNumericalComparator } from '@regardsoss/domain/common'
import { DamDomain } from '@regardsoss/domain'
import { NumericalComparator } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers, criterionTestSuiteHelpers } from '@regardsoss/tests-helpers'
import NumericalCriteriaContainer from '../../src/containers/NumericalCriteriaContainer'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/**
 * Test case for {@link NumericalCriteriaComponent}
 *
 * @author Xavier-Alexandre Brochard
 */
describe('[PLUGIN NUMERICAL CRITERIA] Testing the NumericalCriteriaContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)
  it('should exists', () => {
    assert.isDefined(NumericalCriteriaContainer)
    assert.isDefined(TextField)
  })
  it('should render self and subcomponents with bound data', () => {
    const props = {
      pluginInstanceId: 'any',
      onChange: () => { },
      getDefaultState: () => { },
      savePluginState: () => { },
      registerClear: () => { },
      attributes: {
        searchField: criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.INTEGER, null,
          criterionTestSuiteHelpers.getBoundsInformationStub(true, false, false, -1, 36)),
      },
    }
    const enzymeWrapper = shallow(<NumericalCriteriaContainer {...props} />, { context })
    const comparator = enzymeWrapper.find(NumericalComparator)
    assert.lengthOf(comparator, 1, 'There should be the comparator')
    assert.isFalse(comparator.props().disabled, 'Comparator should be enabled as there are bounds')
    assert.deepEqual(comparator.props().comparators, NumericalCriteriaContainer.AVAILABLE_INT_COMPARATORS,
      'All integer comparators should be available')

    const textField = enzymeWrapper.find(TextField)
    assert.lengthOf(textField, 1, 'There should be the comparator')
    assert.isFalse(textField.props().disabled, 'Textfield should be enabled as there are bounds')
    assert.isOk(textField.props().floatingLabelText, 'Container should set floating text')
    assert.isOk(textField.props().title, 'Container should set tooltip')
  })
  it('should render self and subcomponents without bound data', () => {
    const props = {
      pluginInstanceId: 'any',
      onChange: () => { },
      getDefaultState: () => { },
      savePluginState: () => { },
      registerClear: () => { },
      attributes: {
        searchField: criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.DOUBLE, null,
          criterionTestSuiteHelpers.getBoundsInformationStub(true, false, false)),
      },
    }
    const enzymeWrapper = shallow(<NumericalCriteriaContainer {...props} />, { context })
    const comparator = enzymeWrapper.find(NumericalComparator)
    assert.lengthOf(comparator, 1, 'There should be the comparator')
    assert.isTrue(comparator.props().disabled, 'Comparator should be disabled as there is no bound')
    assert.deepEqual(comparator.props().comparators, NumericalCriteriaContainer.AVAILABLE_FLOAT_COMPARATORS,
      'Comparators should be restricted to float comparators')

    const textField = enzymeWrapper.find(TextField)
    assert.lengthOf(textField, 1, 'There should be the comparator')
    assert.isTrue(textField.props().disabled, 'Textfield should be disabled as there is no bound')
    assert.isOk(textField.props().floatingLabelText, 'Container should set floating text')
    assert.isOk(textField.props().title, 'Container should set tooltip')
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
        searchField: criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.DOUBLE, null,
          criterionTestSuiteHelpers.getBoundsInformationStub(true, false, false, -1.5, -0.5)),
      },
    }
    const enzymeWrapper = shallow(<NumericalCriteriaContainer {...props} />, { context })
    const wrapperInstance = enzymeWrapper.instance()
    // 2 - test parsing on instance
    // 2.1 - = on negative number
    assert.deepEqual(wrapperInstance.parseOpenSearchQuery('myAttribute', '\\-5.4'),
      { value: -5.4, operator: EnumNumericalComparator.EQ }, '\\-5.4 should be correctly parsed')
    // 2.2 - = on positive number
    assert.deepEqual(wrapperInstance.parseOpenSearchQuery('myAttribute', '85'),
      { value: 85, operator: EnumNumericalComparator.EQ }, '85 should be correctly parsed')
    // 2.3 - >= on positive number
    assert.deepEqual(wrapperInstance.parseOpenSearchQuery('myAttribute', '[85 TO *]'),
      { value: 85, operator: EnumNumericalComparator.GE }, '[85 TO *] should be correctly parsed')
    // 2.4 - <= on negative number
    assert.deepEqual(wrapperInstance.parseOpenSearchQuery('myAttribute', '[* TO \\-0.536]'),
      { value: -0.536, operator: EnumNumericalComparator.LE }, '[* TO \\-0.536] should be correctly parsed')
    // 2.5 - not parsable
    assert.deepEqual(wrapperInstance.parseOpenSearchQuery('myAttribute', 'PIE'),
      { value: null, operator: EnumNumericalComparator.EQ }, 'Not parsable: should return default state')
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
        searchField: {
          ...criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.DOUBLE, null,
            criterionTestSuiteHelpers.getBoundsInformationStub(true, false, false, -1.5, -0.5)),
          // change json path for query test
          jsonPath: 'xptdr.myAttribute',
        },
      },
    }
    const enzymeWrapper = shallow(<NumericalCriteriaContainer {...props} />, { context })
    const wrapperInstance = enzymeWrapper.instance()
    // 2 - test URL computing on instance
    // 2.1 - = on negative number
    assert.deepEqual(wrapperInstance.getPluginSearchQuery({ searchField: { value: -0.41, operator: EnumNumericalComparator.EQ } }),
      'xptdr.myAttribute:\\-0.41', 'Attribute EQ -0.41 should be correctly exported')
    // 2.2 - = on positive number
    assert.deepEqual(wrapperInstance.getPluginSearchQuery({ searchField: { value: 56, operator: EnumNumericalComparator.EQ } }),
      'xptdr.myAttribute:56', 'Attribute EQ 56 should be correctly exported')
    // 2.3 - >= on positive number
    assert.deepEqual(wrapperInstance.getPluginSearchQuery({ searchField: { value: 0.3333, operator: EnumNumericalComparator.GE } }),
      'xptdr.myAttribute:[0.3333 TO *]', 'Attribute GE 0.3333 should be correctly exported')
    // 2.4 - <= on negative number
    assert.deepEqual(wrapperInstance.getPluginSearchQuery({ searchField: { value: -25, operator: EnumNumericalComparator.LE } }),
      'xptdr.myAttribute:[* TO \\-25]', '\\Attribute LE -25 should be correctly exported')
    // 2.5 - not exportable (no value)
    assert.deepEqual(wrapperInstance.getPluginSearchQuery({ searchField: { value: null, operator: EnumNumericalComparator.EQ } }),
      '', 'No query should be exported without value')
    // 2.5 - not exportable (no attribute path)
    enzymeWrapper.setProps({
      ...props,
      attributes: {
        searchField: {
          ...criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.INTEGER, null,
            criterionTestSuiteHelpers.getBoundsInformationStub(true, false, false, -1.5, -0.5)),
          // change json path for query test
          jsonPath: undefined,
        },
      },
    })
    assert.deepEqual(wrapperInstance.getPluginSearchQuery({ searchField: { value: -0.41, operator: EnumNumericalComparator.EQ } }),
      '', 'No query should be exported without attribute')
  })
})
