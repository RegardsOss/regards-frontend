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
import sinon from 'sinon'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import isFunction from 'lodash/isFunction'
import { buildTestContext, testSuiteHelpers, DumpProvider } from '@regardsoss/tests-helpers'
import AcquisitionProcessingChainFormComponent from '../../../src/components/acquisitionChain/AcquisitionProcessingChainFormComponent'
import { AcquisitionProcessingChainFormContainer } from '../../../src/containers/acquisitionChain/AcquisitionProcessingChainFormContainer'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test  AcquisitionProcessingChainFormContainer
* @author Sébastien Binda
*/
describe('[ADMIN DATA-PROVIDER MANAGEMENT] Testing  AcquisitionProcessingChainFormContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AcquisitionProcessingChainFormContainer)
  })
  it('should render correctly a form to create a new acquisition processing chain', () => {
    const props = {
      params: {
        project: 'test-project',
        mode: 'create',
      },
      chain: null,
      fetch: sinon.stub().callsFake(() => new Promise(() => { })),
      create: sinon.stub().callsFake(() => new Promise(() => { })),
      update: sinon.stub().callsFake(() => new Promise(() => { })),
      storages: [
        {
          storage: 'LocalDataStorage',
          storageSubDirectory: '/machin/chose',
        },
        {
          storage: 'Sacoche Infini',
          storageSubDirectory: '',
        },
      ],
      getStorages: sinon.stub().callsFake(() => new Promise(() => { })),
      changeField: () => {},
    }
    const enzymeWrapper = shallow(<AcquisitionProcessingChainFormContainer {...props} />, { context })
    const components = enzymeWrapper.find(AcquisitionProcessingChainFormComponent)
    assert.equal(components.length, 1, 'The AcquisitionProcessingChainFormComponent should be rendered')
    const component = components.at(0)
    // As we are in creation mode, chain fetch should not be called
    assert.isFalse(props.fetch.called, 'In creation mode, the AcquisitionProcessingChainFormContainer should not fetch any chain')
    assert.isFalse(props.create.called, 'Create callback should not be called at initialization')
    assert.isFalse(props.update.called, 'Update callback should not be called at initialization')
    // Check that props are given to the component
    assert.isNull(component.props().chain, 'In creation mode, the AcquisitionProcessingChainFormComponent should not have a chain parameter')
    assert.equal(props.params.mode, component.props().mode, 'In creation mode, the AcquisitionProcessingChainFormComponent should have a mode === create')
    assert.isTrue(isFunction(component.props().onSubmit), 'Invalid onSubmit parameter')
    assert.isTrue(isFunction(component.props().onBack), 'Invalid onSubmit parameter')
    // Check action called when submit the form
    enzymeWrapper.instance().onSubmit({
      storages: [
        {
          content: {
            businessId: 'LocalDataStorage',
            label: 'LocalDataStorage',
          },
        }, {
          content: {
            businessId: 'SacocheInfini',
            label: 'Sacoche Infini',
          },
        }, {
          content: {
            businessId: 'Turkmenistan',
            label: 'Turkmenistan',
          },
        },
      ],
    })
    assert.isTrue(props.create.called, 'Create callback should be called for submission')
    assert.isFalse(props.update.called, 'Update callback should not be called for submission')
  })
  it('should render correctly a form to edit an existing acquisition processing chain', () => {
    const props = {
      params: {
        project: 'test-project',
        mode: 'edit',
        chainId: '12',
      },
      chain: DumpProvider.getFirstEntity('DataProviderClient', 'AcquisitionProcessingChain'),
      fetch: sinon.stub().callsFake(() => new Promise(() => { })),
      create: sinon.stub().callsFake(() => new Promise(() => { })),
      update: sinon.stub().callsFake(() => new Promise(() => { })),
      storages: [
        {
          active: true,
          label: 'LocalDataStorage',
          storePath: '/machin/chose',
          aip: false,
          description: false,
          document: false,
          other: false,
          rawdata: false,
          thumbnail: false,
          quicklook: false,
        },
        {
          active: true,
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
      ],
      getStorages: sinon.stub().callsFake(() => new Promise(() => { })),
      changeField: () => {},
    }
    const enzymeWrapper = shallow(<AcquisitionProcessingChainFormContainer {...props} />, { context })
    const components = enzymeWrapper.find(AcquisitionProcessingChainFormComponent)
    assert.equal(components.length, 1, 'The AcquisitionProcessingChainFormComponent should be rendered')
    const component = components.at(0)
    // As we are in edition mode, chain fetch should be called
    assert.isTrue(props.fetch.called, 'In edition mode, the AcquisitionProcessingChainFormContainer should fetch the chain to edit')
    assert.isFalse(props.create.called, 'Create callback should not be called at initialization')
    assert.isFalse(props.update.called, 'Update callback should not be called at initialization')
    // Check that props are given to the component
    assert.equal(component.props().chain, props.chain, 'In edition mode, the AcquisitionProcessingChainFormComponent should have a chain parameter')
    assert.equal(props.params.mode, component.props().mode, 'In edition mode, the AcquisitionProcessingChainFormComponent should have a mode === edit')
    assert.isTrue(isFunction(component.props().onSubmit), 'Invalid onSubmit parameter')
    assert.isTrue(isFunction(component.props().onBack), 'Invalid onSubmit parameter')
    // Check action called when submit the form
    enzymeWrapper.instance().onSubmit({
      storages: [
        {
          content: {
            businessId: 'LocalDataStorage',
            label: 'LocalDataStorage',
          },
        }, {
          content: {
            businessId: 'SacocheInfini',
            label: 'Sacoche Infini',
          },
        }, {
          content: {
            businessId: 'Turkmenistan',
            label: 'Turkmenistan',
          },
        },
      ],
    })
    assert.isTrue(props.update.called, 'Create callback should be called for submission')
    assert.isFalse(props.create.called, 'Create callback should not be called for submission')
  })
  it('should render correctly a form to duplicate an existing acquisition processing chain', () => {
    const props = {
      params: {
        project: 'test-project',
        mode: 'duplicate',
        chainId: '12',
      },
      chain: DumpProvider.getFirstEntity('DataProviderClient', 'AcquisitionProcessingChain'),
      fetch: sinon.stub().callsFake(() => new Promise(() => { })),
      create: sinon.stub().callsFake(() => new Promise(() => { })),
      update: sinon.stub().callsFake(() => new Promise(() => { })),
      storages: [
        {
          active: true,
          label: 'LocalDataStorage',
          storePath: '/machin/chose',
          aip: false,
          description: false,
          document: false,
          other: false,
          rawdata: false,
          thumbnail: false,
          quicklook: false,
        },
        {
          active: true,
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
      ],
      getStorages: sinon.stub().callsFake(() => new Promise(() => { })),
      changeField: () => {},
    }
    const enzymeWrapper = shallow(<AcquisitionProcessingChainFormContainer {...props} />, { context })
    const components = enzymeWrapper.find(AcquisitionProcessingChainFormComponent)
    assert.equal(components.length, 1, 'The AcquisitionProcessingChainFormComponent should be rendered')
    const component = components.at(0)
    // As we are in edition mode, chain fetch should be called
    assert.isTrue(props.fetch.called, 'In duplication mode, the AcquisitionProcessingChainFormContainer should fetch the chain to edit')
    assert.isFalse(props.create.called, 'Create callback should not be called at initialization')
    assert.isFalse(props.update.called, 'Update callback should not be called at initialization')
    // Check that props are given to the component
    assert.equal(component.props().chain, props.chain, 'In duplication mode, the AcquisitionProcessingChainFormComponent should have a chain parameter')
    assert.equal(props.params.mode, component.props().mode, 'In duplication mode, the AcquisitionProcessingChainFormComponent should have a mode === duplicate')
    assert.isTrue(isFunction(component.props().onSubmit), 'Invalid onSubmit parameter')
    assert.isTrue(isFunction(component.props().onBack), 'Invalid onSubmit parameter')
    // Check action called when submit the form
    enzymeWrapper.instance().onSubmit({
      storages: [
        {
          content: {
            businessId: 'LocalDataStorage',
            label: 'LocalDataStorage',
          },
        }, {
          content: {
            businessId: 'SacocheInfini',
            label: 'Sacoche Infini',
          },
        }, {
          content: {
            businessId: 'Turkmenistan',
            label: 'Turkmenistan',
          },
        },
      ],
    })
    assert.isTrue(props.create.called, 'Create callback should be called for submission')
    assert.isFalse(props.update.called, 'Update callback should not be called for submission')
  })
})
