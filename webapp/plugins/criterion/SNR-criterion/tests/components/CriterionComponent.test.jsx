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
import { RadioButtonGroup } from 'material-ui/RadioButton'
import TextField from 'material-ui/TextField'
import { converter } from '@regardsoss/units'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import CriterionComponent from '../../src/components/CriterionComponent'
import { OPTIONS_ENUM } from '../../src/domain/Options'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Test CriterionComponent
 * @author Raphaël Mechali
 * @author Théo Lasserre
 */
describe('[SNR-criterion] Testing CriterionComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(CriterionComponent)
  })
  it('should render correctly in nominal case', () => {
    const props = {
      label: {
        fr: 'test',
        en: 'test',
      },
      spatialName: 'any',
      onSpatialNameInput: () => {},
      angle: '25',
      onAngleInput: () => {},
      invalidSNR: false,
      rightAscension: '',
      declinaison: '',
      onRightAscensionInput: () => {},
      onDeclinaisonInput: () => {},
      optionSelected: OPTIONS_ENUM.SNR,
      onChangeOption: () => {},
      unitSelected: converter.UNITS_ENUM.DEG,
      onChangeUnit: () => {},
    }
    const enzymeWrapper = shallow(<CriterionComponent {...props} />, { context })
    const radioGroupWrapper = enzymeWrapper.find(RadioButtonGroup)
    assert.lengthOf(radioGroupWrapper, 2, 'There should be two RadioButtonGroup')
    const textfieldWrappers = enzymeWrapper.find(TextField)
    assert.lengthOf(textfieldWrappers, 2, 'There should be two field (name and angle)')
    testSuiteHelpers.assertWrapperProperties(textfieldWrappers.at(0), {
      title: 'snr-criterion.spatial.name.field',
      hintText: 'snr-criterion.spatial.name.field',
      value: props.spatialName,
      onChange: props.onSpatialNameInput,
      errorText: null,
    }, 'name field properties should be correctly set')

    testSuiteHelpers.assertWrapperProperties(textfieldWrappers.at(1), {
      title: 'snr-criterion.cone.angle.field',
      hintText: 'snr-criterion.cone.angle.field',
      value: props.angle,
      onChange: props.onAngleInput,
      type: 'number',
      errorText: null,
    }, 'angle field properties should be correctly set')
  })
  it('should render correctly with an invalid spatial object name', () => {
    const props = {
      label: {
        fr: 'test',
        en: 'test',
      },
      spatialName: 'any',
      onSpatialNameInput: () => {},
      angle: '25',
      onAngleInput: () => {},
      invalidSNR: true,
      rightAscension: '',
      declinaison: '',
      onRightAscensionInput: () => {},
      onDeclinaisonInput: () => {},
      optionSelected: OPTIONS_ENUM.SNR,
      onChangeOption: () => {},
      unitSelected: converter.UNITS_ENUM.DEG,
      onChangeUnit: () => {},
    }
    const enzymeWrapper = shallow(<CriterionComponent {...props} />, { context })
    const textfieldWrappers = enzymeWrapper.find(TextField)
    assert.lengthOf(textfieldWrappers, 2, 'There should be two field (name and angle)')
    assert.equal(textfieldWrappers.at(0).props().errorText, 'snr-criterion.resolution.error.message', 'SNR error should be displayed')
  })
  it('should render correctly with an invalid angle', () => {
    const props = {
      label: {
        fr: 'test',
        en: 'test',
      },
      spatialName: 'any',
      onSpatialNameInput: () => {},
      angle: '180',
      onAngleInput: () => {},
      invalidSNR: false,
      rightAscension: '',
      declinaison: '',
      onRightAscensionInput: () => {},
      onDeclinaisonInput: () => {},
      optionSelected: OPTIONS_ENUM.SNR,
      onChangeOption: () => {},
      unitSelected: converter.UNITS_ENUM.DEG,
      onChangeUnit: () => {},
    }
    const enzymeWrapper = shallow(<CriterionComponent {...props} />, { context })
    const textfieldWrappers = enzymeWrapper.find(TextField)
    assert.lengthOf(textfieldWrappers, 2, 'There should be two field (name and angle)')
    assert.equal(textfieldWrappers.at(1).props().errorText, 'snr-criterion.cone.angle.deg.error.message', 'Angle error should be displayed')
  })
})
