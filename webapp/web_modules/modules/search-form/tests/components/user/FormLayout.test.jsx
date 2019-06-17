/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import RaisedButton from 'material-ui/RaisedButton'
import { Container } from '@regardsoss/layout'
import FormLayout from '../../../src/components/user/FormLayout'
import styles from '../../../src/styles'
import { DUMP } from '../../dump/plugins.dump'

const context = buildTestContext(styles)


/**
 * Test FormLayout
 * @author Raphaël Mechali
 */
describe('[FORM MODULE] Testing FormLayout', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(FormLayout)
  })
  it('should render correctly', () => {
    let callSearchCount = 0
    let callClearCount = 0
    const props = {
      layout: {
        id: 'my-container',
        type: 'idk',
      },
      plugins: DUMP,
      pluginsProps: {
        initialQuery: 'any',
      },
      onSearch: () => { callSearchCount += 1 },
      onClearAll: () => { callClearCount += 1 },
    }
    const enzymeWrapper = shallow(<FormLayout {...props} />, { context })

    const button = enzymeWrapper.find(RaisedButton)
    assert.lengthOf(button, 2, 'There should be 2 buttons to run search and reset')
    assert.lengthOf(enzymeWrapper.find(Container), 1, 'Form module should render configured layout')

    assert.equal(callSearchCount, 0, 'Search callback should not have been called yet')
    assert.equal(callClearCount, 0, 'Clear all callback should not have been called yet')

    button.at(0).simulate('click')
    button.at(1).simulate('click')
    assert.equal(callSearchCount, 1, 'Search callback should have been called')
    assert.equal(callClearCount, 1, 'Clear all callback should have been called')
  })
})
