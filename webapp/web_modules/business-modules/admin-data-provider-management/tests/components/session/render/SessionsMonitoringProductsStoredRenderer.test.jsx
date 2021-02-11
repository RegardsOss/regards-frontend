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
import get from 'lodash/get'
import RunningIcon from 'mdi-material-ui/Play'
import MenuItem from 'material-ui/MenuItem'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { AccessDomain } from '@regardsoss/domain'
import { DropDownButton } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import SessionsMonitoringProductsStoredRenderer from '../../../../src/components/session/render/SessionsMonitoringProductsStoredRenderer'
import styles from '../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test SessionsMonitoringProductsStoredRenderer
 * @author Kévin Picart
 */
describe('[ADMIN DATA PROVIDER MANAGEMENT] Testing SessionsMonitoringProductsStoredRenderer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SessionsMonitoringProductsStoredRenderer)
  })

  function createEntity(lifeCycle = {}, state = AccessDomain.SESSION_STATUS_ENUM.OK) {
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
    testLabel: 'without option (no data)',
    entity: createEntity(),
    hasRelaunch: false,
    hasShowErrors: false,
    hasShowAIPs: false,
    isRunning: false,
    dependencies: [...SessionsMonitoringProductsStoredRenderer.RELAUNCH_DEPENCIES, ...SessionsMonitoringProductsStoredRenderer.REQUEST_LIST_DEPENDENCIES, ...SessionsMonitoringProductsStoredRenderer.AIP_LIST_DEPENDENCIES],
  }, {
    testLabel: 'without option (no dependencies)',
    entity: createEntity({
      oais: {
        products_gen_pending: 52,
        products_store_pending: 5,
        products_stored: 3,
        products_gen_error: 32,
        products_store_error: 1,
        products_meta_store_error: 8,
      },
    }),
    hasRelaunch: false,
    hasShowErrors: false,
    hasShowAIPs: false,
    isRunning: true,
    dependencies: [],
  }, {
    testLabel: 'with show error option',
    entity: createEntity({
      oais: {
        products_gen_pending: 1,
        products_store_pending: 0,
        products_stored: 0,
        products_gen_error: 1,
        products_store_error: 0,
        products_meta_store_error: 0,
      },
    }),
    hasRelaunch: false,
    hasShowErrors: true,
    hasShowAIPs: false,
    isRunning: true,
    dependencies: [...SessionsMonitoringProductsStoredRenderer.REQUEST_LIST_DEPENDENCIES],
  }, {
    testLabel: 'with relaunch option',
    entity: createEntity({
      oais: {
        products_gen_pending: 0,
        products_store_pending: 0,
        products_stored: 0,
        products_gen_error: 0,
        products_store_error: 5,
        products_meta_store_error: 0,
      },
    }),
    hasRelaunch: true,
    hasShowErrors: false,
    hasShowAIPs: false,
    isRunning: false,
    dependencies: [...SessionsMonitoringProductsStoredRenderer.RELAUNCH_DEPENCIES],
  }, {
    testLabel: 'with show AIP option',
    entity: createEntity({
      oais: {
        products_gen_pending: 0,
        products_store_pending: 0,
        products_stored: 3,
        products_gen_error: 0,
        products_store_error: 0,
        products_meta_store_error: 0,
      },
    }),
    hasRelaunch: false,
    hasShowErrors: false,
    hasShowAIPs: true,
    isRunning: false,
    dependencies: [...SessionsMonitoringProductsStoredRenderer.AIP_LIST_DEPENDENCIES],
  }, {
    testLabel: 'with all options',
    entity: createEntity({
      oais: {
        products_gen_pending: 0,
        products_store_pending: 99,
        products_stored: 0,
        products_gen_error: 0,
        products_store_error: 0,
        products_meta_store_error: 55,
      },
    }),
    hasRelaunch: true,
    hasShowErrors: true,
    hasShowAIPs: true,
    isRunning: true,
    dependencies: [...SessionsMonitoringProductsStoredRenderer.RELAUNCH_DEPENCIES, ...SessionsMonitoringProductsStoredRenderer.REQUEST_LIST_DEPENDENCIES, ...SessionsMonitoringProductsStoredRenderer.AIP_LIST_DEPENDENCIES],
  }]

  testCases.forEach(({
    testLabel, entity,
    hasRelaunch, hasShowErrors,
    hasShowAIPs, isRunning,
    dependencies,
  }) => it(`should render correctly ${testLabel}`, () => {
    const props = {
      entity,
      availableDependencies: dependencies,
      onRelaunchProductsOAIS: () => {},
      onViewProductsOAIS: () => {},
      onViewRequestsOAIS: () => {},
    }
    const enzymeWrapper = shallow(<SessionsMonitoringProductsStoredRenderer {...props} />, { context })
    // 1 - Check running state
    const runningIcon = enzymeWrapper.find(RunningIcon)
    if (isRunning) {
      assert.lengthOf(runningIcon, 1, 'There should be running icon')
    } else {
      assert.lengthOf(runningIcon, 0, 'Running icon should not be shown')
    }
    // 2 - Check options
    const dropDownMenu = enzymeWrapper.find(DropDownButton)
    if (hasRelaunch || hasShowErrors || hasShowAIPs) {
      // 2.a - Check menu then options in menu
      assert.lengthOf(dropDownMenu, 1, 'Menu should be shown')
      const menuItems = dropDownMenu.find(MenuItem)
      const instance = enzymeWrapper.instance()
      if (hasRelaunch) {
        assert.lengthOf(menuItems.findWhere((n) => n.props().onClick === instance.onClickRelaunch), 1, 'There should be relaunch option')
      } else {
        assert.lengthOf(menuItems.findWhere((n) => n.props().onClick === instance.onClickRelaunch), 0, 'There should not be relaunch option')
      }
      if (hasShowErrors) {
        assert.lengthOf(menuItems.findWhere((n) => n.props().onClick === instance.onClickListRequestErrors), 1, 'There should be show errors option')
      } else {
        assert.lengthOf(menuItems.findWhere((n) => n.props().onClick === instance.onClickListRequestErrors), 0, 'There should not be show errors option')
      }
      if (hasShowAIPs) {
        assert.lengthOf(menuItems.findWhere((n) => n.props().onClick === instance.onClickListAIP), 1, 'There should be show AIPs option')
      } else {
        assert.lengthOf(menuItems.findWhere((n) => n.props().onClick === instance.onClickListAIP), 0, 'There should not be show AIPs option')
      }
    } else {
      // 2.b - Check menu is not displayed
      assert.lengthOf(dropDownMenu, 0, 'Menu should not be shown')
    }
    // 3 - Check the right numbers are displayed
    const asText = enzymeWrapper.debug()
    if (!entity.content.lifeCycle.oais) {
      assert.include(asText, '-', 'Dash should be rendered instead of values')
      assert.notInclude(asText, '0', 'Null count should not be rendered')
    } else {
      assert.include(asText, get(entity, 'content.lifeCycle.oais.products_store_pending', 0), 'Pending count should be displayed')
      assert.include(asText, get(entity, 'content.lifeCycle.oais.products_stored', 0), 'Pending count should be displayed')
      assert.include(asText, get(entity, 'content.lifeCycle.oais.products_gen_error', 0)
      + get(entity, 'content.lifeCycle.oais.products_store_error', 0)
      + get(entity, 'content.lifeCycle.oais.products_meta_store_error', 0), 'Errors count should be displayed')
    }
  }))
})
