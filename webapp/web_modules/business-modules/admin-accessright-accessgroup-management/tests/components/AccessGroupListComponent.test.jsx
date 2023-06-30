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
 */
import keys from 'lodash/keys'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { TableBody, TableRow, TableRowColumn } from 'material-ui/Table'
import { testSuiteHelpers, DumpProvider, buildTestContext } from '@regardsoss/tests-helpers'
import AccessGroupListComponent from '../../src/components/AccessGroupListComponent'

const context = buildTestContext()

describe('[ADMIN USER ACCESSGROUP MANAGEMENT] Testing AccessGroupListComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AccessGroupListComponent)
  })

  it('Render properly', () => {
    const accessGroupList = DumpProvider.get('DataManagementClient', 'AccessGroup')
    const props = {
      accessGroupList,
      handleShowGroupUsers: () => { },
      handleEditAccessRights: () => { },
      handleDelete: () => { },
      handleEdit: () => { },
      handleDuplicate: () => { },
      createUrl: '#',
      backUrl: '#',
      groupsCount: {
        test: 2,
      },
    }

    // Check number of elements rendered in the list
    const enzymeWrapper = shallow(<AccessGroupListComponent {...props} />, { context })
    const tableBodyRows = enzymeWrapper.find(TableBody).find(TableRow)
    assert.equal(tableBodyRows.length, 2, 'There should be 2 Table rows for AccessGroupListComponent. One row for each AccessGroup.')

    // Check number of actions available
    const tableBodyRowsHateoasIcons = tableBodyRows.find('Connect(WithHateoasDisplayControl(IconButton))')
    const tableBodyRowsResourceIcons = tableBodyRows.find('Connect(WithResourceDisplayControl(IconButton))')
    const nbHateoasIcons = 3
    const nbResourceIcons = 1
    assert.equal(tableBodyRowsHateoasIcons.length, nbHateoasIcons * keys(accessGroupList).length, `There should be ${nbHateoasIcons} hateoas icons for each tableRow.`)
    assert.equal(tableBodyRowsResourceIcons.length, nbResourceIcons * keys(accessGroupList).length, `There should be ${nbResourceIcons} resource icons for each tableRow.`)

    // Check displayed values
    const firstRow = tableBodyRows.at(0)
    const columns = firstRow.find(TableRowColumn)
    const expectedNbColumns = 3
    assert.equal(columns.length, expectedNbColumns, `Error displaying first row, there should be ${expectedNbColumns} columns.`)
    assert.equal(columns.at(0).children().text(), accessGroupList[keys(accessGroupList)[0]].content.name, 'Error displaying first row access group name value')
  })
})
