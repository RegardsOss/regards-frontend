/**
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
import { assert } from 'chai'
import { spy } from 'sinon'
import { testSuiteHelpers, DumpProvider, buildTestContext } from '@regardsoss/tests-helpers'
import { ConfirmDialogComponent, PageableInfiniteTableContainer } from '@regardsoss/components'
import { AccessRightListComponent } from '../../src/components/AccessRightListComponent'
import AccessRightFormComponent from '../../src/components/AccessRightFormComponent'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Tests for component AccessRightListComponent
 *
 * @author Sébastien Binda
 */
describe('[ADMIN ACCESSRIGHT MANAGEMENT]  Testing AccessRightListComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AccessRightListComponent)
  })

  it('Render properly', () => {
    const props = {
      accessGroup: DumpProvider.getFirstEntity('DataManagementClient', 'AccessGroup'),
      selectedDatasetsWithAccessright: [],
      deleteAccessRight: () => { },
      submitAccessRights: () => { },
      navigateToCreateDataset: spy(),
      backURL: '#test',
      setFilters: () => { },
      isFetching: false,
      isSubmitting: false,
      onRefresh: () => { },
      onFilter: () => { },
    }

    const enzymeWrapper = shallow(<AccessRightListComponent {...props} />, { context })
    const form = enzymeWrapper.find(AccessRightFormComponent)
    const confirmDeleteDialog = enzymeWrapper.find(ConfirmDialogComponent)
    const table = enzymeWrapper.find(PageableInfiniteTableContainer)
    assert.isTrue(form.length === 1, 'There should a AccessRightFormComponent rendered')
    assert.isTrue(confirmDeleteDialog.length === 1, 'There should a confirmDeleteDialog rendered')
    assert.isTrue(table.length === 1, 'There should a TableContainer rendered')
  })
})
