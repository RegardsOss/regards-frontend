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
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { ProcessingClient, CommonClient } from '@regardsoss/client'
import { OrderCartTableComponent } from '../../../src/components/user/OrderCartTableComponent'
import OrderCartContentSummaryComponent from '../../../src/components/user/OrderCartContentSummaryComponent'
import styles from '../../../src/styles/styles'

import { emptyBasket, mockBasket1, mockBasket2 } from '../../BasketMocks'

const context = buildTestContext(styles)

/**
* Test OrderCartTableComponent
* @author Raphaël Mechali
*/
describe('[OrderCart] Testing OrderCartTableComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(OrderCartTableComponent)
  })
  it('should render correctly when no data', () => {
    const props = {
      basket: undefined,
      showDatasets: true,
      isFetching: false,
      isProcessingDependenciesExist: false,
      processingSelectors: ProcessingClient.getProcessingSelectors(),
      pluginMetaDataSelectors: CommonClient.getPluginMetaDataSelectors(),
      linkProcessingDatasetActions: new ProcessingClient.LinkProcessingDatasetActions(),
      onShowDuplicatedMessage: () => { },
    }
    const enzymeWrapper = shallow(<OrderCartTableComponent {...props} />, { context })
    // can not test anymore tree table as it is now in scroll area
    const summaryWrapper = enzymeWrapper.find(OrderCartContentSummaryComponent)
    assert.lengthOf(summaryWrapper, 1, 'There should be the summary')
    testSuiteHelpers.assertWrapperProperties(summaryWrapper, {
      basket: props.basket,
      onShowDuplicatedMessage: props.onShowDuplicatedMessage,
    })
  })
  it('should render correctly with a basket', () => {
    const props = {
      basket: mockBasket1,
      showDatasets: true,
      isFetching: false,
      isProcessingDependenciesExist: false,
      processingSelectors: ProcessingClient.getProcessingSelectors(),
      pluginMetaDataSelectors: CommonClient.getPluginMetaDataSelectors(),
      linkProcessingDatasetActions: new ProcessingClient.LinkProcessingDatasetActions(),
      onShowDuplicatedMessage: () => { },
    }
    const enzymeWrapper = shallow(<OrderCartTableComponent {...props} />, { context })
    // can not test anymore tree table as it is now in scroll area
    const summaryWrapper = enzymeWrapper.find(OrderCartContentSummaryComponent)
    assert.lengthOf(summaryWrapper, 1, 'There should be the summary')
    testSuiteHelpers.assertWrapperProperties(summaryWrapper, {
      basket: props.basket,
      onShowDuplicatedMessage: props.onShowDuplicatedMessage,
    })
  })
  it('should not render empty models', () => {
    // render to get the instance (we just want here to obtain the instance)
    const enzymeWrapper = shallow(
      <OrderCartTableComponent
        showDatasets
        isFetching
        isProcessingDependenciesExist={false}
        processingSelectors={ProcessingClient.getProcessingSelectors()}
        pluginMetaDataSelectors={CommonClient.getPluginMetaDataSelectors()}
        linkProcessingDatasetActions={new ProcessingClient.LinkProcessingDatasetActions()}
        // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
        onShowDuplicatedMessage={() => { }} // eslint wont fix: unnecessary in test code
      />, { context })

    // test empty model
    assert.lengthOf(enzymeWrapper.instance().buildTableRows(undefined), 0, 'There should be no dataset row when basket is undefined')
    // test empty basket
    assert.lengthOf(enzymeWrapper.instance().buildTableRows(emptyBasket), 0, 'There should be no dataset row when using empty basket model')
  })
  it('should generete correctly a tree model baskets with datasets as root', () => {
    const enzymeWrapper = shallow(
      <OrderCartTableComponent
        showDatasets
        isFetching
        isProcessingDependenciesExist={false}
        processingSelectors={ProcessingClient.getProcessingSelectors()}
        pluginMetaDataSelectors={CommonClient.getPluginMetaDataSelectors()}
        linkProcessingDatasetActions={new ProcessingClient.LinkProcessingDatasetActions()}
        // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
        onShowDuplicatedMessage={() => { }} // eslint wont fix: unnecessary in test code
      />, { context })
    const models = [{ label: 'Mock model 1', model: mockBasket1 }, { label: 'Mock model 2', model: mockBasket2 }]
    models.forEach(({ label, model }) => {
      const dsSelections = model.datasetSelections
      const treeRows = enzymeWrapper.instance().buildTableRows(model)
      assert.lengthOf(treeRows, dsSelections.length, `In model ${label}, dataset selections should be correctly reported to rows`)
      for (let i = 0; i < dsSelections.length; i += 1) {
        assert.lengthOf(treeRows[i].subRows, dsSelections[i].itemsSelections.length, `In model ${label}/dataset${i}: there should be one row for each item`)
      }
    })
  })
  it('should generete correctly a tree model baskets with selections as root', () => {
    const enzymeWrapper = shallow(
      <OrderCartTableComponent
        showDatasets={false}
        isFetching
        isProcessingDependenciesExist={false}
        processingSelectors={ProcessingClient.getProcessingSelectors()}
        pluginMetaDataSelectors={CommonClient.getPluginMetaDataSelectors()}
        linkProcessingDatasetActions={new ProcessingClient.LinkProcessingDatasetActions()}
        // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
        onShowDuplicatedMessage={() => { }} // eslint wont fix: unnecessary in test code
      />, { context })
    // test complex mock models
    const models = [{ label: 'Mock model 1', model: mockBasket1 }, { label: 'Mock model 2', model: mockBasket2 }]
    models.forEach(({ label, model }) => {
      const treeRows = enzymeWrapper.instance().buildTableRows(model)
      const itemsSelectionsCount = model.datasetSelections.reduce((acc, selection) => acc + selection.itemsSelections.length, 0)
      assert.lengthOf(treeRows, itemsSelectionsCount, `In model ${label}, only items selecions should be shown`)
      for (let i = 0; i < treeRows.length; i += 1) {
        assert.lengthOf(treeRows[i].subRows, 0, `In model ${label}/selection${i}: there should be no sub row (datasets are hidden)`)
      }
    })
  })
})
