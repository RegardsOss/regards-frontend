/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { DocumentEditLinksContainer } from '../../src/containers/DocumentEditLinksContainer'

const context = buildTestContext()

describe('[ADMIN DATA DOCUMENT MANAGEMENT] Testing DocumentEditLinksContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DocumentEditLinksContainer)
    assert.isDefined(LoadableContentDisplayDecorator)
  })
  it('Render properly', () => {
    const props = {
      // from router
      params: {
        project: 'lambda',
        documentId: DumpProvider.getFirstEntityKey('DataManagementClient', 'Document'),
      },
      // from mapStateToProps
      currentDocument: DumpProvider.getFirstEntity('DataManagementClient', 'Document'),
      collectionList: DumpProvider.get('DataManagementClient', 'Collection'),
      // from mapDispatchToProps
      removeTagFromDocument: () => { },
      addTagToDocument: () => { },
      fetchDocument: () => { },
      fetchCollectionList: () => { },
    }
    const enzymeWrapper = shallow(<DocumentEditLinksContainer {...props} />, { context })
    expect(enzymeWrapper.find(LoadableContentDisplayDecorator)).to.have.length(1)
    enzymeWrapper.instance().setState({ isLoading: false })
    enzymeWrapper.update()
    assert.isFalse(enzymeWrapper.find(LoadableContentDisplayDecorator).props().isLoading, 'Loading should be false')
  })
})
