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
import IconButton from 'material-ui/IconButton'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { IngestDomain } from '@regardsoss/domain'
import RequestStatusRenderCell from '../../../src/components/requests/RequestStatusRenderCell'
import { Request } from '../../dumps/Request.dump'
import styles from '../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test RequestStatusRenderCell
 * @author Simon MILHAU
 */
describe('[OAIS AIP MANAGEMENT] Testing RequestStatusRenderCell', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(RequestStatusRenderCell)
  })

  IngestDomain.AIP_REQUEST_STATUS.forEach((state) => it(`Should render correctly with state ${state}`, () => {
    const props = {
      entity: {
        ...Request,
        content: {
          ...Request.content,
          state,
          errors: state === IngestDomain.AIP_REQUEST_STATUS_ENUM.ERROR ? Request.content.errors : [],
        },
      },
      modeSelectionAllowed: true,
      onViewRequestErrors: () => {},
      onSelectVersionOption: () => {},
    }

    const enzymeWrapper = shallow(<RequestStatusRenderCell {...props} />, { context })
    // 1 - check status render
    assert.include(enzymeWrapper.debug(), `oais.list.filters.requestState.${state}`)
    // 2 - check error or version mode button is displayed / hidden
    const buttonWrapper = enzymeWrapper.find(IconButton)
    switch (state) {
      case IngestDomain.AIP_REQUEST_STATUS_ENUM.ERROR:
        assert.lengthOf(buttonWrapper, 1, 'There should be errors display button')
        assert.equal(buttonWrapper.props().onClick, enzymeWrapper.instance().onViewRequestErrors, 'View errors callback should be correctly set up')
        break
      case IngestDomain.AIP_REQUEST_STATUS_ENUM.WAITING_VERSIONING_MODE:
        assert.lengthOf(buttonWrapper, 1, 'There should be mode selection button')
        assert.equal(buttonWrapper.props().onClick, enzymeWrapper.instance().onSelectVersionOption, 'Mode selection callback should be correctly set up')
        break
      default:
        assert.lengthOf(buttonWrapper, 0, 'There should not be errors display button')
    }
  }))
  it('Should hide mode selection when user has insufficient rights', () => {
    const props = {
      entity: {
        ...Request,
        content: {
          ...Request.content,
          state: IngestDomain.AIP_REQUEST_STATUS_ENUM.WAITING_VERSIONING_MODE,
          errors: [],
        },
      },
      modeSelectionAllowed: false,
      onViewRequestErrors: () => {},
      onSelectVersionOption: () => {},
    }

    const enzymeWrapper = shallow(<RequestStatusRenderCell {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(IconButton), 0)
  })
})
