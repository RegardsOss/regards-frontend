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
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { UserModuleContainer } from '../../../src/containers/user/UserModuleContainer'
import DescriptionProviderContainer from '../../../src/containers/user/DescriptionProviderContainer'
import SearchGraph from '../../../src/components/user/SearchGraph'
import styles from '../../../src/styles/styles'
import { configuration1 } from '../../dumps/configuration.dump'

const context = buildTestContext(styles)

describe('[Search Graph] Testing UserModuleContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(UserModuleContainer)
  })
  it('should render correctly', () => {
    const props = {
      // supplied by LazyModuleComponent
      appName: 'any',
      project: 'any',
      type: 'any',
      moduleConf: configuration1,
      // from map state to props
      selectionPath: [],
      selectedDataset: null,
      attributeModels: {},
      moduleCollapsed: false,
      authentication: null,
      fetchCollections: () => { },
      fetchDatasets: () => { },
      dispatchClearLevelSelection: () => { },
      dispatchLevelDataLoaded: () => { },
      dispatchSetModuleCollapsed: () => { },
    }
    const enzymeWrapper = shallow(<UserModuleContainer {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(SearchGraph), 1, 'The corresponding component should be rendered')
    assert.lengthOf(enzymeWrapper.find(DescriptionProviderContainer), 1, 'There should be the description provider HOC')
  })
})
