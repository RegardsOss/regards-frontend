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
import sinon from 'sinon'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers, DumpProvider } from '@regardsoss/tests-helpers'
import { Field, FieldArray } from '@regardsoss/form-utils'
import { AcquisitionProcessingChainFormComponent } from '../../../src/components/acquisitionChain/AcquisitionProcessingChainFormComponent'
import AcquisitionProcessingChainFormPluginsComponent from '../../../src/components/acquisitionChain/AcquisitionProcessingChainFormPluginsComponent'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test  AcquisitionProcessingChainFormComponent
* @author Sébastien Binda
*/
describe('[ADMIN DATA-PROVIDER MANAGEMENT] Testing  AcquisitionProcessingChainFormComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AcquisitionProcessingChainFormComponent)
  })
  it('should render correctly in creation mode', () => {
    const props = {
      mode: 'create',
      onSubmit: sinon.stub().callsFake(() => new Promise(() => { })),
      onBack: sinon.stub().callsFake(() => new Promise(() => { })),
      changeField: () => {},
      // from reduxForm
      initialize: sinon.spy(),
      invalid: false,
      submitting: false,
      handleSubmit: sinon.spy(),
      storages: [
        {
          content: {
            label: 'LocalDataStorage',
          },
        }, {
          content: {
            label: 'Sacoche Infini',
          },
        }, {
          content: {
            label: 'Turkmenistan',
          },
        },
      ],
    }
    const enzymeWrapper = shallow(<AcquisitionProcessingChainFormComponent {...props} />, { context })
    // Check that the form is well initialized
    assert.isTrue(props.initialize.called, 'The initialize method should be called.')
    // In creation mode the initializ method should be call without specific values
    const initializeValues = props.initialize.getCall(0).args[0]
    assert.deepEqual(initializeValues, {
      ...AcquisitionProcessingChainFormComponent.getNewIntialValues(),
      storages: [
        {
          active: false,
          label: 'LocalDataStorage',
          storePath: '',
          aip: false,
          description: false,
          document: false,
          other: false,
          rawdata: false,
          thumbnail: false,
          quicklook: false,
        },
        {
          active: false,
          label: 'Sacoche Infini',
          storePath: '',
          aip: false,
          description: false,
          document: false,
          other: false,
          rawdata: false,
          thumbnail: false,
          quicklook: false,
        },
        {
          active: false,
          label: 'Turkmenistan',
          storePath: '',
          aip: false,
          description: false,
          document: false,
          other: false,
          rawdata: false,
          thumbnail: false,
          quicklook: false,
        },
      ],
    })
    // Check that all fields are rendered
    const fields = enzymeWrapper.find(Field)
    assert.equal(fields.length, 5, 'There should be 4 parameter Field rendered in this form')
    assert.isTrue(fields.find({ name: 'label' }).exists(), 'The label Field is missing')
    assert.isTrue(fields.find({ name: 'active' }).exists(), 'The active Field is missing')
    assert.isTrue(fields.find({ name: 'versioningMode' }).exists(), 'The versioningMode Field is missing')
    assert.isTrue(fields.find({ name: 'mode' }).exists(), 'The mode Field is missing')
    assert.isTrue(fields.find({ name: 'ingestChain' }).exists(), 'The ingestChain Field is missing')
    const filedArrays = enzymeWrapper.find(FieldArray)
    assert.equal(filedArrays.length, 3, 'There should be 3 parameter FieldArray rendered in this form')
    assert.isTrue(filedArrays.find({ name: 'fileInfos' }).exists(), 'The fileInfos Field is missing')
    assert.equal(enzymeWrapper.find(AcquisitionProcessingChainFormPluginsComponent).length, 1, 'The plugin form parts should be rendered')
  })
  it('should render correctly in edition mode', () => {
    const props = {
      chain: DumpProvider.getFirstEntity('DataProviderClient', 'AcquisitionProcessingChain'),
      mode: 'edit',
      onSubmit: sinon.stub().callsFake(() => new Promise(() => { })),
      onBack: sinon.stub().callsFake(() => new Promise(() => { })),
      changeField: () => {},
      // from reduxForm
      initialize: sinon.spy(),
      invalid: false,
      submitting: false,
      handleSubmit: sinon.spy(),
      storages: [
        {
          content: {
            label: 'LocalDataStorage',
            businessId: 'LocalDataStorage',
          },
        }, {
          content: {
            label: 'Sacoche Infini',
            businessId: 'SacocheInfini',
          },
        }, {
          content: {
            label: 'Turkmenistan',
            businessId: 'Turkmenistan',
          },
        },
      ],
    }
    const enzymeWrapper = shallow(<AcquisitionProcessingChainFormComponent {...props} />, { context })
    // Check that the form is well initialized
    assert.isTrue(props.initialize.called, 'The initialize method should be called.')
    // In edition mode the initialie method should be call with the given chain to edit
    const initializeValues = props.initialize.getCall(0).args[0]
    assert.deepEqual(initializeValues, {
      ...props.chain.content,
      storages: [
        {
          active: true,
          label: 'LocalDataStorage',
          storePath: '/machin/chose',
          aip: true,
          description: true,
          document: true,
          other: true,
          rawdata: true,
          thumbnail: true,
          quicklook: true,
        },
        {
          active: true,
          label: 'Sacoche Infini',
          storePath: '',
          aip: true,
          description: true,
          document: true,
          other: true,
          rawdata: true,
          thumbnail: true,
          quicklook: true,
        },
        {
          active: false,
          label: 'Turkmenistan',
          storePath: '',
          aip: false,
          description: false,
          document: false,
          other: false,
          rawdata: false,
          thumbnail: false,
          quicklook: false,
        },
      ],
    })
    // Check that all fields are rendered
    const fields = enzymeWrapper.find(Field)
    assert.equal(fields.length, 5, 'There should be 4 parameter Field rendered in this form')
    assert.isTrue(fields.find({ name: 'label' }).exists(), 'The label Field is missing')
    assert.isTrue(fields.find({ name: 'active' }).exists(), 'The active Field is missing')
    assert.isTrue(fields.find({ name: 'versioningMode' }).exists(), 'The versioningMode Field is missing')
    assert.isTrue(fields.find({ name: 'mode' }).exists(), 'The mode Field is missing')
    assert.isTrue(fields.find({ name: 'ingestChain' }).exists(), 'The ingestChain Field is missing')
    const filedArrays = enzymeWrapper.find(FieldArray)
    assert.equal(filedArrays.length, 3, 'There should be 3 parameter FieldArray rendered in this form')
    assert.isTrue(filedArrays.find({ name: 'fileInfos' }).exists(), 'The fileInfos Field is missing')
    assert.equal(enzymeWrapper.find(AcquisitionProcessingChainFormPluginsComponent).length, 1, 'The plugin form parts should be rendered')
  })
  it('should render correctly in duplication mode', () => {
    const props = {
      chain: DumpProvider.getFirstEntity('DataProviderClient', 'AcquisitionProcessingChain'),
      mode: 'duplicate',
      onSubmit: sinon.stub().callsFake(() => new Promise(() => { })),
      onBack: sinon.stub().callsFake(() => new Promise(() => { })),
      changeField: () => {},
      // from reduxForm
      initialize: sinon.spy(),
      invalid: false,
      submitting: false,
      handleSubmit: sinon.spy(),
      storages: [
        {
          content: {
            label: 'LocalDataStorage',
          },
        }, {
          content: {
            label: 'Sacoche Infini',
          },
        }, {
          content: {
            label: 'Turkmenistan',
          },
        },
      ],
    }
    const enzymeWrapper = shallow(<AcquisitionProcessingChainFormComponent {...props} />, { context })
    // Check that the form is well initialized
    assert.isTrue(props.initialize.called, 'The initialize method should be called.')
    // In duplication mode the initialie method should be call with the given chain to duplicate
    const chain = props.chain.content
    const initializeValues = props.initialize.getCall(0).args[0]
    // Check the duplication of a chain (ids should be removed as other specific parameters)
    assert.notExists(initializeValues.id, 'The id parameter should be removed when duplicating a chain')
    assert.equal(`${chain.label} (1)`, initializeValues.label, 'The label parameter si not a valid duplicated label')
    assert.notExists(initializeValues.locked, 'The locked parameter should be removed when duplicating a chain')
    assert.notExists(initializeValues.lastDateActivation, 'The lastDateActivation parameter should be removed when duplicating a chain')
    assert.equal(initializeValues.active, chain.active, 'The active parameter should be duplicated')
    assert.equal(initializeValues.mode, chain.mode, 'The mode parameter should be duplicated')
    assert.equal(initializeValues.ingestChain, chain.ingestChain, 'The ingestChain parameter should be duplicated')
    assert.equal(initializeValues.fileInfos.length, chain.fileInfos.length, 'The fileInfos should be duplicated')
    // Check that all fields are rendered
    const fields = enzymeWrapper.find(Field)
    assert.equal(fields.length, 5, 'There should be 4 parameter Field rendered in this form')
    assert.isTrue(fields.find({ name: 'label' }).exists(), 'The label Field is missing')
    assert.isTrue(fields.find({ name: 'active' }).exists(), 'The active Field is missing')
    assert.isTrue(fields.find({ name: 'versioningMode' }).exists(), 'The versioningMode Field is missing')
    assert.isTrue(fields.find({ name: 'mode' }).exists(), 'The mode Field is missing')
    assert.isTrue(fields.find({ name: 'ingestChain' }).exists(), 'The ingestChain Field is missing')
    const filedArrays = enzymeWrapper.find(FieldArray)
    assert.equal(filedArrays.length, 3, 'There should be 3 parameter FieldArray rendered in this form')
    assert.isTrue(filedArrays.find({ name: 'fileInfos' }).exists(), 'The fileInfos Field is missing')
    assert.equal(enzymeWrapper.find(AcquisitionProcessingChainFormPluginsComponent).length, 1, 'The plugin form parts should be rendered')
  })
})
