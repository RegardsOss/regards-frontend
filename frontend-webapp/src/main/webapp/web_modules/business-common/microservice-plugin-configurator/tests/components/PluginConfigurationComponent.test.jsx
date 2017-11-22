/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import map from 'lodash/map'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import sinon from 'sinon'
import { CardTitle } from 'material-ui/Card'
import { Field } from '@regardsoss/form-utils'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { PluginConfigurationComponent } from '../../src/components/PluginConfigurationComponent'
import GenericPluginParameter from '../../src/components/parameters/GenericPluginParameter'
import styles from '../../src/styles/styles'
import PluginUtils from '../../src/components/utils'

const context = buildTestContext(styles)

/**
* Test  PluginConfigurationComponent
* @author Sébastien Binda
*/
describe('[ Module name] Testing  PluginConfigurationComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(PluginConfigurationComponent)
  })
  it('should render correctly without any parameters', () => {
    const reduxFormInitializeSpy = sinon.spy()
    const props = {
      microserviceName: 'rs-ingest',
      pluginMetaData: {
        pluginId: 'pluginId',
        pluginClassName: 'className',
        author: 'tester',
        version: '1.0.0',
      },
      formMode: 'create',
      reduxFormChange: () => { },
      reduxFormInitialize: reduxFormInitializeSpy,
      reduxFormGetField: () => { },
      pluginConfiguration: null,
      displayTitle: true,
      hideGlobalParameterConf: false,
      newPluginConfLabel: null,
      reduxFormfieldNamePrefix: null,
    }
    const enzymeWrapper = shallow(<PluginConfigurationComponent {...props} />, { context })
    assert.equal(enzymeWrapper.find(CardTitle).length, 2, 'Global CardTitle should be displayed as the props displayTitle is true')
    assert.equal(enzymeWrapper.find(Field).length, 6, 'There should be 6 configuration fields dislayed')
    let field = enzymeWrapper.find(Field).find({ name: 'pluginClassName' })
    assert.equal(field.length, 1, 'There should be a pluginClassName field')
    field = enzymeWrapper.find(Field).find({ name: 'label' })
    assert.equal(field.length, 1, 'There should be a label field')
    field = enzymeWrapper.find(Field).find({ name: 'version' })
    assert.equal(field.length, 1, 'There should be a version field')
    field = enzymeWrapper.find(Field).find({ name: 'priorityOrder' })
    assert.equal(field.length, 1, 'There should be a version priorityOrder')
    field = enzymeWrapper.find(Field).find({ name: 'iconUrl' })
    assert.equal(field.length, 1, 'There should be a version iconUrl')
    field = enzymeWrapper.find(Field).find({ name: 'active' })
    assert.equal(field.length, 1, 'There should be a version active')
    assert.equal(enzymeWrapper.find(GenericPluginParameter).length, 0, 'There should not have any GenericPluginParameter rendered as there is no parameters defined in pluginMetadata provided')

    assert.equal(reduxFormInitializeSpy.calledOnce, true, 'Redux form initialize method should be called once')
    const expectedInitValues = {
      active: true,
      pluginId: props.pluginMetaData.pluginId,
      pluginClassName: props.pluginMetaData.pluginClassName,
      version: props.pluginMetaData.version,
      priorityOrder: 1,
      parameters: PluginUtils.buildDefaultParameterList(props.pluginMetaData.parameters),
      label: props.newPluginConfLabel,
    }
    assert.equal(reduxFormInitializeSpy.calledWith(expectedInitValues), true, 'Invalid initial values')
  })
  it('should render correctly without title', () => {
    const props = {
      microserviceName: 'rs-ingest',
      pluginMetaData: {
        pluginId: 'pluginId',
        pluginClassName: 'className',
        author: 'tester',
        version: '1.0.0',
      },
      formMode: 'create',
      reduxFormChange: () => { },
      reduxFormInitialize: () => { },
      reduxFormGetField: () => { },
      pluginConfiguration: null,
      displayTitle: false,
      hideGlobalParameterConf: false,
      newPluginConfLabel: null,
      reduxFormfieldNamePrefix: null,
    }
    const enzymeWrapper = shallow(<PluginConfigurationComponent {...props} />, { context })
    assert.equal(enzymeWrapper.find(CardTitle).length, 1, 'Global CardTitle should not be displayed as the props displayTitle is false')
    assert.equal(enzymeWrapper.find(Field).length, 6, 'There should be 6 configuration fields dislayed')
    assert.equal(enzymeWrapper.find(GenericPluginParameter).length, 0, 'There should not have any GenericPluginParameter rendered as there is no parameters defined in pluginMetadata provided')
  })
  it('should render correctly without title and global configuration', () => {
    const props = {
      microserviceName: 'rs-ingest',
      pluginMetaData: {
        pluginId: 'pluginId',
        pluginClassName: 'className',
        author: 'tester',
        version: '1.0.0',
      },
      formMode: 'create',
      reduxFormChange: () => { },
      reduxFormInitialize: () => { },
      reduxFormGetField: () => { },
      pluginConfiguration: null,
      displayTitle: false,
      hideGlobalParameterConf: true,
      newPluginConfLabel: null,
      reduxFormfieldNamePrefix: null,
    }
    const enzymeWrapper = shallow(<PluginConfigurationComponent {...props} />, { context })
    assert.equal(enzymeWrapper.find(CardTitle).length, 0, 'Global CardTitle should not be displayed as the props displayTitle is false')
    assert.equal(enzymeWrapper.find(Field).length, 0, 'There should be 0 configuration fields dislayed as the global conf is desabled')
    assert.equal(enzymeWrapper.find(GenericPluginParameter).length, 0, 'There should not have any GenericPluginParameter rendered as there is no parameters defined in pluginMetadata provided')
  })
  it('should render correctly with parameters', () => {
    const reduxFormInitializeSpy = sinon.spy()
    const props = {
      microserviceName: 'rs-ingest',
      pluginMetaData: {
        pluginId: 'pluginId',
        pluginClassName: 'className',
        author: 'tester',
        version: '1.0.0',
        parameters: [
          {
            name: 'param1',
            dynamic: false,
          },
          {
            name: 'param2',
            dynamic: false,
          },
        ],
      },
      formMode: 'create',
      reduxFormChange: () => { },
      reduxFormInitialize: reduxFormInitializeSpy,
      reduxFormGetField: () => { },
      pluginConfiguration: null,
      displayTitle: false,
      hideGlobalParameterConf: true,
      newPluginConfLabel: null,
      reduxFormfieldNamePrefix: null,
    }
    const enzymeWrapper = shallow(<PluginConfigurationComponent {...props} />, { context })
    assert.equal(enzymeWrapper.find(CardTitle).length, 0, 'Global CardTitle should not be displayed as the props displayTitle is false')
    assert.equal(enzymeWrapper.find(Field).length, 0, 'There should be 0 configuration fields dislayed as the global conf is desabled')
    assert.equal(enzymeWrapper.find(GenericPluginParameter).length, 2, 'There should be two GenericPluginParameter rendered as there is two parameters defined in pluginMetadata provided')

    assert.equal(reduxFormInitializeSpy.calledOnce, true, 'Redux form initialize method should be called once')
    const expectedInitValues = {
      active: true,
      pluginId: props.pluginMetaData.pluginId,
      pluginClassName: props.pluginMetaData.pluginClassName,
      version: props.pluginMetaData.version,
      priorityOrder: 1,
      parameters: PluginUtils.buildDefaultParameterList(props.pluginMetaData.parameters),
      label: props.newPluginConfLabel,
    }
    assert.equal(reduxFormInitializeSpy.calledWith(expectedInitValues), true, 'Invalid initial values')
  })
  it('should not render correctly edit form without provided configuration', () => {
    const reduxFormInitializeSpy = sinon.spy()
    const props = {
      microserviceName: 'rs-ingest',
      pluginMetaData: {
        pluginId: 'pluginId',
        pluginClassName: 'className',
        author: 'tester',
        version: '1.0.0',
      },
      formMode: 'edit',
      reduxFormChange: () => { },
      reduxFormInitialize: reduxFormInitializeSpy,
      reduxFormGetField: () => { },
      pluginConfiguration: null,
      displayTitle: true,
      hideGlobalParameterConf: false,
      newPluginConfLabel: null,
      reduxFormfieldNamePrefix: null,
    }
    try {
      shallow(<PluginConfigurationComponent {...props} />, { context })
      assert.fail('There should be an exception thrown cause there is no plugin configuration provided for edit form')
    } catch (e) {
      // There should be an exception thrown
    }
  })
  it('should render correctly edit form', () => {
    const reduxFormInitializeSpy = sinon.spy()
    const props = {
      microserviceName: 'rs-ingest',
      pluginMetaData: {
        pluginId: 'pluginId',
        pluginClassName: 'className',
        author: 'tester',
        version: '1.0.0',
        parameters: [
          {
            name: 'param1',
            dynamic: false,
          },
          {
            name: 'param2',
            dynamic: false,
          },
        ],
      },
      formMode: 'edit',
      reduxFormChange: () => { },
      reduxFormInitialize: reduxFormInitializeSpy,
      reduxFormGetField: () => { },
      pluginConfiguration: {
        id: 1,
        pluginId: 'pluginId',
        label: 'testConf',
        version: '1.0.0',
        priorityOrder: 1,
        active: true,
        pluginClassName: 'className',
        parameters: [
          {
            id: 1,
            name: 'param1',
            value: 'value1',
          },
          {
            id: 2,
            name: 'param2',
            value: 'value2',
          },
        ],
        iconUrl: null,
      },
      displayTitle: true,
      hideGlobalParameterConf: false,
      newPluginConfLabel: null,
      reduxFormfieldNamePrefix: null,
    }
    const enzymeWrapper = shallow(<PluginConfigurationComponent {...props} />, { context })
    assert.equal(enzymeWrapper.find(Field).length, 6, 'There should be 6 configuration fields dislayed')
    assert.equal(enzymeWrapper.find(GenericPluginParameter).length, 2, 'There should be two GenericPluginParameter rendered as there is two parameters defined in pluginMetadata provided')
    const expectedInitValues = {
      id: props.pluginConfiguration.id,
      pluginId: props.pluginConfiguration.pluginId,
      label: props.pluginConfiguration.label,
      version: props.pluginConfiguration.version,
      priorityOrder: 1,
      active: true,
      pluginClassName: props.pluginConfiguration.pluginClassName,
      parameters: props.pluginConfiguration.parameters,
      iconUrl: props.pluginConfiguration.iconUrl,
    }
    assert.equal(reduxFormInitializeSpy.calledWith(expectedInitValues), true, 'Invalid initial values for edit form')
  })
  it('should render correctly copy form', () => {
    const reduxFormInitializeSpy = sinon.spy()
    const props = {
      microserviceName: 'rs-ingest',
      pluginMetaData: {
        pluginId: 'pluginId',
        pluginClassName: 'className',
        author: 'tester',
        version: '1.0.0',
        parameters: [
          {
            name: 'param1',
            dynamic: false,
          },
          {
            name: 'param2',
            dynamic: false,
          },
        ],
      },
      formMode: 'copy',
      reduxFormChange: () => { },
      reduxFormInitialize: reduxFormInitializeSpy,
      reduxFormGetField: () => { },
      pluginConfiguration: {
        id: 1,
        pluginId: 'pluginId',
        label: 'testConf',
        version: '1.0.0',
        priorityOrder: 1,
        active: true,
        pluginClassName: 'className',
        parameters: [
          {
            id: 1,
            name: 'param1',
            value: 'value1',
          },
          {
            id: 2,
            name: 'param2',
            value: 'value2',
          },
        ],
        iconUrl: null,
      },
      displayTitle: true,
      hideGlobalParameterConf: false,
      newPluginConfLabel: null,
      reduxFormfieldNamePrefix: null,
    }
    const enzymeWrapper = shallow(<PluginConfigurationComponent {...props} />, { context })
    assert.equal(enzymeWrapper.find(Field).length, 6, 'There should be 6 configuration fields dislayed')
    assert.equal(enzymeWrapper.find(GenericPluginParameter).length, 2, 'There should be two GenericPluginParameter rendered as there is two parameters defined in pluginMetadata provided')
    const expectedInitValues = {
      // id : // There should not have id set when copying a conf
      pluginId: props.pluginConfiguration.pluginId,
      label: props.pluginConfiguration.label,
      version: props.pluginConfiguration.version,
      priorityOrder: 1,
      active: true,
      pluginClassName: props.pluginConfiguration.pluginClassName,
      parameters: map(props.pluginConfiguration.parameters, (param) => {
        // There should not have id set when copying a conf
        // eslint-disable-next-line 
        const { id, ...otherProperties } = param
        return { ...otherProperties }
      }),
      iconUrl: props.pluginConfiguration.iconUrl,
    }
    assert.equal(reduxFormInitializeSpy.calledWith(expectedInitValues), true, 'Invalid initial values for edit form')
  })
})
