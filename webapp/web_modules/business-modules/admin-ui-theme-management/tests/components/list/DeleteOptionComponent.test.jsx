/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { HateoasKeys } from '@regardsoss/display-control'
import { HateoasIconAction } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers, DumpProvider } from '@regardsoss/tests-helpers'
import DeleteOptionComponent from '../../../src/components/list/DeleteOptionComponent'
import styles from '../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test DeleteOptionComponent
 * @author Raphaël Mechali
 */
describe('[ADMIN UI THEME MANAGEMENT] Testing DeleteOptionComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DeleteOptionComponent)
  })
  it('should render correctly', () => {
    const spyOnDelete = {}
    const props = {
      theme: DumpProvider.getFirstEntity('AccessProjectClient', 'Themes'),
      onDelete: (theme) => {
        spyOnDelete.theme = theme
      },
    }
    const enzymeWrapper = shallow(<DeleteOptionComponent {...props} />, { context })
    const iconAction = enzymeWrapper.find(HateoasIconAction)
    assert.lengthOf(iconAction, 1, 'There should be button')
    testSuiteHelpers.assertWrapperProperties(iconAction, {
      entityLinks: props.theme.links,
      hateoasKey: HateoasKeys.DELETE,
      onClick: enzymeWrapper.instance().onDelete,
      title: 'theme.list.tooltip.delete',
    })
    // simulate click
    iconAction.props().onClick()
    assert.deepEqual(spyOnDelete, { theme: props.theme })
  })
})
