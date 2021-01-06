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
import RunningIcon from 'mdi-material-ui/Play'
import MenuItem from 'material-ui/MenuItem'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { AccessDomain } from '@regardsoss/domain'
import { DropDownButton } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import SessionsMonitoringProductsGeneratedRenderer from '../../../../src/components/session/render/SessionsMonitoringProductsGeneratedRenderer'
import styles from '../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test SessionsMonitoringProductsGeneratedRenderer
 * @author Kévin Picart
 */
describe('[ADMIN DATA PROVIDER MANAGEMENT] Testing SessionsMonitoringProductsGeneratedRenderer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SessionsMonitoringProductsGeneratedRenderer)
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
    testLabel: 'without option',
    entity: createEntity(),
    hasRelaunch: false,
    hasShowErrors: false,
    hasShowInvalids: false,
    hasShowIncomplete: false,
    isRunning: false,
    dependencies: [],
  }, {
    testLabel: 'with show error',
    entity: createEntity({
      dataprovider: {
        invalid: 0,
        generation_error: 5,
        incomplete: 0,
        generated: 20,
        ingested: 8,
        ingestion_failed: 2,
        files_acquired: 15,
        state: 'RUNNING',
      },
    }, AccessDomain.SESSION_STATUS_ENUM.ERROR),
    hasRelaunch: false,
    hasShowErrors: true,
    hasShowInvalids: false,
    hasShowIncomplete: false,
    isRunning: true,
    dependencies: [],
  }, {
    testLabel: 'with show error and relaunch',
    entity: createEntity({
      dataprovider: {
        invalid: 0,
        generation_error: 5,
        incomplete: 0,
        generated: 20,
        ingested: 8,
        ingestion_failed: 2,
        files_acquired: 15,
      },
    }, AccessDomain.SESSION_STATUS_ENUM.ERROR),
    hasRelaunch: true,
    hasShowErrors: true,
    hasShowInvalids: false,
    hasShowIncomplete: false,
    isRunning: false,
    dependencies: SessionsMonitoringProductsGeneratedRenderer.RELAUNCH_DEPENCIES,
  }, {
    testLabel: 'with show invalid option',
    entity: createEntity({
      dataprovider: {
        invalid: 8,
        generation_error: 0,
        incomplete: 0,
        generated: 20,
        ingested: 14,
        ingestion_failed: 2,
        files_acquired: 64,
        state: 'any',
      },
    }),
    hasRelaunch: false,
    hasShowErrors: false,
    hasShowInvalids: true,
    hasShowIncomplete: false,
    isRunning: false,
    dependencies: SessionsMonitoringProductsGeneratedRenderer.RELAUNCH_DEPENCIES,
  }, {
    testLabel: 'with show incomplete option',
    entity: createEntity({
      dataprovider: {
        invalid: 0,
        generation_error: 0,
        incomplete: 4,
        generated: 20,
        ingested: 14,
        ingestion_failed: 2,
        files_acquired: 64,
        state: 'any',
      },
    }),
    hasRelaunch: false,
    hasShowErrors: false,
    hasShowInvalids: false,
    hasShowIncomplete: true,
    isRunning: false,
    dependencies: [],
  }, {
    testLabel: 'with all options',
    entity: createEntity({
      dataprovider: {
        invalid: 56,
        generation_error: 33,
        incomplete: 3,
        generated: 25,
        ingested: 14,
        ingestion_failed: 0,
        files_acquired: 64,
        state: 'RUNNING',
      },
    }),
    hasRelaunch: true,
    hasShowErrors: true,
    hasShowInvalids: true,
    hasShowIncomplete: true,
    isRunning: true,
    dependencies: SessionsMonitoringProductsGeneratedRenderer.RELAUNCH_DEPENCIES,
  }]

  testCases.forEach(({
    testLabel, entity,
    hasRelaunch, hasShowErrors,
    hasShowInvalids, hasShowIncomplete,
    isRunning, dependencies,
  }) => it(`should render correctly ${testLabel}`, () => {
    const props = {
      entity,
      availableDependencies: dependencies,
      onDeleteProducts: () => {},
      onRelaunchProducts: () => {},
      onShowProducts: () => {},
    }
    const enzymeWrapper = shallow(<SessionsMonitoringProductsGeneratedRenderer {...props} />, { context })
    // 1 - Check running state
    const runningIcon = enzymeWrapper.find(RunningIcon)
    if (isRunning) {
      assert.lengthOf(runningIcon, 1, 'There should be running icon')
    } else {
      assert.lengthOf(runningIcon, 0, 'Running icon should not be shown')
    }
    // 2 - Check options
    const dropDownMenu = enzymeWrapper.find(DropDownButton)
    if (hasRelaunch || hasShowErrors || hasShowInvalids || hasShowIncomplete) {
      // 2.a - Check menu then options in menu
      assert.lengthOf(dropDownMenu, 1, 'Menu should be shown')
      const menuItems = dropDownMenu.find(MenuItem)
      const instance = enzymeWrapper.instance()
      if (hasRelaunch) {
        assert.lengthOf(menuItems.findWhere((n) => n.props().onClick === instance.onClickRelaunchProducts), 1, 'There should be relaunch option')
      } else {
        assert.lengthOf(menuItems.findWhere((n) => n.props().onClick === instance.onClickRelaunchProducts), 0, 'There should not be relaunch option')
      }
      if (hasShowErrors) {
        assert.lengthOf(menuItems.findWhere((n) => n.props().onClick === instance.onShowErrors), 1, 'There should be show errors option')
      } else {
        assert.lengthOf(menuItems.findWhere((n) => n.props().onClick === instance.onShowErrors), 0, 'There should not be show errors option')
      }
      if (hasShowInvalids) {
        assert.lengthOf(menuItems.findWhere((n) => n.props().onClick === instance.onShowInvalids), 1, 'There should be show invalids option')
      } else {
        assert.lengthOf(menuItems.findWhere((n) => n.props().onClick === instance.onShowInvalids), 0, 'There should not be show invalids option')
      }
      if (hasShowIncomplete) {
        assert.lengthOf(menuItems.findWhere((n) => n.props().onClick === instance.onShowIncompletes), 1, 'There should be show incompletes option')
      } else {
        assert.lengthOf(menuItems.findWhere((n) => n.props().onClick === instance.onShowIncompletes), 0, 'There should not be show incomletes option')
      }
    } else {
      // 2.b - Check menu is not displayed
      assert.lengthOf(dropDownMenu, 0, 'Menu should not be shown')
    }
    // 3 - Check the right numbers are displayed
    const asText = enzymeWrapper.debug()
    if (!entity.content.lifeCycle.dataprovider) {
      assert.include(asText, '-', 'Dash should be rendered instead of values')
      assert.notInclude(asText, '0', 'Null count should not be rendered')
    } else {
      assert.include(asText, get(entity, 'content.lifeCycle.dataprovider.files_acquired', 0), 'Acquired count should be displayed')
      assert.include(asText, get(entity,
        'content.lifeCycle.dataprovider.generated', 0) + get(entity, 'content.lifeCycle.dataprovider.ingested', 0) + get(entity, 'content.lifeCycle.dataprovider.ingestion_failed', 0),
      'Generated count should be displayed')
      assert.include(asText, get(entity, 'content.lifeCycle.dataprovider.incomplete', 0), 'Incompletes count should be displayed')
      assert.include(asText, get(entity, 'content.lifeCycle.dataprovider.invalid', 0), 'Invalids count should be displayed')
      assert.include(asText, get(entity, 'content.lifeCycle.dataprovider.generation_error', 0), 'Errors count should be displayed')
    }
  }))
})
