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
import { DamDomain } from '@regardsoss/domain'
import { DescriptionHelper } from '@regardsoss/entities-common'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { DescriptionLinkContainer } from '../../../../../src/containers/user/tabs/results/DescriptionLinkContainer'
import { modulesDumpWithDescription } from '../../../../dumps/description.module.dump'

const context = buildTestContext()

/**
 * Test DescriptionLinkContainer
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing DescriptionLinkContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DescriptionLinkContainer)
  })
  it('should show not show description when module is not available', () => {
    const props = {
      moduleId: 1,
      availableDependencies: DescriptionHelper.DESCRIPTION_DEPENDENCIES,
      modules: {},
      dynamicContainerId: 'IDK',
      updateResultsContext: () => {},
    }
    const TestComponent = () => <div />
    const enzymeWrapper = shallow(
      <DescriptionLinkContainer {...props}>
        <TestComponent />
      </DescriptionLinkContainer>,
      { context })
    assert.isNotOk(enzymeWrapper.state().descriptionModule, 'Module should not have been stored in state (not found)')

    // Check properties reporting
    const testCompWrapper = enzymeWrapper.find(TestComponent)
    const { onShowDescription, isDescAvailableFor } = enzymeWrapper.instance()
    testSuiteHelpers.assertWrapperProperties(testCompWrapper, {
      onShowDescription,
      isDescAvailableFor,
    })

    // Check availability computing without module
    assert.isFalse(isDescAvailableFor(DamDomain.ENTITY_TYPES_ENUM.DATA), 'isDescAvailableFor: Description should not be available for DATA: no module found')
    assert.isFalse(isDescAvailableFor(DamDomain.ENTITY_TYPES_ENUM.DATASET), 'isDescAvailableFor: Description should not be available for DATASET: no module found')
    assert.isFalse(isDescAvailableFor(DamDomain.ENTITY_TYPES_ENUM.COLLECTION), 'isDescAvailableFor: Description should not be available for COLLECTION: no module found')
  })
  it('should resolve description context when module is found', () => {
    const props = {
      moduleId: 1,
      availableDependencies: DescriptionHelper.DESCRIPTION_DEPENDENCIES,
      modules: modulesDumpWithDescription,
      dynamicContainerId: 'IDK',
      updateResultsContext: () => {},
    }
    const TestComponent = () => <div />
    const enzymeWrapper = shallow(
      <DescriptionLinkContainer {...props}>
        <TestComponent />
      </DescriptionLinkContainer>,
      { context })
    assert.equal(enzymeWrapper.state().descriptionModule, modulesDumpWithDescription[8].content, 'Module should have been stored in state (found)')

    // Check properties reporting
    const testCompWrapper = enzymeWrapper.find(TestComponent)
    const { onShowDescription, isDescAvailableFor } = enzymeWrapper.instance()
    testSuiteHelpers.assertWrapperProperties(testCompWrapper, {
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
  })
})
