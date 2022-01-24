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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { URIContentDisplayer } from '../../../src/content/preview/URIContentDisplayer'
import { FileContentDisplayer } from '../../../src/content/preview/FileContentDisplayer'
import styles from '../../../src/content/styles'
import { TestBlob } from './TestBlob'

const context = buildTestContext(styles)

/**
 * Test URIContentDisplayer
 * @author Raphaël Mechali
 */
describe('[Components] Testing URIContentDisplayer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(URIContentDisplayer)
  })
  it('should render correctly and handle files download', () => {
    // 1 - Test a first scenario at initialization, ending with an error
    const spiedDownloadParameters = {}
    const props = {
      uri: 'first/uri',
      style: { any: 'any' },
      loadingComponent: <div id="loading.comp" />,
      errorComponent: <div id="error.comp" />,
      noPreviewComponent: <div id="no.preview.comp" />,
      downloadFile: (uri) => {
        spiedDownloadParameters.uri = uri
        return new Promise((resolve) => resolve({ payload: 'blablabla' }))
      },
    }
    const enzymeWrapper = shallow(<URIContentDisplayer {...props} />, { context })
    // 1.a - check loading state
    assert.deepEqual(enzymeWrapper.state(), {
      loading: true,
      error: false,
      fileURI: null,
      resolvedFile: null,
    })
    let fileDisplayer = enzymeWrapper.find(FileContentDisplayer)
    assert.lengthOf(fileDisplayer, 1, '(1a) There should be file displayer')
    testSuiteHelpers.assertWrapperProperties(fileDisplayer, {
      loading: true,
      error: false,
      file: null,
      fileURI: null,
      style: props.style,
      loadingComponent: props.loadingComponent,
      errorComponent: props.errorComponent,
      noPreviewComponent: props.noPreviewComponent,
    }, '(1a) File displayer properties should be correctly reported')

    // 1.b - simulate finished in error
    enzymeWrapper.instance().onDownloadError(props.uri)
    assert.deepEqual(enzymeWrapper.state(), {
      loading: false,
      error: true,
      fileURI: null,
      resolvedFile: null,
    })
    fileDisplayer = enzymeWrapper.find(FileContentDisplayer)
    assert.lengthOf(fileDisplayer, 1, '(1b) There should be file displayer')
    testSuiteHelpers.assertWrapperProperties(fileDisplayer, {
      loading: false,
      error: true,
      file: null,
      fileURI: null,
      style: props.style,
      loadingComponent: props.loadingComponent,
      errorComponent: props.errorComponent,
      noPreviewComponent: props.noPreviewComponent,
    }, '(1b) File displayer properties should be correctly reported')

    // 2.a - change file and check new loading state
    const props2 = { ...props, uri: 'http://blablabus.com/what' }
    enzymeWrapper.setProps(props2)
    assert.deepEqual(enzymeWrapper.state(), {
      loading: true,
      error: false,
      resolvedFile: null,
      fileURI: null,
    })
    fileDisplayer = enzymeWrapper.find(FileContentDisplayer)
    assert.lengthOf(fileDisplayer, 1, '(2a) There should be file displayer')
    testSuiteHelpers.assertWrapperProperties(fileDisplayer, {
      loading: true,
      error: false,
      file: null,
      fileURI: null,
      style: props.style,
      loadingComponent: props.loadingComponent,
      errorComponent: props.errorComponent,
      noPreviewComponent: props.noPreviewComponent,
    }, '(2a) File displayer properties should be correctly reported')
    // 2.a - simulate a download succesful end
    const testResolvedFile = {
      content: new TestBlob('any'),
      contentType: 'application/unknown',
    }
    enzymeWrapper.instance().onDownloadSuccess(props2.uri, testResolvedFile)
    assert.deepEqual(enzymeWrapper.state(), {
      loading: false,
      error: false,
      resolvedFile: testResolvedFile,
      fileURI: 'http://blablabus.com/what',
    })
    fileDisplayer = enzymeWrapper.find(FileContentDisplayer)
    assert.lengthOf(fileDisplayer, 1, '(2b) There should be file displayer')
    testSuiteHelpers.assertWrapperProperties(fileDisplayer, {
      loading: false,
      error: false,
      file: testResolvedFile,
      fileURI: 'http://blablabus.com/what',
      style: props.style,
      loadingComponent: props.loadingComponent,
      errorComponent: props.errorComponent,
      noPreviewComponent: props.noPreviewComponent,
    }, '(2b) File displayer properties should be correctly reported')
  })
})
