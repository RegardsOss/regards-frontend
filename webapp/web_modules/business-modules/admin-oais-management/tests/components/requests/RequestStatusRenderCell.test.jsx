/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { StringValueRender } from '@regardsoss/components'
import RequestStatusRenderCell from '../../../src/components/requests/RequestStatusRenderCell'
import { Request } from '../../dumps/Request.dump'
import styles from '../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test RequestStatusRenderCell
 * @author Simon MILHAU
 */
describe('[OAIS AIP MANAGEMENT] Testing RequestStatusRenderCell', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(RequestStatusRenderCell)
  })

  it('should render correctly', () => {
    const props = {
      entity: Request,
      onViewRequestErrors: () => {},
    }
    const enzymeWrapper = shallow(<RequestStatusRenderCell {...props} />, { context })
    const stringValueRenderWrapper = enzymeWrapper.find(StringValueRender)
    assert.lengthOf(stringValueRenderWrapper, 1, 'There should be a StringArrayValueRender')
    assert.isOk(stringValueRenderWrapper.props().value, 'StringArrayValueRender value should be found')
  })
})
