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
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { OAISPackageManagerContainer } from '../../../src/containers/packages/OAISPackageManagerContainer'
import styles from '../../../src/styles'
import OAISPackageManagerComponent from '../../../src/components/packages/OAISPackageManagerComponent'

const context = buildTestContext(styles)

/**
 * Test OAISPackageManagerContainer
 * @author Simon MILHAU
 */
describe('[OAIS AIP MANAGEMENT] Testing OAISPackageManagerContainer', () => {
  before(() => {
    testSuiteHelpers.before()
  })
  after(() => {
    testSuiteHelpers.after()
  })

  it('should exists', () => {
    assert.isDefined(OAISPackageManagerContainer)
  })
  it('should render correctly', () => {
    const props = {
      params: {
        project: 'any',
      },
      meta: {
        number: 2,
        size: 20,
        totalElements: 50,
      },

      updateStateFromFeatureManagerFilters: () => { },
      updateStateFromPackageManager: () => { },
      fetchProcessingChains: () => { },
      fetchPage: () => { },
      fetchStorages: () => { },
      clearSelection: () => { },
      fetchSip: () => { },
      deleteAips: () => { },
      modifyAips: () => { },

      featureManagerFilters: {
        state: '',
        from: '',
        to: '',
        tags: [],
        providerId: '',
        sessionOwner: '',
        session: '',
        categories: [],
        storages: [],
      },
      selectionMode: '',

    }
    const enzymeWrapper = shallow(<OAISPackageManagerContainer {...props} />, { context })
    const wrapperInstance = enzymeWrapper.instance()
    const componentWrapper = enzymeWrapper.find(OAISPackageManagerComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      pageSize: STATIC_CONF.TABLE.PAGE_SIZE,
      featureManagerFilters: props.featureManagerFilters,
      storages: props.storages,
      onRefresh: wrapperInstance.onRefresh,
      deleteAips: props.deleteAips,
      tableSelection: props.tableSelection,
      selectionMode: props.selectionMode,
      modifyAips: props.modifyAips,
      // fetchSip: props.fetchSip,
    }, 'Component should define the expected properties and callbacks')
  })
})
