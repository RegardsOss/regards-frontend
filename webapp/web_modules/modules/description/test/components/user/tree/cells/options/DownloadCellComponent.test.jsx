/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { DownloadButton } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import DownloadCellComponent from '../../../../../../src/components/user/tree/cells/options/DownloadCellComponent'
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
  it('should render correctly when file is available for download', () => {
    const props = {
      file: {
        label: 'myFile.pdf',
        available: true,
        uri: 'http://test.com/myFile.pdf',
      },
    }
    const enzymeWrapper = shallow(<DownloadCellComponent {...props} />, { context })
    const downloadButton = enzymeWrapper.find(DownloadButton)
    assert.lengthOf(downloadButton, 1, 'There should be the download button')
    testSuiteHelpers.assertWrapperProperties(downloadButton, {
      downloadName: props.file.label,
      downloadURL: props.file.uri,
      tooltip: 'module.description.common.download.file.tooltip',
    })
  })
  it('should render correctly when file is not available for download', () => {
    const props = {
      file: {
        label: 'myFile2.png',
        available: false,
        uri: 'http://test.com/myFile2.png',
      },
    }
    const enzymeWrapper = shallow(<DownloadCellComponent {...props} />, { context })
    const downloadButton = enzymeWrapper.find(DownloadButton)
    assert.lengthOf(downloadButton, 0, 'There should not be the download button')
  })
})
