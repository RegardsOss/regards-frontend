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
import { ShowableAtRender } from '@regardsoss/display-control'
import { DownloadButton } from '@regardsoss/components'
import DownloadOrderFilesAsZipComponent from '../../../../src/components/orders/options/DownloadOrderFilesAsZipComponent'
import styles from '../../../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test DownloadOrderFilesAsZipComponent
* @author Raphaël Mechali
*/
describe('[Order Common] Testing DownloadOrderFilesAsZipComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DownloadOrderFilesAsZipComponent)
  })
  it('should render correctly a no data', () => {
    const props = {
      isWaitingUser: false,
      availableFilesCount: 0,
      canDownload: false,
      downloadZipURL: 'http://www.trump.did.it',
    }
    const enzymeWrapper = shallow(<DownloadOrderFilesAsZipComponent {...props} />, { context })
    const downloadWrapper = enzymeWrapper.find(DownloadButton)
    assert.isTrue(downloadWrapper.props().disabled, 'Download should be disabled')
    assert.equal(downloadWrapper.props().downloadURL, props.downloadZipURL, 'Download URL should be correctly reported')
    assert.isDefined(downloadWrapper.props().title, 'There should be a tooltip')
    assert.isUndefined(downloadWrapper.props().style.animation, 'There should be no user inciting animation to download as order is not waiting user')
    const showableWrapper = enzymeWrapper.find(ShowableAtRender)
    assert.lengthOf(showableWrapper, 1, 'There should be a showable controller for files count')
    assert.isFalse(showableWrapper.props().show, 'Files count should be hidden as there is none')
  })
  it('should render correctly with data, in non waiting state', () => {
    const props = {
      isWaitingUser: false,
      availableFilesCount: 15,
      canDownload: true,
      downloadZipURL: 'http://www.trump.did.it',
    }
    const enzymeWrapper = shallow(<DownloadOrderFilesAsZipComponent {...props} />, { context })
    const downloadWrapper = enzymeWrapper.find(DownloadButton)
    assert.isFalse(downloadWrapper.props().disabled, 'Download should be enabled')
    assert.equal(downloadWrapper.props().downloadURL, props.downloadZipURL, 'Download URL should be correctly reported')
    assert.isDefined(downloadWrapper.props().title, 'There should be a tooltip')
    assert.isUndefined(downloadWrapper.props().style.animation, 'There should be no user inciting animation to download as order is not waiting user')
    const showableWrapper = enzymeWrapper.find(ShowableAtRender)
    assert.lengthOf(showableWrapper, 1, 'There should be a showable controller for files count')
    assert.isTrue(showableWrapper.props().show, 'Files count should be shown as it is available')
    assert.include(showableWrapper.debug(), String(props.availableFilesCount), 'File count should be visible as it is defined and lower than max count')
  })
  it('should render correctly with data in waiting state', () => {
    const props = {
      isWaitingUser: true,
      availableFilesCount: 15,
      canDownload: true,
      downloadZipURL: 'http://www.trump.did.it',
    }
    const enzymeWrapper = shallow(<DownloadOrderFilesAsZipComponent {...props} />, { context })
    const downloadWrapper = enzymeWrapper.find(DownloadButton)
    assert.isDefined(downloadWrapper.props().style.animation, 'There should be user inciting animation to download as order is waiting user')
  })
  it('should render correctly large file number', () => {
    const props = {
      isWaitingUser: true,
      // more than max:
      availableFilesCount: DownloadOrderFilesAsZipComponent.MAX_FILES_COUNT + 1,
      canDownload: true,
      downloadZipURL: 'http://www.trump.did.it',
    }
    const enzymeWrapper = shallow(<DownloadOrderFilesAsZipComponent {...props} />, { context })
    const showableWrapper = enzymeWrapper.find(ShowableAtRender)
    assert.lengthOf(showableWrapper, 1, 'There should be a showable controller for files count')
    assert.isTrue(showableWrapper.props().show, 'Files count should be shown as it is available')
    assert.notInclude(showableWrapper.debug(), String(props.availableFilesCount), 'File count should not be visible as it exceeds max file count')
    assert.include(showableWrapper.debug(), DownloadOrderFilesAsZipComponent.MAX_FILES_TEXT, 'Max files count should be shown instead')
  })
})
