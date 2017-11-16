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
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import Avatar from 'material-ui/Avatar'
import { CatalogDomain } from '@regardsoss/domain'
import ThumbnailAttributeRender from '../../src/render/ThumbnailAttributeRender'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Tests for AttributeConfigurationComponent
 * @author Sébastien binda
 */
describe('[ATTRIBUTES COMMON] Testing ThumbnailAttributeRender', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('Should render a Thumbmail value', () => {
    const props = {
      attributes: {
        files: {
          [CatalogDomain.OBJECT_LINKED_FILE_ENUM.THUMBNAIL]: [{ uri: 'http://test.fr' }],
          [CatalogDomain.OBJECT_LINKED_FILE_ENUM.RAWDATA]: [{ uri: 'http://error.fr' }],
        },
      },
      lineHeight: 150,
    }
    const wrapper = shallow(<ThumbnailAttributeRender {...props} />, { context })

    const value = wrapper.find('img')
    assert.lengthOf(value, 1, 'There should be one image rendered')
  })

  it('Should render an empty value', () => {
    const props = {
      attributes: {
        files: {
          [CatalogDomain.OBJECT_LINKED_FILE_ENUM.RAWDATA]: [{ uri: 'http://test.fr' }],
          [CatalogDomain.OBJECT_LINKED_FILE_ENUM.RAWDATA]: [{ uri: 'http://error.fr' }],
        },
      },
      lineHeight: 150,
    }
    const wrapper = shallow(<ThumbnailAttributeRender {...props} />, { context })

    const value = wrapper.find(Avatar)
    assert.lengthOf(value, 0, 'Avatar should not be rendered')
  })
})
