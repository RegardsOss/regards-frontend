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
 */
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { assert } from 'chai'
import { shallow } from 'enzyme'
import { OSCrawlerConfigurationContainer } from '../../../src/containers/opensearch/OSCrawlerConfigurationContainer'
import OSCrawlerConfigurationComponent from '../../../src/components/opensearch/crawler/OSCrawlerConfigurationComponent'

const context = buildTestContext()

describe('[ADMIN DATA DATASOURCE MANAGEMENT] Testing OSCrawlerConfigurationContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(OSCrawlerConfigurationContainer)
  })

  it('Render properly', () => {
    const props = {
      // eslint-disable-next-line react/no-unused-prop-types
      project: 'project1',
      initialValues: {},
      isEditing: false,
      onBack: () => {},
      onSubmit: () => {},
      fetchDescriptor: () => {},
    }

    const wrapper = shallow(<OSCrawlerConfigurationContainer {...props} />, { context })
    const comp = wrapper.find(OSCrawlerConfigurationComponent)
    assert.lengthOf(comp, 1, 'There should be the component')
    testSuiteHelpers.assertWrapperProperties(comp, {
      isEditing: props.isEditing,
      initialValues: props.initialValues,
      fetchDescriptor: props.fetchDescriptor,
      onBack: props.onBack,
      onSubmit: wrapper.instance().onSubmit,
    }, 'Component properties should be correctly set')
  })
})
