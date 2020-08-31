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
import NoDataIcon from 'mdi-material-ui/Wallpaper'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { ZoomablePicture } from '../../src/picture/ZoomablePicture'
import { ZoomedPictureDialog } from '../../src/picture/ZoomedPictureDialog'
import styles from '../../src/picture/styles'

const context = buildTestContext(styles)

/**
 * Test ZoomablePicture
 * @author Raphaël Mechali
 */
describe('[Components] Testing ZoomablePicture', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ZoomablePicture)
  })
  it('should render correctly when no data', () => {
    const props = {
      normalPicURL: null,
      alt: 'test',
    }
    const enzymeWrapper = shallow(<ZoomablePicture {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find('img'), 0, 'Img should not be shown')
    assert.lengthOf(enzymeWrapper.find(NoDataIcon), 1, 'No data should be shown')
  })
  it('should render correctly without different zoom picture', () => {
    const props = {
      normalPicURL: 'anyURL/pic_default.png',
      alt: 'test',
      style: {
        width: 99,
        height: '50%',
      },
    }
    const enzymeWrapper = shallow(<ZoomablePicture {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(NoDataIcon), 0, 'No data should not be shown')

    const imgWrapper = enzymeWrapper.find('img')
    assert.lengthOf(imgWrapper, 1, 'Img should not be shown')
    testSuiteHelpers.assertWrapperProperties(imgWrapper, {
      src: props.normalPicURL,
      onClick: enzymeWrapper.instance().onShowFullSizeDialog,
      alt: props.alt,
    })
    let dialogWrapper = enzymeWrapper.find(ZoomedPictureDialog)
    assert.lengthOf(dialogWrapper, 1)
    testSuiteHelpers.assertWrapperProperties(dialogWrapper, {
      picURL: props.normalPicURL,
      alt: props.alt,
      open: false,
      onClose: enzymeWrapper.instance().onCloseFullSizeDialog,
    })
    // simulate dialog opening
    imgWrapper.props().onClick()
    dialogWrapper = enzymeWrapper.find(ZoomedPictureDialog)
    assert.lengthOf(dialogWrapper, 1)
    testSuiteHelpers.assertWrapperProperties(dialogWrapper, {
      picURL: props.normalPicURL,
      alt: props.alt,
      open: true,
      onClose: enzymeWrapper.instance().onCloseFullSizeDialog,
    })
    // simulate dialog closing
    dialogWrapper.props().onClose()
    dialogWrapper = enzymeWrapper.find(ZoomedPictureDialog)
    assert.lengthOf(dialogWrapper, 1)
    testSuiteHelpers.assertWrapperProperties(dialogWrapper, {
      picURL: props.normalPicURL,
      alt: props.alt,
      open: false,
      onClose: enzymeWrapper.instance().onCloseFullSizeDialog,
    })
  })
  it('should render correctly with different zoom picture', () => {
    const props = {
      normalPicURL: 'anyURL/pic_default.png',
      largePicURL: 'anyURL/pic_large.png',
      alt: 'test',
    }
    const enzymeWrapper = shallow(<ZoomablePicture {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(NoDataIcon), 0, 'No data should not be shown')
    const imgWrapper = enzymeWrapper.find('img')
    assert.lengthOf(imgWrapper, 1, 'Img should not be shown')
    testSuiteHelpers.assertWrapperProperties(imgWrapper, {
      src: props.normalPicURL,
      onClick: enzymeWrapper.instance().onShowFullSizeDialog,
      alt: props.alt,
    })
    const dialogWrapper = enzymeWrapper.find(ZoomedPictureDialog)
    assert.lengthOf(dialogWrapper, 1)
    testSuiteHelpers.assertWrapperProperties(dialogWrapper, {
      picURL: props.largePicURL,
      alt: props.alt,
      open: false,
      onClose: enzymeWrapper.instance().onCloseFullSizeDialog,
    })
  })
})
