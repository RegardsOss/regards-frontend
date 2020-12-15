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
import { shallow } from 'enzyme'
import sinon from 'sinon'
import { assert } from 'chai'
import { ProcessingClient, CommonClient } from '@regardsoss/client'
import { buildTestContext, testSuiteHelpers, DumpProvider } from '@regardsoss/tests-helpers'
import ManageDatasetProcessingComponent from '../../../../src/components/backend/pluginBack/ManageDatasetProcessingComponent'
import { ManageDatasetProcessingContainer } from '../../../../src/containers/backend/pluginBack/ManageDatasetProcessingContainer'
import { Parameter } from '../../../../src/definitions/parameters/Parameter'
import styles from '../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Dataset list of links
 */
const processingDatasetLinks1 = [{
  processBusinessId: 'testProcess1',
  label: 'testProcess1',
}]

const processingDatasetLinks = [{
  processBusinessId: 'testProcess1',
  label: 'testProcess1',
}, {
  processBusinessId: 'testProcess3',
  label: 'testProcess3',
}]

/**
 * Dataset selected link
 */
const datasetProcessLink1 = {
  processBusinessId: 'testProcess1',
  label: 'testProcess1',
  parameters: {},
}

/**
 * Dataset selected link 2
 */
const datasetProcessLink2 = {
  processBusinessId: 'testProcess3',
  label: 'testProcess3',
  parameters: {
    durationForecast: '50',
    sizeForecast: '50',
  },
}

/**
 * Test ManageDatasetProcessingContainer
 * @author Théo Lasserre
 */
describe('[Entities Common] Testing ManageDatasetProcessingContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ManageDatasetProcessingContainer)
  })
  it('should render correctly without parameters', (done) => {
    const promiseFetchProcessingDatasetList = Promise.resolve({ payload: processingDatasetLinks1, error: false })

    const props = {
      datasetIpid: 'datasetTest',
      datasetSelectionId: 123,
      process: datasetProcessLink1,
      onProcessChanged: () => { },
      disabled: false,
      processingSelectors: ProcessingClient.getProcessingSelectors(),
      pluginMetaDataSelectors: CommonClient.getPluginMetaDataSelectors(),
      linkProcessingDatasetActions: new ProcessingClient.LinkProcessingDatasetActions(),
      processingConfigurationList: DumpProvider.get('ProcessingClient', 'Processing'),
      processingMetadataList: DumpProvider.get('CommonClient', 'PluginMetaData'),
      fetchLinkProcessingDatasetList: sinon.stub().callsFake(() => promiseFetchProcessingDatasetList),
      updateDatasetProcessing: () => { },
    }
    const enzymeWrapper = shallow(<ManageDatasetProcessingContainer {...props} />, { context })

    promiseFetchProcessingDatasetList.then(() => {
      const componentWrapper = enzymeWrapper.find(ManageDatasetProcessingComponent)
      const wrapperInstance = enzymeWrapper.instance()
      assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')

      testSuiteHelpers.assertWrapperProperties(componentWrapper, {
        processingConfParametersObjects: {
          testProcess1: {
            businessId: 'testProcess1',
            label: 'testProcess1',
            resolvedParameters: [],
            parameters: {},
          },
        },
        processingConfParametersSelected: datasetProcessLink1.processBusinessId,
        isProcessingConfSelectedConfigurable: false,
        onSelectedProcessingConfChanged: wrapperInstance.onSelectedProcessingConfChanged,
        onConfigurationDone: wrapperInstance.onConfigurationDone,
        onRemoveProcessing: wrapperInstance.onRemoveProcessing,
        processBusinessId: props.process.processBusinessId,
        disabled: props.disabled,
      }, 'Component should define the expected properties')
      done()
    })
  })
  it('should render correctly with parameters & role', (done) => {
    const promiseFetchProcessingDatasetList = Promise.resolve({ payload: processingDatasetLinks, error: false })
    //const fetchLinkStubFunction = sinon.expectation.create

    const props = {
      datasetIpid: 'datasetTest',
      datasetSelectionId: 123,
      process: datasetProcessLink2,
      onProcessChanged: () => { },
      disabled: false,
      processingSelectors: ProcessingClient.getProcessingSelectors(),
      pluginMetaDataSelectors: CommonClient.getPluginMetaDataSelectors(),
      linkProcessingDatasetActions: new ProcessingClient.LinkProcessingDatasetActions(),
      processingConfigurationList: DumpProvider.get('ProcessingClient', 'Processing'),
      processingMetadataList: DumpProvider.get('CommonClient', 'PluginMetaData'),
      fetchLinkProcessingDatasetList: sinon.stub().callsFake(() => promiseFetchProcessingDatasetList),
      updateDatasetProcessing: () => { },
    }
    const enzymeWrapper = shallow(<ManageDatasetProcessingContainer {...props} />, { context })

    promiseFetchProcessingDatasetList.then(() => {
      const componentWrapper = enzymeWrapper.find(ManageDatasetProcessingComponent)
      const wrapperInstance = enzymeWrapper.instance()
      assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
      testSuiteHelpers.assertWrapperProperties(componentWrapper, {
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
        processingConfParametersSelected: datasetProcessLink2.processBusinessId,
        isProcessingConfSelectedConfigurable: true,
        onSelectedProcessingConfChanged: wrapperInstance.onSelectedProcessingConfChanged,
        onConfigurationDone: wrapperInstance.onConfigurationDone,
        onRemoveProcessing: wrapperInstance.onRemoveProcessing,
        processBusinessId: props.process.processBusinessId,
        disabled: props.disabled,
      }, 'Component should define the expected properties')
      done()
    })
  })
})
