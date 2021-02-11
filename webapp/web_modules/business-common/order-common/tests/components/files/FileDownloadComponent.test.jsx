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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { DownloadButton } from '@regardsoss/components'
import { DownloadIconComponent, QUOTA_INFO_STATE_ENUM } from '@regardsoss/entities-common'
import FileDownloadComponent from '../../../src/components/files/FileDownloadComponent'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test FileDownloadComponent
* @author Raphaël Mechali
*/
describe('[Order Common] Testing FileDownloadComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(FileDownloadComponent)
  })

  const testCases = [{
    label: 'downloadable file, constrained by quota',
    props: {
      canDownload: true,
      downloadURL: 'https://my-regards-instance/archival1/raw-file-1.csv',
      quotaInfo: {
        currentQuota: 950,
        maxQuota: 1000,
        quotaState: QUOTA_INFO_STATE_ENUM.WARNING,
        currentRate: 10,
        rateLimit: -1,
        rateState: QUOTA_INFO_STATE_ENUM.UNLIMITED,
        downloadDisabled: false,
        inUserApp: true,
        quotaWarningCount: 100,
      },
      constrainedByQuota: true,
    },
    expected: {
      constrainedByQuota: true,
      disabled: false,
    },
  }, {
    label: 'downloadable file, not constrained by quota',
    props: {
      canDownload: true,
      downloadURL: 'https://anywhere.com/my-ref.png',
      quotaInfo: {
        currentQuota: 950,
        maxQuota: 1000,
        quotaState: QUOTA_INFO_STATE_ENUM.WARNING,
        currentRate: 10,
        rateLimit: 10,
        rateState: QUOTA_INFO_STATE_ENUM.CONSUMED,
        downloadDisabled: true,
        inUserApp: true,
        quotaWarningCount: 100,
      },
      constrainedByQuota: false,
    },
    expected: {
      constrainedByQuota: false,
      disabled: false,
    },
  }, {
    label: 'non downloadable file, contained by quota',
    props: {
      canDownload: false,
      downloadURL: 'https://my-regards-instance/archival1/raw-file-2.csv',
      quotaInfo: {
        currentQuota: 950,
        maxQuota: 1000,
        quotaState: QUOTA_INFO_STATE_ENUM.WARNING,
        currentRate: 10,
        rateLimit: 10,
        rateState: QUOTA_INFO_STATE_ENUM.CONSUMED,
        downloadDisabled: true,
        inUserApp: true,
        quotaWarningCount: 100,
      },
      constrainedByQuota: true,
    },
    expected: {
      constrainedByQuota: true,
      disabled: true,
    },
  }, {
    label: 'non downloadable file, not contained by quota',
    props: {
      canDownload: false,
      downloadURL: 'https://my-regards-instance/archival1/raw-file-2.csv',
      quotaInfo: {
        currentQuota: 950,
        maxQuota: -1,
        quotaState: QUOTA_INFO_STATE_ENUM.UNLIMITED,
        currentRate: 0,
        rateLimit: 1000,
        rateState: QUOTA_INFO_STATE_ENUM.IDLE,
        downloadDisabled: false,
        inUserApp: true,
        quotaWarningCount: 100,
      },
      constrainedByQuota: false,
    },
    expected: {
      constrainedByQuota: false,
      disabled: true,
    },
  }]

  testCases.forEach(({ label, props, expected }) => it(`should render correctly a ${label}`, () => {
    const enzymeWrapper = shallow(<FileDownloadComponent {...props} />, { context })
    const button = testSuiteHelpers.assertCompWithProps(enzymeWrapper, DownloadButton, {
      downloadURL: props.downloadURL,
      disabled: expected.disabled,
      tooltip: 'files.list.cell.options.download.tooltip',
    })
    testSuiteHelpers.assertCompWithProps(button, DownloadIconComponent, {
      constrainedByQuota: expected.constrainedByQuota,
      quotaInfo: props.quotaInfo,
    })
  }))
})
