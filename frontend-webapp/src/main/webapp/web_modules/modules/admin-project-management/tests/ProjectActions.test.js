import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import { expect } from 'chai'
import defaultFluxStandardError from '@regardsoss/tests-helpers'
import * as actions from '../src/model/ProjectActions'

const { apiMiddleware } = require('redux-api-middleware')

const middlewares = [thunk, apiMiddleware]
const mockStore = configureStore(middlewares)

describe('[ADMIN APP] Testing projects actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  describe('GET /projects calls', () => {
    it('should leverage a request action on fetch request', () => {
      nock(actions.PROJECTS_API)
      .get('')
      .reply(200)
      const store = mockStore({ projects: [] })

      const expectedAction = {
        type: actions.PROJECT_LIST_REQUEST,
        payload: undefined,
        meta: undefined,
      }

      store.dispatch(actions.fetchProjectList())
           .then(() => {
             expect(store.getActions()).to.contain(expectedAction)
           })
    })

    it('should leverage a success action on fetch success', () => {
      nock(actions.PROJECTS_API)
      .get('')
      .reply(200, [
        {
          name: 'cdpp',
          id: '1',
          links: [{ rel: 'self', href: 'fakeHref' }],
        },
        {
          name: 'ssalto',
          id: '2',
          links: [{ rel: 'self', href: 'otherFakeHref' }],
        },
      ])
      const store = mockStore({ projectAdmins: [] })

      const expectedAction = {
        type: actions.PROJECT_LIST_SUCCESS,
        meta: undefined,
        payload: {
          entities: {
            projects: {
              cdpp: {
                name: 'cdpp',
                id: '1',
                links: [{ rel: 'self', href: 'fakeHref' }],
              },
              ssalto: {
                name: 'ssalto',
                id: '2',
                links: [{ rel: 'self', href: 'otherFakeHref' }],
              },
            },
          },
          result: ['cdpp', 'ssalto'],
        },
      }

      store.dispatch(actions.fetchProjectList())
           .then(() => {
             expect(store.getActions()).to.contain(expectedAction)
           })
    })


    it('should leverage a failure action on fetch failure', () => {
      nock(actions.PROJECTS_API)
      .get('')
      .reply(500, 'Oops')
      const store = mockStore({ projects: [] })

      const expectedAction = {
        type: actions.PROJECT_LIST_FAILURE,
        error: true,
        meta: undefined,
        payload: defaultFluxStandardError,
      }

      store.dispatch(actions.fetchProjectList())
           .then(() => {
             expect(store.getActions()).to.contain(expectedAction)
           })
    })
  })

  describe('POST /projects calls', () => {
    it('should leverage a request action on create request', () => {
      nock(actions.PROJECTS_API)
      .post('')
      const store = mockStore({ projects: [] })

      const expectedAction = {
        type: actions.CREATE_PROJECT_REQUEST,
        payload: undefined,
        meta: undefined,
      }

      store.dispatch(actions.fetchProjectList())
           .then(() => {
             expect(store.getActions()).to.contain(expectedAction)
           })
    })

    it('should leverage a success action on create success', () => {
      nock(actions.PROJECTS_API)
      .post('')
      .reply(200, [{
        name: 'createdProject',
        id: 3,
        links: [{ rel: 'self', href: 'fakeHref' }],
      }],
      )
      const store = mockStore({ projects: [] })

      const expectedAction = {
        type: actions.CREATE_PROJECT_SUCCESS,
        meta: undefined,
        payload: {
          entities: {
            projects: {
              3: {
                name: 'createdProject',
                id: 3,
                links: [{ rel: 'self', href: 'fakeHref' }],
              },
            },
          },
          result: [3],
        },
      }

      store.dispatch(actions.fetchProjectList())
           .then(() => {
             expect(store.getActions()).to.contain(expectedAction)
           })
    })

    it('should leverage a failure action on create failure', () => {
      nock(actions.PROJECTS_API)
      .post('')
      .reply(500, 'Oops')
      const store = mockStore({ projects: [] })

      const expectedAction = {
        type: actions.CREATE_PROJECT_FAILURE,
        error: true,
        meta: undefined,
        payload: defaultFluxStandardError,
      }

      store.dispatch(actions.fetchProjectList())
           .then(() => {
             expect(store.getActions()).to.contain(expectedAction)
           })
    })
  })

  describe('DELETE /projects/{id} calls', () => {
    it('should leverage a request action on delete request', () => {
      nock(actions.PROJECTS_API)
      .delete('/1')
      const store = mockStore({ projects: [] })

      const expectedAction = {
        type: actions.DELETE_PROJECT_REQUEST,
        payload: undefined,
        meta: undefined,
      }

      store.dispatch(actions.fetchProjectList())
           .then(() => {
             expect(store.getActions()).to.contain(expectedAction)
           })
    })

    it('should leverage a success action on delete success', () => {
      nock(actions.PROJECTS_API)
      .delete('/1')
      .reply(200, [{
        name: 'createdProject',
        id: 3,
        links: [{ rel: 'self', href: 'fakeHref' }],
      }],
      )
      const store = mockStore({
        projects: {
          3: {
            name: 'createdProject',
            id: 3,
            links: [{ rel: 'self', href: 'fakeHref' }],
          },
        },
      })

      const expectedAction = {
        type: actions.DELETE_PROJECT_SUCCESS,
        meta: undefined,
        payload: {
          entities: {
            projects: {
              3: {
                name: 'createdProject',
                id: 3,
                links: [{ rel: 'self', href: 'fakeHref' }],
              },
            },
          },
          result: [3],
        },
      }

      store.dispatch(actions.fetchProjectList())
           .then(() => {
             expect(store.getActions()).to.contain(expectedAction)
           })
    })

    it('should leverage a failure action on delete failure', () => {
      nock(actions.PROJECTS_API)
      .post('/1')
      .reply(500, 'Oops')
      const store = mockStore({ projects: {} })

      const expectedAction = {
        type: actions.DELETE_PROJECT_FAILURE,
        error: true,
        meta: undefined,
        payload: defaultFluxStandardError,
      }

      store.dispatch(actions.fetchProjectList())
           .then(() => {
             expect(store.getActions()).to.contain(expectedAction)
           })
    })
  })
})
