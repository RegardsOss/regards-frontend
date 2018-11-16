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
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import { expect } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import { PROJECT, PROJECT_ARRAY } from '@regardsoss/api'
import BasicListActions from '../../src/list/BasicListActions'

const { apiMiddleware } = require('redux-api-middleware')

const middlewares = [thunk, apiMiddleware]
const mockStore = configureStore(middlewares)

const PROJECTS_API = 'http://stackoverflow.com/api/v1/projects'
const projectListActions = new BasicListActions({
  namespace: 'admin-project-management',
  entityEndpoint: PROJECTS_API,
  schemaTypes: {
    ENTITY: PROJECT,
    ENTITY_ARRAY: PROJECT_ARRAY,
  },
})

function handleDispatchError(action, store, done) {
  return store.dispatch(action)
    .then(() => {
      try {
        expect(store.getActions()[1].error).to.eql(true)
        return done()
      } catch (e) {
        console.error('store.getActions() is')
        console.error(JSON.stringify(store.getActions()))
        return done(e)
      }
    })
}

describe('[STORE UTILS] Testing BasicListActions', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  afterEach(() => {
    nock.cleanAll()
  })
  describe('GET / calls', () => {
    it('should leverage a request action on fetch request', () => {
      nock(PROJECTS_API)
        .get('')
        .reply(500, 'Oops')
      const store = mockStore({ projects: [] })

      const expectedAction = {
        type: projectListActions.ENTITY_LIST_REQUEST,
      }
      store.dispatch(projectListActions.fetchEntityList())
      expect(store.getActions()).to.deep.contain(expectedAction)
    })

    it('should leverage a failure action on fetch failure', (done) => {
      nock(PROJECTS_API)
        .get('')
        .reply(500, 'Oops')
      const store = mockStore({ projects: [] })

      handleDispatchError(projectListActions.fetchEntityList(), store, done)
    })
  })
  describe('POST / calls', () => {
    it('should leverage a request action on create request', () => {
      nock(PROJECTS_API)
        .post('')
        .reply(500, 'Oops')
      const store = mockStore({ projects: [] })

      const expectedAction = {
        type: projectListActions.CREATE_ENTITY_REQUEST,
      }
      store.dispatch(projectListActions.createEntity({ some: 'value' }))
      expect(store.getActions()).to.deep.contain(expectedAction)
    })

    it('should leverage a failure action on create failure', (done) => {
      nock(PROJECTS_API)
        .post('')
        .reply(500, 'Oops')
      const store = mockStore({ projects: {} })

      handleDispatchError(projectListActions.createEntity({ some: 'value' }), store, done)
    })
  })
  describe('DELETE /{id} calls', () => {
    it('should leverage a request action on delete request', () => {
      const id = 'project1'
      nock(`${PROJECTS_API}/${id}`)
        .delete('')
        .reply(500, 'Oops')
      const store = mockStore({ projects: [] })

      const expectedAction = {
        type: projectListActions.DELETE_ENTITY_REQUEST,
      }
      store.dispatch(projectListActions.deleteEntity(id))
      expect(store.getActions()).to.deep.contain(expectedAction)
    })

    it('should leverage a failure action on delete failure', (done) => {
      const id = 'project1'
      nock(`${PROJECTS_API}/${id}`)
        .delete('')
        .reply(500, 'Oops')
      const store = mockStore({ projects: {} })

      handleDispatchError(projectListActions.deleteEntity(id), store, done)
    })
  })
})
