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
import { DownloadButton } from '@regardsoss/components'
import DownloadOrderMetaLinkFileComponent from '../../../../src/components/orders/options/DownloadOrderMetaLinkFileComponent'
import styles from '../../../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test DownloadOrderMetaLinkFileComponent
* @author Raphaël Mechali
*/
describe('[Order Common] Testing DownloadOrderMetaLinkFileComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DownloadOrderMetaLinkFileComponent)
  })
  it('should render correctly when not downloadable', () => {
    const props = {
      canDownload: false,
      downloadMetalinkURL: 'http://www.and.melania.with.him',
    }
    const enzymeWrapper = shallow(<DownloadOrderMetaLinkFileComponent {...props} />, { context })
    const downloadWrapper = enzymeWrapper.find(DownloadButton)
    assert.isTrue(downloadWrapper.props().disabled, 'Download should be disabled')
    assert.equal(downloadWrapper.props().downloadURL, props.downloadMetalinkURL, 'Download URL should be correctly reported')
    assert.isDefined(downloadWrapper.props().title, 'There should be a tooltip')
  })
  it('should render correctly when downloadable', () => {
    const props = {
      canDownload: true,
      downloadMetalinkURL: 'http://www.and.melania.with.him',
    }
    const enzymeWrapper = shallow(<DownloadOrderMetaLinkFileComponent {...props} />, { context })
    const downloadWrapper = enzymeWrapper.find(DownloadButton)
    assert.isFalse(downloadWrapper.props().disabled, 'Download should be enabled')
    assert.equal(downloadWrapper.props().downloadURL, props.downloadMetalinkURL, 'Download URL should be correctly reported')
    assert.isDefined(downloadWrapper.props().title, 'There should be a tooltip')
  })
})
