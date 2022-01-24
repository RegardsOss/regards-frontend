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
 */
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { assert } from 'chai'
import { shallow } from 'enzyme'
import { OSQueryConfigurationContainer } from '../../../src/containers/opensearch/OSQueryConfigurationContainer'
import OSQueryConfigurationComponent from '../../../src/components/opensearch/query/OSQueryConfigurationComponent'
import { openSearchDescriptor } from '../../dumps/opensearch-descriptor.dump'

const context = buildTestContext()

describe('[ADMIN DATA DATASOURCE MANAGEMENT] Testing OSQueryConfigurationContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(OSQueryConfigurationContainer)
  })

  it('Render properly', () => {
    const props = {
      isEditing: false,
      initialValues: {},
      onBack: () => {},
      onSubmit: () => {},
      descriptor: openSearchDescriptor,
    }

    const wrapper = shallow(<OSQueryConfigurationContainer {...props} />, { context })
    const comp = wrapper.find(OSQueryConfigurationComponent)
    assert.lengthOf(comp, 1, 'There should be the component')
    testSuiteHelpers.assertWrapperProperties(comp, {
      initialValues: props.initialValues,
      isEditing: props.isEditing,
      urlDescriptor: openSearchDescriptor.url[2],
      onBack: props.onBack,
      onSubmit: wrapper.instance().onSubmit,
    }, 'Component properties should be correctly set')
  })
})
