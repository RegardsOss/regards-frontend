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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { DescriptionThumbnailComponent } from '../../../../../src/components/user/properties/attributes/DescriptionThumbnailComponent'
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
  it('should render correct thumbnail URL with only project scope', () => {
    const props = {
      accessToken: null,
      projectName: 'test-project',
      thumbnailURL: 'test:thumbnail.png',
    }

    const enzymeWrapper = shallow(<DescriptionThumbnailComponent {...props} />, { context })
    const imgWrapper = enzymeWrapper.find('img')
    assert.lengthOf(imgWrapper, 1)
    assert.equal(imgWrapper.props().alt, 'module.description.properties.thumbnail.alt.text')
    assert.equal(imgWrapper.props().src, 'test:thumbnail.png?scope=test-project')
  })
  it('should render correct thumbnail URL with token', () => {
    const props = {
      accessToken: 'test-token',
      projectName: 'test-project',
      thumbnailURL: 'test:thumbnail.png',
    }

    const enzymeWrapper = shallow(<DescriptionThumbnailComponent {...props} />, { context })
    const imgWrapper = enzymeWrapper.find('img')
    assert.lengthOf(imgWrapper, 1)
    assert.equal(imgWrapper.props().alt, 'module.description.properties.thumbnail.alt.text')
    assert.equal(imgWrapper.props().src, 'test:thumbnail.png?token=test-token')
  })
})
