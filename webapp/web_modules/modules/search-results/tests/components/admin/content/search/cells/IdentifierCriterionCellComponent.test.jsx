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
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import { UIDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import IdentifierCriterionCellComponent from '../../../../../../src/components/admin/content/search/cells/IdentifierCriterionCellComponent'
import styles from '../../../../../../src/styles'
import { allPluginMeta, pluginMeta2, pluginMeta35 } from '../../../../../dumps/search.plugins.meta.runtime'

const context = buildTestContext(styles)

/**
 * Test IdentifierCriterionCellComponent
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing IdentifierCriterionCellComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(IdentifierCriterionCellComponent)
  })
  it('should render, not editing, an error for a criterion without selected plugin', () => {
    const props = {
      entity: {
        label: {
          [UIDomain.LOCALES_ENUM.en]: 'anything',
          [UIDomain.LOCALES_ENUM.fr]: 'ou autre chose',
        },
        groupIndex: 5,
        criterionIndex: 28,
        pluginMetadata: null,
        configuration: { attributes: { } },
      },
      pluginsMetadata: allPluginMeta,
      onUpdateCriterionPlugin: () => {},
    }
    const enzymeWrapper = shallow(<IdentifierCriterionCellComponent {...props} />, { context })
    const mainDiv = enzymeWrapper.find('div')
    assert.lengthOf(mainDiv, 1)
    assert.include(mainDiv.debug(), 'search.results.form.configuration.search.pane.identifier.column.cell.label.plugin.unset')
    assert.equal(mainDiv.props().title, 'search.results.form.configuration.search.pane.identifier.column.cell.title.plugin.unset')
    assert.equal(mainDiv.props().onClick, enzymeWrapper.instance().onEdit)
    assert.deepEqual(mainDiv.props().style, context.moduleTheme.configuration.content.searchPane.criterionIdCell.error)
  })
  it('should render, not editing, no error for a criterion with selected plugin', () => {
    const props = {
      entity: {
        label: {
          [UIDomain.LOCALES_ENUM.en]: 'anything',
          [UIDomain.LOCALES_ENUM.fr]: 'ou autre chose',
        },
        groupIndex: 5,
        criterionIndex: 28,
        pluginMetadata: pluginMeta2,
        configuration: { attributes: { } },
      },
      pluginsMetadata: allPluginMeta,
      onUpdateCriterionPlugin: () => {},
    }
    const enzymeWrapper = shallow(<IdentifierCriterionCellComponent {...props} />, { context })
    const mainDiv = enzymeWrapper.find('div')
    assert.lengthOf(mainDiv, 1)
    assert.include(mainDiv.debug(), 'search.results.form.configuration.search.pane.identifier.column.cell.label.plugin.set')
    assert.equal(mainDiv.props().title, 'search.results.form.configuration.search.pane.identifier.column.cell.title.plugin.set')
    assert.equal(mainDiv.props().onClick, enzymeWrapper.instance().onEdit)
    assert.deepEqual(mainDiv.props().style, context.moduleTheme.configuration.content.searchPane.criterionIdCell.default)
  })
  it('should correctly in edition, calling parent callback on commit', () => {
    const spyOnUpdate = {}
    const props = {
      entity: {
        label: {
          [UIDomain.LOCALES_ENUM.en]: 'anything',
          [UIDomain.LOCALES_ENUM.fr]: 'ou autre chose',
        },
        groupIndex: 5,
        criterionIndex: 28,
        pluginMetadata: pluginMeta2,
        configuration: { attributes: { } },
      },
      pluginsMetadata: allPluginMeta,
      onUpdateCriterionPlugin: (groupIndex, criterionIndex, selectedMetadata) => {
        spyOnUpdate.groupIndex = groupIndex
        spyOnUpdate.criterionIndex = criterionIndex
        spyOnUpdate.selectedMetadata = selectedMetadata
      },
    }
    // 1 - Init and enter edition mode
    const enzymeWrapper = shallow(<IdentifierCriterionCellComponent {...props} />, { context })
    const mainDiv = enzymeWrapper.find('div')
    mainDiv.props().onClick()
    // 2 - Check edition rendering
    const selectField = enzymeWrapper.find(SelectField)
    testSuiteHelpers.assertWrapperProperties(selectField, {
      value: props.entity.pluginMetadata,
      onChange: enzymeWrapper.instance().onPluginMetaSelected,
      dropDownMenuProps: enzymeWrapper.instance().getDropDownProps(),
    })
    const metaItems = selectField.find(MenuItem)
    assert.lengthOf(metaItems, props.pluginsMetadata.length, 'There should be an option for each available plugin metadata')
    props.pluginsMetadata.forEach((meta, index) => {
      const metaItem = metaItems.at(index)
      assert.deepEqual(metaItem.props().value, meta, `meta#${index}: value should be correctly reported`)
      const metaItemText = metaItem.debug()
      assert.include(metaItemText, 'search.results.form.configuration.search.pane.identifier.column.cell.label.plugin.set',
        `meta#${index}: Name and version (internationalized) should be displayed`)
      assert.include(metaItemText, meta.author, `meta#${index}: Author name should be displayed`)
      assert.include(metaItemText, meta.description, `meta#${index}: Description should be displayed`)
    })
    // 3 - Simulate a meta selection
    selectField.props().onChange({}, 1, pluginMeta35)
    assert.deepEqual(spyOnUpdate, {
      groupIndex: props.entity.groupIndex,
      criterionIndex: props.entity.criterionIndex,
      selectedMetadata: pluginMeta35,
    }, 'Parent callback should be correctly invoked')
  })
})
