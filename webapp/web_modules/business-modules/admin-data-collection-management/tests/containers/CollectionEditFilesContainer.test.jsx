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
import { expect, assert } from 'chai'
import { testSuiteHelpers, DumpProvider, buildTestContext } from '@regardsoss/tests-helpers'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { CollectionEditFilesContainer } from '../../src/containers/CollectionEditFilesContainer'

const context = buildTestContext()

describe('[ADMIN COLLECTION MANAGEMENT] Testing CollectionEditFilesContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(CollectionEditFilesContainer)
    assert.isDefined(LoadableContentDisplayDecorator)
  })

  it('Render properly', () => {
    const props = {
      // from router
      params: {
        project: 'lambda',
        collectionId: DumpProvider.getFirstEntityKey('DataManagementClient', 'Collection'),
      },
      // from mapStateToProps
      currentCollection: DumpProvider.getFirstEntity('DataManagementClient', 'Collection'),

      // from mapDispatchToProps
      fetchCollection: () => new Promise(() => { }),
    }
    const enzymeWrapper = shallow(<CollectionEditFilesContainer {...props} />, { context })
    expect(enzymeWrapper.find(LoadableContentDisplayDecorator)).to.have.length(1)
    assert.isTrue(enzymeWrapper.find(LoadableContentDisplayDecorator).props().isLoading, 'Loading should be true')
  })
})
