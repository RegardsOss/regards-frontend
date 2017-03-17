/**
 * LICENSE_PLACEHOLDER
 **/
import RaisedButton from 'material-ui/RaisedButton'
import SearchIcon from 'material-ui/svg-icons/action/search'
import { Card, CardText } from 'material-ui/Card'
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

  onHandleSearch = () => {
    this.props.handleSearch()
  }

  keypress = (e) => {
    if (e.charCode === 13) {
      this.onHandleSearch()
    }
  }

  render() {
    return (
      <Card>
        <CardText>
          <Container
            appName="user"
            container={this.props.layout}
            plugins={this.props.plugins}
            pluginProps={this.props.pluginsProps}
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
