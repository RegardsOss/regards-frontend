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
import root from 'window-or-global'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import Dialog from 'material-ui/Dialog'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { BrowserCheckerDialog } from '../../src/dialogs/BrowserCheckerDialog'
import styles from '../../src/dialogs/styles'

const context = buildTestContext(styles)

/**
 * Test BrowserCheckerDialog
 * @author Raphaël Mechali
 */
describe('[Components] Testing BrowserCheckerDialog', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(BrowserCheckerDialog)
  })
  it('should render correctly and handle local storage', () => {
    // 0 - clear local storage
    root.localStorage.clear()
    const props = {
      browserRequirements: {
        browser1: '1.01.0',
        browser2: '1.01.0',
      },
      localStorageKey: 'my-local-storage-key',
    }
    // 1 - render dialog a first time without local storage
    const enzymeWrapper = shallow(<BrowserCheckerDialog {...props} />, { context })
    // browser should not have been detetected in tests, the dialog should be visible
    const dialog = enzymeWrapper.find(Dialog)
    assert.lengthOf(dialog, 1, 'There should be the dialog')
    assert.isTrue(dialog.props().open, 'The dialog should be opened')

    // simulate on close without 'do not show again'
    enzymeWrapper.instance().onCloseDialog()
    enzymeWrapper.update()
    assert.isFalse(enzymeWrapper.find(Dialog).props().open, 'The dialog should be closed')
    assert.isNotOk(root.localStorage.getItem('my-local-storage-key'), 'Local storage should not be set when closing with do not show again not ticked')

    // simulate on close with 'do not show again'
    enzymeWrapper.instance().onDoNoShowAgain()
    assert.isOk(root.localStorage.getItem('my-local-storage-key'), 'Local storage should be set when closing with do not show again is not ticked')

    // 2 - test and verify that the dialog is not initially open with local storage key set
    const enzymeWrapper2 = shallow(<BrowserCheckerDialog {...props} />, { context })
    assert.isFalse(enzymeWrapper2.find(Dialog).props().open, 'The dialog should be closed when launching it with local storage key set')
  })
  it('should parse version or fallback on number', () => {
    assert.equal(BrowserCheckerDialog.parseNumberFromVersion('a'), 0, '"a" should falback on 0')
    assert.equal(BrowserCheckerDialog.parseNumberFromVersion('11'), 11, '"11" should be parsed as 11')
    assert.equal(BrowserCheckerDialog.parseNumberFromVersion('46-bv'), 46, '"46" should be parsed as 46')
  })
  it('should raise errors for lower version comparison only', () => {
    // test raisen errors (ie should return an error value)
    assert.isOk(BrowserCheckerDialog.checkBrowerVersion([3], [2]), 'Required 3 > Current 2')
    assert.isOk(BrowserCheckerDialog.checkBrowerVersion([2, 0], [1, 9]), 'Required 2.0 > Current 1.9')
    assert.isOk(BrowserCheckerDialog.checkBrowerVersion([2, 2, 1], [2, 2, 0]), 'Required 2.2.1 > Current 2.2.0')

    // test OK cases (ie, should return null)
    assert.isNotOk(BrowserCheckerDialog.checkBrowerVersion([2], [3]), 'Required 2 < Current 3')
    assert.isNotOk(BrowserCheckerDialog.checkBrowerVersion([1, 9], [2, 0]), 'Required 1.9 < Current 2.0')
    assert.isNotOk(BrowserCheckerDialog.checkBrowerVersion([2, 2, 0], [2, 2, 1]), 'Required 2.2.0 < Current 2.2.1')
    assert.isNotOk(BrowserCheckerDialog.checkBrowerVersion([2, 2, 0], [2, 2, 0]), 'Required 2.2.0 == Current 2.2.0')
  })
  it('should check correctly browser and version', () => {
    const dictionary = {
      chrome: '1.1.2',
      firefox: '2.0-bvc',
    }

    // test browser errors
    assert.equal(BrowserCheckerDialog.checkBrowser(null, dictionary),
      BrowserCheckerDialog.BROWSER_ERROR_TYPES.UNSUPPORTED, 'Undefined browser should be marked unsupported')
    assert.equal(BrowserCheckerDialog.checkBrowser({ name: 'ie' }, dictionary),
      BrowserCheckerDialog.BROWSER_ERROR_TYPES.UNSUPPORTED, 'Browser not found in dictionary should be marked unsupported')
    // test version errors
    assert.equal(BrowserCheckerDialog.checkBrowser({ name: 'firefox', version: null }, dictionary),
      BrowserCheckerDialog.BROWSER_ERROR_TYPES.TOO_OLD, 'Browser without version should be marked too old')
    assert.equal(BrowserCheckerDialog.checkBrowser({ name: 'firefox', version: 'a' }, dictionary),
      BrowserCheckerDialog.BROWSER_ERROR_TYPES.TOO_OLD, 'Browser with crazy version should be marked too old')
    assert.equal(BrowserCheckerDialog.checkBrowser({ name: 'firefox', version: '1.9' }, dictionary),
      BrowserCheckerDialog.BROWSER_ERROR_TYPES.TOO_OLD, 'Firefox version 1.9 should be marked too old')
    assert.equal(BrowserCheckerDialog.checkBrowser({ name: 'chrome', version: '1.1.1' }, dictionary),
      BrowserCheckerDialog.BROWSER_ERROR_TYPES.TOO_OLD, 'Chrome version 1.1.1 should be marked too old')
    // test OK browsers (no return value)
    assert.isNotOk(BrowserCheckerDialog.checkBrowser({ name: 'chrome', version: '2.0' }, dictionary),
      'Chrome version 2.0 should not raise an error')
    assert.isNotOk(BrowserCheckerDialog.checkBrowser({ name: 'firefox', version: '2.0' }, dictionary),
      'Firefox version 2.0 should not raise an error')
    assert.isNotOk(BrowserCheckerDialog.checkBrowser({ name: 'chrome', version: '1.1.2' }, dictionary),
      'Chrome version 1.1.2 should not raise an error')
    assert.isNotOk(BrowserCheckerDialog.checkBrowser({ name: 'chrome', version: '1.1.3' }, dictionary),
      'Chrome version 1.1.3 should not raise an error')
  })
})
