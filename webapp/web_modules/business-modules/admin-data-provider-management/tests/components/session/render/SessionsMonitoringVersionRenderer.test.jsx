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
import isNil from 'lodash/isNil'
import MenuItem from 'material-ui/MenuItem'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { AccessDomain } from '@regardsoss/domain'
import { DropDownButton } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import SessionsMonitoringVersionRenderer from '../../../../src/components/session/render/SessionsMonitoringVersionRenderer'
import styles from '../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test SessionsMonitoringVersionRenderer
 * @author Raphaël Mechali
 */
describe('[ADMIN DATA PROVIDER MANAGEMENT] Testing SessionsMonitoringVersionRenderer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SessionsMonitoringVersionRenderer)
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
    testLabel: 'no data (without option)',
    entity: createEntity(),
    expected: {
      newVersions: null,
      replaced: null,
      ignored: null,
      waiting: null,
    },
    hasShowIgnored: false,
    hasShowWaiting: false,
    dependencies: SessionsMonitoringVersionRenderer.VIEW_REQUESTS_DEPENDENCIES,
  }, {
    testLabel: 'without option (no dependency)',
    entity: createEntity({
      oais: {
        products_ignored: 5,
        products_waiting_versioning_mode: 18,
        products_replaced: 12,
        new_product_versions: 3,
      },
    }),
    expected: {
      newVersions: 3,
      replaced: 12,
      ignored: 5,
      waiting: 18,
    },
    hasShowIgnored: false,
    hasShowWaiting: false,
    dependencies: [],
  }, {
    testLabel: 'with show waiting option (no ignored)',
    entity: createEntity({
      oais: {
        products_ignored: 0,
        products_waiting_versioning_mode: 2,
        products_replaced: 25,
        new_product_versions: 0,
      },
    }),
    expected: {
      newVersions: 0,
      replaced: 25,
      ignored: 0,
      waiting: 2,
    },
    hasShowIgnored: false,
    hasShowWaiting: true,
    dependencies: SessionsMonitoringVersionRenderer.VIEW_REQUESTS_DEPENDENCIES,
  }, {
    testLabel: 'with show waiting ignore (no waiting)',
    entity: createEntity({
      oais: {
        products_ignored: 6,
        products_waiting_versioning_mode: 0,
        products_replaced: 0,
        new_product_versions: 12,
      },
    }),
    expected: {
      newVersions: 12,
      replaced: 0,
      ignored: 6,
      waiting: 0,
    },
    hasShowIgnored: true,
    hasShowWaiting: false,
    dependencies: SessionsMonitoringVersionRenderer.VIEW_REQUESTS_DEPENDENCIES,
  }, {
    testLabel: 'with all options',
    entity: createEntity({
      oais: {
        products_ignored: 6,
        products_waiting_versioning_mode: 3,
        products_replaced: 1,
        new_product_versions: 12,
      },
    }),
    expected: {
      newVersions: 12,
      replaced: 1,
      ignored: 6,
      waiting: 3,
    },
    hasShowIgnored: true,
    hasShowWaiting: true,
    dependencies: SessionsMonitoringVersionRenderer.VIEW_REQUESTS_DEPENDENCIES,
  }]

  testCases.forEach(({
    testLabel, entity,
    expected, hasShowIgnored, hasShowWaiting,
    dependencies,
  }) => it(`should render correctly ${testLabel}`, () => {
    const props = {
      entity,
      availableDependencies: dependencies,
      onRelaunchProductsOAIS: () => {},
      onViewProductsOAIS: () => {},
      onViewRequestsOAIS: () => {},
    }
    const enzymeWrapper = shallow(<SessionsMonitoringVersionRenderer {...props} />, { context })
    // 1 - Check each row is hidden / displayed according with test expectations (title and numeric cell)
    const dataRows = [{
      label: 'new versions',
      cellTooltip: 'acquisition-sessions.states.new.version.tooltip',
      expectedCellValue: expected.newVersions,
    }, {
      label: 'replaced',
      cellTooltip: 'acquisition-sessions.states.replaced.tooltip',
      expectedCellValue: expected.replaced,
    }, {
      label: 'ignored',
      cellTooltip: 'acquisition-sessions.states.ignored.tooltip',
      expectedCellValue: expected.ignored,
    }, {
      label: 'waiting',
      cellTooltip: 'acquisition-sessions.states.waiting.tooltip',
      expectedCellValue: expected.waiting,
    }]

    dataRows.forEach((dataRow) => {
      if (isNil(dataRow.expectedCellValue)) {
        // No data: expected title and cell hidden
        assert.lengthOf(enzymeWrapper.findWhere((n) => n.props().title === dataRow.cellTooltip), 0, `${dataRow.label} content should be hidden`)
      } else {
        // Data: both title and numeric content should be shown (nota: waiting tooltip is also set on cell title, hence we expect 2 or 3 elements)
        const cellParts = enzymeWrapper.findWhere((n) => n.props().title === dataRow.cellTooltip)
        assert.isTrue(cellParts.length === 2 || cellParts.length === 3, `Title and content cells should be found for ${dataRow.label}`)
        // nota: text is handled by enzyme as a cell
        assert.lengthOf(cellParts.findWhere((c) => c.debug() === dataRow.expectedCellValue.toString()), 1, `Numeric content should be found in content cell only for ${dataRow.label} cell`)
      }
    })

    // 2 - Check options
    const dropDownMenu = enzymeWrapper.find(DropDownButton)
    if (hasShowIgnored || hasShowWaiting) {
      assert.lengthOf(dropDownMenu, 1, 'Menu should be shown')
      const menuItems = dropDownMenu.find(MenuItem)
      const instance = enzymeWrapper.instance()
      if (hasShowIgnored) {
        assert.lengthOf(menuItems.findWhere((n) => n.props().onClick === instance.onViewIgnoredRequests), 1, 'View ignored request option should be shown')
      } else {
        assert.lengthOf(menuItems.findWhere((n) => n.props().onClick === instance.onViewIgnoredRequests), 0, 'View ignored request option should be hidden')
      }
      if (hasShowWaiting) {
        assert.lengthOf(menuItems.findWhere((n) => n.props().onClick === instance.onViewWaitingRequests), 1, 'View waiting request option should be shown')
      } else {
        assert.lengthOf(menuItems.findWhere((n) => n.props().onClick === instance.onViewWaitingRequests), 0, 'View waiting request option should be hidden')
      }
    } else {
      assert.lengthOf(dropDownMenu, 0, 'Menu should not be shown')
    }
  }))
})
