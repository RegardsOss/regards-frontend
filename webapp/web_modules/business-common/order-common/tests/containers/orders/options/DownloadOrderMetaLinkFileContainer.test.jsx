/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import forEach from 'lodash/forEach'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { OrderDomain } from '@regardsoss/domain'
import { OrderClient } from '@regardsoss/client'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import DownloadOrderMetaLinkFileComponent from '../../../../src/components/orders/options/DownloadOrderMetaLinkFileComponent'
import { DownloadOrderMetaLinkFileContainer } from '../../../../src/containers/orders/options/DownloadOrderMetaLinkFileContainer'
import { SOME_AUTHENTICATION } from '../../../dumps/Authentication.dump'
import { SOME_ORDERS } from '../../../dumps/Orders.dumb'
import styles from '../../../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test DownloadOrderMetaLinkFileContainer
* @author Raphaël Mechali
*/
describe('[Order Common] Testing DownloadOrderMetaLinkFileContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DownloadOrderMetaLinkFileContainer)
  })
  // test availability in every state
  const statusTestCases = {
    [OrderDomain.ORDER_STATUS_ENUM.PENDING]: true,
    [OrderDomain.ORDER_STATUS_ENUM.RUNNING]: true,
    [OrderDomain.ORDER_STATUS_ENUM.PAUSED]: true,
    [OrderDomain.ORDER_STATUS_ENUM.DONE_WITH_WARNING]: true,
    [OrderDomain.ORDER_STATUS_ENUM.DONE]: true,
    [OrderDomain.ORDER_STATUS_ENUM.EXPIRED]: false,
    [OrderDomain.ORDER_STATUS_ENUM.FAILED]: false,
    [OrderDomain.ORDER_STATUS_ENUM.DELETED]: false,
    [OrderDomain.ORDER_STATUS_ENUM.REMOVED]: false,
  }
  forEach(statusTestCases, (canDownload, status) => it(`should render correctly in state ${status}, ${canDownload ? 'enabling' : 'disabling'} download option`, () => {
    const mockedOrder = {
      content: {
        ...SOME_ORDERS.content[0].content,
        status,
      },
      links: [],
    }
    const props = {
      entity: mockedOrder,
      authentication: SOME_AUTHENTICATION,
    }
    const enzymeWrapper = shallow(<DownloadOrderMetaLinkFileContainer {...props} />, { context })
    const component = enzymeWrapper.find(DownloadOrderMetaLinkFileComponent)
    assert.lengthOf(component, 1, 'There should be the component')
    if (canDownload) {
      assert.isTrue(component.props().canDownload, 'download should be available')
    } else {
      assert.isFalse(component.props().canDownload, 'download should not be available')
    }
    const componentURL = component.props().downloadMetalinkURL
    const testActions = new OrderClient.DownloadOrderMetalinkFileActions()
    assert.equal(componentURL, testActions.getFileDownloadLink(mockedOrder.content.id, SOME_AUTHENTICATION.result.access_token), 'URL should be correctly generated ')
    assert.include(componentURL, SOME_AUTHENTICATION.result.access_token, 'Token should be specified in URL')
  }))
})
