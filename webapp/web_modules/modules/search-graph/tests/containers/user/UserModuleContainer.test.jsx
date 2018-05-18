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
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { UserModuleContainer } from '../../../src/containers/user/UserModuleContainer'
import DescriptionContainer from '../../../src/containers/user/DescriptionContainer'
import SearchGraph from '../../../src/components/user/SearchGraph'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Search Graph] Testing UserModuleContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(UserModuleContainer)
  })
  it('should render properly', () => {
    const props = {
      // supplied by LazyModuleComponent
      appName: 'any',
      project: 'any',
      type: 'any',
      moduleConf: {}, // Module configuration
      // from map state to props
      selectionPath: [],
      selectedDataset: null,
      attributeModels: {},
      moduleCollapsed: false,
      authentication: null,
      fetchAttributeModels: () => { },
      fetchCollections: () => { },
      fetchDatasets: () => { },
      dispatchClearLevelSelection: () => { },
      dispatchLevelDataLoaded: () => { },
      dispatchSetModuleCollapsed: () => { },
    }
    const enzymeWrapper = shallow(<UserModuleContainer {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(SearchGraph), 1, 'The corresponding component should be rendered')
    assert.lengthOf(enzymeWrapper.find(DescriptionContainer), 1, 'The module should render the description container')
  })
})
