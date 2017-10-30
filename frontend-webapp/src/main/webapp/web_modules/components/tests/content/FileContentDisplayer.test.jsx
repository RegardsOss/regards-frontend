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
import root from 'window-or-global'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import FileContentDisplayer from '../../src/content/FileContentDisplayer'
import CodeFileDisplayer from '../../src/content/CodeFileDisplayer'
import ImageFileDisplayer from '../../src/content/ImageFileDisplayer'
import IFrameURLContentDisplayer from '../../src/content/IFrameURLContentDisplayer'
import styles from '../../src/content/styles/styles'
import { TestBlob } from './TestBlob'
import { TestFileReader } from './TestFileReader'

const context = buildTestContext(styles)

/**
* Tests FileContentDisplayer
* @author Raphaël Mechali
*/
describe('[Components] Testing FileContentDisplayer', () => {
  before(() => {
    testSuiteHelpers.before()
    root.Blob = TestBlob
    root.FileReader = TestFileReader
    root.URL = {
      createObjectURL: blob => blob.text,
      revokeObjectURL: () => { },
    }
  })
  after(() => {
    testSuiteHelpers.after()
    delete root.Blob
    delete root.FileReader
    delete root.URL
  })

  it('should exists', () => {
    assert.isDefined(FileContentDisplayer)
  })

  // MIME types tests
  const testCases = [{
    contentTypes: CodeFileDisplayer.getSupportedMIMETypes(),
    expectedComponent: CodeFileDisplayer,
    message: 'should render code MIME types through CodeFileDisplayer for type',
  }, {
    contentTypes: ImageFileDisplayer.getSupportedMIMETypes(),
    expectedComponent: ImageFileDisplayer,
    message: 'should render image MIME types through ImageFileDisplayer for type',
  }, {
    contentTypes: ['application/pdf', 'plop/desmontagnes'],
    expectedComponent: IFrameURLContentDisplayer,
    message: 'should render any other MIME type through IFrameURLContentDisplayer for type',
  }]

  testCases.forEach(({ contentTypes, expectedComponent, message }) =>
    contentTypes.forEach(mimeType =>
      it(`${message} "${mimeType}"`, () => {
        const file = {
          content: new TestBlob('local'),
          contentType: mimeType,
        }
        const render = shallow(<FileContentDisplayer file={file} />, { context })
        assert.lengthOf(render.find(expectedComponent), 1, `The component for MIME type should be a(n) ${expectedComponent}`)
      })))


  it('should create local URLs when they are not provided', () => {
    const file1 = {
      content: new TestBlob('t1'),
      contentType: 'any/any',
    }
    const render = shallow(<FileContentDisplayer file={file1} />, { context })
    assert.equal(render.state('localAccessURL'), file1.content.text, 'URL should be test blob text extracted from file 1, due to test mocks')

    const file2 = {
      content: new TestBlob('t2'),
      contentType: 'any/any',
    }
    render.setProps({ file: file2 })
    assert.equal(render.state('localAccessURL'), file2.content.text, 'URL should be test blob text extracted from file 2, due to test mocks')
  })

  it('should use local URLs provided when they are', () => {
    const props = {
      file: {
        content: new TestBlob('not-the-url'),
        contentType: 'any/any',
      },
      fileAccessURL: 'i-should-use-that-one',
    }
    const render = shallow(<FileContentDisplayer {...props} />, { context })
    assert.equal(render.state('localAccessURL'), props.fileAccessURL, 'URL should be the provided one, not test blob text extracted')
  })
})
