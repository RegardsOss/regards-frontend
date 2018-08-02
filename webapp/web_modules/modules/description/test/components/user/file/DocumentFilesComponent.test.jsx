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
import root from 'window-or-global'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { CommonDomain, DamDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import DocumentFilesComponent from '../../../../src/components/user/file/DocumentFilesComponent'
import DescriptionFileComponent from '../../../../src/components/user/file/DescriptionFileComponent'
import styles from '../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test DocumentFilesComponent
 * @author Raphaël Mechali
 */
describe('[Description] Testing DocumentFilesComponent', () => {
  before(() => {
    testSuiteHelpers.before()
    // set root location for tests
    root.location = {
      protocol: 'test:',
      host: 'mocha',
    }
  })
  after(() => {
    testSuiteHelpers.after()
    // clear root location
    delete root.location
  })

  it('should exists', () => {
    assert.isDefined(DocumentFilesComponent)
  })
  it('should render file content for one document file', () => {
    const props = {
      accessToken: 'token1',
      projectName: 'project1',
      entity: {
        content: {
          id: 'URN:TEST',
          label: 'test',
          providerId: 'Provider1',
          model: '1',
          entityType: DamDomain.ENTITY_TYPES_ENUM.DOCUMENT,
          files: {
            [CommonDomain.DataTypesEnum.DOCUMENT]: [{
              dataType: CommonDomain.DataTypesEnum.DOCUMENT,
              uri: 'test:file1',
              checksum: 'A',
              name: 'File 1',
              size: 5230,
              reference: false,
              mimeType: 'text/html',
              online: true,
              filename: 'file1',
            }],
          },
          tags: [],
        },
      },
    }
    const enzymeWrapper = shallow(<DocumentFilesComponent {...props} />, { context })
    const singleFileComponent = enzymeWrapper.find(DescriptionFileComponent)
    assert.lengthOf(singleFileComponent, 1, 'The single document displayer should be rendered ')
    assert.equal(singleFileComponent.props().descriptionFileURL, 'test:file1?token=token1&origin=test://mocha',
      'URL should be correctly provided, given root.location and token or project')
    assert.lengthOf(enzymeWrapper.find('a'), 0, 'Files links should not be rendered')
  })
  it('should render files list for many documents files', () => {
    const props = {
      accessToken: null, // test without token
      projectName: 'project1',
      entity: {
        content: {
          id: 'URN:TEST2',
          providerId: 'Provider1',
          label: 'test',
          entityType: DamDomain.ENTITY_TYPES_ENUM.DOCUMENT,
          model: '1',
          files: {
            [CommonDomain.DataTypesEnum.DOCUMENT]: [{
              dataType: CommonDomain.DataTypesEnum.DOCUMENT,
              uri: 'test:file1',
              checksum: 'A',
              name: 'File 1',
              reference: false,
              mimeType: 'text/html',
              online: true,
              filename: 'file1',
              filesize: 5230,
            }, {
              dataType: CommonDomain.DataTypesEnum.DOCUMENT,
              uri: 'test:file2',
              checksum: 'B',
              name: 'File 2',
              reference: false,
              mimeType: 'text/html',
              online: true,
              filename: 'file1',
              filesize: 105604,
            }],
          },
          tags: [],
        },
      },
    }
    const enzymeWrapper = shallow(<DocumentFilesComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(DescriptionFileComponent), 0, 'The single document displayer should not be rendered ')

    const fileLinks = enzymeWrapper.find('a')
    assert.lengthOf(fileLinks, 2, 'There should be one file link for each available file (2)')
    // check file 1 link
    const file1Link = fileLinks.findWhere(n => n.props().href === 'test:file1?scope=project1&origin=test://mocha')
    assert.lengthOf(file1Link, 1, 'There should be file 1 link with expected href')
    // check file 2 link
    const file2Link = fileLinks.findWhere(n => n.props().href === 'test:file2?scope=project1&origin=test://mocha')
    assert.lengthOf(file2Link, 1, 'There should be file 2 link with expected href')
  })
})
