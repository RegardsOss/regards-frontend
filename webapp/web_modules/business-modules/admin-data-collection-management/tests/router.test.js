/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import CollectionFormContainer from '../src/containers/CollectionFormContainer'
import CollectionListContainer from '../src/containers/CollectionListContainer'
import CollectionEditLinksContainer from '../src/containers/CollectionEditLinksContainer'
import CollectionEditFilesContainer from '../src/containers/CollectionEditFilesContainer'

describe('[ADMIN DATA COLLECTION MANAGEMENT] Testing router', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should return the correct value', () => {
    assert.isDefined(Routes)
    expect(Routes.childRoutes).to.have.length(5)
    expect(Routes.childRoutes[0].path).to.eq('list')
    expect(Routes.childRoutes[1].path).to.eq('create')
    expect(Routes.childRoutes[2].path).to.eq(':collectionId/links')
    expect(Routes.childRoutes[3].path).to.eq(':collectionId/files')
    expect(Routes.childRoutes[4].path).to.eq(':collectionId/:mode')
  })
  it('list should return CollectionListContainer', (done) => {
    Routes.childRoutes[0].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(CollectionListContainer)
      done()
    })
  })
  it('edit should return CollectionFormContainer', (done) => {
    Routes.childRoutes[1].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(CollectionFormContainer)
      done()
    })
  })
  it('edit links should return CollectionEditLinksContainer', (done) => {
    Routes.childRoutes[2].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(CollectionEditLinksContainer)
      done()
    })
  })
  it('edit links should return CollectionEditFilesContainer', (done) => {
    Routes.childRoutes[3].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(CollectionEditFilesContainer)
      done()
    })
  })
  it('create should return CollectionFormContainer', (done) => {
    Routes.childRoutes[4].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(CollectionFormContainer)
      done()
    })
  })
})
