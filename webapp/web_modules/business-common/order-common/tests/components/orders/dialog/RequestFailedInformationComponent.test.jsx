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
import Dialog from 'material-ui/Dialog'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import RequestFailedInformationComponent from '../../../../src/components/orders/dialog/RequestFailedInformationComponent'
import styles from '../../../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test RequestFailedInformationComponent
* @author Raphaël Mechali
*/
describe('[Order Common] Testing RequestFailedInformationComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(RequestFailedInformationComponent)
  })
  it('should render correctly hidden ', () => {
    const props = {
      visible: false,
      requestResponse: null,
      onClose: () => { },
    }
    const enzymeWrapper = shallow(<RequestFailedInformationComponent {...props} />, { context })
    const dialog = enzymeWrapper.find(Dialog)
    assert.lengthOf(dialog, 1, 'There should be a dialog')
    assert.isFalse(dialog.props().open, 'It should be closed')
  })

  RequestFailedInformationComponent.KNOWN_ERROR_TYPES.forEach((errorType) => it(`should render correctly the known error case ${errorType} `, () => {
    const props = {
      visible: true,
      requestResponse: {
        payload: {
          response: {
            messages: [errorType],
          },
        },
      },
      onClose: () => { },
    }
    const enzymeWrapper = shallow(<RequestFailedInformationComponent {...props} />, { context })
    const dialog = enzymeWrapper.find(Dialog)
    assert.lengthOf(dialog, 1, 'There should be a dialog')
    assert.isTrue(dialog.props().open, 'It should be opened')
    assert.include(dialog.debug(), `order.list.options.error.${errorType}`, 'Error type should be displayed as an i18n message')
  }))

  it('should render correctly the unknown error case', () => {
    const props = {
      visible: true,
      requestResponse: {
        payload: {},
      },
      onClose: () => { },
    }
    const enzymeWrapper = shallow(<RequestFailedInformationComponent {...props} />, { context })
    const dialog = enzymeWrapper.find(Dialog)
    assert.lengthOf(dialog, 1, 'There should be a dialog')
    assert.isTrue(dialog.props().open, 'It should be opened')
    assert.include(
      dialog.debug(), `order.list.options.error.${RequestFailedInformationComponent.UNKNOWN_TYPE}`,
      'Error type should be displayed as an i18n message',
    )
  })
})
