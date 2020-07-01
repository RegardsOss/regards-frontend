/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import RequestDeleteOption from '../../../src/components/requests/RequestDeleteOption'
import styles from '../../../src/styles'
import { Request } from '../../dumps/Request.dump'

const context = buildTestContext(styles)

/**
 * Test RequestDeleteOption
 * @author Simon MILHAU
 */
describe('[OAIS AIP MANAGEMENT] Testing RequestDeleteOption', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(RequestDeleteOption)
  })
  it('should render correctly', () => {
    const spiedCallbackData = {
      count: 0,
      parameterValue: Request,
    }
    const props = {
      entity: Request,
      onDelete: () => { spiedCallbackData.count += 1 },
    }
    const enzymeWrapper = shallow(<RequestDeleteOption {...props} />, { context })

    const confirmButton = enzymeWrapper.findWhere((n) => n.props().onClick === enzymeWrapper.instance().onClick)
    assert.lengthOf(confirmButton, 1, 'There should be icon button')

    assert.equal(confirmButton.props().onClick, enzymeWrapper.instance().onClick, 'onClick callback should be correctly set')
    assert.equal(spiedCallbackData.count, 0, 'Callback should not have been invoked yet')
    enzymeWrapper.instance().onClick()
    assert.equal(spiedCallbackData.count, 1, 'Callback should have been invoked once')
    assert.equal(spiedCallbackData.parameterValue, props.entity, 'Callback parameter should be valid')
  })
})
