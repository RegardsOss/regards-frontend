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
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { DatasetServicesContainer } from '../../../src/containers/user/DatasetServicesContainer'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Search Results] Testing ServicesContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DatasetServicesContainer)
  })
  it('should render properly loading', () => {
    const props = {
      selectedDatasetIpId: 'pipo1',
      isLoading: true,
      oneDatasetBusinessServices: null,
      oneDataobjetBusinessServices: null,
      manyDataobjectsBusinessServices: null,
      uiServices: null,
      fetchOneDatasetBusinessServices: () => { },
      fetchManyDataobjectsBusinessServices: () => { },
      fetchUIServices: () => { },
      publishDatasetServices: () => { },
    }
    shallow(<DatasetServicesContainer {...props} />, { context })
  })

  it('should render properly loaded', () => {
    const props = {
      selectedDatasetIpId: 'pipo1',
      isLoading: false,
      oneDatasetBusinessServices: {},
      oneDataobjetBusinessServices: {},
      manyDataobjectsBusinessServices: {},
      uiServices: {},
      fetchOneDatasetBusinessServices: () => { },
      fetchOneDataobjetBusinessServices: () => { },
      fetchManyDataobjectsBusinessServices: () => { },
      fetchUIServices: () => { },
      publishDatasetServices: () => { },
    }
    shallow(<DatasetServicesContainer {...props} />, { context })
  })
})
