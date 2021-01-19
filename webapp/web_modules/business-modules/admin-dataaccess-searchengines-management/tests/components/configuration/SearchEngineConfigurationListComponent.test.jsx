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
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { PageableInfiniteTableContainer } from '@regardsoss/components'
import { SearchEngineConfigurationListComponent } from '../../../src/components/configuration/SearchEngineConfigurationListComponent'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test SearchEngineConfigurationListComponent
* @author Sébastien Binda
*/
describe('[ADMIN SEARCH ENGINES] Testing SearchEngineConfigurationListComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SearchEngineConfigurationListComponent)
  })
  it('should render correctly', () => {
    const props = {
      onBack: () => { },
      onAddNewConf: () => { },
      onDelete: () => { },
      onEdit: () => { },
      fetchPage: () => { },
      isLoading: false,
      resultsCount: 2,
    }
    const enzymeWrapper = shallow(<SearchEngineConfigurationListComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(PageableInfiniteTableContainer), 1, 'The component should display a infinite table')
  })
})
