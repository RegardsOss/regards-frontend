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
import { spy } from 'sinon'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import Styles from '../../src/styles/styles'
import { UnconnectedModuleContainer } from '../../src/containers/ModuleContainer'
import FormComponent from '../../src/components/user/FormComponent'
import { DATASET_TYPE } from '../../src/models/datasets/DatasetSelectionTypes'

/**
 * Tests for ModuleContainer
 * @author Sébastien binda
 */
describe('[SEARCH FORM] Testing User Container', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  const context = buildTestContext(Styles)
  it('Should fetch the model attributes before rendering the criterion plugins', () => {
    const fetchAttributeCallback = spy()

    const criterion = [
      {
        id: 1,
        label: 'string-criterion',
        active: true,
        pluginId: 1,
        container: 'content',
        conf: {
          attributes: {
            testAttr: 0,
            testAttr2: 1,
            testAttr3: 'ipId',
          },
        },
      },
      {
        id: 2,
        label: 'test-criterion',
        active: true,
        pluginId: 2,
        container: 'content',
        conf: {
          attributes: {
            testAttr2: 1,
            testAttr3: 2,
          },
        },
      },
    ]

    const props = {
      project: 'test',
      appName: 'test',
      description: 'Test',
      moduleConf: {
        enableFacettes: false,
        layout: {
          id: 'main',
          type: 'type',
        },
        criterion,
        datasets: {
          entityType: DATASET_TYPE,
          selectedDatasets: [],
          selectedModels: [],
        },
      },
      fetchAttribute: fetchAttributeCallback,
      attributeModels: {},
      attributeModelsFetching: true,
    }
    const wrapper = shallow(
      <UnconnectedModuleContainer
        {...props}
      />, { context },
    )

    // Only 3 attributes to fetch, ids : 0,1 and 2. The attribute with id=ipId is a standard attribute and can not be load
    assert.equal(fetchAttributeCallback.callCount, 3, 'There should be 3 attributes to fetch')
    assert.isTrue(fetchAttributeCallback.calledWith(0), 'The attribute with id 0 should be fetched')
    assert.isTrue(fetchAttributeCallback.calledWith(1), 'The attribute with id 1 should be fetched')
    assert.isTrue(fetchAttributeCallback.calledWith(2), 'The attribute with id 2 should be fetched')

    // Check parameters passed to FormComponent
    const formComponent = wrapper.find(FormComponent)
    assert.isTrue(formComponent.length === 1, 'There should be one FormComponent rendered')
    assert.equal(formComponent.prop('layout'), props.moduleConf.layout, ' Invalid layout passed to FormComponent')
    const expectedPlugins =
      [
        {
          id: 1,
          label: 'string-criterion',
          active: true,
          pluginId: 1,
          container: 'content',
          conf: {
            attributes: {
              testAttr: 0,
              testAttr2: 1,
              testAttr3: { jsonPath: 'ipId', name: 'ipId', label: 'IP Identifier', type: 'STRING' },
            },
          },
        },
        {
          id: 2,
          label: 'test-criterion',
          active: true,
          pluginId: 2,
          container: 'content',
          conf: {
            attributes: {
              testAttr2: 1,
              testAttr3: 2,
            },
          },
        },
      ]

    assert.deepEqual(formComponent.prop('plugins'), expectedPlugins, 'Invalid plugins passed to FormComponent')
  })
})
