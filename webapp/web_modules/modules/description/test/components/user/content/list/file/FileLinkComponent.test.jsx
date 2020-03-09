/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import FileIcon from 'mdi-material-ui/FileImage'
import DownloadIcon from 'mdi-material-ui/Download'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { DownloadButton } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { BROWSING_SECTIONS_ENUM } from '../../../../../../src/domain/BrowsingSections'
import FileLinkComponent from '../../../../../../src/components/user/content/list/file/FileLinkComponent'
import PageLinkCellComponent from '../../../../../../src/components/user/content/list/common/PageLinkCellComponent'
import styles from '../../../../../../src/styles'
import { resolvedDatasetEntity } from '../../../../../dumps/resolved.dump'
import PageElementOption from '../../../../../../src/components/user/content/list/common/PageElementOption'

const context = buildTestContext(styles)

/**
 * Test FileLinkComponent
 * @author Raphaël Mechali
 */
describe('[Description] Testing FileLinkComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(FileLinkComponent)
  })
  it('should render, with download option, when file is available', () => {
    const spyOnSelectInnerLink = {}
    const props = {
      section: BROWSING_SECTIONS_ENUM.INFORMATION,
      index: 1,
      file: resolvedDatasetEntity.displayModel.descriptionFiles[1],
      onSelectInnerLink: (section, index) => {
        spyOnSelectInnerLink.section = section
        spyOnSelectInnerLink.index = index
      },
    }
    const enzymeWrapper = shallow(<FileLinkComponent {...props} />, { context })
    // 1 - Check main operation: navigate to file
    const link = enzymeWrapper.find(PageLinkCellComponent)
    testSuiteHelpers.assertWrapperProperties(link, {
      text: props.file.label,
      tooltip: 'module.description.common.file.preview.tooltip',
      LinkIconConstructor: FileIcon,
      disabled: false,
      onClick: enzymeWrapper.instance().onFileLinkClicked,
    }, 'Link properties should be correctly set and it should be enabled as file is available')
    // check callback
    assert.deepEqual(spyOnSelectInnerLink, {}, 'Callback should not have been called yet')
    link.props().onClick()
    assert.deepEqual(spyOnSelectInnerLink, {
      section: props.section,
      index: props.index,
    }, 'Callback should have been invoked with right parameters')

    // 2 - Check download option is available
    const downloadOption = enzymeWrapper.find(DownloadButton)
    assert.lengthOf(downloadOption, 1, 'There should be download option as file is available')
    testSuiteHelpers.assertWrapperProperties(downloadOption, {
      ButtonConstructor: PageElementOption,
      tooltip: 'module.description.common.download.file.tooltip',
      downloadURL: props.file.uri,
      IconConstructor: DownloadIcon,
    }, 'Download option properties should be correctly set')
  })
  it('should render without download option and link when file is not available', () => {
    const props = {
      section: BROWSING_SECTIONS_ENUM.INFORMATION,
      index: 0,
      file: {
        ...resolvedDatasetEntity.displayModel.descriptionFiles[0],
        available: false,
      },
      onSelectInnerLink: () => {},
    }
    const enzymeWrapper = shallow(<FileLinkComponent {...props} />, { context })
    // 1 - Check main operation: navigate to file
    const link = enzymeWrapper.find(PageLinkCellComponent)
    testSuiteHelpers.assertWrapperProperties(link, {
      text: props.file.label,
      tooltip: 'module.description.common.file.preview.tooltip',
      LinkIconConstructor: FileIcon,
      disabled: true,
      onClick: enzymeWrapper.instance().onFileLinkClicked,
    }, 'Link properties should be correctly set and it should be disabled as file is not available')
    // 2 - Check download option is not available
    const downloadOption = enzymeWrapper.find(DownloadButton)
    assert.lengthOf(downloadOption, 0, 'There should not be download option as file is not available')
  })
})
