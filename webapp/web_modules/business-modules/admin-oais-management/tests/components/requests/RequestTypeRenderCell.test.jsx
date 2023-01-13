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
import { IngestDomain } from '@regardsoss/domain'
import { StringValueRender } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import RequestTypeRenderCell from '../../../src/components/requests/RequestTypeRenderCell'
import styles from '../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test RequestTypeRenderCell
 * @author Raphaël Mechali
 */
describe('[OAIS AIP MANAGEMENT] Testing RequestTypeRenderCell', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(RequestTypeRenderCell)
  })
  IngestDomain.AIP_REQUEST_TYPES.forEach((type) => it(`should render correctly with type ${type}`, () => {
    const props = {
      value: type,
    }
    const enzymeWrapper = shallow(<RequestTypeRenderCell {...props} />, { context })
    const delegateRender = enzymeWrapper.find(StringValueRender)
    assert.lengthOf(delegateRender, 1, 'There should be delegate render')
    assert.equal(delegateRender.props().value, `oais.list.filters.requestIdType.${type}`, 'Type should be internationalized')
  }))
})
