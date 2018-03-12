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
import { modulesManager, LazyModuleComponent } from '@regardsoss/modules'
import { NavigableSearchResultsContainer } from '../../../src/containers/user/NavigableSearchResultsContainer'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Search Graph] Testing NavigableSearchResultsContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(NavigableSearchResultsContainer)
  })
  it('should render properly without any search tag', () => {
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
  it('should handle search tags changes', () => {
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
    // Test corresponding module properties
    let lazyModuleProps = lazyModules.props()
    assert.equal(lazyModuleProps.appName, props.appName, 'App name should be correctly reported')
    assert.equal(lazyModuleProps.project, props.project, 'Propject should be correctly reported')

    let { module } = lazyModules.props()
    assert.equal(module.type, modulesManager.AllDynamicModuleTypes.SEARCH_RESULTS, 'The right module type should be configured')

    let { conf } = module
    assert.lengthOf(conf.initialContextTags, 1, 'The tag should be reported to search results tag')
    assert.deepEqual(conf.initialContextTags[0], {
      type: TagTypes.WORD,
      label: 'unemobilette',
      searchKey: 'unemobilette',
    }, 'The right tag should be provided')

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

    // Test corresponding module properties
    lazyModuleProps = lazyModules.props()
    assert.equal(lazyModuleProps.appName, props.appName, 'App name should be correctly reported')
    assert.equal(lazyModuleProps.project, props.project, 'Propject should be correctly reported')

    module = lazyModules.props().module
    assert.equal(module.type, modulesManager.AllDynamicModuleTypes.SEARCH_RESULTS, 'The right module type should be configured')

    conf = module.conf
    assert.lengthOf(conf.initialContextTags, 1, 'The tag should be reported to search results tag')
    assert.deepEqual(conf.initialContextTags[0], {
      type: TagTypes.DATASET,
      label: 'dslabel',
      searchKey: 'URN:dataset1',
    }, 'The right tag should be provided')
  })
})
