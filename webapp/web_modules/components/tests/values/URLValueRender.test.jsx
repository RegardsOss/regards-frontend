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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import LinkComponent from '../../src/links/LinkComponent'
import URLValueRender from '../../src/values/URLValueRender'
import styles from '../../src/values/styles'

const context = buildTestContext(styles)

/**
 * Tests for ValueConfigurationComponent
 * @author Sébastien binda
 */
describe('[COMPONENTS] Testing URLValueRender', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(URLValueRender)
  })

  it('Should render no data', () => {
    const wrapper = shallow(<URLValueRender />, { context })
    assert.lengthOf(wrapper.find(LinkComponent), 0, 'Link should not be rendered when no data')
  })

  it('Should render link to URL when available', () => {
    const wrapper = shallow(<URLValueRender value="http://www.google.com/bill" />, { context })
    const linkWrapper = wrapper.find(LinkComponent)
    assert.lengthOf(linkWrapper, 1, 'Link should be rendered')
    assert.equal(linkWrapper.props().link, 'http://www.google.com/bill', 'Link should be rendered')
  })
})
