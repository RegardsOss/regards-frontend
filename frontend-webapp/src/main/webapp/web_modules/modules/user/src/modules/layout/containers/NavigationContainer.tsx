import * as React from "react"
import { connect } from "react-redux"
import { PluginsStore } from "../../../../common/plugins/PluginTypes"
import { fetchPlugins } from "../../../../common/plugins/PluginsActions"
import LinkComponent from "../components/LinkComponent"


interface NavigationProps {
  project: string,
  location: any,
  // Properties set by react redux connection
  plugins?: PluginsStore,
  fetchPlugins?: () => void
}

class NavigationContainer extends React.Component<NavigationProps, any> {

  componentWillMount (): any {
    // Plugins are set to the containers props by react-redux connect.
    // See method mapStateToProps of this containers
    const {plugins} = this.props
    // initTheme method is set to the containers props by react-redux connect.
    // See method mapDispatchToProps of this containers
    // this.props.initTheme(themeToSet)

    if (!plugins || !plugins.items || plugins.items.length === 0) {
      // fetchPlugins method is set to the containers props by react-redux connect.
      // See method mapDispatchToProps of this containers
      this.props.fetchPlugins()
    }
  }

  render (): JSX.Element {
    const {location, plugins, project} = this.props
    if (plugins.items) {
      return (
        <nav>
          <LinkComponent
            location={location}
            key="test"
            to={"/user/" + project + "/test"}>
            Test de lien
          </LinkComponent>
          <LinkComponent
            location={location}
            key="time"
            to={"/user/" + project + "/time"}>
            Temps
          </LinkComponent>
          {plugins.items.map(plugin => {
            if (plugin) {
              return (
                <LinkComponent
                  location={location}
                  key={plugin.name}
                  to={"/user/" + project + "/plugins/" + plugin.name}>
                  {plugin.name}
                </LinkComponent>
              )
            }
          })}
        </nav>
      )
    } else {
      return (
        <nav>
          <LinkComponent location={location} key="test" to={"/user/" + project + "/test"}>Test de lien</LinkComponent>
          <LinkComponent location={location} key="time" to={"/user/" + project + "/time"}>Temps</LinkComponent>
        </nav>
      )
    }
  }
}

// Add projects from store to the containers props
const mapStateToProps = (state: any) => {
  return {
    plugins: state.common.plugins
  }
}
// Add functions dependending on store dispatch to containers props.
const mapDispatchToProps = (dispatch: any) => ({
  fetchPlugins: () => dispatch(fetchPlugins())
})
const navigation = connect<{}, {}, NavigationProps>(mapStateToProps, mapDispatchToProps)(NavigationContainer)
export default navigation
