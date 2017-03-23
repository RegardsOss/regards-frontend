/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'
import RaisedButton from 'material-ui/RaisedButton'
import SearchIcon from 'material-ui/svg-icons/action/search'
import { Card, CardText, CardHeader } from 'material-ui/Card'
import { FormattedMessage } from 'react-intl'
import { PluginConf, Container as ContainerShape } from '@regardsoss/model'
import { Container } from '@regardsoss/layout'
import { themeContextType } from '@regardsoss/theme'

/**
 * Component to display a configured Search form module
 * @author Sébastien binda
 */
class FormComponent extends React.Component {

  static propTypes = {
    expanded: React.PropTypes.bool,
    description: React.PropTypes.string.isRequired,
    layout: ContainerShape.isRequired,
    plugins: React.PropTypes.arrayOf(PluginConf),
    pluginsProps: React.PropTypes.shape({
      onChange: React.PropTypes.func.isRequired,
    }),
    handleSearch: React.PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  constructor(props) {
    super(props)
    this.state = {
      expanded: props.expanded,
    }
    this.pluginStates = {}
  }

  onHandleSearch = () => {
    this.props.handleSearch()
    this.setState({
      expanded: false,
    })
  }

  handleExpand = () => {
    this.setState({
      expanded: !this.state.expanded,
    })
  }

  keypress = (e) => {
    if (e.charCode === 13) {
      this.onHandleSearch()
    }
  }

  /**
   * Function passed to plugins to give them back theire previous state in order to initialize them
   * with their previous values.
   *
   * @param pluginId
   * @returns {{}}
   */
  getPluginDefaultState = (pluginId) => {
    return this.pluginStates[pluginId] ? this.pluginStates[pluginId] : {}
  }
  /**
   * Function passed to plugins to save their state. So they can retrieve it later
   * @param pluginId
   * @param state
   */
  savePluginState = (pluginId, state) => {
    this.pluginStates[pluginId] = state
  }

  render() {

    return (
      <Card
        onExpandChange={this.handleExpand}
        expanded={this.state.expanded}
      >
        <CardHeader
          title={this.props.description}
          actAsExpander
          showExpandableButton
        />
        <CardText expandable>
          <Container
            appName="user"
            container={this.props.layout}
            plugins={this.props.plugins}
            pluginProps={{
              ...this.props.pluginsProps,
              getDefaultState: this.getPluginDefaultState,
              savePluginState: this.savePluginState
            }}
            mainContainer
          />
          <div
            style={this.context.moduleTheme.user.searchButtonContainer}
          >
            <RaisedButton
              label={<FormattedMessage id="form.search.button.label" />}
              labelPosition="before"
              primary
              icon={<SearchIcon />}
              style={this.context.moduleTheme.user.searchButton}
              onTouchTap={this.onHandleSearch}
            />
          </div>
        </CardText>
      </Card>
    )
  }
}

export default FormComponent
