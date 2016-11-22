import { connect } from 'react-redux'
import { fetchPlugins } from '@regardsoss/plugins'
import LinkComponent from '../components/LinkComponent'


class NavigationContainer extends React.Component {

  componentWillMount() {
    // Plugins are set to the containers props by react-redux connect.
    // See method mapStateToProps of this containers
    const { plugins } = this.props
    // initTheme method is set to the containers props by react-redux connect.
    // See method mapDispatchToProps of this containers
    // this.props.initTheme(themeToSet)

    if (!plugins || !plugins.items || plugins.items.length === 0) {
      // fetchPlugins method is set to the containers props by react-redux connect.
      // See method mapDispatchToProps of this containers
      this.props.fetchPlugins()
    }
  }

  render() {
    const { location, plugins, project } = this.props
    if (plugins.items) {
      return (
        <nav>
          <LinkComponent
            location={location}
            key="test"
            to={`/user/${project}/test`}
          >
            Test de lien
          </LinkComponent>
          <LinkComponent
            location={location}
            key="time"
            to={`/user/${project}/time`}
          >
            Temps
          </LinkComponent>
          {plugins.items.map(plugin => (
              plugin ? (
                <LinkComponent
                  location={location}
                  key={plugin.name}
                  to={`/user/${project}/plugins/${plugin.name}`}
                >
                  {plugin.name}
                </LinkComponent>
              ) : null
            ))}
        </nav>
      )
    }
    return (
      <nav>
        <LinkComponent location={location} key="test" to={`/user/${project}/test`}>Test de lien</LinkComponent>
        <LinkComponent location={location} key="time" to={`/user/${project}/time`}>Temps</LinkComponent>
      </nav>
    )
  }
}

NavigationContainer.propTypes = {
  project: React.PropTypes.string.isRequired,
  location: React.PropTypes.string.isRequired,
  plugins: React.PropTypes.objectOf(React.PropTypes.string),
  fetchPlugins: React.PropTypes.func.isRequired,
}
// Add projects from store to the containers props
const mapStateToProps = state => (
  {
    plugins: state.common.plugins,
  }
  )
// Add functions dependending on store dispatch to containers props.
const mapDispatchToProps = dispatch => ({
  fetchPlugins: () => dispatch(fetchPlugins()),
})
export default connect(mapStateToProps, mapDispatchToProps)(NavigationContainer)
