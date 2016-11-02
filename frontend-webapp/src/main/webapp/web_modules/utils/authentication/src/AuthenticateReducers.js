import { REQUEST_AUTHENTICATE, RECEIVE_AUTHENTICATE, FAILED_AUTHENTICATE, LOGOUT } from './AuthenticateActions';


export default (state = {
  isFetching: false,
  user: {},
  authenticateDate: '',
  error: '',
}, action) => {
  switch (action.type) {
    case REQUEST_AUTHENTICATE:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case RECEIVE_AUTHENTICATE:
      const newState = Object.assign({}, state, {
        isFetching: false,
        user: action.payload,
        authenticateDate: action.meta.authenticateDate,
      });
      newState.user.name = action.meta.name;
      return newState;
    case FAILED_AUTHENTICATE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.meta.errorMessage,
      });
    case LOGOUT:
      return {
        isFetching: false,
        user: {},
        authenticateDate: '',
        error: '',
      };
    default:
      return state;
  }
};
