/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import get from 'lodash/get'
import MenuItem from 'material-ui/MenuItem'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { AccessDomain } from '@regardsoss/domain'
import { DropDownButton } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { SessionsMonitoringIndexedRenderer } from '../../../../src/components/session/render/SessionsMonitoringIndexedRenderer'
import styles from '../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test SessionsMonitoringIndexedRenderer
 * @author Kévin Picart
 */
describe('[ADMIN DATA PROVIDER MANAGEMENT] Testing SessionsMonitoringIndexedRenderer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SessionsMonitoringIndexedRenderer)
  })

  function createEntity(lifeCycle = {}, state) {
    return {
      content: {
        id: 9,
        name: 'Name',
        source: 'Source 3',
        creationDate: '2019-07-30T08:38:27.177Z',
        lastUpdateDate: '2019-07-30T08:38:27.184Z',
        isLatest: true,
        state,
        lifeCycle,
      },
      links: [],
    }
  }

  const testCases = [{
    testLabel: 'It should render correctly without option (no data)',
    entity: createEntity({}, AccessDomain.SESSION_STATUS_ENUM.ACKNOWLEDGED),
    hasDatasourceList: false,
    availableDependencies: SessionsMonitoringIndexedRenderer.DATASOURCES_LIST_DEPENDENCIES,
  }, {
    testLabel: 'It should render correctly without option (no dependency)',
    entity: createEntity({
      catalog: {
        indexed: 5,
        indexedError: 0,
      },
    }, AccessDomain.SESSION_STATUS_ENUM.ACKNOWLEDGED),
    hasDatasourceList: false,
    availableDependencies: [],
  }, {
    testLabel: 'It should render correctly with datasource list option',
    entity: createEntity({
      catalog: {
        indexed: 0,
        indexedError: 8,
      },
    }, AccessDomain.SESSION_STATUS_ENUM.ACKNOWLEDGED),
    hasDatasourceList: true,
    availableDependencies: SessionsMonitoringIndexedRenderer.DATASOURCES_LIST_DEPENDENCIES,
  }]

  testCases.forEach(({
    testLabel, entity,
    hasDatasourceList,
    availableDependencies,
  }) => it(`should render correctly ${testLabel}`, () => {
    const props = {
      entity,
      availableDependencies,
      onGoToDatasources: () => {},
    }
    const enzymeWrapper = shallow(<SessionsMonitoringIndexedRenderer {...props} />, { context })
    // 1 - Check option
    const dropDownMenu = enzymeWrapper.find(DropDownButton)
    if (hasDatasourceList) {
      // 1.a - Check menu then options in menu
      assert.lengthOf(dropDownMenu, 1, 'Menu should be shown')
      const menuItems = dropDownMenu.find(MenuItem)
      assert.lengthOf(menuItems.findWhere((n) => n.props().onClick === props.onGoToDatasources), 1, 'There should be datasource list option')
    } else {
      // 1.b - Check menu is not displayed
      assert.lengthOf(dropDownMenu, 0, 'Menu should not be shown')
    }
    // 3 - Check the right numbers are displayed
    const asText = enzymeWrapper.debug()
    if (!entity.content.lifeCycle.catalog) {
      assert.include(asText, '-', 'Dash should be rendered instead of values')
      assert.notInclude(asText, '0', 'Null count should not be rendered')
    } else {
      assert.include(asText, get(entity, 'content.lifeCycle.catalog.indexed', 0), 'Indexed count should be displayed')
      assert.include(asText, get(entity, 'content.lifeCycle.catalog.indexedError', 0), 'Index errors count should be displayed')
    }
  }))
})
