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
import { HateoasIconAction } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers, DumpProvider } from '@regardsoss/tests-helpers'
import EditProjectUserComponent from '../../../../src/components/list/options/EditProjectUserComponent'
import styles from '../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test EditProjectUserComponent
 * @author Raphaël Mechali
 */
describe('[ADMIN PROJECTUSER MANAGEMENT] Testing EditProjectUserComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(EditProjectUserComponent)
  })
  it('should render correctly loading', () => {
    const props = {
      entity: DumpProvider.getFirstEntity('AccessProjectClient', 'ProjectUser'),
      isLoading: true,
      onEdit: () => { },
    }
    const enzymeWrapper = shallow(<EditProjectUserComponent {...props} />, { context })
    const iconButton = enzymeWrapper.find(HateoasIconAction)
    assert.lengthOf(iconButton, 1, 'There should be the icon button')
    assert.isTrue(iconButton.props().disabled, 'Button should be forced disabled as it is loading')
    assert.isOk(iconButton.props().title, 'A tooltip should be provided')
    assert.isOk(iconButton.props().entityLinks, 'HATOAS management (links) should be defined')
    assert.isOk(iconButton.props().hateoasKey, 'HATOAS management (key) should be defined')
  })
  it('should render correctly not loading', () => {
    let spiedEditCall = null
    const props = {
      entity: DumpProvider.getFirstEntity('AccessProjectClient', 'ProjectUser'),
      isLoading: false,
      onEdit: (id) => { spiedEditCall = id },
    }
    const enzymeWrapper = shallow(<EditProjectUserComponent {...props} />, { context })
    const iconButton = enzymeWrapper.find(HateoasIconAction)
    assert.lengthOf(iconButton, 1, 'There should be the icon button')
    assert.isFalse(iconButton.props().disabled, 'Button should be disabled control should be left to HATOAS mechanism')
    assert.isOk(iconButton.props().title, 'A tooltip should be provided')
    assert.isOk(iconButton.props().entityLinks, 'HATOAS management (links) should be defined')
    assert.isOk(iconButton.props().hateoasKey, 'HATOAS management (key) should be defined')
    // test callback
    assert.isNull(spiedEditCall, 'callback should not have been invoked yet')
    iconButton.props().onClick()
    assert.equal(spiedEditCall, props.entity.content.id, 'callback should have been invoked with entity ID')
  })
})
