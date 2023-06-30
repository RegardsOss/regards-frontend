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
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { UIDomain } from '@regardsoss/domain'
import { modulesManager, LazyModuleComponent } from '@regardsoss/modules'
import { DescriptionHelper } from '@regardsoss/entities-common'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { DescriptionContainer } from '../../../../../src/containers/user/tabs/description/DescriptionContainer'
import styles from '../../../../../src/styles'
import { dataContext } from '../../../../dumps/data.context.dump'
import { modulesDumpWithDescription } from '../../../../dumps/description.module.dump'
import { datasetEntity, dataEntity, anotherDataEntity } from '../../../../dumps/entities.dump'
import { CriterionBuilder } from '../../../../../src/definitions/CriterionBuilder'

const context = buildTestContext(styles)

/**
 * Test DescriptionContainer
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing DescriptionContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DescriptionContainer)
  })
  it('should show not show description when module is not available', () => {
    const props = {
      moduleId: 1,
      project: 'anyProject',
      appName: 'anyApp',
      resultsContext: dataContext,
      availableDependencies: DescriptionHelper.DESCRIPTION_DEPENDENCIES,
      modules: {},
      dynamicContainerId: 'IDK',
      updateResultsContext: () => {},
    }
    const enzymeWrapper = shallow(<DescriptionContainer {...props} />, { context })
    assert.isNotOk(enzymeWrapper.state().descriptionModule, 'Module should not have been stored in state (module not found)')
    assert.isNotOk(enzymeWrapper.state().descriptionModuleProperties, 'Module properties should not have been stored in state (module not found)')
    assert.lengthOf(enzymeWrapper.find(LazyModuleComponent), 0, 'Module should not be rendered while its model was not resolved')
  })
  it('should resolve description context when module is found and provide runtime properties as context changes', () => {
    const props = {
      moduleId: 1,
      project: 'anyProject',
      appName: 'anyApp',
      resultsContext: dataContext,
      availableDependencies: DescriptionHelper.DESCRIPTION_DEPENDENCIES,
      modules: modulesDumpWithDescription,
      dynamicContainerId: 'IDK',
      updateResultsContext: () => {},
    }
    const enzymeWrapper = shallow(<DescriptionContainer {...props} />, { context })
    assert.deepEqual(enzymeWrapper.state().descriptionModule, modulesDumpWithDescription[8].content, '(1) Module should have been stored in state (found)')
    assert.deepEqual(enzymeWrapper.state().descriptionModuleProperties, {
      id: modulesDumpWithDescription[8].content.id,
      type: modulesManager.AllDynamicModuleTypes.DESCRIPTION,
      active: true,
      applicationId: 'anyApp',
      conf: {
        ...modulesDumpWithDescription[8].content.conf,
        // add runtime render data
        runtime: {
          descriptionPath: [],
          selectedIndex: 0,
          setDescriptionPath: enzymeWrapper.instance().setDescriptionPath,
          onSearchWord: enzymeWrapper.instance().onSearchWord,
          onSearchEntity: enzymeWrapper.instance().onSearchEntity,
        },
      },
    }, '(1) Module runtime properties should have been correctly resolved')
    let moduleWrapper = enzymeWrapper.find(LazyModuleComponent)
    assert.lengthOf(moduleWrapper, 1, '(1) description module should be rendered')
    testSuiteHelpers.assertWrapperProperties(moduleWrapper, {
      project: props.project,
      appName: props.appName,
      module: enzymeWrapper.state().descriptionModuleProperties,
    }, '(1) Module properties should be correctly reported')

    // 2 - change descriptionPath and check if it is forwarded correctly to module
    enzymeWrapper.setProps({
      ...props,
      resultsContext: UIDomain.ResultsContextHelper.deepMerge(dataContext, {
        tabs: {
          [UIDomain.RESULTS_TABS_ENUM.DESCRIPTION]: {
            descriptionPath: [{
              entity: datasetEntity, selectedTreeEntry: { section: 'PARAMETERS' },
            },
            {
              entity: dataEntity, selectedTreeEntry: { section: 'PARAMETERS' },
            },
            {
              entity: anotherDataEntity, selectedTreeEntry: { section: 'PARAMETERS' },
            }],
            selectedIndex: 1,
          },
        },
      }),
    })
    moduleWrapper = enzymeWrapper.find(LazyModuleComponent)
    assert.lengthOf(moduleWrapper, 1, '(2) description module should be rendered')
    testSuiteHelpers.assertWrapperProperties(moduleWrapper, {
      project: props.project,
      appName: props.appName,
      module: {
        id: modulesDumpWithDescription[8].content.id,
        type: modulesManager.AllDynamicModuleTypes.DESCRIPTION,
        active: true,
        applicationId: 'anyApp',
        conf: {
          ...modulesDumpWithDescription[8].content.conf,
          // add runtime render data
          runtime: {
            descriptionPath: [{
              entity: datasetEntity, selectedTreeEntry: { section: 'PARAMETERS' },
            },
            {
              entity: dataEntity, selectedTreeEntry: { section: 'PARAMETERS' },
            },
            {
              entity: anotherDataEntity, selectedTreeEntry: { section: 'PARAMETERS' },
            }],
            selectedIndex: 1,
            setDescriptionPath: enzymeWrapper.instance().setDescriptionPath,
            onSearchWord: enzymeWrapper.instance().onSearchWord,
            onSearchEntity: enzymeWrapper.instance().onSearchEntity,
          },
        },
      },
    }, '(2) Module properties should be correctly reported')
  })

  it('should handle correctly description path update', () => {
    const spiedUpdateContext = {
      moduleId: null,
      resultsContext: null,
    }
    const props = {
      moduleId: 1,
      project: 'anyProject',
      appName: 'anyApp',
      resultsContext: dataContext,
      availableDependencies: DescriptionHelper.DESCRIPTION_DEPENDENCIES,
      modules: modulesDumpWithDescription,
      dynamicContainerId: 'IDK',
      updateResultsContext: (moduleId, resultsContext) => {
        spiedUpdateContext.moduleId = moduleId
        spiedUpdateContext.resultsContext = resultsContext
      },
    }
    const enzymeWrapper = shallow(<DescriptionContainer {...props} />, { context })
    assert.deepEqual(spiedUpdateContext, { moduleId: null, resultsContext: null }, 'Update context should not have been called yet')
    enzymeWrapper.instance().setDescriptionPath([dataEntity, datasetEntity], 0)
    assert.equal(spiedUpdateContext.moduleId, props.moduleId, 'Update context should be called for the right module ID')
    assert.deepEqual(spiedUpdateContext.resultsContext, {
      tabs: {
        [UIDomain.RESULTS_TABS_ENUM.DESCRIPTION]: {
          descriptionPath: [dataEntity, datasetEntity],
          selectedIndex: 0,
          unresolvedRootEntityId: null,
        },
      },
    }, 'Context diff description path should be valid')
  })
  it('should handle correctly search word tag', () => {
    const spiedUpdateContext = {
      moduleId: null,
      resultsContext: null,
    }
    const props = {
      moduleId: 1,
      project: 'anyProject',
      appName: 'anyApp',
      resultsContext: dataContext,
      availableDependencies: DescriptionHelper.DESCRIPTION_DEPENDENCIES,
      modules: modulesDumpWithDescription,
      dynamicContainerId: 'IDK',
      updateResultsContext: (moduleId, resultsContext) => {
        spiedUpdateContext.moduleId = moduleId
        spiedUpdateContext.resultsContext = resultsContext
      },
    }
    const enzymeWrapper = shallow(<DescriptionContainer {...props} />, { context })
    assert.deepEqual(spiedUpdateContext, { moduleId: null, resultsContext: null }, 'Update context should not have been called yet')
    enzymeWrapper.instance().onSearchWord('coffee')
    assert.equal(spiedUpdateContext.moduleId, props.moduleId, 'Update context should be called for the right module ID')
    assert.deepEqual(spiedUpdateContext.resultsContext, {
      selectedTab: UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS,
      tabs: {
        [UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS]: {
          criteria: {
            configurationRestrictions: [],
            contextTags: [CriterionBuilder.buildWordTagCriterion('coffee')],
            searchCriteria: [],
            appliedFacets: [],
            geometry: [],
            entitiesSelection: [],
            tagsFiltering: [],
            requestFacets: [],
          },
        },
      },
    }, 'Context diff should be correctly computed to select tag results and reset that tab for selected tag')
  })
  it('should handle correctly search entity tag', () => {
    const spiedUpdateContext = {
      moduleId: null,
      resultsContext: null,
    }
    const props = {
      moduleId: 1,
      project: 'anyProject',
      appName: 'anyApp',
      resultsContext: dataContext,
      availableDependencies: DescriptionHelper.DESCRIPTION_DEPENDENCIES,
      modules: modulesDumpWithDescription,
      dynamicContainerId: 'IDK',
      updateResultsContext: (moduleId, resultsContext) => {
        spiedUpdateContext.moduleId = moduleId
        spiedUpdateContext.resultsContext = resultsContext
      },
    }
    const enzymeWrapper = shallow(<DescriptionContainer {...props} />, { context })
    assert.deepEqual(spiedUpdateContext, { moduleId: null, resultsContext: null }, 'Update context should not have been called yet')
    enzymeWrapper.instance().onSearchEntity(datasetEntity)
    assert.equal(spiedUpdateContext.moduleId, props.moduleId, 'Update context should be called for the right module ID')
    assert.deepEqual(spiedUpdateContext.resultsContext, {
      selectedTab: UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS,
      tabs: {
        [UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS]: {
          criteria: {
            configurationRestrictions: [],
            contextTags: [CriterionBuilder.buildEntityTagCriterion(datasetEntity)],
            searchCriteria: [],
            appliedFacets: [],
            geometry: [],
            entitiesSelection: [],
            tagsFiltering: [],
            requestFacets: [],
          },
        },
      },
    }, 'Context diff should be correctly computed to select tag results and reset that tab for selected tag')
  })
})
