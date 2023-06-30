/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import { NumberValueRender } from '../../src/values/NumberValueRender'
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
 * Tests for ValueConfigurationComponent
 * @author Sébastien binda
 */
describe('[COMPONENTS] Testing NumberValueRender', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(NumberValueRender)
  })

  it('Should render no data', () => {
    const wrapper = shallow(<NumberValueRender />, { context })
    assert.include(wrapper.text(), 'value.render.no.value.label', 'shoud show no data text')
  })

  it('Should render string data directly (avoids useless parsing)', () => {
    const props = { value: '156' }
    const wrapper = shallow(<NumberValueRender {...props} />, { context })
    assert.include(wrapper.text(), '156')
  })

  it('Should render number data', () => {
    const props = { value: 156 }
    const wrapper = shallow(<NumberValueRender {...props} />, { context })
    assert.include(wrapper.text(), '156')
  })

  it('Should render number with precision and unit', () => {
    const props = {
      value: 123.45678,
      precision: 3,
      unit: 'potatoes',
    }
    const wrapper = shallow(<NumberValueRender {...props} />, { context })
    assert.include(wrapper.text(), '123.457potatoes')
  })
})
