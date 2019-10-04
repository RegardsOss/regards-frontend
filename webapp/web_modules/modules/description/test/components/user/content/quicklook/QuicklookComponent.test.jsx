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
import { CommonDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import QuicklookComponent from '../../../../../src/components/user/content/quicklook/QuicklookComponent'
import styles from '../../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test QuicklookComponent
 * @author Raphaël Mechali
 */
describe('[ Module name] Testing QuicklookComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(QuicklookComponent)
  })
  it('should render correctly', () => {
    function buildQuicklookGroupFor(groupName) {
      return [
        CommonDomain.DATA_TYPES_ENUM.QUICKLOOK_SD,
        CommonDomain.DATA_TYPES_ENUM.QUICKLOOK_MD,
        CommonDomain.DATA_TYPES_ENUM.QUICKLOOK_HD].reduce((acc, dataType) => ({
        ...acc,
        [dataType]: {
          dataType,
          reference: false,
          uri: `http://test/${groupName}/${dataType}.jpg`,
          mimeType: 'image/jpeg',
          imageWidth: 105,
          imageHeight: 88,
          online: true,
          checksum: 'IDKIDKIDK',
          digestAlgorithm: 'MD5',
          filesize: 13453,
          filename: `${dataType}.jpg`,
        },
      }), { label: groupName })
    }
    const props = {
      quicklookFiles: [buildQuicklookGroupFor('main'), buildQuicklookGroupFor('secondary')],
    }
    // 1 - Render in initial model
    const enzymeWrapper = shallow(<QuicklookComponent {...props} />, { context })
    let imgWrapper = enzymeWrapper.find('img')
    assert.lengthOf(imgWrapper, 1, '(1) There should be the picture displayer')
    testSuiteHelpers.assertWrapperProperties(imgWrapper, {
      src: props.quicklookFiles[0][CommonDomain.DATA_TYPES_ENUM.QUICKLOOK_MD].uri,
      alt: 'module.description.content.quicklook.alt.message',
    }, '(1) Picture properties should be correctly set to render medium resolution thumbnail of first group')
    // 2 - Test toggling magnified mode on
    enzymeWrapper.instance().toggleMagnified()
    imgWrapper = enzymeWrapper.find('img')
    assert.lengthOf(imgWrapper, 1, '(2) There should be the picture displayer')
    testSuiteHelpers.assertWrapperProperties(imgWrapper, {
      src: props.quicklookFiles[0][CommonDomain.DATA_TYPES_ENUM.QUICKLOOK_HD].uri,
      alt: 'module.description.content.quicklook.alt.message',
    }, '(2) Picture properties should be correctly set to render high resolution thumbnail of first group when magnified mode is on')
    // 2 - Test toggling magnified mode off
    enzymeWrapper.instance().toggleMagnified()
    imgWrapper = enzymeWrapper.find('img')
    assert.lengthOf(imgWrapper, 1, '(3) There should be the picture displayer')
    testSuiteHelpers.assertWrapperProperties(imgWrapper, {
      src: props.quicklookFiles[0][CommonDomain.DATA_TYPES_ENUM.QUICKLOOK_MD].uri,
      alt: 'module.description.content.quicklook.alt.message',
    }, '(3) Picture properties should be correctly set to render high resolution thumbnail of first group when magnified mode is on')
  })
})
