import { expect } from 'chai'
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
class ProjectReducers extends BasicListReducers {
  constructor() {
    super({
      entityKey: 'name',
      normalizrKey: 'projects',
    }, projectActions)
  }
}
const projectReducers = new ProjectReducers()

describe('[STORE UTILS] Testing project reducer', () => {
  it('should return the initial state', () => {
    expect(projectReducers.reduce(undefined, {})).to.eql({
      isFetching: false,
      items: {},
      lastUpdate: '',
    })
  })

  describe('should reduce requests fetching', () => {
    const shallSetIsFetching = actionType => function () {
      const action = {
        type: actionType,
      }
      const initState = {
        isFetching: false,
      }
      const expectedState = {
        isFetching: true,
      }
      expect(projectReducers.reduce(initState, action)).to.eql(expectedState)
    }
    it('check PROJECT_LIST_REQUEST', shallSetIsFetching(projectActions.ENTITY_LIST_REQUEST))
    it('check PROJECT_REQUEST', shallSetIsFetching(projectActions.ENTITY_REQUEST))
    it('check DELETE_PROJECT_REQUEST', shallSetIsFetching(projectActions.DELETE_ENTITY_REQUEST))
    it('check UPDATE_PROJECT_REQUEST', shallSetIsFetching(projectActions.UPDATE_ENTITY_REQUEST))
    it('check CREATE_PROJECT_REQUEST', shallSetIsFetching(projectActions.CREATE_ENTITY_REQUEST))
  })

  describe('should reduce requests errors', () => {
    const shallSetError = actionType => function () {
      const action = {
        type: actionType,
      }
      const initState = {
        isFetching: true,
      }
      const expectedState = {
        isFetching: false,
      }
      expect(projectReducers.reduce(initState, action)).to.eql(expectedState)
    }
    it('check PROJECT_LIST_FAILURE', shallSetError(projectActions.ENTITY_LIST_FAILURE))
    it('check CREATE_PROJECT_FAILURE', shallSetError(projectActions.CREATE_ENTITY_FAILURE))
    it('check DELETE_PROJECT_FAILURE', shallSetError(projectActions.DELETE_ENTITY_FAILURE))
    it('check UPDATE_PROJECT_FAILURE', shallSetError(projectActions.UPDATE_ENTITY_FAILURE))
    it('check PROJECT_FAILURE', shallSetError(projectActions.ENTITY_FAILURE))
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
      items: {},
      lastUpdate: '',
    }
    const expectedState = {
      isFetching: false,
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
      lastUpdate: '',
    }
    const expectedState = {
      isFetching: false,
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
      lastUpdate: '',
    }
    expect(projectReducers.reduce(initState, action)).to.eql(expectedState)
  })

  describe('should handle other requests success', () => {
    const shallUpdateElement = actionType => function () {
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
          result: 'newProject',
        },
      }
      const initState = {
        isFetching: true,
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
        lastUpdate: '',
      }
      const expectedState = {
        isFetching: false,
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
      }
      expect(projectReducers.reduce(initState, action)).to.eql(expectedState)
    }
    it('check CREATE_PROJECT_SUCCESS', shallUpdateElement(projectActions.CREATE_ENTITY_SUCCESS))
    it('check PROJECT_SUCCESS', shallUpdateElement(projectActions.ENTITY_SUCCESS))
    it('check UPDATE_PROJECT_SUCCESS', shallUpdateElement(projectActions.UPDATE_ENTITY_SUCCESS))
  })
})
