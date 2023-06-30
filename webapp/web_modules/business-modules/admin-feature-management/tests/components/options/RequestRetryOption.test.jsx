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
import { ResourceIconAction } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import RequestRetryOption from '../../../src/components/options/RequestRetryOption'
import styles from '../../../src/styles'

const context = buildTestContext(styles)

/**
   * Test RequestRetryOption
   * @author Théo Lasserre
   */
describe('[ADMIN FEATURE MANAGEMENT] Testing RequestRetryOption', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(RequestRetryOption)
  })
  it('should render correctly', () => {
    const props = {
      entity: {
        content: {
          providerId: '0',
          state: 'ERROR',
          step: 'LOCAL_ERROR',
          errors: ['Error'],
        },
      },
      onRetry: () => { },
    }
    const enzymeWrapper = shallow(<RequestRetryOption {...props} />, { context })
    const iconWrapper = enzymeWrapper.find(ResourceIconAction)
    assert.lengthOf(iconWrapper, 1, 'There should be a ResourceIconAction')
  })
})
