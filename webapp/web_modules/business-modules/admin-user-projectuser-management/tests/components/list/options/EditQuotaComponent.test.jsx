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
import { buildTestContext, DumpProvider, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { ResourceIconAction } from '@regardsoss/components'
import EditQuotaComponent from '../../../../src/components/list/options/EditQuotaComponent'
import styles from '../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test EditQuotaComponent
 * @author Raphaël Mechali
 */
describe('[ADMIN PROJECTUSER MANAGEMENT] Testing EditQuotaComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(EditQuotaComponent)
  })
  it('should render correctly', () => {
    const spiedCallback = {}
    const props = {
      entity: DumpProvider.getFirstEntity('AccessProjectClient', 'ProjectUser'),
      onShowEditQuotaDialog: (e) => {
        spiedCallback.entity = e
      },
    }
    const enzymeWrapper = shallow(<EditQuotaComponent {...props} />, { context })
    const btnWrapper = testSuiteHelpers.assertCompWithProps(enzymeWrapper, ResourceIconAction, {
      title: 'projectUser.list.table.action.edit.quota',
      onClick: enzymeWrapper.instance().onClick,
      resourceDependencies: EditQuotaComponent.DEPENDENCIES,
    })
    // simulate callback
    btnWrapper.props().onClick()
    assert.deepEqual(spiedCallback.entity, props.entity, 'Callback should have been called with right parameters')
  })
})
