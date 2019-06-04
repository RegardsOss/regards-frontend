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
 */
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { assert } from 'chai'
import { shallow } from 'enzyme'
import { OSCrawlerConfigurationContainer } from '../../../src/containers/opensearch/OSCrawlerConfigurationContainer'

const context = buildTestContext()

describe('[ADMIN DATA DATASOURCE MANAGEMENT] Testing OSCrawlerConfigurationContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(OSCrawlerConfigurationContainer)
  })

  it('Render properly', () => {
    const props = {
      params: { project: '1' },
      backUrl: '',
      nextUrl: '',
      onSubmit: () => {},
    }

    const wrapper = shallow(<OSCrawlerConfigurationContainer {...props} />, { context })
    assert.equal(wrapper.length, 1, 'The container should be rendered')
  })
})
