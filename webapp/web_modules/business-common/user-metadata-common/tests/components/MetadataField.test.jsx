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
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { Field } from '@regardsoss/form-utils'
import { getMetadataArray } from '../../src/definitions/metadatav1'
import MetadataField from '../../src/components/MetadataField'

const context = buildTestContext()

describe('[User Metadata Common] Testing MetadataField', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(MetadataField)
  })

  // test that each known metadata model is correctly rendered
  getMetadataArray().forEach((metadata) => it(`should render a field properly for ${metadata.key}`, () => {
    const props = {
      metadata,
    }
    const metadataWrapper = shallow(<MetadataField {...props} />, { context })
    const fieldWrapper = metadataWrapper.find(Field)
    assert.lengthOf(fieldWrapper, 1, 'There should be a display field')
    assert.equal(fieldWrapper.props().name, metadata.key, 'The field should use metadata key as name, so that using form can retrieve value')
  }))
})
