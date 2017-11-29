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
import MenuItem from 'material-ui/MenuItem'
import DownloadEntityFileComponent from '../../../../../src/components/user/results/options/DownloadEntityFileComponent'
import styles from '../../../../../src/styles/styles'

const context = buildTestContext(styles)

const docFile = {
  content: {
    entityType: 'DOCUMENT',
    files: {},
    ipId: 'URN:AIP:DOCUMENT:project1:3aeed1bc-3c14-4100-bcd1-c4f370e679a2:V1',
    label: 'EmptyDoc',
    model: {
      id: 1,
      name: 'MODEL_1',
      description: 'model',
      type: 'DOCUMENT',
    },
    lastUpdate: '2017-11-29T10:14:35.642Z',
    creationDate: '2017-11-28T14:49:44.622Z',
    id: 154,
    tags: [],
    groups: ['PublicDocumentGroup'],
    properties: {},
    services: [],
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
  it('should render correctly and dont display download', () => {
    const props = {
      entity: docFile,
      // Current user session info
      accessToken: null,
      isAuthenticated: false,
      scope: 'project1',
    }
    const render = shallow(<DownloadEntityFileComponent {...props} />, { context })
    assert.lengthOf(render.find('a'), 0, 'No link rendered')
  })
  it('should render correctly and display multiple files', () => {
    docFile.content.files = {
      DOCUMENT: [{
        uri: 'http://regards/api/v1/rs-dam/documents/52/files/929b1d07289390be600e16a0aa31213e',
        checksum: '929b1d07289390be600e16a0aa31213e',
        digestAlgorithm: 'MD5',
        size: 826,
        name: 'file.xml',
        mimeType: {
          type: 'text',
          subtype: 'xml',
          parameters: {},
        },
      }, {
        uri: 'http://regards/api/v1/rs-dam/documents/52/files/b72cf5d28db6485bead4c43a54828ea5',
        checksum: 'b72cf5d28db6485bead4c43a54828ea5',
        digestAlgorithm: 'MD5',
        size: 377,
        name: 'model.xml',
        mimeType: {
          type: 'text',
          subtype: 'xml',
          parameters: {},
        },
      }, {
        uri: 'http://regards/api/v1/rs-dam/documents/52/files/a07683baac2190fec3902f2bfb79d8e',
        checksum: 'a07683baac2190fec3902f2bfb79d8e',
        digestAlgorithm: 'MD5',
        size: 78864635,
        name: 'v3.2.1.tar.gz',
        mimeType: {
          type: 'application',
          subtype: 'gzip',
          parameters: {},
        },
      }],
    }
    const props = {
      entity: docFile,
      // Current user session info
      accessToken: null,
      isAuthenticated: false,
      scope: 'project1',
    }
    const render = shallow(<DownloadEntityFileComponent {...props} />, { context })
    assert.lengthOf(render.find(MenuItem), 3, 'It should return 3 Links')
  })
})
