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
import { assert } from 'chai'
import NoDataIcon from 'material-ui/svg-icons/device/wallpaper'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import { OBJECT_LINKED_FILE_ENUM } from '@regardsoss/domain/catalog'
import { CatalogDomain } from '@regardsoss/domain'
import { ThumbnailAttributeRender } from '../../src/render/ThumbnailAttributeRender'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Tests for AttributeConfigurationComponent
 * @author Sébastien binda
 */
describe('[ATTRIBUTES COMMON] Testing ThumbnailAttributeRender', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ThumbnailAttributeRender)
  })

  it('Should render a no data', () => {
    // undefined value
    let wrapper = shallow(<ThumbnailAttributeRender />, { context })
    assert.lengthOf(wrapper.find(NoDataIcon), 1, 'undefined files ==>  no data icon')
    // null value
    wrapper = shallow(<ThumbnailAttributeRender value={null} />, { context })
    assert.lengthOf(wrapper.find(NoDataIcon), 1, 'no file ==>  no data icon')
    // No thumbnail file in files array
    const files = {
      [OBJECT_LINKED_FILE_ENUM.RAWDATA]: [{ uri: 'http://idk.com' }],
    }
    wrapper = shallow(<ThumbnailAttributeRender value={files} />, { context })
    assert.lengthOf(wrapper.find(NoDataIcon), 1, 'no thumbnail file ==>  no data icon')
  })

  it('Should render the first available Thumbmail file', () => {
    // No thumbnail file in files array
    const files = {
      [OBJECT_LINKED_FILE_ENUM.THUMBNAIL]: [{ uri: 'http://rd1.com' }],
      [OBJECT_LINKED_FILE_ENUM.THUMBNAIL]: [{ uri: 'http://th1.com' }, { uri: 'http://th2.com' }],
    }
    const wrapper = shallow(<ThumbnailAttributeRender value={files} />, { context })
    assert.lengthOf(wrapper.findWhere(n => n.props().src === 'http://th1.com'), 1, 'There should be an image with first thubnail as source')
  })
})
