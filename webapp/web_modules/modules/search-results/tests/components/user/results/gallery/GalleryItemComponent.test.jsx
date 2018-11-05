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
import { assert, expect } from 'chai'
import { buildTestContext, testSuiteHelpers, DumpProvider } from '@regardsoss/tests-helpers'
import { CommonDomain } from '@regardsoss/domain'
import GalleryItemComponent from '../../../../../src/components/user/results/gallery/GalleryItemComponent'
import GalleryParametersContainer from '../../../../../src/containers/user/results/gallery/GalleryParametersContainer'
import styles from '../../../../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test GalleryItemComponent
* @author Léo Mieulet
*/
describe('[Search Results] Testing GalleryItemComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(GalleryItemComponent)
  })
  it('should render correctly', () => {
    const entity = DumpProvider.getFirstEntity('AccessProjectClient', 'DataobjectEntity')
    const localEntity = {
      content: {
        ...entity.content,
        files: {
          [CommonDomain.DataTypesEnum.QUICKLOOK_SD]: [
            {
              dataType: CommonDomain.DataTypesEnum.QUICKLOOK_SD,
              uri: 'http://www.google.fr',
              reference: true,
              mimeType: 'text/html',
              online: true,
              filename: 'google.fr',
            },
          ],
          [CommonDomain.DataTypesEnum.QUICKLOOK_MD]: [
            {
              dataType: CommonDomain.DataTypesEnum.QUICKLOOK_MD,
              uri: 'http://www.google.fr',
              reference: true,
              mimeType: 'text/html',
              online: true,
              filename: 'google.fr',
            },
          ],
        },
      },
    }
    const props = {
      top: 20,
      left: 20,
      width: 20,
      entity: localEntity,
      presentationModels: [],
      columnGutter: 80,
      columnWidth: 600,
      projectName: 'project1',
      accessToken: 'abcdef....',
      isDescAvailableFor: () => true,
      onShowDescription: () => { },
    }
    const enzymeWrapper = shallow(<GalleryItemComponent name {...props} />, { context })
    expect(enzymeWrapper.find(GalleryParametersContainer)).to.have.length(1)
  })
})
