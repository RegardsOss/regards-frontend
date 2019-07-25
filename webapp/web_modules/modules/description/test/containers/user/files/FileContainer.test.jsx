/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import FileComponent from '../../../../src/components/user/files/FileComponent'
import { FileContainer } from '../../../../src/containers/user/files/FileContainer'
import styles from '../../../../src/styles'
import { pdfFile, markdownFile } from '../../../dumps/RuntimeDataFile.dump'

const context = buildTestContext(styles)

/**
 * Test FileContainer
 * @author Raphaël Mechali
 */
describe('[Description] Testing FileContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(FileContainer)
  })
  it('should render and start a new download each time a new file is provided', () => {
    let spiedDownloadFileURI = null
    const props = {
      file: pdfFile,
      downloadFile: (fileURI) => {
        spiedDownloadFileURI = fileURI
        return new Promise((resolve, reject) => resolve({ content: {}, contentType: 'IDK' }))
      },
    }
    const enzymeWrapper = shallow(<FileContainer {...props} />, { context })
    assert.deepEqual(spiedDownloadFileURI, props.file.uri, '[From init props] Container should have started downloading the file')
    assert.deepEqual(enzymeWrapper.state(), {
      loading: true,
      error: false,
      resolvedFile: null,
    }, '[From init props] Container state should reflect the download in progress')

    let componentWrapper = enzymeWrapper.find(FileComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      loading: true,
      error: false,
      file: null,
    }, '[From init props] Component should receive properties matching the current state')

    // update file
    const props2 = { ...props, file: markdownFile }
    enzymeWrapper.setProps(props2)
    assert.deepEqual(spiedDownloadFileURI, props2.file.uri, '[After props changed] Container should have started downloading the file')
    assert.deepEqual(enzymeWrapper.state(), {
      loading: true,
      error: false,
      resolvedFile: null,
    }, '[After props changed] Container state should reflect the download in progress')

    componentWrapper = enzymeWrapper.find(FileComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      loading: true,
      error: false,
      file: null,
    }, '[After props changed] Component should receive properties matching the current state')
  })
  it('should update after downloading succesfully current file', () => {
    const props = {
      file: pdfFile,
      downloadFile: testSuiteHelpers.getSuccessDispatchStub({ content: {}, contentType: 'IDK' }),
    }
    const enzymeWrapper = shallow(<FileContainer {...props} />, { context })
    // send event
    enzymeWrapper.instance().onDownloadSuccess(props.file, { content: {}, contentType: 'IDK' })
    enzymeWrapper.update()
    const state = enzymeWrapper.state()
    assert.deepEqual(state, {
      loading: false,
      error: false,
      resolvedFile: { content: {}, contentType: 'IDK' },
    }, 'State should correctly updated after download complete event was received')

    const componentWrapper = enzymeWrapper.find(FileComponent)
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      loading: state.loading,
      error: state.error,
      file: state.resolvedFile,
    }, 'Component should reflect current state')
  })
  it('should update after download failed for current file', () => {
    const props = {
      file: markdownFile,
      downloadFile: testSuiteHelpers.getFailingDispatchStub(),
    }
    const enzymeWrapper = shallow(<FileContainer {...props} />, { context })
    // send event
    enzymeWrapper.instance().onDownloadError(props.file)
    enzymeWrapper.update()
    const state = enzymeWrapper.state()
    assert.deepEqual(state, {
      loading: false,
      error: true,
      resolvedFile: null,
    }, 'State should correctly updated after download error event was received')

    const componentWrapper = enzymeWrapper.find(FileComponent)
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      loading: state.loading,
      error: state.error,
      file: state.resolvedFile,
    }, 'Component should reflect current state')
  })
  it('should ignore download events when file is not current one or component was unmounted (avoids concurrency issues)', () => {
    const props = {
      file: markdownFile,
      downloadFile: testSuiteHelpers.getFailingDispatchStub(),
    }
    const enzymeWrapper = shallow(<FileContainer {...props} />, { context })
    assert.isTrue(enzymeWrapper.state().loading)

    // Downloaded finished for wrong file
    // send error event
    enzymeWrapper.instance().onDownloadError(pdfFile)
    enzymeWrapper.update()
    assert.isTrue(enzymeWrapper.state().loading, 'Error event should have been ignored for another file')
    // send download done event
    enzymeWrapper.instance().onDownloadSuccess(pdfFile, { content: {}, contentType: 'IDK' })
    enzymeWrapper.update()
    assert.isTrue(enzymeWrapper.state().loading, 'Download event should have been ignored for another file')

    // Downloaded finished after unmounting
    // send error event
    enzymeWrapper.instance().wasUnmounted = true
    enzymeWrapper.instance().onDownloadError(markdownFile)
    enzymeWrapper.update()
    assert.isTrue(enzymeWrapper.state().loading, 'Error event should have been ignored when unmounting')
    // send download done event
    enzymeWrapper.instance().onDownloadSuccess(pdfFile, { content: {}, contentType: 'IDK' })
    enzymeWrapper.update()
    assert.isTrue(enzymeWrapper.state().loading, 'Download event should have been ignored when unmounting')
  })
})
