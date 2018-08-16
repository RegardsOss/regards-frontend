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
import { assert } from 'chai'
import { DamDomain } from '@regardsoss/domain'
import { TableSortOrders, TableColumnBuilder } from '@regardsoss/components'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import {
  buildAttributesPresentationModels, buildColumnPlaceholder, buildPresentationModel,
  changeSortOrder, getInitialSorting, getSortingOn,
} from '../../src/definitions/AttributesPresentationHelper'
import { attributes } from '../dumps/attributes.dump'


/**
 * Attributes model presentation helper tests
 * @author Raphaël Mechali
 */

const providerIdStandardAttribute = DamDomain.AttributeModelController.getStandardAttributeModel(DamDomain.AttributeModelController.standardAttributesKeys.providerId)


/** A simple attribute model configuration that can be converted from dumps */
const convertableSimpleServerAttributeConf = {
  attributes: [{ name: 'my.attr.2' }],
  label: {
    en: 'a',
    fr: 'b',
  },
}

/** A simple attribute model configuration that can be converted from standard attribues */
const convertableSimpleStandardAttributeConf = {
  attributes: [{ name: providerIdStandardAttribute.content.jsonPath }],
  label: {
    en: 'a',
    fr: 'b',
  },
}

/** A configuration that cannot be converted */
const nonConvertableSimpleAttributeConf = {
  ...convertableSimpleServerAttributeConf,
  attributes: [{ name: 'i.dont.exist' }],
}

/** An attributes regroupement configuration where all attributes can be resolved */
const fullyConvertableRegroupmentConf = {
  label: {
    en: 'a',
    fr: 'b',
  },
  attributes: [{ name: 'my.attr.2' }, { name: 'my.attr.1' }, { name: providerIdStandardAttribute.content.jsonPath }],
}

/** An attributes regroupement configuration where some attributes can be resolved */
const partiallyConvertableRegroupementConf = {
  label: {
    en: 'a',
    fr: 'b',
  },
  attributes: [{ name: 'my.attr.2' }, { name: 'i.dont.exist' }],
}

/** An attributes regroupement configuration where no attribute can be resolved */
const nonConvertableRegroupmentConf = {
  ...fullyConvertableRegroupmentConf,
  attributes: [{ name: 'i.dont.exist.1' }, { name: 'i.dont.exist.2' }],
}

