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
import { buildTestContext, testSuiteHelpers, uiPluginServiceTestHelpers } from '@regardsoss/tests-helpers'
import { CatalogClient } from '@regardsoss/client'

import { BasicSignalsSelectors, BasicSignalSelectors } from '@regardsoss/store-utils'
import { EditContainer } from '../../src/containers/EditContainer'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/**
 * Test case for {@link EditContainer}
 *
 * @author C-S
 */
describe('[fem-delete] Testing EditContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)
  it('should exists', () => {
    assert.isDefined(EditContainer)
  })
  it('should render self and sub components', () => {
    const props = {
      pluginInstanceId: 'stub.id',
      // stub runtime configuration
      target: uiPluginServiceTestHelpers.buildOneElementTarget('test-data-entity-ip-id'),
      configuration: uiPluginServiceTestHelpers.buildConfiguration(),
      onClose: () => ({}),
      // user is optional, let's not provide it here
      // We also need to mock the methods provided by map dispatch to props, as we import component disconnected from redux
      editFeatures: () => new Promise(() => { }),
      fetchModelAttributes: () => new Promise(() => { }),
      // mock map state to props
      modelAttributeList: [],
      error: {
        hasError: false,
      },
      isFetching: false,
      // Client stub expected by the container
      editClient: {
        actions: new CatalogClient.FEMFeatureRequestsActions('stub.namespace'),
        selectors: new BasicSignalsSelectors([]),
      },
      modelAttributesClient: {
        actions: new CatalogClient.SearchEntitiesCommonModelAttributesActions(),
        selectors: new BasicSignalSelectors([]),
      },
    }
    shallow(<EditContainer {...props} />, { context })
  })
})
