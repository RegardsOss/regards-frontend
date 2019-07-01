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
import { AccessDomain, CatalogDomain, UIDomain } from '@regardsoss/domain'
import { modulesManager } from '@regardsoss/modules'
import { CriterionBuilder } from '../../../../src/definitions/CriterionBuilder'
import NavigationComponent from '../../../../src/components/user/navigation/NavigationComponent'
import { NavigationContainer } from '../../../../src/containers/user/navigation/NavigationContainer'
import styles from '../../../../src/styles/styles'
import { datasetEntity, documentEntity, dataEntity } from '../../../dumps/entities.dump'

const context = buildTestContext(styles)

describe('[Search Results] Testing NavigationContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(NavigationContainer)
  })
  it('should render correctly empty with only initial levels (externally driven module case)', () => {
    const props = {
      moduleId: 1,
      description: 'idk',
      page: {
        home: false,
        iconType: AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.DEFAULT,
        title: { en: 'idk', fr: 'jmf' },
      },
      type: modulesManager.VisibleModuleTypes.SEARCH_RESULTS,

      contextTags: [CriterionBuilder.buildEntityTagCriterion(datasetEntity), CriterionBuilder.buildEntityTagCriterion(documentEntity)],
      levels: [],
      updateResultsContext: () => {},
    }
    const enzymeWrapper = shallow(<NavigationContainer {...props} />, { context })
    const component = enzymeWrapper.find(NavigationComponent)
    assert.lengthOf(component, 1, 'The corresponding component should be rendered')
    const { navigationLevels } = enzymeWrapper.state()
    testSuiteHelpers.assertWrapperProperties(component, {
      page: props.page,
      defaultIconURL: UIDomain.getModuleDefaultIconURL(modulesManager.AllDynamicModuleTypes.SEARCH_RESULTS),
      navigationLevels,
      onLevelSelected: enzymeWrapper.instance().onLevelSelected,
    })
    // check external levels have been added
    assert.lengthOf(navigationLevels, 2, 'There should be a navigation level for each external context tag')
    assert.deepEqual(navigationLevels[0], {
      type: datasetEntity.content.entityType,
      label: {
        en: datasetEntity.content.label,
        fr: datasetEntity.content.label,
      },
      isNavigationAllowed: false, // cannot remove a context tag
    }, 'First navigation level should be correctly computed from first context tag')

    assert.deepEqual(navigationLevels[1], {
      type: documentEntity.content.entityType,
      label: {
        en: documentEntity.content.label,
        fr: documentEntity.content.label,
      },
      isNavigationAllowed: true, // can navigate to last context element
    }, 'Second navigation level should be correctly computed from second context tag')
  })
  it('should render correctly empty without initial level (standalone module case)', () => {
    const props = {
      moduleId: 1,
      description: 'idk',
      page: {
        home: false,
        iconType: AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.DEFAULT,
        title: { en: 'idk', fr: 'jmf' },
      },
      type: modulesManager.VisibleModuleTypes.SEARCH_RESULTS,

      contextTags: [],
      levels: [],
      updateResultsContext: () => {},
    }
    const enzymeWrapper = shallow(<NavigationContainer {...props} />, { context })
    const component = enzymeWrapper.find(NavigationComponent)
    const { navigationLevels } = enzymeWrapper.state()
    assert.lengthOf(component, 1, 'The corresponding component should be rendered')
    testSuiteHelpers.assertWrapperProperties(component, {
      page: props.page,
      defaultIconURL: UIDomain.getModuleDefaultIconURL(modulesManager.AllDynamicModuleTypes.SEARCH_RESULTS),
      navigationLevels,
      onLevelSelected: enzymeWrapper.instance().onLevelSelected,
    })
    assert.lengthOf(navigationLevels, 1, 'There should be a root placeholder navigation level')
    assert.deepEqual(navigationLevels[0], {
      type: NavigationComponent.ROOT_TAG,
      label: {
        en: 'idk',
        fr: 'jmf',
      },
      isNavigationAllowed: true, // can navigate to last context element
    }, 'Root navigation level should be correctly computed from module page configuration')
  })

  it('should render correctly with initial levels and user levels (externally driven and user updated)', () => {
    const props = {
      moduleId: 1,
      description: 'idk',
      page: {
        home: false,
        iconType: AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.DEFAULT,
        title: { en: 'idk', fr: 'jmf' },
      },
      type: modulesManager.VisibleModuleTypes.SEARCH_RESULTS,
      contextTags: [CriterionBuilder.buildEntityTagCriterion(datasetEntity), CriterionBuilder.buildWordTagCriterion('coffee')],
      levels: [CriterionBuilder.buildWordTagCriterion('tea'), CriterionBuilder.buildEntityTagCriterion(documentEntity)],
      updateResultsContext: () => {},
    }
    const enzymeWrapper = shallow(<NavigationContainer {...props} />, { context })
    const component = enzymeWrapper.find(NavigationComponent)
    assert.lengthOf(component, 1, 'The corresponding component should be rendered')
    const { navigationLevels } = enzymeWrapper.state()
    testSuiteHelpers.assertWrapperProperties(component, {
      page: props.page,
      defaultIconURL: UIDomain.getModuleDefaultIconURL(modulesManager.AllDynamicModuleTypes.SEARCH_RESULTS),
      navigationLevels,
      onLevelSelected: enzymeWrapper.instance().onLevelSelected,
    })
    assert.lengthOf(navigationLevels, 4, 'There should be a navigation level for each context tags add user tags')
    assert.deepEqual(navigationLevels[0], {
      type: datasetEntity.content.entityType,
      label: {
        en: datasetEntity.content.label,
        fr: datasetEntity.content.label,
      },
      isNavigationAllowed: false, // cannot remove second context tag
    }, 'First context tag level should be correctly computed from context tags')
    assert.deepEqual(navigationLevels[1], {
      type: CatalogDomain.TAG_TYPES_ENUM.WORD,
      label: {
        en: 'coffee',
        fr: 'coffee',
      },
      isNavigationAllowed: true, // removing the following user tags is allowed
    }, 'Second context tag level should be correctly computed from context tags')
    assert.deepEqual(navigationLevels[2], {
      type: CatalogDomain.TAG_TYPES_ENUM.WORD,
      label: {
        en: 'tea',
        fr: 'tea',
      },
      isNavigationAllowed: true, // removing next tags allowed
    }, 'Third context tag level should be correctly computed from tags')
    assert.deepEqual(navigationLevels[3], {
      type: documentEntity.content.entityType,
      label: {
        en: documentEntity.content.label,
        fr: documentEntity.content.label,
      },
      isNavigationAllowed: true, // removing next tags allowed (even though there are none)
    }, 'Last context tag level should be correctly computed from tags')
  })

  it('should render correctly without initial levels but with levels (standalone and user updated)', () => {
    const props = {
      moduleId: 1,
      description: 'idk',
      page: {
        home: false,
        iconType: AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.DEFAULT,
      },
      type: modulesManager.VisibleModuleTypes.SEARCH_RESULTS,
      contextTags: [],
      levels: [
        CriterionBuilder.buildEntityTagCriterion(documentEntity),
        CriterionBuilder.buildWordTagCriterion('tea'),
        // some description levels
        { type: UIDomain.ResultsContextConstants.DESCRIPTION_LEVEL, entity: datasetEntity },
        { type: UIDomain.ResultsContextConstants.DESCRIPTION_LEVEL, entity: dataEntity },
      ],
      updateResultsContext: () => {},
    }
    const enzymeWrapper = shallow(<NavigationContainer {...props} />, { context })
    const component = enzymeWrapper.find(NavigationComponent)
    assert.lengthOf(component, 1, 'The corresponding component should be rendered')
    const { navigationLevels } = enzymeWrapper.state()
    testSuiteHelpers.assertWrapperProperties(component, {
      page: props.page,
      defaultIconURL: UIDomain.getModuleDefaultIconURL(modulesManager.AllDynamicModuleTypes.SEARCH_RESULTS),
      navigationLevels,
      onLevelSelected: enzymeWrapper.instance().onLevelSelected,
    })
    assert.lengthOf(navigationLevels, 5, 'There should be a navigation level for each tag / level and 1 for root level')
    assert.deepEqual(navigationLevels[0], {
      type: NavigationComponent.ROOT_TAG,
      label: {
        en: 'idk',
        fr: 'idk',
      },
      isNavigationAllowed: true, // can remove following tags
    }, 'First level should be root (defaulting to module description as there is no page)')
    assert.deepEqual(navigationLevels[1], {
      type: documentEntity.content.entityType,
      label: {
        en: documentEntity.content.label,
        fr: documentEntity.content.label,
      },
      isNavigationAllowed: true, // can remove following tags
    }, 'Second level should be computed from first tag')
    assert.deepEqual(navigationLevels[2], {
      type: CatalogDomain.TAG_TYPES_ENUM.WORD,
      label: {
        en: 'tea',
        fr: 'tea',
      },
      isNavigationAllowed: true, // can remove following tags, even though there is none
    }, 'Third level should be computed from second tag')
    assert.deepEqual(navigationLevels[3], {
      type: UIDomain.ResultsContextConstants.DESCRIPTION_LEVEL,
      label: {
        en: datasetEntity.content.label,
        fr: datasetEntity.content.label,
      },
      isNavigationAllowed: true, // can remove following tags
    }, 'Fourth level should be computed from third levels element (description)')
    assert.deepEqual(navigationLevels[4], {
      type: UIDomain.ResultsContextConstants.DESCRIPTION_LEVEL,
      label: {
        en: dataEntity.content.label,
        fr: dataEntity.content.label,
      },
      isNavigationAllowed: true, // can remove following tags
    }, 'Fifth level should be computed from fourth levels element (description)')
  })
})
