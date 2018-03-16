/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import FormGroup from '../../../src/components/admin/FormGroup'
import styles from '../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test FormGroup
 * @author Raphaël Mechali
 */
describe('[Search Results] Testing FormGroup', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(FormGroup)
  })
  it('should render without title and span full width', () => {
    const props = {}
    const enzymeWrapper = shallow(
      <FormGroup {...props} >
        <div id="x" />
      </FormGroup >, { context })

    assert.lengthOf(enzymeWrapper.findWhere(n => n.props().id === 'x'), 1, 'Group should render its children')
  })
  it('should render with title and span full width', () => {
    const props = {
      titleKey: 'a.test.key',
      spanFullWidth: true,
    }
    const enzymeWrapper = shallow(
      <FormGroup {...props} >
        <div id="y" />
      </FormGroup >, { context })

    assert.lengthOf(enzymeWrapper.findWhere(n => n.props().id === 'y'), 1, 'Group should render its children')
    assert.include(enzymeWrapper.debug(), props.titleKey, 'Title should be rendered')
  })
})
