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
import { expect } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import { PROJECT, PROJECT_ARRAY } from '@regardsoss/api'
import BasicListReducers from '../../src/list/BasicListReducers'
import BasicListActions from '../../src/list/BasicListActions'

const PROJECTS_API = 'http://stackoverflow.com/api/v1/projects'

const projectActions = new BasicListActions({
  namespace: 'admin-project-management',
  entityEndpoint: PROJECTS_API,
  schemaTypes: {
    ENTITY: PROJECT,
    ENTITY_ARRAY: PROJECT_ARRAY,
  },
})

const projectReducers = new BasicListReducers({
  entityKey: 'name',
  normalizrKey: 'projects',
}, projectActions)

describe('[STORE UTILS] Testing project reducer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should return the initial state', () => {
    expect(projectReducers.reduce(undefined, {})).to.eql({
      error: {
        hasError: false,
        message: '',
        type: '',
        status: 200,
      },
      isFetching: false,
      isSyncing: false,
      items: {},
      results: [],
      lastUpdate: '',
    })
  })

  describe('should reduce requests fetching', () => {
    const shallSetIsFetching = (actionType) => function () {
      const action = {
        type: actionType,
      }
      const initState = {
        isSyncing: false,
        isFetching: false,
        error: {
          hasError: false,
          type: '',
          message: '',
          status: 200,
        },
      }
      const expectedState = {
        isSyncing: false,
        isFetching: true,
        error: {
          hasError: false,
          type: '',
          message: '',
          status: 200,
        },
      }
      expect(projectReducers.reduce(initState, action)).to.eql(expectedState)
    }
    it('check PROJECT_LIST_REQUEST', shallSetIsFetching(projectActions.ENTITY_LIST_REQUEST))
    it('check PROJECT_REQUEST', shallSetIsFetching(projectActions.ENTITY_REQUEST))
  })

  describe('should reduce requests syncing', () => {
    const shallSetIsSyncing = (actionType) => function () {
      const action = {
        type: actionType,
      }
      const initState = {
        isSyncing: false,
        isFetching: false,
        error: {
          hasError: false,
          type: '',
          message: '',
          status: 200,
        },
      }
      const expectedState = {
        isSyncing: true,
        isFetching: false,
        error: {
          hasError: false,
          type: '',
          message: '',
          status: 200,
        },
      }
      expect(projectReducers.reduce(initState, action)).to.eql(expectedState)
    }
    it('check DELETE_PROJECT_REQUEST', shallSetIsSyncing(projectActions.DELETE_ENTITY_REQUEST))
    it('check UPDATE_PROJECT_REQUEST', shallSetIsSyncing(projectActions.UPDATE_ENTITY_REQUEST))
    it('check CREATE_PROJECT_REQUEST', shallSetIsSyncing(projectActions.CREATE_ENTITY_REQUEST))
  })

  describe('should reduce requests errors', () => {
    const shallSetErrorSync = (actionType) => function () {
      const action = {
        type: actionType,
      }
      const initState = {
        isFetching: false,
        isSyncing: true,
      }
      const expectedState = {
        error: {
          hasError: true,
          message: '',
          type: actionType,
          status: 200,
        },
        isFetching: false,
        isSyncing: false,
      }
      expect(projectReducers.reduce(initState, action)).to.eql(expectedState)
    }
    const shallSetErrorFetch = (actionType) => function () {
      const action = {
        type: actionType,
      }
      const initState = {
        isFetching: true,
        isSyncing: false,
      }
      const expectedState = {
        error: {
          hasError: true,
          message: '',
          type: actionType,
          status: 200,
        },
        isFetching: false,
        isSyncing: false,
      }
      expect(projectReducers.reduce(initState, action)).to.eql(expectedState)
    }

    it('check PROJECT_LIST_FAILURE', shallSetErrorFetch(projectActions.ENTITY_LIST_FAILURE))
    it('check PROJECT_FAILURE', shallSetErrorFetch(projectActions.ENTITY_FAILURE))
    it('check CREATE_PROJECT_FAILURE', shallSetErrorSync(projectActions.CREATE_ENTITY_FAILURE))
    it('check DELETE_PROJECT_FAILURE', shallSetErrorSync(projectActions.DELETE_ENTITY_FAILURE))
    it('check UPDATE_PROJECT_FAILURE', shallSetErrorSync(projectActions.UPDATE_ENTITY_FAILURE))
  })

  it('should reduce PROJECT_LIST_SUCCESS', () => {
    const action = {
      type: projectActions.ENTITY_LIST_SUCCESS,
      payload: {
        entities: {
          projects: {
            1: {
              content: {
                id: 1,
                name: 'project1',
                description: '',
                icon: '',
                isPublic: true,
                isDeleted: false,
              },
              links: [],
            },
          },
        },
        result: [1],
      },
    }
    const initState = {
      isFetching: true,
      isSyncing: false,
      items: {},
      lastUpdate: '',
    }
    const expectedState = {
      isFetching: false,
      isSyncing: false,
      error: {
        hasError: false,
        type: '',
        message: '',
        status: 200,
      },
      items: {
        1: {
          content: {
            id: 1,
            name: 'project1',
            description: '',
            icon: '',
            isPublic: true,
            isDeleted: false,
          },
          links: [],
        },
      },
      lastUpdate: '',
      results: [
        1,
      ],
    }
    expect(projectReducers.reduce(initState, action)).to.eql(expectedState)
  })

  it('should handle DELETE_PROJECT_SUCCESS', () => {
    const action = {
      type: projectActions.DELETE_ENTITY_SUCCESS,
      payload: 'regards',
    }
    const initState = {
      isFetching: true,
      isSyncing: false,
      items: {
        cdpp: {
          content: {
            id: 1,
            name: 'cdpp',
          },
          links: [],
        },
        cnes: {
          content: {
            id: 2,
            name: 'cnes',
          },
          links: [],
        },
        regards: {
          content: {
            id: 3,
            name: 'regards',
          },
          links: [],
        },
      },
      results: [
        'regards',
        'cnes',
        'cdpp',
      ],
      lastUpdate: '',

    }
    const expectedState = {
      isFetching: false,
      isSyncing: false,
      error: {
        hasError: false,
        type: '',
        message: '',
        status: 200,
      },
      items: {
        cdpp: {
          content: {
            id: 1,
            name: 'cdpp',
          },
          links: [],
        },
        cnes: {
          content: {
            id: 2,
            name: 'cnes',
          },
          links: [],
        },
      },
      results: [
        'cnes',
        'cdpp',
      ],
      lastUpdate: '',
    }
    expect(projectReducers.reduce(initState, action)).to.eql(expectedState)
  })

  describe('should handle other requests success', () => {
    const shallUpdateElement = (actionType) => function () {
      const action = {
        type: actionType,
        payload: {
          entities: {
            projects: {
              newProject: {
                id: '3',
                name: 'newProject',
              },
            },
          },
          result: [
            'newProject',
          ],
        },
      }
      const initState = {
        isFetching: false,
        isSyncing: false,
        items: {
          cdpp: {
            id: '0',
            name: 'cdpp',
          },
          ssalto: {
            id: '1',
            name: 'ssalto',
          },
        },
        results: [
          'cdpp',
          'ssalto',
        ],
        lastUpdate: '',
      }
      const expectedState = {
        isFetching: false,
        isSyncing: false,
        items: {
          cdpp: {
            id: '0',
            name: 'cdpp',
          },
          ssalto: {
            id: '1',
            name: 'ssalto',
          },
          newProject: {
            id: '3',
            name: 'newProject',
          },
        },
        lastUpdate: '',
        error: {
          hasError: false,
          type: '',
          message: '',
          status: 200,
        },
        results: [
          'cdpp',
          'ssalto',
          'newProject',
        ],
      }
      expect(projectReducers.reduce(initState, action)).to.eql(expectedState)
    }
    it('check CREATE_PROJECT_SUCCESS', shallUpdateElement(projectActions.CREATE_ENTITY_SUCCESS))
    it('check PROJECT_SUCCESS', shallUpdateElement(projectActions.ENTITY_SUCCESS))
    it('check UPDATE_PROJECT_SUCCESS', shallUpdateElement(projectActions.UPDATE_ENTITY_SUCCESS))
  })
})
