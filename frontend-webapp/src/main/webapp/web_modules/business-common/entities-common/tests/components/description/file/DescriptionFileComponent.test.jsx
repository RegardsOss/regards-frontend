/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import DescriptionFileComponent from '../../../../src/components/description/file/DescriptionFileComponent'
import styles from '../../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Entities Common] Testing DescriptionFileComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DescriptionFileComponent)
  })
  it('should render correctly a no data', () => {
    const props = {
      loading: false,
      descriptionFileURL: null,
      descriptionFile: null,
    }
    shallow(<DescriptionFileComponent {...props} />, { context })
    // cannot any longer test for content due to new react-measure version (wraps a function)
  })
  it('should render correctly loading', () => {
    const props = {
      loading: true,
      descriptionFileURL: null,
      descriptionFile: null,
    }
    shallow(<DescriptionFileComponent {...props} />, { context })
    // cannot any longer test for content due to new react-measure version (wraps a function)
  })
  it('should render correctly with an URL to display', () => {
    const props = {
      loading: false,
      descriptionFileURL: 'www.google.fr',
      descriptionFile: null,
    }

    shallow(<DescriptionFileComponent {...props} />, { context })
    // cannot any longer test for content due to new react-measure version (wraps a function)
  })
  it('should render correctly with a local description content to display', () => {
    const props = {
      loading: false,
      descriptionFileURL: null,
      descriptionFile: {
        entityId: 'URN:1001-dalmatiens',
        contentType: 'text/markdown',
        content: '#Hello',
      },
    }

    shallow(<DescriptionFileComponent {...props} />, { context })
    // cannot any longer test for content due to new react-measure version (wraps a function)
  })
})
