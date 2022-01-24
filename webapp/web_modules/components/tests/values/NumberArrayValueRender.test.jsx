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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import NumberArrayValueRender from '../../src/values/NumberArrayValueRender'
import styles from '../../src/values/styles'

/**
 * test function to format number (replacing react-intl, not available in tests context)
 * @param {number} v value
 * @param {*} options format options
 * @return {string} formatted text
 */
function formatNumberForTest(v, options) {
  assert.isNotNull(v)
  assert.isNotNull(options)
  // options used here only for truncating number (test impl)
  const factor = 10 ** options.maximumFractionDigits
  return `${Math.round(v * factor) / factor}`
}
/**
 * Build usable test context
 */
const initialContext = buildTestContext(styles)
const context = {
  ...initialContext,
  intl: {
    ...initialContext.intl,
    formatNumber: formatNumberForTest,
  },
}

/**
 * Test NumberArrayValueRender
 * @author Raphaël Mechali
 */
describe('[COMPONENTS] Testing NumberArrayValueRender', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(NumberArrayValueRender)
  })
  it('should render correctly with unit and precision', () => {
    const props = {
      value: ['1.12345', 12.123456789, null, '123.4567', undefined],
      precision: 2,
      unit: 'dBz',
    }
    const enzymeWrapper = shallow(<NumberArrayValueRender {...props} />, { context })
    // check text and tool tip re rendered
    const mainDiv = enzymeWrapper.find('div')
    assert.lengthOf(mainDiv, 1)
    assert.deepEqual(mainDiv.props().title, mainDiv.text(), 'Both tooltip and texts should have the same text value')
    // check content of the generated text
    const parts = mainDiv.props().title.split('value.render.array.values.separator')
    assert.deepEqual(parts, [
      '1.12dBz',
      '12.12dBz',
      'value.render.no.value.label',
      '123.46dBz',
      'value.render.no.value.label',
    ])
  })
  it('should render correctly without unit', () => {
    const props = {
      value: ['1.12345', 12.123456789, null, '123.4567', undefined],
      precision: 2,
    }
    const enzymeWrapper = shallow(<NumberArrayValueRender {...props} />, { context })
    // check text and tool tip re rendered
    const mainDiv = enzymeWrapper.find('div')
    assert.lengthOf(mainDiv, 1)
    assert.deepEqual(mainDiv.props().title, mainDiv.text(), 'Both tooltip and texts should have the same text value')
    // check content of the generated text
    const parts = mainDiv.props().title.split('value.render.array.values.separator')
    assert.deepEqual(parts, [
      '1.12',
      '12.12',
      'value.render.no.value.label',
      '123.46',
      'value.render.no.value.label',
    ])
  })
  it('should render correctly without precision', () => {
    const props = {
      value: ['1.12345', 12.123456789, null, '123.4567', undefined],
      unit: 'dBz',
    }
    const enzymeWrapper = shallow(<NumberArrayValueRender {...props} />, { context })
    // check text and tool tip re rendered
    const mainDiv = enzymeWrapper.find('div')
    assert.lengthOf(mainDiv, 1)
    assert.deepEqual(mainDiv.props().title, mainDiv.text(), 'Both tooltip and texts should have the same text value')
    // check content of the generated text
    const parts = mainDiv.props().title.split('value.render.array.values.separator')
    assert.deepEqual(parts, [
      '1.12345dBz',
      '12.123456789dBz',
      'value.render.no.value.label',
      '123.4567dBz',
      'value.render.no.value.label',
    ])
  })
  it('should render correctly without value', () => {
    const props = {
      value: null,
      precision: 2,
      unit: 'dBz',
    }
    const enzymeWrapper = shallow(<NumberArrayValueRender {...props} />, { context })
    // check text and tool tip re rendered
    const mainDiv = enzymeWrapper.find('div')
    assert.lengthOf(mainDiv, 1)
    assert.deepEqual(mainDiv.props().title, mainDiv.text(), 'Both tooltip and texts should have the same text value')
    assert.deepEqual(mainDiv.props().title, 'value.render.no.value.label', 'Should be rendered as a single value no data')
  })
})
