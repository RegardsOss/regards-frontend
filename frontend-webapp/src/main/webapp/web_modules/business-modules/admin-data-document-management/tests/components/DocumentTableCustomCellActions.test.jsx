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
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers, buildTestContext, DumpProvider } from '@regardsoss/tests-helpers'
import Delete from 'material-ui/svg-icons/action/delete'
import Edit from 'material-ui/svg-icons/editor/mode-edit'
import DocumentTableCustomCellActions from '../../src/components/DocumentTableCustomCellActions'

describe('[ADMIN DATA DOCUMENT MANAGEMENT] Testing DocumentTableCustomCellActions', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DocumentTableCustomCellActions)
  })
  const context = buildTestContext()


  it('Render properly', () => {
    const props = {
      entity: DumpProvider.getFirstEntity('DataManagementClient', 'Document'),
      rowIndex: 3,
      pageSize: 10,
      onDelete: () => { },
      onEdit: () => { },
      intl: context.intl,
      lineHeight: 40,
    }
    const enzymeWrapper = shallow(<DocumentTableCustomCellActions {...props} />)
    expect(enzymeWrapper.find(Delete)).to.have.length(1)
    expect(enzymeWrapper.find(Edit)).to.have.length(1)
  })
})
