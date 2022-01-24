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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { CardActionsComponent, CodeFileDisplayer } from '@regardsoss/components'
import RequestErrorDetailsComponent from '../../../src/components/requests/RequestErrorDetailsComponent'
import styles from '../../../src/styles'
import { Request } from '../../dumps/Request.dump'

const context = buildTestContext(styles)

/**
 * Test RequestErrorDetailsComponent
 * @author Simon MILHAU
 */
describe('[OAIS AIP MANAGEMENT] Testing RequestErrorDetailsComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(RequestErrorDetailsComponent)
  })

  it('should render correctly', () => {
    const props = {
      entity: Request,
      onClose: () => {},
    }
    const enzymeWrapper = shallow(<RequestErrorDetailsComponent {...props} />, { context })
    const jsonPreviewWrapper = enzymeWrapper.find(CodeFileDisplayer)
    assert.lengthOf(jsonPreviewWrapper, 1, 'There should be AIP as JSON render')
    assert.isOk(jsonPreviewWrapper.props().content, 'AIP JSON value should be found')
    const closeButtonWrapper = enzymeWrapper.find(CardActionsComponent)
    assert.lengthOf(closeButtonWrapper, 1, 'There should be the close button')
    assert.equal(closeButtonWrapper.props().mainButtonClick, props.onClose, 'Close callback should be correctly reported')
  })
})
