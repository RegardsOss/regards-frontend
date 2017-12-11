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
import SearchResultsConfigurationComponent from '../../src/components/admin/SearchResultsConfigurationComponent'
import { AdminContainer } from '../../src/containers/AdminContainer'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Search Results] Testing AdminContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AdminContainer)
  })
  it('should render properly', () => {
    const props = {
      appName: 'any',
      project: 'any',
      adminForm: {
        changeField: () => { },
        form: {},
      },
      moduleConf: {},
      attributeModels: {},
      fetchAllDataobjectsAttributes: () => { },
      fetchAllDatasetModelsAttributes: () => { },
    }
    const enzymeWrapper = shallow(<AdminContainer {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(SearchResultsConfigurationComponent), 0, 'While loading the component should not be rendered')
    enzymeWrapper.instance().setState(
      {
        attributesFetching: false,
        datasetAttributesFetching: false,
      })
    assert.lengthOf(enzymeWrapper.find(SearchResultsConfigurationComponent), 1, 'After loading, the corresponding component should be rendered')
  })
})
