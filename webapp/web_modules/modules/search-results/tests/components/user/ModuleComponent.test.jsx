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
import ModuleComponent from '../../../src/components/user/ModuleComponent'
import SearchResultsContainer from '../../../src/containers/user/results/SearchResultsContainer'
import FeedbackDisplayContainer from '../../../src/containers/user/feedback/FeedbackDisplayContainer'
import styles from '../../../src/styles/styles'
import { DISPLAY_MODE_VALUES } from '../../../src/definitions/DisplayModeEnum'

const context = buildTestContext(styles)

describe('[Search Results] Testing ModuleComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ModuleComponent)
  })
  it('should render properly', () => {
    const props = {
      appName: 'hello.app',
      project: 'say-hello',
      type: 'any',
      moduleConf: {
        enableFacettes: true,
        enableDownload: true,
        enableQuicklooks: false,
        displayMode: DISPLAY_MODE_VALUES.DISPLAY_DATA_DATASET,
        attributes: [],
        attributesRegroupements: [],
        attributesQuicklook: [],
        attributeModels: {},
        expanded: true,
        displayConf: {},
      },

      facettesQuery: '',
      searchQuery: 'kikikisonlessnorki?',
    }
    const enzymeWrapper = shallow(<ModuleComponent {...props} />, { context })

    assert.lengthOf(enzymeWrapper.find(SearchResultsContainer), 1, 'There should be the results display container')
    assert.lengthOf(enzymeWrapper.find(FeedbackDisplayContainer), 1, 'There should be add to basket feedback container')
  })
})
