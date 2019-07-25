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
import { ContextInitializationHelper } from '../../../../src/definitions/ContextInitializationHelper'
import { CriterionBuilder } from '../../../../src/definitions/CriterionBuilder'
import styles from '../../../../src/styles'
import { configuration as dataConfiguration } from '../../../dumps/data.configuration.dump'
import { configuration as documentConfiguration } from '../../../dumps/documents.configuration.dump'
import { attributes } from '../../../dumps/attributes.dump'
import { dataEntity, documentEntity, datasetEntity } from '../../../dumps/entities.dump'

const context = buildTestContext(styles)
const router = require('react-router')

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
  const testCases = [{
    label: 'with data configuration',
    moduleConf: dataConfiguration,
    initType: DamDomain.ENTITY_TYPES_ENUM.DATA,
    initMode: UIDomain.RESULTS_VIEW_MODES_ENUM.MAP,
    location: {
      pathname: 'www.test.com/test',
      query: {
        [ContextManager.MODULE_URL_PARAMETERS.VIEW_TYPE_PARAMETER]: DamDomain.ENTITY_TYPES_ENUM.DATA,
        [ContextManager.MODULE_URL_PARAMETERS.RESULTS_DISPLAY_MODE_PARAMETER]: UIDomain.RESULTS_VIEW_MODES_ENUM.MAP,
      // cannot test tags here (promise system is way harder to mock...)
      },
    },
    levels: [
      CriterionBuilder.buildEntityTagCriterion(dataEntity),
      { type: UIDomain.ResultsContextConstants.DESCRIPTION_LEVEL, entity: documentEntity },
      CriterionBuilder.buildWordTagCriterion('coffee'),
      CriterionBuilder.buildEntityTagCriterion(datasetEntity),
    ],
  }, {
    label: 'with documents configuration',
    moduleConf: documentConfiguration,
    initType: DamDomain.ENTITY_TYPES_ENUM.DOCUMENT,
    initMode: UIDomain.RESULTS_VIEW_MODES_ENUM.LIST,
    location: {
      pathname: 'www.test2.com/test2',
      query: {
        [ContextManager.MODULE_URL_PARAMETERS.VIEW_TYPE_PARAMETER]: DamDomain.ENTITY_TYPES_ENUM.DOCUMENT,
        [ContextManager.MODULE_URL_PARAMETERS.RESULTS_DISPLAY_MODE_PARAMETER]: UIDomain.RESULTS_VIEW_MODES_ENUM.LIST,
      // cannot test tags here (promise system is way harder to mock...)
      },
    },
    levels: [
      CriterionBuilder.buildEntityTagCriterion(documentEntity),
      CriterionBuilder.buildWordTagCriterion('tea'),
      { type: UIDomain.ResultsContextConstants.DESCRIPTION_LEVEL, entity: dataEntity },
    ],
  }]
  testCases.forEach(({
    label, moduleConf, location, levels, initType, initMode,
  }) => it(`should render correctly ${label}`, () => {
    currentLocation = location // init location to be returned by the browser history
    let spiedResultsContext = null
    let spiedModuleId = null
    const props = {
      moduleId: 1,
      configuration: moduleConf,
      attributeModels: attributes,
      children: <div id="test-div" />,
      authentication: {
        isFetching: false,
        // initially not authentified
      },
      fetchEntity: () => {},
      updateResultsContext: (id, newContext) => {
        spiedModuleId = id
        spiedResultsContext = newContext
      },
    }
    const enzymeWrapper = shallow(<ContextManager {...props} />, { context })
    assert.isFalse(enzymeWrapper.state().initialized, 'Component should not yet be initialized')

    // 1 - Not initialized yet: check component is not rendered
    assert.lengthOf(enzymeWrapper.findWhere(n => n.props().id === 'test-div'), 0, 'Children should not be rendered while initializing')

    // 2 - Simulate Tags resolution and check render
    // Note due to asynchronous componentDidMount system, it is pretty hard to test here the real tags resolution...
    enzymeWrapper.instance().initializeState(initType, initMode, levels)
    // Children should now be visible
    assert.lengthOf(enzymeWrapper.findWhere(n => n.props().id === 'test-div'), 1, 'Children should now be visible')
    // The context should have been initialized with resolved context configuration, in initType/initMode view
    assert.equal(spiedModuleId, 1, 'Module ID should be correctly provided when updating results context')
    const expectedContext = ContextInitializationHelper.buildDefaultResultsContext(moduleConf, attributes)
    expectedContext.type = initType
    expectedContext.criteria.levels = levels
    expectedContext.typeState[initType].mode = initMode
    assert.deepEqual(spiedResultsContext, expectedContext, 'Context should be initialized correctly')
  }))
  it('Update URL as context changes (bound from redux)', () => {
    const previousLocation = {
      pathname: 'www.test2.com/test2',
      query: { },
    }
    currentLocation = previousLocation
    const props = {
      moduleId: 1,
      configuration: dataConfiguration,
      attributeModels: attributes,
      children: <div id="test-div" />,
      authentication: {
        isFetching: false,
        // initially not authentified
      },
      fetchEntity: () => {},
      updateResultsContext: () => {},
    }
    const enzymeWrapper = shallow(<ContextManager {...props} />, { context })
    // Simulate Tags resolution
    enzymeWrapper.instance().initializeState(DamDomain.ENTITY_TYPES_ENUM.DATASET, UIDomain.RESULTS_VIEW_MODES_ENUM.LIST, [])
    // Check not updated yet
    assert.isTrue(previousLocation === currentLocation, 'Location reference should not have changed (no initial update!)')
    // 1 - simulate levels added
    const configurationContext = ContextInitializationHelper.buildDefaultResultsContext(dataConfiguration, attributes)
    let nextContext = {
      // initial
      ...configurationContext,
      type: DamDomain.ENTITY_TYPES_ENUM.DATASET,
      typeState: {
        ...configurationContext.typeState,
        [DamDomain.ENTITY_TYPES_ENUM.DATASET]: {
          ...configurationContext.typeState[DamDomain.ENTITY_TYPES_ENUM.DATASET],
          mode: UIDomain.RESULTS_VIEW_MODES_ENUM.LIST,
        },
      },
      // just added
      criteria: {
        levels: [CriterionBuilder.buildEntityTagCriterion(datasetEntity)],
      },
    }
    enzymeWrapper.setProps({
      ...props,
      resultsContext: nextContext,
    })
    assert.deepEqual(currentLocation, {
      pathname: 'www.test2.com/test2',
      query: {
        // initial
        [ContextManager.MODULE_URL_PARAMETERS.VIEW_TYPE_PARAMETER]: DamDomain.ENTITY_TYPES_ENUM.DATASET,
        [ContextManager.MODULE_URL_PARAMETERS.RESULTS_DISPLAY_MODE_PARAMETER]: UIDomain.RESULTS_VIEW_MODES_ENUM.LIST,
        // expected added tags
        [ContextManager.MODULE_URL_PARAMETERS.LEVELS_PARAMETER]: `e_${datasetEntity.content.id}`,
      },
    })

    // Add some other tags
    nextContext = {
      ...nextContext,
      criteria: {
        levels: [
          // From previous context
          CriterionBuilder.buildEntityTagCriterion(datasetEntity),
          // New tags
          CriterionBuilder.buildWordTagCriterion('coffee'),
          CriterionBuilder.buildEntityTagCriterion(documentEntity),
          { type: UIDomain.ResultsContextConstants.DESCRIPTION_LEVEL, entity: dataEntity },
        ],
      },
    }
    enzymeWrapper.setProps({
      ...props,
      resultsContext: nextContext,
    })
    assert.deepEqual(currentLocation, {
      pathname: 'www.test2.com/test2',
      query: {
        // initial
        [ContextManager.MODULE_URL_PARAMETERS.VIEW_TYPE_PARAMETER]: DamDomain.ENTITY_TYPES_ENUM.DATASET,
        [ContextManager.MODULE_URL_PARAMETERS.RESULTS_DISPLAY_MODE_PARAMETER]: UIDomain.RESULTS_VIEW_MODES_ENUM.LIST,
        // expected added tags
        [ContextManager.MODULE_URL_PARAMETERS.LEVELS_PARAMETER]: `e_${datasetEntity.content.id},w_coffee,e_${documentEntity.content.id},d_${dataEntity.content.id}`,
      },
    })

    // Change view type and mode
    nextContext = {
      ...nextContext,
      type: DamDomain.ENTITY_TYPES_ENUM.DATA,
      typeState: {
        ...nextContext.typeState,
        [DamDomain.ENTITY_TYPES_ENUM.DATA]: {
          ...nextContext.typeState[DamDomain.ENTITY_TYPES_ENUM.DATA],
          type: UIDomain.RESULTS_VIEW_MODES_ENUM.MAP,
        },
      },
    }
    enzymeWrapper.setProps({
      ...props,
      resultsContext: nextContext,
    })
    assert.deepEqual(currentLocation, {
      pathname: 'www.test2.com/test2',
      query: {
        [ContextManager.MODULE_URL_PARAMETERS.VIEW_TYPE_PARAMETER]: DamDomain.ENTITY_TYPES_ENUM.DATA,
        [ContextManager.MODULE_URL_PARAMETERS.RESULTS_DISPLAY_MODE_PARAMETER]: UIDomain.RESULTS_VIEW_MODES_ENUM.MAP,
        [ContextManager.MODULE_URL_PARAMETERS.LEVELS_PARAMETER]: `e_${datasetEntity.content.id},w_coffee,e_${documentEntity.content.id},d_${dataEntity.content.id}`,
      },
    })
    // Change view mode only
    nextContext = {
      ...nextContext,
      typeState: {
        ...nextContext.typeState,
        [DamDomain.ENTITY_TYPES_ENUM.DATA]: {
          ...nextContext.typeState[DamDomain.ENTITY_TYPES_ENUM.DATA],
          mode: UIDomain.RESULTS_VIEW_MODES_ENUM.QUICKLOOK,
        },
      },
    }
    enzymeWrapper.setProps({
      ...props,
      resultsContext: nextContext,
    })
    assert.deepEqual(currentLocation, {
      pathname: 'www.test2.com/test2',
      query: {
        [ContextManager.MODULE_URL_PARAMETERS.VIEW_TYPE_PARAMETER]: DamDomain.ENTITY_TYPES_ENUM.DATA,
        [ContextManager.MODULE_URL_PARAMETERS.RESULTS_DISPLAY_MODE_PARAMETER]: UIDomain.RESULTS_VIEW_MODES_ENUM.QUICKLOOK,
        [ContextManager.MODULE_URL_PARAMETERS.LEVELS_PARAMETER]: `e_${datasetEntity.content.id},w_coffee,e_${documentEntity.content.id},d_${dataEntity.content.id}`,
      },
    })
    // remove some tags
    nextContext = {
      ...nextContext,
      criteria: {
        levels: [CriterionBuilder.buildEntityTagCriterion(documentEntity)],
      },
    }
    enzymeWrapper.setProps({
      ...props,
      resultsContext: nextContext,
    })
    assert.deepEqual(currentLocation, {
      pathname: 'www.test2.com/test2',
      query: {
        // initial
        [ContextManager.MODULE_URL_PARAMETERS.VIEW_TYPE_PARAMETER]: DamDomain.ENTITY_TYPES_ENUM.DATA,
        [ContextManager.MODULE_URL_PARAMETERS.RESULTS_DISPLAY_MODE_PARAMETER]: UIDomain.RESULTS_VIEW_MODES_ENUM.QUICKLOOK,
        // expected added tags
        [ContextManager.MODULE_URL_PARAMETERS.LEVELS_PARAMETER]: `e_${documentEntity.content.id}`,
      },
    })
    // Clear levels
    nextContext = {
      ...nextContext,
      criteria: {
        levels: [],
      },
    }
    enzymeWrapper.setProps({
      ...props,
      resultsContext: nextContext,
    })
    assert.deepEqual(currentLocation, {
      pathname: 'www.test2.com/test2',
      query: {
        // initial
        [ContextManager.MODULE_URL_PARAMETERS.VIEW_TYPE_PARAMETER]: DamDomain.ENTITY_TYPES_ENUM.DATA,
        [ContextManager.MODULE_URL_PARAMETERS.RESULTS_DISPLAY_MODE_PARAMETER]: UIDomain.RESULTS_VIEW_MODES_ENUM.QUICKLOOK,
      },
    })
  })
})
