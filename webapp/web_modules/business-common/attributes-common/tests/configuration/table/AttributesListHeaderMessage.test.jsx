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
import { TableHeaderText } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import AttributesListHeaderMessage from '../../../src/configuration/table/AttributesListHeaderMessage'
import styles from '../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test AttributesListHeaderMessage
 * @author Raphaël Mechali
 */
describe('[Attributes Common] Testing AttributesListHeaderMessage', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AttributesListHeaderMessage)
  })
  it('should render correctly', () => {
    const props = {
      count: 2,
    }
    const enzymeWrapper = shallow(<AttributesListHeaderMessage {...props} />, { context })
    const text = enzymeWrapper.find(TableHeaderText)
    assert.lengthOf(text, 1, 'There should be the text')
    assert.equal(text.props().text, 'attributes.configuration.header.count', 'It should be internationalized')
  })
})
