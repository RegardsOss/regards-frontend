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
import FlatButton from 'material-ui/FlatButton'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { HelpMessageComponent } from '@regardsoss/components'
import { HeaderActionsBarComponent } from '../../../src/components/acquisitionChain/HeaderActionsBarComponent'
import styles from '../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test HeaderActionsBarComponent
 * @author Théo Lasserre
 */
describe('[ADMIN DATA-PROVIDER MANAGEMENT] Testing HeaderActionsBarComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(HeaderActionsBarComponent)
  })
  it('should render correctly', () => {
    const props = {
      onMultiToggleSelection: () => { },
      isOneCheckboxToggled: true,
      onToggleAutoRefresh: () => { },
      isAutoRefreshEnabled: true,
    }
    const enzymeWrapper = shallow(<HeaderActionsBarComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(HelpMessageComponent), 1, 'HelpMessageComponent should be set')
    const refreshButton = enzymeWrapper.find(FlatButton)
    assert.lengthOf(refreshButton, 1, 'FlatButton should be set')
    testSuiteHelpers.assertWrapperProperties(refreshButton, {
      onClick: props.onToggleAutoRefresh,
    }, 'Component should define the expected properties and callbacks')
  })
})
