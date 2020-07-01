/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import values from 'lodash/values'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import MenuItem from 'material-ui/MenuItem'
import { ShowableAtRender } from '@regardsoss/components'
import { Field, FieldArray } from '@regardsoss/form-utils'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { DamDomain } from '@regardsoss/domain'
import { DEFAULT_RENDERER_KEY, getTypeRendererKeys } from '../../../../src/render/AttributesTypeToRender'
import { EditItemForm } from '../../../../src/configuration/dialog/edit/EditItemForm'
import MultipleAttributesFieldRender from '../../../../src/configuration/multiple/MultipleAttributesFieldRender'
import styles from '../../../../src/styles'
import { attributeModelsArray } from '../../../dumps/AttributeModels.dump'

const context = buildTestContext(styles)

/**
 * Test EditItemForm
 * @author Raphaël Mechali
 */
describe('[Attributes Common] Testing EditItemForm', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(EditItemForm)
  })
  it('should render correctly with all options enabled and convert correctly data on commit', () => {
    let spiedInitValues = null
    let spiedConfirmValues = null
    const props = {
      allowLabel: true,
      allowAttributesGroups: true,
      allowRendererSelection: true,
      attributeModels: attributeModelsArray,
      editionData: {
        attributesList: [{
          label: {
            en: 'First test',
            fr: 'Premier test',
          },
          attributes: [{
            name: 'label',
            renderer: getTypeRendererKeys(DamDomain.MODEL_ATTR_TYPES.STRING)[1], // multiline
          }, { name: 'attr2' }],
        }, {
          label: {
            en: 'Another attribute',
            fr: 'Un autre attribut',
          },
          attributes: [{ name: 'attr3' }],
        }],
        editedElementIndex: 0,
      },
      onConfirm: (newItem, order) => {
        spiedConfirmValues = { newItem, order }
      },
      onCancel: () => { },
      initialize: (initValues) => {
        spiedInitValues = initValues
      },
      handleSubmit: () => { },
      change: () => { },
    }
    const enzymeWrapper = shallow(<EditItemForm {...props} />, { context })
    // 1 - check initialization was correctly performed (adding single attribute field)
    assert.deepEqual(spiedInitValues, {
      order: 0, // current position
      ...props.editionData.attributesList[0],
      singleAttribute: { name: 'label', renderer: getTypeRendererKeys(DamDomain.MODEL_ATTR_TYPES.STRING)[1] },
    })
    // 2 - check fields and allowed values
    // a. labels (through their parent showable)
    assert.lengthOf(enzymeWrapper.find(Field).findWhere((n) => n.props().name === 'label.en'), 1, 'There should be english label')
    assert.lengthOf(enzymeWrapper.find(Field).findWhere((n) => n.props().name === 'label.fr'), 1, 'There should be french label')
    const labelFieldsShowables = enzymeWrapper.find(ShowableAtRender)
    assert.lengthOf(labelFieldsShowables, 2, 'There should be one showable for each label field')
    assert.isTrue(labelFieldsShowables.at(0).props().show, 'English label should be visible')
    assert.isTrue(labelFieldsShowables.at(0).props().show, 'French label should be visible')
    // b. order
    const orderField = enzymeWrapper.find(Field).findWhere((n) => n.props().name === 'order')
    assert.lengthOf(orderField, 1, 'There should be order field')
    const allOrderItems = orderField.find(MenuItem)
    assert.lengthOf(allOrderItems, 2, 'There should be 2 avaible positions in list of two attributes elements')
    assert.lengthOf(allOrderItems.findWhere((n) => n.props().primaryText === 'attribute.configuration.index.first'), 1, 'First position item should be available')
    assert.lengthOf(allOrderItems.findWhere((n) => n.props().primaryText === 'attribute.configuration.index.after.element'), 1, 'After another element should be available')
    // c - Test attributes groups
    const groupsField = enzymeWrapper.find(FieldArray)
    assert.lengthOf(groupsField, 1, 'There should be attributes groups field')
    assert.equal(groupsField.props().component, MultipleAttributesFieldRender, 'It should use a multiple attributes array render')
    // d - Test single attribute field has not been added
    assert.lengthOf(enzymeWrapper.find(Field).findWhere((n) => n.props().name === 'singleAttribute.name'), 0, 'There should not be the single attribute field')
    // 3 - Check that commit method will convert correctly item, not using the single attribute field
    assert.isNull(spiedConfirmValues)
    enzymeWrapper.instance().onSubmit({
      label: { en: 'hello', fr: 'bonjour' },
      singleAttribute: { name: 'i should not be there' },
      attributes: [{ name: 'a' }, { name: 'b' }],
      order: 55,
    })
    assert.deepEqual(spiedConfirmValues, {
      newItem: {
        label: { en: 'hello', fr: 'bonjour' },
        attributes: [{ name: 'a' }, { name: 'b' }],
      },
      order: 55,
    }, 'Submitted values should be correctly converted')
  })
  it('should render correctly with all options disabled and convert correctly data on commit', () => {
    let spiedInitValues = null
    let spiedConfirmValues = null
    const props = {
      allowLabel: false,
      allowAttributesGroups: false,
      allowRendererSelection: false,
      attributeModels: attributeModelsArray,
      editionData: {
        attributesList: [
          { attributes: [{ name: 'label' }] },
          { attributes: [{ name: 'attr3' }] },
          { attributes: [{ name: 'attr4' }] }],
        editedElementIndex: 2,
      },
      onConfirm: (newItem, order) => {
        spiedConfirmValues = { newItem, order }
      },
      onCancel: () => { },
      initialize: (initValues) => {
        spiedInitValues = initValues
      },
      change: () => { },
      handleSubmit: () => { },
    }
    const enzymeWrapper = shallow(<EditItemForm {...props} />, { context })
    // 1 - check initialization was correctly performed (adding single attribute field)
    assert.deepEqual(spiedInitValues, {
      order: 2,
      ...props.editionData.attributesList[2],
      singleAttribute: { name: 'attr4', renderer: DEFAULT_RENDERER_KEY },
    })
    // 2 - check fields and allowed values
    // a. labels
    assert.lengthOf(enzymeWrapper.find(Field).findWhere((n) => n.props().name === 'label.en'), 1, 'There should be english label')
    assert.lengthOf(enzymeWrapper.find(Field).findWhere((n) => n.props().name === 'label.fr'), 1, 'There should be french label')
    const labelFieldsShowables = enzymeWrapper.find(ShowableAtRender)
    assert.lengthOf(labelFieldsShowables, 2, 'There should be one showable for each label field')
    assert.isFalse(labelFieldsShowables.at(0).props().show, 'English label should be hidden')
    assert.isFalse(labelFieldsShowables.at(0).props().show, 'French label should be hidden')
    // b. order
    const orderField = enzymeWrapper.find(Field).findWhere((n) => n.props().name === 'order')
    assert.lengthOf(orderField, 1, 'There should be order field')
    const allOrderItems = orderField.find(MenuItem)
    assert.lengthOf(allOrderItems, 3, 'There should be 2 avaible positions in list of two attributes elements')
    assert.lengthOf(allOrderItems.findWhere((n) => n.props().primaryText === 'attribute.configuration.index.first'), 1, 'First position item should be available')
    assert.lengthOf(allOrderItems.findWhere((n) => n.props().primaryText === 'attribute.configuration.index.after.element'), 2, 'After another element should be available two times')
    // c - Test attributes groups
    assert.lengthOf(enzymeWrapper.find(FieldArray), 0, 'There should not be attributes groups field')
    // d - Test single attribute field has not been added
    assert.lengthOf(enzymeWrapper.find(Field).findWhere((n) => n.props().name === 'singleAttribute.name'), 1, 'There should be the single attribute field')
    // 3 - Check that commit method will convert correctly item, using the single attribute field instead of groups field
    assert.isNull(spiedConfirmValues)
    enzymeWrapper.instance().onSubmit({
      label: undefined,
      singleAttribute: { name: 'a' },
      attributes: [{ name: 'i should not be there' }],
      order: 55,
    })
    assert.deepEqual(spiedConfirmValues, {
      newItem: {
        label: undefined,
        attributes: [{ name: 'a' }],
      },
      order: 55,
    }, 'Submitted values should be correctly converted')
  })
  it('should render a specific renderer selection field when in single attribute with that option, and provide the right selection options to it', () => {
    const renderersCount = [{
      types: [DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601, DamDomain.MODEL_ATTR_TYPES.DATE_ARRAY, DamDomain.MODEL_ATTR_TYPES.DATE_INTERVAL],
      expectedOptionsCount: 6,
    }, {
      types: [DamDomain.MODEL_ATTR_TYPES.STRING],
      expectedOptionsCount: 2,
    }] // other type: expected one possible renderer
    values(DamDomain.PSEUDO_ATTR_TYPES).forEach((type) => {
      const props = {
        allowLabel: false,
        allowAttributesGroups: false,
        allowRendererSelection: true,
        attributeModels: [{ // add custom attribute with type
          content: {
            id: 600000000,
            name: 'acustomattribute',
            label: 'acustomattribute',
            jsonPath: 'acustomattribute',
            description: 'acustomattribute',
            type,
          },
        }, ...attributeModelsArray],
        editionData: {
          attributesList: [
            { attributes: [{ name: 'label' }] },
            { attributes: [{ name: 'attr3' }] },
            { attributes: [{ name: 'acustomattribute' }] }],
          editedElementIndex: 2,
        },
        editedSingleAttribute: {
          name: 'acustomattribute',
          renderer: DEFAULT_RENDERER_KEY,
        },
        onConfirm: () => {},
        onCancel: () => { },
        initialize: () => {},
        change: () => { },
        handleSubmit: () => { },
      }
      const enzymeWrapper = shallow(<EditItemForm {...props} />, { context })
      const field = enzymeWrapper.find(Field).findWhere((n) => n.props().name === 'singleAttribute.renderer')
      assert.lengthOf(field, 1, 'There should be renderer selection field')
      const options = field.find(MenuItem)
      const { expectedOptionsCount } = (renderersCount.find(({ types }) => types.includes(type)) || { expectedOptionsCount: 1 })
      assert.lengthOf(options, expectedOptionsCount, `There should be ${expectedOptionsCount} for type ${type}`)
    })
  })
})
