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
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { CommonDomain } from '@regardsoss/domain'
import { DownloadButton } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { QUOTA_INFO_STATE_ENUM } from '@regardsoss/entities-common'
import { DownloadCellComponent, DownloadInnerButton } from '../../../../../../src/components/user/tree/cells/options/DownloadCellComponent'
import styles from '../../../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test DownloadCellComponent
 * @author Raphaël Mechali
 */
describe('[Description] Testing DownloadCellComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DownloadCellComponent)
  })

  const testCases = [{
    label: 'hidden when file is not available',
    testSpecs: CommonDomain.DATA_TYPES
      .reduce((acc, type) => [
        ...acc,
        ...[true, false].reduce((acc2, reference) => [
          ...acc2,
          ...[null, 'testToken'].reduce((acc3, accessToken) => [
            ...acc3,
            ...[true, false].map((downloadDisabled) => ({
              specLabel: `type: ${type} / reference: ${reference} / with token: ${!!accessToken} / quota consumed: ${downloadDisabled}`,
              file: { type, reference, available: false },
              quotaInfo: { downloadDisabled },
              accessToken,
            })),
          ], []),
        ], []),
      ], []),
    expectations: {
      visible: false,
    },
  }, {
    label: 'hidden when file is internally stored raw data and user is not logged',
    testSpecs: [{
      specLabel: 'internal raw data',
      file: { type: CommonDomain.DATA_TYPES_ENUM.RAWDATA, reference: false, available: true },
      quotaInfo: { downloadDisabled: false },
      accessToken: null,
    }],
    expectations: {
      visible: false,
    },
  }, {
    label: 'visible and enabled when file is available and not internal raw data',
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
      visible: true,
      disabled: false,
      constrainedByQuota: false,
    },
  }, {
    label: 'visible enabled when file is available, internal raw data, user logged and quota is not consumed',
    testSpecs: [{
      specLabel: 'internal raw data',
      file: { type: CommonDomain.DATA_TYPES_ENUM.RAWDATA, reference: false, available: true },
      quotaInfo: { downloadDisabled: false },
      accessToken: 'testToken',
    }],
    expectations: {
      visible: true,
      disabled: false,
      constrainedByQuota: true,
    },
  }, {
    label: 'visible and disabled when file is available, internal raw data, user logged and quota is consumed',
    testSpecs: [{
      specLabel: 'internal raw data',
      file: { type: CommonDomain.DATA_TYPES_ENUM.RAWDATA, reference: false, available: true },
      quotaInfo: { downloadDisabled: true },
      accessToken: 'testToken',
    }],
    expectations: {
      visible: true,
      disabled: true,
      constrainedByQuota: true,
    },
  }]

  testCases.forEach(({ label, testSpecs, expectations }) => it(`should render ${label}`, () => {
    // play each spec and check expectations
    testSpecs.forEach(({
      specLabel, file, quotaInfo, accessToken,
    }) => {
      const props = {
        file: {
          label: 'aFile',
          available: false,
          uri: 'http://idk.com/aFile.any',
          type: CommonDomain.DATA_TYPES_ENUM.OTHER,
          reference: true,
          ...file, // test specifics
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
      const enzymeWrapper = shallow(<DownloadCellComponent {...props} />, { context })
      if (expectations.visible) {
        testSuiteHelpers.assertCompWithProps(enzymeWrapper, DownloadButton, {
          ButtonConstructor: DownloadInnerButton,
          disabled: expectations.disabled,
          downloadName: props.file.label,
          downloadURL: props.file.uri,
          tooltip: 'module.description.common.download.file.tooltip',
          constrainedByQuota: expectations.constrainedByQuota,
          quotaInfo: props.quotaInfo,
        }, `${specLabel} | Download button have expected properties`)
      } else {
        testSuiteHelpers.assertNotComp(enzymeWrapper, DownloadButton, `${specLabel} | Download button should be hidden`)
      }
    })
  }))
})
