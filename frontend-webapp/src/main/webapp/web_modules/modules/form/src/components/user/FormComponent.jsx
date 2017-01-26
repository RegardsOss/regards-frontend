/**
 * LICENSE_PLACEHOLDER
 **/
import RaisedButton from 'material-ui/RaisedButton'
import SearchIcon from 'material-ui/svg-icons/action/search'
import { FormattedMessage } from 'react-intl'
import { ApplicationLayout, LayoutShape } from '@regardsoss/layout'
import { PluginConf } from '@regardsoss/model'
import { themeContextType } from '@regardsoss/theme'

/**
 * Component to display a configured Search form module
 */
class FormComponent extends React.Component {

  static propTypes = {
    layout: LayoutShape.isRequired,
    plugins: React.PropTypes.arrayOf(PluginConf),
    pluginsProps: React.PropTypes.shape({
      onChange: React.PropTypes.func.isRequired,
    }),
    handleSearch: React.PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    return (
      <div style={{ marginTop: 20, marginRight: 20, marginLeft: 20 }}>
        <ApplicationLayout
          appName="user"
          layout={this.props.layout}
          plugins={this.props.plugins}
          pluginProps={this.props.pluginsProps}
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
            onTouchTap={this.props.handleSearch}
          />
        </div>
      </div>
    )
  }
}

export default FormComponent
