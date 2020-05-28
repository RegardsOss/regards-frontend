/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { InfiniteTableContainer } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import CriteriaGroupsTableComponent from '../../../../../src/components/admin/content/search/CriteriaGroupsTableComponent'
import CriterionConfigurationDialogComponent from '../../../../../src/components/admin/content/search/dialog/CriterionConfigurationDialogComponent'
import styles from '../../../../../src/styles'
import { attributes } from '../../../../dumps/attributes.dump'
import { exampleConfiguration, exampleEntities } from '../../../../dumps/search.criteria.runtime'
import { allPluginMeta } from '../../../../dumps/search.plugins.meta.runtime'

const context = buildTestContext(styles)

/**
 * Test CriteriaGroupsTableComponent
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing CriteriaGroupsTableComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(CriteriaGroupsTableComponent)
  })
  it('should render correctly while resolving plugins', () => {
    const props = {
      fetchingMetadata: true,
      availableAttributes: attributes,
      pluginsMetadata: [],
      groups: exampleConfiguration,

      onUpdateCriterionPlugin: () => {},
      onUpdateElementLabel: () => {},
      onUpdateGroupShowTitle: () => {},
      onUpdateCriterionConfiguration: () => {},
      onInsertGroup: () => {},
      onInsertCriterion: () => {},
      onMoveGroup: () => {},
      onMoveCriterion: () => {},
      onDeleteCriterion: () => {},
      onDeleteGroup: () => {},
    }
    const enzymeWrapper = shallow(<CriteriaGroupsTableComponent {...props} />, { context })
    // Check no entity is provided to table while loading
    const tableWrapper = enzymeWrapper.find(InfiniteTableContainer)
    assert.lengthOf(tableWrapper, 1, 'There should be the table')
    assert.lengthOf(tableWrapper.props().entities, 0, 'Entities should not be provided while loading')
  })
  it('should render correctly after plugins resolution', () => {
    const props = {
      fetchingMetadata: false,
      availableAttributes: attributes,
      pluginsMetadata: allPluginMeta,
      groups: exampleConfiguration,

      onUpdateCriterionPlugin: () => {},
      onUpdateElementLabel: () => {},
      onUpdateGroupShowTitle: () => {},
      onUpdateCriterionConfiguration: () => {},
      onInsertGroup: () => {},
      onInsertCriterion: () => {},
      onMoveGroup: () => {},
      onMoveCriterion: () => {},
      onDeleteCriterion: () => {},
      onDeleteGroup: () => {},
    }
    const enzymeWrapper = shallow(<CriteriaGroupsTableComponent {...props} />, { context })
    // Check entities are provided to table after loading
    const tableWrapper = enzymeWrapper.find(InfiniteTableContainer)
    assert.lengthOf(tableWrapper, 1, 'There should be the table')
    assert.deepEqual(tableWrapper.props().entities, exampleEntities,
      'Entities should be converted from configuration after loading')
  })
  it('should show / hide edit configuration dialog', () => {
    const spyUpdateConfiguration = { }
    const props = {
      fetchingMetadata: false,
      availableAttributes: attributes,
      pluginsMetadata: allPluginMeta,
      groups: exampleConfiguration,

      onUpdateCriterionPlugin: () => {},
      onUpdateElementLabel: () => {},
      onUpdateGroupShowTitle: () => {},
      onUpdateCriterionConfiguration: (groupIndex, criterionIndex, values) => {
        spyUpdateConfiguration.groupIndex = groupIndex
        spyUpdateConfiguration.criterionIndex = criterionIndex
        spyUpdateConfiguration.values = values
      },
      onInsertGroup: () => {},
      onInsertCriterion: () => {},
      onMoveGroup: () => {},
      onMoveCriterion: () => {},
      onDeleteCriterion: () => {},
      onDeleteGroup: () => {},
    }
    const enzymeWrapper = shallow(<CriteriaGroupsTableComponent {...props} />, { context })
    // 1 - Check dialog here present (always) and hidden
    let confDialogWrapper = enzymeWrapper.find(CriterionConfigurationDialogComponent)
    assert.lengthOf(confDialogWrapper, 1, 'There should be configuration edition dialog')
    testSuiteHelpers.assertWrapperProperties(confDialogWrapper, {
      open: false,
      criterionRow: null,
      availableAttributes: props.availableAttributes,
      onConfirm: enzymeWrapper.instance().onConfirmConfigurationEdition,
      onCancel: enzymeWrapper.instance().onCancelConfigurationEdition,
    }, 'Configuration edition dialog properties should be correctly set')
    // 2 - Show dialog for criterion 1.2
    enzymeWrapper.instance().onShowConfigurationDialog(exampleEntities[2])
    confDialogWrapper = enzymeWrapper.find(CriterionConfigurationDialogComponent)
    assert.lengthOf(confDialogWrapper, 1, 'There should be configuration edition dialog')
    testSuiteHelpers.assertWrapperProperties(confDialogWrapper, {
      open: true,
      criterionRow: exampleEntities[2],
      availableAttributes: props.availableAttributes,
      onConfirm: enzymeWrapper.instance().onConfirmConfigurationEdition,
      onCancel: enzymeWrapper.instance().onCancelConfigurationEdition,
    }, 'Configuration edition dialog properties should be correctly set for criterion 1.2 edition')
    // 2.b - cancel edition
    confDialogWrapper.props().onCancel()
    confDialogWrapper = enzymeWrapper.find(CriterionConfigurationDialogComponent)
    assert.lengthOf(confDialogWrapper, 1, 'There should be configuration edition dialog')
    testSuiteHelpers.assertWrapperProperties(confDialogWrapper, {
      open: false,
      criterionRow: null,
      availableAttributes: props.availableAttributes,
      onConfirm: enzymeWrapper.instance().onConfirmConfigurationEdition,
      onCancel: enzymeWrapper.instance().onCancelConfigurationEdition,
    }, 'Configuration edition dialog properties should be correctly set after criterion 1.2 edition was cancelled')
    // 3 - Edit criterion 2.1
    enzymeWrapper.instance().onShowConfigurationDialog(exampleEntities[5])
    confDialogWrapper = enzymeWrapper.find(CriterionConfigurationDialogComponent)
    assert.lengthOf(confDialogWrapper, 1, 'There should be configuration edition dialog')
    testSuiteHelpers.assertWrapperProperties(confDialogWrapper, {
      open: true,
      criterionRow: exampleEntities[5],
      availableAttributes: props.availableAttributes,
      onConfirm: enzymeWrapper.instance().onConfirmConfigurationEdition,
      onCancel: enzymeWrapper.instance().onCancelConfigurationEdition,
    }, 'Configuration edition dialog properties should be correctly set for criterion 2.1 edition')
    // 2.b - confirm edition
    confDialogWrapper.props().onConfirm({ a: 'b', c: 636, d: [] })
    confDialogWrapper = enzymeWrapper.find(CriterionConfigurationDialogComponent)
    assert.lengthOf(confDialogWrapper, 1, 'There should be configuration edition dialog')
    testSuiteHelpers.assertWrapperProperties(confDialogWrapper, {
      open: false,
      criterionRow: null,
      availableAttributes: props.availableAttributes,
      onConfirm: enzymeWrapper.instance().onConfirmConfigurationEdition,
      onCancel: enzymeWrapper.instance().onCancelConfigurationEdition,
    }, 'Configuration edition dialog properties should be correctly set after criterion 1.2 edition was confirmed')
    // 2.c - check update callback was correctly invoked
    assert.deepEqual(spyUpdateConfiguration, { // crit 2.1 => 1.0 in array index
      groupIndex: 1,
      criterionIndex: 0,
      values: { a: 'b', c: 636, d: [] },
    })
  })
})
