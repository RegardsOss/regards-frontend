
export const Router = () => { }
export class Link extends React.Component {
  render() {
    return <div />
  }
}
export const IndexLink = {}
export const withRouter = {}
export const IndexRedirect = {}
export const IndexRoute = {}
export const Redirect = {}
export const Route = {}
export const createRoutes = {}
export const RouterContext = {}
export const locationShape = {}
export const routerShape = {}
export const match = {}
export const useRouterHistory = {}
export const formatPattern = {}
export const applyRouterMiddleware = {}
let currentLocation = { pathname: '', query: '' }
let replaceSpy = () => { }
export const browserHistory = {
  push: () => { },
  getCurrentLocation: () => (currentLocation),
  setMockedResult: (nextLocation) => { currentLocation = nextLocation },
  replace: (location) => { replaceSpy(location) },
  setReplaceSpy: (nextReplaceSpy) => { replaceSpy = nextReplaceSpy },
}
export const hashHistory = {}
export const createMemoryHistory = {}
