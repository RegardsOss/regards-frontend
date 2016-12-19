import { REQUEST_ATTRIBUTE_MODEL_TYPE_LIST, RECEIVE_ATTRIBUTE_MODEL_TYPE_LIST, FAILED_ATTRIBUTE_MODEL_TYPE_LIST,
} from './AttributeModelTypeActions'

export default (state = {
  isFetching: false,
  items: {},
  error: '',
}, action) => {
  switch (action.type) {
    case REQUEST_ATTRIBUTE_MODEL_TYPE_LIST:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case RECEIVE_ATTRIBUTE_MODEL_TYPE_LIST:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.payload,
      })
    case FAILED_ATTRIBUTE_MODEL_TYPE_LIST:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.meta.errorMessage,
      })
    default:
      return state
  }
}
