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
 **/
import { shallow } from 'enzyme'
import { assert, expect } from 'chai'
import { buildTestContext, testSuiteHelpers, DumpProvider } from '@regardsoss/tests-helpers'
import values from 'lodash/values'
import { BasicPageableActions } from '@regardsoss/store-utils'
import InfiniteGalleryComponent from '../../src/gallery/InfiniteGalleryComponent'
import { InfiniteGalleryContainer } from '../../src/gallery/InfiniteGalleryContainer'

class FakeAction extends BasicPageableActions {
}

const context = buildTestContext()
/**
* Test InfiniteGalleryContainer
* @author Léo Mieulet
*/
describe('[COMPONENTS] Testing InfiniteGalleryContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(InfiniteGalleryContainer)
  })
  it('should render correctly', () => {
    const props = {
      itemComponent: (<div />),
      columnWidth: 400,
      columnGutter: 15,
      loadingComponent: (<div />),
      emptyComponent: (<div />),
      queryPageSize: 100,

      pageActions: FakeAction,
      pageSelectors: () => { },
      entities: values(DumpProvider.get('AccessProjectClient', 'DataobjectEntity')),
      entitiesFetching: true,
      pageMetadata: { // use only in onPropertiesUpdate
        number: 4,
        size: 3,
        totalElements: 10000000000000,
      },
      itemProps: {
        question: 'answer',
      },
      flushEntities: () => { },
      fetchEntities: () => { },
      authentication: {

      },
    }
    const enzymeWrapper = shallow(<InfiniteGalleryContainer name {...props} />, { context })
    expect(enzymeWrapper.find(InfiniteGalleryComponent)).to.have.length(1)
  })
})
