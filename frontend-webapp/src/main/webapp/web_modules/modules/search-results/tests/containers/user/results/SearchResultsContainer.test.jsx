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
import { DamDomain } from '@regardsoss/domain'
import { SearchResultsContainer } from '../../../../src/containers/user/results/SearchResultsContainer'
import PluginServicesContainer from '../../../../src/containers/user/results/PluginServicesContainer'
import OrderCartContainer from '../../../../src/containers/user/results/OrderCartContainer'
import SearchResultsComponent from '../../../../src/components/user/results/SearchResultsComponent'
import { TableDisplayModeEnum } from '../../../../src/models/navigation/TableDisplayModeEnum'
import styles from '../../../../src/styles/styles'
import { DISPLAY_MODE_VALUES } from '../../../../src/definitions/DisplayModeEnum'

const context = buildTestContext(styles)

describe('[Search Results] Testing SearchResultsContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SearchResultsContainer)
  })
  it('should render properly', () => {
    const props = {
      searchQuery: 'spacy=abit',
      enableFacettes: true,
      enableQuicklooks: false,
      facettesQuery: 'facettes=condiments',
      displayConf: {},
      attributesConf: [],
      attributesRegroupementsConf: [],
      datasetAttributesConf: [],
      attributeModels: {},
      facets: [],
      isFetching: false,
      resultsCount: 22,
      viewObjectType: DamDomain.ENTITY_TYPES_ENUM.DATA,
      tableDisplayMode: TableDisplayModeEnum.LIST,
      levels: [],
      enableDownload: true,
      displayMode: DISPLAY_MODE_VALUES.DISPLAY_DATA_DATASET,
      dispatchChangeViewObjectType: () => { },
      dispatchChangeTableDisplayMode: () => { },
      dispatchSetEntityAsTag: () => { },
    }
    const enzymeWrapper = shallow(<SearchResultsContainer {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(PluginServicesContainer), 1, 'It should render the service container')
    assert.lengthOf(enzymeWrapper.find(OrderCartContainer), 1, 'It should render order cart enabling container')
    assert.lengthOf(enzymeWrapper.find(SearchResultsComponent), 1, 'It should render a search results component')
  })
})
