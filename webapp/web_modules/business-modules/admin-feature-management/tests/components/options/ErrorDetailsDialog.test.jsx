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
import Dialog from 'material-ui/Dialog'
import { CardActionsComponent, CodeFileDisplayer } from '@regardsoss/components'
import { Card } from 'material-ui/Card'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { ErrorDetailsDialog } from '../../../src/components/options/ErrorDetailsDialog'
import styles from '../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test ErrorDetailsDialog
 * @author Théo Lasserre
 */
describe('[ADMIN FEATURE MANAGEMENT] Testing ErrorDetailsDialog', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ErrorDetailsDialog)
  })
  it('should render correctly', () => {
    const props = {
      entity: {
        content: {
          id: 0,
          providerId: '0',
          state: 'ERROR',
          errors: ['Erreur'],
        },
      },
      onClose: () => { },
    }
    const enzymeWrapper = shallow(<ErrorDetailsDialog {...props} />, { context })
    const dialogWrapper = enzymeWrapper.find(Dialog)
    assert.lengthOf(dialogWrapper, 1, 'There should be a Dialog')

    const cardWrapper = enzymeWrapper.find(Card)
    assert.lengthOf(cardWrapper, 1, 'There should be a Card')

    const codeWrapper = enzymeWrapper.find(CodeFileDisplayer)
    assert.lengthOf(codeWrapper, 1, 'There should be a CodeFileDisplayer')

    const cardActionsWrapper = enzymeWrapper.find(CardActionsComponent)
    assert.lengthOf(cardActionsWrapper, 1, 'There should be a CardActionsComponent')
  })
})
