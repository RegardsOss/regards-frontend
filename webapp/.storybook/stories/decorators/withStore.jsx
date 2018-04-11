import { Provider } from 'react-redux'
import store from '../store'

const withStore = story => (
  <Provider store={store}>
    {story()}
  </Provider>
)
export default withStore
