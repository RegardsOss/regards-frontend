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
import Dialog from 'material-ui/Dialog'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import ThumbnailFullSizePictureDialog from '../../src/render/ThumbnailFullSizePictureDialog'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Test ThumbnailFullSizePictureDialog
 * @author Raphaël Mechali
 */
describe('[Attributes Common] Testing ThumbnailFullSizePictureDialog', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ThumbnailFullSizePictureDialog)
  })
  it('should render correctly closed', () => {
    const props = {
      thumbnailURI: 'myURL/anything.png',
      open: false,
      onClose: () => {},
    }
    const enzymeWrapper = shallow(<ThumbnailFullSizePictureDialog {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(Dialog), 0, 'Dialog should not be shown')
  })
  it('should render correctly opend', () => {
    const props = {
      thumbnailURI: 'myURL/anything.png',
      open: true,
      onClose: () => {},
    }
    const enzymeWrapper = shallow(<ThumbnailFullSizePictureDialog {...props} />, { context })
    // 0 - Check nothing is rendered while state contentStyle is not resolved
    assert.lengthOf(enzymeWrapper.find(Dialog), 0, 'Dialog should not be shown')
    // 1 - emulate style resolution
    enzymeWrapper.setState({ contentStyle: { maxWidth: 505 } })
    const dialog = enzymeWrapper.find(Dialog)
    assert.lengthOf(dialog, 1, 'There should be dialog component')
    testSuiteHelpers.assertWrapperProperties(dialog, {
      modal: false,
      onRequestClose: props.onClose,
      autoScrollBodyContent: true,
      contentStyle: enzymeWrapper.state().contentStyle,
      open: true,
    }, 'Dialog properties should be correctly set')
    const picture = dialog.find('img')
    assert.lengthOf(picture, 1, 'There should be the picture')
    testSuiteHelpers.assertWrapperProperties(picture, {
      alt: 'attribute.thumbnail.alt',
      src: props.thumbnailURI,
    }, 'Picture should define the expected properties')
  })
})
