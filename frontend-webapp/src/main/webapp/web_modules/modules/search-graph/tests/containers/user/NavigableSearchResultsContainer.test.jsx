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
import { TagTypes } from '@regardsoss/domain/catalog'
import { ENTITY_TYPES_ENUM } from '@regardsoss/domain/dam'
import { LazyModuleComponent } from '@regardsoss/modules'
import { NavigableSearchResultsContainer } from '../../../src/containers/user/NavigableSearchResultsContainer'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Search Graph] Testing NavigableSearchResultsContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(NavigableSearchResultsContainer)
  })
  it('should render properly without the search query', () => {
    const props = {
      appName: 'any',
      project: 'any',
      type: 'any',
      searchQuery: null, // search query if a dataset is selected
      // Module configuration
      moduleConf: {},
      searchTag: null,
    }
    const render = shallow(<NavigableSearchResultsContainer {...props} />, { context, lifecycleExperimental: true })
    const lazyModules = render.find(LazyModuleComponent)
    assert.lengthOf(lazyModules, 0, 'There should be no lazy module when there is no tag')
    // there should be no initial search query
  })
  it('should handle search query changes', () => {
    const props = {
      appName: 'any',
      project: 'any',
      type: 'any',
      moduleConf: {},
      searchTag: {
        type: TagTypes.WORD,
        data: 'unemobilette',
      },
    }
    const render = shallow(<NavigableSearchResultsContainer {...props} />, { context, lifecycleExperimental: true })
    let lazyModules = render.find(LazyModuleComponent)
    assert.lengthOf(lazyModules, 1, 'There should be one lazy module for results')
    assert.equal(lazyModules.props().module.conf.searchQuery, 'tags:unemobilette', 'The configured search query should be provided for tag')
    assert.isNull(lazyModules.props().module.conf.singleDatasetIpId, 'When searching anything but a Dataset, there should be no single dataset IP ID in results')
    assert.equal(lazyModules.props().module.description, 'unemobilette', 'The breadcrumb should worth first search label')

    render.setProps({
      searchTag: {
        type: TagTypes.DATASET,
        data: {
          content: {
            ipId: 'URN:dataset1',
            label: 'dslabel',
            entityType: ENTITY_TYPES_ENUM.DATASET,
            tags: [],
          },
        },
      },
    })
    lazyModules = render.find(LazyModuleComponent)
    assert.lengthOf(lazyModules, 1, 'There should be one lazy module for results')
    assert.equal(lazyModules.props().module.conf.searchQuery, 'tags:"URN:dataset1"', 'The configured search query should be provider AND ESCAPED for dataset')
    assert.equal(lazyModules.props().module.conf.singleDatasetIpId, 'URN:dataset1', 'When searching a dataset tag, it should be prvided as single dataset IP ID in results')
    assert.equal(lazyModules.props().module.description, 'dslabel', 'The breadcrumb should worth second search label')
  })
})
