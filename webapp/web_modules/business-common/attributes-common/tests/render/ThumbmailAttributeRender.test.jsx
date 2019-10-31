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
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import NoDataIcon from 'material-ui/svg-icons/device/wallpaper'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import { ThumbnailAttributeRender } from '../../src/render/ThumbnailAttributeRender'
import styles from '../../src/styles'
import ThumbnailFullSizePictureDialog from '../../src/render/ThumbnailFullSizePictureDialog'

const context = buildTestContext(styles)

/**
 * Tests for AttributeConfigurationComponent
 * @author Sébastien binda
 */
describe('[Attributes Common] Testing ThumbnailAttributeRender', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ThumbnailAttributeRender)
  })

  it('Should render a no data', () => {
    // undefined value
    let wrapper = shallow(<ThumbnailAttributeRender />, { context })
    assert.lengthOf(wrapper.find(NoDataIcon), 1, 'undefined file ==>  no data icon')
    // null value
    wrapper = shallow(<ThumbnailAttributeRender value={null} />, { context })
    assert.lengthOf(wrapper.find(NoDataIcon), 1, 'no file ==>  no data icon')
  })

  it('Should render correctly thumbnail and allow full size displaying', () => {
    // 1 - Initial render
    const file = {
      uri: 'http://rd1.com',
      dataType: 'THUMBNAIL',
      reference: false, // Does the file is a external reference ? not stored by regards.
      mimeType: 'img',
      imageWidth: 200,
      imageHeight: 200,
      online: true, // Does the file is directly accessible ? If not online, file is not downloadable.
      checksum: 'abcd',
      digestAlgorithm: 'leo method',
      filesize: 14555668,
      filename: 'hello.jpg',
    }
    const wrapper = shallow(<ThumbnailAttributeRender value={file} projectName="project" />, { context })
    const picture = wrapper.findWhere(n => n.props().src === 'http://rd1.com?scope=project')
    assert.lengthOf(picture, 1, 'There should be a picture with the right URL')
    testSuiteHelpers.assertWrapperProperties(picture, {
      alt: 'attribute.thumbnail.alt',
      onClick: wrapper.instance().onShowFullSizeDialog,
    }, 'Picture should define callback and alternative internationlized text ')
    let fullSizeDialog = wrapper.find(ThumbnailFullSizePictureDialog)
    assert.lengthOf(fullSizeDialog, 1, '1 - There should be the full size dialog')
    testSuiteHelpers.assertWrapperProperties(fullSizeDialog, {
      thumbnailURI: 'http://rd1.com?scope=project',
      open: false,
      onClose: wrapper.instance().onCloseFullSizeDialog,
    }, '1 - Dialog should be closed and define the expected properties')
    // 2 - Open full size picture
    picture.props().onClick()
    fullSizeDialog = wrapper.find(ThumbnailFullSizePictureDialog)
    assert.lengthOf(fullSizeDialog, 1, '2 - There should be the full size dialog')
    testSuiteHelpers.assertWrapperProperties(fullSizeDialog, {
      thumbnailURI: 'http://rd1.com?scope=project',
      open: true,
      onClose: wrapper.instance().onCloseFullSizeDialog,
    }, '2 - Dialog should be opened')
    // 3 - Close full size dialog
    fullSizeDialog.props().onClose()
    fullSizeDialog = wrapper.find(ThumbnailFullSizePictureDialog)
    assert.lengthOf(fullSizeDialog, 1, '3 - There should be the full size dialog')
    testSuiteHelpers.assertWrapperProperties(fullSizeDialog, {
      thumbnailURI: 'http://rd1.com?scope=project',
      open: false,
      onClose: wrapper.instance().onCloseFullSizeDialog,
    }, '3 - Dialog should be closed')
  })
})
