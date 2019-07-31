/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { UIDomain, DamDomain } from '@regardsoss/domain'
import { ContextManager } from '../../../../src/containers/user/context/ContextManager'
import { ContextInitializationHelper } from '../../../../src/containers/user/context/ContextInitializationHelper'
import { CriterionBuilder } from '../../../../src/definitions/CriterionBuilder'
import styles from '../../../../src/styles'
import { URLContextHelper } from '../../../../src/containers/user/context/URLContextHelper'
import { configuration as dataConfiguration } from '../../../dumps/data.configuration.dump'
import { dataContext } from '../../../dumps/data.context.dump'
import { attributes } from '../../../dumps/attributes.dump'
import {
  dataEntity, datasetEntity, anotherDataEntity, anotherDatasetEntity, allEntities,
} from '../../../dumps/entities.dump'

const router = require('react-router')

const context = buildTestContext(styles)

/**
 * Test ContextManager
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing ContextManager', () => {
  let currentLocation = {}
  before(() => {
    testSuiteHelpers.before()
    router.browserHistory = {
      getCurrentLocation: () => currentLocation,
      replace: (newLocation) => { currentLocation = newLocation },
    }
  })
  after(() => {
    testSuiteHelpers.after()
    delete router.browserHistory
  })

  it('should exists', () => {
    assert.isDefined(ContextManager)
  })
  it('should attempt initial context resolution, preserving initial context', () => {
    // replace resolve context method to spy it
    const savedResolveContext = URLContextHelper.resolveContextFromURL
    const spiedContextResolution = {
      initContext: null,
      fetchEntity: null,
      builtPromise: null,
    }
    URLContextHelper.resolveContextFromURL = (initContext, fetchEntity) => {
      spiedContextResolution.initContext = initContext
      spiedContextResolution.fetchEntity = fetchEntity
      spiedContextResolution.builtPromise = savedResolveContext(initContext, fetchEntity)
      return spiedContextResolution.builtPromise
    }

    // set up an URL context to be resolved
    currentLocation = {
      pathname: 'www.test.com/test',
      query: {
        [URLContextHelper.MODULE_URL_PARAMETERS[0].name]: UIDomain.RESULTS_TABS_ENUM.DESCRIPTION,
        [URLContextHelper.MODULE_URL_PARAMETERS[1].name]: DamDomain.ENTITY_TYPES_ENUM.DATASET,
        [URLContextHelper.MODULE_URL_PARAMETERS[2].name]: UIDomain.RESULTS_VIEW_MODES_ENUM.LIST,
        [URLContextHelper.MODULE_URL_PARAMETERS[3].name]: anotherDatasetEntity.content.id,
        [URLContextHelper.MODULE_URL_PARAMETERS[4].name]: anotherDataEntity.content.id,
        [URLContextHelper.MODULE_URL_PARAMETERS[5].name]: 'coffee',
        [URLContextHelper.MODULE_URL_PARAMETERS[6].name]: UIDomain.RESULTS_VIEW_MODES_ENUM.QUICKLOOK,
        [URLContextHelper.MODULE_URL_PARAMETERS[7].name]: datasetEntity.content.id,
      },
    }

    // spy update results context
    const spiedUpdateResultsContext = {
      moduleId: null,
      newContext: null,
    }

    // spy feth entity
    const spiedFetchEntity = {
      entitiesId: [],
    }

    const props = {
      moduleId: 1,
      configuration: dataConfiguration,
      attributeModels: attributes,
      children: <div id="test-div" />,
      authentication: {
        isFetching: false,
        // initially not authentified
      },
      fetchEntity: (entityId) => {
        spiedFetchEntity.entitiesId.push(entityId)
        // resolve on matching dump entity
        return new Promise(resolve => resolve({
          payload: allEntities.find(({ content: { id } }) => id === entityId) || { error: true },
        }))
      },
      updateResultsContext: (id, newContext) => {
        spiedUpdateResultsContext.moduleId = id
        spiedUpdateResultsContext.newContext = newContext
      },
    }
    // 1 - Mount component and check initial resolution
    const enzymeWrapper = shallow(<ContextManager {...props} />, { context })
    assert.isFalse(enzymeWrapper.state().initialized, 'Component should not yet be initialized')
    assert.lengthOf(enzymeWrapper.findWhere(n => n.props().id === 'test-div'), 0, 'Children should not be rendered while initializing')

    assert.deepEqual(spiedContextResolution.initContext, dataContext, 'Initial context should have been resolved and transferred')
    assert.equal(spiedContextResolution.fetchEntity, props.fetchEntity, 'fetchEntity should be correctly provided')
    assert.isNotNull(spiedContextResolution.builtPromise, 'There should be the built resolution promise')

    // Restore original method
    URLContextHelper.resolveContextFromURL = savedResolveContext

    // 2 - when promise resolves, check context is resolved and initialized
    return spiedContextResolution.builtPromise.then(() => {
      // check all entities were fetched
      assert.include(spiedFetchEntity.entitiesId, anotherDatasetEntity.content.id, 'The entity anotherDatasetEntity should have been fetched to resolve URL')
      assert.include(spiedFetchEntity.entitiesId, anotherDataEntity.content.id, 'The entity anotherDataEntity should have been fetched to resolve URL')
      assert.include(spiedFetchEntity.entitiesId, datasetEntity.content.id, 'The entity datasetEntity should have been fetched to resolve URL')
      // check state wasd initialized
      assert.equal(spiedUpdateResultsContext.moduleId, props.moduleId, 'Update results context should have been called with the right module ID')
      assert.isNotNull(spiedUpdateResultsContext.newContext, 'Update results context should have been called for new context')
      assert.isTrue(enzymeWrapper.state().initialized, 'Component should now be initialized')
      assert.lengthOf(enzymeWrapper.findWhere(n => n.props().id === 'test-div'), 1, 'Children should be rendered after initialization')
      assert.deepEqual(spiedUpdateResultsContext.newContext, UIDomain.ResultsContextHelper.deepMerge(dataContext, {
        selectedTab: UIDomain.RESULTS_TABS_ENUM.DESCRIPTION,
        tabs: {
          [UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS]: {
            selectedType: DamDomain.ENTITY_TYPES_ENUM.DATASET,
            types: {
              [DamDomain.ENTITY_TYPES_ENUM.DATASET]: {
                selectedMode: UIDomain.RESULTS_VIEW_MODES_ENUM.LIST,
              },
            },
            criteria: {
              tagsFiltering: [CriterionBuilder.buildEntityTagCriterion(anotherDatasetEntity)],
            },
          },
          [UIDomain.RESULTS_TABS_ENUM.DESCRIPTION]: {
            descriptionPath: [anotherDataEntity],
          },
          [UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS]: {
            selectedType: DamDomain.ENTITY_TYPES_ENUM.DATA,
            types: {
              [DamDomain.ENTITY_TYPES_ENUM.DATA]: {
                selectedMode: UIDomain.RESULTS_VIEW_MODES_ENUM.QUICKLOOK,
              },
            },
            criteria: {
              contextTags: [CriterionBuilder.buildWordTagCriterion('coffee')],
              tagsFiltering: [CriterionBuilder.buildEntityTagCriterion(datasetEntity)],
            },
          },
        },
      }), 'State should be correctly initialized from configuration and URL')
    }).catch(err => assert.fail(`Failed with error ${err}`))
  })
  it('should forbid incomplete description state in inital context', () => {
    const savedResolveContext = URLContextHelper.resolveContextFromURL
    const spiedContextResolution = {
      builtPromise: null,
    }
    URLContextHelper.resolveContextFromURL = (initContext, fetchEntity) => {
      spiedContextResolution.builtPromise = savedResolveContext(initContext, fetchEntity)
      return spiedContextResolution.builtPromise
    }
    // set up an URL context to be resolved: in description tab but without description entities
    currentLocation = {
      pathname: 'www.test.com/test',
      query: {
        [URLContextHelper.MODULE_URL_PARAMETERS[0].name]: UIDomain.RESULTS_TABS_ENUM.DESCRIPTION,
        [URLContextHelper.MODULE_URL_PARAMETERS[1].name]: DamDomain.ENTITY_TYPES_ENUM.DATA,
        [URLContextHelper.MODULE_URL_PARAMETERS[2].name]: UIDomain.RESULTS_VIEW_MODES_ENUM.TABLE,
        [URLContextHelper.MODULE_URL_PARAMETERS[4].name]: 'URN:DATA:unresolved',
      },
    }
    const spiedUpdateResultsContext = {
      newContext: null,
    }
    const props = {
      moduleId: 1,
      configuration: dataConfiguration,
      attributeModels: attributes,
      children: <div id="test-div" />,
      authentication: {
        isFetching: false,
        // initially not authentified
      },
      // resolve on matching dump entity
      fetchEntity: entityId => new Promise(resolve => resolve({
        payload: allEntities.find(({ content: { id } }) => id === entityId) || { error: true },
      })),
      updateResultsContext: (id, newContext) => {
        spiedUpdateResultsContext.newContext = newContext
      },
    }
    // Mount component and check initial resolution fallback on main results
    shallow(<ContextManager {...props} />, { context })
    assert.isNotNull(spiedContextResolution.builtPromise, 'There should be the built resolution promise')
    // Restore original method
    URLContextHelper.resolveContextFromURL = savedResolveContext
    return spiedContextResolution.builtPromise.then(() => {
      assert.deepEqual(spiedUpdateResultsContext.newContext, UIDomain.ResultsContextHelper.deepMerge(dataContext, {
        selectedTab: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
        tabs: {
          [UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS]: {
            selectedType: DamDomain.ENTITY_TYPES_ENUM.DATA,
            types: {
              [DamDomain.ENTITY_TYPES_ENUM.DATA]: {
                selectedMode: UIDomain.RESULTS_VIEW_MODES_ENUM.TABLE,
              },
            },
          },
        },
      }), 'State should be correctly initialized from configuration and URL')
    }).catch(err => assert.fail(`Failed with error ${err}`))
  })
  it('should forbid incomplete tag results state in inital context', () => {
    const savedResolveContext = URLContextHelper.resolveContextFromURL
    const spiedContextResolution = {
      builtPromise: null,
    }
    URLContextHelper.resolveContextFromURL = (initContext, fetchEntity) => {
      spiedContextResolution.builtPromise = savedResolveContext(initContext, fetchEntity)
      return spiedContextResolution.builtPromise
    }
    // set up an URL context to be resolved: in tag tab but without tag context
    currentLocation = {
      pathname: 'www.test.com/test',
      query: {
        [URLContextHelper.MODULE_URL_PARAMETERS[0].name]: UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS,
        [URLContextHelper.MODULE_URL_PARAMETERS[1].name]: DamDomain.ENTITY_TYPES_ENUM.DATASET,
        [URLContextHelper.MODULE_URL_PARAMETERS[2].name]: UIDomain.RESULTS_VIEW_MODES_ENUM.TABLE,
      },
    }
    const spiedUpdateResultsContext = {
      newContext: null,
    }
    const props = {
      moduleId: 1,
      configuration: dataConfiguration,
      attributeModels: attributes,
      children: <div id="test-div" />,
      authentication: {
        isFetching: false,
        // initially not authentified
      },
      // resolve on matching dump entity
      fetchEntity: entityId => new Promise(resolve => resolve({
        payload: allEntities.find(({ content: { id } }) => id === entityId) || { error: true },
      })),
      updateResultsContext: (id, newContext) => {
        spiedUpdateResultsContext.newContext = newContext
      },
    }
    // Mount component and check initial resolution fallback on main results
    shallow(<ContextManager {...props} />, { context })
    assert.isNotNull(spiedContextResolution.builtPromise, 'There should be the built resolution promise')
    // Restore original method
    URLContextHelper.resolveContextFromURL = savedResolveContext
    return spiedContextResolution.builtPromise.then(() => {
      assert.deepEqual(spiedUpdateResultsContext.newContext, UIDomain.ResultsContextHelper.deepMerge(dataContext, {
        selectedTab: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
        tabs: {
          [UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS]: {
            selectedType: DamDomain.ENTITY_TYPES_ENUM.DATASET,
            types: {
              [DamDomain.ENTITY_TYPES_ENUM.DATASET]: {
                selectedMode: UIDomain.RESULTS_VIEW_MODES_ENUM.TABLE,
              },
            },
          },
        },
      }), 'State should be correctly initialized from configuration and URL')
    }).catch(err => assert.fail(`Failed with error ${err}`))
  })
  it('should initialize to configuration with empty URL', () => {
    const savedResolveContext = URLContextHelper.resolveContextFromURL
    const spiedContextResolution = {
      builtPromise: null,
    }
    URLContextHelper.resolveContextFromURL = (initContext, fetchEntity) => {
      spiedContextResolution.builtPromise = savedResolveContext(initContext, fetchEntity)
      return spiedContextResolution.builtPromise
    }
    // set up an URL context to be resolved: in tag tab but without tag context
    currentLocation = {
      pathname: 'www.test.com/test',
      query: { },
    }
    const spiedUpdateResultsContext = {
      newContext: null,
    }
    const props = {
      moduleId: 1,
      configuration: dataConfiguration,
      attributeModels: attributes,
      children: <div id="test-div" />,
      authentication: {
        isFetching: false,
        // initially not authentified
      },
      // resolve on matching dump entity
      fetchEntity: entityId => new Promise(resolve => resolve({
        payload: allEntities.find(({ content: { id } }) => id === entityId) || { error: true },
      })),
      updateResultsContext: (id, newContext) => {
        spiedUpdateResultsContext.newContext = newContext
      },
    }
    // Mount component and check initial resolution fallback on main results
    shallow(<ContextManager {...props} />, { context })
    assert.isNotNull(spiedContextResolution.builtPromise, 'There should be the built resolution promise')
    // Restore original method
    URLContextHelper.resolveContextFromURL = savedResolveContext
    return spiedContextResolution.builtPromise.then(() => {
      assert.deepEqual(spiedUpdateResultsContext.newContext, dataContext, 'State should be unchanged compared to configuration')
    }).catch(err => assert.fail(`Failed with error ${err}`))
  })
  it('should Update URL as context changes (bound from redux)', () => {
    const previousLocation = {
      pathname: 'www.test2.com/test2',
      query: { },
    }
    currentLocation = previousLocation
    const configurationContext = ContextInitializationHelper.buildDefaultResultsContext(dataConfiguration, attributes)
    const props = {
      moduleId: 1,
      configuration: dataConfiguration,
      attributeModels: attributes,
      children: <div id="test-div" />,
      authentication: {
        isFetching: false,
        // initially not authentified
      },
      resultsContext: configurationContext,
      fetchEntity: () => new Promise(resolve => resolve({ payload: { error: true } })),
      updateResultsContext: () => {},
    }
    const enzymeWrapper = shallow(<ContextManager {...props} />, { context })
    // Simulate initial resolution
    enzymeWrapper.instance().commitCoherentContext(dataConfiguration)

    // Check not updated yet
    assert.isTrue(previousLocation === currentLocation, 'Location reference should not have changed (no initial update!)')
    // 1 - simulate tag added in MAIN results and mode / view type change
    let nextContext = UIDomain.ResultsContextHelper.deepMerge(configurationContext, {
      tabs: {
        [UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS]: {
          selectedType: DamDomain.ENTITY_TYPES_ENUM.DATA,
          types: {
            [DamDomain.ENTITY_TYPES_ENUM.DATA]: {
              selectedMode: UIDomain.RESULTS_VIEW_MODES_ENUM.QUICKLOOK,
            },
          },
          criteria: {
            tagsFiltering: [CriterionBuilder.buildEntityTagCriterion(datasetEntity)],
          },
        },
      },
    })
    enzymeWrapper.setProps({
      ...props,
      resultsContext: nextContext,
    })
    assert.deepEqual(currentLocation, {
      pathname: 'www.test2.com/test2',
      query: {
        [URLContextHelper.MODULE_URL_PARAMETERS[0].name]: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
        [URLContextHelper.MODULE_URL_PARAMETERS[1].name]: DamDomain.ENTITY_TYPES_ENUM.DATA,
        [URLContextHelper.MODULE_URL_PARAMETERS[2].name]: UIDomain.RESULTS_VIEW_MODES_ENUM.QUICKLOOK,
        [URLContextHelper.MODULE_URL_PARAMETERS[3].name]: datasetEntity.content.id,
      },
    })

    // 2 - Remove tag, change type and mode
    nextContext = UIDomain.ResultsContextHelper.deepMerge(nextContext, {
      tabs: {
        [UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS]: {
          selectedType: DamDomain.ENTITY_TYPES_ENUM.DATASET,
          types: {
            [DamDomain.ENTITY_TYPES_ENUM.DATASET]: {
              selectedMode: UIDomain.RESULTS_VIEW_MODES_ENUM.TABLE,
            },
          },
          criteria: {
            tagsFiltering: [],
          },
        },
      },
    })
    enzymeWrapper.setProps({
      ...props,
      resultsContext: nextContext,
    })
    assert.deepEqual(currentLocation, {
      pathname: 'www.test2.com/test2',
      query: {
        [URLContextHelper.MODULE_URL_PARAMETERS[0].name]: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
        [URLContextHelper.MODULE_URL_PARAMETERS[1].name]: DamDomain.ENTITY_TYPES_ENUM.DATASET,
        [URLContextHelper.MODULE_URL_PARAMETERS[2].name]: UIDomain.RESULTS_VIEW_MODES_ENUM.TABLE,
      },
    })

    // 3 - Open description
    nextContext = UIDomain.ResultsContextHelper.deepMerge(nextContext, {
      selectedTab: UIDomain.RESULTS_TABS_ENUM.DESCRIPTION,
      tabs: {
        [UIDomain.RESULTS_TABS_ENUM.DESCRIPTION]: {
          descriptionPath: [datasetEntity, anotherDatasetEntity],
        },
      },
    })
    enzymeWrapper.setProps({
      ...props,
      resultsContext: nextContext,
    })
    assert.deepEqual(currentLocation, {
      pathname: 'www.test2.com/test2',
      query: {
        [URLContextHelper.MODULE_URL_PARAMETERS[0].name]: UIDomain.RESULTS_TABS_ENUM.DESCRIPTION,
        [URLContextHelper.MODULE_URL_PARAMETERS[1].name]: DamDomain.ENTITY_TYPES_ENUM.DATASET,
        [URLContextHelper.MODULE_URL_PARAMETERS[2].name]: UIDomain.RESULTS_VIEW_MODES_ENUM.TABLE,
        [URLContextHelper.MODULE_URL_PARAMETERS[4].name]: anotherDatasetEntity.content.id, // only last element
      },
    })

    // 4 - Open tag results
    nextContext = UIDomain.ResultsContextHelper.deepMerge(nextContext, {
      selectedTab: UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS,
      tabs: {
        [UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS]: {
          types: {
            [DamDomain.ENTITY_TYPES_ENUM.DATA]: {
              selectedMode: UIDomain.RESULTS_VIEW_MODES_ENUM.LIST,
            },
          },
          criteria: {
            contextTags: [CriterionBuilder.buildWordTagCriterion('coffee')],
            tagsFiltering: [CriterionBuilder.buildEntityTagCriterion(dataEntity)],
          },
        },
      },
    })
    enzymeWrapper.setProps({
      ...props,
      resultsContext: nextContext,
    })

    assert.deepEqual(currentLocation, {
      pathname: 'www.test2.com/test2',
      query: {
        [URLContextHelper.MODULE_URL_PARAMETERS[0].name]: UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS,
        [URLContextHelper.MODULE_URL_PARAMETERS[1].name]: DamDomain.ENTITY_TYPES_ENUM.DATASET,
        [URLContextHelper.MODULE_URL_PARAMETERS[2].name]: UIDomain.RESULTS_VIEW_MODES_ENUM.TABLE,
        [URLContextHelper.MODULE_URL_PARAMETERS[4].name]: anotherDatasetEntity.content.id, // only last element
        [URLContextHelper.MODULE_URL_PARAMETERS[5].name]: 'coffee',
        [URLContextHelper.MODULE_URL_PARAMETERS[6].name]: UIDomain.RESULTS_VIEW_MODES_ENUM.LIST,
        [URLContextHelper.MODULE_URL_PARAMETERS[7].name]: dataEntity.content.id,
      },
    })

    // 5 - Close tag results and description, back to main results
    nextContext = UIDomain.ResultsContextHelper.deepMerge(nextContext, {
      selectedTab: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
      tabs: {
        [UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS]: {
          criteria: {
            contextTags: [],
            tagsFiltering: [CriterionBuilder.buildEntityTagCriterion(dataEntity)],
          },
        },
        [UIDomain.RESULTS_TABS_ENUM.DESCRIPTION]: {
          descriptionPath: [],
        },
      },
    })
    enzymeWrapper.setProps({
      ...props,
      resultsContext: nextContext,
    })

    assert.deepEqual(currentLocation, {
      pathname: 'www.test2.com/test2',
      query: {
        [URLContextHelper.MODULE_URL_PARAMETERS[0].name]: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
        [URLContextHelper.MODULE_URL_PARAMETERS[1].name]: DamDomain.ENTITY_TYPES_ENUM.DATASET,
        [URLContextHelper.MODULE_URL_PARAMETERS[2].name]: UIDomain.RESULTS_VIEW_MODES_ENUM.TABLE,
      },
    })
  })
})
