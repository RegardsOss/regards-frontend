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
import { StringComparison } from '@regardsoss/form-utils'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { DataManagementClient } from '@regardsoss/client'
import { AttributeModelController, ENTITY_TYPES_ENUM } from '@regardsoss/domain/dam'
import { getTypeRender } from '@regardsoss/attributes-common'
import AttributesComponent from '../../../../../src/components/description/properties/attributes/AttributesComponent'
import { AttributesContainer } from '../../../../../src/containers/description/properties/attributes/AttributesContainer'
import styles from '../../../../../src/styles/styles'

const context = buildTestContext(styles)

function buildExpectedStandardAttributes(entity) {
  return AttributesContainer.DESCRIPTION_ATTRIBUTES.map(({
    id, label, type, jsonPath,
  }) => {
    const renderValue = AttributeModelController.getEntityAttributeValue(entity, jsonPath)
    return {
      id, label, Renderer: getTypeRender(type), renderValue,
    }
  }).sort((attr1, attr2) => StringComparison.compare(attr1.label, attr2.label))
}

describe('[Entities Common] Testing AttributesContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AttributesContainer)
  })
  it('should render no data correctly', () => {
    const props = {
      // eslint-disable-next-line react/no-unused-prop-types
      entity: null,
      fetchModelAttributesActions: new DataManagementClient.ModelAttributesActions('test'),
      fetchModelAttributesSelectors: DataManagementClient.ModelAttributesSelectors('test'),
      loading: false,
      fetchedModelAttributes: {},
      dispatchFetchModelAttributes: () => { },
    }


    const enzymeWrapper = shallow(<AttributesContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(AttributesComponent)
    assert.lengthOf(componentWrapper, 1, 'The corresponding component should be rendered')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      loading: false,
      attributes: [],
    }, 'No data properties should be correctly reported')
  })
  it('should render loading correctly', () => {
    const props = {
      // eslint-disable-next-line react/no-unused-prop-types
      entity: null,
      fetchModelAttributesActions: new DataManagementClient.ModelAttributesActions('test'),
      fetchModelAttributesSelectors: DataManagementClient.ModelAttributesSelectors('test'),
      loading: true,
      fetchedModelAttributes: {},
      dispatchFetchModelAttributes: () => { },
    }


    const enzymeWrapper = shallow(<AttributesContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(AttributesComponent)
    assert.lengthOf(componentWrapper, 1, 'The corresponding component should be rendered')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      loading: true,
      attributes: [],
    }, 'Loading properties should be correctly reported')
  })
  it('should fetch attributes', () => {
    const fetchCount = {
      attributes: 0,
    }
    const props = {
      fetchModelAttributesActions: new DataManagementClient.ModelAttributesActions('test'),
      fetchModelAttributesSelectors: DataManagementClient.ModelAttributesSelectors('test'),
      loading: true,
      fetchedModelAttributes: {},
      dispatchFetchModelAttributes: () => { fetchCount.attributes += 1 },
      entity: {
        content: {
          entityType: 'DATA',
          ipId: 'URN:AIP:DATA:0',
          label: 'ça',
          model: { name: 'NEW_MODEL' },
          descriptionFile: { type: 'text/markdown' },
          tags: [],
        },
      },
    }

    shallow(<AttributesContainer {...props} />, { context, lifecycleExperimental: true })
    assert.equal(fetchCount.attributes, 1, 'Attributes should have been fetched for entity')
  })
  it('should convert correctly attribute models when receiving them (after fetch)', () => {
    const props = {
      fetchModelAttributesActions: new DataManagementClient.ModelAttributesActions('test'),
      fetchModelAttributesSelectors: DataManagementClient.ModelAttributesSelectors('test'),
      loading: true,
      dispatchFetchModelAttributes: () => { },
      entity: {
        content: {
          entityType: ENTITY_TYPES_ENUM.DATASET,
          model: { name: 'MODEL_1' },
          descriptionFile: { type: 'jenexistepas/onnemevoitpas' },
          // standard attributes
          ipId: 'urn:child',
          sipId: 'urn:sip-parent',
          label: 'thelabel',
          creationDate: null,
          lastUpdate: null,
          properties: {
            aproperty: 'entityPropertyValue',
          },
          tags: [],
        },
      },
      fetchedModelAttributes: {
        0: {
          content: {
            model: {
              id: 0,
              name: 'Missions',
              type: 'COLLECTION',
              description: 'Describes a mission collection',
            },
            id: 0,
            mode: 'idc',
            attribute: {
              id: 0,
              name: 'aproperty',
              label: 'A Property Label',
              jsonPath: 'properties.aproperty',
              type: 'STRING',
              fragment: { id: 0, name: 'DEFAULT' },
            },
          },
        },
      },
      fetchedDatasetDescriptionResult: null,
      fetchedCollectionDescriptionResult: null,
    }


    const containerWrapper = shallow(<AttributesContainer {...props} />, { context, lifecycleExperimental: true })
    let componentWrapper = containerWrapper.find(AttributesComponent)


    let expectedStandardAttributes = buildExpectedStandardAttributes(props.entity)
    assert.deepEqual(componentWrapper.props().attributes, [
      {
        id: 0, label: 'A Property Label', Renderer: getTypeRender('string'), renderValue: 'entityPropertyValue',
      },
      ...expectedStandardAttributes,
    ], 'Attributes, when received, should be resolved as expected by child component, sorted alphabetically')

    const props2 = {
      ...props,
      entity: {
        content: {
          entityType: ENTITY_TYPES_ENUM.DATASET,
          ipId: 'urn:entity2',
          label: 'thelabel2',
          model: { name: 'MODEL_1' },
          descriptionFile: { type: 'jenexistepas/onnemevoitpas' },
          tags: [],
        },
      },
    }
    containerWrapper.setProps(props2)
    componentWrapper = containerWrapper.find(AttributesComponent)
    expectedStandardAttributes = buildExpectedStandardAttributes(props2.entity)
    assert.deepEqual(componentWrapper.props().attributes, [{
      id: 0,
      label: 'A Property Label',
      Renderer: getTypeRender('string'),
      renderValue: null,
    }, ...expectedStandardAttributes], 'When entity changes but not attributes, resolution should be perfomed again, sorted alphabetically')

    const props3 = {
      ...props2,
      fetchedModelAttributes: {},
    }
    containerWrapper.setProps(props3)
    componentWrapper = containerWrapper.find(AttributesComponent)
    assert.deepEqual(componentWrapper.props().attributes, expectedStandardAttributes, 'When attributes change, resolution should be performed again')
  })
})
