/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { CommonDomain, UIDomain } from '@regardsoss/domain'
import { QUOTA_INFO_STATE_ENUM } from '@regardsoss/entities-common'
import { FileCellComponent } from '../../../../../../src/components/user/tree/cells/links/FileCellComponent'
import TreeLinkComponent from '../../../../../../src/components/user/tree/cells/links/TreeLinkComponent'
import styles from '../../../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test FileCellComponent
 * @author Raphaël Mechali
 */
describe('[Description] Testing FileCellComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(FileCellComponent)
  })

  const testCases = [{
    label: 'disabled when file preview is not available',
    // all files types, not available, as reference or internally stored, with / without token, quota consumed or not
    testSpecs: [
      ...CommonDomain.DATA_TYPES
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
    ],
    isPreviewAllowed: false,
  }, {
    label: 'disabled when file preview is not available and file is internally stored raw data and user is not logged',
    testSpecs: [{
      specLabel: 'internal raw data',
      file: { type: CommonDomain.DATA_TYPES_ENUM.RAWDATA, reference: false, available: true },
      quotaInfo: { downloadDisabled: false },
      accessToken: null,
    }],
    isPreviewAllowed: false,
  }, {
    label: 'enabled when file is preview is available and not internal raw data',
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
                file: {
                  type, reference, available: true, mimeType: UIDomain.IFRAME_CONTENT_SUPPORTED_MIME_TYPES[1],
                },
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
          file: {
            type: CommonDomain.DATA_TYPES_ENUM.RAWDATA, reference: true, available: true, mimeType: UIDomain.IFRAME_CONTENT_SUPPORTED_MIME_TYPES[1],
          },
          quotaInfo: { downloadDisabled },
          accessToken,
        })),
      ], []),
    ],
    isPreviewAllowed: true,
  }, {
    label: 'enabled when file preview is available, internal raw data, user logged and quota is not consumed',
    testSpecs: [{
      specLabel: 'internal raw data',
      file: {
        type: CommonDomain.DATA_TYPES_ENUM.RAWDATA, reference: false, available: true, mimeType: UIDomain.IFRAME_CONTENT_SUPPORTED_MIME_TYPES[1],
      },
      quotaInfo: { downloadDisabled: false },
      accessToken: 'testToken',
    }],
    isPreviewAllowed: true,
  }, {
    label: 'disabled when file preview is not available, internal raw data, user logged and quota is consumed',
    testSpecs: [{
      specLabel: 'internal raw data',
      file: { type: CommonDomain.DATA_TYPES_ENUM.RAWDATA, reference: false, available: true },
      quotaInfo: { downloadDisabled: true },
      accessToken: 'testToken',
    }],
    isPreviewAllowed: false,
  }]

  testCases.forEach(({ label, testSpecs, isPreviewAllowed }) => it(`should render ${label}`, () => {
    // play each spec and check expectations
    testSpecs.forEach(({
      specLabel, file, quotaInfo, accessToken,
    }) => {
      const spyOnSelectInnerLink = {}
      const props = {
        type: UIDomain.DESCRIPTION_BROWSING_SECTIONS_ENUM.INFORMATION,
        index: 1,
        file: {
          label: 'aFile',
          available: false,
          uri: 'http://idk.com/aFile.any',
          type: CommonDomain.DATA_TYPES_ENUM.OTHER,
          reference: true,
          ...file, // test specifics
        },
        selected: false,
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
      const enzymeWrapper = shallow(<FileCellComponent {...props} />, { context })
      const linkWrapper = testSuiteHelpers.assertCompWithProps(enzymeWrapper, TreeLinkComponent, {
        text: props.file.label,
        tooltip: isPreviewAllowed ? 'module.description.common.file.preview.tooltip' : null,
        selected: false,
        section: false,
        onClick: enzymeWrapper.instance().onLinkClicked,
        disabled: !isPreviewAllowed,
      }, `${specLabel} | link should define the expected properties`)
      if (!isPreviewAllowed) {
        // test callback when enabled
        assert.deepEqual(spyOnSelectInnerLink, {}, `${specLabel} | On select callback should not have been invoked yet`)
        linkWrapper.props().onClick()
        assert.deepEqual(spyOnSelectInnerLink, {
          section: props.type,
          index: props.index,
        }, `${specLabel} | On select callback should have been invoked with right parameters`)
        // test selected when enabled
        enzymeWrapper.setProps({ ...props, selected: true })
        testSuiteHelpers.assertCompWithProps(enzymeWrapper, TreeLinkComponent, { selected: true }, `${specLabel} | Link should be selected`)
      }
    })
  }))
})
