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
import { UIDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers, DumpProvider } from '@regardsoss/tests-helpers'
import GalleryParametersComponent from '../../../../../src/components/user/results/gallery/GalleryParametersComponent'
import { GalleryParametersContainer } from '../../../../../src/containers/user/results/gallery/GalleryParametersContainer'
import styles from '../../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test GalleryParametersContainer
 * @author Raphaël Mechali
 */
describe('[Search Results] Testing GalleryParametersContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(GalleryParametersContainer)
  })
  it('should render correctly initially without locale', () => {
    const props = {
      entity: DumpProvider.getFirstEntity('AccessProjectClient', 'DataobjectEntity'),
      presentationModels: [],
    }
    const enzymeWrapper = shallow(<GalleryParametersContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(GalleryParametersComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      entity: props.entity,
      presentationModels: props.presentationModels,
      locale: UIDomain.LOCALES_ENUM.en,
    }, 'Component should define the expected properties')
  })
  it('should report correctly locale from mapped props', () => {
    const props = {
      entity: DumpProvider.getFirstEntity('AccessProjectClient', 'DataobjectEntity'),
      presentationModels: [],
      locale: UIDomain.LOCALES_ENUM.fr,
    }
    const enzymeWrapper = shallow(<GalleryParametersContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(GalleryParametersComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      entity: props.entity,
      presentationModels: props.presentationModels,
      locale: UIDomain.LOCALES_ENUM.fr,
    }, 'Component should define the expected properties')
  })
})
