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
import FileIcon from 'mdi-material-ui/FileImage'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { DownloadButton } from '@regardsoss/components'
import { DownloadIconComponent, QUOTA_INFO_STATE_ENUM } from '@regardsoss/entities-common'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { CommonDomain, UIDomain } from '@regardsoss/domain'
import { FileLinkComponent } from '../../../../../../src/components/user/content/list/file/FileLinkComponent'
import PageLinkCellComponent from '../../../../../../src/components/user/content/list/common/PageLinkCellComponent'
import styles from '../../../../../../src/styles'
import PageElementOption from '../../../../../../src/components/user/content/list/common/PageElementOption'

const context = buildTestContext(styles)

/**
 * Test FileLinkComponent
 * @author Raphaël Mechali
 */
describe('[Description] Testing FileLinkComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(FileLinkComponent)
  })
  const testCases = [{
    label: 'disabled when file is not available',
    testSpecs: [{
      specLabel: 'description file',
      file: { type: CommonDomain.DATA_TYPES_ENUM.DESCRIPTION, reference: false, available: false },
      quotaInfo: { downloadDisabled: false },
      accessToken: 'test-token',
    }, {
      specLabel: 'raw data file',
      file: { type: CommonDomain.DATA_TYPES_ENUM.RAWDATA, reference: false, available: false },
      quotaInfo: { downloadDisabled: false },
    }, {
      specLabel: 'quicklook HD file',
      file: { type: CommonDomain.DATA_TYPES_ENUM.QUICKLOOK_HD, reference: false, available: false },
      quotaInfo: { downloadDisabled: true },
      accessToken: 'test-token',
    }],
    expectations: {
      link: {
        previewAllowed: false,
      },
      option: {
        disabled: true,
        visible: false,
      },
    },
  }, {
    label: 'disabled when file is internally stored raw data and user is not logged',
    testSpecs: [{
      specLabel: 'internal raw data',
      file: { type: CommonDomain.DATA_TYPES_ENUM.RAWDATA, reference: false, available: true },
      quotaInfo: { downloadDisabled: false },
      accessToken: null,
    }],
    expectations: {
      link: {
        previewAllowed: false,
      },
      option: {
        visible: false,
      },
    },
  }, {
    label: 'enabled when file is available and not internal raw data',
    testSpecs: [
      // all files types but raw data, as reference or internally stored, with / without token, quota consumed or not
      ...CommonDomain.DATA_TYPES
        .filter((t) => t !== CommonDomain.DATA_TYPES_ENUM.RAWDATA)
        .reduce((acc, type) => [
          ...acc,
          ...[true, false].reduce((acc2, reference) => [
            ...acc2,
            ...[null, 'testToken'].reduce((acc3, accessToken) => [
              ...acc3,
              ...[true, false].map((downloadDisabled) => ({
                specLabel: `type: ${type} / reference: ${reference} / with token: ${!!accessToken} / quota consumed: ${downloadDisabled}`,
                file: { type, reference, available: true },
                quotaInfo: { downloadDisabled },
                accessToken,
              })),
            ], []),
          ], []),
        ], []),
      // externally stored raw DATA with / without token, quota consumed or not
      ...[null, 'testToken'].reduce((acc, accessToken) => [
        ...acc,
        ...[true, false].map((downloadDisabled) => ({
          specLabel: `type: external raw data / with token: ${!!accessToken} / quota consumed: ${downloadDisabled}`,
          file: { type: CommonDomain.DATA_TYPES_ENUM.RAWDATA, reference: true, available: true },
          quotaInfo: { downloadDisabled },
          accessToken,
        })),
      ], []),
    ],
    expectations: {
      link: {
        previewAllowed: false,
      },
      option: {
        visible: true,
        disabled: false,
        displayQuotaWarnings: false,
      },
    },
  }, {
    label: 'enabled when file is available, internal raw data, user logged and quota is not consumed',
    testSpecs: [{
      specLabel: 'internal raw data',
      file: { type: CommonDomain.DATA_TYPES_ENUM.RAWDATA, reference: false, available: true },
      quotaInfo: { downloadDisabled: false },
      accessToken: 'testToken',
    }],
    expectations: {
      link: {
        previewAllowed: false,
      },
      option: {
        visible: true,
        disabled: false,
        displayQuotaWarnings: true,
      },
    },
  }, {
    label: 'enabled when file is available, internal raw data, user logged and quota is consumed',
    testSpecs: [{
      specLabel: 'internal raw data',
      file: { type: CommonDomain.DATA_TYPES_ENUM.RAWDATA, reference: false, available: true },
      quotaInfo: { downloadDisabled: true },
      accessToken: 'testToken',
    }],
    expectations: {
      link: {
        previewAllowed: false,
      },
      option: {
        visible: true,
        disabled: true,
        displayQuotaWarnings: true,
      },
    },
  }, {
    label: 'enabled preview when mimeType is one of the CODE_FILE_SUPPORTED_MIME_TYPES',
    testSpecs: [{
      specLabel: 'internal raw data',
      file: {
        type: CommonDomain.DATA_TYPES_ENUM.RAWDATA,
        reference: false,
        available: true,
        mimeType: UIDomain.CODE_FILE_SUPPORTED_MIME_TYPES[1],
      },
      quotaInfo: { downloadDisabled: true },
      accessToken: 'testToken',
    }],
    expectations: {
      link: {
        previewAllowed: true,
      },
      option: {
        visible: true,
        disabled: true,
        displayQuotaWarnings: true,
      },
    },
  }, {
    label: 'enabled preview when mimeType is one of the IMAGE_FILE_SUPPORTED_MIME_TYPES',
    testSpecs: [{
      specLabel: 'internal raw data',
      file: {
        type: CommonDomain.DATA_TYPES_ENUM.RAWDATA,
        reference: false,
        available: true,
        mimeType: UIDomain.IMAGE_FILE_SUPPORTED_MIME_TYPES[3],
      },
      quotaInfo: { downloadDisabled: true },
      accessToken: 'testToken',
    }],
    expectations: {
      link: {
        previewAllowed: true,
      },
      option: {
        visible: true,
        disabled: true,
        displayQuotaWarnings: true,
      },
    },
  }, {
    label: 'enabled preview when mimeType is one of the IFRAME_CONTENT_SUPPORTED_MIME_TYPES',
    testSpecs: [{
      specLabel: 'internal raw data',
      file: {
        type: CommonDomain.DATA_TYPES_ENUM.RAWDATA,
        reference: false,
        available: true,
        mimeType: UIDomain.IFRAME_CONTENT_SUPPORTED_MIME_TYPES[0],
      },
      quotaInfo: { downloadDisabled: true },
      accessToken: 'testToken',
    }],
    expectations: {
      link: {
        previewAllowed: true,
      },
      option: {
        visible: true,
        disabled: true,
        displayQuotaWarnings: true,
      },
    },
  }, {
    label: 'enabled preview when mimeType is one of the MARKDOWN_FILE_SUPPORTED_MIME_TYPES',
    testSpecs: [{
      specLabel: 'internal raw data',
      file: {
        type: CommonDomain.DATA_TYPES_ENUM.RAWDATA,
        reference: false,
        available: true,
        mimeType: UIDomain.MARKDOWN_FILE_SUPPORTED_MIME_TYPES[0],
      },
      quotaInfo: { downloadDisabled: true },
      accessToken: 'testToken',
    }],
    expectations: {
      link: {
        previewAllowed: true,
      },
      option: {
        visible: true,
        disabled: true,
        displayQuotaWarnings: true,
      },
    },
  }]

  testCases.forEach(({ label, testSpecs, expectations }) => it(`should render ${label}`, () => {
    // play each spec and check expectations
    testSpecs.forEach(({
      specLabel, file, quotaInfo, accessToken,
    }) => {
      const spyOnSelectInnerLink = {}
      const props = {
        section: UIDomain.DESCRIPTION_BROWSING_SECTIONS_ENUM.INFORMATION,
        index: 1,
        file: {
          label: 'aFile',
          available: false,
          uri: 'http://idk.com/aFile.any',
          type: CommonDomain.DATA_TYPES_ENUM.OTHER,
          reference: true,
          ...file, // test specifics
        },
        onSelectInnerLink: (section, index) => {
          spyOnSelectInnerLink.section = section
          spyOnSelectInnerLink.index = index
        },
        accessToken,
        quotaInfo: {
          currentQuota: 0,
          maxQuota: 1000,
          quotaState: QUOTA_INFO_STATE_ENUM.IDLE,
          currentRate: 0,
          rateLimit: 50,
          rateState: QUOTA_INFO_STATE_ENUM.IDLE,
          downloadDisabled: false,
          inUserApp: true,
          ...quotaInfo, // test specifics
        },
      }
      const enzymeWrapper = shallow(<FileLinkComponent {...props} />, { context })
      // 1 - Check link
      const link = enzymeWrapper.find(PageLinkCellComponent)
      testSuiteHelpers.assertWrapperProperties(link, {
        text: props.file.label,
        tooltip: expectations.link.previewAllowed ? 'module.description.common.file.preview.tooltip' : null,
        LinkIconConstructor: FileIcon,
        disabled: !expectations.link.previewAllowed,
        onClick: enzymeWrapper.instance().onFileLinkClicked,
      }, `${specLabel} | Link properties should be correctly set and it should be enabled as file is available`)
      // 2 - when enabled, check callback
      if (!expectations.link.disabled) {
        assert.deepEqual(spyOnSelectInnerLink, {}, `${specLabel} | Link properties should be correctly set and it should be enabled as file is available`)
        link.props().onClick()
        assert.deepEqual(spyOnSelectInnerLink, {
          section: props.section,
          index: props.index,
        }, `${specLabel} | Link properties should be correctly set and it should be enabled as file is available`)
        // 2 - Check option
        if (expectations.option.visible) {
          testSuiteHelpers.assertCompWithProps(enzymeWrapper, DownloadButton, {
            ButtonConstructor: PageElementOption,
            disabled: expectations.option.disabled,
            tooltip: 'module.description.common.download.file.tooltip',
            downloadURL: props.file.uri,
            IconConstructor: DownloadIconComponent,
            constrainedByQuota: expectations.option.displayQuotaWarnings,
            quotaInfo: props.quotaInfo,
          }, `${specLabel} || option should match expected state`)
        } else {
          testSuiteHelpers.assertNotComp(enzymeWrapper, DownloadButton, `${specLabel} | option should be hidden`)
        }
      }
    })
  }))
})
