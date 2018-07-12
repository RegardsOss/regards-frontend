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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { DamDomain } from '@regardsoss/domain'
import TwoNumericalCriteriaComposedComponent from '../../src/components/TwoNumericalCriteriaComposedComponent'
import NumericalCriteriaComponent from '../../src/components/NumericalCriteriaComponent'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/**
 * Test case for {@link TwoNumericalCriteriaComposedComponent}
 *
 * @author Xavier-Alexandre Brochard
 */
describe('[PLUGIN TWO NUMERICAL CRITERIA COMPOSED] Testing the two numerical criteria composed component', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)
  it('should exists', () => {
    assert.isDefined(TwoNumericalCriteriaComposedComponent)
    assert.isDefined(NumericalCriteriaComponent)
  })
  it('should render self and subcomponents', () => {
    const props = {
      // parent callbacks (required)
      pluginInstanceId: 'any',
      onChange: () => { },
      getDefaultState: () => { },
      savePluginState: () => { },
      registerClear: () => { },
      attributes: {
        firstField: {
          name: 'myAttribute',
          jsonPath: 'somewhere.over.the.rainbow',
          description: 'First attribute to search',
          type: DamDomain.MODEL_ATTR_TYPES.INTEGER,
        },
      },
    }
    const enzymeWrapper = shallow(<TwoNumericalCriteriaComposedComponent {...props} />, { context })
    const children = enzymeWrapper.find(NumericalCriteriaComponent)
    expect(children).to.have.length(2)
    const first = children.at(0)
    const second = children.at(1)
    expect(first.props().reversed).to.equal(true)
    expect(first.props().hideAttributeName).to.equal(true)
    expect(second.props().reversed).to.equal(false)
    expect(second.props().hideAttributeName).to.equal(true)
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
          name: 'myAttribute',
          jsonPath: 'somewhere.over.the.rainbow',
          description: 'First attribute to search',
          type: DamDomain.MODEL_ATTR_TYPES.INTEGER,
        },
      },
    }
    const enzymeWrapper = shallow(<TwoNumericalCriteriaComposedComponent {...props} />, { context })
    const wrapperInstance = enzymeWrapper.instance()
    // 2 - test parsing on instance
    // 2.1 - = on negative number: first and second fields show worth parsed value (this is a boundary case)
    assert.equal(wrapperInstance.parseOpenSearchQuery('firstField', '\\-5.4'), -5.4, '\\-5.4 should be correctly parsed for first field')
    assert.equal(wrapperInstance.parseOpenSearchQuery('secondField', '\\-5.4'), -5.4, '\\-5.4 should be correctly parsed for second field')
    // 2.2 - full range
    assert.equal(wrapperInstance.parseOpenSearchQuery('firstField', '[\\-4.2 TO \\-2.6]'),
      -4.2, 'First field should be correctly parsed in [\\-4.2 TO \\-2.6]')
    assert.equal(wrapperInstance.parseOpenSearchQuery('secondField', '[\\-4.2 TO \\-2.6]'),
      -2.6, 'Second field should be correctly parsed in [\\-4.2 TO \\-2.6]')
    // 2.3 - Lower bound only
    assert.equal(wrapperInstance.parseOpenSearchQuery('firstField', '[\\85 TO *]'),
      85, 'First field should be correctly parsed in [\\85 TO *]')
    assert.isNotOk(wrapperInstance.parseOpenSearchQuery('secondField', '[\\85 TO *]'),
      'Second field text should not be initialized in [\\85 TO *]')
    // 2.4 - Upper bound only
    assert.isNotOk(wrapperInstance.parseOpenSearchQuery('firstField', '[* TO -56]'),
      'First field should not be initialized in [* TO -56]')
    assert.deepEqual(wrapperInstance.parseOpenSearchQuery('secondField', '[* TO -56]'),
      -56, 'Second field should be correctly parsed in [* TO -56]')
    // 2.5 - No bound
    assert.isNotOk(wrapperInstance.parseOpenSearchQuery('firstField', '[* TO *]'),
      'First field should not be initialized when query is full range: [* TO *]')
    assert.isNotOk(wrapperInstance.parseOpenSearchQuery('secondField', '[* TO *]'),
      'Second field should not be initialized when query is full range: [* TO *]')
    // 2.6 - Not parsable
    assert.isNotOk(wrapperInstance.parseOpenSearchQuery('firstField', 'AXG'),
      'First field should not be initialized when query is not valid')
    assert.isNotOk(wrapperInstance.parseOpenSearchQuery('secondField', 'AXG'),
      'Second field should not be initialized when query is not valid')
    // 2.7 - No initial value
    assert.isNotOk(wrapperInstance.parseOpenSearchQuery('firstField', ''),
      'First field should not be initialized when there is no initial value')
    assert.isNotOk(wrapperInstance.parseOpenSearchQuery('secondField', ''),
      'Second field should not be initialized when there is no initial value')
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
          name: 'myAttribute',
          jsonPath: 'somewhere.over.the.rainbow',
          description: 'First attribute to search',
          type: DamDomain.MODEL_ATTR_TYPES.INTEGER,
        },
      },
    }
    const enzymeWrapper = shallow(<TwoNumericalCriteriaComposedComponent {...props} />, { context })
    const wrapperInstance = enzymeWrapper.instance()
    // 2 - test URL computing on instance
    // 2.1 - full range
    assert.deepEqual(wrapperInstance.getPluginSearchQuery({ firstField: -0.569, secondField: 0.32 }),
      'somewhere.over.the.rainbow:[\\-0.569 TO 0.32]', 'Full range should be correctly exported')
    // 2.2 - lower bound range
    assert.deepEqual(wrapperInstance.getPluginSearchQuery({ firstField: 1.5 }),
      'somewhere.over.the.rainbow:[1.5 TO *]', 'Lower bound range should be correctly exported')
    // 2.3 - upper bound range
    assert.deepEqual(wrapperInstance.getPluginSearchQuery({ secondField: -2.3 }),
      'somewhere.over.the.rainbow:[* TO \\-2.3]', 'Upper bound range should be correctly exported')
    // 2.4 -not exportable (no value)
    assert.isNotOk(wrapperInstance.getPluginSearchQuery({}),
      'Range should not be exported when there is no value (full infinite range)')

    // 2.5 - not exportable (no attribute path)
    enzymeWrapper.setProps({
      ...props,
      attributes: {
        firstField: {
          name: 'myAttribute',
          // remove json path
          description: 'First attribute to search',
          type: DamDomain.MODEL_ATTR_TYPES.INTEGER,
        },
      },
    })
    assert.isNotOk(wrapperInstance.getPluginSearchQuery({ firstField: -0.569, secondField: 0.32 }),
      'Range should not be exported when there is no attribute path')
  })
})
