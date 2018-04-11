/**
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
      dispatchExpandResults: () => { },
      dispatchCollapseGraph: () => { },
    }
    const render = shallow(<NavigableSearchResultsContainer {...props} />, { context, lifecycleExperimental: true })
    const lazyModules = render.find(LazyModuleComponent)
    assert.lengthOf(lazyModules, 1, 'There should be the results module')
    // Test corresponding module properties
    const lazyModuleProps = lazyModules.props()
    assert.equal(lazyModuleProps.appName, props.appName, 'App name should be correctly reported')
    assert.equal(lazyModuleProps.project, props.project, 'Project should be correctly reported')
    assert.isOk(lazyModuleProps.module, 'There should be the lazy module configuration')
    assert.equal(lazyModuleProps.module.description, 'search.graph.results.title.without.tag', 'As there is no tag, root description label should be provided')
    assert.lengthOf(lazyModuleProps.module.conf.initialContextTags, 0, 'No tag should be reported')
  })
  it('should handle search tags changes', () => {
    let spiedExpandResultsCount = 0
    let spiedCollapseGraphCount = 0
    const props = {
      appName: 'any',
      project: 'any',
      type: 'any',
      moduleConf: {},
      searchTag: {
        type: TagTypes.WORD,
        data: 'unemobilette',
      },
      dispatchExpandResults: () => { spiedExpandResultsCount += 1 },
      dispatchCollapseGraph: () => { spiedCollapseGraphCount += 1 },
    }
    const render = shallow(<NavigableSearchResultsContainer {...props} />, { context, lifecycleExperimental: true })
    assert.equal(spiedExpandResultsCount, 1, '(1) As there is a new selected tag, results should get expanded...')
    assert.equal(spiedCollapseGraphCount, 1, '(1) ...and graph collapsed')

    let lazyModules = render.find(LazyModuleComponent)
    assert.lengthOf(lazyModules, 1, 'There should be one lazy module for results')
    // Test corresponding module properties
    let lazyModuleProps = lazyModules.props()
    assert.equal(lazyModuleProps.appName, props.appName, 'App name should be correctly reported')
    assert.equal(lazyModuleProps.project, props.project, 'Propject should be correctly reported')
    assert.isOk(lazyModuleProps.module, 'There should be the lazy module configuration')

    let { module } = lazyModules.props()
    assert.equal(module.type, modulesManager.AllDynamicModuleTypes.SEARCH_RESULTS, 'The right module type should be configured')
    assert.isNotOk(module.description, 'As there is a tag, root description label should not be provided')

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
    assert.equal(spiedExpandResultsCount, 2, '(2) As there is a new selected tag, results should get expanded...')
    assert.equal(spiedCollapseGraphCount, 2, '(2) ...and graph collapsed')
    lazyModules = render.find(LazyModuleComponent)
    assert.lengthOf(lazyModules, 1, 'There should be one lazy module for results')

    // Test corresponding module properties
    lazyModuleProps = lazyModules.props()
    assert.equal(lazyModuleProps.appName, props.appName, 'App name should be correctly reported')
    assert.equal(lazyModuleProps.project, props.project, 'Propject should be correctly reported')

    module = lazyModules.props().module
    assert.equal(module.type, modulesManager.AllDynamicModuleTypes.SEARCH_RESULTS, 'The right module type should be configured')
    assert.isNotOk(module.description, 'As there is a tag, root description label should not be provided')

    conf = module.conf
    assert.lengthOf(conf.initialContextTags, 1, 'The tag should be reported to search results tag')
    assert.deepEqual(conf.initialContextTags[0], {
      type: TagTypes.DATASET,
      label: 'dslabel',
      searchKey: 'URN:dataset1',
    }, 'The right tag should be provided')
  })
})
