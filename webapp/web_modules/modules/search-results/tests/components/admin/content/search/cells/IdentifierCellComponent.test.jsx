/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import IdentifierCellComponent from '../../../../../../src/components/admin/content/search/cells/IdentifierCellComponent'
import IdentifierGroupCellComponent from '../../../../../../src/components/admin/content/search/cells/IdentifierGroupCellComponent'
import IdentifierCriterionCellComponent from '../../../../../../src/components/admin/content/search/cells/IdentifierCriterionCellComponent'
import styles from '../../../../../../src/styles'
import { allPluginMeta, pluginMeta35 } from '../../../../../dumps/search.plugins.meta.runtime'

const context = buildTestContext(styles)

/**
 * Test IdentifierCellComponent
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing IdentifierCellComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(IdentifierCellComponent)
  })
  it('should render correctly for a group row', () => {
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
      pluginsMetadata: allPluginMeta,
      onUpdateCriterionPlugin: () => {},
    }
    const enzymeWrapper = shallow(<IdentifierCellComponent {...props} />, { context })
    const groupWrapper = enzymeWrapper.find(IdentifierGroupCellComponent)
    assert.lengthOf(groupWrapper, 1, 'There should be group wrapper')
    testSuiteHelpers.assertWrapperProperties(groupWrapper, {
      entity: props.entity,
    }, 'There should be group render')
    assert.lengthOf(enzymeWrapper.find(IdentifierCriterionCellComponent), 0, 'There should not be criterion cell')
  })
  it('should render correctly for a criterion row', () => {
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
          attributes: {
            field1: null,
            field2: null,
          },
        },
      },
      pluginsMetadata: allPluginMeta,
      onUpdateCriterionPlugin: () => {},
    }
    const enzymeWrapper = shallow(<IdentifierCellComponent {...props} />, { context })
    const groupWrapper = enzymeWrapper.find(IdentifierCriterionCellComponent)
    assert.lengthOf(groupWrapper, 1, 'There should be criterion wrapper')
    testSuiteHelpers.assertWrapperProperties(groupWrapper, {
      entity: props.entity,
      pluginsMetadata: props.pluginsMetadata,
      onUpdateCriterionPlugin: props.onUpdateCriterionPlugin,
    }, 'There should be group render')
    assert.lengthOf(enzymeWrapper.find(IdentifierGroupCellComponent), 0, 'There should not be group cell')
  })
})
