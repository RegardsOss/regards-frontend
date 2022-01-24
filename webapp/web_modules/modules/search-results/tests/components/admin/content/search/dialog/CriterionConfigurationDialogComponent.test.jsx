/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import Dialog from 'material-ui/Dialog'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { DamDomain, UIDomain } from '@regardsoss/domain'
import { Field, ErrorTypes } from '@regardsoss/form-utils'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { SingleAttributeFieldRender } from '@regardsoss/attributes-common'
import { CriterionConfigurationDialogComponent } from '../../../../../../src/components/admin/content/search/dialog/CriterionConfigurationDialogComponent'
import styles from '../../../../../../src/styles'
import { attributes } from '../../../../../dumps/attributes.dump'
import { pluginMeta35, pluginMeta2 } from '../../../../../dumps/search.plugins.meta.runtime'

const context = buildTestContext(styles)

/**
 * Test CriterionConfigurationDialogComponent
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing CriterionConfigurationDialogComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(CriterionConfigurationDialogComponent)
  })
  it('should render correctly when close', () => {
    const spyInitialize = { count: 0 }
    const props = {
      open: false,
      criterionRow: null,
      availableAttributes: attributes,
      onConfirm: () => {},
      onCancel: () => {},
      invalid: false,
      editedConfiguration: null,
      initialize: (values) => {
        spyInitialize.count += 1
        spyInitialize.values = values
      },
    }
    const enzymeWrapper = shallow(<CriterionConfigurationDialogComponent {...props} />, { context })
    const dialogWrapper = enzymeWrapper.find(Dialog)
    assert.lengthOf(dialogWrapper, 1)
    assert.isFalse(dialogWrapper.props().open)
    assert.equal(spyInitialize.count, 0, 'Initialize should not have been called')
  })
  it('should render correctly when open', () => {
    const spyInitialize = { count: 0 }
    const props = {
      open: false,
      criterionRow: null,
      availableAttributes: attributes,
      onConfirm: () => { },
      onCancel: () => { },
      invalid: false,
      editedConfiguration: null,
      initialize: (values) => {
        spyInitialize.count += 1
        spyInitialize.values = values
      },
    }
    // 0 - Init (closed, the component does not support immediate opening as it is useless in real edition)
    const enzymeWrapper = shallow(<CriterionConfigurationDialogComponent {...props} />, { context })
    // 1 - open: true,
    const editionProps = {
      ...props,
      open: true,
      criterionRow: {
        label: {
          [UIDomain.LOCALES_ENUM.en]: 'anything',
          [UIDomain.LOCALES_ENUM.fr]: 'ou autre chose',
        },
        groupIndex: 0,
        criterionIndex: 3,
        pluginMetadata: {
          ...pluginMeta35,
          // Nota: we test here only attributes type with matching attributes, as meta where no attribute match should have been filtered already
          configuration: { // Test initialization and attributes resolution, using a custom metadata
            attributes: [{
              name: 'field1',
              description: 'my field 1',
              attributeType: [DamDomain.MODEL_ATTR_TYPES.STRING],
            }, {
              name: 'field2',
              description: 'my field 2',
              attributeType: [DamDomain.MODEL_ATTR_TYPES.STRING_ARRAY],
            }, {
              name: 'field3',
              description: 'my field 3',
              attributeType: [DamDomain.MODEL_ATTR_TYPES.LONG, DamDomain.MODEL_ATTR_TYPES.DOUBLE, DamDomain.MODEL_ATTR_TYPES.INTEGER],
            }, {
              name: 'field4',
              attributeType: [DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601],
            }],
          },
        },
        configuration: {
          attributes: {
            field1: DamDomain.AttributeModelController.standardAttributesKeys.model,
            field2: null,
            field3: attributes[3].content.jsonPath,
            field4: null,
          },
        },
      },
    }

    // 1.a - test published initial form values
    enzymeWrapper.setProps(editionProps)
    assert.equal(spyInitialize.count, 1, 'Initialize should have been called')
    assert.deepEqual(spyInitialize.values, {
      attributes: {
        field1: DamDomain.AttributeModelController.standardAttributesKeys.model,
        field2: '',
        field3: attributes[3].content.jsonPath,
        field4: '',
      },
    }, 'Initialization should report initial configuration as redux form values')
    // 1.b - test initial state (holding edition data) - check the right attributes are available as user choices
    const expectedAttributesByFieldIndex = [[ // field1: string attributes
      attributes[1],
      attributes[2],
      DamDomain.AttributeModelController.getStandardAttributeModel(DamDomain.AttributeModelController.standardAttributesKeys.id),
      DamDomain.AttributeModelController.getStandardAttributeModel(DamDomain.AttributeModelController.standardAttributesKeys.providerId),
      DamDomain.AttributeModelController.getStandardAttributeModel(DamDomain.AttributeModelController.standardAttributesKeys.label),
      DamDomain.AttributeModelController.getStandardAttributeModel(DamDomain.AttributeModelController.standardAttributesKeys.model),
      DamDomain.AttributeModelController.getStandardAttributeModel(DamDomain.AttributeModelController.standardAttributesKeys.geometry),
    ], [ // field 2: string array attributes
      DamDomain.AttributeModelController.getStandardAttributeModel(DamDomain.AttributeModelController.standardAttributesKeys.tags),
    ], [ // field 3: long / double / Integer attributes
      attributes[3],
      DamDomain.AttributeModelController.getStandardAttributeModel(DamDomain.AttributeModelController.standardAttributesKeys.version),
    ], [ // field 4: date attributes
      attributes[4],
    ]]
    const currentState = enzymeWrapper.state()
    assert.deepEqual(currentState, {
      editionAttributes: editionProps.criterionRow.pluginMetadata.configuration.attributes.map(({ name, description }, index) => ({
        name,
        description,
        attributes: expectedAttributesByFieldIndex[index],
      })),
    }, 'State should keep, for each field, the matching type attributes list')

    // 1.c - test render
    const dialogWrapper = enzymeWrapper.find(Dialog)
    assert.lengthOf(dialogWrapper, 1)
    testSuiteHelpers.assertWrapperProperties(dialogWrapper, {
      title: 'search.results.form.configuration.search.pane.configuration.column.dialog.title',
      onRequestClose: props.onCancel,
      open: true,
    }, 'Dialog should define the expected properties and callback')

    const allFields = dialogWrapper.find(Field)
    assert.lengthOf(currentState.editionAttributes, editionProps.criterionRow.pluginMetadata.configuration.attributes.length,
      'There should be one field for each attribute to provide, from plugin metadata')
    enzymeWrapper.state().editionAttributes.forEach((editionAttribute, index) => {
      testSuiteHelpers.assertWrapperProperties(allFields.at(index), {
        name: `attributes.${editionAttribute.name}`,
        label: 'search.results.form.configuration.search.pane.configuration.column.dialog.attribute.field',
        component: SingleAttributeFieldRender,
        attributeModels: editionAttribute.attributes,
        validate: enzymeWrapper.instance().validateAttribute,
      }, `Attribute ${editionAttribute.name} field should be correctly set`)
    })
  })
  it('should commit correctly values binded from redux-form', () => {
    const spyConfirm = { count: 0 }
    const props = {
      open: false,
      criterionRow: {
        label: {
          [UIDomain.LOCALES_ENUM.en]: 'anything',
          [UIDomain.LOCALES_ENUM.fr]: 'ou autre chose',
        },
        groupIndex: 0,
        criterionIndex: 3,
        pluginMetadata: pluginMeta2,
        configuration: {
          attributes: {
            f1: 'any.terminal.attribute',
          },
        },
      },
      availableAttributes: attributes,
      onConfirm: (values) => {
        spyConfirm.count += 1
        spyConfirm.values = values
      },
      onCancel: () => {},
      invalid: false,
      editedConfiguration: { a: 8, b: 'écureil!' },
      initialize: () => {},
    }
    const enzymeWrapper = shallow(<CriterionConfigurationDialogComponent {...props} />, { context })
    enzymeWrapper.instance().onConfirm()
    assert.deepEqual(spyConfirm, {
      count: 1,
      values: props.editedConfiguration,
    })
  })
  it('should validate attribute values in form', () => {
    const props = {
      open: true,
      criterionRow: {
        label: {
          [UIDomain.LOCALES_ENUM.en]: 'anything',
          [UIDomain.LOCALES_ENUM.fr]: 'ou autre chose',
        },
        groupIndex: 0,
        criterionIndex: 3,
        pluginMetadata: pluginMeta2,
        configuration: {
          attributes: {
            f1: 'any.terminal.attribute',
          },
        },
      },
      availableAttributes: {
        ...attributes,
        1000: {
          content: {
            id: 1000,
            name: 'attrDateInterval',
            label: 'attribute date interval',
            jsonPath: 'test.attr.dateInterval',
            description: 'The attribute date interval for test',
            type: DamDomain.MODEL_ATTR_TYPES.DATE_INTERVAL,
          },
        },
        1001: {
          content: {
            id: 1001,
            name: 'attrDateInterval',
            label: 'attribute date array',
            jsonPath: 'test.attr.dateArray',
            description: 'The attribute date array for test',
            type: DamDomain.MODEL_ATTR_TYPES.DATE_ARRAY,
          },
        },
      },
      onConfirm: () => { },
      onCancel: () => {},
      invalid: false,
      editedConfiguration: { a: 8, b: 'écureil!' },
      initialize: () => {},
    }
    const enzymeWrapper = shallow(<CriterionConfigurationDialogComponent {...props} />, { context })
    // 1 - undefined / null / empty
    assert.equal(enzymeWrapper.instance().validateAttribute(null, {}, props, 'attributes.f1'), ErrorTypes.REQUIRED)
    assert.equal(enzymeWrapper.instance().validateAttribute(undefined, {}, props, 'attributes.f1'), ErrorTypes.REQUIRED)
    assert.equal(enzymeWrapper.instance().validateAttribute('', {}, props, 'attributes.f1'), ErrorTypes.REQUIRED)
    // 2 - attribute that does not exist or typing in progress
    assert.equal(enzymeWrapper.instance().validateAttribute('i.dont.exist', {}, props, 'attributes.f1'),
      'search.results.form.configuration.search.pane.configuration.column.dialog.attribute.unknown')
    // 3 - invalid type attribute selected
    assert.equal(enzymeWrapper.instance().validateAttribute(DamDomain.AttributeModelController.getStandardAttributeModel(
      DamDomain.AttributeModelController.standardAttributesKeys.label).content.jsonPath, {}, props, 'attributes.f1'),
    'search.results.form.configuration.search.pane.configuration.column.dialog.attribute.invalid.type')
    assert.equal(enzymeWrapper.instance().validateAttribute(attributes[3].content.jsonPath, {}, props, 'attributes.f1'),
      'search.results.form.configuration.search.pane.configuration.column.dialog.attribute.invalid.type')
    // 4 - A valid attribute (expected undefined, as anything else is an error in redux form)
    assert.isUndefined(enzymeWrapper.instance().validateAttribute('test.attr.dateArray', {}, props, 'attributes.f1'),
      'There should be no error for matching type')
    assert.isUndefined(enzymeWrapper.instance().validateAttribute('test.attr.dateInterval', {}, props, 'attributes.f1'),
      'There should be no error for matching type')
  })
})
