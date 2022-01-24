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
import Checkbox from 'material-ui/Checkbox'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { UIDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import ShowLabelCellComponent from '../../../../../../src/components/admin/content/search/cells/ShowLabelCellComponent'
import styles from '../../../../../../src/styles'
import { pluginMeta35 } from '../../../../../dumps/search.plugins.meta.runtime'

const context = buildTestContext(styles)

/**
 * Test ShowLabelCellComponent
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing ShowLabelCellComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ShowLabelCellComponent)
  })
  it('should render correctly for a criterion', () => {
    const props = {
      label: 'a group without label, showing it (error)',
      entity: {
        label: UIDomain.LOCALES.reduce((acc, locale) => ({ ...acc, [locale]: '' }), {}),
        groupIndex: 0,
        criterionIndex: 3,
        pluginMetadata: pluginMeta35,
        configuration: {
          attributes: {},
        },
      },
      expectedError: true,
      onUpdateGroupShowTitle: () => {},
    }
    const enzymeWrapper = shallow(<ShowLabelCellComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(Checkbox), 0, 'Checkbox should be hidden for any criterion')
  })
  it('should render correctly for a group showing title', () => {
    const spyUpdate = {}
    const props = {
      label: 'a group without label, showing it (error)',
      entity: {
        label: UIDomain.LOCALES.reduce((acc, locale) => ({ ...acc, [locale]: '' }), {}),
        showTitle: true,
        groupIndex: 8,
        criteria: [],
      },
      expectedError: true,
      onUpdateGroupShowTitle: (groupIndex, showTitle) => {
        spyUpdate.groupIndex = groupIndex
        spyUpdate.showTitle = showTitle
      },
    }
    const enzymeWrapper = shallow(<ShowLabelCellComponent {...props} />, { context })
    const checkboxWrapper = enzymeWrapper.find(Checkbox)
    assert.lengthOf(checkboxWrapper, 1, 'Checkbox should be show for any group')
    testSuiteHelpers.assertWrapperProperties(checkboxWrapper, {
      label: 'search.results.form.configuration.search.pane.show.label.column.cell.shown',
      checked: true,
      onCheck: enzymeWrapper.instance().onToggleShowTitle,
    }, 'checkbox should define expected properties and callbacks')
    // test edition callback
    checkboxWrapper.props().onCheck()
    assert.deepEqual(spyUpdate, {
      groupIndex: props.entity.groupIndex,
      showTitle: false, // reverted
    }, 'Edition callback should be invoke with right values')
  })
  it('should render correctly for a group hiding title', () => {
    const spyUpdate = {}
    const props = {
      label: 'a group without label, showing it (error)',
      entity: {
        label: UIDomain.LOCALES.reduce((acc, locale) => ({ ...acc, [locale]: '' }), {}),
        showTitle: false,
        groupIndex: 25,
        criteria: [],
      },
      expectedError: true,
      onUpdateGroupShowTitle: (groupIndex, showTitle) => {
        spyUpdate.groupIndex = groupIndex
        spyUpdate.showTitle = showTitle
      },
    }
    const enzymeWrapper = shallow(<ShowLabelCellComponent {...props} />, { context })
    const checkboxWrapper = enzymeWrapper.find(Checkbox)
    assert.lengthOf(checkboxWrapper, 1, 'Checkbox should be show for any group')
    testSuiteHelpers.assertWrapperProperties(checkboxWrapper, {
      label: 'search.results.form.configuration.search.pane.show.label.column.cell.hidden',
      checked: false,
      onCheck: enzymeWrapper.instance().onToggleShowTitle,
    }, 'checkbox should define expected properties and callbacks')
    // test edition callback
    checkboxWrapper.props().onCheck()
    assert.deepEqual(spyUpdate, {
      groupIndex: props.entity.groupIndex,
      showTitle: true, // reverted
    }, 'Edition callback should be invoke with right values')
  })
})
