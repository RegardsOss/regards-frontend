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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { PositionedDialog } from '@regardsoss/components'
import { List } from 'material-ui/List'
import { AIPModifyDialogComponent } from '../../../src/components/packages/AIPModifyDialogComponent'
import styles from '../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test AIPModifyDialogComponent
 * @author Simon MILHAU
 */
describe('[OAIS AIP MANAGEMENT] Testing AIPModifyDialogComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AIPModifyDialogComponent)
  })

  it('should render correctly', () => {
    const props = {
      onConfirmModify: () => {},
      onClose: () => {},
    }

    const enzymeWrapper = shallow(<AIPModifyDialogComponent {...props} />, { context })

    const positionedDialogWrapper = enzymeWrapper.find(PositionedDialog)
    assert.lengthOf(positionedDialogWrapper, 1, 'There should be AIP as JSON render')
    assert.isOk(positionedDialogWrapper.props().actions, 'Actions should be found')

    const listWrapper = enzymeWrapper.find(List)
    assert.lengthOf(listWrapper, 1, 'There should be a list')
  })
})
