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
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { DamDomain } from '@regardsoss/domain'
import { DescriptionHelper } from '@regardsoss/entities-common'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { DescriptionProviderContainer } from '../../../src/containers/user/DescriptionProviderContainer'
import { modulesDumpWithDescription } from '../../dumps/description.module.dump'

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
  it('should not allow description when module is not available', () => {
    const props = {
      id: 25,
      modules: {},
      resultsContext: null,
      dynamicContainerId: 'any',
      availableDependencies: DescriptionHelper.DESCRIPTION_DEPENDENCIES,
      dispatchExpandResults: () => {},
      dispatchCollapseGraph: () => {},
      updateResultsContext: () => {},
    }
    const TestComponent = () => <div />
    const enzymeWrapper = shallow(
      <DescriptionProviderContainer {...props}>
        <TestComponent />
      </DescriptionProviderContainer>,
      { context })
    assert.isNotOk(enzymeWrapper.state().descriptionModule, 'Module should not have been stored in state (not found)')

    // Check reported properties and callbacks
    const testCompWrapper = enzymeWrapper.find(TestComponent)
    const { descriptionProperties } = testCompWrapper.props()
    assert.isFalse(descriptionProperties.showDescriptionOption, 'Description option should be hidden')
    assert.isFalse(descriptionProperties.isDescriptionAvailableFor(DamDomain.ENTITY_TYPES_ENUM.DATASET), 'isDescriptionAvailableFor: Description should not be available for DATASET (no module found)')
    assert.isFalse(descriptionProperties.isDescriptionAvailableFor(DamDomain.ENTITY_TYPES_ENUM.COLLECTION), 'isDescriptionAvailableFor: Description should not be available for COLLECTION (no module found)')
    assert.equal(descriptionProperties.onShowDescription, enzymeWrapper.instance().onShowDescription, 'Show callback should be correctly reported')
  })
  it('should hide description when module is not configured to show dataset or collection description', () => {
    const props = {
      id: 25,
      modules: modulesDumpWithDescription,
      resultsContext: null,
      dynamicContainerId: 'any',
      availableDependencies: DescriptionHelper.DESCRIPTION_DEPENDENCIES,
      dispatchExpandResults: () => {},
      dispatchCollapseGraph: () => {},
      updateResultsContext: () => {},
    }
    const TestComponent = () => <div />
    const enzymeWrapper = shallow(
      <DescriptionProviderContainer {...props}>
        <TestComponent />
      </DescriptionProviderContainer>,
      { context })
    assert.isOk(enzymeWrapper.state().descriptionModule, 'Module should have been stored in state')

    // Check reported properties and callbacks
    const testCompWrapper = enzymeWrapper.find(TestComponent)
    const { descriptionProperties } = testCompWrapper.props()
    assert.isFalse(descriptionProperties.showDescriptionOption, 'Description option should be hidden')
    assert.isFalse(descriptionProperties.isDescriptionAvailableFor(DamDomain.ENTITY_TYPES_ENUM.DATASET), 'isDescriptionAvailableFor: Description should not be available for DATASET (by configuration)')
    assert.isFalse(descriptionProperties.isDescriptionAvailableFor(DamDomain.ENTITY_TYPES_ENUM.COLLECTION), 'isDescriptionAvailableFor: Description should not be available for COLLECTION (by configuration)')
    assert.equal(descriptionProperties.onShowDescription, enzymeWrapper.instance().onShowDescription, 'Show callback should be correctly reported')
  })
  it('should allow description when allowed for datasets', () => {
    const props = {
      id: 25,
      modules: {
        ...modulesDumpWithDescription,
        8: {
          ...modulesDumpWithDescription[8],
          content: {
            ...modulesDumpWithDescription[8].content,
            conf: {
              ...modulesDumpWithDescription[8].content.conf,
              [DamDomain.ENTITY_TYPES_ENUM.DATASET]: {
                showDescription: true,
                showTags: true,
                showLinkedDocuments: true,
                showThumbnail: true,
                groups: [],
              },
            },
          },
        },
      },
      resultsContext: null,
      dynamicContainerId: 'any',
      availableDependencies: DescriptionHelper.DESCRIPTION_DEPENDENCIES,
      dispatchExpandResults: () => {},
      dispatchCollapseGraph: () => {},
      updateResultsContext: () => {},
    }
    const TestComponent = () => <div />
    const enzymeWrapper = shallow(
      <DescriptionProviderContainer {...props}>
        <TestComponent />
      </DescriptionProviderContainer>,
      { context })
    assert.isOk(enzymeWrapper.state().descriptionModule, 'Module should have been stored in state')

    // Check reported properties and callbacks
    const testCompWrapper = enzymeWrapper.find(TestComponent)
    const { descriptionProperties } = testCompWrapper.props()
    assert.isTrue(descriptionProperties.showDescriptionOption, 'Description option should be shown')
    assert.isTrue(descriptionProperties.isDescriptionAvailableFor(DamDomain.ENTITY_TYPES_ENUM.DATASET), 'isDescriptionAvailableFor: Description should be available for DATASET')
    assert.isFalse(descriptionProperties.isDescriptionAvailableFor(DamDomain.ENTITY_TYPES_ENUM.COLLECTION), 'isDescriptionAvailableFor: Description should not be available for COLLECTION')
    assert.equal(descriptionProperties.onShowDescription, enzymeWrapper.instance().onShowDescription, 'Show callback should be correctly reported')
  })
  it('should allow description when allowed for collections', () => {
    const props = {
      id: 25,
      modules: {
        ...modulesDumpWithDescription,
        8: {
          ...modulesDumpWithDescription[8],
          content: {
            ...modulesDumpWithDescription[8].content,
            conf: {
              ...modulesDumpWithDescription[8].content.conf,
              [DamDomain.ENTITY_TYPES_ENUM.COLLECTION]: {
                showDescription: true,
                showTags: true,
                showLinkedDocuments: true,
                showThumbnail: true,
                groups: [],
              },
            },
          },
        },
      },
      resultsContext: null,
      dynamicContainerId: 'any',
      availableDependencies: DescriptionHelper.DESCRIPTION_DEPENDENCIES,
      dispatchExpandResults: () => {},
      dispatchCollapseGraph: () => {},
      updateResultsContext: () => {},
    }
    const TestComponent = () => <div />
    const enzymeWrapper = shallow(
      <DescriptionProviderContainer {...props}>
        <TestComponent />
      </DescriptionProviderContainer>,
      { context })
    assert.isOk(enzymeWrapper.state().descriptionModule, 'Module should have been stored in state')

    // Check reported properties and callbacks
    const testCompWrapper = enzymeWrapper.find(TestComponent)
    const { descriptionProperties } = testCompWrapper.props()
    assert.isTrue(descriptionProperties.showDescriptionOption, 'Description option should be shown')
    assert.isFalse(descriptionProperties.isDescriptionAvailableFor(DamDomain.ENTITY_TYPES_ENUM.DATASET), 'isDescriptionAvailableFor: Description should not be available for DATASET')
    assert.isTrue(descriptionProperties.isDescriptionAvailableFor(DamDomain.ENTITY_TYPES_ENUM.COLLECTION), 'isDescriptionAvailableFor: Description should be available for COLLECTION')
    assert.equal(descriptionProperties.onShowDescription, enzymeWrapper.instance().onShowDescription, 'Show callback should be correctly reported')
  })
})
