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
import { OSConfigurationFormContainer } from '../../src/containers/OSConfigurationFormContainer'
import { OSCrawlerConfigurationContainer } from '../../src/containers/OSCrawlerConfigurationContainer'
import { OSQueryConfigurationContainer } from '../../src/containers/OSQueryConfigurationContainer'
import { OSResultsConfigurationContainer } from '../../src/containers/OSResultsConfigurationContainer'

const context = buildTestContext()
const PATHS = {
  CRAWLER: 'opensearch/create/crawler',
  QUERY: 'opensearch/create/query',
  RESULTS: 'opensearch/create/results',
}

describe('[ADMIN DATA DATASOURCE MANAGEMENT] Testing OSConfigurationFormContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(OSConfigurationFormContainer)
  })

  it('Render the crawler form', () => {
    const props = {
      route: { path: PATHS.CRAWLER },
      params: { project: '1' },
    }

    const wrapper = shallow(<OSConfigurationFormContainer {...props} />, { context })
    assert.equal(wrapper.length, 1, 'The container should be rendered')

    assert.equal(wrapper.find(OSCrawlerConfigurationContainer).length, 1, 'Should render OSCrawlerConfigurationContainer')
  })

  it('Render the query form', () => {
    const props = {
      route: { path: PATHS.QUERY },
      params: { project: '1' },
    }

    const wrapper = shallow(<OSConfigurationFormContainer {...props} />, { context })
    assert.equal(wrapper.length, 1, 'The container should be rendered')

    assert.equal(wrapper.find(OSQueryConfigurationContainer).length, 1, 'Should render OSQueryConfigurationContainer')
  })

  it('Render the results form', () => {
    const props = {
      route: { path: PATHS.RESULTS },
      params: { project: '1' },
    }

    const wrapper = shallow(<OSConfigurationFormContainer {...props} />, { context })
    assert.equal(wrapper.length, 1, 'The container should be rendered')

    assert.equal(wrapper.find(OSResultsConfigurationContainer).length, 1, 'Should render OSResultsConfigurationContainer')
  })
})
