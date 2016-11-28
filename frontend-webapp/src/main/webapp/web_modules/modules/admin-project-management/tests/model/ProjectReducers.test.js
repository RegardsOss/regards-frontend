import { expect } from 'chai'
import reducer from '../../src/model/ProjectReducers'
import * as Actions from '../../src/model/ProjectActions'

describe('[ADMIN PROJECT MANAGEMENT] Testing project reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.eql({
      isFetching: false,
      items: {},
      lastUpdate: '',
    })
  })

  describe('should handle requests fetching', () => {
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
      expect(reducer(initState, action)).to.eql(expectedState)
    }
    it('check PROJECT_LIST_REQUEST', shallSetIsFetching(Actions.PROJECT_LIST_REQUEST))
    it('check PROJECT_REQUEST', shallSetIsFetching(Actions.PROJECT_REQUEST))
    it('check DELETE_PROJECT_REQUEST', shallSetIsFetching(Actions.DELETE_PROJECT_REQUEST))
    it('check UPDATE_PROJECT_REQUEST', shallSetIsFetching(Actions.UPDATE_PROJECT_REQUEST))
    it('check CREATE_PROJECT_REQUEST', shallSetIsFetching(Actions.CREATE_PROJECT_REQUEST))
  })

  describe('should handle requests errors', () => {
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
      expect(reducer(initState, action)).to.eql(expectedState)
    }
    it('check PROJECT_LIST_FAILURE', shallSetError(Actions.PROJECT_LIST_FAILURE))
    it('check CREATE_PROJECT_FAILURE', shallSetError(Actions.CREATE_PROJECT_FAILURE))
    it('check DELETE_PROJECT_FAILURE', shallSetError(Actions.DELETE_PROJECT_FAILURE))
    it('check UPDATE_PROJECT_FAILURE', shallSetError(Actions.UPDATE_PROJECT_FAILURE))
    it('check PROJECT_FAILURE', shallSetError(Actions.PROJECT_FAILURE))
  })

  it('should handle PROJECT_LIST_SUCCESS', () => {
    const action = {
      type: Actions.PROJECT_LIST_SUCCESS,
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
    expect(reducer(initState, action)).to.eql(expectedState)
  })

  it('should handle DELETE_PROJECT_SUCCESS', () => {
    const action = {
      type: Actions.DELETE_PROJECT_SUCCESS,
      payload: { projectName: 'regards' },
    }
    const initState = {
      isFetching: true,
      items: {
        1: {
          content: {
            id: 1,
            name: 'cdpp',
          },
          links: [],
        },
        2: {
          content: {
            id: 2,
            name: 'cnes',
          },
          links: [],
        },
        3: {
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
        1: {
          content: {
            id: 1,
            name: 'cdpp',
          },
          links: [],
        },
        2: {
          content: {
            id: 2,
            name: 'cnes',
          },
          links: [],
        },
      },
      lastUpdate: '',
    }
    expect(reducer(initState, action)).to.eql(expectedState)
  })

  describe('should handle other requests success', () => {
    const shallUpdateElement = actionType => function () {
      const action = {
        type: actionType,
        payload: {
          entities: {
            projects: {
              3: { id: '3', name: 'newProject' },
            },
          },
          result: '3',
        },
      }
      const initState = {
        isFetching: true,
        items: {
          0: { id: '0', name: 'cdpp' },
          1: { id: '1', name: 'ssalto' },
        },
        lastUpdate: '',
      }
      const expectedState = {
        isFetching: false,
        items: {
          0: { id: '0', name: 'cdpp' },
          1: { id: '1', name: 'ssalto' },
          3: { id: '3', name: 'newProject' },
        },
        lastUpdate: '',
      }
      expect(reducer(initState, action)).to.eql(expectedState)
    }
    it('check CREATE_PROJECT_SUCCESS', shallUpdateElement(Actions.CREATE_PROJECT_SUCCESS))
    it('check PROJECT_SUCCESS', shallUpdateElement(Actions.PROJECT_SUCCESS))
    it('check UPDATE_PROJECT_SUCCESS', shallUpdateElement(Actions.UPDATE_PROJECT_SUCCESS))
  })
})
