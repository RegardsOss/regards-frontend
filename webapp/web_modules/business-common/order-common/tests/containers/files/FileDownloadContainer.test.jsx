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
import { CommonDomain, OrderDomain } from '@regardsoss/domain'
import { OrderClient } from '@regardsoss/client'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { QUOTA_INFO_STATE_ENUM } from '@regardsoss/entities-common'
import FileDownloadComponent from '../../../src/components/files/FileDownloadComponent'
import { FileDownloadContainer } from '../../../src/containers/files/FileDownloadContainer'
import { SOME_FILES } from '../../dumps/Files.dump'
import { SOME_AUTHENTICATION } from '../../dumps/Authentication.dump'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

// create a local file to mutate and test states
const mockFile = {
  content: {
    ...SOME_FILES.content[0].content,
  },
  links: SOME_FILES.content[0].links,
}

const downloadFileActions = new OrderClient.DownloadOrderFileActions()

/**
 * Test FileDownloadContainer
 * @author Raphaël Mechali
 */
describe('[Order Common] Testing FileDownloadContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(FileDownloadContainer)
  })
  it('should render disabled component when not downloadable by status', () => {
    const NON_DOWNLOADABLE_STATES = [
      OrderDomain.ORDER_FILE_STATUS_ENUM.PENDING,
      OrderDomain.ORDER_FILE_STATUS_ENUM.ERROR,
      OrderDomain.ORDER_FILE_STATUS_ENUM.PROCESSING_ERROR,
    ]
    NON_DOWNLOADABLE_STATES.forEach((state) => {
      mockFile.content.state = state
      const props = {
        entity: mockFile,
        quotaInfo: {
          currentQuota: 990,
          maxQuota: -1,
          quotaState: QUOTA_INFO_STATE_ENUM.UNLIMITED,
          currentRate: 50,
          rateLimit: -1,
          rateState: QUOTA_INFO_STATE_ENUM.UNLIMITED,
          downloadDisabled: false,
          inUserApp: true,
          quotaWarningCount: 10,
        },
        authentication: SOME_AUTHENTICATION,
      }
      const enzymeWrapper = shallow(<FileDownloadContainer {...props} />, { context })
      testSuiteHelpers.assertCompWithProps(enzymeWrapper, FileDownloadComponent, {
        canDownload: false,
        quotaInfo: props.quotaInfo,
        downloadURL: downloadFileActions.getFileDownloadLink(mockFile.content.id, props.authentication.result.access_token),
      })
      const component = enzymeWrapper.find(FileDownloadComponent)
      assert.lengthOf(component, 1, 'There should be the component')
      assert.isFalse(component.props().canDownload, 'Download should be disabled')
      const { downloadURL } = component.props()
      assert.equal(
        downloadURL,
        downloadFileActions.getFileDownloadLink(mockFile.content.id, props.authentication.result.access_token),
        'URL should be correctly reported',
      )
      assert.include(downloadURL, props.authentication.result.access_token, 'Token should be set up in URL')
    })
  })
  it('should render disabled component when not downloadable by quota (inner RAW_DATA with blocked quota)', () => {
    const DOWNLOAD_STATE = [
      OrderDomain.ORDER_FILE_STATUS_ENUM.AVAILABLE,
      OrderDomain.ORDER_FILE_STATUS_ENUM.DOWNLOADED,
      OrderDomain.ORDER_FILE_STATUS_ENUM.DOWNLOAD_ERROR,
      OrderDomain.ORDER_FILE_STATUS_ENUM.ONLINE,
    ]
    DOWNLOAD_STATE.forEach((state) => {
      const props = {
        entity: {
          content: {
            ...SOME_FILES.content[0].content,
            state,
            dataType: CommonDomain.DATA_TYPES_ENUM.RAWDATA,
            reference: false,
          },
          links: SOME_FILES.content[0].links,
        },
        quotaInfo: {
          currentQuota: 990,
          maxQuota: 1000,
          quotaState: QUOTA_INFO_STATE_ENUM.WARNING,
          currentRate: 50,
          rateLimit: 50,
          rateState: QUOTA_INFO_STATE_ENUM.CONSUMED,
          downloadDisabled: true,
          inUserApp: true,
          quotaWarningCount: 10,
        },
        authentication: SOME_AUTHENTICATION,
      }
      const enzymeWrapper = shallow(<FileDownloadContainer {...props} />, { context })
      testSuiteHelpers.assertCompWithProps(enzymeWrapper, FileDownloadComponent, {
        canDownload: false,
        quotaInfo: props.quotaInfo,
        downloadURL: downloadFileActions.getFileDownloadLink(mockFile.content.id, props.authentication.result.access_token),
      })
    })
  })
  it('should render enabled component for other file types and reference RAW_DATA, ignoring disabled by quota state', () => {
    const DOWNLOAD_STATE = [
      OrderDomain.ORDER_FILE_STATUS_ENUM.AVAILABLE,
      OrderDomain.ORDER_FILE_STATUS_ENUM.DOWNLOADED,
      OrderDomain.ORDER_FILE_STATUS_ENUM.DOWNLOAD_ERROR,
      OrderDomain.ORDER_FILE_STATUS_ENUM.ONLINE,
    ]
    DOWNLOAD_STATE
      .forEach((state) => CommonDomain.DATA_TYPES
        .forEach((dataType) => (dataType === CommonDomain.DATA_TYPES_ENUM.RAWDATA ? [true] : [true, false])
          .forEach((reference) => {
            const props = {
              entity: {
                content: {
                  ...SOME_FILES.content[0].content,
                  state,
                  dataType,
                  reference,
                },
                links: SOME_FILES.content[0].links,
              },
              quotaInfo: {
                currentQuota: 1001,
                maxQuota: 1000,
                quotaState: QUOTA_INFO_STATE_ENUM.CONSUMED,
                currentRate: 50,
                rateLimit: 50,
                rateState: QUOTA_INFO_STATE_ENUM.CONSUMED,
                downloadDisabled: true,
                inUserApp: true,
                quotaWarningCount: 10,
              },
              authentication: SOME_AUTHENTICATION,
            }
            const enzymeWrapper = shallow(<FileDownloadContainer {...props} />, { context })
            testSuiteHelpers.assertCompWithProps(enzymeWrapper, FileDownloadComponent, {
              canDownload: true,
              quotaInfo: props.quotaInfo,
              downloadURL: downloadFileActions.getFileDownloadLink(mockFile.content.id, props.authentication.result.access_token),
            }, `Download should be enabled for ${dataType} (ref: ${reference})`)
          })))
  })
  it('should render enabled component for inner RAW_DATA when quota and state are OK', () => {
    const DOWNLOAD_STATE = [
      OrderDomain.ORDER_FILE_STATUS_ENUM.AVAILABLE,
      OrderDomain.ORDER_FILE_STATUS_ENUM.DOWNLOADED,
      OrderDomain.ORDER_FILE_STATUS_ENUM.DOWNLOAD_ERROR,
      OrderDomain.ORDER_FILE_STATUS_ENUM.ONLINE,
    ]
    DOWNLOAD_STATE
      .forEach((state) => {
        const props = {
          entity: {
            content: {
              ...SOME_FILES.content[0].content,
              state,
              reference: false,
              dataType: CommonDomain.DATA_TYPES_ENUM.RAWDATA,
            },
            links: SOME_FILES.content[0].links,
          },
          quotaInfo: {
            currentQuota: 950,
            maxQuota: 1000,
            quotaState: QUOTA_INFO_STATE_ENUM.WARNING,
            currentRate: 2,
            rateLimit: 50,
            rateState: QUOTA_INFO_STATE_ENUM.IDLE,
            downloadDisabled: false,
            inUserApp: true,
            quotaWarningCount: 10,
          },
          authentication: SOME_AUTHENTICATION,
        }
        const enzymeWrapper = shallow(<FileDownloadContainer {...props} />, { context })
        testSuiteHelpers.assertCompWithProps(enzymeWrapper, FileDownloadComponent, {
          canDownload: true,
          quotaInfo: props.quotaInfo,
          downloadURL: downloadFileActions.getFileDownloadLink(mockFile.content.id, props.authentication.result.access_token),
        })
      })
  })
})
