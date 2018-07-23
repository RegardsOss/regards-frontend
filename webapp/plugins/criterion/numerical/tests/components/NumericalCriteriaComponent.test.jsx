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
import { expect, assert } from 'chai'
import TextField from 'material-ui/TextField'
import { EnumNumericalComparator } from '@regardsoss/domain/common'
import { DamDomain } from '@regardsoss/domain'
import { NumericalComparator } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import NumericalCriteriaComponent from '../../src/components/NumericalCriteriaComponent'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/**
 * Test case for {@link NumericalCriteriaComponent}
 *
 * @author Xavier-Alexandre Brochard
 */
describe('[PLUGIN NUMERICAL CRITERIA] Testing the numerical criteria component', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)
  it('should exists', () => {
    assert.isDefined(NumericalCriteriaComponent)
    assert.isDefined(TextField)
  })
  it('should render self and subcomponents', () => {
    const props = {
      pluginInstanceId: 'any',
      onChange: () => { },
      getDefaultState: () => { },
      savePluginState: () => { },
      registerClear: () => { },
      attributes: {
        searchField: {
          name: 'searchField',
          description: 'Attribute to search',
          type: DamDomain.MODEL_ATTR_TYPES.INTEGER,
        },
      },
    }
    const enzymeWrapper = shallow(<NumericalCriteriaComponent {...props} />, { context })
    expect(enzymeWrapper.find(NumericalComparator)).to.have.length(1)
    expect(enzymeWrapper.find(TextField)).to.have.length(1)
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
        searchField: {
          name: 'myAttribute',
          description: 'Attribute to search',
          type: DamDomain.MODEL_ATTR_TYPES.INTEGER,
        },
      },
    }
    const enzymeWrapper = shallow(<NumericalCriteriaComponent {...props} />, { context })
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
          name: 'myAttribute',
          jsonPath: 'xptdr.myAttribute',
          description: 'Attribute to search',
          type: DamDomain.MODEL_ATTR_TYPES.INTEGER,
        },
      },
    }
    const enzymeWrapper = shallow(<NumericalCriteriaComponent {...props} />, { context })
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
          name: 'myAttribute',
          description: 'Attribute to search',
          type: DamDomain.MODEL_ATTR_TYPES.INTEGER,
        },
      },
    })
    assert.deepEqual(wrapperInstance.getPluginSearchQuery({ searchField: { value: -0.41, operator: EnumNumericalComparator.EQ } }),
      '', 'No query should be exported without attribute')
  })
})
