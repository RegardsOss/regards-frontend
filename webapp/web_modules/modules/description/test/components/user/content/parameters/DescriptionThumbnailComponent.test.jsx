/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { ZoomablePicture } from '@regardsoss/components'
import DescriptionThumbnailComponent from '../../../../../src/components/user/content/parameters/DescriptionThumbnailComponent'
import styles from '../../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test DescriptionThumbnailComponent
 * @author Raphaël Mechali
 */
describe('[Description] Testing DescriptionThumbnailComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DescriptionThumbnailComponent)
  })
  it('should render correctly', () => {
    const props = {
      thumbnail: {
        label: 'My picture',
        available: true,
        uri: 'http://this.is/a.test.png',
      },
    }
    const enzymeWrapper = shallow(<DescriptionThumbnailComponent {...props} />, { context })
    const imgWrapper = enzymeWrapper.find(ZoomablePicture)
    assert.lengthOf(imgWrapper, 1, 'There should be the picture')
    testSuiteHelpers.assertWrapperProperties(imgWrapper, {
      normalPicURL: props.thumbnail.uri,
      alt: 'module.description.content.parameters.thumbnail.alt.text',
    }, 'picture properties should be correctly set')
  })
})
