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
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import Styles from '../../src/styles/styles'
import { UnconnectedModuleContainer } from '../../src/containers/ModuleContainer'
import FormComponent from '../../src/components/user/FormComponent'
import { DATASET_TYPE } from '../../src/domain/DatasetSelectionTypes'

/**
 * Tests for ModuleContainer
 * @author Sébastien binda
 */
describe('[SEARCH FORM] Testing ModuleContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  const context = buildTestContext(Styles)
  it('render and resolve correctly the plugins attributes', () => {
    const criterion = [
      {
        id: 1,
        label: 'string-criterion',
        active: true,
        pluginId: 1,
        container: 'content',
        conf: {
          attributes: {
            testAttr: 'a.b.c.failure', // should resolve to server attribute
            testAttr2: 'undefined.1',
            testAttr3: 'id', // should resolve to standard attribute IP ID
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
            testAttr2: 'undefined.2',
            testAttr3: 'label',
          },
        },
      },
    ]

    const props = {
      project: 'test',
      appName: 'test',
      type: 'any',
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
      attributeModels: {
        1: {
          content: {
            id: 1,
            jsonPath: 'a.b.c.failure',
            name: 'failure',
            label: 'Failure',
            type: 'INTEGER',
          },
        },
      },
      attributeModelsFetching: true,
      fetchAllModelsAttributes: () => { },
      dispatchCollapseForm: () => { },
      dispatchExpandResults: () => { },
      dispatchInitializeWithOpenedResults: () => { },
    }
    const wrapper = shallow(<UnconnectedModuleContainer
      {...props}
    />, { context })

    // Check parameters passed to FormComponent
    const formComponent = wrapper.find(FormComponent)
    assert.isTrue(formComponent.length === 1, 'There should be one FormComponent rendered')
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
              testAttr: { // resolved from server attributes pool
                id: 1,
                jsonPath: 'a.b.c.failure',
                name: 'failure',
                label: 'Failure',
                type: 'INTEGER',
              },
              testAttr2: undefined, // not resolved in attributes pool
              testAttr3: { // from standard attributes pool
                id: -1,
                jsonPath: 'id',
                name: 'id',
                label: 'Internal ID',
                type: 'STRING',
              },
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
              testAttr2: undefined, // not resolved in attributes pool
              testAttr3: { // from standard attributes pool
                id: -3,
                name: 'label',
                label: 'Label',
                type: 'STRING',
                jsonPath: 'label',
              },
            },
          },
        },
      ]

    assert.deepEqual(formComponent.prop('plugins'), expectedPlugins, 'Invalid plugins passed to FormComponent')
  })
})
