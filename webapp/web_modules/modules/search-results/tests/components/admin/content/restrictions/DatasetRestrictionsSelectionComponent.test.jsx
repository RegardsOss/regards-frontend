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
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { UIDomain } from '@regardsoss/domain'
import { TableHeaderTextField, InfiniteTableContainer } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers, ReduxFormTestHelper } from '@regardsoss/tests-helpers'
import DatasetRestrictionsSelectionComponent from '../../../../../src/components/admin/content/restrictions/DatasetRestrictionsSelectionComponent'
import styles from '../../../../../src/styles'
import { datasetModelsDump } from '../../../../dumps/dataset.models.dump'
import {
  damDatasetsDump, dataset1, dataset2, dataset3,
} from '../../../../dumps/dam.datasets.dump'

const context = buildTestContext(styles)

/**
 * Test DatasetRestrictionsSelectionComponent
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing DatasetRestrictionsSelectionComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DatasetRestrictionsSelectionComponent)
  })
  it('should render correctly without restriction', () => {
    const props = {
      datasets: damDatasetsDump,
      datasetModels: datasetModelsDump,
      currentRestrictionType: UIDomain.DATASET_RESTRICTIONS_TYPES_ENUM.NONE,
      fields: ReduxFormTestHelper.getFieldsProps(),
    }
    const enzymeWrapper = shallow(<DatasetRestrictionsSelectionComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(InfiniteTableContainer), 0, 'Table should not be shown when no restriction mode was selected')
  })
  it('should render correctly with dataset restriction', () => {
    const spyPush = {
      key: null,
    }
    const spyRemove = {
      index: null,
    }
    const props = {
      datasets: damDatasetsDump,
      datasetModels: datasetModelsDump,
      currentRestrictionType: UIDomain.DATASET_RESTRICTIONS_TYPES_ENUM.SELECTED_DATASETS,
      fields: {
        ...ReduxFormTestHelper.getFieldsProps([dataset1.content.feature.id, dataset3.content.feature.id]),
        push: (key) => {
          spyPush.key = key
        },
        remove: (index) => {
          spyRemove.index = index
        },
      },
    }
    const enzymeWrapper = shallow(<DatasetRestrictionsSelectionComponent {...props} />, { context })
    // 1. Check filter box is displayed
    let filterComponent = enzymeWrapper.find(TableHeaderTextField)
    assert.lengthOf(filterComponent, 1, 'There should be the filter component')
    testSuiteHelpers.assertWrapperProperties(filterComponent, {
      value: '',
      hintText: 'search.results.form.restrictions.configuration.filter.by.name.message',
      onChange: enzymeWrapper.instance().onFilterTextInput,
    }, 'Filter component properties should be correctly set')
    // 2. Check table is displayed and right elements are selected
    assert.deepEqual(enzymeWrapper.state(), {
      selectableElements: [
        { id: dataset1.content.feature.id, label: dataset1.content.feature.label },
        { id: dataset2.content.feature.id, label: dataset2.content.feature.label },
        { id: dataset3.content.feature.id, label: dataset3.content.feature.label },
      ],
      visibleElements: [
        { id: dataset1.content.feature.id, label: dataset1.content.feature.label },
        { id: dataset2.content.feature.id, label: dataset2.content.feature.label },
        { id: dataset3.content.feature.id, label: dataset3.content.feature.label },
      ],
      filterText: '', // initially empty
    }, 'State should be correctly computed')

    let tableComponent = enzymeWrapper.find(InfiniteTableContainer)
    assert.lengthOf(tableComponent, 1, 'Table should be displayed')
    assert.deepEqual(tableComponent.props().entities, enzymeWrapper.state().visibleElements,
      'Visible elements should be reported from state')
    const { columns } = tableComponent.props()
    assert.lengthOf(columns, 2, 'There should be selection and label columns')
    // verify columns options
    const selectionColumnProps = columns[0].rowCellDefinition.props.optionsDefinitions[0].optionProps
    assert.deepEqual(selectionColumnProps, {
      selectedElements: [dataset1.content.feature.id, dataset3.content.feature.id],
      onToggleSelection: enzymeWrapper.instance().onToggleSelection,
    }, 'Selection column properties should be correctly set')
    // 3. Mimic selection remove / add
    assert.isNull(spyPush.key, '(3) Push should not have been called')
    assert.isNull(spyRemove.index, '(3) Remove should not have been called')
    // 3.a - toggle an unselected element => add
    selectionColumnProps.onToggleSelection(1)
    assert.isNull(spyRemove.index, '(3a) Remove should not have been called')
    assert.equal(spyPush.key, dataset2.content.feature.id, '(3a) Push should have been called for dataset 2 ID')
    // 3.b - toggle a selected element => remove
    selectionColumnProps.onToggleSelection(2)
    assert.equal(spyPush.key, dataset2.content.feature.id, '(3b) Push should not have been called again')
    assert.equal(spyRemove.index, 1, '(3b) Remove should have been called for third element (second in selection list)')

    // 4. Test filter is working
    filterComponent.props().onChange(null, '2')
    assert.deepEqual(enzymeWrapper.state(), {
      selectableElements: [
        { id: dataset1.content.feature.id, label: dataset1.content.feature.label },
        { id: dataset2.content.feature.id, label: dataset2.content.feature.label },
        { id: dataset3.content.feature.id, label: dataset3.content.feature.label },
      ],
      visibleElements: [
        { id: dataset2.content.feature.id, label: dataset2.content.feature.label },
      ],
      filterText: '2',
    }, 'State should be correctly updated after filter input')
    tableComponent = enzymeWrapper.find(InfiniteTableContainer)
    assert.equal(tableComponent.props().entities, enzymeWrapper.state().visibleElements, 'Table should show filtered list')

    filterComponent = enzymeWrapper.find(TableHeaderTextField)
    assert.equal(filterComponent.props().value, enzymeWrapper.state().filterText, 'Filter text should show current filter')
  })
  it('should render correctly with dataset model restriction', () => {
    const spyPush = {
      key: null,
    }
    const spyRemove = {
      index: null,
    }
    const props = {
      datasets: damDatasetsDump,
      datasetModels: datasetModelsDump,
      currentRestrictionType: UIDomain.DATASET_RESTRICTIONS_TYPES_ENUM.SELECTED_MODELS,
      fields: {
        ...ReduxFormTestHelper.getFieldsProps([datasetModelsDump[2].content.name]),
        push: (key) => {
          spyPush.key = key
        },
        remove: (index) => {
          spyRemove.index = index
        },
      },
    }
    const enzymeWrapper = shallow(<DatasetRestrictionsSelectionComponent {...props} />, { context })
    // 1. Check filter box is displayed
    let filterComponent = enzymeWrapper.find(TableHeaderTextField)
    assert.lengthOf(filterComponent, 1, 'There should be the filter component')
    testSuiteHelpers.assertWrapperProperties(filterComponent, {
      value: '',
      hintText: 'search.results.form.restrictions.configuration.filter.by.name.message',
      onChange: enzymeWrapper.instance().onFilterTextInput,
    }, 'Filter component properties should be correctly set')
    // 2. Check table is displayed and right elements are selected
    assert.deepEqual(enzymeWrapper.state(), {
      selectableElements: [
        { id: datasetModelsDump[1].content.name, label: datasetModelsDump[1].content.name },
        { id: datasetModelsDump[2].content.name, label: datasetModelsDump[2].content.name },
      ],
      visibleElements: [
        { id: datasetModelsDump[1].content.name, label: datasetModelsDump[1].content.name },
        { id: datasetModelsDump[2].content.name, label: datasetModelsDump[2].content.name },
      ],
      filterText: '', // initially empty
    }, 'State should be correctly computed')

    let tableComponent = enzymeWrapper.find(InfiniteTableContainer)
    assert.lengthOf(tableComponent, 1, 'Table should be displayed')
    assert.deepEqual(tableComponent.props().entities, enzymeWrapper.state().visibleElements,
      'Visible elements should be reported from state')
    const { columns } = tableComponent.props()
    assert.lengthOf(columns, 2, 'There should be selection and label columns')
    // verify columns options
    const selectionColumnProps = columns[0].rowCellDefinition.props.optionsDefinitions[0].optionProps
    assert.deepEqual(selectionColumnProps, {
      selectedElements: [datasetModelsDump[2].content.name],
      onToggleSelection: enzymeWrapper.instance().onToggleSelection,
    }, 'Selection column properties should be correctly set')
    // 3. Mimic selection remove / add
    assert.isNull(spyPush.key, '(3) Push should not have been called')
    assert.isNull(spyRemove.index, '(3) Remove should not have been called')
    // 3.a - toggle an unselected element => add
    selectionColumnProps.onToggleSelection(0)
    assert.isNull(spyRemove.index, '(3a) Remove should not have been called')
    assert.equal(spyPush.key, datasetModelsDump[1].content.name, '(3a) Push should have been called for dataset model 1 name')
    // 3.b - toggle a selected element => remove
    selectionColumnProps.onToggleSelection(1)
    assert.equal(spyPush.key, datasetModelsDump[1].content.name, '(3b) Push should not have been called again')
    assert.equal(spyRemove.index, 0, '(3b) Remove should have been called for second element (first in selection list)')

    // 4. Test filter is working
    filterComponent.props().onChange(null, '1')
    assert.deepEqual(enzymeWrapper.state(), {
      selectableElements: [
        { id: datasetModelsDump[1].content.name, label: datasetModelsDump[1].content.name },
        { id: datasetModelsDump[2].content.name, label: datasetModelsDump[2].content.name },
      ],
      visibleElements: [
        { id: datasetModelsDump[1].content.name, label: datasetModelsDump[1].content.name },
      ],
      filterText: '1',
    }, 'State should be correctly updated after filter input')
    tableComponent = enzymeWrapper.find(InfiniteTableContainer)
    assert.equal(tableComponent.props().entities, enzymeWrapper.state().visibleElements, 'Table should show filtered list')

    filterComponent = enzymeWrapper.find(TableHeaderTextField)
    assert.equal(filterComponent.props().value, enzymeWrapper.state().filterText, 'Filter text should show current filter')
  })
})
