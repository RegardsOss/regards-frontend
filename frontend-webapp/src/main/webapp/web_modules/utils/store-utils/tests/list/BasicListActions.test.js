/**
* LICENSE_PLACEHOLDER
**/
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import { expect } from 'chai'
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
function handleDispatch(action, expectedAction, store, done) {
  store.dispatch(action)
    .then(() => {
      try {
        expect(store.getActions()).to.deep.contain(expectedAction)
        done()
      } catch (e) {
        console.error('store.getActions() is')
        console.error(JSON.stringify(store.getActions()))
        console.error('expectedAction is')
        console.error(JSON.stringify(expectedAction))
        done(e)
      }
    })
}
function handleDispatchError(action, store, done) {
  store.dispatch(action)
    .then(() => {
      try {
        expect(store.getActions()[1].error).to.eql(true)
        done()
      } catch (e) {
        console.error('store.getActions() is')
        console.error(JSON.stringify(store.getActions()))
        done(e)
      }
    })
}

describe('[STORE UTILS] Testing BasicListActions', () => {
  afterEach(() => {
    nock.cleanAll()
  })
  describe('GET / calls', () => {
    it('should leverage a request action on fetch request', (done) => {
      nock(PROJECTS_API)
        .get('')
        .reply(500, 'Oops')
      const store = mockStore({ projects: [] })

      const expectedAction = {
        type: projectListActions.ENTITY_LIST_REQUEST,
        payload: undefined,
        meta: undefined,
      }
      handleDispatch(projectListActions.fetchEntityList(), expectedAction, store, done)
    })

    it('should leverage a success action on fetch success', (done) => {
      nock(PROJECTS_API)
        .get('')
        .reply(200, [{
          content: {
            id: 1,
            name: 'project1',
          },
        }])
      const store = mockStore({ projectAdmins: [] })

      const expectedAction = {
        type: projectListActions.ENTITY_LIST_SUCCESS,
        meta: undefined,
        payload: {
          entities: {
            projects: {
              project1: {
                content: {
                  id: 1,
                  name: 'project1',
                },
              },
            },
          },
          result: ['project1'],
        },
      }
      handleDispatch(projectListActions.fetchEntityList(), expectedAction, store, done)
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
    it('should leverage a request action on create request', (done) => {
      nock(PROJECTS_API)
        .post('')
        .reply(500, 'Oops')
      const store = mockStore({ projects: [] })

      const expectedAction = {
        type: projectListActions.CREATE_ENTITY_REQUEST,
        payload: undefined,
        meta: undefined,
      }
      handleDispatch(projectListActions.createEntity({ some: 'value' }), expectedAction, store, done)
    })

    it('should leverage a success action on create success', (done) => {
      nock(PROJECTS_API)
        .post('')
        .reply(200, {
          content: {
            id: 1,
            name: 'project1',
          },
        },
      )
      const store = mockStore({ projects: [] })

      const expectedAction = {
        payload: {
          entities: {
            projects: {
              project1: {
                content: {
                  id: 1,
                  name: 'project1',
                },
              },
            },
          },
          result: 'project1',
        },
        type: projectListActions.CREATE_ENTITY_SUCCESS,
        meta: undefined,
      }

      handleDispatch(projectListActions.createEntity({ some: 'value' }), expectedAction, store, done)
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
    it('should leverage a request action on delete request', (done) => {
      const id = 'project1'
      nock(`${PROJECTS_API}/${id}`)
        .delete('')
        .reply(500, 'Oops')
      const store = mockStore({ projects: [] })

      const expectedAction = {
        type: projectListActions.DELETE_ENTITY_REQUEST,
        payload: undefined,
        meta: undefined,
      }

      handleDispatch(projectListActions.deleteEntity(id), expectedAction, store, done)
    })

    it('should leverage a success action on delete success', (done) => {
      const id = 'project1'
      nock(`${PROJECTS_API}/${id}`)
        .delete('')
        .reply(200, [{
          name: 'createdProject',
          id: 3,
          links: [{
            rel: 'self',
            href: 'fakeHref',
          }],
        }],
      )
      const store = mockStore({
        projects: {
          3: {
            name: 'createdProject',
            id: 3,
            links: [{
              rel: 'self',
              href: 'fakeHref',
            }],
          },
        },
      })

      const expectedAction = {
        type: projectListActions.DELETE_ENTITY_SUCCESS,
        meta: undefined,
        payload: id,
      }
      handleDispatch(projectListActions.deleteEntity(id), expectedAction, store, done)
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
