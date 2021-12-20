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
import {
  TableLayout, PageableInfiniteTableContainer,
} from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import DisplayProductsComponent from '../../src/components/DisplayProductsComponent'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Test DisplayProductsComponent
 * @author Théo Lasserre
 */
describe('[ Module name] Testing DisplayProductsComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DisplayProductsComponent)
  })
  it('should render correctly', () => {
    const props = {
      sessionName: 'any',
    }
    const enzymeWrapper = shallow(<DisplayProductsComponent {...props} />, { context })
    const tableLayoutWrapper = enzymeWrapper.find(TableLayout)
    assert.lengthOf(tableLayoutWrapper, 1, 'There should be a TableLayout')

    const tableWrapper = enzymeWrapper.find(PageableInfiniteTableContainer)
    assert.lengthOf(tableWrapper, 1, 'There should be a PageableInfiniteTableContainer')
  })
})
