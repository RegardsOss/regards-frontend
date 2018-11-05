/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import FilesComponent from '../../../../src/components/user/files/FilesComponent'
import FileSelectorComponent from '../../../../src/components/user/files/FileSelectorComponent'
import FileContainer from '../../../../src/containers/user/files/FileContainer'
import styles from '../../../../src/styles'
import {
  pdfFile, epubFile, javascriptFile, markdownFile,
} from '../../../dumps/RuntimeDataFile.dump'

const context = buildTestContext(styles)

/**
 * Test FilesComponent
 * @author Raphaël Mechali
 */
describe('[Description] Testing FilesComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(FilesComponent)
  })
  it('should render correctly', () => {
    const props = {
      files: [pdfFile, epubFile, javascriptFile, markdownFile],
      selectedFile: epubFile,
      onFileSelected: () => { },
    }
    const enzymeWrapper = shallow(<FilesComponent {...props} />, { context })
    // 1 - check download button
    const downloadButtonWrapper = enzymeWrapper.find(DownloadButton)
    assert.lengthOf(downloadButtonWrapper, 1, 'There should be the download button')
    assert.equal(downloadButtonWrapper.props().downloadURL, props.selectedFile.uri, 'Download URL should be the selected file URI')
    // 2 - check file selector
    const selectorWrapper = enzymeWrapper.find(FileSelectorComponent)
    assert.lengthOf(selectorWrapper, 1, 'There should be the file selector')
    testSuiteHelpers.assertWrapperProperties(selectorWrapper, {
      files: props.files,
      selectedFile: props.selectedFile,
      onFileSelected: props.onFileSelected,
    }, 'Selector properties should be correctly reported')
    // 3 - check file content container
    const fileContainerWrapper = enzymeWrapper.find(FileContainer)
    assert.lengthOf(fileContainerWrapper, 1, 'There should be the file content container')
    assert.equal(fileContainerWrapper.props().file, props.selectedFile, 'It should handle selected file content')
  })
})