describe('[Search Results] Testing AttributesPresentationHelper', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('Should convert correctly a simple attribute configuration on server attribute, as default sorting', () => {
    const converted = buildPresentationModel(
      attributes, convertableSimpleServerAttributeConf, [{ attributes: [{ name: 'my.attr.2' }] }], true, 8)
    assert.isDefined(converted)
    assert.deepEqual(converted, {
      key: 'configured.column.8',
      label: convertableSimpleServerAttributeConf.label,
      attributes: [attributes[2]],
      enableSorting: true,
      sortOrder: TableSortOrders.NO_SORT,
      sortIndex: null,
      visible: true,
      defaultSorting: true,
    }, 'Attribute should be correctly converted')
  })
  it('Should convert correctly a simple attribute configuration on standard attribute (not default sorting)', () => {
    const converted = buildPresentationModel(
      attributes, convertableSimpleStandardAttributeConf, [], false, 3)
    assert.isDefined(converted)
    assert.deepEqual(converted, {
      key: 'configured.column.3',
      label: convertableSimpleServerAttributeConf.label,
      attributes: [DamDomain.AttributeModelController.getStandardAttributeModel(DamDomain.AttributeModelController.standardAttributesKeys.providerId)],
      enableSorting: false,
      sortOrder: TableSortOrders.NO_SORT,
      sortIndex: null,
      visible: true,
      defaultSorting: false,
    }, 'Attribute should be correctly converted')
  })
  it('Should reject converting a simple attribute configuration where attribute cannot be retrieved', () => {
    const converted = buildPresentationModel(attributes, nonConvertableSimpleAttributeConf, [], false, 1)
    assert.isNotOk(converted)
  })
  it('Should convert correctly an attributes regroupment configuration', () => {
    const converted = buildPresentationModel(attributes, fullyConvertableRegroupmentConf, [], true, 2)
    assert.isDefined(converted)
    assert.deepEqual(converted, {
      key: 'configured.column.2',
      label: fullyConvertableRegroupmentConf.label,
      attributes: [attributes[2], attributes[1], DamDomain.AttributeModelController.getStandardAttributeModel(DamDomain.AttributeModelController.standardAttributesKeys.providerId)],
      enableSorting: false, // cannot sort on groups
      sortOrder: TableSortOrders.NO_SORT,
      sortIndex: null,
      visible: true,
      defaultSorting: false,
    }, 'Group should be correctly converted, respecting label and attributes order')
  })
  it('Should convert correctly an attributes regroupment configuration, filtering models not found', () => {
    const converted = buildPresentationModel(attributes, partiallyConvertableRegroupementConf, [], false, 7)
    assert.isDefined(converted)
    assert.deepEqual(converted, {
      key: 'configured.column.7',
      label: partiallyConvertableRegroupementConf.label,
      attributes: [attributes[2]],
      enableSorting: false,
      sortOrder: TableSortOrders.NO_SORT,
      sortIndex: null,
      visible: true,
      defaultSorting: false,
    }, 'Group should be correctly converted, filtering missing attributes')
  })
  it('Should reject converting an attributes regroupment where no attribute can be retrieved', () => {
    const converted = buildPresentationModel(attributes, nonConvertableRegroupmentConf, [], false, 8)
    assert.isNotOk(converted)
  })
  it('Should convert correctly a simple table column', () => {
    const converted = buildColumnPlaceholder('IDK')
    assert.deepEqual(converted, {
      key: 'IDK',
      visible: true,
      enableSorting: false,
      sortOrder: TableSortOrders.NO_SORT,
    })
  })
  it('Should correctly convert presentation models, filtering elements that are using only non resolved attributes and adding table columns', () => {
    const convertedModels = buildAttributesPresentationModels(attributes, [
      convertableSimpleServerAttributeConf, // conversion count: +1
      convertableSimpleStandardAttributeConf, // +1
      nonConvertableSimpleAttributeConf, // +0
      fullyConvertableRegroupmentConf, // +1
      partiallyConvertableRegroupementConf, // +1
      nonConvertableRegroupmentConf, // +0
    ], [], true, true)
    // check converted content
    assert.lengthOf(convertedModels, 6, 'It should convert expected configurations, add columns and filter others')
    assert.deepEqual(convertedModels[0], {
      key: TableColumnBuilder.selectionColumnKey,
      visible: true,
      enableSorting: false,
      sortOrder: TableSortOrders.NO_SORT,
    }, 'There should be the selection column at position 0')
    assert.deepEqual(convertedModels[5], {
      key: TableColumnBuilder.optionsColumnKey,
      visible: true,
      enableSorting: false,
      sortOrder: TableSortOrders.NO_SORT,
    }, 'There should be the options column at last position')
  })
  it('Should add correctly sorting on presentation model when in multi sorting ', () => {
    // 1 - empty list
    let currentModels = [
      { key: 'PM1', sortOrder: TableSortOrders.NO_SORT, sortIndex: null },
      { key: 'PM2', sortOrder: TableSortOrders.NO_SORT, sortIndex: null },
      { key: 'PM3', sortOrder: TableSortOrders.NO_SORT, sortIndex: null },
    ]
    let newModels = changeSortOrder(currentModels, 'PM2', TableSortOrders.DESCENDING_ORDER, false)
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
    newModels = changeSortOrder(currentModels, 'PM1', TableSortOrders.ASCENDING_ORDER, false)
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
    const newModels = changeSortOrder(currentModels, 'PM2', TableSortOrders.DESCENDING_ORDER, false)
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
    let newModels = changeSortOrder(currentModels, 'PM2', TableSortOrders.DESCENDING_ORDER, true)
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
    newModels = changeSortOrder(currentModels, 'PM1', TableSortOrders.ASCENDING_ORDER, true)
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
    let newModels = changeSortOrder(currentModels, 'PM3', TableSortOrders.NO_SORT, false)
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
    newModels = changeSortOrder(currentModels, 'PM2', TableSortOrders.NO_SORT, false)
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
    assert.lengthOf(getSortingOn([
      { key: 'a1', sortOrder: TableSortOrders.NO_SORT, sortIndex: null },
      { key: 'a2', sortOrder: TableSortOrders.NO_SORT, sortIndex: null },
      { key: 'a3', sortOrder: TableSortOrders.NO_SORT, sortIndex: null },
    ]), 0, 'Sorting path should be correctly generated without sorting')

    assert.deepEqual(getSortingOn([
      {
        key: 'a1',
        sortOrder: TableSortOrders.NO_SORT,
        sortIndex: null,
        attributes: [{ content: { jsonPath: 'a.1' } }],
      },
      {
        key: 'a2',
        sortOrder: TableSortOrders.ASCENDING_ORDER,
        sortIndex: 1,
        attributes: [{ content: { jsonPath: 'b.2' } }],
      },
      {
        key: 'a3',
        sortOrder: TableSortOrders.DESCENDING_ORDER,
        sortIndex: 0,
        attributes: [{ content: { jsonPath: 'c.3' } }],
      },
    ]), [
      { attributePath: 'c.3', type: TableSortOrders.DESCENDING_ORDER },
      { attributePath: 'b.2', type: TableSortOrders.ASCENDING_ORDER },
    ], 'Sorting path should be correctly generated with sorting')
  })
  it('Should generate correctly initial sorting from configuration', () => {
    assert.isEmpty(getInitialSorting([]), 'Empty initial sorting should be correctly converted')
    assert.deepEqual(getInitialSorting([{
      attributes: [{ name: 'attr.2' }],
    }, {
      attributes: [{ name: 'attr.3' }],
    }]), [{
      attributePath: 'attr.2',
      type: TableSortOrders.ASCENDING_ORDER,
    }, {
      attributePath: 'attr.3',
      type: TableSortOrders.ASCENDING_ORDER,
    }], 'Initial sorting should be correctly converted')
  })
})
