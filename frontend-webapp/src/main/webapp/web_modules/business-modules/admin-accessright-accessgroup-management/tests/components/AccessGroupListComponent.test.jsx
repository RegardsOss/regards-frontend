/**
 * LICENSE_PLACEHOLDER
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
      handleEditAccessRights: () => { },
      handleDelete: () => { },
      handleEdit: () => { },
      handleDuplicate: () => { },
      createUrl: '#',
      backUrl: '#',
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
    assert.equal(columns.at(1).children().text(), accessGroupList[keys(accessGroupList)[0]].content.users.length, 'Error displaying first row access group number of users')
  })
})
