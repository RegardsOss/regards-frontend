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
import { assert } from 'chai'
import { shallow } from 'enzyme'
import { UIDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { GeoZoneContainer } from '../../src/containers/GeoZoneContainer'
import GeoZoneComponent from '../../src/components/GeoZoneComponent'
import { FIELDS_ENUM } from '../../src/domain/Fields'
import { SEARCH_MODES_ENUM } from '../../src/domain/SearchMode'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/**
 * Test GeoZoneContainer
 *
 * @author Théo Lasserre
 */
describe('[Geo zone criterion] Testing GeoZoneContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)
  it('should exists', () => {
    assert.isDefined(GeoZoneContainer)
  })
  it('should render correctly without initial state', () => {
    const props = {
      label: {
        [UIDomain.LOCALES_ENUM.en]: 'Label1',
        [UIDomain.LOCALES_ENUM.fr]: 'Libellé1',
      },
      publishState: () => {},
      dispatchValidateGeo: () => {},
    }
    const enzymeWrapper = shallow(<GeoZoneContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(GeoZoneComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      label: props.label,
      lonMin: GeoZoneContainer.DEFAULT_STATE[FIELDS_ENUM.LON_MIN],
      lonMax: GeoZoneContainer.DEFAULT_STATE[FIELDS_ENUM.LON_MAX],
      latMin: GeoZoneContainer.DEFAULT_STATE[FIELDS_ENUM.LAT_MIN],
      latMax: GeoZoneContainer.DEFAULT_STATE[FIELDS_ENUM.LAT_MAX],
      onSelectMode: enzymeWrapper.instance().onSelectMode,
      searchMode: GeoZoneContainer.DEFAULT_STATE.searchMode,
      onTextInput: enzymeWrapper.instance().onTextInput,
    }, 'Component properties should be correctly reported (from default state)')
  })
  it('should render self and sub components with initial state, publishing state and parameters on updates', () => {
    const spiedPublishState = {}
    const props = {
      label: {
        [UIDomain.LOCALES_ENUM.en]: 'Label1',
        [UIDomain.LOCALES_ENUM.fr]: 'Libellé1',
      },
      publishState: (nextState, nextParameters) => {
        spiedPublishState.nextState = nextState
        spiedPublishState.nextParameters = nextParameters
      },
      state: {
        [FIELDS_ENUM.LON_MIN]: '',
        [FIELDS_ENUM.LON_MAX]: '45.049161325625775',
        [FIELDS_ENUM.LAT_MIN]: '1.9591403285917248',
        [FIELDS_ENUM.LAT_MAX]: '5.81275237864844',
        searchMode: SEARCH_MODES_ENUM.CONTAINS,
        error: false,
      },
      dispatchValidateGeo: () => {},
    }
    const enzymeWrapper = shallow(<GeoZoneContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(GeoZoneComponent)
    assert.lengthOf(componentWrapper, 1, '0 - There should be the component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      label: props.label,
      lonMin: props.state[FIELDS_ENUM.LON_MIN],
      lonMax: props.state[FIELDS_ENUM.LON_MAX],
      latMin: props.state[FIELDS_ENUM.LAT_MIN],
      latMax: props.state[FIELDS_ENUM.LAT_MAX],
      onSelectMode: enzymeWrapper.instance().onSelectMode,
      searchMode: props.state.searchMode,
      onTextInput: enzymeWrapper.instance().onTextInput,
    }, 'Component properties should be correctly reported (from initial state)')
    // 1 - toggle off and check no request is built
    enzymeWrapper.instance().onTextInput('43.269292062599305', FIELDS_ENUM.LON_MIN)
    assert.deepEqual(spiedPublishState.nextState, {
      [FIELDS_ENUM.LON_MIN]: '43.269292062599305',
      [FIELDS_ENUM.LON_MAX]: '45.049161325625775',
      [FIELDS_ENUM.LAT_MIN]: '1.9591403285917248',
      [FIELDS_ENUM.LAT_MAX]: '5.81275237864844',
      searchMode: SEARCH_MODES_ENUM.CONTAINS,
      error: false,
    }, '1 - lonMin text state should be 43.269292062599305')
  })
})
