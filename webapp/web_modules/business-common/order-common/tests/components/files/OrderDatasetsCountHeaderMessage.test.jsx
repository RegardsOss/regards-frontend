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
import { TableHeaderText } from '@regardsoss/components'
import OrderDatasetsCountHeaderMessage from '../../../src/components/files/OrderDatasetsCountHeaderMessage'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test OrderDatasetsCountHeaderMessage
* @author Raphaël Mechali
*/
describe('[Order Common] Testing OrderDatasetsCountHeaderMessage', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(OrderDatasetsCountHeaderMessage)
  })
  it('should internation correctly no data', () => {
    const props = {
      totalFilesCount: 0,
    }
    const enzymeWrapper = shallow(<OrderDatasetsCountHeaderMessage {...props} />, { context })
    const tableHeaderTextWrapper = enzymeWrapper.find(TableHeaderText)
    assert.lengthOf(tableHeaderTextWrapper, 1, 'There should be a table header text wrapper')
    assert.equal(tableHeaderTextWrapper.props().text, 'files.list.no.file.header.message', 'The text should show a no data')
  })

  it('should internation correctly with data', () => {
    const props = {
      totalFilesCount: 10,
    }
    const enzymeWrapper = shallow(<OrderDatasetsCountHeaderMessage {...props} />, { context })
    const tableHeaderTextWrapper = enzymeWrapper.find(TableHeaderText)
    assert.lengthOf(tableHeaderTextWrapper, 1, 'There should be a table header text wrapper')
    assert.equal(tableHeaderTextWrapper.props().text, 'files.list.files.header.message', 'The text should show a no data')
  })
})
