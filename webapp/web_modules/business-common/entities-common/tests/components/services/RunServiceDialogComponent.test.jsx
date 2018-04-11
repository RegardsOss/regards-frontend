/**
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { LoadableContentDialogContainer, NoContentMessageInfo } from '@regardsoss/components'
import { RunServiceDialogComponent } from '../../../src/components/services/RunServiceDialogComponent'
import ParametersConfigurationComponent from '../../../src/components/services/parameters/ParametersConfigurationComponent'
import { Parameter } from '../../../src/definitions/parameters/Parameter'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Component test. Comment Here
* @author Raphaël Mechali
*/
describe('[Entities Common] Testing RunServiceDialogComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(RunServiceDialogComponent)
  })
  it('should render correctly in loading state', () => {
    const props = {
      serviceName: 'A service',
      currentStep: RunServiceDialogComponent.buildLoadingStep('Loading message...'),
      onClose: () => { },
      handleSubmit: () => { },
      initialize: () => { },
    }
    const enzymeWrapper = shallow(<RunServiceDialogComponent {...props} />, { context })
    // find loadable content dialog, check it is marked as not loaded
    const loadableDialog = enzymeWrapper.find(LoadableContentDialogContainer)
    assert.lengthOf(loadableDialog, 1, 'There should be one loadable dialog')
    assert.isFalse(loadableDialog.props().loaded, 'The dialog should be marked as loading, not loaded')
    // check close option is visible
    const closeAction = loadableDialog.props().actions.find(n => n.key === 'close.button')
    assert.isNotNull(closeAction, 'The close action should be displayed')
  })
  it('should render correctly in error message state', () => {
    const props = {
      serviceName: 'A service',
      currentStep: RunServiceDialogComponent.buildMessageStep('Hello error', true, [<div key="test.option" />]),
      onClose: () => { },
      handleSubmit: () => { },
      initialize: () => { },
    }
    const enzymeWrapper = shallow(<RunServiceDialogComponent {...props} />, { context })
    // find loadable content dialog, check it is marked as loaded
    const loadableDialog = enzymeWrapper.find(LoadableContentDialogContainer)
    assert.lengthOf(loadableDialog, 1, 'There should be one loadable dialog')
    assert.isTrue(loadableDialog.props().loaded, 'The dialog should be marked as loaded to display its children')
    // check close option is visible
    const closeAction = loadableDialog.props().actions.find(n => n.key === 'close.button')
    assert.isNotNull(closeAction, 'The close action should be displayed')
    // check custom option is visible
    const customOption = loadableDialog.props().actions.find(n => n.key === 'test.option')
    assert.isNotNull(customOption, 'The close action should be displayed')
    // find message displayer and verify it is visible with right properties
    const messageDisplayer = enzymeWrapper.find(NoContentMessageInfo)
    assert.lengthOf(messageDisplayer, 1, 'There should be one message displayer')
    assert.equal(messageDisplayer.props().message, 'Hello error', 'The message should be reported')
    assert.equal(messageDisplayer.props().title, 'entities.common.services.error.title', 'The error title should be used')
    assert.isTrue(messageDisplayer.props().noContent, 'The message should be displayed (using noContent:true property)')
  })
  it('should render correctly in information message state', () => {
    const props = {
      serviceName: 'A service',
      currentStep: RunServiceDialogComponent.buildMessageStep('Hello info', false),
      onClose: () => { },
      handleSubmit: () => { },
      initialize: () => { },
    }
    const enzymeWrapper = shallow(<RunServiceDialogComponent {...props} />, { context })
    // find loadable content dialog, check it is marked as loaded
    const loadableDialog = enzymeWrapper.find(LoadableContentDialogContainer)
    assert.lengthOf(loadableDialog, 1, 'There should be one loadable dialog')
    assert.isTrue(loadableDialog.props().loaded, 'The dialog should be marked as loaded to display its children')
    // check close option is visible
    const closeAction = loadableDialog.props().actions.find(n => n.key === 'close.button')
    assert.isNotNull(closeAction, 'The close action should be displayed')
    // check there is no added option (since we specified none)
    assert.lengthOf(loadableDialog.props().actions, 1, 'There should be no custom option')
    // find message displayer and verify it is visible with right properties
    const messageDisplayer = enzymeWrapper.find(NoContentMessageInfo)
    assert.lengthOf(messageDisplayer, 1, 'There should be one message displayer')
    assert.equal(messageDisplayer.props().message, 'Hello info', 'The message should be reported')
    assert.equal(messageDisplayer.props().title, 'entities.common.services.notice.title', 'The info title should be used')
    assert.isTrue(messageDisplayer.props().noContent, 'The message should be displayed (using noContent:true property)')
  })
  it('should render correctly in configuration state', () => {
    const parameters = [Parameter.buildBooleanEditor('param1', true, true)]
    const previousValues = { param1: false }
    const props = {
      serviceName: 'A service',
      currentStep: RunServiceDialogComponent.buildParametersConfigurationStep(parameters, previousValues, () => { }),
      onClose: () => { },
      handleSubmit: () => { },
      initialize: () => { },
    }
    const enzymeWrapper = shallow(<RunServiceDialogComponent {...props} />, { context })
    // find loadable content dialog, check it is marked as loaded
    const loadableDialog = enzymeWrapper.find(LoadableContentDialogContainer)
    assert.lengthOf(loadableDialog, 1, 'There should be one loadable dialog')
    assert.isTrue(loadableDialog.props().loaded, 'The dialog should be marked as loaded to display its children')
    // check close option is visible
    const closeAction = loadableDialog.props().actions.find(n => n.key === 'close.button')
    assert.isNotNull(closeAction, 'The close action should be displayed')
    // check submit option is visible
    const submitAction = loadableDialog.props().actions.find(n => n.key === 'submit.button')
    assert.isNotNull(submitAction, 'The submit action should be displayed')
    // find message displayer and verify it is not visible, showing its children
    const messageDisplayer = enzymeWrapper.find(NoContentMessageInfo)
    assert.lengthOf(messageDisplayer, 1, 'There should be one message displayer')
    assert.isFalse(messageDisplayer.props().noContent, 'The message should not be displayed (using noContent:false property)')
    // find parameters configuration displayer and check its configuration
    const parametersConfigComp = enzymeWrapper.find(ParametersConfigurationComponent)
    assert.lengthOf(parametersConfigComp, 1, 'There should be a parameters configuration component')
    assert.equal(parametersConfigComp.props().parameters, parameters, 'Parameters should be provided to param editor')
    assert.equal(parametersConfigComp.props().parametersValues, previousValues, 'Previous parameters values should be provided to param editor')
    assert.equal(parametersConfigComp.props().initialize, props.initialize, 'Initialize method should be provided to param editor')
  })
  it('should render correctly in results state', () => {
    const props = {
      serviceName: 'A service',
      currentStep: RunServiceDialogComponent.buildResultsStep(<div id="result" />, [<div key="custom.option" />]),
      onClose: () => { },
      handleSubmit: () => { },
      initialize: () => { },
    }
    const enzymeWrapper = shallow(<RunServiceDialogComponent {...props} />, { context })
    // find loadable content dialog, check it is marked as loaded
    const loadableDialog = enzymeWrapper.find(LoadableContentDialogContainer)
    assert.lengthOf(loadableDialog, 1, 'There should be one loadable dialog')
    assert.isTrue(loadableDialog.props().loaded, 'The dialog should be marked as loaded to display its children')
    // check close option is visible
    const closeAction = loadableDialog.props().actions.find(n => n.key === 'close.button')
    assert.isNotNull(closeAction, 'The close action should be displayed')
    // check custom option is visible
    const customOption = loadableDialog.props().actions.find(n => n.key === 'custom.option')
    assert.isNotNull(customOption, 'The custom action should be displayed')
    // find message displayer and verify it is not visible, showing its children
    const messageDisplayer = enzymeWrapper.find(NoContentMessageInfo)
    assert.lengthOf(messageDisplayer, 1, 'There should be one message displayer')
    assert.isFalse(messageDisplayer.props().noContent, 'The message should not be displayed (using noContent:false property)')
    // check parameters parameters configuration is not displayed
    assert.lengthOf(enzymeWrapper.find(ParametersConfigurationComponent), 0, 'There should be a parameters configuration component')
    // check result component is displayed
    const resultsView = enzymeWrapper.find(n => n.id === 'result')
    assert.isNotNull(resultsView, 'The result view should be displayed')
  })
})
