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
import root from 'window-or-global'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { modulesManager } from '@regardsoss/modules'
import { UserContainer } from '../../../src/containers/user/UserContainer'
import MainModuleComponent from '../../../src/components/user/MainModuleComponent'
import styles from '../../../src/styles/styles'
import { fullModuleConf } from '../../dumps/configuration.dump'
import { resolvedDatasetEntity, resolvedDataEntity } from '../../dumps/resolved.dump'
import { DescriptionEntityHelper } from '../../../src/containers/user/DescriptionEntityHelper'

const context = buildTestContext(styles)

/**
 * Test ToggleTreeVisibleOptionContainer
 * @author Raphaël Mechali
 */
describe('[Description] Testing UserContainer', () => {
  before(() => {
    testSuiteHelpers.before()
    root.location = {
      host: 'localhost/test',
      protocol: 'test',
    }
  })
  after(() => {
    testSuiteHelpers.after()
    delete root.location
  })

  it('should exists', () => {
    assert.isDefined(UserContainer)
  })

  it('should not render when shadow module (configuration storage only)', () => {
    const props = {
      projectName: 'project1',
      accessToken: 'abcdef....',
      appName: 'any',
      type: modulesManager.AllDynamicModuleTypes.DESCRIPTION,
      moduleConf: fullModuleConf, // missing runtime => shadow
      setSelectedPath: () => {},
      descriptionState: {
        descriptionPath: [],
        browsingTreeVisible: true,
      },
      settings: {
        showVersion: true,
        documentModels: [],
        primaryQuicklookGroup: 'myMain',
        quotaWarningCount: 150,
        rateWarningCount: 5,
      },
      fetchEntity: () => {},
      fetchModelAttributes: () => {},
      fetchAllEntityVersions: () => {},
      setSelectedTreeEntry: () => {},
      setModuleDescriptionPath: () => {},
      updateResultsContext: () => {},
    }

    const enzymeWrapper = shallow(<UserContainer {...props} />, { context })
    const component = enzymeWrapper.find(MainModuleComponent)
    assert.lengthOf(component, 0, 'Shadow module should hide sub components')
  })

  it('should render correctly with runtime data, and attempt resolving entities each time path changes', () => {
    const spySetModuleDescriptionPath = {}
    const props = {
      projectName: 'project1',
      accessToken: 'abcdef....',
      appName: 'any',
      type: modulesManager.AllDynamicModuleTypes.DESCRIPTION,
      moduleConf: {
        ...fullModuleConf,
        runtime: {
          selectedIndex: 0,
          descriptionPath: [resolvedDataEntity.entityWithTreeEntry],
          setDescriptionPath: () => {},
          onSearchWord: () => {},
          onSearchEntity: () => {},
        },
      },
      setSelectedPath: () => {},
      descriptionState: {
        descriptionPath: [],
        browsingTreeVisible: true,
      },
      settings: {
        showVersion: false,
        documentModels: [],
        primaryQuicklookGroup: 'myMain',
        quotaWarningCount: 150,
        rateWarningCount: 5,
      },
      fetchEntity: () => new Promise((resolve) => resolve({ payload: {} })),
      fetchModelAttributes: () => new Promise((resolve) => resolve({ payload: {} })),
      fetchAllEntityVersions: () => new Promise((resolve) => resolve({ payload: {} })),
      setSelectedTreeEntry: () => {},
      setModuleDescriptionPath: (descriptionPath) => {
        spySetModuleDescriptionPath.descriptionPath = descriptionPath
      },
      updateResultsContext: () => {},
    }
    const enzymeWrapper = shallow(<UserContainer {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(MainModuleComponent), 0,
      'Main module component should not be shown while current description state is not set')
    // 1.a - check entities resolution was started
    assert.deepEqual(spySetModuleDescriptionPath.descriptionPath,
      [DescriptionEntityHelper.buildLoadingModel(resolvedDataEntity.entityWithTreeEntry)],
      'Path should be resolved with first entity loading')
    // 1.b - simulate redux binding on current model
    const props2 = {
      ...props,
      descriptionState: {
        descriptionPath: spySetModuleDescriptionPath.descriptionPath,
        browsingTreeVisible: true,
      },
    }
    enzymeWrapper.setProps(props2)
    let mainComponentWrapper = enzymeWrapper.find(MainModuleComponent)
    assert.lengthOf(mainComponentWrapper, 1, '1.b - Main module component should be shown while resolving state')
    testSuiteHelpers.assertWrapperProperties(mainComponentWrapper, {
      settings: props2.settings,
      descriptionEntity: props2.descriptionState.descriptionPath[0],
      selectedEntityIndex: props2.moduleConf.runtime.selectedIndex,
      descriptionPath: props2.descriptionState.descriptionPath,
      allowSearching: props2.moduleConf.allowSearching,
      browsingTreeVisible: true,
      isDescriptionAllowed: enzymeWrapper.instance().isDescriptionAllowed,
      onSelectInnerLink: enzymeWrapper.instance().onSelectInnerLink,
      onSelectEntityLink: enzymeWrapper.instance().onSelectEntityLink,
      onSelectEntityIndex: enzymeWrapper.instance().onSelectEntityIndex,
      onSearchWord: props2.moduleConf.runtime.onSearchWord,
      onSearchEntity: props2.moduleConf.runtime.onSearchEntity,
    }, '1.b - main module component should be correctly set')
    // 1.c - mimic entity resolution on wrong update ID (updates concurrency management, should be refused)
    enzymeWrapper.instance().onDescriptionEntityResolved({
      descriptionEntity: resolvedDataEntity,
      descriptionUpdateGroupId: enzymeWrapper.instance().descriptionUpdateGroupId - 1,
    })
    assert.notDeepEqual(spySetModuleDescriptionPath.descriptionPath[0], resolvedDataEntity,
      '1.c - Resolution should be ignored when update group ID does not match current update ID')
    // 1.d - mimic entity resolution on rigtht update ID resolution and check it is handled
    enzymeWrapper.instance().onDescriptionEntityResolved({
      descriptionEntity: resolvedDataEntity,
      descriptionUpdateGroupId: enzymeWrapper.instance().descriptionUpdateGroupId,
    })
    assert.deepEqual(spySetModuleDescriptionPath.descriptionPath[0], resolvedDataEntity,
      '1.d - Resolution should be handled when update group ID matches current update ID')
    // 1.e - simulate redux binding on current model
    const props3 = {
      ...props,
      descriptionState: {
        descriptionPath: spySetModuleDescriptionPath.descriptionPath,
        browsingTreeVisible: true,
      },
    }
    enzymeWrapper.setProps(props3)
    mainComponentWrapper = enzymeWrapper.find(MainModuleComponent)
    assert.lengthOf(mainComponentWrapper, 1, '1.e - Main module component should be shown while resolving state')
    testSuiteHelpers.assertWrapperProperties(mainComponentWrapper, {
      settings: props3.settings,
      descriptionEntity: props3.descriptionState.descriptionPath[0],
      selectedEntityIndex: props3.moduleConf.runtime.selectedIndex,
      descriptionPath: props3.descriptionState.descriptionPath,
      allowSearching: props3.moduleConf.allowSearching,
      browsingTreeVisible: true,
      isDescriptionAllowed: enzymeWrapper.instance().isDescriptionAllowed,
      onSelectInnerLink: enzymeWrapper.instance().onSelectInnerLink,
      onSelectEntityLink: enzymeWrapper.instance().onSelectEntityLink,
      onSelectEntityIndex: enzymeWrapper.instance().onSelectEntityIndex,
      onSearchWord: props3.moduleConf.runtime.onSearchWord,
      onSearchEntity: props3.moduleConf.runtime.onSearchEntity,
    }, '1.e - main module component should be correctly set')
    // 2.a - simulate an entity added in path and check it behaves correctly
    const props4 = {
      ...props3,
      moduleConf: {
        ...props3.moduleConf,
        runtime: {
          selectedIndex: 1,
          descriptionPath: [resolvedDataEntity.entityWithTreeEntry, resolvedDatasetEntity.entityWithTreeEntry],
          setDescriptionPath: () => {},
          onSearchWord: () => {},
          onSearchEntity: () => {},
        },
      },
    }
    enzymeWrapper.setProps(props4)
    assert.deepEqual(spySetModuleDescriptionPath.descriptionPath,
      [resolvedDataEntity, DescriptionEntityHelper.buildLoadingModel(resolvedDatasetEntity.entityWithTreeEntry)],
      '2.a - Path should be computed to preserve previously resolved entity and load only the newly added one')
    // 2.b simulate redux update (promise callback was tested previously) and check sub component is correctly updated
    const props5 = {
      ...props4,
      descriptionState: {
        descriptionPath: spySetModuleDescriptionPath.descriptionPath,
        browsingTreeVisible: false,
      },
    }
    enzymeWrapper.setProps(props5)
    mainComponentWrapper = enzymeWrapper.find(MainModuleComponent)
    assert.lengthOf(mainComponentWrapper, 1, 'Main module component should be shown while resolving state')
    testSuiteHelpers.assertWrapperProperties(mainComponentWrapper, {
      settings: props5.settings,
      descriptionEntity: props5.descriptionState.descriptionPath[1],
      selectedEntityIndex: props5.moduleConf.runtime.selectedIndex,
      descriptionPath: props5.descriptionState.descriptionPath,
      allowSearching: props5.moduleConf.allowSearching,
      browsingTreeVisible: false,
      isDescriptionAllowed: enzymeWrapper.instance().isDescriptionAllowed,
      onSelectInnerLink: enzymeWrapper.instance().onSelectInnerLink,
      onSelectEntityLink: enzymeWrapper.instance().onSelectEntityLink,
      onSelectEntityIndex: enzymeWrapper.instance().onSelectEntityIndex,
      onSearchWord: props5.moduleConf.runtime.onSearchWord,
      onSearchEntity: props5.moduleConf.runtime.onSearchEntity,
    }, '1.e - main module component should be correctly set')
  })
  it('should report correctly change description path operation through parent runtime callback', () => {
    const spySetDescriptionPath = {}
    const props = {
      projectName: 'project1',
      accessToken: 'abcdef....',
      appName: 'any',
      type: modulesManager.AllDynamicModuleTypes.DESCRIPTION,
      moduleConf: {
        ...fullModuleConf,
        runtime: {
          selectedIndex: 1,
          descriptionPath: [resolvedDataEntity.entityWithTreeEntry, resolvedDatasetEntity.entityWithTreeEntry],
          setDescriptionPath: (path, index) => {
            spySetDescriptionPath.path = path
            spySetDescriptionPath.index = index
          },
          onSearchWord: () => {},
          onSearchEntity: () => {},
        },
      },
      setSelectedPath: () => {},
      descriptionState: {
        showVersion: true,
        descriptionPath: [],
        browsingTreeVisible: true,
      },
      settings: {
        showVersion: true,
        documentModels: [],
        primaryQuicklookGroup: 'myMain',
        quotaWarningCount: 150,
        rateWarningCount: 5,
      },
      fetchEntity: () => new Promise((resolve) => resolve({ payload: {} })),
      fetchModelAttributes: () => new Promise((resolve) => resolve({ payload: {} })),
      fetchAllEntityVersions: () => new Promise((resolve) => resolve({ payload: {} })),
      setSelectedTreeEntry: () => {},
      setModuleDescriptionPath: () => {},
      updateResultsContext: () => {},
    }
    const enzymeWrapper = shallow(<UserContainer {...props} />, { context })
    // 1- Check "Jump to" first entity
    enzymeWrapper.instance().onSelectEntityLink(resolvedDataEntity.entityWithTreeEntry.entity)
    assert.deepEqual(spySetDescriptionPath, {
      path: [resolvedDataEntity.entityWithTreeEntry, resolvedDatasetEntity.entityWithTreeEntry],
      index: 0,
    }, '1- Should have detected that the entity is already selected and only changed index in path')
    // 2- Test add new entity to describe : should add it directly after current index and clear previously following path
    enzymeWrapper.setProps({
      ...props,
      moduleConf: {
        ...props.moduleConf,
        runtime: {
          ...props.moduleConf.runtime,
          selectedIndex: 0,
          descriptionPath: [resolvedDatasetEntity.entityWithTreeEntry, resolvedDataEntity.entityWithTreeEntry],
        },
      },
    })
    enzymeWrapper.instance().onSelectEntityLink(resolvedDatasetEntity.displayModel.linkedDocuments[0])
    assert.deepEqual(spySetDescriptionPath, {
      path: [resolvedDatasetEntity.entityWithTreeEntry, { entity: resolvedDatasetEntity.displayModel.linkedDocuments[0], selectedTreeEntry: { section: 'PARAMETERS', child: null } }],
      index: 1,
    }, '2- Should have cleared entities after selected index and added new one at end')
    // 3 - Set index (simple callback, no computing)
    enzymeWrapper.instance().onSelectEntityIndex(1)
    assert.deepEqual(spySetDescriptionPath, {
      path: [resolvedDatasetEntity.entityWithTreeEntry, resolvedDataEntity.entityWithTreeEntry], // from props
      index: 1, // from callback
    }, '3- Should have invoked parent callback with unchanged description path but new index')
  })
})
