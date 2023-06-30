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
import flatMap from 'lodash/flatMap'
import reduce from 'lodash/reduce'
import MenuItem from 'material-ui/MenuItem'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { CommonDomain } from '@regardsoss/domain'
import { DownloadButton, DropDownButton } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { QUOTA_INFO_STATE_ENUM } from '@regardsoss/entities-common'
import { DownloadEntityFileComponent, IconButtonConstructorWrapper } from '../../../../../../../src/components/user/tabs/results/common/options/DownloadEntityFileComponent'
import styles from '../../../../../../../src/styles'
import { dataEntity, datasetEntity } from '../../../../../../dumps/entities.dump'

const context = buildTestContext(styles)

/**
 * Test DownloadEntityFileComponent
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing DownloadEntityFileComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DownloadEntityFileComponent)
  })

  function expectNoURL() {
    return null
  }

  function downloadURLExpectationBuilder(expectedFileURI) {
    return function (isReferenceFile, accessToken) {
      if (isReferenceFile) {
        return expectedFileURI
      }
      if (accessToken) {
        return `${expectedFileURI}?token=${accessToken}`
      }
      return `${expectedFileURI}?scope=testProject` // constant project name,
    }
  }

  const testCases = [{
    label: 'single file disabled button when no file is available',
    testSpecs: flatMap([true, false], (downloadDisabled) => flatMap([null, 'testToken'], (accessToken) => ({
      specLabel: 'no file',
      isRef: false,
      files: {},
      quotaInfo: { downloadDisabled },
      accessToken,
    }))),
    expectations: {
      singleButton: {
        visible: true,
        disabled: true,
        constrainedByQuota: false,
        tooltip: 'no.download.tooltip',
        downloadName: 'download',
        expectDownloadURL: expectNoURL,
      },
      multiButton: {
        visible: false,
      },
    },
  }, {
    label: 'single file disabled button for any file list that should not be displayed in download option (by file type)',
    testSpecs: flatMap([true, false], (downloadDisabled) => flatMap([null, 'testToken'], (accessToken) => ({
      specLabel: `download disabled: ${downloadDisabled} / accessToken: ${!!accessToken}`,
      isRef: true,
      files: CommonDomain.DATA_TYPES.reduce((acc, t) => DownloadEntityFileComponent.DOWNLOADABLE_FILES_TYPES.includes(t) ? acc : ({ // append only non dsplayed type
        ...acc,
        [t]: [null, null].map(() => ({ reference: true })), // ref => always downloadable (see later tests)
      }), {}),
      quotaInfo: { downloadDisabled },
      accessToken,
    }))),
    expectations: {
      singleButton: {
        visible: true,
        disabled: true,
        constrainedByQuota: false, // all should be filtered, including internal raw data
        tooltip: 'no.download.tooltip',
        downloadName: 'download',
        expectDownloadURL: expectNoURL,
      },
      multiButton: {
        visible: false,
      },
    },
  }, {
    label: 'single file disabled button for any offline file list (empty list after filtering)',
    testSpecs: flatMap([true, false], (downloadDisabled) => flatMap([null, 'testToken'], (accessToken) => ({
      specLabel: `download disabled: ${downloadDisabled} / accessToken: ${!!accessToken}`,
      isRef: false,
      files: DownloadEntityFileComponent.DOWNLOADABLE_FILES_TYPES.reduce((acc, t) => ({
        ...acc,
        [t]: [null, null].map(() => ({ reference: false, online: false })),
      }), {}),
      quotaInfo: { downloadDisabled },
      accessToken,
    }))),
    expectations: {
      singleButton: {
        visible: true,
        disabled: true,
        constrainedByQuota: false,
        tooltip: 'no.download.tooltip',
        downloadName: 'download',
        expectDownloadURL: expectNoURL,
      },
      multiButton: {
        visible: false,
      },
    },
  }, {
    label: 'single file disabled button for any online internal raw data file list without authenticated user (empty list after filtering)',
    testSpecs: flatMap([true, false], (downloadDisabled) => ({
      specLabel: `download disabled: ${downloadDisabled}`,
      isRef: false,
      files: {
        [CommonDomain.DATA_TYPES_ENUM.RAWDATA]: [null, null].map(() => ({ reference: false, online: true })),
      },
      quotaInfo: { downloadDisabled },
      accessToken: null,
    })),
    expectations: {
      singleButton: {
        visible: true,
        disabled: true,
        constrainedByQuota: false, // all should be filtered, including internal raw data
        tooltip: 'no.download.tooltip',
        downloadName: 'download',
        expectDownloadURL: expectNoURL,
      },
      multiButton: {
        visible: false,
      },
    },
  }, {
    label: 'single file enabled button for a single filtered file (non internal raw data)',
    testSpecs: flatMap(DownloadEntityFileComponent.DOWNLOADABLE_FILES_TYPES,
      (t) => flatMap(t === CommonDomain.DATA_TYPES_ENUM.RAWDATA ? [true] : [true, false], // only reference for RAW_DATA
        (reference) => flatMap([true, false],
          (downloadDisabled) => flatMap([null, 'testToken'],
            (accessToken) => ({
              specLabel: `type: ${t} / reference: ${reference} / download disabled: ${downloadDisabled} / accessToken: ${!!accessToken}`,
              isRef: reference,
              files: {
                [t]: [
                  { // should be downloadable
                    filename: 'testFile', uri: 'http://test-domain.tst/testFile.jpp', reference, online: true,
                  },
                  { // should not be downloadable
                    filename: 'testFile2', uri: 'http://test-domain.tst/testFile2.jpp', reference: false, online: false,
                  },
                ],
              },
              quotaInfo: { downloadDisabled },
              accessToken,
            }))))),
    expectations: {
      singleButton: {
        visible: true,
        disabled: false,
        constrainedByQuota: false, // non internal raw data only
        tooltip: 'download.tooltip',
        downloadName: 'testFile',
        expectDownloadURL: downloadURLExpectationBuilder('http://test-domain.tst/testFile.jpp'),
      },
      multiButton: {
        visible: false,
      },
    },
  }, {
    label: 'single enabled button for a single internal raw data filtered list (with token and quota download enabled)',
    testSpecs: [[
      { filename: 'internalRawDataOnline', online: true, uri: 'http://online-server.tst/online-file.jpp' },
    ], [
      { filename: 'internalRawDataOffline', online: false, uri: 'http://offline-server.tst/online-file.jpp' },
      { filename: 'internalRawDataOnline', online: true, uri: 'http://online-server.tst/online-file.jpp' },
      { filename: 'internalRawDataOffline2', online: false, uri: 'http://offline-server.tst/online-file.jpp' },
    ]].map((rawInternalFiles) => ({
      specLabel: `With ${rawInternalFiles.length} file(s)`,
      files: {
        // other types, to be filtered
        ...DownloadEntityFileComponent.DOWNLOADABLE_FILES_TYPES.reduce((acc, t) => ({
          ...acc,
          [t]: [{ reference: false, online: false }],
        }), {}),
        // raw data list (only one internal and available)
        [CommonDomain.DATA_TYPES_ENUM.RAWDATA]: rawInternalFiles,
      },
      quotaInfo: { downloadDisabled: false },
      accessToken: 'testToken',
    })),
    expectations: {
      singleButton: {
        visible: true,
        disabled: false,
        constrainedByQuota: true, // single internal raw data
        tooltip: 'download.tooltip',
        downloadName: 'internalRawDataOnline',
        expectDownloadURL: () => 'http://online-server.tst/online-file.jpp?token=testToken', // constant as test file is never ref and requires a token
      },
      multiButton: {
        visible: false,
      },
    },
  }, {
    label: 'enabled multi button without quota icon when filtering all internal raw data (no token)',
    testSpecs: [{
      specLabel: 'no raw internal file (no token)',
      files: DownloadEntityFileComponent.DOWNLOADABLE_FILES_TYPES.reduce((acc, t) => ({
        ...acc,
        [t]: [
          {
            filename: `${t}-f1.jpp`, uri: `http://anywhere.com/${t}-f1.jpp`, reference: true, online: true,
          }, // always available
          {
            filename: `${t}-f2.jpp`, uri: `http://anywhere.com/${t}-f2.jpp`, reference: false, online: true,
          }, // available if not RAW DATA (as access token is not provided)
          {
            filename: `${t}-f3.jpp`, uri: `http://anywhere.com/${t}-f3.jpp`, reference: false, online: false,
          }, // never available
        ],
      }), {}),
      quotaInfo: { downloadDisabled: false },
      accessToken: null,
    }],
    expectations: {
      singleButton: {
        visible: false,
      },
      multiButton: {
        visible: true,
        constrainedByQuota: false,
        disabled: false,
        expectedFileOptions: DownloadEntityFileComponent.DOWNLOADABLE_FILES_TYPES.reduce(
          (acc, t) => t === CommonDomain.DATA_TYPES_ENUM.RAWDATA
            ? [...acc, { // only reference file should be kept for raw data
              tooltip: 'download.tooltip', disabled: false, filename: `${t}-f1.jpp`, downloadURL: `http://anywhere.com/${t}-f1.jpp`,
            }] : [
              ...acc, {
                tooltip: 'download.tooltip', disabled: false, filename: `${t}-f1.jpp`, downloadURL: `http://anywhere.com/${t}-f1.jpp`,
              }, {
                tooltip: 'download.tooltip', disabled: false, filename: `${t}-f2.jpp`, downloadURL: `http://anywhere.com/${t}-f2.jpp?scope=testProject`,
              },
            ], []),
      },
    },
  }, {
    label: 'enabled multi button without quota icon when rendering a mix of internal raw data (enabled by quota) and other files',
    testSpecs: [{
      specLabel: 'any file',
      files: DownloadEntityFileComponent.DOWNLOADABLE_FILES_TYPES.reduce((acc, t) => ({
        ...acc,
        [t]: [
          { // always available
            filename: `${t}-f1.jpp`, uri: `http://anywhere.com/${t}-f1.jpp`, reference: true, online: true,
          },
          { // always available (access token provided)
            filename: `${t}-f2.jpp`, uri: `http://anywhere.com/${t}-f2.jpp`, reference: false, online: true,
          },
          { // never available
            filename: `${t}-f3.jpp`, uri: `http://anywhere.com/${t}-f3.jpp`, reference: false, online: false,
          },
        ],
      }), {}),
      quotaInfo: { downloadDisabled: false },
      accessToken: 'testToken',
    }],
    expectations: {
      singleButton: {
        visible: false,
      },
      multiButton: {
        visible: true,
        constrainedByQuota: false,
        disabled: false,
        expectedFileOptions: DownloadEntityFileComponent.DOWNLOADABLE_FILES_TYPES.reduce(
          (acc, t) => [
            ...acc, {
              tooltip: 'download.tooltip', disabled: false, filename: `${t}-f1.jpp`, downloadURL: `http://anywhere.com/${t}-f1.jpp`,
            }, {
              tooltip: 'download.tooltip', disabled: false, filename: `${t}-f2.jpp`, downloadURL: `http://anywhere.com/${t}-f2.jpp?token=testToken`,
            },
          ], []),
      },
    },
  }, {
    label: 'enabled multi button without quota icon when rendering a mix of internal raw data (disabled by quota) and other files',
    testSpecs: [{
      specLabel: 'any file (quota disabled)',
      files: DownloadEntityFileComponent.DOWNLOADABLE_FILES_TYPES.reduce((acc, t) => ({
        ...acc,
        [t]: [
          { // always available
            filename: `${t}-f1.jpp`, uri: `http://anywhere.com/${t}-f1.jpp`, reference: true, online: true,
          },
          { // always available (access token provided), but disabled for raw data (by quota)
            filename: `${t}-f2.jpp`, uri: `http://anywhere.com/${t}-f2.jpp`, reference: false, online: true,
          },
          { // never available
            filename: `${t}-f3.jpp`, uri: `http://anywhere.com/${t}-f3.jpp`, reference: false, online: false,
          },
        ],
      }), {}),
      quotaInfo: { downloadDisabled: true },
      accessToken: 'testToken',
    }],
    expectations: {
      singleButton: {
        visible: false,
      },
      multiButton: {
        visible: true,
        constrainedByQuota: false,
        disabled: false,
        expectedFileOptions: DownloadEntityFileComponent.DOWNLOADABLE_FILES_TYPES.reduce(
          (acc, t) => [
            ...acc, {
              tooltip: 'download.tooltip', disabled: false, filename: `${t}-f1.jpp`, downloadURL: `http://anywhere.com/${t}-f1.jpp`,
            }, { // internal file: disabled for raw data (due to quota)
              tooltip: t === CommonDomain.DATA_TYPES_ENUM.RAWDATA ? 'download.quota.consumed.tooltip' : 'download.tooltip',
              disabled: t === CommonDomain.DATA_TYPES_ENUM.RAWDATA,
              filename: `${t}-f2.jpp`,
              downloadURL: `http://anywhere.com/${t}-f2.jpp?token=testToken`,
            },
          ], []),
      },
    },
  }, {
    label: 'enabled multi button with quota icon when rendering only of internal raw data with enabled quota',
    testSpecs: [{
      specLabel: 'internal raw data files (quota enabled)',
      files: {
        [CommonDomain.DATA_TYPES_ENUM.RAWDATA]: [
          { // always available
            filename: 'f1.jpp', uri: 'http://anywhere.com/f1.jpp', reference: false, online: true,
          },
          { // always available
            filename: 'f2.jpp', uri: 'http://anywhere.com/f2.jpp', reference: false, online: true,
          },
          { // never available
            filename: 'f3.jpp', uri: 'http://anywhere.com/f3.jpp', reference: false, online: false,
          },
        ],
      },
      quotaInfo: { downloadDisabled: false },
      accessToken: 'testToken',
    }],
    expectations: {
      singleButton: {
        visible: false,
      },
      multiButton: {
        visible: true,
        constrainedByQuota: true,
        disabled: false,
        expectedFileOptions: [{
          tooltip: 'download.tooltip', disabled: false, filename: 'f1.jpp', downloadURL: 'http://anywhere.com/f1.jpp?token=testToken',
        }, {
          tooltip: 'download.tooltip', disabled: false, filename: 'f2.jpp', downloadURL: 'http://anywhere.com/f2.jpp?token=testToken',
        }],
      },
    },
  }, {
    label: 'single file disabled button when rendering only of internal raw data with disabled quota',
    testSpecs: [{
      specLabel: 'internal raw data files (quota disabled)',
      files: {
        [CommonDomain.DATA_TYPES_ENUM.RAWDATA]: [
          { // always available
            filename: 'f1.jpp', uri: 'http://anywhere.com/f1.jpp', reference: false, online: true,
          },
          { // always available
            filename: 'f2.jpp', uri: 'http://anywhere.com/f2.jpp', reference: false, online: true,
          },
          { // never available
            filename: 'f3.jpp', uri: 'http://anywhere.com/f3.jpp', reference: false, online: false,
          },
        ],
      },
      quotaInfo: { downloadDisabled: true },
      accessToken: 'testToken',
    }],
    expectations: {
      singleButton: {
        visible: true,
        disabled: true,
        constrainedByQuota: true,
        tooltip: 'download.quota.consumed.tooltip',
        downloadName: 'f1.jpp', // first file selected in that case
        expectDownloadURL: () => 'http://anywhere.com/f1.jpp?token=testToken',
      },
      multiButton: {
        visible: false,
      },
    },
  }, {
    label: 'none when rendering for a dataset entity',
    testSpecs: [{
      specLabel: 'any files',
      files: DownloadEntityFileComponent.DOWNLOADABLE_FILES_TYPES.reduce((acc, t) => ({
        ...acc,
        [t]: [
          { // always available
            filename: `${t}-f1.jpp`, uri: `http://anywhere.com/${t}-f1.jpp`, reference: true, online: true,
          },
          { // always available (access token provided), but disabled for raw data (by quota)
            filename: `${t}-f2.jpp`, uri: `http://anywhere.com/${t}-f2.jpp`, reference: false, online: true,
          },
          { // never available
            filename: `${t}-f3.jpp`, uri: `http://anywhere.com/${t}-f3.jpp`, reference: false, online: false,
          },
        ],
      }), {}),
      quotaInfo: { downloadDisabled: true },
      accessToken: 'testToken',
      baseEntity: datasetEntity, // replace test default
    }],
    expectations: {
      singleButton: {
        visible: false,
      },
      multiButton: {
        visible: false,
      },
    },
  }]

  testCases.forEach(({ label, testSpecs, expectations }) => it(`should render as ${label}`, () => {
    testSpecs.forEach(({
      specLabel, isRef, files, quotaInfo, accessToken, baseEntity = dataEntity,
    }) => {
      const props = {
        entity: {
          content: {
            ...baseEntity.content,
            files: reduce(files, (acc, value, key) => ({
              ...acc,
              [key]: value.map((fileProps, i) => ({
                dataType: key,
                reference: false,
                uri: `http://one.uri.somewhere/${key}:${i}:a-file.jpp`,
                mimeType: 'application/bad-comments',
                online: false,
                filename: `${key}:${i}:a-file`,
                types: [],
                ...fileProps, // test specifics
              })),
            }), {}),
          },
        },
        accessToken,
        projectName: 'testProject',
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

      const enzymeWrapper = shallow(<DownloadEntityFileComponent {...props} />, { context })
      if (expectations.singleButton.visible) {
        testSuiteHelpers.assertCompWithProps(enzymeWrapper, DownloadButton, {
          ButtonConstructor: IconButtonConstructorWrapper,
          ButtonIcon: null,
          tooltip: expectations.singleButton.tooltip,
          disabled: expectations.singleButton.disabled,
          downloadName: expectations.singleButton.downloadName,
          downloadURL: expectations.singleButton.expectDownloadURL(isRef, accessToken),
          constrainedByQuota: expectations.singleButton.constrainedByQuota,
          quotaInfo: props.quotaInfo,
        }, `${specLabel} | single button should be displayed with right properties`)
      } else if (expectations.multiButton.visible) {
        // check root button
        const dropDownWrapper = testSuiteHelpers.assertCompWithProps(enzymeWrapper, DropDownButton, {
          ButtonConstructor: IconButtonConstructorWrapper,
          constrainedByQuota: expectations.multiButton.constrainedByQuota,
          disabled: expectations.multiButton.disabled,
        }, `${specLabel} | multi button should be displayed with right properties`)
        // check each file option
        expectations.multiButton.expectedFileOptions.forEach(({
          tooltip, disabled, filename, downloadURL,
        }) => {
          testSuiteHelpers.assertCompWithProps(dropDownWrapper, DownloadButton, {
            ButtonConstructor: MenuItem,
            ButtonIcon: null,
            tooltip,
            disabled,
            downloadURL,
            downloadName: filename,
            primaryText: filename,
          }, `${specLabel} | file option should be displayed for file ${filename}`)
        })
      } else {
        testSuiteHelpers.assertNotComp(enzymeWrapper, DownloadButton, `${specLabel} | single button should be hidden`)
        testSuiteHelpers.assertNotComp(enzymeWrapper, DropDownButton, `${specLabel} | multi button should be hidden`)
      }
    })
  }))

  it('should render correctly and hide download button when entity is a dataset', () => {
    const props = {
      entity: {
        content: {
          ...datasetEntity.content,
          files: { // add here an available file for download
            [CommonDomain.DATA_TYPES_ENUM.RAWDATA]: [{
              dataType: CommonDomain.DATA_TYPES_ENUM.RAWDATA,
              filename: 'f1.jpp',
              uri: 'http://anywhere.com/f1.jpp',
              mimeType: 'application/jpp-file',
              reference: true,
              online: true,
            }],
          },
        },
      },
      accessToken: 'any',
      projectName: 'testProject',
      quotaInfo: {
        currentQuota: 0,
        maxQuota: 1000,
        quotaState: QUOTA_INFO_STATE_ENUM.IDLE,
        currentRate: 0,
        rateLimit: 50,
        rateState: QUOTA_INFO_STATE_ENUM.IDLE,
        downloadDisabled: false,
        inUserApp: true,
      },
    }

    const enzymeWrapper = shallow(<DownloadEntityFileComponent {...props} />, { context })
    testSuiteHelpers.assertNotComp(enzymeWrapper, DownloadButton, 'single button should be hidden')
    testSuiteHelpers.assertNotComp(enzymeWrapper, DropDownButton, 'multi button should be hidden')
  })
})
