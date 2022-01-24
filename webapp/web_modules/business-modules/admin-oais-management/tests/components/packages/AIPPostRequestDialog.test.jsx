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
import Dialog from 'material-ui/Dialog'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { AIPPostRequestDialog } from '../../../src/components/packages/AIPPostRequestDialog'
import styles from '../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test AIPPostRequestDialog
 * @author Raphaël Mechali
 */
describe('[OAIS AIP MANAGEMENT] Testing AIPPostRequestDialog', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AIPPostRequestDialog)
  })
  it('should render correctly', () => {
    const props = {
      onClose: () => {},
      deletionErrors: ['del.error.1', 'del.error.2'],
      modifyErrors: ['mod.error.1'],
    }
    const enzymeWrapper = shallow(<AIPPostRequestDialog {...props} />, { context })
    const dialogWrapper = enzymeWrapper.find(Dialog)
    assert.lengthOf(dialogWrapper, 1, 'There should be dialog component')
    testSuiteHelpers.assertWrapperProperties(dialogWrapper, {
      title: 'oais.packages.post.title',
      open: true,
    }, 'Dialog properties should be correctly set')
    const dialogAsText = dialogWrapper.debug()
    const allErrors = [...props.deletionErrors, ...props.modifyErrors]
    allErrors.forEach((err) => assert.include(dialogAsText, err, `Error "${err}" should be displayed`))
    assert.isTrue(dialogAsText.includes('oais.packages.post.message'), 'Message should be displayed')
  })
})
