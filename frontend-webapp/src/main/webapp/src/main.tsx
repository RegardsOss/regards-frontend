import * as ReactDOM from "react-dom"
import { Router, browserHistory } from "react-router"
import { Provider } from "react-redux"
import { configureStore } from "@regardsoss/store"
import rootReducer from "./rootReducer"
import { routes } from "./rootRouter"

const store = configureStore(rootReducer)

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes}/>
  </Provider>,
  document.getElementById('app')
)
