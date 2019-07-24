/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { ListItem } from 'material-ui/List'
import DocumentEditLinksComponent from '../../src/components/DocumentEditLinksComponent'
import DocumentStepperContainer from '../../src/containers/DocumentStepperContainer'


describe('[ADMIN DATA DOCUMENT MANAGEMENT] Testing DocumentEditLinksComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DocumentEditLinksComponent)
  })
  const context = buildTestContext()
  it('Render properly', () => {
    const firstEntity = DumpProvider.getFirstEntity('DataManagementClient', 'Collection')
    const secondEntity = DumpProvider.getFirstEntity('DataManagementClient', 'Collection')
    const thirdEntity = DumpProvider.getFirstEntity('DataManagementClient', 'Collection')
    const props = {
      currentDocument: DumpProvider.getFirstEntity('DataManagementClient', 'Document'),
      backUrl: '#',
      doneUrl: '#',
      handleDelete: () => { },
      handleAdd: () => { },
      handleSearch: () => { },
      linkedCollections: [
        firstEntity,
      ],
      remainingCollections: [
        secondEntity, thirdEntity,
      ],
      documentStringTags: ['hey'],
    }
    const enzymeWrapper = shallow(<DocumentEditLinksComponent {...props} />, { context })
    expect(enzymeWrapper.find(ListItem)).to.have.length(7)
    expect(enzymeWrapper.find(DocumentStepperContainer)).to.have.length(1)
  })
})
