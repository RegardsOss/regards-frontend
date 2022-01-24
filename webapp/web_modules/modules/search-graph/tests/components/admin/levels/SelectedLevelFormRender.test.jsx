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
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers, ReduxFormTestHelper } from '@regardsoss/tests-helpers'
import { InfiniteTableContainer } from '@regardsoss/components'
import SelectedLevelFormRender from '../../../../src/components/admin/levels/SelectedLevelFormRender'
import styles from '../../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Search Graph] Testing SelectedLevelFormRender', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SelectedLevelFormRender)
  })

  it('should render properly', () => {
    // mimic the redux form fields methods
    const props = {
      collectionModels: {
        1: {
          content: {
            id: 1,
            name: 'M1',
            description: 'M1',
          },
        },
        2: {
          content: {
            id: 2,
            name: 'M2',
            description: 'M2',
          },
        },
      },
      meta: {
        ...ReduxFormTestHelper.getMetaFieldProps(),
        touched: false,
      },
      fields: ReduxFormTestHelper.getFieldsProps(['M1']),
    }
    // simple render test
    const wrapper = shallow(<SelectedLevelFormRender {...props} />, { context })
    // check: table is here, it shows one entity (M1)
    const table = wrapper.find(InfiniteTableContainer)
    assert.lengthOf(table, 1, 'There should be the table')
    const renderEntities = table.props().entities
    assert.deepEqual(renderEntities, [props.collectionModels[1]], 'The render entities should be correctly resolved')
    // note: add level option cannot be found
    assert.deepEqual(wrapper.instance().getSelectableLevels(), [props.collectionModels[2]], 'The selectable entities should be correctly resolved')
  })
})
