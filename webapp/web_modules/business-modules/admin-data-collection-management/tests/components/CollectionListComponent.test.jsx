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
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { PageableInfiniteTableContainer } from '@regardsoss/components'
import { testSuiteHelpers, buildTestContext, DumpProvider } from '@regardsoss/tests-helpers'
import CollectionListComponent from '../../src/components/CollectionListComponent'
import CollectionListFiltersComponent from '../../src/components/CollectionListFiltersComponent'

const context = buildTestContext()

describe('[ADMIN DATA COLLECTION MANAGEMENT] Testing CollectionListComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(CollectionListComponent)
  })

  it('Render properly', () => {
    const props = {
      collectionList: DumpProvider.get('DataManagementClient', 'Collection'),
      handleDelete: () => {},
      handleEdit: () => {},
      handleDuplicate: () => {},
      onRefresh: () => {},
      navigateToCreateCollection: () => {},
      createUrl: '#',
      backUrl: '#',
    }

    const enzymeWrapper = shallow(<CollectionListComponent {...props} />, { context })
    const table = enzymeWrapper.find(PageableInfiniteTableContainer)
    const filters = enzymeWrapper.find(CollectionListFiltersComponent)
    assert.isTrue(table.length === 1, 'There should be a TableContainer rendered')
    assert.isTrue(filters.length === 1, 'There should be a Collection list filter rendered')
  })
})
