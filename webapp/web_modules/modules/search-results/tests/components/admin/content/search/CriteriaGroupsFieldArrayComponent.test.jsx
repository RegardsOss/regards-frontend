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
import { buildTestContext, testSuiteHelpers, ReduxFormTestHelper } from '@regardsoss/tests-helpers'
import CriteriaGroupsFieldArrayComponent from '../../../../../src/components/admin/content/search/CriteriaGroupsFieldArrayComponent'
import CriteriaGroupsTableComponent from '../../../../../src/components/admin/content/search/CriteriaGroupsTableComponent'
import styles from '../../../../../src/styles'
import { attributes } from '../../../../dumps/attributes.dump'
import { exampleConfiguration } from '../../../../dumps/search.criteria.runtime'
import { allPluginMeta } from '../../../../dumps/search.plugins.meta.runtime'

const context = buildTestContext(styles)

/**
 * Test CriteriaGroupsFieldArrayComponent
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing CriteriaGroupsFieldArrayComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(CriteriaGroupsFieldArrayComponent)
  })
  it('should render correctly', () => {
    const props = {
      fetchingMetadata: false,
      pluginsMetadata: allPluginMeta,
      availableAttributes: attributes,
      fields: ReduxFormTestHelper.getFieldsProps(exampleConfiguration),
    }

    const enzymeWrapper = shallow(<CriteriaGroupsFieldArrayComponent {...props} />, { context })
    const tableWrapper = enzymeWrapper.find(CriteriaGroupsTableComponent)
    assert.lengthOf(tableWrapper, 1)
    testSuiteHelpers.assertWrapperProperties(tableWrapper, {
      fetchingMetadata: props.fetchingMetadata,
      pluginsMetadata: props.pluginsMetadata,
      availableAttributes: props.availableAttributes,
      groups: exampleConfiguration,
      onUpdateCriterionPlugin: enzymeWrapper.instance().onUpdateCriterionPlugin,
      onUpdateElementLabel: enzymeWrapper.instance().onUpdateElementLabel,
      onUpdateGroupShowTitle: enzymeWrapper.instance().onUpdateGroupShowTitle,
      onUpdateCriterionConfiguration: enzymeWrapper.instance().onUpdateCriterionConfiguration,
      onInsertGroup: enzymeWrapper.instance().onInsertGroup,
      onInsertCriterion: enzymeWrapper.instance().onInsertCriterion,
      onMoveGroup: enzymeWrapper.instance().onMoveGroup,
      onMoveCriterion: enzymeWrapper.instance().onMoveCriterion,
      onDeleteCriterion: enzymeWrapper.instance().onDeleteCriterion,
      onDeleteGroup: enzymeWrapper.instance().onDeleteGroup,
    })
  })
})
