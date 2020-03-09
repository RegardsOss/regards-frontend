/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { EntitiesFilesFormContainer } from '@regardsoss/admin-data-entities-attributes-management'
import { DatasetEditFilesComponent } from '../../src/components/DatasetEditFilesComponent'

const context = buildTestContext()

describe('[ADMIN DATASET MANAGEMENT] Testing DatasetEditFilesComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DatasetEditFilesComponent)
    assert.isDefined(EntitiesFilesFormContainer)
  })
  it('Render properly', () => {
    const props = {
      currentDataset: DumpProvider.getFirstEntity('DataManagementClient', 'Dataset'),
      backURL: '#',
      linksURL: '#',
      handleRefreshEntity: () => {},
      handleUpdateEntity: () => {},
    }

    const enzymeWrapper = shallow(<DatasetEditFilesComponent {...props} />, { context })
    expect(enzymeWrapper.find(EntitiesFilesFormContainer)).to.have.length(1)
  })
})
