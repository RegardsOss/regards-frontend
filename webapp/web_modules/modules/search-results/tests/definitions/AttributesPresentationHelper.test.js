/**
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { assert } from 'chai'
import { AccessDomain, DamDomain } from '@regardsoss/domain'
import { TableSortOrders } from '@regardsoss/components'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import AttributesPresentationHelper from '../../src/definitions/AttributesPresentationHelper'
import { attributes } from '../dumps/attributes.dump'


/**
 * Attributes model presentation helper tests
 * @author Raphaël Mechali
 */

const sipIdStandardAttribute = DamDomain.AttributeModelController.standardAttributes[DamDomain.AttributeModelController.standardAttributesKeys.sipId]


/** A simple attribute model configuration that can be converted from dumps */
const convertableSimpleServerAttributeConf = {
  attributeFullQualifiedName: 'my.attr.2',
  order: 3,
  visibility: true,
  facetable: true,
  initialSort: false,
}

/** A simple attribute model configuration that can be converted from standard attribues */
const convertableSimpleStandardAttributeConf = {
  attributeFullQualifiedName: sipIdStandardAttribute.entityPathName,
  order: 8,
  visibility: true,
  facetable: true,
  initialSort: true,
}

/** A configuration that cannot be converted */
const nonConvertableSimpleAttributeConf = {
  ...convertableSimpleServerAttributeConf,
  attributeFullQualifiedName: 'i.dont.exist',
}

/** A configuration that cannot be converted */
const nonVisibleSimpleAttributeConf = {
  ...convertableSimpleServerAttributeConf,
  visibility: false,
  initialSort: false,
}

/** An attributes regroupement configuration where all attributes can be resolved */
const fullyConvertableRegroupmentConf = {
  label: 'fully resolved',
  attributes: [2, 1],
  visibility: true,
  order: 2,
}

/** An attributes regroupement configuration where some attributes can be resolved */
const partiallyConvertableRegroupementConf = {
  label: 'partially resolved',
  attributes: [2, 88],
  visibility: true,
  order: 95,
}

/** An attributes regroupement configuration where no attribute can be resolved */
const nonConvertableRegroupmentConf = {
  ...fullyConvertableRegroupmentConf,
  label: 'not resolved',
  attributes: [999, 1000],
}

/** An attributes regroupement configuration that is not visible */
const nonVisibleRegroupmenentConf = {
  ...fullyConvertableRegroupmentConf,
  label: 'not visible',
  visibility: false,
}

