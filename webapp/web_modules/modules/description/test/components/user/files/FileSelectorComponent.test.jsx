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
import MenuItem from 'material-ui/MenuItem'
import { DropDownButton } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import FileSelectorComponent from '../../../../src/components/user/files/FileSelectorComponent'
import styles from '../../../../src/styles'
import { pdfFile, epubFile, javascriptFile, markdownFile } from '../../../dumps/RuntimeDataFile.dump'

const context = buildTestContext(styles)

/**
 * Test FileSelectorComponent
 * @author Raphaël Mechali
 */
describe('[Description] Testing FileSelectorComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(FileSelectorComponent)
  })
  it('should render correctly', () => {
    const props = {
      files: [pdfFile, epubFile, javascriptFile, markdownFile],
      selectedFile: epubFile,
      onFileSelected: () => { },
    }
    const enzymeWrapper = shallow(<FileSelectorComponent {...props} />, { context })
    const dropDownWrapper = enzymeWrapper.find(DropDownButton)
    assert.lengthOf(dropDownWrapper, 1, 'There should be the drop down wrapper')
    testSuiteHelpers.assertWrapperProperties(dropDownWrapper, {
      onChange: props.onFileSelected,
      getLabel: enzymeWrapper.instance().getLabel,
      value: props.selectedFile,
    }, 'Drop down properties should be correctly reported')

    const menuItems = dropDownWrapper.find(MenuItem)
    assert.lengthOf(menuItems, props.files.length, 'There should be one selector for each file')
    props.files.forEach((file) => {
      const fileMenuItem = menuItems.findWhere(n => n.props().value === file)
      assert.lengthOf(fileMenuItem, 1, `There should be the selector for file ${file.filename}`)
    })
  })
})
