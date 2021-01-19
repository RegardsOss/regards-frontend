/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import { ZoomablePicture } from '@regardsoss/components'
import { ThumbnailAttributeRender } from '../../src/render/ThumbnailAttributeRender'
import styles from '../../src/styles'

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
    const props = {
      settings: {
        showVersion: true,
        documentModels: [],
        primaryQuicklookGroup: 'myMain',
        quotaWarningCount: 150,
        rateWarningCount: 5,
      },
    }
    let wrapper = shallow(<ThumbnailAttributeRender {...props} />, { context })
    let picture = wrapper.find(ZoomablePicture)
    assert.lengthOf(picture, 1)
    testSuiteHelpers.assertWrapperProperties(picture, {
      normalPicURL: undefined,
      alt: 'attribute.thumbnail.alt',
    })
    // null value
    const props2 = {
      ...props,
      value: null,
    }
    wrapper = shallow(<ThumbnailAttributeRender {...props2} />, { context })
    picture = wrapper.find(ZoomablePicture)
    assert.lengthOf(picture, 1)
    testSuiteHelpers.assertWrapperProperties(picture, {
      normalPicURL: undefined,
      alt: 'attribute.thumbnail.alt',
    })
  })

  it('Should render correctly thumbnail', () => {
    // 1 - Initial render
    const props = {
      value: {
        [CommonDomain.DATA_TYPES_ENUM.THUMBNAIL]: [{
          uri: 'http://rd1.com',
          dataType: 'THUMBNAIL',
          reference: false,
          mimeType: 'img',
          imageWidth: 200,
          imageHeight: 200,
          online: true,
          checksum: 'abcd',
          digestAlgorithm: 'leo method',
          filesize: 14555668,
          filename: 'hello.jpg',
        }],
      },
      projectName: 'project',
      settings: {
        showVersion: true,
        documentModels: [],
        primaryQuicklookGroup: 'myMain',
        quotaWarningCount: 150,
        rateWarningCount: 5,
      },
    }
    const wrapper = shallow(<ThumbnailAttributeRender {...props} />, { context })
    const picture = wrapper.find(ZoomablePicture)
    assert.lengthOf(picture, 1)
    testSuiteHelpers.assertWrapperProperties(picture, {
      normalPicURL: 'http://rd1.com?scope=project',
      alt: 'attribute.thumbnail.alt',
    })
  })

  function buildImgDataFile(dataType, {
    name, reference = false, online = true, size, groupName,
  }) {
    return {
      dataType,
      reference,
      uri: `http://mydomain.com/myURI/${name}.png`,
      mimeType: 'image/png',
      imageWidth: size,
      imageHeight: size,
      online,
      checksum: name,
      digestAlgorithm: 'potatoes-digest',
      filesize: 25,
      filename: name,
      types: groupName ? [groupName] : [],
    }
  }
  function buildImgDataFiles(thumbnails, quicklooksSD, quicklooksMD, quicklookHD) {
    return {
      [CommonDomain.DATA_TYPES_ENUM.THUMBNAIL]: thumbnails.map((f) => buildImgDataFile(CommonDomain.DATA_TYPES_ENUM.THUMBNAIL, f)),
      [CommonDomain.DATA_TYPES_ENUM.QUICKLOOK_SD]: quicklooksSD.map((f) => buildImgDataFile(CommonDomain.DATA_TYPES_ENUM.QUICKLOOK_SD, f)),
      [CommonDomain.DATA_TYPES_ENUM.QUICKLOOK_MD]: quicklooksMD.map((f) => buildImgDataFile(CommonDomain.DATA_TYPES_ENUM.QUICKLOOK_MD, f)),
      [CommonDomain.DATA_TYPES_ENUM.QUICKLOOK_HD]: quicklookHD.map((f) => buildImgDataFile(CommonDomain.DATA_TYPES_ENUM.QUICKLOOK_HD, f)),
    }
  }
  const testCases = [{
    title: 'should fallback on first available thumbnail',
    files: buildImgDataFiles([
      { name: 'th_offline_file', reference: false, online: false },
      { name: 'th_online_file', reference: false, online: true },
    ], [
      {
        name: 'ql_secondary_sd', reference: true, online: true, size: 35, groupName: 'secondaryGroup',
      },
    ], [
      {
        name: 'ql_secondary_md', reference: true, online: true, size: 35, groupName: 'secondaryGroup',
      },
    ], [
      {
        name: 'ql_primary_hd', reference: true, online: true, size: 35, groupName: 'primaryGroup',
      },
      {
        name: 'ql_secondary_hd', reference: true, online: true, size: 35, groupName: 'secondaryGroup',
      },
    ]),
    expectedURI: 'http://mydomain.com/myURI/th_online_file.png?scope=project', // auth added as ref=false
  }, {
    title: 'should fallback on primary group first when no thumbnail available',
    files: buildImgDataFiles([
      { name: 'th_offline_file', reference: false, online: false },
    ], [
      {
        name: 'ql_secondary_sd', reference: true, online: true, size: 35, groupName: 'secondaryGroup',
      },
    ], [
      {
        name: 'ql_secondary_md', reference: true, online: true, size: 35, groupName: 'secondaryGroup',
      },
    ], [
      {
        name: 'ql_primary_hd', reference: true, online: true, size: 35, groupName: 'primaryGroup',
      },
      {
        name: 'ql_secondary_hd', reference: true, online: true, size: 35, groupName: 'secondaryGroup',
      },
    ]),
    expectedURI: 'http://mydomain.com/myURI/ql_primary_hd.png', // auth removed as ref=true
  }, {
    title: 'should fallback on any other quicklook, smaller dimension first, when no primary quicklook is available (ignoring dimensions as it does not not use it)',
    files: buildImgDataFiles([], [
      {
        name: 'ql_secondary_sd', reference: true, online: true, groupName: 'secondaryGroup',
      },
    ], [
      {
        name: 'ql_secondary_md', reference: true, online: true, size: 35, groupName: 'secondaryGroup',
      },
    ], [
      {
        name: 'ql_primary_hd', reference: false, online: false, size: 35, groupName: 'primaryGroup',
      },
      {
        name: 'ql_secondary_hd', reference: true, online: true, size: 35, groupName: 'secondaryGroup',
      },
    ]),
    expectedURI: 'http://mydomain.com/myURI/ql_secondary_sd.png', // auth removed as ref=true,
  }, {
    title: 'should show no data when no thumbnail nor quicklook is available',
    files: buildImgDataFiles([], [
      {
        name: 'ql_secondary_sd', reference: false, online: false, size: 35, groupName: 'secondaryGroup',
      },
    ], [], [
      {
        name: 'ql_primary_hd', reference: false, online: false, size: 35, groupName: 'primaryGroup',
      },
    ]),
    expectedURI: null,
  }]
  testCases.forEach(({ title, files, expectedURI }) => it(title, () => {
    const props = {
      value: files,
      projectName: 'project',
      settings: {
        showVersion: true,
        documentModels: [],
        primaryQuicklookGroup: 'primaryGroup',
        quotaWarningCount: 150,
        rateWarningCount: 5,
      },
    }
    const wrapper = shallow(<ThumbnailAttributeRender {...props} />, { context })
    const picture = wrapper.find(ZoomablePicture)
    assert.lengthOf(picture, 1, 'There should be the picture')
    if (expectedURI) {
      assert.equal(picture.props().normalPicURL, expectedURI)
    } else {
      assert.isUndefined(picture.props().normalPicURL)
    }
  }))
})
