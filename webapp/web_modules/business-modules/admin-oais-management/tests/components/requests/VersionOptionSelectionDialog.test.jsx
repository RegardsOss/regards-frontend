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
import Dialog from 'material-ui/Dialog'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { TableSelectionModes } from '@regardsoss/components'
import RadioButton from 'material-ui/RadioButton'
import { IngestDomain } from '@regardsoss/domain'
import VersionOptionSelectionDialog from '../../../src/components/requests/VersionOptionSelectionDialog'
import styles from '../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test VersionOptionSelectionDialog
 * @author Raphaël Mechali
 */
describe('[OAIS AIP MANAGEMENT] Testing VersionOptionSelectionDialog', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(VersionOptionSelectionDialog)
  })
  it('should render correctly open', () => {
    const props = {
      selection: {
        open: true,
        mode: TableSelectionModes.excludeSelected,
        entities: [],
      },
      onClose: () => { },
      onConfirm: () => { },
      severalEntitiesSelected: true,
    }
    const enzymeWrapper = shallow(<VersionOptionSelectionDialog {...props} />, { context })

    const dialogWrapper = enzymeWrapper.find(Dialog)
    assert.isTrue(dialogWrapper.props().open, 'Dialog should be open')
    // there should be an option for 'increment version', 'ignore' and 'replace'
    const radioButtons = dialogWrapper.find(RadioButton)
    assert.lengthOf(radioButtons, 3, '3 option should be available for mode selection (increment, replace or ignore)')
    assert.lengthOf(radioButtons.findWhere((n) => n.props().value === IngestDomain.VERSIONING_MODES_ENUM.INC_VERSION), 1, ' There should be increment version option')
    assert.lengthOf(radioButtons.findWhere((n) => n.props().value === IngestDomain.VERSIONING_MODES_ENUM.REPLACE), 1, ' There should be replace package option')
    assert.lengthOf(radioButtons.findWhere((n) => n.props().value === IngestDomain.VERSIONING_MODES_ENUM.IGNORE), 1, ' There should be ignore package option')
  })
  it('should render correctly closed', () => {
    const props = {
      selection: {
        open: false,
        mode: TableSelectionModes.includeSelected,
        entities: [],
      },
      onClose: () => { },
      onConfirm: () => { },
      severalEntitiesSelected: true,
    }
    const enzymeWrapper = shallow(<VersionOptionSelectionDialog {...props} />, { context })

    const dialogWrapper = enzymeWrapper.find(Dialog)
    assert.lengthOf(dialogWrapper, 0, 'Dialog should not be rendered when closed')
  })
})
