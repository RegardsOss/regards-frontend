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
import sinon from 'sinon'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import IngestProcessingChainFormComponent from '../../src/components/IngestProcessingChainFormComponent'
import { IngestProcessingChainFormContainer } from '../../src/containers/IngestProcessingChainFormContainer'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test  IngestProcessingChainFormContainer
* @author Sébastien Binda
*/
describe('[ADMIN INGEST PROCESSING CHAIN MANAGEMENT] Testing  IngestProcessingChainFormContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(IngestProcessingChainFormContainer)
  })
  it('should render correctly in creation mode', () => {
    const fetchStub = sinon.stub()
    fetchStub.returns(new Promise(() => { }))
    const props = {
      params: {
        project: 'project',
      },
      processingChain: null,
      importChain: () => new Promise(() => { }),
      createChain: () => new Promise(() => { }),
      fetchChain: fetchStub,
      updateChain: () => new Promise(() => { }),
    }
    const enzymeWrapper = shallow(<IngestProcessingChainFormContainer {...props} />, { context })
    assert.equal(enzymeWrapper.find(IngestProcessingChainFormComponent).length, 1, 'There should be an IngestProcessingChainFormComponent rendered')
    assert.equal(fetchStub.callCount, 0, 'The fetch chain method should not be call at init on creation mode')
  })
  it('should render correctly in edition mode', () => {
    const fetchStub = sinon.stub()
    fetchStub.returns(new Promise(() => { }))
    const props = {
      params: {
        project: 'project',
        chain_name: 'chainName',
      },
      importChain: () => new Promise(() => { }),
      processingChain: null,
      createChain: () => new Promise(() => { }),
      fetchChain: fetchStub,
      updateChain: () => new Promise(() => { }),
    }
    const enzymeWrapper = shallow(<IngestProcessingChainFormContainer {...props} />, { context })
    assert.equal(enzymeWrapper.find(IngestProcessingChainFormComponent).length, 1, 'There should be an IngestProcessingChainFormComponent rendered')
    assert.equal(fetchStub.calledOnce, true, 'The fetch chain method should be call at init on edit mode')
    assert.equal(fetchStub.calledWith(props.params.chain_name), true, 'Fetch chain method is not called with valid parameters')
  })
})
