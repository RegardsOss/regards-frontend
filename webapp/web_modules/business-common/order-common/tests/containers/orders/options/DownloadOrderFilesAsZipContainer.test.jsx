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
import { OrderClient } from '@regardsoss/client'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import DownloadOrderFilesAsZipComponent from '../../../../src/components/orders/options/DownloadOrderFilesAsZipComponent'
import { DownloadOrderFilesAsZipContainer } from '../../../../src/containers/orders/options/DownloadOrderFilesAsZipContainer'
import { SOME_AUTHENTICATION } from '../../../dumps/Authentication.dump'
import { SOME_ORDERS } from '../../../dumps/Orders.dumb'

import styles from '../../../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test DownloadOrderFilesAsZipContainer
* @author Raphaël Mechali
*/
describe('[Order Common] Testing DownloadOrderFilesAsZipContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DownloadOrderFilesAsZipContainer)
  })
  it('should render correctly witout file', () => {
    const mockedOrder = {
      content: {
        ...SOME_ORDERS.content[0].content,
        availableFilesCount: 0,
      },
      links: [],
    }

    const props = {
      entity: mockedOrder,
      // from mapStateToProps
      authentication: SOME_AUTHENTICATION,
    }

    const enzymeWrapper = shallow(<DownloadOrderFilesAsZipContainer {...props} />, { context })
    const component = enzymeWrapper.find(DownloadOrderFilesAsZipComponent)
    assert.lengthOf(component, 1, 'There should be the component')
    assert.isFalse(component.props().canDownload, 'download should not be available')
    assert.isFalse(component.props().isWaitingUser, 'Component should not be marked as waiting user')
    assert.equal(component.props().availableFilesCount, 0, 'There should be no available files')

    const componentURL = component.props().downloadZipURL
    const testActions = new OrderClient.DownloadAllOrderFilesAction()
    assert.equal(componentURL, testActions.getFileDownloadLink(mockedOrder.content.id, SOME_AUTHENTICATION.result.access_token), 'URL should be correctly generated ')
    assert.include(componentURL, SOME_AUTHENTICATION.result.access_token, 'Token should be specified in URL')
  })
  it('should render correctly with files (not waiting user)', () => {
    const mockedOrder = {
      content: {
        ...SOME_ORDERS.content[0].content,
        availableFilesCount: 10,
        waitingForUser: false,
      },
      links: [{
        rel: 'download',
        href: 'someurl',
      }],
    }

    const props = {
      entity: mockedOrder,
      // from mapStateToProps
      authentication: SOME_AUTHENTICATION,
    }

    const enzymeWrapper = shallow(<DownloadOrderFilesAsZipContainer {...props} />, { context })
    const component = enzymeWrapper.find(DownloadOrderFilesAsZipComponent)
    assert.lengthOf(component, 1, 'There should be the component')
    assert.isTrue(component.props().canDownload, 'download should not be available')
    assert.isFalse(component.props().isWaitingUser, 'Component should not be marked as waiting user')
    assert.equal(component.props().availableFilesCount, mockedOrder.content.availableFilesCount, 'File count should be correctly reported')

    const componentURL = component.props().downloadZipURL
    const testActions = new OrderClient.DownloadAllOrderFilesAction()
    assert.equal(componentURL, testActions.getFileDownloadLink(mockedOrder.content.id, SOME_AUTHENTICATION.result.access_token), 'URL should be correctly generated ')
    assert.include(componentURL, SOME_AUTHENTICATION.result.access_token, 'Token should be specified in URL')
  })
  it('should render correctly with files (waiting user)', () => {
    const mockedOrder = {
      content: {
        ...SOME_ORDERS.content[0].content,
        availableFilesCount: 1500,
        waitingForUser: true,
      },
      links: [{
        rel: 'download',
        href: 'someurl',
      }],
    }

    const props = {
      entity: mockedOrder,
      // from mapStateToProps
      authentication: SOME_AUTHENTICATION,
    }

    const enzymeWrapper = shallow(<DownloadOrderFilesAsZipContainer {...props} />, { context })
    const component = enzymeWrapper.find(DownloadOrderFilesAsZipComponent)
    assert.lengthOf(component, 1, 'There should be the component')
    assert.isTrue(component.props().canDownload, 'download should not be available')
    assert.isTrue(component.props().isWaitingUser, 'Component should be marked as waiting user')
    assert.equal(component.props().availableFilesCount, mockedOrder.content.availableFilesCount, 'File count should be correctly reported')
  })
})
