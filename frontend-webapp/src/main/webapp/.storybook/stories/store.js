import { Provider } from 'react-redux'
import { configureStore } from '@regardsoss/store'
import rootReducer from '../../src/rootReducer'

export default configureStore(rootReducer)
