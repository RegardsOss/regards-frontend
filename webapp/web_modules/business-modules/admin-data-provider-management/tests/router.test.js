/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { assert, expect } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import Routes from '../src/router'
import AcquisitionProcessingChainListContainer from '../src/containers/configuration/AcquisitionProcessingChainListContainer'
import AcquisitionProcessingChainFormContainer from '../src/containers/configuration/AcquisitionProcessingChainFormContainer'
import AcquisitionProcessingChainMonitorListContainer from '../src/containers/monitoring/AcquisitionProcessingChainMonitorListContainer'
import ProductListContainer from '../src/containers/monitoring/ProductListContainer'
import AcquisitionFileListContainer from '../src/containers/monitoring/AcquisitionFileListContainer'

/**
 * Ingest processing chain module routers tests.
 * @author Sébastien Binda
 */
describe('[ADMIN DATA PROVIDER MANAGEMENT] Testing router', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should return the correct value', () => {
    assert.isDefined(Routes)
    expect(Routes.childRoutes).to.have.length(7)
    expect(Routes.childRoutes[0].path).to.eq('chain/list')
    expect(Routes.childRoutes[1].path).to.eq('chain/create')
    expect(Routes.childRoutes[2].path).to.eq('chain/:chainId/:mode')
    expect(Routes.childRoutes[3].path).to.eq('monitoring/chains')
    expect(Routes.childRoutes[4].path).to.eq('monitoring/chains/:chainId/products')
    expect(Routes.childRoutes[5].path).to.eq('monitoring/chains/:chainId/products/:productId/files')
    expect(Routes.childRoutes[6].path).to.eq('monitoring/chains/:chainId/files')
  })
  it('list should return AcquisitionProcessingChainListContainer for listing of existing chains', (done) => {
    Routes.childRoutes[0].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(AcquisitionProcessingChainListContainer)
      done()
    })
  })
  it('create should return AcquisitionProcessingChainFormContainer for listing of existing chains', (done) => {
    Routes.childRoutes[1].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(AcquisitionProcessingChainFormContainer)
      done()
    })
  })
  it('chain/:chainId/:mode should return AcquisitionProcessingChainFormContainer for listing of existing chains', (done) => {
    Routes.childRoutes[2].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(AcquisitionProcessingChainFormContainer)
      done()
    })
  })
  it('monitoring/chains should return AcquisitionProcessingChainMonitorListContainer for listing of existing chains', (done) => {
    Routes.childRoutes[3].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(AcquisitionProcessingChainMonitorListContainer)
      done()
    })
  })
  it('monitoring/chains/:chainId/products should return ProductListContainer for listing of existing products', (done) => {
    Routes.childRoutes[4].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(ProductListContainer)
      done()
    })
  })
  it('monitoring/chains/:chainId/products/:productId/files should return AcquisitionFileListContainer for listing of existing files', (done) => {
    Routes.childRoutes[5].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(AcquisitionFileListContainer)
      done()
    })
  })
  it('monitoring/chains/:chainId/files should return AcquisitionFileListContainer for listing of existing files', (done) => {
    Routes.childRoutes[6].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(AcquisitionFileListContainer)
      done()
    })
  })
})
