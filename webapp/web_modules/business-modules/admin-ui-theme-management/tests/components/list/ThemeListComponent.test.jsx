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
import values from 'lodash/values'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { TableRow, TableBody } from 'material-ui/Table'
import { buildTestContext, testSuiteHelpers, DumpProvider } from '@regardsoss/tests-helpers'
import ThemeListComponent from '../../../src/components/list/ThemeListComponent'
import styles from '../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test ThemeListComponent
 * @author Raphaël Mechali
 */
describe('[ADMIN UI THEME MANAGEMENT] Testing ThemeListComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ThemeListComponent)
  })
  it('should render correctly', () => {
    const props = {
      themeList: DumpProvider.get('AccessProjectClient', 'Themes'),
      handleDelete: () => { },
      handleEdit: () => { },
      handleDuplicate: () => { },
      createUrl: '#',
      backUrl: '#',
      handleUpdate: () => { },
    }
    const wrapper = shallow(<ThemeListComponent {...props} />, { context })
    const bodyWrapper = wrapper.find(TableBody)
    assert.lengthOf(bodyWrapper, 1, 'There should be the table body')
    const rowsWrapper = bodyWrapper.find(TableRow)
    assert.lengthOf(rowsWrapper, values(props.themeList).length, 'There should be one row in body for each theme from dump')
  })
})
