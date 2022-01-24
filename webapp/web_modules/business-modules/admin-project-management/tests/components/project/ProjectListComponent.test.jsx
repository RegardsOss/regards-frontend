/*
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
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { Table, TableRow } from 'material-ui/Table'
import { testSuiteHelpers, DumpProvider, buildTestContext } from '@regardsoss/tests-helpers'
import { CardActionsComponent } from '@regardsoss/components'
import { ProjectListComponent } from '../../../src/components/project/ProjectListComponent'

// Test a component rendering
describe('[ADMIN PROJECT MANAGEMENT] Testing project list container', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  const context = buildTestContext()

  it('should exists', () => {
    assert.isDefined(ProjectListComponent)
  })

  it('should render self and subcomponents', () => {
    const props = {
      projectList: DumpProvider.get('AdminClient', 'Project'),
      handleConfigureConnections: () => { },
      handleDelete: () => { },
      handleOpen: () => { },
      handleEdit: () => { },
      handleUpdateLicense: () => { },
      createUrl: '/some/url',
    }
    const options = { context }

    const enzymeWrapper = shallow(<ProjectListComponent {...props} />, options)
    expect(enzymeWrapper.find(Table)).to.have.length(1)
    expect(enzymeWrapper.find(TableRow)).to.have.length(3)
    expect(enzymeWrapper.find(CardActionsComponent)).to.have.length(1)
  })
})
