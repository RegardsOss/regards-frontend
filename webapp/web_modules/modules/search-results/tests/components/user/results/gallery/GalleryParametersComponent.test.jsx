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
import GalleryParametersComponent from '../../../../../src/components/user/results/gallery/GalleryParametersComponent'
import styles from '../../../../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test GalleryParametersComponent
* @author Léo Mieulet
*/
describe('[Search Results] Testing GalleryParametersComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(GalleryParametersComponent)
  })
  it('should render correctly', () => {
    const props = {
      entity: DumpProvider.getFirstEntity('AccessProjectClient', 'DataobjectEntity'),
      attributePresentationModels: [],
    }
    const enzymeWrapper = shallow(<GalleryParametersComponent {...props} />, { context })
    expect(enzymeWrapper.find('div')).to.have.length(3)
  })
})
