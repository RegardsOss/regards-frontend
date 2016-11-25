import { expect } from 'chai'
import reducer from '../../src/model/ProjectReducers'
import {
  PROJECT_LIST_REQUEST,
  PROJECT_LIST_FAILURE,
  PROJECT_LIST_SUCCESS,
  CREATE_PROJECT_REQUEST,
  CREATE_PROJECT_FAILURE,
  CREATE_PROJECT_SUCCESS,
  DELETE_PROJECT_REQUEST,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAILURE,
} from '../../src/model/ProjectActions'

describe('[ADMIN APP] Testing projects reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.eql({
      isFetching: false,
      items: {},
      lastUpdate: '',
    })
  })

  describe('GET /project calls', () => {
    it('should handle fetch request', () => {
      const action = {
        type: PROJECT_LIST_REQUEST,
      }
      const initState = {
        isFetching: false,
      }
      const expectedState = {
        isFetching: true,
      }
      expect(reducer(initState, action)).to.eql(expectedState)
    })

    it('should handle fetch success', () => {
      const action = {
        type: PROJECT_LIST_SUCCESS,
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

    it('should handle fetch failure', () => {
      const action = {
        type: PROJECT_LIST_FAILURE,
        error: 'Oops there was an error!',
      }
      const initState = {
        isFetching: true,
        items: {},
        lastUpdate: '',
      }
      const expectedState = {
        isFetching: false,
        items: {},
        lastUpdate: '',
      }
      expect(reducer(initState, action)).to.eql(expectedState)
    })
  })

  describe('POST /projects calls', () => {
    it('should handle create request', () => {
      const action = {
        type: CREATE_PROJECT_REQUEST,
      }
      const initState = {
        isFetching: false,
      }
      const expectedState = {
        isFetching: true,
      }
      expect(reducer(initState, action)).to.eql(expectedState)
    })

    it('should handle create success', () => {
      const action = {
        type: CREATE_PROJECT_SUCCESS,
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
    })

    it('should handle create failure', () => {
      const action = {
        type: CREATE_PROJECT_FAILURE,
        error: 'Oops there was an error!',
      }
      const initState = {
        isFetching: true,
        items: {},
        lastUpdate: '',
      }
      const expectedState = {
        isFetching: false,
        items: {},
        lastUpdate: '',
      }
      expect(reducer(initState, action)).to.eql(expectedState)
    })
  })

  describe('DELETE /projects/{id} calls', () => {
    it('should handle delete request', () => {
      const action = {
        type: DELETE_PROJECT_REQUEST,
      }
      const initState = {
        isFetching: false,
      }
      const expectedState = {
        isFetching: true,
      }
      expect(reducer(initState, action)).to.eql(expectedState)
    })

    it('should handle delete success', () => {
      const action = {
        type: DELETE_PROJECT_SUCCESS,
        payload: { id: 3 },
      }
      const initState = {
        isFetching: true,
        items: {
          1: {
            content: {
              id: 1,
            },
            links: [],
          },
          2: {
            content: {
              id: 2,
            },
            links: [],
          },
          3: {
            content: {
              id: 3,
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
            },
            links: [],
          },
          2: {
            content: {
              id: 2,
            },
            links: [],
          },
        },
        lastUpdate: '',
      }
      expect(reducer(initState, action)).to.eql(expectedState)
    })

    it('should handle delete failure', () => {
      const action = {
        type: DELETE_PROJECT_FAILURE,
        error: 'Oops there was an error!',
      }
      const initState = {
        isFetching: true,
        items: {},
        lastUpdate: '',
      }
      const expectedState = {
        isFetching: false,
        items: {},
        lastUpdate: '',
      }
      expect(reducer(initState, action)).to.eql(expectedState)
    })
  })
})
