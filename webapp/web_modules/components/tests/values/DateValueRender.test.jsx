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
import forEach from 'lodash/forEach'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import DateValueRender from '../../src/values/DateValueRender'
import styles from '../../src/values/styles'

const context = buildTestContext(styles)

/**
 * Tests for ValueConfigurationComponent
 * @author Sébastien binda
 */
describe('[COMPONENTS] Testing DateValueRender', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DateValueRender)
  })

  it('Should render a no data / unparsable correctly', () => {
    // undefined
    let wrapper = shallow(<DateValueRender />, { context })
    assert.include(wrapper.text(), 'value.render.no.value.label', 'Undefined date should display no data text')
    // not parsable
    wrapper = shallow(<DateValueRender value="DDD" />, { context })
    assert.include(wrapper.text(), 'value.render.no.value.label', 'Undefined date should display no data text')
  })

  forEach(DateValueRender.DEFAULT_FORMATTERS, (formatter, key) => it(`Should render correctly with format ${key}`, () => {
    const props = {
      value: '2017-01-07T12:00:00Z',
      formatter,
    }
    const wrapper = shallow(<DateValueRender {...props} />, { context })
    assert.include(wrapper.text(), `date.value.render.type.${key}`, 'There should be an empty value rendered')
  }))
})
