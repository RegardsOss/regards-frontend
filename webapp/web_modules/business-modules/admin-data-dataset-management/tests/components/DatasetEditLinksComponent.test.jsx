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
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers, DumpProvider, buildTestContext } from '@regardsoss/tests-helpers'
import { ListItem } from 'material-ui/List'
import { DatasetEditLinksComponent } from '../../src/components/DatasetEditLinksComponent'

const context = buildTestContext()

describe('[ADMIN DATASET MANAGEMENT] Testing DatasetEditLinksComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DatasetEditLinksComponent)
    assert.isDefined(ListItem)
  })
  it('Render properly', () => {
    const props = {
      linkedCollections: [
        DumpProvider.getNthEntity('DataManagementClient', 'Collection', 1),
        DumpProvider.getNthEntity('DataManagementClient', 'Collection', 2),
      ],
      remainingCollections: [DumpProvider.getNthEntity('DataManagementClient', 'Collection', 0)],
      currentDataset: DumpProvider.getFirstEntity('DataManagementClient', 'Dataset'),
      datasetStringTags: ['some tag', 'another tag', '42'],
      handleAdd: () => {},
      handleDelete: () => {},
      handleSearch: () => {},
      backUrl: '#',
      doneUrl: '#',
    }

    const enzymeWrapper = shallow(<DatasetEditLinksComponent {...props} />, { context })
    expect(enzymeWrapper.find(ListItem)).to.have.length(9)
  })
})
