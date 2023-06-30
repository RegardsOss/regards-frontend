/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import root from 'window-or-global'
import Dialog from 'material-ui/Dialog'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { ZoomedPictureDialog } from '../../src/picture/ZoomedPictureDialog'
import styles from '../../src/picture/styles'

const context = buildTestContext(styles)

/**
 * Test ZoomedPictureDialog
 * @author Raphaël Mechali
 */
describe('[Components] Testing ZoomedPictureDialog', () => {
  before(() => {
    testSuiteHelpers.before()
    root.Image = class TestImage {}
  })
  after(() => {
    delete root.Image
    testSuiteHelpers.after()
  })

  it('should exists', () => {
    assert.isDefined(ZoomedPictureDialog)
  })
  it('should render correctly', () => {
    const props = {
      picURL: 'anyURL/pic_default.png',
      alt: 'test',
      open: true,
      onClose: () => {},
    }
    const enzymeWrapper = shallow(<ZoomedPictureDialog {...props} />, { context })
    const dialogWrapper = enzymeWrapper.find(Dialog)
    assert.lengthOf(dialogWrapper, 1)
    testSuiteHelpers.assertWrapperProperties(dialogWrapper, {
      onRequestClose: props.onClose,
      open: true,
    })
    const imgWrapper = enzymeWrapper.find('img')
    assert.lengthOf(imgWrapper, 1)
    testSuiteHelpers.assertWrapperProperties(imgWrapper, {
      alt: props.alt,
      src: props.picURL,
      onLoad: enzymeWrapper.instance().onDialogContentLoaded,
    })
  })
})
