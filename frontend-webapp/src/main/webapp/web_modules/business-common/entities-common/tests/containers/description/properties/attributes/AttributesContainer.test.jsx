/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { DataManagementClient } from '@regardsoss/client'
import { AttributeModelController, ENTITY_TYPES_ENUM } from '@regardsoss/domain/dam'
import { getTypeRender } from '@regardsoss/attributes-common'
import AttributesComponent from '../../../../../src/components/description/properties/attributes/AttributesComponent'
import { AttributesContainer } from '../../../../../src/containers/description/properties/attributes/AttributesContainer'
import styles from '../../../../../src/styles/styles'

const context = buildTestContext(styles)

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
          model: { id: 0 },
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
          model: { id: 1 },
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
          content:
          {
            model:
            {
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
              type: 'string',
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
    // expected attributes (mixed dynamic and standard, alphabetically sorted)
    let expectedStandardAttributes = [
      { id: -4, label: 'creationDate', renderer: getTypeRender(AttributeModelController.getStandardAttributeType('creationDate')), renderValue: null },
      { id: -1, label: 'ipId', renderer: getTypeRender(AttributeModelController.getStandardAttributeType('ipId')), renderValue: { main: 'urn:child' } },
      { id: -3, label: 'label', renderer: getTypeRender(AttributeModelController.getStandardAttributeType('label')), renderValue: { main: 'thelabel' } },
      { id: -5, label: 'lastUpdate', renderer: getTypeRender(AttributeModelController.getStandardAttributeType('lastUpdate')), renderValue: null },
      { id: -2, label: 'sipId', renderer: getTypeRender(AttributeModelController.getStandardAttributeType('sipId')), renderValue: { main: 'urn:sip-parent' } }]
    assert.deepEqual(componentWrapper.props().attributes, [
      { id: 0, label: 'A Property Label', renderer: getTypeRender('string'), renderValue: { main: 'entityPropertyValue' } },
      ...expectedStandardAttributes,
    ], 'Attributes, when received, should be resolved as expected by child component, sorted alphabetically')

    const props2 = {
      ...props,
      entity: {
        content: {
          entityType: ENTITY_TYPES_ENUM.DATASET,
          ipId: 'urn:entity2',
          label: 'thelabel2',
          model: { id: 1 },
          descriptionFile: { type: 'jenexistepas/onnemevoitpas' },
        },
      },
    }
    containerWrapper.setProps(props2)
    componentWrapper = containerWrapper.find(AttributesComponent)
    expectedStandardAttributes = [
      { id: -4, label: 'creationDate', renderer: getTypeRender(AttributeModelController.getStandardAttributeType('creationDate')), renderValue: null },
      { id: -1, label: 'ipId', renderer: getTypeRender(AttributeModelController.getStandardAttributeType('ipId')), renderValue: { main: 'urn:entity2' } },
      { id: -3, label: 'label', renderer: getTypeRender(AttributeModelController.getStandardAttributeType('label')), renderValue: { main: 'thelabel2' } },
      { id: -5, label: 'lastUpdate', renderer: getTypeRender(AttributeModelController.getStandardAttributeType('lastUpdate')), renderValue: null },
      { id: -2, label: 'sipId', renderer: getTypeRender(AttributeModelController.getStandardAttributeType('sipId')), renderValue: null }]
    assert.deepEqual(componentWrapper.props().attributes, [{
      id: 0,
      label: 'A Property Label',
      renderer: getTypeRender('string'),
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
