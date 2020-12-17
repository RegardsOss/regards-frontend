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
import { shallow } from 'enzyme'
import { assert } from 'chai'
import Checkbox from 'material-ui/Checkbox'
import { DamDomain, UIDomain } from '@regardsoss/domain'
import { AttributesListConfigurationComponent } from '@regardsoss/attributes-common'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { FORM_PAGES_ENUM } from '../../../../src/domain/form/FormPagesEnum'
import ViewTypeConfigurationComponent from '../../../../src/components/admin/content/ViewTypeConfigurationComponent'
import styles from '../../../../src/styles'
import { attributes } from '../../../dumps/attributes.dump'
import { configuration as dataConfiguration } from '../../../dumps/data.configuration.dump'

const context = buildTestContext(styles)

/**
 * Test ViewTypeConfigurationComponent
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing ViewTypeConfigurationComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ViewTypeConfigurationComponent)
  })
  // render each possible case and check everything is fine
  const testCases = [{
    entityType: DamDomain.ENTITY_TYPES_ENUM.DATA,
    pageType: FORM_PAGES_ENUM.LIST_AND_TABLE,
    viewType: UIDomain.RESULTS_VIEW_MODES_ENUM.TABLE,
    values: dataConfiguration.viewsGroups[DamDomain.ENTITY_TYPES_ENUM.DATA],
    selectorDisabled: false,
  }, {
    entityType: DamDomain.ENTITY_TYPES_ENUM.DATA,
    pageType: FORM_PAGES_ENUM.QUICKLOOKS,
    viewType: UIDomain.RESULTS_VIEW_MODES_ENUM.QUICKLOOK,
    values: dataConfiguration.viewsGroups[DamDomain.ENTITY_TYPES_ENUM.DATA],
    selectorDisabled: false,
  }, {
    entityType: DamDomain.ENTITY_TYPES_ENUM.DATA,
    pageType: FORM_PAGES_ENUM.MAP,
    viewType: UIDomain.RESULTS_VIEW_MODES_ENUM.MAP,
    values: dataConfiguration.viewsGroups[DamDomain.ENTITY_TYPES_ENUM.DATA],
    selectorDisabled: false,
  }, {
    entityType: DamDomain.ENTITY_TYPES_ENUM.DATASET,
    pageType: FORM_PAGES_ENUM.LIST_AND_TABLE,
    viewType: UIDomain.RESULTS_VIEW_MODES_ENUM.TABLE,
    values: dataConfiguration.viewsGroups[DamDomain.ENTITY_TYPES_ENUM.DATASET],
    selectorDisabled: true, // single view type enabled
  }]
  testCases.forEach(({
    entityType, pageType, viewType, values, selectorDisabled,
  }) => it(`should render correctly for ${entityType}/${pageType} configuration`, () => {
    const rootNamespace = `viewsGroups.${entityType}`
    const rootViewNamespace = `${rootNamespace}.views.${viewType}`
    const props = {
      pageType,
      availableAttributes: attributes,
      currentTypeNamespace: rootNamespace,
      currentTypeFormValues: values,
      changeField: () => {},
    }
    const enzymeWrapper = shallow(<ViewTypeConfigurationComponent {...props} />, { context })
    // 1 - toggle enabled checkbox
    const toggleEnabledSelector = enzymeWrapper.find(Checkbox)
    assert.lengthOf(toggleEnabledSelector, 1, 'There should be view enabled selector')
    testSuiteHelpers.assertWrapperProperties(toggleEnabledSelector, {
      checked: true,
      onCheck: enzymeWrapper.instance().onEnableViewToggled,
      disabled: selectorDisabled,
    }, 'Toggle view enabled selector properties should be correctly set')

    // 2 - Attributes (and groups for list / table)
    const attributesList = enzymeWrapper.find(AttributesListConfigurationComponent)
    assert.lengthOf(attributesList, 1, 'There should be attributes list')

    testSuiteHelpers.assertWrapperProperties(attributesList, {
      selectableAttributes: props.availableAttributes,
      attributesFilter: viewType === UIDomain.RESULTS_VIEW_MODES_ENUM.TABLE
        ? ViewTypeConfigurationComponent.all
        : ViewTypeConfigurationComponent.allButThumbnail,
      attributesList: values.views[viewType].attributes,
      attributesListFieldName: `${rootViewNamespace}.attributes`,
      changeField: props.changeField,
      allowAttributesGroups: viewType === UIDomain.RESULTS_VIEW_MODES_ENUM.TABLE,
      allowRendererSelection: true,
      allowLabel: true,
    }, 'Attributes list properties should be correctly set')

    // 3 - Check that map specific field are shown ONLY whend editing map type
    if (viewType === UIDomain.RESULTS_VIEW_MODES_ENUM.MAP) {
      assert.lengthOf(enzymeWrapper.findWhere(n => n.props().name === `${rootViewNamespace}.backgroundLayer.url`), 1,
        'Map background URL field should be shown')
      assert.lengthOf(enzymeWrapper.findWhere(n => n.props().name === `${rootViewNamespace}.backgroundLayer.type`), 1,
        'Map background type field should be shown')
    } else {
      assert.lengthOf(enzymeWrapper.findWhere(n => n.props().name === `${rootViewNamespace}.backgroundLayer.url`), 0,
        'Map background URL field should be hidden')
      assert.lengthOf(enzymeWrapper.findWhere(n => n.props().name === `${rootViewNamespace}.backgroundLayer.type`), 0,
        'Map background type field should be hidden')
    }
  }))
  // The following test checks that disabling the initial view type sets another one as initial in next form values
  it('should select any other view type as initial when disabling this one', () => {
    // NOTA: initial mode is map in used dump
    const spiedChangeField = {
      fieldName: null,
      values: null,
    }
    const props = {
      pageType: FORM_PAGES_ENUM.MAP,
      availableAttributes: attributes,
      currentTypeNamespace: `viewsGroups.${DamDomain.ENTITY_TYPES_ENUM.DATA}`,
      currentTypeFormValues: dataConfiguration.viewsGroups[DamDomain.ENTITY_TYPES_ENUM.DATA],
      changeField: (fieldName, values) => {
        spiedChangeField.fieldName = fieldName
        spiedChangeField.values = values
      },
    }
    const enzymeWrapper = shallow(<ViewTypeConfigurationComponent {...props} />, { context })
    // 1 - check initial state
    assert.isNull(spiedChangeField.fieldName, 'Change field should not have been called (field name)')
    assert.isNull(spiedChangeField.values, 'Change field should not have been called (values)')
    assert.equal(props.currentTypeFormValues.initialMode, UIDomain.RESULTS_VIEW_MODES_ENUM.MAP, 'Map should be initially selected')
    // 2 - disable this view, check callback and values
    const checkBox = enzymeWrapper.find(Checkbox)
    assert.lengthOf(checkBox, 1, 'Enabled view toggle should be present')
    checkBox.props().onCheck()
    assert.equal(spiedChangeField.fieldName, props.currentTypeNamespace, 'Change field should happen for the whole entity type views groups')
    const newInitialMode = spiedChangeField.values.initialMode
    assert.notEqual(newInitialMode, UIDomain.RESULTS_VIEW_MODES_ENUM.MAP, 'Another initial mode should have been selected')
    assert.isTrue(spiedChangeField.values.views[newInitialMode].enabled, 'The new mode, selected as initial one, should be enabled')
  })
})
