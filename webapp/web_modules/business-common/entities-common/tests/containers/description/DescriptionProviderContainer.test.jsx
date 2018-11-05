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
import { DamDomain } from '@regardsoss/domain'
import { modulesManager } from '@regardsoss/modules'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { DescriptionProviderContainer } from '../../../src/containers/description/DescriptionProviderContainer'

const context = buildTestContext()

const dynamicContainerId = 'IDK'
// a modules dump holding only a valid description module
const validModulesDump = {
  8: { // a module that is not description
    content: {
      id: 8,
      applicationId: 'test',
      type: modulesManager.AllDynamicModuleTypes.DESCRIPTION,
      active: true,
      container: 'test-static-container',
      conf: {
        allowTagSearch: true,
        [DamDomain.ENTITY_TYPES_ENUM.COLLECTION]: {
          showDescription: false,
          showTags: false,
          showLinkedDocuments: false,
          showThumbnail: false,
          groups: [],
        },
        [DamDomain.ENTITY_TYPES_ENUM.DATASET]: {
          showDescription: false,
          showTags: false,
          showLinkedDocuments: false,
          showThumbnail: false,
          groups: [],
        },
        [DamDomain.ENTITY_TYPES_ENUM.DOCUMENT]: {
          showDescription: true,
          showTags: true,
          showLinkedDocuments: true,
          showThumbnail: true,
          groups: [],
        },
        [DamDomain.ENTITY_TYPES_ENUM.DATA]: {
          showDescription: true,
          showTags: true,
          showLinkedDocuments: true,
          showThumbnail: true,
          groups: [],
        },
      },
    },
  },
}

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
  it('should select the module when rights and module are available', () => {
    const selectedModule = DescriptionProviderContainer.getFirstDescriptionModule(DescriptionProviderContainer.DESCRIPTION_DEPENDENCIES,
      dynamicContainerId, validModulesDump)
    assert.deepEqual(selectedModule, validModulesDump[8])
  })
  it('should refuse selecting module when user has not rights', () => {
    const selectedModule = DescriptionProviderContainer.getFirstDescriptionModule([],
      dynamicContainerId, validModulesDump)
    assert.isNotOk(selectedModule)
  })
  it('should refuse selecting module when it can not find one enabled static description module', () => {
    // 1 - empty dump
    let selectedModule = DescriptionProviderContainer.getFirstDescriptionModule(DescriptionProviderContainer.DESCRIPTION_DEPENDENCIES,
      dynamicContainerId, {})
    assert.isNotOk(selectedModule, 'Should not find a module in empty dump')
    // 2 - dump with disabled static module
    selectedModule = DescriptionProviderContainer.getFirstDescriptionModule(DescriptionProviderContainer.DESCRIPTION_DEPENDENCIES,
      dynamicContainerId, {
        8: {
          content: {
            ...validModulesDump[8].content,
            active: false,
          },
        },
      })
    assert.isNotOk(selectedModule, 'Should not find a module when module is disabled')
    // 3 - dump with enabled dynamic module (the description module should be static!)
    selectedModule = DescriptionProviderContainer.getFirstDescriptionModule(DescriptionProviderContainer.DESCRIPTION_DEPENDENCIES,
      dynamicContainerId, {
        8: {
          content: {
            ...validModulesDump[8].content,
            container: dynamicContainerId,
          },
        },
      }, 'Should not find a module when module is dynamic')
    assert.isNotOk(selectedModule)
  })
  it('should only select description modules', () => {
    const selectedModule = DescriptionProviderContainer.getFirstDescriptionModule(DescriptionProviderContainer.DESCRIPTION_DEPENDENCIES,
      dynamicContainerId, {
        8: {
          content: {
            ...validModulesDump[8].content,
            type: 'I am not a description module',
          },
        },
      })
    assert.isNotOk(selectedModule)
  })
  it('should provide callbacks returning valid data, according with found module', () => {
    // 1 - provide only dependencies
    const props = {
      onSearchTag: () => { },
      availableDependencies: DescriptionProviderContainer.DESCRIPTION_DEPENDENCIES,
      modules: {},
      dynamicContainerId,
      onShowDescriptionModule: () => { },
    }
    const TestComponent = () => <div />
    const enzymeWrapper = shallow(
      <DescriptionProviderContainer {...props}>
        <TestComponent />
      </DescriptionProviderContainer>,
      { context })
    assert.isNull(enzymeWrapper.state().descriptionModule, 'Module should not have been stored in state (not found)')

    let wrapperInstance = enzymeWrapper.instance()
    const testCompWrapper = enzymeWrapper.find(TestComponent)
    assert.lengthOf(testCompWrapper, 1, 'Test component should be displayed')
    const { isDescAvailableFor, onShowDescription } = testCompWrapper.props()
    assert.equal(isDescAvailableFor, wrapperInstance.isDescAvailableFor, 'isDescAvailableFor should be correctly reported to children')
    assert.equal(onShowDescription, wrapperInstance.onShowDescription, 'onShowDescription should be correctly reported to children')
    assert.isFalse(isDescAvailableFor(DamDomain.ENTITY_TYPES_ENUM.DATA), 'isDescAvailableFor: Description should not be available for DATA: no module found')
    assert.isFalse(isDescAvailableFor(DamDomain.ENTITY_TYPES_ENUM.DATASET), 'isDescAvailableFor: Description should not be available for DATASET: no module found')
    assert.isFalse(isDescAvailableFor(DamDomain.ENTITY_TYPES_ENUM.COLLECTION), 'isDescAvailableFor: Description should not be available for COLLECTION: no module found')
    assert.isFalse(isDescAvailableFor(DamDomain.ENTITY_TYPES_ENUM.DOCUMENT), 'isDescAvailableFor: Description should not be available for DOCUMENT: no module found')

    // 2 - re-test with module configuration (description is enabled for DATA and DOCUMENT).
    enzymeWrapper.setProps({
      ...props,
      modules: validModulesDump,
    })
    wrapperInstance = enzymeWrapper.instance()
    assert.isOk(enzymeWrapper.state().descriptionModule, 'Module should have been stored in state (found)')
    assert.isTrue(wrapperInstance.isDescAvailableFor(DamDomain.ENTITY_TYPES_ENUM.DATA),
      'isDescAvailableFor: Description should be available for DATA: found module configuration')
    assert.isFalse(wrapperInstance.isDescAvailableFor(DamDomain.ENTITY_TYPES_ENUM.DATASET),
      'isDescAvailableFor: Description should not be available for DATASET: found module configuration')
    assert.isFalse(wrapperInstance.isDescAvailableFor(DamDomain.ENTITY_TYPES_ENUM.COLLECTION),
      'isDescAvailableFor: Description should not be available for COLLECTION: found module configuration')
    assert.isTrue(wrapperInstance.isDescAvailableFor(DamDomain.ENTITY_TYPES_ENUM.DOCUMENT),
      'isDescAvailableFor: Description should be available for DOCUMENT: found module configuration')
  })
})
