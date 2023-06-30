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
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { EditSettingsContainer } from '../../src/containers/EditSettingsContainer'
import EditSettingsComponent from '../../src/components/EditSettingsComponent'
import styles from '../../src/styles'
import { modelsDump } from '../dumps/models.dump'

const context = buildTestContext(styles)

/**
 * Test EditSettingsContainer
 * @author Raphaël Mechali
 */
describe('[ADMIN UI SETTINGS MANAGEMENT] Testing EditSettingsContainer', () => {
  before(() => {
    testSuiteHelpers.before()
  })
  after(() => {
    testSuiteHelpers.after()
  })

  it('should exists', () => {
    assert.isDefined(EditSettingsContainer)
  })
  it('should render correctly creating, loading required data initially', () => {
    let spiedGetDataModelCount = 0
    let spiedGetSettingsCount = 0
    const spiedCreateSettings = {}
    const spiedUpdateSettings = {}
    const props = {
      params: {
        project: 'testProject',
      },
      fetchingModels: true,
      dataModels: null,
      fetchingSettings: true,
      settings: null,

      getDataModels: () => {
        spiedGetDataModelCount += 1
      },
      getSettings: () => {
        spiedGetSettingsCount += 1
      },
      createSettings: (settings) => {
        spiedCreateSettings.settings = settings
      },
      updateSettings: (settings) => {
        spiedUpdateSettings.settings = settings
      },
    }
    const enzymeWrapper = shallow(<EditSettingsContainer {...props} />, { context })
    // 1 - Check loading
    assert.equal(spiedGetDataModelCount, 1, '(1) Get data model should have been called')
    assert.equal(spiedGetSettingsCount, 1, '(1) Get settings should have been called')
    assert.deepEqual(enzymeWrapper.state(), {
      modelsLoaded: false,
      dataModelNames: [],
      settingsLoaded: false,
      creating: true,
    }, '(1) Initial state should be correctly computed')
    let loadingDecoratorWrapper = enzymeWrapper.find(LoadableContentDisplayDecorator)
    assert.lengthOf(loadingDecoratorWrapper, 1, '(1) There should be loading decorator')
    assert.isTrue(loadingDecoratorWrapper.props().isLoading, '(1) Component should loading initially')
    let componentWrapper = loadingDecoratorWrapper.find(EditSettingsComponent)
    assert.lengthOf(componentWrapper, 1, '(1) There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      settings: props.settings,
      dataModelNames: enzymeWrapper.state().dataModelNames,
      onBack: enzymeWrapper.instance().onBack,
      onSubmit: enzymeWrapper.instance().onSubmitSettings,
    }, '(1) Component should define the expected properties')
    // 2 - Complete loading (without datamodels to simulate creation)
    enzymeWrapper.setProps({
      ...props,
      fetchingModels: false,
      dataModels: modelsDump,
      fetchingSettings: false,
      settings: null,
    })
    assert.deepEqual(enzymeWrapper.state(), {
      modelsLoaded: true,
      dataModelNames: ['CRAWL_DATA_MODEL', 'Departement', 'STAFnvc_model'],
      settingsLoaded: true,
      creating: true,
    }, '(2) After initialization, creation state and model names should be correctly resolved (and sorted)')
    loadingDecoratorWrapper = enzymeWrapper.find(LoadableContentDisplayDecorator)
    assert.lengthOf(loadingDecoratorWrapper, 1, '(2) There should be loading decorator')
    assert.isFalse(loadingDecoratorWrapper.props().isLoading, '(2) Component should no longer be loading after initialization')
    componentWrapper = loadingDecoratorWrapper.find(EditSettingsComponent)
    assert.lengthOf(componentWrapper, 1, '(2) There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      settings: props.settings,
      dataModelNames: enzymeWrapper.state().dataModelNames,
      onBack: enzymeWrapper.instance().onBack,
      onSubmit: enzymeWrapper.instance().onSubmitSettings,
    }, '(2) Component should define the expected properties')

    // 3 - Test submitting (that should call on back after)
    enzymeWrapper.instance().onSubmitSettings({ everybody: 'needs somebody' })
    assert.isUndefined(spiedUpdateSettings.settings, 'Update should not have been called')
    assert.deepEqual(spiedCreateSettings.settings, {
      everybody: 'needs somebody',
    }, 'Create should have been called with right parameters')
  })
  it('should render correctly editing, loading required data initially', () => {
    let spiedGetDataModelCount = 0
    let spiedGetSettingsCount = 0
    const spiedCreateSettings = {}
    const spiedUpdateSettings = {}
    const props = {
      params: {
        project: 'testProject2',
      },
      fetchingModels: true,
      dataModels: null,
      fetchingSettings: true,
      settings: null,

      getDataModels: () => {
        spiedGetDataModelCount += 1
      },
      getSettings: () => {
        spiedGetSettingsCount += 1
      },
      createSettings: (settings) => {
        spiedCreateSettings.settings = settings
      },
      updateSettings: (settings) => {
        spiedUpdateSettings.settings = settings
      },
    }
    const enzymeWrapper = shallow(<EditSettingsContainer {...props} />, { context })
    // 1 - Check loading
    assert.equal(spiedGetDataModelCount, 1, '(1) Get data model should have been called')
    assert.equal(spiedGetSettingsCount, 1, '(1) Get settings should have been called')
    assert.deepEqual(enzymeWrapper.state(), {
      modelsLoaded: false,
      dataModelNames: [],
      settingsLoaded: false,
      creating: true,
    }, '(1) Initial state should be correctly computed')
    let loadingDecoratorWrapper = enzymeWrapper.find(LoadableContentDisplayDecorator)
    assert.lengthOf(loadingDecoratorWrapper, 1, '(1) There should be loading decorator')
    assert.isTrue(loadingDecoratorWrapper.props().isLoading, '(1) Component should loading initially')
    let componentWrapper = loadingDecoratorWrapper.find(EditSettingsComponent)
    assert.lengthOf(componentWrapper, 1, '(1) There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      settings: props.settings,
      dataModelNames: enzymeWrapper.state().dataModelNames,
      onBack: enzymeWrapper.instance().onBack,
      onSubmit: enzymeWrapper.instance().onSubmitSettings,
    }, '(1) Component should define the expected properties')
    // 2 - Complete loading (with datamodels to simulate edition)
    const props2 = {
      ...props,
      fetchingModels: false,
      dataModels: modelsDump,
      fetchingSettings: false,
      settings: {
        showVersion: false,
        documentModels: ['STAFnvc_model', 'CRAWL_DATA_MODEL'],
        primaryQuicklookGroup: 'meinGrüpe',
        quotaWarningCount: 150,
        rateWarningCount: 5,
      },
    }
    enzymeWrapper.setProps(props2)
    assert.deepEqual(enzymeWrapper.state(), {
      modelsLoaded: true,
      dataModelNames: ['CRAWL_DATA_MODEL', 'Departement', 'STAFnvc_model'],
      settingsLoaded: true,
      creating: false,
    }, '(2) After initialization, edition state and model names should be correctly resolved (and sorted)')
    loadingDecoratorWrapper = enzymeWrapper.find(LoadableContentDisplayDecorator)
    assert.lengthOf(loadingDecoratorWrapper, 1, '(2) There should be loading decorator')
    assert.isFalse(loadingDecoratorWrapper.props().isLoading, '(2) Component should no longer be loading after initialization')
    componentWrapper = loadingDecoratorWrapper.find(EditSettingsComponent)
    assert.lengthOf(componentWrapper, 1, '(2) There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      settings: props2.settings,
      dataModelNames: enzymeWrapper.state().dataModelNames,
      onBack: enzymeWrapper.instance().onBack,
      onSubmit: enzymeWrapper.instance().onSubmitSettings,
    }, '(2) Component should define the expected properties')

    // 3 - Test submitting (that should call on back after)
    enzymeWrapper.instance().onSubmitSettings({ somebody: 'needs everybody' })
    assert.isUndefined(spiedCreateSettings.settings, 'Create should not have been called')
    assert.deepEqual(spiedUpdateSettings.settings, {
      somebody: 'needs everybody',
    }, 'Update should have been called with right parameters')
  })
})
