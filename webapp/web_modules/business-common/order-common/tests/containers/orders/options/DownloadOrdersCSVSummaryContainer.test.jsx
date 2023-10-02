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
import DownloadOrdersCSVSummaryComponent from '../../../../src/components/orders/options/DownloadOrdersCSVSummaryComponent'
import { DownloadOrdersCSVSummaryContainer } from '../../../../src/containers/orders/options/DownloadOrdersCSVSummaryContainer'
import styles from '../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test DownloadOrdersCSVSummaryContainer
 * @author Raphaël Mechali
 */
describe('[Order Common] Testing DownloadOrdersCSVSummaryContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DownloadOrdersCSVSummaryContainer)
  })
  it('should render correctly', () => {
    const props = {
      authentication: {
        authenticateDate: 1523260189880,
        result: {
          access_token: 'PIZZA!',
          token_type: 'bearer',
          expires_in: 43199,
          scope: 'project1',
          sub: 'michou.monchou@c-s.fr',
          role: 'PROJECT_ADMIN',
          tenant: 'project1',
          jti: 'fb0f95b1-4b4c-4881-a13d-344dc580ae09',
        },
      },
      downloadCSV: () => { },
      throwError: () => { },
    }
    const enzymeWrapper = shallow(<DownloadOrdersCSVSummaryContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(DownloadOrdersCSVSummaryComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      onDownloadCSV: enzymeWrapper.instance().onDownloadCSV,
    }, 'Component properties should be correctly reported')
  })
})
