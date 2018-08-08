/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { MIME_TYPES } from '@regardsoss/mime-types/src/MimeTypesEnum'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import FileComponent from '../../../../src/components/user/files/FileComponent'
import styles from '../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test FileComponent
 * @author Raphaël Mechali
 */
describe('[Description] Testing FileComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(FileComponent)
  })
  it('should render correctly loading', () => {
    const props = {
      loading: true,
      error: false,
      file: null,
    }
    shallow(<FileComponent {...props} />, { context })
    // cannot test further due to Measure component
  })
  it('should render correctly in error', () => {
    const props = {
      loading: false,
      error: true,
      file: null,
    }
    shallow(<FileComponent {...props} />, { context })
    // cannot test further due to Measure component
  })
  it('should render correctly with supported file type', () => {
    const props = {
      loading: false,
      error: false,
      file: {
        content: {},
        contentType: MIME_TYPES.CSS_MIME_TYPE,
      },
    }
    shallow(<FileComponent {...props} />, { context })
    // cannot test further due to Measure component
  })
  it('should render correctly with unsupported file type', () => {
    const props = {
      loading: false,
      error: false,
      file: {
        content: {},
        contentType: 'unknown/type',
      },
    }
    shallow(<FileComponent {...props} />, { context })
    // cannot test further due to Measure component
  })
})
