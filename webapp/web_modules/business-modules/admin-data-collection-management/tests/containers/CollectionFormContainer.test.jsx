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
import { expect, assert } from 'chai'
import { testSuiteHelpers, buildTestContext, DumpProvider } from '@regardsoss/tests-helpers'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { CollectionFormContainer } from '../../src/containers/CollectionFormContainer'

describe('[ADMIN DATA COLLECTION MANAGEMENT] Testing CollectionFormContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(CollectionFormContainer)
    assert.isDefined(LoadableContentDisplayDecorator)
  })
  const context = buildTestContext()

  it('Render properly', () => {
    const props = {
      // from router
      params: {
        project: 'lambda',
        collectionId: DumpProvider.getFirstEntityKey('DataManagementClient', 'Collection'),
        mode: 'duplicate',
      },
      // from mapStateToProps
      currentCollection: DumpProvider.getFirstEntity('DataManagementClient', 'Collection'),
      isFetchingCollection: false,
      isFetchingModelAttribute: false,
      isFetchingModel: false,
      modelAttributeList: DumpProvider.get('DataManagementClient', 'ModelAttribute'),
      modelList: DumpProvider.get('DataManagementClient', 'Model'),
      // from redux-form
      unregisterField: testSuiteHelpers.getSuccessDispatchStub(),
      // from mapDispatchToProps
      createCollection: testSuiteHelpers.getSuccessDispatchStub(),
      updateCollection: testSuiteHelpers.getSuccessDispatchStub(),
      fetchCollection: testSuiteHelpers.getSuccessDispatchStub({
        entities: {
          collection: {
            0: {
              content: {
                model: {
                  name: 'MODEL 2',
                },
              },
            },
          },
        },
      }),
      fetchModelList: testSuiteHelpers.getSuccessDispatchStub(),
      fetchModelAttributeList: testSuiteHelpers.getSuccessDispatchStub(),
      clearModelAttributeList: () => {},
    }
    const enzymeWrapper = shallow(<CollectionFormContainer {...props} />, { context })
    expect(enzymeWrapper.find(LoadableContentDisplayDecorator)).to.have.length(1)
    assert.isFalse(enzymeWrapper.find(LoadableContentDisplayDecorator).props().isLoading, 'Loading should be false')
  })
})
