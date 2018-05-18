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
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers, DumpProvider } from '@regardsoss/tests-helpers'
import GalleryItemComponent from '../../../../../src/components/user/results/gallery/GalleryItemComponent'
import { GalleryItemContainer } from '../../../../../src/containers/user/results/gallery/GalleryItemContainer'
import styles from '../../../../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test GalleryItemContainer
* @author Léo Mieulet
*/
describe('[Search results] Testing GalleryItemContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(GalleryItemContainer)
    assert.isDefined(GalleryItemComponent)
  })
  it('should render correctly', () => {
    const entity = DumpProvider.getFirstEntity('AccessProjectClient', 'DataobjectEntity')
    entity.content.files = {
      QUICKLOOK_SD: [
        {
          uri: 'http://www.google.fr',
        },
      ],
      QUICKLOOK_MD: [
        {
          uri: 'http://www.google.fr',
        },
      ],
    }
    const props = {
      dispatchShowQuicklook: () => { },
      entity,
      attributePresentationModels: [],
      projectName: 'project1',
      accessToken: 'abcdef....',
    }
    const enzymeWrapper = shallow(<GalleryItemContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(GalleryItemComponent)
    // verify component was drawn
    assert.lengthOf(componentWrapper, 1, 'There must be the sub component')
  })
})
