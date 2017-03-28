/**
 * LICENSE_PLACEHOLDER
 **/

import { Card, CardHeader, CardText } from 'material-ui/Card'
import {FormattedMessage} from 'react-intl'
import { Plugin } from '@regardsoss/model'

/**
 * React component to display static informations from loaded plugin
 * @author Sébastien Binda
 */
class PluginDefinitionComponent extends React.Component {

  static propTypes = {
    handlePluginValid: React.PropTypes.func.isRequired,
    plugin: Plugin,
  }

  componentWillMount() {
    this.props.handlePluginValid(this.props.plugin)
  }

  renderUrlAddress = () => {
    if (this.props.plugin.info.url) {
      return (
        <a href={this.props.plugin.info.url} target="_black" rel="noopener noreferrer">
          <FormattedMessage id="plugin.description.url" />
        </a>
      )
      return null
    }
  }

  render() {
    const { info } = this.props.plugin
    const title = `${info.name} - version ${info.version} - ${info.license? info.license : ''}`
    const subtitle = `${info.author? info.author : ''} - ${info.email? info.email : ''} - ${info.company? info.company : ''}`
    return (
      <Card>
        <CardHeader
          title={title}
          subtitle={subtitle}
        />
        <CardText>
          {info.description}
          <div>
            {this.renderUrlAddress()}
          </div>
        </CardText>
      </Card>
    )
  }
}
export default PluginDefinitionComponent
