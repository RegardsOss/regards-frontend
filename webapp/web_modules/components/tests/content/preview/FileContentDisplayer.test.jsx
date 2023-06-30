/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { UIDomain } from '@regardsoss/domain'
import { FileContentDisplayer } from '../../../src/content/preview/FileContentDisplayer'
import CodeFileDisplayer from '../../../src/content/preview/CodeFileDisplayer'
import ImageFileDisplayer from '../../../src/content/preview/ImageFileDisplayer'
import { IFrameURLContentDisplayer } from '../../../src/content/preview/IFrameURLContentDisplayer'
import { MarkdownFileContentDisplayer } from '../../../src/content/preview/MarkdownFileContentDisplayer'
import { NoContentComponent } from '../../../src/content/feedback/NoContentComponent'
import { ContentLoadingComponent } from '../../../src/content/feedback/ContentLoadingComponent'
import styles from '../../../src/content/styles/styles'
import { TestFileReader } from './TestFileReader'

const context = buildTestContext(styles)

/**
* Tests FileContentDisplayer
* @author Raphaël Mechali
*/
describe('[Components] Testing FileContentDisplayer', () => {
  before(() => {
    testSuiteHelpers.before()
    root.FileReader = TestFileReader
    root.URL = {
      createObjectURL: (blob) => blob.text,
      revokeObjectURL: () => { },
    }
  })
  after(() => {
    testSuiteHelpers.after()
    delete root.FileReader
    delete root.URL
  })

  it('should exists', () => {
    assert.isDefined(FileContentDisplayer)
  })
  it('should render correctly loading', () => {
    const props = {
      loading: true,
      error: false,
      loadingComponent: <ContentLoadingComponent loadingMessageKey="some.example" />,
    }
    const renderWrapper = shallow(<FileContentDisplayer {...props} />, { context })
    const loadingComp = renderWrapper.find(ContentLoadingComponent)
    assert.lengthOf(loadingComp, 1)
    assert.equal(loadingComp.props().loadingMessageKey, 'some.example')
  })
  it('should render correctly in error', () => {
    const props = {
      loading: false,
      error: true,
      errorComponent: <NoContentComponent titleKey="some.example" />,
    }
    const renderWrapper = shallow(<FileContentDisplayer {...props} />, { context })
    const errorComp = renderWrapper.find(NoContentComponent)
    assert.lengthOf(errorComp, 1)
    assert.equal(errorComp.props().titleKey, 'some.example')
  })
  it('should render correctly when preview is available for MIME type', () => {
    const props = {
      loading: false,
      error: false,
      file: {
        content: new Blob(),
        contentType: 'invalid/mimeType',
      },
      noPreviewComponent: <NoContentComponent titleKey="some.example" />,
    }
    const renderWrapper = shallow(<FileContentDisplayer {...props} />, { context })
    const noPreviewComp = renderWrapper.find(NoContentComponent)
    assert.lengthOf(noPreviewComp, 1)
    assert.equal(noPreviewComp.props().titleKey, 'some.example')
  })

  // MIME types tests
  const testCases = [{
    contentTypes: UIDomain.CODE_FILE_SUPPORTED_MIME_TYPES,
    expectedComponent: CodeFileDisplayer,
    message: 'should render code MIME types through code file displayer for type',
  }, {
    contentTypes: UIDomain.IMAGE_FILE_SUPPORTED_MIME_TYPES,
    expectedComponent: ImageFileDisplayer,
    message: 'should render image MIME types through image file displayer for type',
  }, {
    contentTypes: UIDomain.IFRAME_CONTENT_SUPPORTED_MIME_TYPES,
    expectedComponent: IFrameURLContentDisplayer,
    message: 'should render pdf and html MIME type through IFrame URL content displayer for type',
  }, {
    contentTypes: UIDomain.MARKDOWN_FILE_SUPPORTED_MIME_TYPES,
    expectedComponent: MarkdownFileContentDisplayer,
    message: 'should render markdown MIME type through Markdown file displayer for type',
  }]

  testCases.forEach(({ contentTypes, expectedComponent, message }) => contentTypes.forEach((mimeType) => it(`${message} "${mimeType}"`, () => {
    const props = {
      loading: false,
      error: false,
      file: {
        content: new Blob(),
        contentType: mimeType,
      },
    }
    const renderWrapper = shallow(<FileContentDisplayer {...props} />, { context })
    assert.lengthOf(renderWrapper.find(expectedComponent), 1, `The component for MIME type should be a(n) ${expectedComponent}`)
  })))
})
