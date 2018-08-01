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
import IconButton from 'material-ui/IconButton'
import { DropDownButton } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import DownloadEntityFileComponent from '../../../../../src/components/user/results/options/DownloadEntityFileComponent'
import styles from '../../../../../src/styles/styles'

const context = buildTestContext(styles)

const docFile = {
  content: {
    entityType: 'DOCUMENT',
    id: 'URN:AIP:DOCUMENT:project1:3aeed1bc-3c14-4100-bcd1-c4f370e679a2:V1',
    label: 'EmptyDoc',
    model: {
      id: 1,
      name: 'MODEL_1',
      description: 'model',
      type: 'DOCUMENT',
    },
    tags: [],
    groups: ['PublicDocumentGroup'],
    properties: {},
    services: [],
    files: {},
    allowingDownload: true,
  },
}

const file1 = {
  uri: 'www.richguys.com/my-wealth',
  downloadable: true,
  mimeType: 'picsou-monney/xml',
  checksum: 'F1',
}

const file2 = {
  uri: 'www.file2.com/file',
  downloadable: true,
  mimeType: 'picsou-monney/xml',
  checksum: 'F2',
}

const dataset = {
  content: {
    entityType: 'DATASET',
    files: {
      RAWDATA: [file1],
    },
    id: 'URN:AIP:DOCUMENT:project1:3aeed1bc-3c14-4100-bcd1-c4f370e679a2:V1',
    label: 'my dataset',
    tags: [],
  },
}

/**
* Test DownloadEntityFileComponent
* @author Léo Mieulet
*/
describe('[Search Results] Testing DownloadEntityFileComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DownloadEntityFileComponent)
  })
  it('should render correctly and not display download button when entity is a dataset', () => {
    const props = {
      entity: dataset,
      // Current user session info
      projectName: 'project1',
      accessToken: 'abcdef....',
    }
    const render = shallow(<DownloadEntityFileComponent {...props} />, { context })
    assert.lengthOf(render.find('a'), 0, 'No link rendered')
    assert.lengthOf(render.find(IconButton), 0, 'No icon button rendered')
    assert.lengthOf(render.find(DropDownButton), 0, 'No drop down button rendered')
  })
  it('should render correctly and and display download placeholder when there is no file', () => {
    const props = {
      entity: docFile,
      // Current user session info
      projectName: 'project1',
      accessToken: 'abcdef....',
    }
    const render = shallow(<DownloadEntityFileComponent {...props} />, { context })
    assert.lengthOf(render.find('a'), 0, 'No link rendered')
    const downloadPlaceholder = render.find(IconButton)
    assert.lengthOf(downloadPlaceholder, 1, 'Download placeholder should be rendered')
    assert.isTrue(downloadPlaceholder.props().disabled, 'Download placeholder should be disabled')
    assert.equal(downloadPlaceholder.props().title, 'no.download.tooltip', 'Computed tooltip should be no file')
  })
  it('should render correctly and display download placeholder when user has not download rights', () => {
    const props = {
      // Current user session info
      projectName: 'project1',
      accessToken: 'abcdef....',
      entity: {
        content: {
          ...docFile.content,
          files: {
            RAWDATA: [file1],
          },
          allowingDownload: false,
        },
      },
    }
    const render = shallow(<DownloadEntityFileComponent {...props} />, { context })
    assert.lengthOf(render.find('a'), 0, 'No link rendered')
    const downloadPlaceholder = render.find(IconButton)
    assert.lengthOf(downloadPlaceholder, 1, 'Download placeholder should be rendered')
    assert.isTrue(downloadPlaceholder.props().disabled, 'Download placeholder should be disabled')
    assert.equal(downloadPlaceholder.props().title, 'download.unsufficient.user.rights.tooltip', 'Computed tooltip should be unsufficient rights')
  })
  it('should render one link button when there is one downloadable RAWDATA file', () => {
    const props = {
      entity: {
        content: {
          ...docFile.content,
          files: {
            RAWDATA: [file1],
          },
          allowingDownload: true,
        },
      },
      // Current user session info
      accessToken: null,
      projectName: 'project1',
    }
    const render = shallow(<DownloadEntityFileComponent {...props} />, { context })
    assert.lengthOf(render.find('a'), 1, 'There should be one download link')
    assert.lengthOf(render.find(DropDownButton), 0, 'It should not be embedded in drop down menu')
  })
  it('should render one link button when there is one downloadable DOCUMENT file (RAWDATA disabled)', () => {
    const props = {
      entity: {
        content: {
          ...docFile.content,
          files: {
            RAWDATA: [file1],
            DOCUMENT: [file1],
          },
          allowingDownload: false,
        },
      },
      // Current user session info
      accessToken: null,
      projectName: 'project1',
    }
    const render = shallow(<DownloadEntityFileComponent {...props} />, { context })
    assert.lengthOf(render.find('a'), 1, 'There should be one download link')
    assert.lengthOf(render.find(DropDownButton), 0, 'It should not be embedded in drop down menu')
  })
  it('should render one link by downloadable file when there are more than one downloadable file', () => {
    const props = {
      entity: {
        content: {
          ...docFile.content,
          files: {
            RAWDATA: [file1, { // second file should be filtered as it is not only
              uri: 'www.another-file.com/my-file',
              downloadable: false,
              mimeType: 'some/xml-format',
            }],
            DOCUMENT: [file2],
          },
          downloadable: true,
        },
      },
      // Current user session info
      accessToken: null,
      projectName: 'project1',
    }
    const render = shallow(<DownloadEntityFileComponent {...props} />, { context })
    assert.lengthOf(render.find(DropDownButton), 1, 'There should be a dropping menu as there are more links')
    const linksWrappers = render.find('a')
    assert.lengthOf(linksWrappers, 2, '2 files should be present')
    // we should only find the file1 and file2 URI in links
    const searchedFiles = [file1, file2]
    searchedFiles.forEach((file) => {
      const linkForFileURI = linksWrappers.findWhere(n => n.props().href && n.props().href.includes(file.uri))
      assert.lengthOf(linkForFileURI, 1, `The should be the link for file URI ${file.uri}`)
    })
  })
  it('should render correctly and display download placeholder when all files are not downloadable', () => {
    const props = {
      entity: {
        content: {
          ...docFile.content,
          files: {
            RAWDATA: [{
              uri: 'www.another-file.com/my-file-1',
              downloadable: false,
              mimeType: 'some/xml-format',
            }, {
              uri: 'www.another-file.com/my-file-1',
              downloadable: false,
              mimeType: 'some/xml-format',
            }],
            DOCUMENT: [],
          },
          allowingDownload: true,
        },
      },
      // Current user session info
      accessToken: null,
      projectName: 'project1',
    }
    const render = shallow(<DownloadEntityFileComponent {...props} />, { context })
    assert.lengthOf(render.find('a'), 0, 'No link rendered')
    const downloadPlaceholder = render.find(IconButton)
    assert.lengthOf(downloadPlaceholder, 1, 'Download placeholder should be rendered')
    assert.isTrue(downloadPlaceholder.props().disabled, 'Download placeholder should be disabled')
    assert.equal(downloadPlaceholder.props().title, 'download.no.online.file.tooltip', 'Computed tooltip should be no online file')
  })
})
