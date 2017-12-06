/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
  it('should render correctly when downloadable', () => {
    const props = {
      canDownload: true,
      downloadURL: 'http://copete',
    }
    const enzymeWrapper = shallow(<FileDownloadComponent {...props} />, { context })
    const downloadButtonWrapper = enzymeWrapper.find(DownloadButton)
    assert.lengthOf(downloadButtonWrapper, 1, 'There should be a download button')
    assert.isFalse(downloadButtonWrapper.props().disabled, 'It should be enabled')
    assert.equal(downloadButtonWrapper.props().downloadURL, props.downloadURL, 'Download URL should be correctly reported')
  })

  it('should render correctly when not downloadable', () => {
    const props = {
      canDownload: false,
      downloadURL: 'http://copete',
    }
    const enzymeWrapper = shallow(<FileDownloadComponent {...props} />, { context })
    const downloadButtonWrapper = enzymeWrapper.find(DownloadButton)
    assert.lengthOf(downloadButtonWrapper, 1, 'There should be a download button')
    assert.isTrue(downloadButtonWrapper.props().disabled, 'It should be disabled')
    assert.equal(downloadButtonWrapper.props().downloadURL, props.downloadURL, 'Download URL should be correctly reported')
  })
})
