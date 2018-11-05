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
import { CommonDomain } from '@regardsoss/domain'
import { DropDownButton } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import DownloadEntityFileComponent from '../../../../../src/components/user/results/options/DownloadEntityFileComponent'
import styles from '../../../../../src/styles/styles'

const context = buildTestContext(styles)

const docEntity = {
  content: {
    entityType: 'DOCUMENT',
    id: 'URN:AIP:DOCUMENT:project1:3aeed1bc-3c14-4100-bcd1-c4f370e679a2:V1',
    providerId: 'provider1',
    label: 'EmptyDoc',
    model: '1',
    tags: [],
    groups: ['PublicDocumentGroup'],
    properties: {},
    services: [],
    files: {},
  },
}

// note downloadable (wrong type)
const notDownloadableFile = {
  dataType: CommonDomain.DataTypesEnum.QUICKLOOK_MD,
  reference: false,
  uri: 'test:quicklook.png',
  mimeType: 'image/png',
  imageWidth: 10,
  imageHeight: 10,
  online: true,
  filename: 'quicklook.png',
}

// downloadable but offline
const offlineRawData = {
  dataType: CommonDomain.DataTypesEnum.RAWDATA,
  reference: false,
  uri: 'test:offline-rawdata.css',
  mimeType: 'text/css',
  online: false,
  filename: 'offline-rawdata.css',
}

// downloadable, from storage
const onlineRawData = {
  dataType: CommonDomain.DataTypesEnum.RAWDATA,
  reference: false,
  uri: 'test:online-rawdata.css',
  mimeType: 'text/css',
  online: true,
  filename: 'online-rawdata.css',
}

// downloadable, external
const onlineDocRef = {
  dataType: CommonDomain.DataTypesEnum.DOCUMENT,
  reference: true,
  uri: 'test:external-dpcument.css',
  mimeType: 'text/css',
  online: true,
  filename: 'online-document.css',
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
  it('should render correctly and hide download button when entity is a dataset', () => {
    const props = {
      entity: {
        content: {
          entityType: 'DATASET',
          id: 'URN:AIP:DOCUMENT:project1:3aeed1bc-3c14-4100-bcd1-c4f370e679a2:V1',
          providerId: 'Provider1',
          label: 'my dataset',
          model: '1',
          files: {
            RAWDATA: [onlineRawData],
          },
          tags: [],
        },
      },
      // Current user session info
      projectName: 'project1',
      accessToken: 'abcdef....',
    }
    const render = shallow(<DownloadEntityFileComponent {...props} />, { context })
    assert.lengthOf(render.find('a'), 0, 'No link rendered')
    assert.lengthOf(render.find(IconButton), 0, 'No icon button rendered')
    assert.lengthOf(render.find(DropDownButton), 0, 'No drop down button rendered')
  })
  it('should render correctly and display download placeholder when there is no file', () => {
    const props = {
      entity: docEntity,
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
  it('should render correctly and display download placeholder when there is no file of downloadable type', () => {
    const props = {
      entity: {
        content: {
          ...docEntity.content,
          files: {
            [CommonDomain.DataTypesEnum.QUICKLOOK_MD]: [notDownloadableFile],
          },
        },
      },
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
  it('should render correctly and display download placeholder when all files are offline', () => {
    const props = {
      // Current user session info
      projectName: 'project1',
      accessToken: 'abcdef....',
      entity: {
        content: {
          ...docEntity.content,
          files: {
            RAWDATA: [offlineRawData, offlineRawData], // twice to test list reducing methods
          },
        },
      },
    }
    const render = shallow(<DownloadEntityFileComponent {...props} />, { context })
    assert.lengthOf(render.find('a'), 0, 'No link rendered')
    const downloadPlaceholder = render.find(IconButton)
    assert.lengthOf(downloadPlaceholder, 1, 'Download placeholder should be rendered')
    assert.isTrue(downloadPlaceholder.props().disabled, 'Download placeholder should be disabled')
    assert.equal(downloadPlaceholder.props().title, 'download.no.online.file.tooltip', 'Computed tooltip should be no online file')
  })
  it('should render one link button when there is one downloadable RAWDATA file (internal)', () => {
    const props = {
      entity: {
        content: {
          ...docEntity.content,
          files: {
            RAWDATA: [onlineRawData],
          },
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
  it('should render one link button when there is one downloadable DOCUMENT file (external, raw data offline)', () => {
    const props = {
      entity: {
        content: {
          ...docEntity.content,
          files: {
            RAWDATA: [offlineRawData],
            DOCUMENT: [onlineDocRef],
          },
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
  it('should render one link by downloadable file when there are more than one downloadable file (test links)', () => {
    const props = {
      entity: {
        content: {
          ...docEntity.content,
          files: {
            RAWDATA: [onlineRawData, offlineRawData],
            DOCUMENT: [onlineDocRef],
          },
        },
      },
      // Current user session info
      accessToken: null,
      projectName: 'project1',
    }
    const render = shallow(<DownloadEntityFileComponent {...props} />, { context })
    assert.lengthOf(render.find(DropDownButton), 1, 'There should be a dropping menu as there are more links')
    const linksWrappers = render.find('a')
    assert.lengthOf(linksWrappers, 2, '2 files should be present (offline file should be filtered)')
    // we should only find the file1 and file2 URI in links
    const searchedFiles = [onlineRawData, onlineDocRef]
    searchedFiles.forEach((file) => {
      const linkForFileURI = linksWrappers.findWhere(n => n.props().href && n.props().href.includes(file.uri))
      assert.lengthOf(linkForFileURI, 1, `The should be the link for file URI ${file.uri}`)
      // check that project name has been added for internal file AND NOT for external file
      if (file.reference) {
        assert.equal(linkForFileURI.props().href, file.uri, 'Reference file URI should be unchanged')
      } else {
        assert.equal(linkForFileURI.props().href, `${file.uri}?scope=project1`, 'Internal file URI should hold the scope (no token currently)')
      }
    })
  })
})
