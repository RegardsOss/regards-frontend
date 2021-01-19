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
import Dialog from 'material-ui/Dialog'
import IconButton from 'material-ui/IconButton'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { DialogMessageHelpComponent } from '../../../src/components/help/DialogMessageHelpComponent'
import styles from '../../../src/styles'
import { FieldHelp } from '../../../src/domain/FieldHelp'

const context = buildTestContext(styles)

/**
 * Test DialogMessageHelpComponent
 * @author Raphaël Mechali
 */
describe('[FORM UTILS] Testing DialogMessageHelpComponent, showing / hiding dialog on user demand', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DialogMessageHelpComponent)
  })
  it('should render correctly with default title', () => {
    const props = {
      help: FieldHelp.buildDialogMessageHelp('my.message.key'),
    }
    const enzymeWrapper = shallow(<DialogMessageHelpComponent {...props} />, { context })
    // A - Check button
    const buttonWrapper = testSuiteHelpers.assertCompWithProps(enzymeWrapper, IconButton, {
      title: DialogMessageHelpComponent.DEFAULT_TITLE_KEY,
      onClick: enzymeWrapper.instance().onShowHelp,
    }, 'Button should be displayed with right properties')
    // B - Check dialog initially hidden
    const dialogWrapper = testSuiteHelpers.assertCompWithProps(enzymeWrapper, Dialog, {
      title: DialogMessageHelpComponent.DEFAULT_TITLE_KEY,
      modal: false,
      open: false,
      onRequestClose: enzymeWrapper.instance().onCloseHelp,
    }, 'Dialog should be displayed with right properties, initially hidden')
    assert.include(dialogWrapper.debug(), 'my.message.key', 'Message should be displayed in dialog content')
    // C - Test dialog opening
    buttonWrapper.props().onClick()
    testSuiteHelpers.assertCompWithProps(enzymeWrapper, Dialog, {
      title: DialogMessageHelpComponent.DEFAULT_TITLE_KEY,
      modal: false,
      open: true,
      onRequestClose: enzymeWrapper.instance().onCloseHelp,
    }, 'Dialog should be opened after click on the help button')
    // D - Dialog should be hidden after close request
    dialogWrapper.props().onRequestClose()
    testSuiteHelpers.assertCompWithProps(enzymeWrapper, Dialog, {
      title: DialogMessageHelpComponent.DEFAULT_TITLE_KEY,
      modal: false,
      open: false,
      onRequestClose: enzymeWrapper.instance().onCloseHelp,
    }, 'Dialog should be hidden after close request')
  })
  it('should render correctly with custom title', () => {
    const props = {
      help: FieldHelp.buildDialogMessageHelp('my.message.key', 'my.title.key'),
    }
    const enzymeWrapper = shallow(<DialogMessageHelpComponent {...props} />, { context })
    // A - Check button
    testSuiteHelpers.assertCompWithProps(enzymeWrapper, IconButton, {
      title: 'my.title.key',
      onClick: enzymeWrapper.instance().onShowHelp,
    }, 'Button should be displayed with right properties')
    // B - Check dialog initially hidden
    const dialogWrapper = testSuiteHelpers.assertCompWithProps(enzymeWrapper, Dialog, {
      title: 'my.title.key',
      modal: false,
      open: false,
      onRequestClose: enzymeWrapper.instance().onCloseHelp,
    }, 'Dialog should be displayed with right properties, initially hidden')
    assert.include(dialogWrapper.debug(), 'my.message.key', 'Message should be displayed in dialog content')
  })
})
