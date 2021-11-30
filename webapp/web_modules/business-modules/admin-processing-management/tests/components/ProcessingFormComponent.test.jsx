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
import { Field } from '@regardsoss/form-utils'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import { CardActionsComponent } from '@regardsoss/components'
import { ProcessingFormComponent } from '../../src/components/ProcessingFormComponent'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/**
 * Tests for ProcessingFormComponent
 * @author Théo Lasserre
 */
describe('[ADMIN PROCESSING MANAGEMENT] Testing Processing form component', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exist', () => {
    assert.isDefined(ProcessingFormComponent)
    assert.isDefined(CardActionsComponent)
    assert.isDefined(Field)
  })

  it('should render correctly', () => {
    const props = {
      project: 'testProject',
      mode: 'create',
      roleList: {},
      onSubmit: () => { },
      backUrl: '#',
      pristine: false,
      invalid: false,
      handleSubmit: () => { },
      initialize: () => { },
    }
    const wrapper = shallow(
      <ProcessingFormComponent
        {...props}
      />,
      { context },
    )

    // Check for userRole field
    const userRoleField = wrapper.find(Field).find({ name: 'userRole' })
    assert.lengthOf(userRoleField, 1, 'UserRole field should be displayed')

    // Check for pluginConfiguration field
    const pluginConfigurationField = wrapper.find(Field).find({ name: 'pluginConfiguration' })
    assert.lengthOf(pluginConfigurationField, 1, 'PluginConfiguration field should be displayed')

    // Check for buttons
    const cardActionsWrapper = wrapper.find(CardActionsComponent)
    assert.lengthOf(cardActionsWrapper, 1, 'There should have a card action component')
  })
})
