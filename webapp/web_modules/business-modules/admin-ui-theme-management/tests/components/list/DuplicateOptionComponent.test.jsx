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
import { ResourceIconAction } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers, DumpProvider } from '@regardsoss/tests-helpers'
import DuplicateOptionComponent from '../../../src/components/list/DuplicateOptionComponent'
import styles from '../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test DuplicateOptionComponent
 * @author Raphaël Mechali
 */
describe('[ADMIN UI THEME MANAGEMENT] Testing DuplicateOptionComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DuplicateOptionComponent)
  })
  it('should render correctly', () => {
    const spyOnDuplicate = {}
    const props = {
      theme: DumpProvider.getFirstEntity('AccessProjectClient', 'Themes'),
      onDuplicate: (themeID) => {
        spyOnDuplicate.themeID = themeID
      },
    }
    const enzymeWrapper = shallow(<DuplicateOptionComponent {...props} />, { context })
    const iconAction = enzymeWrapper.find(ResourceIconAction)
    assert.lengthOf(iconAction, 1, 'There should be button')
    testSuiteHelpers.assertWrapperProperties(iconAction, {
      title: 'theme.list.tooltip.duplicate',
      resourceDependencies: DuplicateOptionComponent.CREATE_DEPENDENCIES,
      onClick: enzymeWrapper.instance().onDuplicate,
    })
    // simulate click
    iconAction.props().onClick()
    assert.deepEqual(spyOnDuplicate, { themeID: props.theme.content.id })
  })
})
