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
import { RadioButtonGroup } from 'material-ui/RadioButton'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { UIDomain } from '@regardsoss/domain'
import { Field, FieldArray, RenderCheckbox } from '@regardsoss/form-utils'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import RestrictionsConfigurationComponent from '../../../../../src/components/admin/content/restrictions/RestrictionsConfigurationComponent'
import DatasetRestrictionsSelectionComponent from '../../../../../src/components/admin/content/restrictions/DatasetRestrictionsSelectionComponent'
import styles from '../../../../../src/styles'
import { damDatasetsDump, dataset2 } from '../../../../dumps/dam.datasets.dump'
import { datasetModelsDump } from '../../../../dumps/dataset.models.dump'

const context = buildTestContext(styles)

/**
 * Test RestrictionsConfigurationComponent
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing RestrictionsConfigurationComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(RestrictionsConfigurationComponent)
  })
  it('should render correctly and reset selection when restriction type changes', () => {
    const spyChangeField = {
      namespace: null,
      restrictions: null,
    }
    const props = {
      currentNamespace: 'myNamespace',
      currentRestrictionsValues: {
        onData: {
          lastVersionOnly: true,
        },
        byDataset: {
          type: UIDomain.DATASET_RESTRICTIONS_TYPES_ENUM.NONE,
          selection: [],
        },
      },
      datasets: damDatasetsDump,
      datasetModels: datasetModelsDump,
      changeField: (namespace, restrictions) => {
        spyChangeField.namespace = namespace
        spyChangeField.restrictions = restrictions
      },
    }
    const enzymeWrapper = shallow(<RestrictionsConfigurationComponent {...props} />, { context })
    // 0 - Check common fields
    const fields = enzymeWrapper.find(Field)
    assert.lengthOf(fields, 1, 'There should be lastVersionOnly field')
    testSuiteHelpers.assertWrapperProperties(fields, {
      name: 'myNamespace.restrictions.onData.lastVersionOnly',
      component: RenderCheckbox,
    }, 'lastVersionOnly field properties should be correctly set')
    // 1  - Check initial values
    let radioGroup = enzymeWrapper.find(RadioButtonGroup)
    assert.lengthOf(radioGroup, 1, 'There should be the radio buttons group')
    testSuiteHelpers.assertWrapperProperties(radioGroup, {
      onChange: enzymeWrapper.instance().onChangeDatasetRestrictionType,
      valueSelected: props.currentRestrictionsValues.byDataset.type,
    }, 'Radio buttons group properties should be correctly set')
    UIDomain.DATASET_RESTRICTIONS_TYPES.forEach((restrictionType) => {
      assert.lengthOf(radioGroup.findWhere((n) => n.props().value === restrictionType), 1,
        'There should be one radio button for each possible restriction type')
    })
    let selectionField = enzymeWrapper.find(FieldArray)
    assert.lengthOf(selectionField, 1, 'There should be the selection field')
    testSuiteHelpers.assertWrapperProperties(selectionField, {
      name: 'myNamespace.restrictions.byDataset.selection',
      component: DatasetRestrictionsSelectionComponent,
      datasets: props.datasets,
      datasetModels: props.datasetModels,
      currentRestrictionType: props.currentRestrictionsValues.byDataset.type,
    }, 'Selection field properties should be correctly set')
    // 2 - Test changing selection type (test callback then set props to simulate redux behavior)
    enzymeWrapper.instance().onChangeDatasetRestrictionType(null, UIDomain.DATASET_RESTRICTIONS_TYPES_ENUM.SELECTED_DATASETS)
    assert.deepEqual(spyChangeField, {
      namespace: 'myNamespace.restrictions.byDataset',
      restrictions: {
        type: UIDomain.DATASET_RESTRICTIONS_TYPES_ENUM.SELECTED_DATASETS,
        selection: [],
      },
    }, '(2) Change field callback should be invoked with right parameters (empty selection array especially)')
    const props2 = {
      ...props,
      currentRestrictionsValues: {
        ...props.currentRestrictionsValues,
        byDataset: {
          type: UIDomain.DATASET_RESTRICTIONS_TYPES_ENUM.SELECTED_DATASETS,
          selection: [dataset2.content.feature.id], // add a selection to test callback reset
        },
      },
    }
    enzymeWrapper.setProps(props2)
    radioGroup = enzymeWrapper.find(RadioButtonGroup)
    assert.lengthOf(radioGroup, 1, '(2) there should be the radio button group')
    testSuiteHelpers.assertWrapperProperties(radioGroup, {
      onChange: enzymeWrapper.instance().onChangeDatasetRestrictionType,
      valueSelected: props2.currentRestrictionsValues.byDataset.type,
    }, '(2) Radio button group properties should be correctly updated')

    selectionField = enzymeWrapper.find(FieldArray)
    assert.lengthOf(selectionField, 1, 'There should be the selection field')
    testSuiteHelpers.assertWrapperProperties(selectionField, {
      name: 'myNamespace.restrictions.byDataset.selection',
      component: DatasetRestrictionsSelectionComponent,
      datasets: props.datasets,
      datasetModels: props.datasetModels,
      currentRestrictionType: props2.currentRestrictionsValues.byDataset.type,
    }, '(2) Selection field properties should be correctly updated')
    // 3 - Test changing selection type (test callback then set props to simulate redux behavior)
    enzymeWrapper.instance().onChangeDatasetRestrictionType(null, UIDomain.DATASET_RESTRICTIONS_TYPES_ENUM.SELECTED_MODELS)
    assert.deepEqual(spyChangeField, {
      namespace: 'myNamespace.restrictions.byDataset',
      restrictions: {
        type: UIDomain.DATASET_RESTRICTIONS_TYPES_ENUM.SELECTED_MODELS,
        selection: [],
      },
    }, '(3) Change field callback should be invoked with right parameters (empty selection array especially)')
    const props3 = {
      ...props,
      currentRestrictionsValues: {
        ...props.currentRestrictionsValues,
        byDataset: {
          type: UIDomain.DATASET_RESTRICTIONS_TYPES_ENUM.SELECTED_MODELS,
          selection: [datasetModelsDump[2].content.name],
        },
      },
    }
    enzymeWrapper.setProps(props3)
    radioGroup = enzymeWrapper.find(RadioButtonGroup)
    assert.lengthOf(radioGroup, 1, '(3) there should be the radio button group')
    testSuiteHelpers.assertWrapperProperties(radioGroup, {
      onChange: enzymeWrapper.instance().onChangeDatasetRestrictionType,
      valueSelected: props3.currentRestrictionsValues.byDataset.type,
    }, '(3) Radio button group properties should be correctly updated')

    selectionField = enzymeWrapper.find(FieldArray)
    assert.lengthOf(selectionField, 1, 'There should be the selection field')
    testSuiteHelpers.assertWrapperProperties(selectionField, {
      name: 'myNamespace.restrictions.byDataset.selection',
      component: DatasetRestrictionsSelectionComponent,
      datasets: props.datasets,
      datasetModels: props.datasetModels,
      currentRestrictionType: props3.currentRestrictionsValues.byDataset.type,
    }, '(3) Selection field properties should be correctly updated')
  })
})
