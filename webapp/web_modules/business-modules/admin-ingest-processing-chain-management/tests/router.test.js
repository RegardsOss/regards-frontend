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
import { assert, expect } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import Routes from '../src/router'
import IngestProcessingChainListContainer from '../src/containers/IngestProcessingChainListContainer'
import IngestProcessingChainFormContainer from '../src/containers/IngestProcessingChainFormContainer'

/**
 * Ingest processing chain module routers tests.
 * @author Sébastien Binda
 */
describe('[ADMIN INGEST PROCESSING CHAIN MANAGEMENT] Testing router', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should return the correct value', () => {
    assert.isDefined(Routes)
    expect(Routes.childRoutes).to.have.length(3)
    expect(Routes.childRoutes[0].path).to.eq('list')
    expect(Routes.childRoutes[1].path).to.eq('create')
    expect(Routes.childRoutes[2].path).to.eq(':chain_name/edit')
  })
  it('list should return IngestProcessingChainListContainer for listing of existing chains', (done) => {
    Routes.childRoutes[0].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(IngestProcessingChainListContainer)
      done()
    })
  })
  it('list should return IngestProcessingChainFormContainer for creation of a new chain', (done) => {
    Routes.childRoutes[1].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(IngestProcessingChainFormContainer)
      done()
    })
  })
  it('list should return IngestProcessingChainFormContainer for edition of an existing chain', (done) => {
    Routes.childRoutes[2].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(IngestProcessingChainFormContainer)
      done()
    })
  })
})
