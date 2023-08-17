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
import { converter } from '@regardsoss/units'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { CriterionContainer } from '../../src/containers/CriterionContainer'
import CriterionComponent from '../../src/components/CriterionComponent'
import { OPTIONS_ENUM } from '../../src/domain/Options'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/**
 * Test case for {@link SampleCriteria}
 *
 * @author Raphaël Mechali
 * @author Théo Lasserre
 */
describe('[SNR-criterion] Testing CriterionContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)
  it('should exists', () => {
    assert.isDefined(CriterionContainer)
  })
  // define some test cases to avoid copying tests
  const tests = [{
    caseLabel: 'while resolving spatial object name',
    snrState: {
      error: false,
      spatialName: 'any',
      resolvedCoordinates: null,
    },
  }, {
    caseLabel: 'with resolution error',
    snrState: {
      error: true,
      spatialName: 'any',
      resolvedCoordinates: null,
    },
  }, {
    caseLabel: 'with resolved spatial name coordinates',
    snrState: {
      error: false,
      spatialName: 'any',
      resolvedCoordinates: {
        latitude: 45.5,
        longitude: 21.2,
      },
    },
  }]

  tests.forEach(({ caseLabel, snrState }) => it(`should render correctly ${caseLabel}`, () => {
    const props = {
      // parent callbacks (required)
      pluginInstanceId: 'any',
      label: {
        fr: 'test',
        en: 'test',
      },
      state: {
        spatialName: 'any1',
        coneAngle: '5.2',
        resolved: null,
        rightAscension: '',
        declinaison: '',
        optionSelected: OPTIONS_ENUM.SNR,
        unitSelected: converter.UNITS_ENUM.DEG,
      },
      snrState,
      attributes: {},
      publishState: () => {},
      resolveSpatialName: () => {},
    }
    const enzymeWrapper = shallow(<CriterionContainer {...props} />, { context })
    const component = enzymeWrapper.find(CriterionComponent)
    assert.lengthOf(component, 1, 'There should be the component')
    testSuiteHelpers.assertWrapperProperties(component, {
      label: props.label,
      spatialName: props.state.spatialName,
      onSpatialNameInput: enzymeWrapper.instance().onSpatialNameInput,
      angle: props.state.coneAngle,
      onAngleInput: enzymeWrapper.instance().onAngleInput,
      invalidSNR: props.snrState.error,
      rightAscension: props.state.rightAscension,
      declinaison: props.state.declinaison,
      onRightAscensionInput: enzymeWrapper.instance().onRightAscensionInput,
      onDeclinaisonInput: enzymeWrapper.instance().onDeclinaisonInput,
      optionSelected: props.state.optionSelected,
      onChangeOption: enzymeWrapper.instance().onChangeOption,
      unitSelected: props.state.unitSelected,
      onChangeUnit: enzymeWrapper.instance().onChangeUnit,
    }, 'Component properties should be correctly set')
  }))

  it('should detect resolution state changes to update resolved coordinates', () => {
    let spiedPublishedState = null
    const props = {
      // parent callbacks (required)
      pluginInstanceId: 'any',
      label: {
        fr: 'test',
        en: 'test',
      },
      state: {
        spatialName: 'any1',
        coneAngle: '5.2',
        resolved: null,
        rightAscension: '',
        declinaison: '',
        optionSelected: OPTIONS_ENUM.SNR,
        unitSelected: converter.UNITS_ENUM.DEG,
      },
      snrState: {
        error: false,
        spatialName: 'any',
        resolvedCoordinates: null,
      },
      attributes: {},
      publishState: (publishedState) => {
        spiedPublishedState = publishedState
      },
      resolveSpatialName: () => {},
    }
    const enzymeWrapper = shallow(<CriterionContainer {...props} />, { context })
    assert.isNotOk(spiedPublishedState, 'State should not be initially published')
    enzymeWrapper.setProps({
      ...props,
      snrState: {
        error: false,
        resolvedCoordinates: { latitude: 12, longitude: 12 },
      },
    })
    assert.isOk(spiedPublishedState, '1  - State should have been published and query parameters updated')
    assert.deepEqual(spiedPublishedState.resolved, { latitude: 12, longitude: 12 }, '2 - Resolved coordinates should be available')
  })
  it('should request spatial object name resolution on user input', () => {
    let spiedPublishedState = null
    const props = {
      // parent callbacks (required)
      pluginInstanceId: 'any',
      label: {
        fr: 'test',
        en: 'test',
      },
      state: {
        spatialName: 'any',
        coneAngle: '5.2',
        resolved: { latitude: 12, longitude: 12 },
        rightAscension: '',
        declinaison: '',
        optionSelected: OPTIONS_ENUM.SNR,
        unitSelected: converter.UNITS_ENUM.DEG,
      },
      snrState: {
        error: false,
        spatialName: 'any',
        resolvedCoordinates: { latitude: 12, longitude: 12 },
      },
      attributes: {},
      publishState: (state) => {
        spiedPublishedState = state
      },
      resolveSpatialName: () => {},
    }
    const enzymeWrapper = shallow(<CriterionContainer {...props} />, { context })
    assert.isNotOk(spiedPublishedState)

    enzymeWrapper.instance().onSpatialNameInput(null, 'someinput')
    assert.deepEqual(spiedPublishedState, {
      spatialName: 'someinput',
      coneAngle: '5.2',
      resolved: null,
      error: true,
      rightAscension: '',
      declinaison: '',
      optionSelected: OPTIONS_ENUM.SNR,
      unitSelected: converter.UNITS_ENUM.DEG,
    },
    'Previously resolved coordinates should have been reset in state')
  })
  it('should publish state on cone angle change but leave the spatial name related fields unchanged', () => {
    let spiedPublishedState = null
    const props = {
      // parent callbacks (required)
      pluginInstanceId: 'any',
      label: {
        fr: 'test',
        en: 'test',
      },
      state: {
        spatialName: 'any',
        coneAngle: '5.2',
        resolved: { latitude: 12, longitude: 12 },
        rightAscension: '',
        declinaison: '',
        error: true,
        optionSelected: OPTIONS_ENUM.SNR,
        unitSelected: converter.UNITS_ENUM.DEG,
      },
      snrState: {
        error: false,
        spatialName: 'any',
        resolvedCoordinates: { latitude: 12, longitude: 12 },
      },
      attributes: {},
      publishState: (state) => {
        spiedPublishedState = state
      },
      resolveSpatialName: () => {},
    }
    const enzymeWrapper = shallow(<CriterionContainer {...props} />, { context })
    assert.isNotOk(spiedPublishedState)

    enzymeWrapper.instance().onAngleInput(null, '36.15')
    assert.deepEqual(spiedPublishedState, {
      spatialName: 'any',
      coneAngle: '36.15',
      resolved: { latitude: 12, longitude: 12 },
      rightAscension: '',
      error: false,
      declinaison: '',
      optionSelected: OPTIONS_ENUM.SNR,
      unitSelected: converter.UNITS_ENUM.DEG,
    },
    'Only cone angle should be updated in state')
  })
  it('should publish state on option change but leave other fields unchanged', () => {
    let spiedPublishedState = null
    const props = {
      // parent callbacks (required)
      pluginInstanceId: 'any',
      label: {
        fr: 'test',
        en: 'test',
      },
      state: {
        spatialName: 'any',
        coneAngle: '5.2',
        resolved: { latitude: 12, longitude: 12 },
        rightAscension: '',
        declinaison: '',
        error: true,
        optionSelected: OPTIONS_ENUM.SNR,
        unitSelected: converter.UNITS_ENUM.DEG,
      },
      snrState: {
        error: false,
        spatialName: 'any',
        resolvedCoordinates: { latitude: 12, longitude: 12 },
      },
      attributes: {},
      publishState: (state) => {
        spiedPublishedState = state
      },
      resolveSpatialName: () => {},
    }
    const enzymeWrapper = shallow(<CriterionContainer {...props} />, { context })
    assert.isNotOk(spiedPublishedState)

    enzymeWrapper.instance().onChangeOption(null, OPTIONS_ENUM.DIRECT_VALUES)
    assert.deepEqual(spiedPublishedState, {
      spatialName: 'any',
      coneAngle: '5.2',
      resolved: { latitude: 12, longitude: 12 },
      rightAscension: '',
      error: true,
      declinaison: '',
      optionSelected: OPTIONS_ENUM.DIRECT_VALUES,
      unitSelected: converter.UNITS_ENUM.DEG,
    },
    'Only optionSelected should be updated in state')
  })
  it('should publish state on right ascension change but leave other fields unchanged', () => {
    let spiedPublishedState = null
    const props = {
      // parent callbacks (required)
      pluginInstanceId: 'any',
      label: {
        fr: 'test',
        en: 'test',
      },
      state: {
        spatialName: 'any',
        coneAngle: '5.2',
        resolved: { latitude: 12, longitude: 12 },
        rightAscension: '',
        declinaison: '',
        error: true,
        optionSelected: OPTIONS_ENUM.DIRECT_VALUES,
        unitSelected: converter.UNITS_ENUM.DEG,
      },
      snrState: {
        error: false,
        spatialName: 'any',
        resolvedCoordinates: { latitude: 12, longitude: 12 },
      },
      attributes: {},
      publishState: (state) => {
        spiedPublishedState = state
      },
      resolveSpatialName: () => {},
    }
    const enzymeWrapper = shallow(<CriterionContainer {...props} />, { context })
    assert.isNotOk(spiedPublishedState)

    enzymeWrapper.instance().onRightAscensionInput(null, '5')
    assert.deepEqual(spiedPublishedState, {
      spatialName: 'any',
      coneAngle: '5.2',
      resolved: { latitude: 12, longitude: 12 },
      rightAscension: '5',
      error: true,
      declinaison: '',
      optionSelected: OPTIONS_ENUM.DIRECT_VALUES,
      unitSelected: converter.UNITS_ENUM.DEG,
    },
    'Only rightAscension should be updated in state')
  })
  it('should publish state on declinaison change but leave other fields unchanged', () => {
    let spiedPublishedState = null
    const props = {
      // parent callbacks (required)
      pluginInstanceId: 'any',
      label: {
        fr: 'test',
        en: 'test',
      },
      state: {
        spatialName: 'any',
        coneAngle: '5.2',
        resolved: { latitude: 12, longitude: 12 },
        rightAscension: '5',
        declinaison: '',
        error: true,
        optionSelected: OPTIONS_ENUM.DIRECT_VALUES,
        unitSelected: converter.UNITS_ENUM.DEG,
      },
      snrState: {
        error: false,
        spatialName: 'any',
        resolvedCoordinates: { latitude: 12, longitude: 12 },
      },
      attributes: {},
      publishState: (state) => {
        spiedPublishedState = state
      },
      resolveSpatialName: () => {},
    }
    const enzymeWrapper = shallow(<CriterionContainer {...props} />, { context })
    assert.isNotOk(spiedPublishedState)

    enzymeWrapper.instance().onDeclinaisonInput(null, '42')
    assert.deepEqual(spiedPublishedState, {
      spatialName: 'any',
      coneAngle: '5.2',
      resolved: { latitude: 12, longitude: 12 },
      rightAscension: '5',
      error: false,
      declinaison: '42',
      optionSelected: OPTIONS_ENUM.DIRECT_VALUES,
      unitSelected: converter.UNITS_ENUM.DEG,
    },
    'Only rightAscension should be updated in state')
  })
  it('should publish state on unit change but leave other fields unchanged', () => {
    let spiedPublishedState = null
    const props = {
      // parent callbacks (required)
      pluginInstanceId: 'any',
      label: {
        fr: 'test',
        en: 'test',
      },
      state: {
        spatialName: 'any',
        coneAngle: '5.2',
        resolved: { latitude: 12, longitude: 12 },
        rightAscension: '5',
        declinaison: '',
        error: true,
        optionSelected: OPTIONS_ENUM.DIRECT_VALUES,
        unitSelected: converter.UNITS_ENUM.DEG,
      },
      snrState: {
        error: false,
        spatialName: 'any',
        resolvedCoordinates: { latitude: 12, longitude: 12 },
      },
      attributes: {},
      publishState: (state) => {
        spiedPublishedState = state
      },
      resolveSpatialName: () => {},
    }
    const enzymeWrapper = shallow(<CriterionContainer {...props} />, { context })
    assert.isNotOk(spiedPublishedState)

    enzymeWrapper.instance().onChangeUnit(null, converter.UNITS_ENUM.RAD)
    assert.deepEqual(spiedPublishedState, {
      spatialName: 'any',
      coneAngle: '5.2',
      resolved: { latitude: 12, longitude: 12 },
      rightAscension: '5',
      error: true,
      declinaison: '',
      optionSelected: OPTIONS_ENUM.DIRECT_VALUES,
      unitSelected: converter.UNITS_ENUM.RAD,
    },
    'Only unitSelected should be updated in state')
  })
  it('should convert correctly to open search parameters', () => {
    // Not convertable: wrong angles or no resolved coordinates with SNR option
    assert.isEmpty(CriterionContainer.convertToRequestParameters({
      spatialName: 'm21',
      coneAngle: '0.6',
      resolved: null,
      error: false,
      rightAscension: '',
      declinaison: '',
      optionSelected: OPTIONS_ENUM.SNR,
      unitSelected: converter.UNITS_ENUM.DEG,
    }),
    'State without resolved coordinates should not be converted into request parameters')
    assert.isEmpty(CriterionContainer.convertToRequestParameters({
      spatialName: null,
      coneAngle: '0.6',
      resolved: { latitude: 0, longitude: 35 },
      rightAscension: '',
      error: true,
      declinaison: '',
      optionSelected: OPTIONS_ENUM.SNR,
      unitSelected: converter.UNITS_ENUM.DEG,
    }),
    'State without spatial name should not be converted into request parameters')
    assert.isEmpty(CriterionContainer.convertToRequestParameters({
      spatialName: 'm21',
      coneAngle: null,
      error: true,
      resolved: { latitude: 0, longitude: 35 },
      rightAscension: '',
      declinaison: '',
      optionSelected: OPTIONS_ENUM.SNR,
      unitSelected: converter.UNITS_ENUM.DEG,
    }),
    'State without cone angle should not be converted into request parameters')
    assert.isEmpty(CriterionContainer.convertToRequestParameters({
      spatialName: 'm21',
      coneAngle: 'a25',
      error: true,
      resolved: { latitude: 0, longitude: 35 },
      rightAscension: '',
      declinaison: '',
      optionSelected: OPTIONS_ENUM.SNR,
      unitSelected: converter.UNITS_ENUM.DEG,
    }),
    'State with an invalid cone angle should not be converted into request parameters (not parsable)')
    assert.isEmpty(CriterionContainer.convertToRequestParameters({
      spatialName: 'm21',
      coneAngle: '0',
      error: true,
      resolved: { latitude: 0, longitude: 35 },
      rightAscension: '',
      declinaison: '',
      optionSelected: OPTIONS_ENUM.SNR,
      unitSelected: converter.UNITS_ENUM.DEG,
    }),
    'State with an invalid cone angle should not be converted into request parameters (<= 0)')
    assert.isEmpty(CriterionContainer.convertToRequestParameters({
      spatialName: 'm21',
      coneAngle: '181',
      error: true,
      resolved: { latitude: 0, longitude: 35 },
      rightAscension: '',
      declinaison: '',
      optionSelected: OPTIONS_ENUM.SNR,
      unitSelected: converter.UNITS_ENUM.DEG,
    }),
    'State with an invalid cone angle should not be converted into request parameters (>= 180)')
    // Convertable state with SNR option
    assert.deepEqual(CriterionContainer.convertToRequestParameters({
      spatialName: 'm21',
      coneAngle: '0.6',
      resolved: { latitude: 5, longitude: 10 },
      error: false,
      rightAscension: '',
      declinaison: '',
      optionSelected: OPTIONS_ENUM.SNR,
      unitSelected: converter.UNITS_ENUM.DEG,
    }), {
      lat: '5',
      lon: '10',
      r: '0.3', // half angle
    })
    // Not convertable: wrong right ascension or wrong declinaison with DIRECT_VALUES option
    assert.isEmpty(CriterionContainer.convertToRequestParameters({
      spatialName: 'm21',
      coneAngle: '0.6',
      resolved: null,
      error: true,
      rightAscension: '-5',
      declinaison: '',
      optionSelected: OPTIONS_ENUM.DIRECT_VALUES,
      unitSelected: converter.UNITS_ENUM.DEG,
    }),
    'State with a wrong right ascension should not be converted into request parameters (< 0)')
    assert.isEmpty(CriterionContainer.convertToRequestParameters({
      spatialName: 'm21',
      coneAngle: '0.6',
      resolved: null,
      error: true,
      rightAscension: '366',
      declinaison: '',
      optionSelected: OPTIONS_ENUM.DIRECT_VALUES,
      unitSelected: converter.UNITS_ENUM.DEG,
    }),
    'State with a wrong right ascension should not be converted into request parameters (> 360)')
    assert.isEmpty(CriterionContainer.convertToRequestParameters({
      spatialName: 'm21',
      coneAngle: '0.6',
      resolved: null,
      error: true,
      rightAscension: '',
      declinaison: '-788',
      optionSelected: OPTIONS_ENUM.DIRECT_VALUES,
      unitSelected: converter.UNITS_ENUM.DEG,
    }),
    'State with a wrong declinaison should not be converted into request parameters (< -90)')
    assert.isEmpty(CriterionContainer.convertToRequestParameters({
      spatialName: 'm21',
      coneAngle: '0.6',
      resolved: null,
      error: true,
      rightAscension: '',
      declinaison: '1002',
      optionSelected: OPTIONS_ENUM.DIRECT_VALUES,
      unitSelected: converter.UNITS_ENUM.DEG,
    }),
    'State with a wrong declinaison should not be converted into request parameters (> 90)')
    assert.isEmpty(CriterionContainer.convertToRequestParameters({
      spatialName: 'm21',
      coneAngle: '0.6',
      resolved: null,
      error: true,
      rightAscension: '4',
      declinaison: '',
      optionSelected: OPTIONS_ENUM.DIRECT_VALUES,
      unitSelected: converter.UNITS_ENUM.DEG,
    }),
    'State with a valid right ascension and an empty declinaison should not be converted into request parameters')
    assert.isEmpty(CriterionContainer.convertToRequestParameters({
      spatialName: 'm21',
      coneAngle: '0.6',
      resolved: null,
      error: true,
      rightAscension: '',
      declinaison: '66',
      optionSelected: OPTIONS_ENUM.DIRECT_VALUES,
      unitSelected: converter.UNITS_ENUM.DEG,
    }),
    'State with a valid declaison and an empty rigth ascension should not be converted into request parameters')
    // Convertable state with DIRECT_VALUES option
    assert.deepEqual(CriterionContainer.convertToRequestParameters({
      spatialName: 'm21',
      coneAngle: '0.6',
      resolved: { latitude: 5, longitude: 10 },
      error: false,
      rightAscension: '5',
      declinaison: '46',
      optionSelected: OPTIONS_ENUM.DIRECT_VALUES,
      unitSelected: converter.UNITS_ENUM.DEG,
    }), {
      lat: '46',
      lon: '5',
      r: '0.3', // half angle
    })
  })
})
