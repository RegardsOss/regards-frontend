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
import { CardActionsComponent, CodeFileDisplayer, PositionedDialog } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import ReferenceDetailDialog from '../../../src/components/options/ReferenceDetailDialog'
import styles from '../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test ReferenceDetailDialog
 * @author Théo Lasserre
 */
describe('[ADMIN FEATURE MANAGEMENT] Testing ReferenceDetailDialog', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ReferenceDetailDialog)
  })
  it('should render correctly', () => {
    const props = {
      entity: {
        content: {
          providerId: '0',
        },
      },
      onClose: () => { },
    }
    const enzymeWrapper = shallow(<ReferenceDetailDialog {...props} />, { context })

    const positionnedDialogWrapper = enzymeWrapper.find(PositionedDialog)
    assert.lengthOf(positionnedDialogWrapper, 1, 'There should be a PositionedDialog')

    const codeWrapper = enzymeWrapper.find(CodeFileDisplayer)
    assert.lengthOf(codeWrapper, 1, 'There should be a CodeFileDisplayer')

    const cardActionsWrapper = enzymeWrapper.find(CardActionsComponent)
    assert.lengthOf(cardActionsWrapper, 1, 'There should be a CardActionsComponent')
  })
})
