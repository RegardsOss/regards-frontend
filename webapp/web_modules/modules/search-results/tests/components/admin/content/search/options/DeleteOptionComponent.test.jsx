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
import IconButton from 'material-ui/IconButton'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { UIDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import DeleteOptionComponent from '../../../../../../src/components/admin/content/search/options/DeleteOptionComponent'
import styles from '../../../../../../src/styles'
import { pluginMeta35 } from '../../../../../dumps/search.plugins.meta.runtime'

const context = buildTestContext(styles)

/**
 * Test DeleteOptionComponent
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing DeleteOptionComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DeleteOptionComponent)
  })
  it('should render correctly for a group', () => {
    const spyDeleteCriterion = { count: 0 }
    const spyDeleteGroup = { count: 0 }
    const props = {
      entity: {
        label: {
          [UIDomain.LOCALES_ENUM.en]: 'anything',
          [UIDomain.LOCALES_ENUM.fr]: 'ou autre chose',
        },
        showTitle: true,
        groupIndex: 8,
        criteria: [],
      },
      onDeleteCriterion: (groupIndex, criterionIndex) => {
        spyDeleteCriterion.count += 1
        spyDeleteCriterion.groupIndex = groupIndex
        spyDeleteCriterion.criterionIndex = criterionIndex
      },
      onDeleteGroup: (groupIndex) => {
        spyDeleteGroup.count += 1
        spyDeleteGroup.groupIndex = groupIndex
      },
    }
    const enzymeWrapper = shallow(<DeleteOptionComponent {...props} />, { context })
    const buttonWrapper = enzymeWrapper.find(IconButton)
    assert.lengthOf(buttonWrapper, 1)
    testSuiteHelpers.assertWrapperProperties(buttonWrapper, {
      title: 'search.results.form.configuration.search.pane.options.column.delete.tooltip',
      onClick: enzymeWrapper.instance().onDelete,
    })
    buttonWrapper.props().onClick()
    assert.deepEqual(spyDeleteGroup, { count: 1, groupIndex: props.entity.groupIndex })
    assert.deepEqual(spyDeleteCriterion, { count: 0 })
  })
  it('should render correctly for a criterion', () => {
    const spyDeleteCriterion = { count: 0 }
    const spyDeleteGroup = { count: 0 }
    const props = {
      entity: {
        label: {
          [UIDomain.LOCALES_ENUM.en]: 'anything',
          [UIDomain.LOCALES_ENUM.fr]: 'ou autre chose',
        },
        groupIndex: 0,
        criterionIndex: 3,
        pluginMetadata: pluginMeta35,
        configuration: {
          attributes: {},
        },
      },
      onDeleteCriterion: (groupIndex, criterionIndex) => {
        spyDeleteCriterion.count += 1
        spyDeleteCriterion.groupIndex = groupIndex
        spyDeleteCriterion.criterionIndex = criterionIndex
      },
      onDeleteGroup: (groupIndex) => {
        spyDeleteGroup.count += 1
        spyDeleteGroup.groupIndex = groupIndex
      },
    }
    const enzymeWrapper = shallow(<DeleteOptionComponent {...props} />, { context })
    const buttonWrapper = enzymeWrapper.find(IconButton)
    assert.lengthOf(buttonWrapper, 1)
    testSuiteHelpers.assertWrapperProperties(buttonWrapper, {
      title: 'search.results.form.configuration.search.pane.options.column.delete.tooltip',
      onClick: enzymeWrapper.instance().onDelete,
    })
    buttonWrapper.props().onClick()
    assert.deepEqual(spyDeleteGroup, { count: 0 })
    assert.deepEqual(spyDeleteCriterion, {
      count: 1,
      groupIndex:
      props.entity.groupIndex,
      criterionIndex: props.entity.criterionIndex,
    })
  })
})
