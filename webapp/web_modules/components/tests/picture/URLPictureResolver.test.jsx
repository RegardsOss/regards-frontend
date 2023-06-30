/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { URLPictureResolver } from '../../src/picture/URLPictureResolver'
import LoadingPicturePlaceholder from '../../src/picture/LoadingPicturePlaceholder'
import URLPicture from '../../src/picture/URLPicture'
import styles from '../../src/picture/styles'

const context = buildTestContext(styles)

/**
 * Test URLPictureResolver
 * @author Raphaël Mechali
 */
describe('[Components] Testing URLPictureResolver', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(URLPictureResolver)
  })
  it('should fetch a missing picture MIME type', () => {
    const spiedDispatchData = { count: 0 }
    const props = {
      url: 'any-random-url@#1112SDSAQ',
      dispatchDownload: (url) => {
        spiedDispatchData.count += 1
        spiedDispatchData.url = url
        return new Promise(() => { })
      },
    }
    const enzymeWrapper = shallow(<URLPictureResolver {...props} />, { context })
    assert.isTrue(enzymeWrapper.state().loading, 'It should be marked loading')
    assert.isNotOk(enzymeWrapper.state().resolvedMIMEType, 'Mime type should be null')
    assert.equal(spiedDispatchData.count, 1, 'Data fetching should have started')
    assert.equal(spiedDispatchData.url, props.url, 'Data fetching URL should be correctly provided')
    assert.lengthOf(enzymeWrapper.find(LoadingPicturePlaceholder), 1, 'It should render the loading component while loading')
    assert.lengthOf(enzymeWrapper.find(URLPicture), 0, 'It should not render the picture component')
  })
  it('should use cache MIME types when found a missing picture MIME type', () => {
    const spiedDispatchData = { count: 0 }
    const cachedURL = 'my-cached-url'
    URLPictureResolver.PICTURES_CACHE[cachedURL] = 'a-mime-type'
    const props = {
      url: cachedURL,
      dispatchDownload: (url) => {
        spiedDispatchData.count += 1
        spiedDispatchData.url = url
        return new Promise(() => { })
      },
    }
    const enzymeWrapper = shallow(<URLPictureResolver {...props} />, { context })
    assert.isFalse(enzymeWrapper.state().loading, 'It should not be loading')
    assert.equal(enzymeWrapper.state().resolvedMIMEType, 'a-mime-type', 'Mime type should be retrieve from state')
    assert.equal(spiedDispatchData.count, 0, 'No download should be performed')
    assert.lengthOf(enzymeWrapper.find(LoadingPicturePlaceholder), 0, 'It should not render the loading component')
    const componentWrapper = enzymeWrapper.find(URLPicture)
    assert.lengthOf(componentWrapper, 1, 'It should render the picture component')
    assert.equal(componentWrapper.props().url, props.url, 'URL should be correctly reported to component')
    assert.equal(componentWrapper.props().mimeType, 'a-mime-type', 'MIME type should be correctly reported to component')
  })
  // note it is especially here to test the cache update due to promise and blobs
})