describe('[Search Results] Testing AttributesPresentationHelper', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('Should convert correctly a simple attribute configuration on server attribute', () => {
    const converted = AttributesPresentationHelper.buildSimplePresentationModel(convertableSimpleServerAttributeConf, attributes, true)
    assert.isDefined(converted)
    assert.deepEqual(converted, {
      key: convertableSimpleServerAttributeConf.attributeFullQualifiedName,
      label: attributes[2].content.label,
      attributes: [attributes[2]],
      enableSorting: true,
      sortOrder: TableSortOrders.NO_SORT,
      sortIndex: null,
      order: convertableSimpleServerAttributeConf.order,
    }, 'Attribute should be correctly converted')
  })
  it('Should convert correctly a simple attribute configuration on standard attribute', () => {
    const converted = AttributesPresentationHelper.buildSimplePresentationModel(convertableSimpleStandardAttributeConf, attributes, false)
    assert.isDefined(converted)
    assert.deepEqual(converted, {
      key: convertableSimpleStandardAttributeConf.attributeFullQualifiedName,
      label: sipIdStandardAttribute.label,
      attributes: [AccessDomain.AttributeConfigurationController.getStandardAttributeConf(DamDomain.AttributeModelController.standardAttributesKeys.sipId)],
      enableSorting: false,
      sortOrder: TableSortOrders.NO_SORT,
      sortIndex: null,
      order: convertableSimpleStandardAttributeConf.order,
    }, 'Attribute should be correctly converted')
  })
  it('Should refuse converting non visible simple attribute configuration (such configuration is used for sorting or facets)', () => {
    const converted = AttributesPresentationHelper.buildSimplePresentationModel(nonVisibleSimpleAttributeConf, attributes, false)
    assert.isNotOk(converted)
  })
  it('Should refuse converting a simple attribute configuration where attribute cannot be retrieved', () => {
    const converted = AttributesPresentationHelper.buildSimplePresentationModel(nonConvertableSimpleAttributeConf, attributes, false)
    assert.isNotOk(converted)
  })
  it('Should convert correctly an attributes regroupment configuration (such structure contains only server attribute models)', () => {
    const converted = AttributesPresentationHelper.buildGroupPresentationModel(fullyConvertableRegroupmentConf, attributes)
    assert.isDefined(converted)
    assert.deepEqual(converted, {
      key: fullyConvertableRegroupmentConf.label,
      label: fullyConvertableRegroupmentConf.label,
      attributes: [attributes[2], attributes[1]],
      enableSorting: false, // cannot sort on groups
      sortOrder: TableSortOrders.NO_SORT,
      sortIndex: null,
      order: fullyConvertableRegroupmentConf.order,
    }, 'Group should be correctly converted, respecting label and attributes order')
  })
  it('Should convert correctly an attributes regroupment configuration, filtering models not found', () => {
    const converted = AttributesPresentationHelper.buildGroupPresentationModel(partiallyConvertableRegroupementConf, attributes)
    assert.isDefined(converted)
    assert.deepEqual(converted, {
      key: partiallyConvertableRegroupementConf.label, // in attribute groups, key is label (supposed unique)
      label: partiallyConvertableRegroupementConf.label,
      attributes: [attributes[2]],
      enableSorting: false,
      sortOrder: TableSortOrders.NO_SORT,
      sortIndex: null,
      order: partiallyConvertableRegroupementConf.order,
    }, 'Group should be correctly converted, filtering missing attributes')
  })
  it('Should refuse converting a non visible attributes regroupment configuration', () => {
    const converted = AttributesPresentationHelper.buildGroupPresentationModel(nonVisibleRegroupmenentConf, attributes)
    assert.isNotOk(converted)
  })
  it('Should refuse converting an attributes regroupment where no attribute can be retrieved', () => {
    const converted = AttributesPresentationHelper.buildGroupPresentationModel(nonConvertableRegroupmentConf, attributes)
    assert.isNotOk(converted)
  })
  it('Should correctly convert presentation models, filtering elements that are hidden or using only non resolved attributes', () => {
    const convertedModels =
      AttributesPresentationHelper.buildAttributesPresentationModels(attributes, [
        convertableSimpleServerAttributeConf, // conversion count: +1
        convertableSimpleStandardAttributeConf, // +1
        nonConvertableSimpleAttributeConf, // +0
        nonVisibleSimpleAttributeConf, // +0
      ], [
        fullyConvertableRegroupmentConf, // +1
        partiallyConvertableRegroupementConf, // +1
        nonConvertableRegroupmentConf, // +0
        nonVisibleRegroupmenentConf, // +0
      ], true)
    // check converted content
    assert.lengthOf(convertedModels, 4, 'It should convert expected configurations and filter others')
    // convertableSimpleServerAttributeConf
    let convertedModel = convertedModels.find(model => model.key === convertableSimpleServerAttributeConf.attributeFullQualifiedName)
    assert.isDefined(convertedModel, 'We should retrieve convertableSimpleServerAttributeConf in converted reuslts')
    assert.isTrue(convertedModel.enableSorting, 'convertableSimpleServerAttributeConf converted model should be sortable')
    // convertableSimpleStandardAttributeConf
    convertedModel = convertedModels.find(model => model.key === convertableSimpleStandardAttributeConf.attributeFullQualifiedName)
    assert.isDefined(convertedModel, 'We should retrieve convertableSimpleStandardAttributeConf in converted reuslts')
    assert.isTrue(convertedModel.enableSorting, 'convertableSimpleStandardAttributeConf converted model should be sortable')
    // fullyConvertableRegroupmentConf
    convertedModel = convertedModels.find(model => model.key === fullyConvertableRegroupmentConf.label)
    assert.isDefined(convertedModel, 'We should retrieve fullyConvertableRegroupmentConf in converted reuslts')
    assert.isFalse(convertedModel.enableSorting, 'fullyConvertableRegroupmentConf converted model should not be sortable as it is a group')
    // partiallyConvertableRegroupementConf
    convertedModel = convertedModels.find(model => model.key === partiallyConvertableRegroupementConf.label)
    assert.isDefined(convertedModel, 'We should retrieve partiallyConvertableRegroupementConf in converted reuslts')
    assert.isFalse(convertedModel.enableSorting, 'partiallyConvertableRegroupementConf converted model should not be sortable as it is a group')
  })
  it('Should add correctly sorting on presentation model when in multi sorting ', () => {
    // 1 - empty list
    let currentModels = [
      { key: 'PM1', sortOrder: TableSortOrders.NO_SORT, sortIndex: null },
      { key: 'PM2', sortOrder: TableSortOrders.NO_SORT, sortIndex: null },
      { key: 'PM3', sortOrder: TableSortOrders.NO_SORT, sortIndex: null },
    ]
    let newModels = AttributesPresentationHelper.changeSortOrder(currentModels, 'PM2', TableSortOrders.DESCENDING_ORDER, false)
    assert.deepEqual(newModels[0], currentModels[0], '1- PM1 should be unchanged')
    assert.deepEqual(newModels[1], {
      key: 'PM2',
      sortOrder: TableSortOrders.DESCENDING_ORDER,
      sortIndex: 0,
    }, '1- PM2 should be updated computed for new sorting')
    assert.deepEqual(newModels[2], currentModels[2], '1- PM3 should be unchanged')

    // 2 - non empty list, should insert at end
    currentModels = [
      { key: 'PM1', sortOrder: TableSortOrders.NO_SORT, sortIndex: null },
      { key: 'PM2', sortOrder: TableSortOrders.ASCENDING_ORDER, sortIndex: 0 },
      { key: 'PM3', sortOrder: TableSortOrders.DESCENDING_ORDER, sortIndex: 1 },
    ]
    newModels = AttributesPresentationHelper.changeSortOrder(currentModels, 'PM1', TableSortOrders.ASCENDING_ORDER, false)
    assert.deepEqual(newModels[0], {
      key: 'PM1',
      sortOrder: TableSortOrders.ASCENDING_ORDER,
      sortIndex: 2,
    }, '2- PM1 should be correctly computed for new sorting')
    assert.deepEqual(newModels[1], currentModels[1], '2- PM2 should be unchanged')
    assert.deepEqual(newModels[2], currentModels[2], '2- PM3 should be unchanged')
  })
  it('Should switch correctly sort type on presentation model when in multi sorting ', () => {
    const currentModels = [
      { key: 'PM1', sortOrder: TableSortOrders.NO_SORT, sortIndex: null },
      { key: 'PM2', sortOrder: TableSortOrders.ASCENDING_ORDER, sortIndex: 0 },
      { key: 'PM3', sortOrder: TableSortOrders.DESCENDING_ORDER, sortIndex: 1 },
    ]
    const newModels = AttributesPresentationHelper.changeSortOrder(currentModels, 'PM2', TableSortOrders.DESCENDING_ORDER, false)
    assert.deepEqual(newModels[0], currentModels[0], 'PM1 should be unchanged')
    assert.deepEqual(newModels[1], {
      key: 'PM2',
      sortOrder: TableSortOrders.DESCENDING_ORDER,
      sortIndex: 0,
    }, 'PM2 should be correctly computed for new sorting')
    assert.deepEqual(newModels[2], currentModels[2], 'PM3 should be unchanged')
  })
  it('Should add/switch correctly sorting on presentation model when in mono sorting', () => {
    // 1 - empty list
    let currentModels = [
      { key: 'PM1', sortOrder: TableSortOrders.NO_SORT, sortIndex: null },
      { key: 'PM2', sortOrder: TableSortOrders.NO_SORT, sortIndex: null },
      { key: 'PM3', sortOrder: TableSortOrders.NO_SORT, sortIndex: null },
    ]
    let newModels = AttributesPresentationHelper.changeSortOrder(currentModels, 'PM2', TableSortOrders.DESCENDING_ORDER, true)
    assert.deepEqual(newModels[0], currentModels[0], '1- PM1 should be unchanged')
    assert.deepEqual(newModels[1], {
      key: 'PM2',
      sortOrder: TableSortOrders.DESCENDING_ORDER,
      sortIndex: 0,
    }, '1- PM2 should be updated computed for new sorting')
    assert.deepEqual(newModels[2], currentModels[2], '1- PM3 should be unchanged')

    // 2 - non empty list, should clear any other sorting at end
    currentModels = [
      { key: 'PM1', sortOrder: TableSortOrders.NO_SORT, sortIndex: null },
      { key: 'PM2', sortOrder: TableSortOrders.ASCENDING_ORDER, sortIndex: 0 },
      { key: 'PM3', sortOrder: TableSortOrders.DESCENDING_ORDER, sortIndex: 1 },
    ]
    newModels = AttributesPresentationHelper.changeSortOrder(currentModels, 'PM1', TableSortOrders.ASCENDING_ORDER, true)
    assert.deepEqual(newModels[0], {
      key: 'PM1',
      sortOrder: TableSortOrders.ASCENDING_ORDER,
      sortIndex: 0,
    }, '2- PM1 should be correctly computed for new sorting')
    assert.deepEqual(newModels[1], {
      key: 'PM2',
      sortOrder: TableSortOrders.NO_SORT,
      sortIndex: null,
    }, '2- PM2 sorting should have been removed')
    assert.deepEqual(newModels[2], {
      key: 'PM3',
      sortOrder: TableSortOrders.NO_SORT,
      sortIndex: null,
    }, '2- PM3 sorting should have been removed')
  })
  it('Should delete correctly sort type on presentation model (not related with mono or multi sorting) ', () => {
    // 1 - on single element list
    let currentModels = [
      { key: 'PM1', sortOrder: TableSortOrders.NO_SORT, sortIndex: null },
      { key: 'PM2', sortOrder: TableSortOrders.NO_SORT, sortIndex: null },
      { key: 'PM3', sortOrder: TableSortOrders.DESCENDING_ORDER, sortIndex: 0 },
    ]
    let newModels = AttributesPresentationHelper.changeSortOrder(currentModels, 'PM3', TableSortOrders.NO_SORT, false)
    assert.deepEqual(newModels[0], currentModels[0], '1- PM1 should be unchanged')
    assert.deepEqual(newModels[1], currentModels[1], '1- PM2 should be unchanged')
    assert.deepEqual(newModels[2], {
      key: 'PM3',
      sortOrder: TableSortOrders.NO_SORT,
      sortIndex: null,
    }, '1- PM3 should be correctly computed for new sorting')

    // 2 - on many elements list, shifting next elements
    currentModels = [
      { key: 'PM1', sortOrder: TableSortOrders.ASCENDING_ORDER, sortIndex: 2 },
      { key: 'PM2', sortOrder: TableSortOrders.ASCENDING_ORDER, sortIndex: 1 },
      { key: 'PM3', sortOrder: TableSortOrders.DESCENDING_ORDER, sortIndex: 0 },
    ]
    newModels = AttributesPresentationHelper.changeSortOrder(currentModels, 'PM2', TableSortOrders.NO_SORT, false)
    assert.deepEqual(newModels[0], {
      key: 'PM1',
      sortOrder: TableSortOrders.ASCENDING_ORDER,
      sortIndex: 1,
    }, '2- PM1 sort index should have been shifted down')
    assert.deepEqual(newModels[1], {
      key: 'PM2',
      sortOrder: TableSortOrders.NO_SORT,
      sortIndex: null,
    }, '2- PM2 sorting should have been removed')
    assert.deepEqual(newModels[2], currentModels[2], '2- PM3 should be unchanged')
  })
  it('Should generate correctly sorting order for query, using presentation models order', () => {
    assert.lengthOf(AttributesPresentationHelper.getSortingOn([
      { key: 'PM1', sortOrder: TableSortOrders.NO_SORT, sortIndex: null },
      { key: 'PM2', sortOrder: TableSortOrders.NO_SORT, sortIndex: null },
      { key: 'PM3', sortOrder: TableSortOrders.NO_SORT, sortIndex: null },
    ]), 0, 'Sorting path should be correctly generated without sorting')

    assert.deepEqual(AttributesPresentationHelper.getSortingOn([
      { key: 'PM1', sortOrder: TableSortOrders.NO_SORT, sortIndex: null },
      { key: 'PM2', sortOrder: TableSortOrders.ASCENDING_ORDER, sortIndex: 1 },
      { key: 'PM3', sortOrder: TableSortOrders.DESCENDING_ORDER, sortIndex: 0 },
    ]), [
      { attributePath: 'PM3', type: TableSortOrders.DESCENDING_ORDER },
      { attributePath: 'PM2', type: TableSortOrders.ASCENDING_ORDER },
    ], 'Sorting path should be correctly generated with sorting')
  })
})

