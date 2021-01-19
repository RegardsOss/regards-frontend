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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import ErrorsCountRender from '../../../../src/components/orders/cells/ErrorsCountRender'
import styles from '../../../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test ErrorsCountRender
* @author Raphaël Mechali
*/
describe('[Order Common] Testing ErrorsCountRender', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ErrorsCountRender)
  })
  it('should render correctly without error (value case)', () => {
    const props = {
      value: 0,
    }
    shallow(<ErrorsCountRender {...props} />, { context })
  })
  it('should render correctly without error (no data case)', () => {
    const props = {
      value: null,
    }
    shallow(<ErrorsCountRender {...props} />, { context })
  })
  it('should render correctly with errors', () => {
    const props = {
      value: 123,
    }
    shallow(<ErrorsCountRender {...props} />, { context })
  })
})
