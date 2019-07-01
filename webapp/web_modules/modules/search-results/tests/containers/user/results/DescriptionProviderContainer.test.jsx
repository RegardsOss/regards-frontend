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
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { DamDomain, UIDomain } from '@regardsoss/domain'
import { DescriptionHelper } from '@regardsoss/entities-common'
import { modulesManager } from '@regardsoss/modules'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { CriterionBuilder } from '../../../../src/definitions/CriterionBuilder'
import { DescriptionProviderContainer } from '../../../../src/containers/user/results/DescriptionProviderContainer'
import { modulesDumpWithDescription } from '../../../dumps/description.module.dump'
import { dataEntity, datasetEntity } from '../../../dumps/entities.dump'

const context = buildTestContext()

/**
 * Test DescriptionProviderContainer
 * @author Raphaël Mechali
 */
describe('[Entities Common] Testing DescriptionProviderContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DescriptionProviderContainer)
  })
  it('should show not show description when module is not available', () => {
    const props = {
      project: 'p1',
      appName: 'user',
      levels: [{ type: UIDomain.ResultsContextConstants.DESCRIPTION_LEVEL, entity: dataEntity }],
      availableDependencies: DescriptionProviderContainer.DESCRIPTION_DEPENDENCIES,
      modules: {},
      dynamicContainerId: 'IDK',
      onNavigate: () => {},
    }
    const TestComponent = () => <div />
    const enzymeWrapper = shallow(
      <DescriptionProviderContainer {...props}>
        <TestComponent />
      </DescriptionProviderContainer>,
      { context })
    assert.deepEqual(enzymeWrapper.state().describedEntity, dataEntity, 'Described entity should be present, as current last level is a description')
    assert.isNotOk(enzymeWrapper.state().descriptionModule, 'Module should not have been stored in state (not found)')

    // Check properties reporting
    const testCompWrapper = enzymeWrapper.find(TestComponent)
    const { onShowDescription, isDescAvailableFor } = enzymeWrapper.instance()
    testSuiteHelpers.assertWrapperProperties(testCompWrapper, {
      showDescription: false, // module not resolved
      descriptionModuleProps: {}, // module not resolved
      onShowDescription,
      isDescAvailableFor,
    })

    // Check availability computing without module
    assert.isFalse(isDescAvailableFor(DamDomain.ENTITY_TYPES_ENUM.DATA), 'isDescAvailableFor: Description should not be available for DATA: no module found')
    assert.isFalse(isDescAvailableFor(DamDomain.ENTITY_TYPES_ENUM.DATASET), 'isDescAvailableFor: Description should not be available for DATASET: no module found')
    assert.isFalse(isDescAvailableFor(DamDomain.ENTITY_TYPES_ENUM.COLLECTION), 'isDescAvailableFor: Description should not be available for COLLECTION: no module found')
    assert.isFalse(isDescAvailableFor(DamDomain.ENTITY_TYPES_ENUM.DOCUMENT), 'isDescAvailableFor: Description should not be available for DOCUMENT: no module found')
  })
  it('should show not show description when last level is not description', () => {
    const props = {
      project: 'p1',
      appName: 'user',
      levels: [],
      availableDependencies: DescriptionHelper.DESCRIPTION_DEPENDENCIES,
      modules: modulesDumpWithDescription,
      dynamicContainerId: 'IDK',
      onNavigate: () => {},
    }
    const TestComponent = () => <div />
    const enzymeWrapper = shallow(
      <DescriptionProviderContainer {...props}>
        <TestComponent />
      </DescriptionProviderContainer>,
      { context })
    assert.isNull(enzymeWrapper.state().describedEntity, 'Described entity should not be present, as current last level is not a description')
    assert.equal(enzymeWrapper.state().descriptionModule, modulesDumpWithDescription[8].content, 'Module should have been stored in state (found)')

    // Check properties reporting
    const testCompWrapper = enzymeWrapper.find(TestComponent)
    const { onShowDescription, isDescAvailableFor } = enzymeWrapper.instance()
    testSuiteHelpers.assertWrapperProperties(testCompWrapper, {
      showDescription: false, // module not resolved
      descriptionModuleProps: {
        appName: props.appName,
        project: props.project,
        module: {
          id: 8,
          type: modulesManager.AllDynamicModuleTypes.DESCRIPTION,
          active: true,
          applicationId: props.appName,
          conf: {
            ...modulesDumpWithDescription[8].content.conf,
            runtime: {
              onNavigate: props.onNavigate,
              entity: null,
            },
          },
        },
      },
      onShowDescription,
      isDescAvailableFor,
    })

    // Check availability computing without module
    assert.isTrue(isDescAvailableFor(DamDomain.ENTITY_TYPES_ENUM.DATA),
      'isDescAvailableFor: Description should be available for DATA, from found module configuration')
    assert.isFalse(isDescAvailableFor(DamDomain.ENTITY_TYPES_ENUM.DATASET),
      'isDescAvailableFor: Description should not be available for DATASET, from found module configuration')
    assert.isFalse(isDescAvailableFor(DamDomain.ENTITY_TYPES_ENUM.COLLECTION),
      'isDescAvailableFor: Description should not be available for COLLECTION, from found module configuration')
    assert.isTrue(isDescAvailableFor(DamDomain.ENTITY_TYPES_ENUM.DOCUMENT),
      'isDescAvailableFor: Description should be available for DOCUMENT, from found module configuration')
  })
  it('should show / hide description as last level changes (with module)', () => {
    const props = {
      project: 'p1',
      appName: 'user',
      levels: [CriterionBuilder.buildWordTagCriterion('first-tag')],
      availableDependencies: DescriptionHelper.DESCRIPTION_DEPENDENCIES,
      modules: modulesDumpWithDescription,
      dynamicContainerId: 'IDK',
      onNavigate: () => {},
    }
    const TestComponent = () => <div />
    const enzymeWrapper = shallow(
      <DescriptionProviderContainer {...props}>
        <TestComponent />
      </DescriptionProviderContainer>,
      { context })

    // Check description hidden
    let testCompWrapper = enzymeWrapper.find(TestComponent)
    testSuiteHelpers.assertWrapperProperties(testCompWrapper, {
      showDescription: false,
      descriptionModuleProps: {
        appName: props.appName,
        project: props.project,
        module: {
          id: 8,
          type: modulesManager.AllDynamicModuleTypes.DESCRIPTION,
          active: true,
          applicationId: props.appName,
          conf: {
            ...modulesDumpWithDescription[8].content.conf,
            runtime: {
              onNavigate: props.onNavigate,
              entity: null,
            },
          },
        },
      },
    })

    // set a description as last level
    const props2 = {
      ...props,
      levels: [...props.levels, { type: UIDomain.ResultsContextConstants.DESCRIPTION_LEVEL, entity: dataEntity }],
    }
    enzymeWrapper.setProps(props2)
    testCompWrapper = enzymeWrapper.find(TestComponent)
    // check description shown
    testSuiteHelpers.assertWrapperProperties(testCompWrapper, {
      showDescription: true,
      descriptionModuleProps: {
        appName: props.appName,
        project: props.project,
        module: {
          id: 8,
          type: modulesManager.AllDynamicModuleTypes.DESCRIPTION,
          active: true,
          applicationId: props.appName,
          conf: {
            ...modulesDumpWithDescription[8].content.conf,
            runtime: {
              onNavigate: props.onNavigate,
              entity: dataEntity,
            },
          },
        },
      },
    })
    // Add a non description level
    const props3 = {
      ...props,
      levels: [...props2.levels, CriterionBuilder.buildEntityTagCriterion(datasetEntity)],
    }
    enzymeWrapper.setProps(props3)
    testCompWrapper = enzymeWrapper.find(TestComponent)
    // check description hidden
    testSuiteHelpers.assertWrapperProperties(testCompWrapper, {
      showDescription: false,
      descriptionModuleProps: {
        appName: props.appName,
        project: props.project,
        module: {
          id: 8,
          type: modulesManager.AllDynamicModuleTypes.DESCRIPTION,
          active: true,
          applicationId: props.appName,
          conf: {
            ...modulesDumpWithDescription[8].content.conf,
            runtime: {
              onNavigate: props.onNavigate,
              entity: null,
            },
          },
        },
      },
    })
  })
})
