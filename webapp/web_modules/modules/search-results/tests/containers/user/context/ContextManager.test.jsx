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
import get from 'lodash/get'
import forEach from 'lodash/forEach'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { DamDomain, CatalogDomain, UIDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { ContextManager } from '../../../../src/containers/user/context/ContextManager'
import { ContextStorageHelper } from '../../../../src/containers/user/context/ContextStorageHelper'
import { CriterionBuilder } from '../../../../src/definitions/CriterionBuilder'
import styles from '../../../../src/styles'
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
  let getDataSave = null
  let saveDataSave = null
  let getModuleContextIdSave = null
  before(() => {
    testSuiteHelpers.before()
    // replace external data sources for tests (URL and local storage)
    router.browserHistory = {
      getCurrentLocation: () => currentLocation,
      replace: (newLocation) => { currentLocation = newLocation },
    }
    // each test can replace the following methods by it own functions on need
    getDataSave = UIDomain.LocalStorageData.getData
    saveDataSave = UIDomain.LocalStorageData.saveData
    getModuleContextIdSave = UIDomain.LocalStorageData.saveData
  })
  after(() => {
    testSuiteHelpers.after()
    delete router.browserHistory
    UIDomain.LocalStorageData.getData = getDataSave
    UIDomain.LocalStorageData.saveData = saveDataSave
    UIDomain.LocalStorageData.getModuleContextId = getModuleContextIdSave
  })

  it('should exists', () => {
    assert.isDefined(ContextManager)
  })

  // 1 : Test initialization scenarios
  // A - Configuration checkers
  function assertInitialGroups(groups, tabType) {
    assert.lengthOf(groups, 2, `[${tabType}] Empty groups should have been filtered`)
    const g0 = groups[0]
    const g0Criteria = g0.criteria
    assert.deepEqual(g0.showTitle, dataConfiguration.criteriaGroups[0].showTitle,
      `[${tabType}] group #0 showTitle should be correctly reported from configuration`)
    assert.deepEqual(g0.title, dataConfiguration.criteriaGroups[0].title,
      `[${tabType}] group #0 title should be correctly reported from configuration`)
    assert.lengthOf(g0Criteria, 2, `[${tabType}] Group #0 criteria: disabled and unresolved criteria should be filtered`)
    assert.deepEqual(g0Criteria[0], {
      pluginId: dataConfiguration.criteriaGroups[0].criteria[0].pluginId,
      pluginInstanceId: `[25/${tabType}/111][my.attr.1/my.attr.2][0:0]`,
      conf: { attributes: { field1: attributes[1].content, field2: attributes[2].content } },
      label: dataConfiguration.criteriaGroups[0].criteria[0].label,
    }, `[${tabType}] Criterion 0:0 should be correctly resolved`)
    assert.deepEqual(g0Criteria[1], {
      pluginId: dataConfiguration.criteriaGroups[0].criteria[1].pluginId,
      pluginInstanceId: `[25/${tabType}/833][][0:1]`,
      conf: { attributes: {} },
      label: dataConfiguration.criteriaGroups[0].criteria[1].label,
    }, `[${tabType}] Criterion 0:1 should be correctly resolved`)
    const g1 = groups[1]
    const g1Criteria = g1.criteria
    assert.deepEqual(g1.showTitle, dataConfiguration.criteriaGroups[1].showTitle,
      `[${tabType}] group #1 showTitle should be correctly reported from configuration`)
    assert.deepEqual(g1.title, dataConfiguration.criteriaGroups[1].title,
      `[${tabType}] group #1 title should be correctly reported from configuration`)
    assert.lengthOf(g1Criteria, 1, `[${tabType}] Group #1 criteria: disabled and unresolved criteria should be filtered`)
    assert.deepEqual(g1Criteria[0], {
      pluginId: dataConfiguration.criteriaGroups[1].criteria[0].pluginId,
      pluginInstanceId: `[25/${tabType}/1025][my.attr.1/label][1:0]`,
      conf: {
        attributes: {
          fieldX: attributes[1].content,
          fieldY: DamDomain.AttributeModelController.findModelFromAttributeFullyQualifiedName('label', {}).content,
        },
      },
      label: dataConfiguration.criteriaGroups[1].criteria[0].label,
    }, `[${tabType}] Criterion 1:0 should be correctly resolved`)
  }
  /** Performs superfial assertions on context converted from configuration */
  function assertContextFromConfiguration(contextFromConf) {
    const { selectedTab, tabs } = contextFromConf
    assert.equal(selectedTab, UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS)
    // main results tab
    const mainResultsTab = tabs[UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS]
    assert.isTrue(mainResultsTab.facets.enabled, '[MAIN RESULTS] Facets should be enabled by configuration')
    assert.isNotEmpty(mainResultsTab.facets.list, '[MAIN RESULTS] There should be facets resolved from configuration')
    assert.isTrue(mainResultsTab.search.enabled, '[MAIN RESULTS] Search should be enabled by configuration')
    assert.isFalse(mainResultsTab.search.open, '[MAIN RESULTS] Search pane should not be initially opened')
    assertInitialGroups(mainResultsTab.search.groups, UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS)

    assert.isNotEmpty(mainResultsTab.search.groups, '[MAIN RESULTS] There should be criteria groups resolved from configuration ')
    forEach(mainResultsTab.criteria, (criteriaList, key) => {
      switch (key) {
        case 'configurationRestrictions':
          // restrictions should have been reported
          assert.deepEqual(criteriaList, [{
            requestParameters: {
              [CatalogDomain.CatalogSearchQueryHelper.Q_PARAMETER_NAME]: new CatalogDomain.OpenSearchQueryParameter(
                CatalogDomain.OpenSearchQuery.SAPN.tags,
                CatalogDomain.OpenSearchQueryParameter.toStrictStringEqual('URN:DATASET:EXAMPLE1')).toQueryString(),
            },
          }], '[MAIN RESULTS] Configuration restriction should be restored')
          break
          // configured facets should have been reported
        case 'requestFacets':
          assert.deepEqual(criteriaList, [{
            facetLabels: dataConfiguration.facets.list[0].label,
            attribute: attributes[1],
            requestParameters: { [CatalogDomain.CatalogSearchQueryHelper.FACETS_PARAMETER_NAME]: attributes[1].content.jsonPath },
          }, {
            facetLabels: dataConfiguration.facets.list[1].label,
            attribute: attributes[2],
            requestParameters: { [CatalogDomain.CatalogSearchQueryHelper.FACETS_PARAMETER_NAME]: attributes[2].content.jsonPath },
          }], '[MAIN RESULTS] Request facets should be correctly converted')
          break
        default:
          assert.isEmpty(criteriaList, `[MAIN RESULTS] No criterion should be restored for ${key}`)
      }
    })
    assert.equal(mainResultsTab.selectedType, DamDomain.ENTITY_TYPES_ENUM.DATASET, '[MAIN RESULTS] Default selected tab')
    const dataView = mainResultsTab.types[DamDomain.ENTITY_TYPES_ENUM.DATA]
    assert.isTrue(mainResultsTab.types[DamDomain.ENTITY_TYPES_ENUM.DATA].enabled, '[MAIN RESULTS] Data view should be enabled')
    assert.equal(dataView.selectedMode, UIDomain.RESULTS_VIEW_MODES_ENUM.MAP, '[MAIN RESULTS] Data view should display map mode initially')
    const datasetView = mainResultsTab.types[DamDomain.ENTITY_TYPES_ENUM.DATASET]
    assert.isTrue(datasetView.enabled, '[MAIN RESULTS] Dataset view should be enabled')
    assert.equal(datasetView.selectedMode, UIDomain.RESULTS_VIEW_MODES_ENUM.TABLE, '[MAIN RESULTS] Dataset view should display table mode initially')

    // description tab
    const descriptionTab = tabs[UIDomain.RESULTS_TABS_ENUM.DESCRIPTION]
    assert.deepEqual(descriptionTab, {
      unresolvedTreeEntry: null,
      unresolvedRootEntityId: null,
      descriptionPath: [],
      selectedIndex: 0,
    }, '[DESCRIPTION] should be initially closed without data to restore')

    // tag results tab
    const tagResultsTab = tabs[UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS]
    assert.isTrue(tagResultsTab.facets.enabled, '[TAG RESULTS] Facets should be enabled by configuration')
    assert.isNotEmpty(tagResultsTab.facets.list, '[TAG RESULTS] There should be facets resolved from configuration')
    assert.isTrue(tagResultsTab.search.enabled, '[TAG RESULTS] Search should be enabled by configuration')
    assert.isFalse(tagResultsTab.search.open, '[TAG RESULTS] Search pane should not be initially opened')
    assertInitialGroups(tagResultsTab.search.groups, UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS)
    forEach(tagResultsTab.criteria, (criteriaList, key) => {
      switch (key) {
        case 'requestFacets':
          assert.deepEqual(criteriaList, [{
            facetLabels: dataConfiguration.facets.list[0].label,
            attribute: attributes[1],
            requestParameters: { [CatalogDomain.CatalogSearchQueryHelper.FACETS_PARAMETER_NAME]: attributes[1].content.jsonPath },
          }, {
            facetLabels: dataConfiguration.facets.list[1].label,
            attribute: attributes[2],
            requestParameters: { [CatalogDomain.CatalogSearchQueryHelper.FACETS_PARAMETER_NAME]: attributes[2].content.jsonPath },
          }], '[TAG RESULTS] Request facets should be correctly converted')
          break
        default:
          assert.isEmpty(criteriaList, `[TAG RESULTS] No criterion should be restored for ${key}`)
      }
    })
    assert.equal(tagResultsTab.selectedType, DamDomain.ENTITY_TYPES_ENUM.DATA, '[TAG RESULTS] Default selected tab')
    const tagDataView = tagResultsTab.types[DamDomain.ENTITY_TYPES_ENUM.DATA]
    assert.isTrue(tagDataView.enabled, '[TAG RESULTS] Data view should be enabled')
    assert.equal(tagDataView.selectedMode, UIDomain.RESULTS_VIEW_MODES_ENUM.MAP, '[TAG RESULTS] Data view should display map mode initially')
    const tagDatasetView = mainResultsTab.types[DamDomain.ENTITY_TYPES_ENUM.DATASET]
    assert.isTrue(tagDatasetView.enabled, '[TAG RESULTS] Dataset view should be enabled')
    assert.equal(tagDatasetView.selectedMode, UIDomain.RESULTS_VIEW_MODES_ENUM.TABLE, '[TAG RESULTS] Dataset view should display table mode initially')
  }

  // 1.B : common variables
  const defaultLocalStorage = {
    [ContextStorageHelper.MODULE_URL_PARAMETERS[0].name]: UIDomain.RESULTS_TABS_ENUM.DESCRIPTION, // selected tab
    [ContextStorageHelper.MODULE_URL_PARAMETERS[1].name]: DamDomain.ENTITY_TYPES_ENUM.DATA, // main tab type
    [ContextStorageHelper.MODULE_URL_PARAMETERS[2].name]: JSON.stringify([{ // toponym criteria
      r: { toponym: 'any' },
    }]),
    [ContextStorageHelper.MODULE_URL_PARAMETERS[3].name]: UIDomain.RESULTS_VIEW_MODES_ENUM.QUICKLOOK, // main results display mode
    [ContextStorageHelper.MODULE_URL_PARAMETERS[4].name]: datasetEntity.content.id, // main tab filter
    [ContextStorageHelper.MODULE_URL_PARAMETERS[5].name]: 'true', // search pane open
    [ContextStorageHelper.MODULE_URL_PARAMETERS[6].name]: JSON.stringify([{ // search state: criteria 0:0, 0:1, 1:0
      i: `[25/${UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS}/111][my.attr.1/my.attr.2][0:0]`,
      s: { crit1: 'state', booleanHere: false },
      r: { p1: false, q: 'any' },
    }, {
      i: `[25/${UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS}/833][][0:1]`,
      s: { crit2: 'something', val: 3 },
      r: { kappa: [3, 10], quoala: 'Kiki' },
    }, {
      i: `[25/${UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS}/1025][my.attr.1/label][1:0]`,
      s: { crit3: 'stillOK', sliderRange: [36, 55, 58, 103] },
      r: { x: [36, 55] },
    }, { // A state that should be ignored (coming for instance from an old configuration)
      i: `25/${UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS}/9999][my.attr.8][1:1]`,
      s: { crit4: 'I should be ignored', xzPotatoes: { a: 'b', b: '1' } },
      r: { x: [36, 55] },
    }]),
    [ContextStorageHelper.MODULE_URL_PARAMETERS[7].name]: UIDomain.MAP_VIEW_MODES_ENUM.MODE_3D, // map view mode
    [ContextStorageHelper.MODULE_URL_PARAMETERS[8].name]: 'PARAMETERS', // entity description state
    [ContextStorageHelper.MODULE_URL_PARAMETERS[9].name]: dataEntity.content.id, // description entity
    [ContextStorageHelper.MODULE_URL_PARAMETERS[10].name]: anotherDatasetEntity.content.id, // tag view main tag
    [ContextStorageHelper.MODULE_URL_PARAMETERS[11].name]: UIDomain.RESULTS_VIEW_MODES_ENUM.LIST, // tag view display mode
    [ContextStorageHelper.MODULE_URL_PARAMETERS[12].name]: 'URN:DATASET:UNEXISTING', // will not be resolved
    [ContextStorageHelper.MODULE_URL_PARAMETERS[13].name]: JSON.stringify([true, true]), // 2 unactives attributes
    [ContextStorageHelper.STATIC_PARAMETERS.name]: 'Only pictures;hasImage=true,External data;q=model:DATA_MODEL_REGARDS_2044',
  }

  // 1.C - Tests cases
  const initTestCases = [{
    caseLabel: 'without saved URL or local storage',
    fromResultContext: null,
    urlQueryData: {},
    storageData: null,
    doExpect: (initialContext, restoredContext, publishedContext) => {
      assert.deepEqual(initialContext, restoredContext, 'Restored context should be identical to configuration one')
      assert.deepEqual(initialContext, publishedContext, 'Published context should be identical to configuration one')
      assertContextFromConfiguration(initialContext)
    },
  }, {
    caseLabel: 'with local storage (no URL)',
    fromResultContext: null,
    urlQueryData: {},
    storageData: defaultLocalStorage,
    doExpect: (initialContext, restoredContext, publishedContext) => {
      assertContextFromConfiguration(initialContext)
      // check differences only on published context (in the same order than parameters)
      const { selectedTab, tabs } = restoredContext
      const mainTab = tabs[UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS]
      const descriptionTab = tabs[UIDomain.RESULTS_TABS_ENUM.DESCRIPTION]
      const tagTab = tabs[UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS]
      assert.equal(selectedTab, UIDomain.RESULTS_TABS_ENUM.DESCRIPTION,
        'Selected tab should have been restored from local storage')
      assert.equal(mainTab.selectedType, DamDomain.ENTITY_TYPES_ENUM.DATA,
        'Main tab selected type should have been restroed from local storage')
      assert.deepEqual(mainTab.criteria.toponymCriteria, [{ // toponym criteria
        requestParameters: { toponym: 'any' },
      }], 'toponym criteria should have been restored from local storage')
      assert.equal(mainTab.types[mainTab.selectedType].selectedMode, UIDomain.RESULTS_VIEW_MODES_ENUM.QUICKLOOK,
        'Main tab view mode should have been restored from local storage')
      assert.deepEqual(mainTab.criteria.tagsFiltering, [
        CriterionBuilder.buildUnresolvedEntityTagCriterion(datasetEntity.content.id)],
      'Main tab user filter should have been restored from local storage (using unresolved notation)')
      assert.isTrue(mainTab.search.open, 'Search open state should have been restored from local storage')
      assert.deepEqual(mainTab.criteria.searchCriteria, [{
        pluginInstanceId: `[25/${UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS}/111][my.attr.1/my.attr.2][0:0]`,
        state: { crit1: 'state', booleanHere: false },
        requestParameters: { p1: false, q: 'any' },
      }, {
        pluginInstanceId: `[25/${UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS}/833][][0:1]`,
        state: { crit2: 'something', val: 3 },
        requestParameters: { kappa: [3, 10], quoala: 'Kiki' },
      }, {
        pluginInstanceId: `[25/${UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS}/1025][my.attr.1/label][1:0]`,
        state: { crit3: 'stillOK', sliderRange: [36, 55, 58, 103] },
        requestParameters: { x: [36, 55] },
      }, { // A state that should be ignored (coming for instance from an old configuration)
        pluginInstanceId: `25/${UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS}/9999][my.attr.8][1:1]`,
        state: { crit4: 'I should be ignored', xzPotatoes: { a: 'b', b: '1' } },
        requestParameters: { x: [36, 55] },
      }], 'Search state and criteria should have been restored from local storage')
      assert.deepEqual(descriptionTab, {
        unresolvedTreeEntry: {
          section: UIDomain.DESCRIPTION_BROWSING_SECTIONS_ENUM.PARAMETERS,
          child: null,
        },
        unresolvedRootEntityId: dataEntity.content.id,
        descriptionPath: [],
        selectedIndex: 0,
      }, 'Description tab should have been restored from local storage (using unresolved entity notation)')
      assert.deepEqual(tagTab.criteria.contextTags, [
        CriterionBuilder.buildUnresolvedEntityTagCriterion(anotherDatasetEntity.content.id)],
      'Root tag view criterion should have been resolved from local storage (using unresolved notation)')
      assert.equal(tagTab.types[tagTab.selectedType].selectedMode, UIDomain.RESULTS_VIEW_MODES_ENUM.LIST,
        'Tag tab view mode should have been restored from local storage')
      assert.deepEqual(tagTab.criteria.tagsFiltering, [CriterionBuilder.buildUnresolvedEntityTagCriterion('URN:DATASET:UNEXISTING')],
        'Tag tab user filter should have been restored from local storage (word tag)')
      // Check context is published with resolved entities (for those who could be resolved)
      assert.deepEqual(publishedContext.tabs[UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS].criteria.tagsFiltering, [
        CriterionBuilder.buildEntityTagCriterion(datasetEntity),
      ], 'Main tab secondary tag should have been resolved')
      assert.deepEqual(publishedContext.tabs[UIDomain.RESULTS_TABS_ENUM.DESCRIPTION], {
        unresolvedTreeEntry: { section: UIDomain.DESCRIPTION_BROWSING_SECTIONS_ENUM.PARAMETERS, child: null },
        unresolvedRootEntityId: null,
        descriptionPath: [{ entity: dataEntity, selectedTreeEntry: { section: UIDomain.DESCRIPTION_BROWSING_SECTIONS_ENUM.PARAMETERS, child: null } }],
        selectedIndex: 0,
      }, 'Description tab entity should have been resolved')
      assert.deepEqual(publishedContext.tabs[UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS].criteria.contextTags, [
        CriterionBuilder.buildEntityTagCriterion(anotherDatasetEntity),
      ], 'Results tag main tag should have been resolved')
      assert.deepEqual(publishedContext.tabs[UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS].criteria.tagsFiltering, [
        CriterionBuilder.buildUnresolvedEntityTagCriterion('URN:DATASET:UNEXISTING'),
      ], 'Results tag secondary tag resolution should have failed')
    },
  }, {
    caseLabel: 'with URL (preferred to local storage when present)',
    fromResultContext: null,
    urlQueryData: {
      [ContextStorageHelper.MODULE_URL_PARAMETERS[0].name]: UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS, // selected tab
      [ContextStorageHelper.MODULE_URL_PARAMETERS[1].name]: DamDomain.ENTITY_TYPES_ENUM.DATASET, // main tab type
      [ContextStorageHelper.MODULE_URL_PARAMETERS[2].name]: JSON.stringify([{ // toponym criteria
        r: { toponym: 'any' },
      }]),
      [ContextStorageHelper.MODULE_URL_PARAMETERS[3].name]: UIDomain.RESULTS_VIEW_MODES_ENUM.LIST, // main results display mode
      [ContextStorageHelper.MODULE_URL_PARAMETERS[6].name]: JSON.stringify([{ // search state: criterion 0:1 only
        i: `[25/${UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS}/833][][0:1]`,
        s: { crit2: 'somethingElse', val: 46 },
        r: { kappa: [46, 53], quoala: 'Coco' },
      }]),
      [ContextStorageHelper.MODULE_URL_PARAMETERS[7].name]: UIDomain.MAP_VIEW_MODES_ENUM.MODE_3D, // map view mode
      [ContextStorageHelper.MODULE_URL_PARAMETERS[8].name]: 'PARAMETERS', // entity description state
      [ContextStorageHelper.MODULE_URL_PARAMETERS[9].name]: 'URN:DATASET:UNEXISTING',
      [ContextStorageHelper.MODULE_URL_PARAMETERS[10].name]: anotherDataEntity.content.id,
      [ContextStorageHelper.MODULE_URL_PARAMETERS[11].name]: UIDomain.RESULTS_VIEW_MODES_ENUM.QUICKLOOK,
      [ContextStorageHelper.STATIC_PARAMETERS.name]: 'Only pictures;hasImage=true,External data;q=model:DATA_MODEL_REGARDS_2044',
    },
    storageData: defaultLocalStorage,
    doExpect: (initialContext, restoredContext, publishedContext) => {
      assertContextFromConfiguration(initialContext)
      // check differences only on restored context (in the same order than parameters)
      const { selectedTab, tabs } = restoredContext
      const mainTab = tabs[UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS]
      const descriptionTab = tabs[UIDomain.RESULTS_TABS_ENUM.DESCRIPTION]
      const tagTab = tabs[UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS]
      assert.equal(selectedTab, UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS,
        'Selected tab should have been restored from URL')
      assert.equal(mainTab.selectedType, DamDomain.ENTITY_TYPES_ENUM.DATASET,
        'Main tab selected type should have been restroed from URL')
      assert.deepEqual(mainTab.criteria.toponymCriteria, [{ // toponym criteria
        requestParameters: { toponym: 'any' },
      }], 'toponym criteria should have been restored from URL')
      assert.equal(mainTab.types[mainTab.selectedType].selectedMode, UIDomain.RESULTS_VIEW_MODES_ENUM.LIST,
        'Main tab view mode should have been restored from URL')
      assert.isEmpty(mainTab.criteria.tagsFiltering,
        'Main tab user filter should have been restored from URL')
      assert.isFalse(mainTab.search.open, 'Search open state should have been restored from URL')
      assert.deepEqual(mainTab.criteria.searchCriteria, [{
        pluginInstanceId: `[25/${UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS}/833][][0:1]`,
        state: { crit2: 'somethingElse', val: 46 },
        requestParameters: { kappa: [46, 53], quoala: 'Coco' },
      }], 'Search state and criteria should have been restored from URL')
      assert.deepEqual(descriptionTab, {
        unresolvedTreeEntry: {
          section: UIDomain.DESCRIPTION_BROWSING_SECTIONS_ENUM.PARAMETERS,
          child: null,
        },
        unresolvedRootEntityId: 'URN:DATASET:UNEXISTING',
        descriptionPath: [],
        selectedIndex: 0,
      }, 'Description tab should have been restored from URL')
      assert.deepEqual(tagTab.criteria.contextTags, [
        CriterionBuilder.buildUnresolvedEntityTagCriterion(anotherDataEntity.content.id)],
      'Root tag view criterion should have been resolved from URL (undefined)')
      assert.equal(tagTab.types[tagTab.selectedType].selectedMode, UIDomain.RESULTS_VIEW_MODES_ENUM.QUICKLOOK,
        'Tag tab view mode should have been restored from URL')
      assert.isEmpty(tagTab.criteria.tagsFiltering,
        'Tag tab user filter should have been restored from URL')
      // Check context is published with resolved entities (for those who could be resolved)
      assert.deepEqual(publishedContext.tabs[UIDomain.RESULTS_TABS_ENUM.DESCRIPTION], {
        unresolvedTreeEntry: {
          section: UIDomain.DESCRIPTION_BROWSING_SECTIONS_ENUM.PARAMETERS,
          child: null,
        },
        unresolvedRootEntityId: 'URN:DATASET:UNEXISTING',
        descriptionPath: [],
        selectedIndex: 0,
      }, 'Description tab entity should have been resolved')
      assert.deepEqual(publishedContext.tabs[UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS].criteria.contextTags, [
        CriterionBuilder.buildEntityTagCriterion(anotherDataEntity)],
      'Results tag main tag should have been resolved')
    },
  }, {
    caseLabel: 'applying any parent control',
    fromResultContext: { // parent control: a state diff to be applied ASAP
      tabs: {
        [UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS]: {
          criteria: {
            contextTags: [CriterionBuilder.buildWordTagCriterion('chocolate'), CriterionBuilder.buildEntityTagCriterion(datasetEntity)],
          },
        },
      },
    },
    urlQueryData: { },
    storageData: defaultLocalStorage,
    doExpect: (initialContext, restoredContext, resolved) => {
      assert.deepEqual(resolved.tabs[UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS].criteria.contextTags,
        [CriterionBuilder.buildWordTagCriterion('chocolate'), CriterionBuilder.buildEntityTagCriterion(datasetEntity)],
        'Parent control should be reported onto final context')
    },
  }]
  // 1.D - Tests processing
  initTestCases.forEach(({
    caseLabel, fromResultContext, urlQueryData, storageData, doExpect,
  }) => it(`should restore initial context ${caseLabel}`, (done) => {
    // replace ContextStorageHelper#restore method to spy the incoming parameter (resolved from configuration)
    // and the returned value (resolved with URL / local store / none)
    const spiedRestore = {}
    const restoreSave = ContextStorageHelper.restore
    ContextStorageHelper.restore = (initContext, project, moduleId) => {
      spiedRestore.initialContext = initContext
      spiedRestore.restoredContext = restoreSave(initContext, project, moduleId)
      return spiedRestore.restoredContext
    }
    // local storage : none
    UIDomain.LocalStorageData.getData = (app, project, moduleId, storageKey) => {
      assert.equal(app, UIDomain.APPLICATIONS_ENUM.USER, 'Local storage wrong app parameter')
      assert.equal(project, 'testProject', 'Local storage wrong project parameter')
      assert.equal(moduleId, 25, 'Local storage wrong moduleId parameter')
      assert.equal(storageKey, ContextStorageHelper.LOCAL_STORAGE_KEY, 'Local storage wrong storage key parameter')
      return storageData
        ? JSON.stringify(storageData) // expected as string by caller
        : null
    }
    // URL : none
    currentLocation = { query: urlQueryData }
    // Create component and check it attempts resolution after mounting
    const props = {
      moduleId: 25,
      project: 'testProject',
      configuration: dataConfiguration,
      attributeModels: attributes,
      resultsContext: fromResultContext,
      authentication: {},
      fetchEntity: (id) => new Promise((resolve) => resolve({ payload: allEntities.find((e) => e.content.id === id) })),
      updateResultsContext: (moduleId, resultsContext) => {
        assert.equal(moduleId, props.moduleId, 'Update should be performed on right module ID')
        doExpect(spiedRestore.initialContext, spiedRestore.restoredContext, resultsContext)
        done()
      },
    }

    shallow(<ContextManager {...props} />)
  }))

  // 2. Tests logout / login context updates
  it('should update results context on user login changes', (done) => {
    const contextWithRights = UIDomain.ResultsContextHelper.deepMerge(dataContext, {
      tabs: {
        [UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS]: {
          criteria: {
            tagsFiltering: [CriterionBuilder.buildEntityTagCriterion(dataEntity)],
          },
        },
        [UIDomain.RESULTS_TABS_ENUM.DESCRIPTION]: {
          unresolvedTreeEntry: { section: UIDomain.DESCRIPTION_BROWSING_SECTIONS_ENUM.PARAMETERS, child: null },
          unresolvedRootEntityId: null,
          descriptionPath: [
            { entity: datasetEntity, selectedTreeEntry: { section: UIDomain.DESCRIPTION_BROWSING_SECTIONS_ENUM.PARAMETERS, child: null } },
          ],
          selectedIndex: 0,
        },
        [UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS]: {
          contextTags: [CriterionBuilder.buildEntityTagCriterion(anotherDataEntity)],
          tagsFiltering: [CriterionBuilder.buildEntityTagCriterion(anotherDatasetEntity)],
        },
      },
    })
    const contextWithoutRights = UIDomain.ResultsContextHelper.deepMerge(dataContext, {
      tabs: {
        [UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS]: {
          criteria: {
            tagsFiltering: [CriterionBuilder.buildUnresolvedEntityTagCriterion(dataEntity.content.id)],
          },
        },
        [UIDomain.RESULTS_TABS_ENUM.DESCRIPTION]: {
          unresolvedTreeEntry: { section: UIDomain.DESCRIPTION_BROWSING_SECTIONS_ENUM.PARAMETERS, child: null },
          unresolvedRootEntityId: datasetEntity.content.id,
          descriptionPath: [],
          selectedIndex: 0,
        },
        [UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS]: {
          contextTags: [CriterionBuilder.buildUnresolvedEntityTagCriterion(anotherDataEntity.content.id)],
          tagsFiltering: [CriterionBuilder.buildUnresolvedEntityTagCriterion(anotherDatasetEntity.content.id)],
        },
      },
    })

    // Initial restoration
    UIDomain.LocalStorageData.getData = () => JSON.stringify(ContextStorageHelper.buildStorageObject(contextWithRights))
    // 1 - Mount unauthentified
    let currentStep = 0
    let enzymeWrapper = null

    function assertSame(actual, expected, stepMessage) {
      const fields = [
        `tabs.${UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS}.criteria.tagsFiltering`,
        `tabs.${UIDomain.RESULTS_TABS_ENUM.DESCRIPTION}`,
        `tabs.${UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS}.criteria.contextTags`,
        `tabs.${UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS}.criteria.tagsFiltering`,
      ]
      fields.forEach((field) => {
        assert.deepEqual(get(actual, field), get(expected, field), `${stepMessage} - ${field} should have expected value`)
      })
    }
    let currentProps = {
      moduleId: 25,
      project: 'testProject',
      configuration: dataConfiguration,
      attributeModels: attributes,
      resultsContext: null,
      authentication: {},
      fetchEntity: (id) => new Promise((resolve) => resolve({
        payload: currentProps.authentication.result ? allEntities.find((e) => e.content.id === id) : null,
      })),
      updateResultsContext: (moduleId, resultsContext) => {
        assert.equal(moduleId, currentProps.moduleId, 'Update should be performed on right module ID')
        currentStep += 1
        switch (currentStep) {
          case 1:
            // mounting: not yet authenticated
            assertSame(resultsContext, contextWithoutRights, '1 - Mounting (not authenticated yet)')
            // 'log in'
            currentProps = {
              ...currentProps,
              resultsContext, // report previous context
              authentication: {
                result: {
                  scope: 'any',
                  sub: 'any',
                  role: 'any',
                  access_token: 'XXXX',
                  expires_in: 3600,
                },
              },
            }
            enzymeWrapper.setProps(currentProps)
            break
          case 2:
            // authenticated
            assertSame(resultsContext, contextWithRights, '2 - After login')
            // 'log out'
            currentProps = {
              ...currentProps,
              resultsContext, // report previous context
              authentication: {},
            }
            enzymeWrapper.setProps(currentProps)
            break
          case 3:
            // logged out
            assertSame(resultsContext, contextWithoutRights, '3 - After logout')
            done() // TEST END
            break
          default:
              // should not happen
        }
      },
    }
    enzymeWrapper = shallow(<ContextManager {...currentProps} />)
    enzymeWrapper.setState({ initialized: true }) // authentication is taken in account after initialization only
  })

  // 3. Test published context cohenrence
  it('should prevent committing incoherent context', () => {
    const spiedUpdateResults = {}
    const props = {
      moduleId: 25,
      project: 'testProject',
      configuration: dataConfiguration,
      attributeModels: attributes,
      resultsContext: null,
      authentication: {},
      fetchEntity: () => new Promise((resolve) => resolve({})),
      updateResultsContext: (moduleId, resultsContext) => {
        spiedUpdateResults.moduleId = moduleId
        spiedUpdateResults.resultsContext = resultsContext
      },
    }
    // no context saved (useless for that test)
    currentLocation = { query: {} }
    UIDomain.LocalStorageData.getData = () => null
    const enzymeWrapper = shallow(<ContextManager {...props} />, { context })

    // 1 - Description tab selected but no description entity
    enzymeWrapper.instance().commitCoherentContext(UIDomain.ResultsContextHelper.deepMerge(dataContext, {
      selectedTab: UIDomain.RESULTS_TABS_ENUM.DESCRIPTION,
    }))
    assert.equal(spiedUpdateResults.moduleId, props.moduleId, '1 - should have been called for right module ID')
    assert.deepEqual(spiedUpdateResults.resultsContext, dataContext, '1 - should prevent incoherent context by removing corresponding field')
    // 2 - Tag tab without context tag
    enzymeWrapper.instance().commitCoherentContext(UIDomain.ResultsContextHelper.deepMerge(dataContext, {
      selectedTab: UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS,
    }))
    assert.equal(spiedUpdateResults.moduleId, props.moduleId, '2 - should have been called for right module ID')
    assert.deepEqual(spiedUpdateResults.resultsContext, dataContext, '2 - should prevent incoherent context by removing corresponding field')
    // 3 - Tag tab with unresolved context tag
    const contextWithUnresolvedTag = UIDomain.ResultsContextHelper.deepMerge(dataContext, {
      tabs: {
        [UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS]: {
          criteria: {
            contextTags: [CriterionBuilder.buildUnresolvedEntityTagCriterion(anotherDatasetEntity.content.id)],
          },
        },
      },
    })
    enzymeWrapper.instance().commitCoherentContext(UIDomain.ResultsContextHelper.deepMerge(contextWithUnresolvedTag, {
      selectedTab: UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS,
    }))
    assert.equal(spiedUpdateResults.moduleId, props.moduleId, '2 - should have been called for right module ID')
    assert.deepEqual(spiedUpdateResults.resultsContext, contextWithUnresolvedTag, '2 - should prevent incoherent context by removing corresponding field')
  })

  // 4. Test serialization / deserialization
  it('should update URL and local storage as context changes (extensive serialization / deserialization tests)', () => {
    currentLocation = { pathName: 'roots.com', query: {} }
    let storageData = null
    UIDomain.LocalStorageData.getData = (app, project, moduleId, storageKey) => {
      assert.equal(app, UIDomain.APPLICATIONS_ENUM.USER, 'Local storage wrong app parameter')
      assert.equal(app, UIDomain.APPLICATIONS_ENUM.USER, 'Local storage wrong app parameter')
      assert.equal(project, 'testProject', 'Local storage wrong project parameter')
      assert.equal(moduleId, 25, 'Local storage wrong moduleId parameter')
      return storageData
    }
    UIDomain.LocalStorageData.saveData = (app, project, moduleId, storageKey, data) => {
      assert.equal(app, UIDomain.APPLICATIONS_ENUM.USER, 'Local storage wrong app parameter')
      assert.equal(app, UIDomain.APPLICATIONS_ENUM.USER, 'Local storage wrong app parameter')
      assert.equal(project, 'testProject', 'Local storage wrong project parameter')
      assert.equal(moduleId, 25, 'Local storage wrong moduleId parameter')
      storageData = data
    }

    const props = {
      moduleId: 25,
      project: 'testProject',
      configuration: dataConfiguration,
      attributeModels: attributes,
      resultsContext: dataContext,
      authentication: {},
      fetchEntity: () => new Promise((resolve) => resolve({})),
      updateResultsContext: () => {},
    }

    const enzymeWrapper = shallow(<ContextManager {...props} />, { context })
    enzymeWrapper.setState({ initialized: true }) // state is not store while not initialized
    // test applies successive modifications, lets the wrapper calling store method then
    // -> and uses spied store data / updated currentLocation as input for restore
    const updateCases = [{
      label: '1 - Change to description tab and described entity',
      stateDiff: {
        selectedTab: UIDomain.RESULTS_TABS_ENUM.DESCRIPTION,
        tabs: {
          [UIDomain.RESULTS_TABS_ENUM.DESCRIPTION]: {
            unresolvedTreeEntry: { section: UIDomain.DESCRIPTION_BROWSING_SECTIONS_ENUM.PARAMETERS, child: null },
            descriptionPath: [{ entity: dataEntity, selectedTreeEntry: { section: UIDomain.DESCRIPTION_BROWSING_SECTIONS_ENUM.PARAMETERS, child: null } }],
            selectedIndex: 0,
          },
        },
      },
      expectedRestoredDiff: {
        selectedTab: UIDomain.RESULTS_TABS_ENUM.DESCRIPTION,
        tabs: {
          [UIDomain.RESULTS_TABS_ENUM.DESCRIPTION]: {
            unresolvedTreeEntry: { section: UIDomain.DESCRIPTION_BROWSING_SECTIONS_ENUM.PARAMETERS, child: null },
            unresolvedRootEntityId: dataEntity.content.id, // later resolved
            descriptionPath: [],
            selectedIndex: 0,
          },
        },
      },
    }, {
      label: '2 - Navigate to another description entity',
      stateDiff: {
        tabs: {
          [UIDomain.RESULTS_TABS_ENUM.DESCRIPTION]: {
            descriptionPath: [
              { entity: dataEntity, selectedTreeEntry: { section: UIDomain.DESCRIPTION_BROWSING_SECTIONS_ENUM.PARAMETERS, child: null } },
              { entity: anotherDataEntity, selectedTreeEntry: { section: UIDomain.DESCRIPTION_BROWSING_SECTIONS_ENUM.PARAMETERS, child: null } },
            ],
            selectedIndex: 1,
          },
        },
      },
      expectedRestoredDiff: {
        tabs: {
          [UIDomain.RESULTS_TABS_ENUM.DESCRIPTION]: {
            unresolvedTreeEntry: { section: UIDomain.DESCRIPTION_BROWSING_SECTIONS_ENUM.PARAMETERS, child: null },
            unresolvedRootEntityId: anotherDataEntity.content.id, // later resolved
            descriptionPath: [],
            selectedIndex: 0,
          },
        },
      },
    }, {
      label: '3 - Back to first description entity through breadcrumb',
      stateDiff: {
        tabs: {
          [UIDomain.RESULTS_TABS_ENUM.DESCRIPTION]: {
            descriptionPath: [
              { entity: dataEntity, selectedTreeEntry: { section: UIDomain.DESCRIPTION_BROWSING_SECTIONS_ENUM.PARAMETERS, child: null } },
              { entity: anotherDataEntity, selectedTreeEntry: { section: UIDomain.DESCRIPTION_BROWSING_SECTIONS_ENUM.PARAMETERS, child: null } },
            ],
            selectedIndex: 0,
          },
        },
      },
      expectedRestoredDiff: {
        tabs: {
          [UIDomain.RESULTS_TABS_ENUM.DESCRIPTION]: {
            unresolvedTreeEntry: { section: UIDomain.DESCRIPTION_BROWSING_SECTIONS_ENUM.PARAMETERS, child: null },
            unresolvedRootEntityId: dataEntity.content.id, // later resolved
            descriptionPath: [],
            selectedIndex: 0,
          },
        },
      },
    }, {
      label: '4 - Swap to tag results view',
      stateDiff: {
        selectedTab: UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS,
        tabs: {
          [UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS]: {
            criteria: {
              contextTags: [CriterionBuilder.buildEntityTagCriterion(anotherDatasetEntity)],
            },
          },
        },
      },
      expectedRestoredDiff: {
        selectedTab: UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS,
        tabs: {
          [UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS]: {
            criteria: {
              contextTags: [CriterionBuilder.buildUnresolvedEntityTagCriterion(anotherDatasetEntity.content.id)], // later resolved
            },
          },
        },
      },
    }, {
      label: '5 - Change tag view display mode',
      stateDiff: {
        tabs: {
          [UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS]: {
            types: {
              [DamDomain.ENTITY_TYPES_ENUM.DATA]: {
                selectedMode: UIDomain.RESULTS_VIEW_MODES_ENUM.LIST,
              },
            },
          },
        },
      },
      expectedRestoredDiff: {
        selectedTab: UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS,
        tabs: {
          [UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS]: {
            types: {
              [DamDomain.ENTITY_TYPES_ENUM.DATA]: {
                selectedMode: UIDomain.RESULTS_VIEW_MODES_ENUM.LIST,
              },
            },
          },
        },
      },
    }, {
      label: '6 - Add a tag result filter',
      stateDiff: {
        tabs: {
          [UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS]: {
            criteria: {
              tagsFiltering: [CriterionBuilder.buildEntityTagCriterion(anotherDataEntity)],
            },
          },
        },
      },
      expectedRestoredDiff: {
        tabs: {
          [UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS]: {
            criteria: {
              tagsFiltering: [CriterionBuilder.buildUnresolvedEntityTagCriterion(anotherDataEntity.content.id)],
            },
          },
        },
      },
    }, {
      label: '7 - Close tag results (back to main results)',
      stateDiff: {
        selectedTab: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
        tabs: {
          [UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS]: {
            criteria: {
              contextTags: [],
            },
          },
        },
      },
      expectedRestoredDiff: {
        selectedTab: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
        tabs: {
          [UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS]: {
            criteria: {
              contextTags: [],
              tagsFiltering: [], // cleared as a consequence
            },
            types: {
              [DamDomain.ENTITY_TYPES_ENUM.DATA]: {
                selectedMode: UIDomain.RESULTS_VIEW_MODES_ENUM.MAP, // cleared as a consequence
              },
            },
          },
        },
      },
    }, {
      label: '8 - Navigate to DATA / QUICKLOOKS',
      stateDiff: {
        tabs: {
          [UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS]: {
            selectedType: DamDomain.ENTITY_TYPES_ENUM.DATA,
            types: {
              [DamDomain.ENTITY_TYPES_ENUM.DATA]: {
                selectedMode: UIDomain.RESULTS_VIEW_MODES_ENUM.QUICKLOOK,
              },
            },
          },
        },
      },
      expectedRestoredDiff: {
        selectedTab: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
        tabs: {
          [UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS]: {
            selectedType: DamDomain.ENTITY_TYPES_ENUM.DATA,
            types: {
              [DamDomain.ENTITY_TYPES_ENUM.DATA]: {
                selectedMode: UIDomain.RESULTS_VIEW_MODES_ENUM.QUICKLOOK,
              },
            },
          },
        },
      },
    }, {
      label: '9 - Add a user filter on main result',
      stateDiff: {
        tabs: {
          [UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS]: {
            criteria: {
              tagsFiltering: [CriterionBuilder.buildEntityTagCriterion(anotherDataEntity)],
            },
          },
        },
      },
      expectedRestoredDiff: {
        selectedTab: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
        tabs: {
          [UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS]: {
            criteria: {
              tagsFiltering: [CriterionBuilder.buildUnresolvedEntityTagCriterion(anotherDataEntity.content.id)],
            },
          },
        },
      },
    }, {
      label: '10 - Open search pane',
      stateDiff: {
        tabs: {
          [UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS]: {
            search: {
              open: true,
            },
          },
        },
      },
      expectedRestoredDiff: {
        selectedTab: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
        tabs: {
          [UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS]: {
            search: {
              open: true,
            },
          },
        },
      },
    }, {
      label: '11 - Perform search and close search pane',
      stateDiff: {
        tabs: {
          [UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS]: {
            search: {
              open: false,
            },
            criteria: {
              // nota: criteria IDs / state / request do not matter here
              searchCriteria: [{
                pluginInstanceId: 'plugin1',
                state: { pt1Bool: true, p2Val: 18, p3Arr: ['a', 'b'] },
                requestParameters: { param1: 'x', q: 'a [* TO 18] and b:[18 to *]' },
              }, {
                pluginInstanceId: 'plugin2',
                state: { ret: 65, var: { x: 25, y: 0.25 } },
                requestParameters: { x: 'in 24.75-25.25', round: 65 },
              }],
            },
          },
        },
      },
      expectedRestoredDiff: {
        selectedTab: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
        tabs: {
          [UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS]: {
            search: {
              open: false,
            },
            criteria: {
              // nota: criteria IDs / state / request do not matter here
              searchCriteria: [{
                pluginInstanceId: 'plugin1',
                state: { pt1Bool: true, p2Val: 18, p3Arr: ['a', 'b'] },
                requestParameters: { param1: 'x', q: 'a [* TO 18] and b:[18 to *]' },
              }, {
                pluginInstanceId: 'plugin2',
                state: { ret: 65, var: { x: 25, y: 0.25 } },
                requestParameters: { x: 'in 24.75-25.25', round: 65 },
              }],
            },
          },
        },
      },
    }]

    let nextProps = props
    let nextExpectedRestored = dataContext
    updateCases.forEach(({ label, stateDiff, expectedRestoredDiff }) => {
      nextProps = { ...nextProps, resultsContext: UIDomain.ResultsContextHelper.deepMerge(nextProps.resultsContext, stateDiff) }
      // 1 - apply "external" update operation
      enzymeWrapper.setProps(nextProps)
      nextExpectedRestored = UIDomain.ResultsContextHelper.deepMerge(nextExpectedRestored, expectedRestoredDiff)
      // 2 - mimic restoration from storage and URL and check expectations (then loop to next update...)
      const savedCurrentLocation = currentLocation
      currentLocation = { query: {} } // cancelling URL mode
      const fromStorage = ContextStorageHelper.restore(dataContext, props.project, props.moduleId)
      assert.deepEqual(fromStorage, nextExpectedRestored, `${label}: restored data from local storage does not match expectations`)
      currentLocation = savedCurrentLocation
      const fromURL = ContextStorageHelper.restore(dataContext, props.project, props.moduleId)
      assert.deepEqual(fromURL, nextExpectedRestored, `${label}: restored data from URL storage does not match expectations`)
    })
  })
})
