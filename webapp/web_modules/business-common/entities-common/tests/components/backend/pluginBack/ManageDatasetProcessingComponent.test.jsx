/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import get from 'lodash/get'
import { PositionedDialog } from '@regardsoss/components'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { ManageDatasetProcessingComponent } from '../../../../src/components/backend/pluginBack/ManageDatasetProcessingComponent'
import ParametersConfigurationComponent from '../../../../src/components/ParametersConfigurationComponent'
import { Parameter } from '../../../../src/definitions/parameters/Parameter'
import styles from '../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test ManageDatasetProcessingComponent
 * @author Théo Lasserre
 */
describe('[Entities Common] Testing ManageDatasetProcessingComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ManageDatasetProcessingComponent)
  })
  it('should render correctly without parameters', () => {
    const props = {
      processingConfParametersObjects: {
        testProcess1: {
          businessId: 'testProcess1',
          label: 'testProcess1',
          resolvedParameters: [],
          parameters: {},
        },
        testProcess3: {
          businessId: 'testProcess3',
          label: 'testProcess3',
          resolvedParameters: [
            new Parameter('TEXTFIELD', 'sizeForecast', '15', null, null, true, 'Size forecast', 'In order to decide before launching a batch execution whether it will overflow the size quota, we need to have an even imprecise forecast of how much space the execution will occupy. This is a string whose pattern is an optional \'*\', a number, a letter. The letter is the unit: \'b\' for byte, \'k\' for kilobytes, \'m\' for megabytes, \'g\' for gigabytes. If the value starts with \'*\', it will be a multiplier per megabyte of input data. For instance: \'1g\' means the result expected size is 1 gigabyte, no matter the input size. Whereas \'*2.5k\' means that for every megabyte in input, there wille be 2.5 kilobytes of data in the output.'),
            new Parameter('TEXTFIELD', 'durationForecast', '15', null, null, true, 'Duration forecast', 'In order to detect executions which have silently stopped working, we need an even imprecise estimation of the duration the execution will take. The processing module will take this duration, and multiply by a constant configurable value in order to define a timeout. Examples: \'10s\' for 10 seconds, \'5min\' for 5 minutes, \'4h\' for 4 hours, \'2d\' for 2 days ; \'10s/m\' for 10 seconds per megabyte of input data ; \'4h/g\' for 4 hours per gigabyte of input data.'),
          ],
          parameters: {
            durationForecast: '50',
            sizeForecast: '50',
          },
        },
      },
      processingConfParametersSelected: {
        businessId: 'testProcess1',
        label: 'testProcess1',
        resolvedParameters: [],
        parameters: {},
      },
      isProcessingConfSelectedConfigurable: false,
      onSelectedProcessingConfChanged: () => { },
      onConfigurationDone: () => { },
      onRemoveProcessing: () => { },
      processBusinessId: 'testProcess1',
      disabled: false,

      // from reduxForm
      invalid: false,
      handleSubmit: () => { },
      initialize: () => { },
    }
    const enzymeWrapper = shallow(<ManageDatasetProcessingComponent {...props} />, { context })

    // Check for open dialog button
    const openDialogButton = enzymeWrapper.find(FlatButton).find({ id: 'openDialog' })
    assert.lengthOf(openDialogButton, 1, 'Open dialog button should be displayed')

    // Check for dialog
    const dialog = enzymeWrapper.find(PositionedDialog)
    assert.lengthOf(dialog, 1, 'The dialog should be displayed')
    assert.isOk(dialog.props().actions, 'Actions should be found')

    // Check for dialog selected field
    const dialogSelectedfield = dialog.find(SelectField)
    assert.lengthOf(dialogSelectedfield, 1, 'The dialog selected field should be displayed')

    // Check for list of select items
    const selectItemList = dialog.find(MenuItem)
    assert.lengthOf(selectItemList, 2, 'There should be 2 configurations')

    // Check for parameterConf component
    const parameterComp = dialog.find(ParametersConfigurationComponent)
    assert.lengthOf(parameterComp, 0, 'The should be no parameters configuration')
  })
  it('should render correctly with parameters', () => {
    const props = {
      processingConfParametersObjects: {
        testProcess1: {
          businessId: 'testProcess1',
          label: 'testProcess1',
          resolvedParameters: [],
          parameters: {},
        },
        testProcess3: {
          businessId: 'testProcess3',
          label: 'testProcess3',
          resolvedParameters: [
            new Parameter('TEXTFIELD', 'sizeForecast', '15', null, null, true, 'Size forecast', 'In order to decide before launching a batch execution whether it will overflow the size quota, we need to have an even imprecise forecast of how much space the execution will occupy. This is a string whose pattern is an optional \'*\', a number, a letter. The letter is the unit: \'b\' for byte, \'k\' for kilobytes, \'m\' for megabytes, \'g\' for gigabytes. If the value starts with \'*\', it will be a multiplier per megabyte of input data. For instance: \'1g\' means the result expected size is 1 gigabyte, no matter the input size. Whereas \'*2.5k\' means that for every megabyte in input, there wille be 2.5 kilobytes of data in the output.'),
            new Parameter('TEXTFIELD', 'durationForecast', '15', null, null, true, 'Duration forecast', 'In order to detect executions which have silently stopped working, we need an even imprecise estimation of the duration the execution will take. The processing module will take this duration, and multiply by a constant configurable value in order to define a timeout. Examples: \'10s\' for 10 seconds, \'5min\' for 5 minutes, \'4h\' for 4 hours, \'2d\' for 2 days ; \'10s/m\' for 10 seconds per megabyte of input data ; \'4h/g\' for 4 hours per gigabyte of input data.'),
          ],
          parameters: {
            durationForecast: '50',
            sizeForecast: '50',
          },
        },
      },
      processingConfParametersSelected: {
        businessId: 'testProcess3',
        label: 'testProcess3',
        resolvedParameters: [
          new Parameter('TEXTFIELD', 'sizeForecast', '15', null, null, true, 'Size forecast', 'In order to decide before launching a batch execution whether it will overflow the size quota, we need to have an even imprecise forecast of how much space the execution will occupy. This is a string whose pattern is an optional \'*\', a number, a letter. The letter is the unit: \'b\' for byte, \'k\' for kilobytes, \'m\' for megabytes, \'g\' for gigabytes. If the value starts with \'*\', it will be a multiplier per megabyte of input data. For instance: \'1g\' means the result expected size is 1 gigabyte, no matter the input size. Whereas \'*2.5k\' means that for every megabyte in input, there wille be 2.5 kilobytes of data in the output.'),
          new Parameter('TEXTFIELD', 'durationForecast', '15', null, null, true, 'Duration forecast', 'In order to detect executions which have silently stopped working, we need an even imprecise estimation of the duration the execution will take. The processing module will take this duration, and multiply by a constant configurable value in order to define a timeout. Examples: \'10s\' for 10 seconds, \'5min\' for 5 minutes, \'4h\' for 4 hours, \'2d\' for 2 days ; \'10s/m\' for 10 seconds per megabyte of input data ; \'4h/g\' for 4 hours per gigabyte of input data.'),
        ],
        parameters: {
          durationForecast: '50',
          sizeForecast: '50',
        },
      },
      isProcessingConfSelectedConfigurable: true,
      onSelectedProcessingConfChanged: () => { },
      onConfigurationDone: () => { },
      onRemoveProcessing: () => { },
      processBusinessId: 'testProcess3',
      disabled: false,

      // from reduxForm
      invalid: false,
      handleSubmit: () => { },
      initialize: () => { },
    }
    const enzymeWrapper = shallow(<ManageDatasetProcessingComponent {...props} />, { context })

    // Check for open dialog button
    const openDialogButton = enzymeWrapper.find(FlatButton).find({ id: 'openDialog' })
    assert.lengthOf(openDialogButton, 1, 'Open dialog button should be displayed')

    // Check for dialog
    const dialog = enzymeWrapper.find(PositionedDialog)
    assert.lengthOf(dialog, 1, 'The dialog should be displayed')
    assert.isOk(dialog.props().actions, 'Actions should be found')

    // Check for dialog selected field
    const dialogSelectedfield = dialog.find(SelectField)
    assert.lengthOf(dialogSelectedfield, 1, 'The dialog selected field should be displayed')

    // Check for list of select items
    const selectItemList = dialog.find(MenuItem)
    assert.lengthOf(selectItemList, 2, 'There should be 2 configurations')

    // Check for parameterConf component
    const parameterComp = dialog.find(ParametersConfigurationComponent)
    assert.lengthOf(parameterComp, 1, 'The should be a parameters configuration')
    // get selected processing conf object from processingConfParametersObjects collection
    const processingConfParametersSelectedObject = get(props.processingConfParametersObjects, `${props.processingConfParametersSelected.businessId}`)
    testSuiteHelpers.assertWrapperProperties(parameterComp, {
      parameters: processingConfParametersSelectedObject.resolvedParameters,
      parametersValues: processingConfParametersSelectedObject.parameters,
      initialize: props.initialize,
    })
  })
})
