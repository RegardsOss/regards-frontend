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
import { DownloadButton } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import DownloadOrdersCSVSummaryComponent from '../../../../src/components/orders/options/DownloadOrdersCSVSummaryComponent'
import styles from '../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test DownloadOrdersCSVSummaryComponent
 * @author Raphaël Mechali
 */
describe('[Order Common] Testing DownloadOrdersCSVSummaryComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DownloadOrdersCSVSummaryComponent)
  })
  it('should render correctly', () => {
    const props = {
      link: 'http://myLink',
    }
    const enzymeWrapper = shallow(<DownloadOrdersCSVSummaryComponent {...props} />, { context })
    const downloadButton = enzymeWrapper.find(DownloadButton)
    assert.lengthOf(downloadButton, 1)
    assert.equal(downloadButton.props().downloadURL, props.link)
  })
})
