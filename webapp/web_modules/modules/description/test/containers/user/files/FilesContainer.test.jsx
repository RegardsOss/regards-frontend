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
import { CommonDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers, DumpProvider } from '@regardsoss/tests-helpers'
import FilesComponent from '../../../../src/components/user/files/FilesComponent'
import { FilesContainer } from '../../../../src/containers/user/files/FilesContainer'
import styles from '../../../../src/styles'
import { dataFilesDump } from '../../../dumps/DataFiles.dump'

const context = buildTestContext(styles)

/** A base entity for tests */
const baseEntity = {
  content: {
    ...DumpProvider.getFirstEntity('AccessProjectClient', 'DataobjectEntity').content,
    files: {},
  },
}

/**
 * Test FilesContainer
 * @author Raphaël Mechali
 */
describe('[Description] Testing FilesContainer', () => {
  before(() => {
    testSuiteHelpers.before()
    root.location = {
      protocol: 'test:',
      host: 'www.test.org',
    }
  })
  after(() => {
    testSuiteHelpers.after()
    delete root.location
  })

  it('should exists', () => {
    assert.isDefined(FilesContainer)
  })
  it('should render correctly', () => {
    const props = {
      entity: baseEntity,
      fileType: CommonDomain.DataTypesEnum.DOCUMENT,
    }
    const enzymeWrapper = shallow(<FilesContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(FilesComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      files: [],
      selectedFile: null,
      onFileSelected: enzymeWrapper.instance().onFileSelected,
    }, 'Component should define the expected properties')
  })
  it('extract the right entity files and convert it correctly when user is logged', () => {
    const props = {
      entity: {
        content: {
          ...baseEntity.content,
          files: {
            [CommonDomain.DataTypesEnum.DOCUMENT]: dataFilesDump,
          },
        },
      },
      fileType: CommonDomain.DataTypesEnum.DOCUMENT,
      accessToken: 'ABCDE',
      projectName: 'test-project',
    }
    const enzymeWrapper = shallow(<FilesContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(FilesComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    const convertedFiles = componentWrapper.props().files
    assert.lengthOf(convertedFiles, 2, '2 files should be retrieved (offline file should be filtered)')
    assert.deepEqual(convertedFiles[0], {
      filename: dataFilesDump[0].filename,
      mimeType: dataFilesDump[0].mimeType,
      filesize: dataFilesDump[0].filesize,
      uri: dataFilesDump[0].uri,
    }, 'First file is a refence, URI should not be updated')
    assert.deepEqual(convertedFiles[1], {
      filename: dataFilesDump[1].filename,
      mimeType: dataFilesDump[1].mimeType,
      filesize: dataFilesDump[1].filesize,
      uri: `${dataFilesDump[1].uri}?token=ABCDE&origin=test://www.test.org`,
    }, 'Second file is locally hosted, URI should completed with logged user token and origin')


    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      selectedFile: convertedFiles[0],
      onFileSelected: enzymeWrapper.instance().onFileSelected,
    }, 'Component should define the expected properties')
  })
  it('extract the right entity files and convert it correctly when user is not logged', () => {
    const props = {
      entity: {
        content: {
          ...baseEntity.content,
          files: {
            [CommonDomain.DataTypesEnum.DOCUMENT]: dataFilesDump,
          },
        },
      },
      fileType: CommonDomain.DataTypesEnum.DOCUMENT,
      accessToken: null,
      projectName: 'test-project',
    }
    const enzymeWrapper = shallow(<FilesContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(FilesComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    const convertedFiles = componentWrapper.props().files
    assert.lengthOf(convertedFiles, 2, '2 files should be retrieved (offline file should be filtered)')
    assert.deepEqual(convertedFiles[0], {
      filename: dataFilesDump[0].filename,
      mimeType: dataFilesDump[0].mimeType,
      filesize: dataFilesDump[0].filesize,
      uri: dataFilesDump[0].uri,
    }, 'First file is a refence, URI should not be updated')
    assert.deepEqual(convertedFiles[1], {
      filename: dataFilesDump[1].filename,
      mimeType: dataFilesDump[1].mimeType,
      filesize: dataFilesDump[1].filesize,
      uri: `${dataFilesDump[1].uri}?scope=test-project&origin=test://www.test.org`,
    }, 'Second file is locally hosted, URI should completed with project scope')
  })
})
