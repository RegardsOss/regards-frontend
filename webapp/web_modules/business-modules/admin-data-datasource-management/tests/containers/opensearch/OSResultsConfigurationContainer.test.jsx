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
 */
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { assert } from 'chai'
import { shallow } from 'enzyme'
import { OSResultsConfigurationContainer } from '../../../src/containers/opensearch/OSResultsConfigurationContainer'
import OSResultsConfigurationComponent from '../../../src/components/opensearch/results/OSResultsConfigurationComponent'

const context = buildTestContext()

describe('[ADMIN DATA DATASOURCE MANAGEMENT] Testing OSResultsConfigurationContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(OSResultsConfigurationContainer)
  })

  it('Render properly', () => {
    const props = {
      onBack: () => {},
      onSubmit: () => {},
      isEditing: false,
      initialValues: {},
      modelList: {},
      modelAttributeList: {},
      fetchModelAttributeList: () => {},
      flushModelAttribute: () => {},
      fetchModelList: () => {},
    }

    const wrapper = shallow(<OSResultsConfigurationContainer {...props} />, { context })
    const comp = wrapper.find(OSResultsConfigurationComponent)
    assert.lengthOf(comp, 1, 'There should be the component')
    testSuiteHelpers.assertWrapperProperties(comp, {
      onSubmit: props.onSubmit,
      onBack: props.onBack,
      isEditing: props.isEditing,
      modelList: props.modelList,
      initialValues: props.initialValues,
      modelAttributeList: props.modelAttributeList,
      onModelSelected: wrapper.instance().handleModelChange,
    }, 'Component properties should be correctly set')
  })
})
