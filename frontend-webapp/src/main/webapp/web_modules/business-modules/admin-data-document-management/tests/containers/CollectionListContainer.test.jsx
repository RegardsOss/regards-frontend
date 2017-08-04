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
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { DocumentListContainer } from '../../src/containers/DocumentListContainer'


describe('[ADMIN DATA COLLECTION MANAGEMENT] Testing DocumentListContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DocumentListContainer)
    assert.isDefined(LoadableContentDisplayDecorator)
  })
  const context = buildTestContext()

  it('Render properly', () => {
    const props = {
      params: {
        project: 'someprocjet',
      },
      // from mapStateToProps
      documentList: DumpProvider.get('DataManagementClient', 'Document'),
      isFetching: false,
      // from mapDispatchToProps
      fetchDocumentList: () => {},
      deleteDocument: () => {},

    }
    const enzymeWrapper = shallow(<DocumentListContainer {...props} />, { context })
    expect(enzymeWrapper.find(LoadableContentDisplayDecorator)).to.have.length(1)
    assert.isFalse(enzymeWrapper.find(LoadableContentDisplayDecorator).props().isLoading, 'Loading should be false')
  })
})
