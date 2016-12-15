
import NavigationContainer from './containers/NavigationContainer'

function Layout({ project, location, children }) {
  return (
    <div className="full-div">
      <div className="header">
        <h1> Test Application {project} </h1>
      </div>
      <NavigationContainer project={project} location={location} />
      <div>
        {children}
      </div>
    </div>
  )
}
Layout.propTypes = {
  project: React.PropTypes.string.isRequired,
  location: React.PropTypes.string.isRequired,
  children: React.PropTypes.element.isRequired,
}

export default Layout
