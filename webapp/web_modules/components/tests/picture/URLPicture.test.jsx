/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import flatMap from 'lodash/flatMap'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { URLPicture } from '../../src/picture/URLPicture'
import { BrokenPicturePlaceholder } from '../../src/picture/BrokenPicturePlaceholder'
import ConnectedURLSVGPicture, { URLSVGPicture } from '../../src/picture/URLSVGPicture'
import ConnectdURLCommonPicture, { URLCommonPicture } from '../../src/picture/URLCommonPicture'
import styles from '../../src/picture/styles'

const context = buildTestContext(styles)

/**
 * Test URLPicture
 * @author Raphaël Mechali
 */
describe('[Components] Testing URLPicture', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(URLPicture)
  })
  it('should render broken when picture MIME type is not provided', () => {
    const props = {
      url: 'any',
    }
    const enzymeWrapper = shallow(<URLPicture {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(BrokenPicturePlaceholder), 1, ' Should render broken')
    assert.lengthOf(enzymeWrapper.find(URLSVGPicture), 0, ' Should not render as SVG')
    assert.lengthOf(enzymeWrapper.find(URLCommonPicture), 0, ' Should not render as common picture')
  })
  it('should render broken when picture URL is not provided', () => {
    const props = {
      mimeType: 'image/tiff',
    }
    const enzymeWrapper = shallow(<URLPicture {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(BrokenPicturePlaceholder), 1, ' Should render broken')
    assert.lengthOf(enzymeWrapper.find(URLSVGPicture), 0, ' Should not render as SVG')
    assert.lengthOf(enzymeWrapper.find(URLCommonPicture), 0, ' Should not render as common picture')
  })
  it('should render broken when picture MIME type is not supported', () => {
    const props = {
      url: 'any.str',
      mimeType: 'image/strange-picture-type',
    }
    const enzymeWrapper = shallow(<URLPicture {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(BrokenPicturePlaceholder), 1, ' Should render broken')
    assert.lengthOf(enzymeWrapper.find(ConnectedURLSVGPicture), 0, ' Should not render as SVG')
    assert.lengthOf(enzymeWrapper.find(ConnectdURLCommonPicture), 0, ' Should not render as common picture')
  })

  const testCaseByMimeType = flatMap(URLPicture.PICTURES_RENDER, (Render) => Render.SUPPORTED_MIME_TYPES)

  testCaseByMimeType.forEach((mimeType) => {
    it(`It support ${mimeType} render`, () => {
      const props = {
        url: 'any.xxx',
        mimeType,
      }
      const enzymeWrapper = shallow(<URLPicture {...props} />, { context })
      assert.lengthOf(enzymeWrapper.find(BrokenPicturePlaceholder), 0, ' Should not render broken')
    })
  })
})
